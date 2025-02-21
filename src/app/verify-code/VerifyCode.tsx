"use client";

import React, { useEffect, useState } from "react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { KeyRound, ArrowLeft, Shield } from "lucide-react";
import usePost from "@/hooks/usePost";
import { useToast } from "@/hooks/use-toast";
import Toast from "@/lib/toastClass";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { decrypt } from "@/lib/encryptAndDecrypt";

const VerifyCode = () => {
    const [state, setState] = useState({
        value: "",
        email: "",
        timer: 0,
        s: "",
    });

    const router = useRouter();
    const { toast } = useToast();
    const { error, loading, post } = usePost("/api/sign-up");
    const {
        error: resendError,
        loading: resendLoading,
        post: resendPost,
    } = usePost("/api/resend-code");

    useEffect(() => {
        const email = localStorage.getItem("email");
        const s = localStorage.getItem("s");
        if (!email || !s) return router.push("/sign-up");
        setState((prev) => ({ ...prev, email, s }));
    }, []);

    useEffect(() => {
        if (error) {
            toast(
                new Toast(
                    "Error",
                    error || "Some error occurred while verifying code",
                    "destructive"
                )
            );
        }
        if (resendError) {
            toast(
                new Toast(
                    "Error",
                    resendError || "Error resending code",
                    "destructive"
                )
            );
        }
    }, [error, resendError]);

    useEffect(() => {
        if (state.timer > 0) {
            const interval = setInterval(() => {
                setState((prev) => ({ ...prev, timer: prev.timer - 1 }));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [state.timer]);

    const handleVerify = async () => {
        await post({ email: state.email, code: state.value });
        const decryptedS = decrypt(state.s);
        await signIn("credentials", {
            redirect: false,
            identifier: state.email,
            password: decryptedS,
        });
        localStorage.setItem("fromSignIn", "yeahBro")
        router.push("/user-input");
    };

    const handleResend = async () => {
        await resendPost({ email: state.email });
        setState((prev) => ({ ...prev, timer: 15 }));
    };

    const handleBack = () => {
        localStorage.removeItem("email");
        router.push("/sign-up");
    };

    const isVerifyDisabled = state.value.length !== 6;
    const isResendDisabled = state.timer > 0 || resendLoading;

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8">
                <button
                    className="text-blue-500 hover:text-blue-600 flex items-center"
                    onClick={handleBack}
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    <span>Back</span>
                </button>

                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                        <Shield className="w-8 h-8 text-blue-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Verify Your Account
                    </h2>
                    <p className="text-gray-600">
                        We've sent a verification code to your email. Please
                        enter it below.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex flex-col items-center space-y-6">
                        <InputOTP
                            maxLength={6}
                            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                            value={state.value}
                            onChange={(value) =>
                                setState((prev) => ({ ...prev, value }))
                            }
                            className="flex justify-center gap-2"
                        >
                            <InputOTPGroup>
                                {[...Array(6)].map((_, i) => (
                                    <InputOTPSlot key={i} index={i} />
                                ))}
                            </InputOTPGroup>
                        </InputOTP>

                        <button
                            className={`w-full py-3 px-4 rounded-md flex items-center justify-center space-x-2 
                                ${
                                    isVerifyDisabled
                                        ? "bg-blue-300 text-gray-600 cursor-not-allowed"
                                        : "bg-blue-500 hover:bg-blue-600 text-white"
                                }`}
                            disabled={isVerifyDisabled}
                            onClick={handleVerify}
                        >
                            <KeyRound className="w-5 h-5" />
                            <span>
                                {loading ? "Verifying..." : "Verify Code"}
                            </span>
                        </button>

                        <p className="text-sm text-gray-600">
                            Didn't receive the code?
                            <button
                                className={`ml-1 ${
                                    isResendDisabled
                                        ? "text-gray-800 cursor-not-allowed"
                                        : "text-blue-500 hover:text-blue-600"
                                }`}
                                onClick={handleResend}
                                disabled={isResendDisabled}
                            >
                                {resendLoading
                                    ? "Resending..."
                                    : `Resend ${
                                          state.timer > 0
                                              ? `(${state.timer})`
                                              : ""
                                      }`}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyCode;
