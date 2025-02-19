import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
    Phone,
    MapPin,
    FileText,
    Plus,
    X,
    Trash2,
    Link2,
    Brain,
    Languages,
    Coffee,
    Save,
    Album,
} from "lucide-react";
import usePost from "@/hooks/usePost";
import { useToast } from "@/hooks/use-toast";
import Toast from "@/lib/toastClass";

interface Links {
    type: string;
    url: string;
}

interface BasicDetailsFormFields {
    contactNumber?: string;
    location?: string;
    professionalSummary?: string;
    skills?: string[];
    softSkills?: string[];
    languages?: string[];
    hobbies?: string[];
    links?: Links[];
}

const BasicDetails = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { isSubmitting },
    } = useForm<BasicDetailsFormFields>();

    const [skills, setSkills] = useState<string[]>([]);
    const [softSkills, setSoftSkills] = useState<string[]>([]);
    const [languages, setLanguages] = useState<string[]>([]);
    const [hobbies, setHobbies] = useState<string[]>([]);

    const skillVal = useRef<HTMLInputElement>(null);
    const softSkillVal = useRef<HTMLInputElement>(null);
    const languageVal = useRef<HTMLInputElement>(null);
    const hobbyVal = useRef<HTMLInputElement>(null);

    const [links, setLinks] = useState<Links[]>([{ type: "", url: "" }]);

    const linkTypes = [
        "LinkedIn",
        "GitHub",
        "Portfolio",
        "Twitter",
        "Instagram",
        "Threads",
        "Facebook",
        "Others",
    ];

    const { post, error } = usePost("/api/save-basic-details");
    const { toast } = useToast();

    const onSubmit = async (data: BasicDetailsFormFields) => {
        let isBlank = links.some((link) => !link.type || !link.url);
        if (isBlank) {
            toast(new Toast("Error", "Fill all the URLs or Delete them", "destructive"));
            return;
        }
        await post(data);
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

    type ValueType = "skills" | "softSkills" | "languages" | "hobbies";

    const addValue = (type: ValueType) => {
        const refs = {
            skills: skillVal,
            softSkills: softSkillVal,
            languages: languageVal,
            hobbies: hobbyVal,
        };

        const setters = {
            skills: setSkills,
            softSkills: setSoftSkills,
            languages: setLanguages,
            hobbies: setHobbies,
        };

        if (refs[type]?.current?.value.trim()) {
            const newArray = [
                ...(type === "skills"
                    ? skills
                    : type === "softSkills"
                    ? softSkills
                    : type === "languages"
                    ? languages
                    : hobbies),
                refs[type].current.value.trim(),
            ];

            setters[type](newArray);
            setValue(type, newArray);
            refs[type].current.value = "";
        }
    };

    const removeValue = (type: ValueType, index: number) => {
        const arrays = {
            skills,
            softSkills,
            languages,
            hobbies,
        };

        const setters = {
            skills: setSkills,
            softSkills: setSoftSkills,
            languages: setLanguages,
            hobbies: setHobbies,
        };

        const newArray = [...arrays[type]];
        newArray.splice(index, 1);
        setters[type](newArray);
        setValue(type, newArray);
    };

    const handleLinkChange = (
        index: number,
        what: "type" | "url",
        value: string
    ) => {
        const newLinksArray = [...links];
        newLinksArray[index][what] = value;
        setLinks(newLinksArray);
        setValue("links", newLinksArray);
    };

    const addUrl = () => {
        setLinks([...links, { type: "", url: "" }]);
    };

    const removeUrl = (index: number) => {
        const newLinks = [...links];
        newLinks.splice(index, 1);
        setLinks(newLinks);
        setValue("links", newLinks);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg mt-10 px-12">
            <div className="text-3xl font-bold text-gray-800 mb-8 flex justify-between">
                <h1 className="flex items-center">
                    <FileText className="mr-2 text-blue-500" />
                    Basic Details
                </h1>
                <h2>Step 1/3 </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Information Section */}
                <div className="space-y-4">
                    <div className="relative">
                        <label
                            className="block text-sm font-medium text-gray-700 mb-1"
                            htmlFor="contact"
                        >
                            Contact Number
                        </label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 h-5 w-5" />
                            <input
                                type="tel"
                                {...register("contactNumber")}
                                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="Your contact number"
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label
                            className="block text-sm font-medium text-gray-700 mb-1"
                            htmlFor="location"
                        >
                            Location
                        </label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 h-5 w-5" />
                            <input
                                type="text"
                                {...register("location")}
                                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="Your location"
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label
                            className="block text-sm font-medium text-gray-700 mb-1"
                            htmlFor="professionalSummary"
                        >
                            Professional Summary
                        </label>
                        <textarea
                            {...register("professionalSummary")}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            rows={4}
                            placeholder="Brief overview of your professional background"
                        />
                    </div>
                </div>

                {/* Skills Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Album className="text-blue-500" />
                        <h2 className="text-xl font-semibold text-gray-800">
                            Skills
                        </h2>
                    </div>
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                ref={skillVal}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="Add your skills"
                                onKeyDown={(e) =>
                                    e.key === "Enter" &&
                                    (e.preventDefault(), addValue("skills"))
                                }
                            />
                        </div>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                addValue("skills");
                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                        >
                            <Plus className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-2"
                            >
                                {skill}
                                <X
                                    className="h-4 w-4 cursor-pointer hover:text-blue-900"
                                    onClick={() => removeValue("skills", index)}
                                />
                            </span>
                        ))}
                    </div>
                </div>

                {/* Soft Skills Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Brain className="text-blue-500" />
                        <h2 className="text-xl font-semibold text-gray-800">
                            Soft Skills
                        </h2>
                    </div>
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                ref={softSkillVal}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="Add a soft skill"
                                onKeyDown={(e) =>
                                    e.key === "Enter" &&
                                    (e.preventDefault(), addValue("softSkills"))
                                }
                            />
                        </div>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                addValue("softSkills");
                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                        >
                            <Plus className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {softSkills.map((skill, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-2"
                            >
                                {skill}
                                <X
                                    className="h-4 w-4 cursor-pointer hover:text-blue-900"
                                    onClick={() =>
                                        removeValue("softSkills", index)
                                    }
                                />
                            </span>
                        ))}
                    </div>
                </div>

                {/* Languages Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Languages className="text-blue-500" />
                        <h2 className="text-xl font-semibold text-gray-800">
                            Languages
                        </h2>
                    </div>
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                ref={languageVal}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="Add a language"
                                onKeyDown={(e) =>
                                    e.key === "Enter" &&
                                    (e.preventDefault(), addValue("languages"))
                                }
                            />
                        </div>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                addValue("languages");
                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                        >
                            <Plus className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {languages.map((language, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-2"
                            >
                                {language}
                                <X
                                    className="h-4 w-4 cursor-pointer hover:text-blue-900"
                                    onClick={() =>
                                        removeValue("languages", index)
                                    }
                                />
                            </span>
                        ))}
                    </div>
                </div>

                {/* Hobbies Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Coffee className="text-blue-500" />
                        <h2 className="text-xl font-semibold text-gray-800">
                            Hobbies
                        </h2>
                    </div>
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                ref={hobbyVal}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="Add a hobby"
                                onKeyDown={(e) =>
                                    e.key === "Enter" &&
                                    (e.preventDefault(), addValue("hobbies"))
                                }
                            />
                        </div>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                addValue("hobbies");
                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                        >
                            <Plus className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {hobbies.map((hobby, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-2"
                            >
                                {hobby}
                                <X
                                    className="h-4 w-4 cursor-pointer hover:text-blue-900"
                                    onClick={() =>
                                        removeValue("hobbies", index)
                                    }
                                />
                            </span>
                        ))}
                    </div>
                </div>

                {/* Links Section */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Link2 className="text-blue-500" />
                            <h2 className="text-xl font-semibold text-gray-800">
                                Social Links
                            </h2>
                        </div>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                addUrl();
                            }}
                            className="px-3 py-2 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-1"
                        >
                            <Plus className="h-5 w-5" />
                            Add Link
                        </button>
                    </div>

                    <div className="space-y-3">
                        {links.map((link, index) => (
                            <div
                                key={index}
                                className="flex gap-3 items-center"
                            >
                                <select
                                    value={link.type}
                                    onChange={(e) =>
                                        handleLinkChange(
                                            index,
                                            "type",
                                            e.target.value
                                        )
                                    }
                                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                >
                                    <option value="">Select Platform</option>
                                    {linkTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="url"
                                    value={link.url}
                                    onChange={(e) =>
                                        handleLinkChange(
                                            index,
                                            "url",
                                            e.target.value
                                        )
                                    }
                                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder={`Enter your ${
                                        link.type || "social media"
                                    } URL`}
                                />
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        removeUrl(index);
                                    }}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 my-12"
                    >
                        {isSubmitting ? (
                            "Saving ...."
                        ) : (
                            <>
                                <Save className="h-5 w-5" />
                                Save Details
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BasicDetails;
