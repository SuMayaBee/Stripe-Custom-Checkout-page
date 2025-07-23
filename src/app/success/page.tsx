"use client";

import React, { useEffect } from "react";
import { CheckCircle } from "@phosphor-icons/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
	useEffect(() => {
		// Clean up URL parameters after showing success
		const url = new URL(window.location.href);
		if (url.searchParams.has('payment_intent')) {
			window.history.replaceState({}, '', '/success');
		}
	}, []);

	return (
		<div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 to-teal-50">
			{/* Header */}
			<div className="bg-white shadow-sm border-b">
				<div className="max-w-7xl mx-auto px-4 py-4">
					<div className="flex items-center justify-center">
						<Image
							src="/abc.png"
							alt="Logo"
							width={180}
							height={60}
							className="h-12 w-auto"
						/>
					</div>
				</div>
			</div>

			{/* Success Content */}
			<div className="py-20 px-4">
				<div className="mx-auto max-w-lg text-center">
					<div className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-100">
						<div className="mb-8">
							<div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
								<CheckCircle
									className="w-12 h-12 text-emerald-600"
									weight="fill"
								/>
							</div>
							<h1 className="text-3xl font-bold mb-4 text-gray-900">
								Payment Successful!
							</h1>
							<p className="text-lg text-gray-600 mb-6">
								Your payment has been processed successfully. Thank you for your business!
							</p>
							<div className="bg-emerald-50 rounded-lg p-4 mb-6">
								<p className="text-emerald-800 font-medium">
									Transaction completed securely
								</p>
							</div>
						</div>

						<div className="space-y-3">
							<Button
								onClick={() => window.close()}
								className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium"
							>
								Close Window
							</Button>
							<p className="text-sm text-gray-500">
								You can safely close this window or tab
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}