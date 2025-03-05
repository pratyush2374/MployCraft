import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import React from "react";
import { useForm } from "react-hook-form";
import {
    Briefcase,
    Calendar,
    DollarSign,
    FileText,
    CheckCircle2,
    Save,
} from "lucide-react";

interface EditApplicationProps {
    id: string;
    rcid: string;
    company: string;
    position: string;
    status: string;
    salary?: string;
    notes?: string;
}

interface EditFormData {
    id: string;
    companyName: string;
    position: string;
    status:
        | "APPLIED"
        | "SCREENING"
        | "INTERVIEW_SCHEDULED"
        | "TECHNICAL_ROUND"
        | "HR_ROUND"
        | "OFFER_RECEIVED"
        | "ACCEPTED"
        | "REJECTED"
        | "WITHDRAWN";
    notes?: string;
    salary?: number;
    rcid: string;
}

const statusArray = [
    "APPLIED",
    "SCREENING",
    "INTERVIEW_SCHEDULED",
    "TECHNICAL_ROUND",
    "HR_ROUND",
    "OFFER_RECEIVED",
    "ACCEPTED",
    "REJECTED",
    "WITHDRAWN",
];

const EditApplication: React.FC<EditApplicationProps> = ({
    company,
    id,
    rcid,
    position,
    status,
    notes,
    salary,
}) => {
    const { toast } = useToast();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<EditFormData>({
        defaultValues: {
            companyName: company,
            position: position,
            status: status as EditFormData["status"],
            salary: salary ? parseFloat(salary) : undefined,
            notes: notes,
            id: id,
            rcid: rcid,
        },
    });

    const onSubmit = (data: EditFormData) => {
        console.log(data);
        console.log(id);
        console.log(rcid);
    };

    return (
        <div className="p-2">
            <DialogHeader className="mb-6">
                <DialogTitle className="text-2xl font-bold text-blue-600 flex items-center space-x-2">
                    <Save className="w-6 h-6" />
                    <span>Update Application</span>
                </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="relative">
                    <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <Briefcase className="w-4 h-4 mr-2 text-blue-500" />
                        Company Name
                    </label>
                    <input
                        type="text"
                        {...register("companyName", {
                            required: "Company name is required",
                        })}
                        className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        placeholder="Enter company name"
                    />
                    {errors.companyName && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.companyName.message}
                        </p>
                    )}
                </div>

                <div className="relative">
                    <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FileText className="w-4 h-4 mr-2 text-blue-500" />
                        Position
                    </label>
                    <input
                        type="text"
                        {...register("position", {
                            required: "Position is required",
                        })}
                        className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        placeholder="Enter position"
                    />
                    {errors.position && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.position.message}
                        </p>
                    )}
                </div>

                <div className="relative">
                    <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-blue-500" />
                        Status
                    </label>
                    <select
                        {...register("status", {
                            required: "Status is required",
                        })}
                        className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                        {statusArray.map((statusOption) => (
                            <option key={statusOption} value={statusOption}>
                                {statusOption.replace(/_/g, " ")}
                            </option>
                        ))}
                    </select>
                    {errors.status && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.status.message}
                        </p>
                    )}
                </div>

                <div className="relative">
                    <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <DollarSign className="w-4 h-4 mr-2 text-blue-500" />
                        Salary (Optional)
                    </label>
                    <input
                        type="number"
                        {...register("salary")}
                        className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        placeholder="Enter salary"
                    />
                </div>

                <div className="relative">
                    <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FileText className="w-4 h-4 mr-2 text-blue-500" />
                        Notes (Optional)
                    </label>
                    <textarea
                        {...register("notes")}
                        className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        placeholder="Enter additional notes"
                        rows={3}
                    />
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition flex items-center space-x-2 disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" />
                        <span>
                            {isSubmitting
                                ? "Updating..."
                                : "Update Application"}
                        </span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditApplication;
