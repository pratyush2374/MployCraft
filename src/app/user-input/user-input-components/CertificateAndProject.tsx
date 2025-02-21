import React, { useEffect, useRef } from "react";
import {
    FileText,
    Plus,
    Trash,
    Calendar,
    Link,
    Award,
    Building2,
    X,
    Save,
} from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import Toast from "@/lib/toastClass";
import usePost from "@/hooks/usePost";


interface Certification {
    name: string;
    issuedBy: string;
    certificateIdOrURL: string;
    additionalInformation: string;
}

interface Project {
    title: string;
    skillsUsed: string[];
    description: string;
    startDate: string;
    endDate: string;
    url: string[];
}

interface FormData {
    certifications: Certification[];
    projects: Project[];
}

const CertificateAndProject: React.FC = () => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        formState: { isSubmitting },
    } = useForm<FormData>({
        defaultValues: {
            certifications: [
                {
                    name: "",
                    issuedBy: "",
                    certificateIdOrURL: "",
                    additionalInformation: "",
                },
            ],
            projects: [
                {
                    title: "",
                    skillsUsed: [],
                    description: "",
                    startDate: "",
                    endDate: "",
                    url: [],
                },
            ],
        },
    });

    const {
        fields: certificationFields,
        append: appendCertification,
        remove: removeCertification,
    } = useFieldArray({
        control,
        name: "certifications",
    });

    const {
        fields: projectFields,
        append: appendProject,
        remove: removeProject,
    } = useFieldArray({
        control,
        name: "projects",
    });

    const skillInputRef = useRef<HTMLInputElement>(null);
    const urlInputRef = useRef<HTMLInputElement>(null);

    const removeValue = (
        projectIndex: number,
        field: "skillsUsed" | "url",
        valueIndex: number
    ) => {
        const currentValues = watch(`projects.${projectIndex}.${field}`) || [];
        const newValues = currentValues.filter(
            (_, index) => index !== valueIndex
        );
        setValue(`projects.${projectIndex}.${field}`, newValues);
    };

    const {toast} = useToast()
    const {error, post} =  usePost("/api/save-proj-cert")
    
    const onSubmit = async(data: FormData) => {
        const areProjectTitleBlank = data.projects.some(project => !project.title)
        const areCertificationsBlank = data.certifications.some(cet => !cet.name)
        if (areProjectTitleBlank || areCertificationsBlank) {
            toast(new Toast("Error", "Please enter title/name for projects and certifications, else remove them", "destructive"))
            return;
        }
        const uii = localStorage.getItem("uii")
        await post({...data, uii})

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
    

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg mt-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                    <FileText className="mr-2 text-blue-500" />
                    Certifications & Projects
                </h1>
                <h2 className="text-xl font-semibold text-gray-600">
                    Step 3/3
                </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-700 flex items-center">
                            <Award className="mr-2 text-blue-500" />
                            Certifications
                        </h3>
                        <button
                            type="button"
                            onClick={() =>
                                appendCertification({
                                    name: "",
                                    issuedBy: "",
                                    certificateIdOrURL: "",
                                    additionalInformation: "",
                                })
                            }
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                        >
                            <Plus size={24} />
                        </button>
                    </div>

                    {certificationFields.map((field, index) => (
                        <div
                            key={field.id}
                            className="bg-gray-50 p-6 rounded-lg mb-4 relative"
                        >
                            <button
                                type="button"
                                onClick={() => removeCertification(index)}
                                className="absolute right-4 top-4 text-red-400 hover:text-red-600"
                            >
                                <Trash size={20} />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-600 mb-2">
                                        Certificate Name
                                    </label>
                                    <div className="relative">
                                        <Award
                                            className="absolute left-3 top-3 text-gray-400"
                                            size={20}
                                        />
                                        <input
                                            {...register(
                                                `certifications.${index}.name`
                                            )}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                            placeholder="Enter certificate name"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-600 mb-2">
                                        Issued By
                                    </label>
                                    <div className="relative">
                                        <Building2
                                            className="absolute left-3 top-3 text-gray-400"
                                            size={20}
                                        />
                                        <input
                                            {...register(
                                                `certifications.${index}.issuedBy`
                                            )}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                            placeholder="Enter issuing organization"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-600 mb-2">
                                        Certificate ID/URL
                                    </label>
                                    <div className="relative">
                                        <Link
                                            className="absolute left-3 top-3 text-gray-400"
                                            size={20}
                                        />
                                        <input
                                            {...register(
                                                `certifications.${index}.certificateIdOrURL`
                                            )}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                            placeholder="Enter certificate ID or URL"
                                        />
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-gray-600 mb-2">
                                        Additional Information
                                    </label>
                                    <textarea
                                        {...register(
                                            `certifications.${index}.additionalInformation`
                                        )}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 h-32"
                                        placeholder="Enter any additional information about the certification"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-700 flex items-center">
                            <FileText className="mr-2 text-blue-500" />
                            Projects
                        </h3>
                        <button
                            type="button"
                            onClick={() =>
                                appendProject({
                                    title: "",
                                    skillsUsed: [],
                                    description: "",
                                    startDate: "",
                                    endDate: "",
                                    url: [],
                                })
                            }
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                        >
                            <Plus size={24} />
                        </button>
                    </div>

                    {projectFields.map((field, index) => (
                        <div
                            key={field.id}
                            className="bg-gray-50 p-6 rounded-lg mb-4 relative"
                        >
                            <button
                                type="button"
                                onClick={() => removeProject(index)}
                                className="absolute right-4 top-4 text-red-400 hover:text-red-600"
                            >
                                <Trash size={20} />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-gray-600 mb-2">
                                        Project Title
                                    </label>
                                    <input
                                        {...register(`projects.${index}.title`)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                        placeholder="Enter project title"
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
                                                `projects.${index}.startDate`
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
                                                `projects.${index}.endDate`
                                            )}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-gray-600 mb-2">
                                        Project Description
                                    </label>
                                    <textarea
                                        {...register(
                                            `projects.${index}.description`
                                        )}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 h-32"
                                        placeholder="Describe your project"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-gray-600 mb-2">
                                        Skills Used
                                    </label>
                                    <div className="flex gap-2 mb-2 flex-wrap">
                                        {watch(
                                            `projects.${index}.skillsUsed`
                                        )?.map((skill, skillIndex) => (
                                            <span
                                                key={skillIndex}
                                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                                            >
                                                {skill}
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        removeValue(
                                                            index,
                                                            "skillsUsed",
                                                            skillIndex
                                                        );
                                                    }}
                                                    className="hover:text-blue-900"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            ref={skillInputRef}
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                            placeholder="Add a skill"
                                            onKeyDown={(e) => {
                                                if (
                                                    e.key === "Enter" &&
                                                    skillInputRef.current?.value
                                                ) {
                                                    e.preventDefault();
                                                    const skills =
                                                        watch(
                                                            `projects.${index}.skillsUsed`
                                                        ) || [];
                                                    setValue(
                                                        `projects.${index}.skillsUsed`,
                                                        [
                                                            ...skills,
                                                            skillInputRef
                                                                .current.value,
                                                        ]
                                                    );
                                                    skillInputRef.current.value =
                                                        "";
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (
                                                    skillInputRef.current?.value
                                                ) {
                                                    const skills =
                                                        watch(
                                                            `projects.${index}.skillsUsed`
                                                        ) || [];
                                                    setValue(
                                                        `projects.${index}.skillsUsed`,
                                                        [
                                                            ...skills,
                                                            skillInputRef
                                                                .current.value,
                                                        ]
                                                    );
                                                    skillInputRef.current.value =
                                                        "";
                                                }
                                            }}
                                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                        >
                                            <Plus size={20} />
                                        </button>
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-gray-600 mb-2">
                                        Project URLs
                                    </label>
                                    <div className="flex gap-2 mb-2 flex-wrap">
                                        {watch(`projects.${index}.url`)?.map(
                                            (url, urlIndex) => (
                                                <span
                                                    key={urlIndex}
                                                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                                                >
                                                    <Link size={14} />
                                                    <a
                                                        href={url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="hover:underline"
                                                    >
                                                        {url}
                                                    </a>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            removeValue(
                                                                index,
                                                                "url",
                                                                urlIndex
                                                            );
                                                        }}
                                                        className="hover:text-gray-900"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </span>
                                            )
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            ref={urlInputRef}
                                            type="url"
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                            placeholder="Add a project URL"
                                            onKeyDown={(e) => {
                                                if (
                                                    e.key === "Enter" &&
                                                    urlInputRef.current?.value
                                                ) {
                                                    e.preventDefault();
                                                    const urls =
                                                        watch(
                                                            `projects.${index}.url`
                                                        ) || [];
                                                    setValue(
                                                        `projects.${index}.url`,
                                                        [
                                                            ...urls,
                                                            urlInputRef.current
                                                                .value,
                                                        ]
                                                    );
                                                    urlInputRef.current.value =
                                                        "";
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (
                                                    urlInputRef.current?.value
                                                ) {
                                                    const urls =
                                                        watch(
                                                            `projects.${index}.url`
                                                        ) || [];
                                                    setValue(
                                                        `projects.${index}.url`,
                                                        [
                                                            ...urls,
                                                            urlInputRef.current
                                                                .value,
                                                        ]
                                                    );
                                                    urlInputRef.current.value =
                                                        "";
                                                }
                                            }}
                                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                        >
                                            <Plus size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors font-semibold"
                >
                    <Save className="h-5 w-5" />
                    {isSubmitting ? "Saving..." : "Save"}
                </button>
            </form>
        </div>
    );
};

export default CertificateAndProject;
