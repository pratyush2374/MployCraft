import { useToast } from "@/hooks/use-toast";
import usePost from "@/hooks/usePost";
import Toast from "@/lib/toastClass";
import { Link } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface Link {
  id: string;
  type: string;
  url: string;
}

interface EditLinkProps {
  link: Link;
}

const EditLink: React.FC<EditLinkProps> = ({ link: { id, type, url } }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Link>({
    defaultValues: { url },
  });

  const { post, error, resData } = usePost("/api/update-link");
  const { toast } = useToast();

  const onSubmit = async (data: Pick<Link, "url">) => {
    await post({ id, type, url: data.url });
  };

  useEffect(() => {
    if (resData && resData.success) {
      toast(new Toast("Success", "Link updated successfully"));
    }
    if (error) {
      toast(new Toast("Error", error || "Something went wrong", "destructive"));
    }
  }, [resData, error, toast]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
          Edit URL for {type}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Link className="h-4 w-4 text-gray-400" />
          </div>
          <input
            id="url"
            type="url"
            className="pl-10 w-full p-2.5 bg-white border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            {...register('url', { required: 'URL is required' })}
          />
        </div>
        {errors.url && (
          <p className="mt-1 text-sm text-red-500">{errors.url.message}</p>
        )}
      </div>
      
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2.5 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {isSubmitting ? 'Updating...' : 'Update Link'}
        </button>
      </div>
    </form>
  );
};

export default EditLink;