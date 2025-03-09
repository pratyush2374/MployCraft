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
import { AlertTriangle } from "lucide-react";
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
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <h2 className="text-base font-medium text-gray-800">
                Are you sure you want to delete {type} URL?
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                This action cannot be undone.
              </p>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-2">
            <button
              onClick={deleteUrl}
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      );
};

export default DeleteLink;
