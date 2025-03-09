import { useToast } from "@/hooks/use-toast";
import usePost from "@/hooks/usePost";
import Toast from "@/lib/toastClass";
import { Link } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface AddLinksProps {
    links: string[];
}

const AddLink: React.FC<AddLinksProps> = ({ links }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<{ link: string; type: string }>();
    const { toast } = useToast();
    const { post, error, resData } = usePost("/api/add-link");
    const onSubmit = async (data: { link: string; type: string }) => {
        await post(data);
    };
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (resData && resData.success) {
            toast(new Toast("Success", "Link added successfully"));
            interval = setTimeout(() => {
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

        return () => clearInterval(interval);
    }, [resData, error]);
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
              URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Link className="h-4 w-4 text-gray-400" />
              </div>
              <input
                id="link"
                type="url"
                placeholder="https://example.com"
                className="pl-10 w-full p-2.5 bg-white border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                {...register('link', { required: 'Link is required' })}
              />
            </div>
            {errors.link && (
              <p className="mt-1 text-sm text-red-500">{errors.link.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Link Type
            </label>
            <select
              id="type"
              className="w-full p-2.5 bg-white border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              {...register('type')}
            >
              {links.map((link) => (
                <option key={link} value={link}>
                  {link}
                </option>
              ))}
            </select>
          </div>
          
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white py-2.5 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isSubmitting ? 'Saving...' : 'Save Link'}
            </button>
          </div>
        </form>
      );
};

export default AddLink;
