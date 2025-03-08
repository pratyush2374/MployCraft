import { useToast } from "@/hooks/use-toast";
import usePost from "@/hooks/usePost";
import Toast from "@/lib/toastClass";
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
        <label htmlFor="url" className="block text-sm font-medium text-gray-700">
          Edit url for {type}
        </label>
        <input
          id="url"
          type="url"
          {...register("url", { required: "URL is required" })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
        />
        {errors.url && <p className="text-red-500 text-sm mt-1">{errors.url.message}</p>}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
      >
        {isSubmitting ? "Updating..." : "Update Link"}
      </button>
    </form>
  );
};

export default EditLink;