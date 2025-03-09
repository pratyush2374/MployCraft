import { WorkExperience } from "./ProfileSettings";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import usePost from "@/hooks/usePost";
import Toast from "@/lib/toastClass";
import { useEffect } from "react";

interface ModifyExperienceProps {
    workExperience?: WorkExperience;
    purpose: "Add" | "Edit";
}

const ModifyExperience: React.FC<ModifyExperienceProps> = ({
    workExperience,
    purpose,
}) => {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<WorkExperience>({
        defaultValues: workExperience,
    });

    // Watch for changes in isCurrent
    const isCurrent = watch("isCurrent", workExperience?.isCurrent || false);

    useEffect(() => {
        if (workExperience) {
            reset({
                ...workExperience,
                startDate: workExperience.startDate
                    ? new Date(workExperience.startDate)
                          .toISOString()
                          .split("T")[0]
                    : "",
                endDate:
                    workExperience.endDate && !workExperience.isCurrent
                        ? new Date(workExperience.endDate)
                              .toISOString()
                              .split("T")[0]
                        : "",
            });
        }
    }, [workExperience, reset]);

    // If isCurrent is checked, clear endDate
    useEffect(() => {
        if (isCurrent) {
            setValue("endDate", ""); // Clear endDate when isCurrent is checked
        }
    }, [isCurrent, setValue]);

    const { post, error, resData } = usePost("/api/modify-experience");
    const { toast } = useToast();

    const onSubmit = async (data: WorkExperience) => {
        await post({ ...data, id: workExperience?.id || undefined, purpose });
    };

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (resData && resData.success) {
            toast(
                new Toast(
                    "Success",
                    `Experience ${purpose.toLowerCase()}ed successfully`
                )
            );
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

        return () => {
            clearInterval(timeout);
        };
    }, [resData, error, toast]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Company
                </label>
                <input
                    type="text"
                    {...register("company", {
                        required: "Company is required",
                    })}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
                {errors.company && (
                    <p className="text-red-500 text-sm">
                        {errors.company.message}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Job Title
                </label>
                <input
                    type="text"
                    {...register("jobTitle", {
                        required: "Job title is required",
                    })}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Start Date
                </label>
                <input
                    type="date"
                    {...register("startDate", {
                        required: "Start date is required",
                    })}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    End Date
                </label>
                <input
                    type="date"
                    {...register("endDate")}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm disabled:bg-gray-200"
                    disabled={isCurrent}
                />
            </div>

            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    id="isCurrent"
                    {...register("isCurrent")}
                />
                <label
                    htmlFor="isCurrent"
                    className="text-sm font-medium text-gray-700"
                >
                    I currently work here
                </label>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Location
                </label>
                <input
                    type="text"
                    {...register("location")}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Achievements & Responsibilities
                </label>
                <textarea
                    {...register("achievementsAndResponsibilities")}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
                {isSubmitting ? `${purpose}ing...` : `${purpose} Experience`}
            </button>
        </form>
    );
};

export default ModifyExperience;
