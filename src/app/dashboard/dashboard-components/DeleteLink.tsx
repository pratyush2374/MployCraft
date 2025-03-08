interface Link {
    id: string;
    type: string;
    url: string;
}

interface DeleteLinkProps {
    link: Link;
}

import { useToast } from "@/hooks/use-toast";
import usePost from "@/hooks/usePost";
import Toast from "@/lib/toastClass";
import { useEffect } from "react";

const DeleteLink: React.FC<DeleteLinkProps> = ({ link: { id, type } }) => {
    const { post, error, resData } = usePost("/api/delete-link");
    const { toast } = useToast();

    const deleteUrl = async () => {
        await post({ id, type });
    };

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (resData && resData.success) {
            toast(new Toast("Success", "Link deleted successfully"));
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
        <div className="">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Are you sure you want to delete {type} URL?
            </h2>
            <button
                onClick={deleteUrl}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:opacity-50"
            >
                Delete
            </button>
        </div>
    );
};

export default DeleteLink;
