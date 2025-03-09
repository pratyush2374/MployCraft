import React, { useRef } from "react";
import {
    CheckCircle,
    FileText,
    Download,
    RefreshCw,
    ArrowRight,
    Send,
    MessageSquare,
    Mail,
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import Toast from "@/lib/toastClass";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface GeneratedResumeContentProps {
    data: any;
    setGenerated: React.Dispatch<React.SetStateAction<boolean>>;
}

const GeneratedContent: React.FC<GeneratedResumeContentProps> = ({
    data,
    setGenerated,
}) => {
    const { toast } = useToast();
    const sal = useRef<HTMLInputElement>(null);

    const handleResumeDownload = () => {
        if (data.rcid) {
            window.open(`/api/generate-pdf-resume?rcid=${data.rcid}`, "_blank");
        } else {
            toast(new Toast("Error", "Something went wrong", "destructive"));
        }
    };

    const handleCoverLetterDownload = () => {
        if (!sal.current?.value) {
            toast(new Toast("Error", "Please enter salutation", "destructive"));
            return;
        }

        if (data.rcid) {
            window.open(
                `/api/generate-pdf-cover-letter?rcid=${data.rcid}&sal=${sal.current.value}`,
                "_blank"
            );
        } else {
            toast(new Toast("Error", "Something went wrong", "destructive"));
        }
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
                    href={`/applications/${data.rcid}`}
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
                <Dialog>
                    <DialogTrigger className="flex items-center justify-center border border-blue-500 text-blue-500 py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors">
                        <FileText size={18} className="mr-2" />
                        Download Cover Letter
                    </DialogTrigger>
                    <DialogContent className="bg-white rounded-lg shadow-lg border border-blue-100 p-6 max-w-md mx-auto">
                        <DialogHeader className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <MessageSquare className="text-blue-500 w-5 h-5" />
                                <DialogTitle asChild>
                                    <h1 className="text-xl font-semibold text-gray-800">
                                        Customize Your Greeting
                                    </h1>
                                </DialogTitle>
                            </div>
                            <p className="text-sm text-gray-500">
                                Add a personal touch to your application with a
                                custom salutation.
                            </p>
                            <div className="relative mt-2">
                                <Mail className="absolute left-3 top-3 text-blue-400 w-5 h-5" />
                                <input
                                    type="text"
                                    ref={sal}
                                    placeholder="e.g., Dear Hiring Manager, Hello Team, etc."
                                    className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-700"
                                />
                            </div>
                            <div className="flex justify-end mt-4">
                                <button
                                    className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200 ease-in-out"
                                    onClick={handleCoverLetterDownload}
                                >
                                    <Send className="w-4 h-4" />
                                    <span>Continue</span>
                                </button>
                            </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
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
