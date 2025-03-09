import React, { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import usePost from "@/hooks/usePost";
import Toast from "@/lib/toastClass";
import {
    X,
    Plus,
    Code,
    BookOpen,
    Globe,
    Heart,
    Save,
    Loader2,
} from "lucide-react";
import { DialogFooter } from "@/components/ui/dialog";

interface OtherDetails {
    skills: string[];
    softSkills: string[];
    languages: string[];
    hobbies: string[];
}

const EditOtherDetails: React.FC<OtherDetails> = ({
    hobbies,
    languages,
    skills,
    softSkills,
}) => {
    const [skillsI, setSkillsI] = useState(skills);
    const [softSkillsI, setSoftSkillsI] = useState(softSkills);
    const [languagesI, setLanguagesI] = useState(languages);
    const [hobbiesI, setHobbiesI] = useState(hobbies);

    const { error, post, loading, resData } = usePost(
        "/api/update-other-details"
    );
    const { toast } = useToast();

    const skillRef = useRef<HTMLInputElement>(null);
    const softSkillRef = useRef<HTMLInputElement>(null);
    const languageRef = useRef<HTMLInputElement>(null);
    const hobbyRef = useRef<HTMLInputElement>(null);

    const addValue = (val: string, what: string) => {
        if (!val.trim()) return;

        switch (what) {
            case "skills":
                if (!skillsI.includes(val)) {
                    setSkillsI((prev) => [...prev, val]);
                    if (skillRef.current) skillRef.current.value = "";
                }
                break;
            case "softSkill":
                if (!softSkillsI.includes(val)) {
                    setSoftSkillsI((prev) => [...prev, val]);
                    if (softSkillRef.current) softSkillRef.current.value = "";
                }
                break;
            case "languages":
                if (!languagesI.includes(val)) {
                    setLanguagesI((prev) => [...prev, val]);
                    if (languageRef.current) languageRef.current.value = "";
                }
                break;
            case "hobbies":
                if (!hobbiesI.includes(val)) {
                    setHobbiesI((prev) => [...prev, val]);
                    if (hobbyRef.current) hobbyRef.current.value = "";
                }
                break;
            default:
                break;
        }
    };

    const handleKeyPress = (
        e: React.KeyboardEvent<HTMLInputElement>,
        what: string
    ) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const value = e.currentTarget.value;
            addValue(value, what);
        }
    };

    const removeValue = (what: string, value: string) => {
        switch (what) {
            case "skills":
                setSkillsI((prev) => prev.filter((val) => val !== value));
                break;
            case "softSkill":
                setSoftSkillsI((prev) => prev.filter((val) => val !== value));
                break;
            case "languages":
                setLanguagesI((prev) => prev.filter((val) => val !== value));
                break;
            case "hobbies":
                setHobbiesI((prev) => prev.filter((val) => val !== value));
                break;
            default:
                break;
        }
    };

    const saveData = async () => {
        await post({
            skills: skillsI,
            softSkills: softSkillsI,
            languages: languagesI,
            hobbies: hobbiesI,
        });
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
        if (resData) {
            toast(new Toast("Success", "Data saved successfully"));
            timeout = setTimeout(() => {
                window.location.reload();
            }, 500);
        }

        return () => clearInterval(timeout);
    }, [error, resData, toast]);

    return (
        <div className="py-4 space-y-6">
            {/* Skills Section */}
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-blue-500" />
                    <h2 className="text-lg font-semibold text-gray-700">
                        Skills
                    </h2>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                    {skillsI.map((skill, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm group"
                        >
                            {skill}
                            <button
                                onClick={() => removeValue("skills", skill)}
                                className="p-1 rounded-full hover:bg-blue-100 transition-colors"
                            >
                                <X className="h-3 w-3 text-blue-500" />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        ref={skillRef}
                        placeholder="Add a skill"
                        className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        onKeyDown={(e) => handleKeyPress(e, "skills")}
                    />
                    <button
                        onClick={() =>
                            skillRef.current &&
                            addValue(skillRef.current.value, "skills")
                        }
                        className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-md transition-colors flex items-center"
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Soft Skills Section */}
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    <h2 className="text-lg font-semibold text-gray-700">
                        Soft Skills
                    </h2>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                    {softSkillsI.map((softSkill, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm group"
                        >
                            {softSkill}
                            <button
                                onClick={() =>
                                    removeValue("softSkill", softSkill)
                                }
                                className="p-1 rounded-full hover:bg-blue-100 transition-colors"
                            >
                                <X className="h-3 w-3 text-blue-500" />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        ref={softSkillRef}
                        placeholder="Add a soft skill"
                        className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        onKeyDown={(e) => handleKeyPress(e, "softSkill")}
                    />
                    <button
                        onClick={() =>
                            softSkillRef.current &&
                            addValue(softSkillRef.current.value, "softSkill")
                        }
                        className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-md transition-colors flex items-center"
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Languages Section */}
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-500" />
                    <h2 className="text-lg font-semibold text-gray-700">
                        Languages
                    </h2>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                    {languagesI.map((language, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm group"
                        >
                            {language}
                            <button
                                onClick={() =>
                                    removeValue("languages", language)
                                }
                                className="p-1 rounded-full hover:bg-blue-100 transition-colors"
                            >
                                <X className="h-3 w-3 text-blue-500" />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        ref={languageRef}
                        placeholder="Add a language"
                        className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        onKeyDown={(e) => handleKeyPress(e, "languages")}
                    />
                    <button
                        onClick={() =>
                            languageRef.current &&
                            addValue(languageRef.current.value, "languages")
                        }
                        className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-md transition-colors flex items-center"
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Hobbies Section */}
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-blue-500" />
                    <h2 className="text-lg font-semibold text-gray-700">
                        Hobbies
                    </h2>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                    {hobbiesI.map((hobby, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm group"
                        >
                            {hobby}
                            <button
                                onClick={() => removeValue("hobbies", hobby)}
                                className="p-1 rounded-full hover:bg-blue-100 transition-colors"
                            >
                                <X className="h-3 w-3 text-blue-500" />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        ref={hobbyRef}
                        placeholder="Add a hobby"
                        className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        onKeyDown={(e) => handleKeyPress(e, "hobbies")}
                    />
                    <button
                        onClick={() =>
                            hobbyRef.current &&
                            addValue(hobbyRef.current.value, "hobbies")
                        }
                        className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-md transition-colors flex items-center"
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <DialogFooter className="mt-6">
                <button
                    onClick={saveData}
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
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
        </div>
    );
};

export default EditOtherDetails;
