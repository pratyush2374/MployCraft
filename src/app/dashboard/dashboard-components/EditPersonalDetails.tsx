import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import usePost from "@/hooks/usePost";
import Toast from "@/lib/toastClass";
import { DialogFooter } from "@/components/ui/dialog";
import {
    User,
    AtSign,
    Phone,
    MapPin,
    FileText,
    Save,
    Loader2,
} from "lucide-react";

interface PersonalDetails {
    fullName: string;
    username: string;
    contactNumber?: string;
    location?: string;
    professionalSummary?: string;
}

const EditPersonalDetails: React.FC<PersonalDetails> = ({
    fullName,
    username,
    contactNumber,
    location,
    professionalSummary,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<PersonalDetails>();

    const { post, error, resData } = usePost("/api/update-personal-details");
    const { toast } = useToast();

    const onSubmit = async (data: PersonalDetails) => {
        await post(data);
    };

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (error) {
            toast(
                new Toast(
                    "Error",
                    error || "Something went wrong",
                    "destructive"
                )
            );
        }
        if (resData && resData.success) {
            toast(
                new Toast("Success", "Personal details updated successfully")
            );
            timeout = setTimeout(() => {
                window.location.reload();
            }, 500);
        }

        return () => clearInterval(timeout);
    }, [error, toast, resData]);

    return (
        <div className="py-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-4">
                    <div className="flex gap-4">
                        {/* Full Name Input */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-blue-500" />
                                <label className="text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    className={`w-full px-4 py-2 rounded-md border ${
                                        errors.fullName
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="Enter your full name"
                                    defaultValue={fullName}
                                    {...register("fullName", {
                                        required: "Full Name is required",
                                    })}
                                />
                                {errors.fullName && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.fullName.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Username Input */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <AtSign className="h-4 w-4 text-blue-500" />
                                <label className="text-sm font-medium text-gray-700">
                                    Username
                                </label>
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    className={`w-full px-4 py-2 rounded-md border ${
                                        errors.username
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="Enter your username"
                                    defaultValue={username}
                                    {...register("username", {
                                        required: "Username is required",
                                    })}
                                />
                                {errors.username && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.username.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        {/* Contact Number Input */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-blue-500" />
                                <label className="text-sm font-medium text-gray-700">
                                    Contact Number
                                </label>
                            </div>
                            <input
                                type="text"
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your contact number"
                                defaultValue={contactNumber}
                                {...register("contactNumber")}
                            />
                        </div>

                        {/* Location Input */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-blue-500" />
                                <label className="text-sm font-medium text-gray-700">
                                    Location
                                </label>
                            </div>
                            <input
                                type="text"
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your location"
                                defaultValue={location}
                                {...register("location")}
                            />
                        </div>
                    </div>

                    {/* Professional Summary Textarea */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-500" />
                            <label className="text-sm font-medium text-gray-700">
                                Professional Summary
                            </label>
                        </div>
                        <textarea
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-24"
                            placeholder="Tell us about your professional background"
                            defaultValue={professionalSummary}
                            {...register("professionalSummary")}
                        />
                    </div>
                </div>

                <DialogFooter className="mt-6">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="h-4 w-4" />
                                Save Changes
                            </>
                        )}
                    </button>
                </DialogFooter>
            </form>
        </div>
    );
};

export default EditPersonalDetails;
