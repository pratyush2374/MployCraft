// app/error/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { Suspense } from "react";

function ErrorContent() {
    const searchParams = useSearchParams();
    const errorMessage = searchParams.get("msg") || "An unknown error occurred";

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden border border-red-100">
                <div className="bg-red-50 p-4 flex items-center border-b border-red-100">
                    <AlertTriangle className="text-red-500 mr-3" size={24} />
                    <h1 className="text-xl font-bold text-red-700">
                        Error Encountered
                    </h1>
                </div>

                <div className="p-6">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                        <p className="text-gray-800 font-medium">
                            {errorMessage}
                        </p>
                    </div>

                    <p className="text-gray-600 mb-6">
                        We couldn't find what you were looking for. Please try
                        again or return to the homepage.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/dashboard/home"
                            className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                        >
                            <ArrowLeft size={18} />
                            Return Home
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center text-gray-500 text-sm">
                <p>If this error persists, please contact support.</p>
            </div>
        </div>
    );
}

export default function ErrorPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <p>Loading error details...</p>
                </div>
            }
        >
            <ErrorContent />
        </Suspense>
    );
}
