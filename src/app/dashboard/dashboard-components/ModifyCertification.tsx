import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import usePost from "@/hooks/usePost";
import Toast from "@/lib/toastClass";
import { useEffect } from "react";
import { Award, Building, Link, FileText, Loader2 } from "lucide-react";

interface Certification {
    id: string;
    name: string;
    userInfoId: string | null;
    issuedBy: string | null;
    certificateIdOrURL: string | null;
    additionalInformation: string | null;
}

interface ModifyCertificationProps {
    certification?: Certification;
    purpose: "Add" | "Edit";
}

const ModifyCertification: React.FC<ModifyCertificationProps> = ({
    certification,
    purpose,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<Certification>({
        defaultValues: certification,
    });

    useEffect(() => {
        if (certification) {
            reset(certification);
        }
    }, [certification, reset]);

    const { post, error, resData } = usePost("/api/modify-certification");
    const { toast } = useToast();

    const onSubmit = async (data: Certification) => {
        await post({ ...data, id: certification?.id || undefined, purpose });
    };

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (resData && resData.success) {
            toast(
                new Toast(
                    "Success",
                    `Certification ${purpose.toLowerCase()}ed successfully`
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
            clearTimeout(timeout);
        };
    }, [resData, error, toast, purpose]);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Award size={16} className="text-blue-500" />
                            <label className="text-sm font-medium text-gray-700">
                                Certification Name
                            </label>
                        </div>
                        <input
                            type="text"
                            placeholder="e.g. AWS Solutions Architect"
                            {...register("name", {
                                required: "Name is required",
                            })}
                            className="w-full p-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Building size={16} className="text-blue-500" />
                            <label className="text-sm font-medium text-gray-700">
                                Issued By
                            </label>
                        </div>
                        <input
                            type="text"
                            placeholder="e.g. Amazon Web Services"
                            {...register("issuedBy")}
                            className="w-full p-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                        />
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Link size={16} className="text-blue-500" />
                            <label className="text-sm font-medium text-gray-700">
                                Certificate ID or URL
                            </label>
                        </div>
                        <input
                            type="text"
                            placeholder="e.g. AWS-123456 or https://verify.aws/cert/123456"
                            {...register("certificateIdOrURL")}
                            className="w-full p-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                        />
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <FileText size={16} className="text-blue-500" />
                            <label className="text-sm font-medium text-gray-700">
                                Additional Information
                            </label>
                        </div>
                        <textarea
                            placeholder="Any additional details about your certification"
                            {...register("additionalInformation")}
                            className="w-full p-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm min-h-24"
                        />
                    </div>
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-500 text-white px-5 py-2.5 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 w-full flex items-center justify-center gap-2 text-sm font-medium"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                <span>{`${purpose}ing...`}</span>
                            </>
                        ) : (
                            <>
                                <Award size={16} />
                                <span>{`${purpose} Certification`}</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ModifyCertification;
