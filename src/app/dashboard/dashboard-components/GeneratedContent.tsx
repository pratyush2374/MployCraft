import React from "react";
import {
    CheckCircle,
    FileText,
    Download,
    RefreshCw,
    ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface GeneratedResumeContentProps {
    data: any;
    setGenerated: React.Dispatch<React.SetStateAction<boolean>>;
}

const GeneratedContent: React.FC<GeneratedResumeContentProps> = ({
    data,
    setGenerated,
}) => {
    const handleResumeDownload = () => {
        console.log("Clicked");
    };

    const handleCoverLetterDownload = () => {
        console.log("Clicked");
    };
    return (
        <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-5xl mx-auto">
            <div className="flex items-center mb-6">
                <CheckCircle className="text-blue-500 mr-3" size={24} />
                <h1 className="text-xl font-semibold text-blue-500">
                    Success!
                </h1>
            </div>

            <div className="bg-blue-50 rounded-xl p-5 mb-6">
                <h2 className="text-lg font-medium text-gray-800 mb-1">
                    Your application for{" "}
                    <span className="text-blue-600">{data.position}</span> at{" "}
                    <span className="text-blue-600">{data.companyName}</span> is
                    ready!
                </h2>
                <p className="text-gray-600 text-sm">
                    All documents have been tailored to match the job
                    requirements.
                </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="text-md font-medium text-gray-700 mb-3">
                    Cover Letter Preview
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {data.coverLetter}
                </p>
                <Link
                    href={`/resume/${data.rcid}`}
                    className="inline-flex items-center text-blue-500 text-sm font-medium hover:text-blue-700 transition-colors"
                >
                    View full application{" "}
                    <ArrowRight size={16} className="ml-1" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <button
                    onClick={handleResumeDownload}
                    className="flex items-center justify-center bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    <Download size={18} className="mr-2" />
                    Download Resume
                </button>

                <button
                    onClick={handleCoverLetterDownload}
                    className="flex items-center justify-center border border-blue-500 text-blue-500 py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors"
                >
                    <FileText size={18} className="mr-2" />
                    Download Cover Letter
                </button>
            </div>

            <button
                onClick={() => setGenerated(false)}
                className="flex items-center justify-center w-full border border-gray-300 text-gray-600 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
                <RefreshCw size={18} className="mr-2" />
                Generate Another Application
            </button>
        </div>
    );
};

export default GeneratedContent;
