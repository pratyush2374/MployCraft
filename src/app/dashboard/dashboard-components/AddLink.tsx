import { useToast } from "@/hooks/use-toast";
import usePost from "@/hooks/usePost";
import Toast from "@/lib/toastClass";
import { useEffect } from "react";
import { set, useForm } from "react-hook-form";

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
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="url"
                    {...register("link", { required: "Link is required" })}
                />
                <select {...register("type")}>
                    {links.map((link) => (
                        <option key={link}>{link}</option>
                    ))}
                </select>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save"}
                </button>
            </form>
        </>
    );
};

export default AddLink;
