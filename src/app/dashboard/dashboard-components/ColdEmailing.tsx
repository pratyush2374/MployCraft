import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    Mail,
    Building2,
    FileText,
    Info,
    Plus,
    Send,
    Search,
    Linkedin,
    Briefcase,
    Globe,
    CheckCircle,
    LightbulbIcon,
    User2,
} from "lucide-react";
import usePost from "@/hooks/usePost";
import { useToast } from "@/hooks/use-toast";
import Toast from "@/lib/toastClass";

interface FormData {
    companyName: string;
    jobPosition: string;
    jobDescription: string;
    aboutUs?: string;
    additionalInformation?: string;
    salutation?: string;
}

interface ApiResponse {
    body: string;
    subject: string;
}

const ColdEmailing = () => {
    const [emailGenerated, setEmailGenerated] = useState(false);
    const [emailPreview, setEmailPreview] = useState<ApiResponse | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormData>();
    const { post, error } = usePost("/api/generate-cold-email");
    const { toast } = useToast();

    const onSubmit = async (data: FormData) => {
        const emailContent = await post(data);
        setEmailPreview(emailContent.data);
        setEmailGenerated(true);
    };

    const handleNewEmail = () => {
        setEmailGenerated(false);
        reset();
    };

    useEffect(() => {
        if (error) {
            toast(
                new Toast(
                    "Error",
                    error || "Something went wrong",
                    "destructive"
                )
            );
        }
    }, [error]);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
                <Mail className="text-blue-500 w-6 h-6" />
                <h1 className="text-2xl font-bold">Cold Emailing Generator</h1>
            </div>

            {!emailGenerated ? (
                <div className="flex flex-col gap-8">
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-xl font-semibold mb-4">
                            Create Your Personalized Email
                        </h2>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-5"
                        >
                            <div className="grid md:grid-cols-2 gap-6 mt-8">
                                <div>
                                    <label
                                        htmlFor="companyName"
                                        className="block text-sm font-medium mb-1"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Building2 className="w-4 h-4 text-blue-500" />
                                            Company Name{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </div>
                                    </label>
                                    <input
                                        type="text"
                                        id="companyName"
                                        placeholder="e.g., Google, Microsoft, Amazon"
                                        className={`w-full p-3 border ${
                                            errors.companyName
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        {...register("companyName", {
                                            required:
                                                "Company name is required",
                                        })}
                                    />
                                    {errors.companyName && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.companyName.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="jobPosition"
                                        className="block text-sm font-medium mb-1"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Briefcase className="w-4 h-4 text-blue-500" />
                                            Job Position{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </div>
                                    </label>
                                    <input
                                        type="text"
                                        id="jobPosition"
                                        placeholder="e.g., Front End Developer, UI Designer"
                                        className={`w-full p-3 border ${
                                            errors.jobPosition
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        {...register("jobPosition", {
                                            required:
                                                "Job position is required",
                                        })}
                                    />
                                    {errors.jobPosition && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.jobPosition.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="jobDescription"
                                    className="block text-sm font-medium mb-1"
                                >
                                    <div className="flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-blue-500" />
                                        Job Description
                                        <span className="text-red-500">*</span>
                                    </div>
                                </label>
                                <textarea
                                    id="jobDescription"
                                    rows={3}
                                    placeholder="What do you like about the company? Or paste the company's 'About Us' page text here."
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    {...register("jobDescription", {
                                        required: "Job description is required",
                                    })}
                                />
                                {errors.jobDescription && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.jobDescription.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="aboutUs"
                                    className="block text-sm font-medium mb-1"
                                >
                                    <div className="flex items-center gap-2">
                                        <Info className="w-4 h-4 text-blue-500" />
                                        Company Information/Research
                                        (Recommended)
                                    </div>
                                </label>
                                <textarea
                                    id="aboutUs"
                                    rows={3}
                                    placeholder="What do you like about the company? Or paste the company's 'About Us' page text here."
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    {...register("aboutUs")}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="additionalInformation"
                                    className="block text-sm font-medium mb-1"
                                >
                                    <div className="flex items-center gap-2">
                                        <Plus className="w-4 h-4 text-blue-500" />
                                        Additional Information
                                    </div>
                                </label>
                                <textarea
                                    id="additionalInformation"
                                    rows={2}
                                    placeholder="e.g., I found your job posting on LinkedIn and was particularly interested in..."
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    {...register("additionalInformation")}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="salutation"
                                    className="block text-sm font-medium mb-1"
                                >
                                    <div className="flex items-center gap-2">
                                        <User2 className="w-4 h-4 text-blue-500" />
                                        Salutation{" "}
                                    </div>
                                </label>
                                <input
                                    type="text"
                                    id="companyName"
                                    placeholder="e.g., Dear Hiring Manager,"
                                    className={
                                        "w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    }
                                    {...register("salutation")}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-md flex items-center justify-center gap-2 transition duration-200"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        Generate Cold Email
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <LightbulbIcon className="text-blue-500 w-5 h-5" />
                            <h2 className="text-xl font-semibold">
                                Finding Recipient Emails
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <p className="text-sm text-blue-800 mb-2 font-medium">
                                    We're developing an email finder tool that
                                    will automatically discover contact emails
                                    based on company name.
                                </p>
                                <p className="text-sm text-blue-600">
                                    Until then, here are some effective
                                    strategies:
                                </p>
                            </div>

                            <div className="space-y-3">
                                <div className="flex gap-3 items-start">
                                    <Globe className="w-5 h-5 text-blue-500 mt-0.5" />
                                    <div>
                                        <h3 className="font-medium">
                                            Company Website
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Check the company's "Contact,"
                                            "About," or "Team" pages for HR or
                                            hiring manager contact information.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3 items-start">
                                    <Linkedin className="w-5 h-5 text-blue-500 mt-0.5" />
                                    <div>
                                        <h3 className="font-medium">
                                            LinkedIn Research
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Search for the company on LinkedIn,
                                            then identify hiring managers,
                                            recruiters, or HR personnel.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3 items-start">
                                    <Mail className="w-5 h-5 text-blue-500 mt-0.5" />
                                    <div>
                                        <h3 className="font-medium">
                                            Email Pattern Guessing
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Try common email formats like:
                                        </p>
                                        <ul className="list-disc list-inside text-sm text-gray-600 ml-2">
                                            <li>
                                                firstname.lastname@company.com
                                            </li>
                                            <li>firstname@company.com</li>
                                            <li>
                                                firstinitial.lastname@company.com
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex gap-3 items-start">
                                    <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                                    <div>
                                        <h3 className="font-medium">
                                            Verify Email Addresses
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Use email verification services like
                                            Hunter.io, Voila Norbert, or Email
                                            Checker to confirm the email is
                                            valid.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3 items-start">
                                    <Search className="w-5 h-5 text-blue-500 mt-0.5" />
                                    <div>
                                        <h3 className="font-medium">
                                            Email Discovery Tools
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Try services like Clearbit Connect,
                                            Hunter.io, or RocketReach to find
                                            company email addresses.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="text-green-500 w-6 h-6" />
                            <h2 className="text-xl font-semibold">
                                Your Cold Email is Ready!
                            </h2>
                        </div>
                        <button
                            onClick={handleNewEmail}
                            className="text-blue-500 hover:text-blue-700 flex items-center gap-1 text-sm"
                        >
                            <Plus className="w-4 h-4" />
                            Create New Email
                        </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-5 bg-gray-50 mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                            Email Preview
                        </h3>
                        <div className="bg-white p-4 rounded-md shadow-sm">
                            <h3 className="text-md font-bold text-gray-900 mb-2">
                                {emailPreview!.subject}
                            </h3>
                            <h4 className="text-sm text-gray-700 whitespace-pre-wrap">
                                {emailPreview!.body}
                            </h4>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-md flex items-center justify-center gap-2 transition duration-200"
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    emailPreview!.body
                                );
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect
                                    x="9"
                                    y="9"
                                    width="13"
                                    height="13"
                                    rx="2"
                                    ry="2"
                                ></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                            Copy to Clipboard
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ColdEmailing;
