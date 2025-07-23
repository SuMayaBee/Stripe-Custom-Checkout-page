import { NextResponse } from "next/server";
import { stripe } from "@/lib/clients/stripe/server";
import { z } from "zod";

const createPaymentIntentSchema = z.object({
	amount: z.number().min(1, "Amount must be at least $1").max(999999, "Amount too large"),
});

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const result = createPaymentIntentSchema.safeParse(body);

		if (!result.success) {
			return NextResponse.json(
				{
					error: "Invalid request",
					details: result.error.issues,
				},
				{ status: 400 }
			);
		}

		const { amount } = result.data;

		// Convert dollars to cents for Stripe
		const amountInCents = Math.round(amount * 100);

		const paymentIntent = await stripe.paymentIntents.create({
			amount: amountInCents,
			currency: "usd",
			automatic_payment_methods: {
				enabled: true,
			},
			metadata: {
				custom_amount: amount.toString(),
			},
		});

		return NextResponse.json({
			clientSecret: paymentIntent.client_secret,
		});
	} catch (error) {
		console.error("Error creating payment intent:", error);

		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{
					error: "Validation error",
					details: error.issues,
				},
				{ status: 400 }
			);
		}

		return NextResponse.json(
			{ error: "Failed to create payment intent" },
			{ status: 500 }
		);
	}
}
