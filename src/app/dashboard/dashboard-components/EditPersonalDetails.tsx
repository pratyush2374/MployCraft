import { useToast } from "@/hooks/use-toast";
import usePost from "@/hooks/usePost";
import Toast from "@/lib/toastClass";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface PersonalDetails {
    fullName: string;
    username: string;
    contactNumber?: string;
    location?: string;
    professionalSummary?: string;
}

const EditPersonalDetails: React.FC<PersonalDetails> = ({fullName, username, contactNumber, location, professionalSummary}) => {
    const {register, handleSubmit, formState : {errors, isSubmitting}} = useForm<PersonalDetails>()
    const {post, error} = usePost("/api/update-personal-details")
    const {toast} = useToast();
    const onSubmit = async(data : PersonalDetails) => {
        await post(data)
        toast(new Toast("Success", "Personal details updated successfully"))
    }

    useEffect(() => {
        if (error) {
            toast(new Toast("Error", error || "Something went wrong", "destructive"));
        }
    }, [error])
    return <>

        <h1>Edit Personal Details</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" defaultValue={fullName} {...register("fullName", {required : "Full Name is required"})} />
            <input type="text" defaultValue={username} {...register("username", {required : "Username is required"})} />
            <input type="text" defaultValue={contactNumber} {...register("contactNumber")} />
            <input type="text" defaultValue={location} {...register("location")} />
            <textarea defaultValue={professionalSummary} {...register("professionalSummary")} />
            <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"}</button>
        </form>
    </>;
};

export default EditPersonalDetails;
