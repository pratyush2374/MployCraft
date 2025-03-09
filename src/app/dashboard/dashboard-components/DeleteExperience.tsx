import { WorkExperience } from "./ProfileSettings";
import usePost from "@/hooks/usePost";
import Toast from "@/lib/toastClass";
import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface DeleteExperienceProps {
    workExperience: WorkExperience;
}

const DeleteExperience: React.FC<DeleteExperienceProps> = ({
    workExperience: { id, company },
}) => {
    const { post, error, resData, loading } = usePost("/api/delete-experience");
    const { toast } = useToast();

    const deleteExperience = async () => {
        await post({ id });
    };

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (resData && resData.success) {
            toast(new Toast("Success", "Work experience deleted successfully"));
            timeout = setTimeout(() => {
                window.location.reload();
            }, 500);
        }
        if (error) {
            toast(
                new Toast(
                    "Error",
                    error || "Something went wrong",
                    "destructive"
                )
            );
        }

        return () => clearInterval(timeout);
    }, [resData, error, toast]);
    return (
        <div className="space-y-4">
            <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                    <AlertTriangle className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                    <h2 className="text-base font-medium text-gray-800">
                        Are you sure you want to delete you work experience at{" "}
                        {company}?
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        This action cannot be undone.
                    </p>
                </div>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
                <button
                    onClick={deleteExperience}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                    {loading ? "Deleting..." : "Delete"}
                </button>
            </div>
        </div>
    );
};

export default DeleteExperience;
