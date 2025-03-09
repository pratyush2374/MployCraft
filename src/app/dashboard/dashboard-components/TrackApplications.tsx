import { useToast } from "@/hooks/use-toast";
import useGet from "@/hooks/useGet";
import Toast from "@/lib/toastClass";
import {
    Pencil,
    Trash2,
    FileSpreadsheet,
    Download,
    Briefcase,
    Clock,
    Calendar,
    DollarSign,
    Save,
    MoreHorizontal,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    FileText,
} from "lucide-react";
import React, { useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import EditApplication from "./EditApplication";
import usePost from "@/hooks/usePost";

const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
        case "applied":
            return <CheckCircle2 className="text-blue-500 w-5 h-5" />;
        case "interview":
            return <Clock className="text-yellow-500 w-5 h-5" />;
        case "offer":
            return <Save className="text-green-500 w-5 h-5" />;
        case "rejected":
            return <XCircle className="text-red-500 w-5 h-5" />;
        default:
            return <FileText className="text-gray-500 w-5 h-5" />;
    }
};

const toSentenceCase = (text: string) => {
    if (text) {
        return text
            .toLowerCase()
            .replace(/_/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());
    }

    return "";
};

const TrackApplications = () => {
    const { get, loading, resData, error } = useGet("/api/user-applications");
    const { toast } = useToast();
    const { post, error: deleteError } = usePost("/api/delete-application");
    useEffect(() => {
        get();
    }, []);

    useEffect(() => {
        if (error) {
            toast(
                new Toast(
                    "Error",
                    error || "Some error occurred while fetching applications",
                    "destructive"
                )
            );
        }
        if (deleteError) {
            toast(
                new Toast(
                    "Error",
                    deleteError ||
                        "Some error occurred while deleting application",
                    "destructive"
                )
            );
        }
    }, [error, deleteError]);

    const deleteApplication = async (id: string, rcid: string) => {
        await post({ id, rcid });
        toast(new Toast("Success", "Application deleted successfully"));
        setTimeout(() => {
            window.location.reload();
        }, 500);
    };

    const downloadResume = (rcid: string) => {
        window.open(`/api/generate-pdf-resume?rcid=${rcid}`, "_blank");
    };

    const downloadCoverLetter = (rcid: string) => {
        window.open(
            `${process.env.NEXT_URL}/api/generate-pdf-cover-letter?rcid=${rcid}`,
            "_blank"
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen max-w-4xl m-auto">
            <div className="container mx-auto">
                <div className="flex items-center mb-10 space-x-4">
                    <Briefcase className="w-6 h-6 md:w-10 md:h-10 text-blue-600" />
                    <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                        Your Job Applications
                    </h1>
                </div>

                {resData?.data.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-xl shadow-md">
                        <p className="text-2xl text-gray-400">
                            No applications tracked yet
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {resData?.data.map((applications: any) => (
                            <div
                                key={applications.id}
                                className="bg-white border-l-4 border-blue-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 relative group"
                            >
                                <div className="absolute top-2 right-2 transition-opacity duration-300">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="focus:outline-none">
                                            <MoreHorizontal className="text-gray-500 hover:text-blue-600" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    downloadResume(
                                                        applications.rcid
                                                    )
                                                }
                                                className="cursor-pointer flex items-center space-x-2"
                                            >
                                                <FileSpreadsheet className="w-4 h-4" />
                                                <span>Download Resume</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    downloadCoverLetter(
                                                        applications.rcid
                                                    )
                                                }
                                                className="cursor-pointer flex items-center space-x-2"
                                            >
                                                <Download className="w-4 h-4" />
                                                <span>
                                                    Download Cover Letter
                                                </span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                <div className="flex items-start space-x-4 mb-4">
                                    <div className="flex-grow">
                                        <div className="flex items-center space-x-2 mb-1">
                                            {getStatusIcon(applications.status)}
                                            <h2 className="text-lg md:text-2xl font-bold text-gray-800">
                                                {applications.company}
                                            </h2>
                                        </div>
                                        <p className="text-gray-600 text-sm md:text-lg flex items-center space-x-2">
                                            <Briefcase className="w-4 h-4 mr-2" />
                                            {applications.position}
                                        </p>
                                    </div>

                                    <div className="flex space-x-2">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button className="text-blue-600 hover:bg-blue-100 p-2 rounded-full transition">
                                                    <Pencil className="w-5 h-5" />
                                                </button>
                                            </DialogTrigger>

                                            <DialogContent>
                                                <EditApplication
                                                    id={applications.id}
                                                    rcid={applications.rcid}
                                                    company={
                                                        applications.company
                                                    }
                                                    position={
                                                        applications.position
                                                    }
                                                    status={applications.status}
                                                    notes={applications.notes}
                                                    salary={applications.salary}
                                                />
                                            </DialogContent>
                                        </Dialog>

                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button className="text-red-600 hover:bg-red-100 p-2 rounded-full transition">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle className="text-red-600 flex items-center space-x-2">
                                                        <Trash2 className="w-6 h-6" />
                                                        <span>
                                                            Delete Application
                                                        </span>
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <DialogDescription>
                                                    Are you sure you want to
                                                    delete this application for{" "}
                                                    {applications.company}?
                                                </DialogDescription>
                                                <div className="flex justify-end space-x-2 mt-4">
                                                    <button
                                                        onClick={() =>
                                                            deleteApplication(
                                                                applications.id,
                                                                applications.rcid
                                                            )
                                                        }
                                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition flex items-center space-x-2"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        <span>
                                                            Confirm Delete
                                                        </span>
                                                    </button>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-3 text-sm text-gray-600 mb-4">
                                    <div className="flex items-center space-x-2">
                                        <Clock className="w-4 h-4 text-blue-500" />
                                        <span className="font-medium">
                                            Status:
                                        </span>
                                        <span className="font-semibold">
                                            {toSentenceCase(
                                                applications.status
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="w-4 h-4 text-green-500" />
                                        <span className="font-medium mr-1">
                                            Applied:
                                        </span>
                                        <span>
                                            {new Date(
                                                applications.appliedAt
                                            ).toDateString()}
                                        </span>
                                    </div>
                                    {applications?.salary && (
                                        <div className="flex items-center space-x-2">
                                            <DollarSign className="w-4 h-4 text-purple-500" />
                                            <span className="font-medium">
                                                Salary:
                                            </span>
                                            <span>{applications.salary}</span>
                                        </div>
                                    )}
                                </div>

                                {applications?.notes && (
                                    <div className="bg-blue-50 border-l-4 border-blue-300 p-3 rounded-r-lg">
                                        <div className="flex items-start space-x-2">
                                            <AlertTriangle className="w-5 h-5 text-blue-500 mt-1" />
                                            <div>
                                                <span className="font-sm font-semibold text-blue-700">
                                                    Notes:
                                                </span>
                                                <p className="text-gray-700">
                                                    {applications.notes}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrackApplications;
