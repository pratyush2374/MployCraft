import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import usePost from "@/hooks/usePost";
import Toast from "@/lib/toastClass";
import { useEffect } from "react";
import { Education } from "./ProfileSettings";
import {
    BookOpen,
    Calendar,
    Award,
    Building,
    Trophy,
    AlertCircle,
} from "lucide-react";

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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-3">
            <div className="space-y-1.5">
                <label className="flex items-center text-sm font-medium text-gray-700">
                    <Building className="h-4 w-4 text-blue-500 mr-1.5" />
                    Institute Name<span className="text-red-500 ml-0.5">*</span>
                </label>
                <input
                    type="text"
                    placeholder="E.g., Harvard University"
                    {...register("instituteName", {
                        required: "Institute Name is required",
                    })}
                    className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
                {errors.instituteName && (
                    <p className="text-red-500 text-sm flex items-center mt-1">
                        <AlertCircle className="h-3.5 w-3.5 mr-1" />
                        {errors.instituteName.message}
                    </p>
                )}
            </div>

            <div className="space-y-1.5">
                <label className="flex items-center text-sm font-medium text-gray-700">
                    <BookOpen className="h-4 w-4 text-blue-500 mr-1.5" />
                    Major/Field of Study
                </label>
                <input
                    type="text"
                    placeholder="E.g., Computer Science"
                    {...register("major")}
                    className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                        <Award className="h-4 w-4 text-blue-500 mr-1.5" />
                        Score
                    </label>
                    <input
                        type="text"
                        placeholder="E.g., 3.8"
                        {...register("score")}
                        className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                        <Award className="h-4 w-4 text-blue-500 mr-1.5" />
                        Score Type
                    </label>
                    <select
                        {...register("scoreType")}
                        className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition-all"
                    >
                        <option value="CGPA">CGPA</option>
                        <option value="PERCENTAGE">PERCENTAGE</option>
                        <option value="GPA">GPA</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                        <Calendar className="h-4 w-4 text-blue-500 mr-1.5" />
                        Start Date
                    </label>
                    <input
                        type="date"
                        {...register("startDate")}
                        className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                        <Calendar className="h-4 w-4 text-blue-500 mr-1.5" />
                        End Date
                    </label>
                    <input
                        type="date"
                        {...register("endDate")}
                        className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="flex items-center text-sm font-medium text-gray-700">
                    <Trophy className="h-4 w-4 text-blue-500 mr-1.5" />
                    Achievements
                </label>
                <textarea
                    placeholder="List your key achievements, honors, or relevant activities"
                    {...register("achievements")}
                    rows={3}
                    className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
            </div>

            <div className="pt-2">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isSubmitting ? (
                        <>
                            <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            {`${purpose}ing...`}
                        </>
                    ) : (
                        `${purpose} Education`
                    )}
                </button>
            </div>
        </form>
    );
};

export default ModifyEducation;
