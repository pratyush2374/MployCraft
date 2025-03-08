import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import usePost from "@/hooks/usePost";
import Toast from "@/lib/toastClass";
import { useEffect } from "react";
import { Education } from "./ProfileSettings";

interface ModifyEducationProps {
    education?: Education;
    purpose: "Add" | "Edit";
}

const ModifyEducation: React.FC<ModifyEducationProps> = ({
    education,
    purpose,
}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<Education>({
        defaultValues: education,
    });

    useEffect(() => {
        if (education) {
            reset({
                ...education,
                startDate: education.startDate
                    ? new Date(education.startDate).toISOString().split("T")[0]
                    : "",
                endDate: education.endDate
                    ? new Date(education.endDate).toISOString().split("T")[0]
                    : "",
            });
        }
    }, [education, reset]);

    const { post, error, resData } = usePost("/api/modify-education");
    const { toast } = useToast();

    const onSubmit = async (data: Education) => {
        await post({ ...data, id: education?.id || undefined, purpose });
    };

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (resData && resData.success) {
            toast(
                new Toast(
                    "Success",
                    `Education ${purpose.toLowerCase()}ed successfully`
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
                    Institute Name
                </label>
                <input
                    type="text"
                    {...register("instituteName", {
                        required: "Institute Name is required",
                    })}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
                {errors.instituteName && (
                    <p className="text-red-500 text-sm">
                        {errors.instituteName.message}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Major
                </label>
                <input
                    type="text"
                    {...register("major")}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Score
                </label>
                <input
                    type="text"
                    {...register("score")}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
                <label
                    htmlFor="scoreType"
                    className="block text-sm font-medium text-gray-700"
                >
                    Score Type
                </label>
                <select id="scoreType" {...register("scoreType")}>
                    <option value="CGPA">CGPA</option>
                    <option value="Percentage">Percentage</option>
                    <option value="GPA">GPA</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Start Date
                </label>
                <input
                    type="date"
                    {...register("startDate")}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />

                <label className="block text-sm font-medium text-gray-700">
                    End Date
                </label>
                <input
                    type="date"
                    {...register("endDate")}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Achievements
                </label>
                <textarea
                    {...register("achievements")}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
                {isSubmitting ? `${purpose}ing...` : `${purpose} Education`}
            </button>
        </form>
    );
};

export default ModifyEducation;
