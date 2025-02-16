"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { Eye, EyeClosed, LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import Toast from "@/lib/toastClass";

interface FormData {
    identifier: string;
    password: string;
}

const SignIn: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const router = useRouter();
    const { toast } = useToast();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        await signIn("credentials", {
            redirect: false,
            identifier: data.identifier,
            password: data.password,
        });
        toast(new Toast("Success", "Logged in successfully...Redirecting"));
        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                <div className="hidden md:flex md:w-1/2 bg-blue-100 items-center justify-center p-8">
                    <Image
                        src="/Auth/auth.svg"
                        height={400}
                        width={400}
                        alt="MployCraft Authentication"
                        className="max-w-full h-auto object-contain"
                    />
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            Welcome Back
                        </h2>
                        <p className="text-gray-500">Sign in to MployCraft</p>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div>
                            <label
                                htmlFor="identifier"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Email or Username
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="identifier"
                                    {...register("identifier", {
                                        required:
                                            "Email or username is required",
                                        minLength: {
                                            value: 3,
                                            message:
                                                "Must be at least 3 characters",
                                        },
                                    })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                    placeholder="Enter your email or username"
                                />
                                {errors.identifier && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.identifier.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message:
                                                "Password must be at least 6 characters",
                                        },
                                    })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 pr-12"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 transition"
                                >
                                    {showPassword ? (
                                        <Eye className="h-5 w-5" />
                                    ) : (
                                        <EyeClosed className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div className="text-sm text-right">
                            <p className="font-medium text-blue-600 hover:text-blue-500">
                                Forgot password?
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-[1.02]"
                        >
                            <LogIn className="mr-2 h-5 w-5" /> Sign In
                        </button>
                    </form>

                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{" "}
                            <Link
                                href="/sign-up"
                                className="font-medium text-blue-600 hover:text-blue-500"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
