import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import usePost from "@/hooks/usePost";
import Toast from "@/lib/toastClass";
import {
    WandSparkles,
    Building2,
    Briefcase,
    FileText,
    StickyNote,
    Target,
    Sparkles,
} from "lucide-react";

interface FormData {
    companyName: string;
    position: string;
    jobDescription: string;
    trackJob: boolean;
    notes?: string;
}

const DashboardResumeGenerator = () => {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<FormData>();
    const { post, error } = usePost("/api/generate-resume-and-cl");
    const { toast } = useToast();
    const [greet, setGreet] = useState("");

    const onSubmit = async (data: FormData) => {
        console.log(data);
        await post(data);
    };

    useEffect(() => {
        if (error) {
            toast(
                new Toast(
                    "Error",
                    error || "Some error occurred while generating",
                    "destructive"
                )
            );
        }
        const hour = new Date().getHours();
        if (hour < 12) setGreet("Morning");
        else if (hour < 17) setGreet("Afternoon");
        else setGreet("Evening");
    }, [error]);

    return (
        <div className="w-full max-w-4xl mx-auto md:p-3">
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <Sparkles className="w-8 h-8 text-blue-500" />
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                        Good {greet}!
                    </h1>
                </div>
                <p className="text-lg text-gray-600 ml-11">
                    Ready to tailor your application perfectly?
                </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center gap-3 mb-6">
                    <WandSparkles className="w-6 h-6 text-blue-500" />
                    <h2 className="text-xl font-semibold text-gray-800">
                        Resume & Cover Letter Generator
                    </h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 mb-2">
                                <Building2 className="w-4 h-4 text-blue-500" />
                                <label className="text-sm font-medium text-gray-700">
                                    Company Name
                                </label>
                            </div>
                            <input
                                type="text"
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                {...register("companyName", {
                                    required: "Company name is required",
                                })}
                            />
                            {errors.companyName && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.companyName.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 mb-2">
                                <Briefcase className="w-4 h-4 text-blue-500" />
                                <label className="text-sm font-medium text-gray-700">
                                    Position
                                </label>
                            </div>
                            <input
                                type="text"
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                {...register("position", {
                                    required: "Position is required",
                                })}
                            />
                            {errors.position && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.position.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-2">
                            <FileText className="w-4 h-4 text-blue-500" />
                            <label className="text-sm font-medium text-gray-700">
                                Job Description
                            </label>
                        </div>
                        <textarea
                            rows={4}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Paste the job description here..."
                            {...register("jobDescription", {
                                required: "Job description is required",
                                minLength: {
                                    value: 100,
                                    message:
                                        "Job description should be at least 100 characters",
                                },
                            })}
                        />
                        {errors.jobDescription && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.jobDescription.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-2">
                            <StickyNote className="w-4 h-4 text-blue-500" />
                            <label className="text-sm font-medium text-gray-700">
                                Additional Notes
                            </label>
                        </div>
                        <input
                            type="text"
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Any specific requirements or preferences (optional)"
                            {...register("notes")}
                        />
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                        <input
                            type="checkbox"
                            id="trackJob"
                            className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                            {...register("trackJob")}
                            defaultChecked
                        />
                        <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-blue-500" />
                            <label
                                htmlFor="trackJob"
                                className="text-sm font-medium text-gray-700"
                            >
                                Track this application in my dashboard
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-xl hover:from-blue-700 hover:to-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                    >
                        <WandSparkles className="w-5 h-5" />
                        {isSubmitting
                            ? "Generating your documents..."
                            : "Generate Resume & Cover Letter"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DashboardResumeGenerator;
