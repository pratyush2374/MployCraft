import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
    FileText,
    Plus,
    Trash,
    Calendar,
    Building2,
    GraduationCap,
    MapPin,
    Briefcase,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Toast from "@/lib/toastClass";
import usePost from "@/hooks/usePost";

interface Education {
    instituteName: string;
    major: string;
    startDate: string;
    endDate: string;
    score: string;
    scoreType: string;
}

interface Experience {
    company: string;
    jobTitle: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
    location: string;
    responsibilities: string;
}

interface FormData {
    education: Education[];
    experience: Experience[];
}

interface EduExpProps {
    setTab: React.Dispatch<React.SetStateAction<number>>;
}

const EduAndExp: React.FC<EduExpProps> = ({ setTab }) => {
    const { register, control, handleSubmit, watch } = useForm<FormData>({
        defaultValues: {
            education: [
                {
                    instituteName: "",
                    major: "",
                    startDate: "",
                    endDate: "",
                    score: "",
                    scoreType: "",
                },
            ],
            experience: [
                {
                    company: "",
                    jobTitle: "",
                    startDate: "",
                    endDate: "",
                    isCurrent: false,
                    location: "",
                    responsibilities: "",
                },
            ],
        },
    });

    const {
        fields: educationFields,
        append: appendEducation,
        remove: removeEducation,
    } = useFieldArray({
        control,
        name: "education",
    });

    const {
        fields: experienceFields,
        append: appendExperience,
        remove: removeExperience,
    } = useFieldArray({
        control,
        name: "experience",
    });

    const { toast } = useToast();
    const {error, post} = usePost("/api/save-edu-exp")
  
    const onSubmit = async(data: FormData) => {
        let isBlankEdu = data.education.some((edu) => !edu.instituteName);
        let isBlankExp = data.experience.some((exp) => !exp.company);
        if (isBlankEdu || isBlankExp) {
            toast(
                new Toast(
                    "Error",
                    "Please enter the institute/company name or remove entries",
                    "destructive"
                )
            );
        }
        const uii = localStorage.getItem("uii")
        await post({...data, uii})
        setTab(3)
    };

    useEffect(() => {
        if (error) {
            toast(
                new Toast(
                    "Error",
                    error || "Some error occured while saving your data",
                    "destructive"
                )
            );
        }
    }, [error]);

    const watchExperienceFields = watch("experience");

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg mt-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                    <FileText className="mr-2 text-blue-500" />
                    Education and Work Experience
                </h1>
                <h2 className="text-xl font-semibold text-gray-600">
                    Step 2/3
                </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-700 flex items-center">
                            <GraduationCap className="mr-2 text-blue-500" />
                            Education
                        </h3>
                        <button
                            type="button"
                            onClick={() =>
                                appendEducation({
                                    instituteName: "",
                                    major: "",
                                    startDate: "",
                                    endDate: "",
                                    score: "",
                                    scoreType: "",
                                })
                            }
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                        >
                            <Plus size={24} />
                        </button>
                    </div>

                    {educationFields.map((field, index) => (
                        <div
                            key={field.id}
                            className="bg-gray-50 p-6 rounded-lg mb-4 relative"
                        >
                            <button
                                type="button"
                                onClick={() => removeEducation(index)}
                                className="absolute right-4 top-4 text-red-400 hover:text-red-600"
                            >
                                <Trash size={20} />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-600 mb-2">
                                        Institute Name
                                    </label>
                                    <div className="relative">
                                        <Building2
                                            className="absolute left-3 top-3 text-gray-400"
                                            size={20}
                                        />
                                        <input
                                            {...register(
                                                `education.${index}.instituteName`
                                            )}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                            placeholder="Enter institute name"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-600 mb-2">
                                        Major
                                    </label>
                                    <input
                                        {...register(
                                            `education.${index}.major`
                                        )}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                        placeholder="Enter major"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-600 mb-2">
                                        Start Date
                                    </label>
                                    <div className="relative">
                                        <Calendar
                                            className="absolute left-3 top-3 text-gray-400"
                                            size={20}
                                        />
                                        <input
                                            type="date"
                                            {...register(
                                                `education.${index}.startDate`
                                            )}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-600 mb-2">
                                        End Date
                                    </label>
                                    <div className="relative">
                                        <Calendar
                                            className="absolute left-3 top-3 text-gray-400"
                                            size={20}
                                        />
                                        <input
                                            type="date"
                                            {...register(
                                                `education.${index}.endDate`
                                            )}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-600 mb-2">
                                        Score
                                    </label>
                                    <input
                                        {...register(
                                            `education.${index}.score`
                                        )}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                        placeholder="Enter score eg: 91/100"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-600 mb-2">
                                        Score Type
                                    </label>
                                    <select
                                        {...register(
                                            `education.${index}.scoreType`
                                        )}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                                    >
                                        <option value="">
                                            Select score type
                                        </option>
                                        <option value="CGPA">CGPA</option>
                                        <option value="GPA">GPA</option>
                                        <option value="PERCENTAGE">
                                            Percentage
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-700 flex items-center">
                            <Briefcase className="mr-2 text-blue-500" />
                            Work Experience
                        </h3>
                        <button
                            type="button"
                            onClick={() =>
                                appendExperience({
                                    company: "",
                                    jobTitle: "",
                                    startDate: "",
                                    endDate: "",
                                    isCurrent: false,
                                    location: "",
                                    responsibilities: "",
                                })
                            }
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                        >
                            <Plus size={24} />
                        </button>
                    </div>

                    {experienceFields.map((field, index) => (
                        <div
                            key={field.id}
                            className="bg-gray-50 p-6 rounded-lg mb-4 relative"
                        >
                            <button
                                type="button"
                                onClick={() => removeExperience(index)}
                                className="absolute right-4 top-4 text-red-400 hover:text-red-600"
                            >
                                <Trash size={20} />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-600 mb-2">
                                        Company
                                    </label>
                                    <div className="relative">
                                        <Building2
                                            className="absolute left-3 top-3 text-gray-400"
                                            size={20}
                                        />
                                        <input
                                            {...register(
                                                `experience.${index}.company`
                                            )}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                            placeholder="Enter company name"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-600 mb-2">
                                        Job Title
                                    </label>
                                    <input
                                        {...register(
                                            `experience.${index}.jobTitle`
                                        )}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                        placeholder="Enter job title"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-600 mb-2">
                                        Start Date
                                    </label>
                                    <div className="relative">
                                        <Calendar
                                            className="absolute left-3 top-3 text-gray-400"
                                            size={20}
                                        />
                                        <input
                                            type="date"
                                            {...register(
                                                `experience.${index}.startDate`
                                            )}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-600 mb-2">
                                        End Date
                                    </label>
                                    <div className="relative">
                                        <Calendar
                                            className="absolute left-3 top-3 text-gray-400"
                                            size={20}
                                        />
                                        <input
                                            type="date"
                                            {...register(
                                                `experience.${index}.endDate`
                                            )}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                            disabled={
                                                watchExperienceFields[index]
                                                    ?.isCurrent
                                            }
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-600 mb-2">
                                        Location
                                    </label>
                                    <div className="relative">
                                        <MapPin
                                            className="absolute left-3 top-3 text-gray-400"
                                            size={20}
                                        />
                                        <input
                                            {...register(
                                                `experience.${index}.location`
                                            )}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                            placeholder="Enter location"
                                        />
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <div className="flex items-center mb-4">
                                        <input
                                            type="checkbox"
                                            {...register(
                                                `experience.${index}.isCurrent`
                                            )}
                                            className="mr-2"
                                        />
                                        <label className="text-gray-600">
                                            I currently work here
                                        </label>
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-gray-600 mb-2">
                                        Responsibilities & Achievements
                                    </label>
                                    <textarea
                                        {...register(
                                            `experience.${index}.responsibilities`
                                        )}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 h-32"
                                        placeholder="Enter your responsibilities and achievements"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                >
                    Save Details
                </button>
            </form>
        </div>
    );
};

export default EduAndExp;
