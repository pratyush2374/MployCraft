"use client"

import React, { useEffect, useState } from 'react';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { KeyRound, ArrowLeft, Shield } from 'lucide-react';

const VerifyCode = () => {
    const [value, setValue] = useState("");

    useEffect(() => {
        console.log(value);
    }, [value.length == 6]);

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8">
                <div className="flex items-center mb-8">
                    <button className="text-blue-500 hover:text-blue-600 flex items-center">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        <span>Back</span>
                    </button>
                </div>

                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                        <Shield className="w-8 h-8 text-blue-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Account</h2>
                    <p className="text-gray-600">
                        We've sent a verification code to your email. Please enter it below.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex flex-col items-center space-y-6 justify-center">
                        <div>
                            <InputOTP
                                maxLength={6}
                                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                                onChange={(value) => setValue(value)}
                                value={value}
                                className="flex justify-center gap-2"
                            >
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                        </div>

                        <button 
                            className={`w-full py-3 px-4 rounded-md flex items-center justify-center space-x-2 
                                ${value.length === 6 
                                    ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                            disabled={value.length !== 6}
                        >
                            <KeyRound className="w-5 h-5" />
                            <span>Verify Code</span>
                        </button>

                        <p className="text-sm text-gray-600">
                            Didn't receive the code? 
                            <button className="text-blue-500 hover:text-blue-600 ml-1">
                                Resend
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyCode;