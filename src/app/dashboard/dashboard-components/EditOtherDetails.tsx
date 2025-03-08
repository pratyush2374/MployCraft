import { useToast } from "@/hooks/use-toast";
import usePost from "@/hooks/usePost";
import Toast from "@/lib/toastClass";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
    const skill = useRef<HTMLInputElement>(null);
    const softSkill = useRef<HTMLInputElement>(null);
    const language = useRef<HTMLInputElement>(null);
    const hobby = useRef<HTMLInputElement>(null);

    const addValue = (val: string, what: string) => {
        switch (what) {
            case "skills":
                setSkillsI((prev) => [...prev, val]);
                break;
            case "softSkill":
                setSoftSkillsI((prev) => [...prev, val]);
                break;
            case "languages":
                setLanguagesI((prev) => [...prev, val]);
                break;
            case "hobbies":
                setHobbiesI((prev) => [...prev, val]);
                break;
            default:
                break;
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
        }
    }, [error, resData]);

    return (
        <>
            {skillsI.length > 0 && (
                <div>
                    <h2>Skills</h2>
                    <ul>
                        {skillsI.map((skill, index) => (
                            <li key={index}>
                                {skill}{" "}
                                <X
                                    onClick={() => removeValue("skills", skill)}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div>
                <input type="text" ref={skill} />
                <button
                    onClick={() => addValue(skill.current!.value, "skills")}
                >
                    Add
                </button>
            </div>

            {softSkillsI.length > 0 && (
                <div>
                    <h2>Soft Skills</h2>
                    <ul>
                        {softSkillsI.map((softSkill, index) => (
                            <li key={index}>
                                {softSkill}{" "}
                                <X
                                    onClick={() =>
                                        removeValue("softSkill", softSkill)
                                    }
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div>
                <input type="text" ref={softSkill} />
                <button
                    onClick={() =>
                        addValue(softSkill.current!.value, "softSkill")
                    }
                >
                    Add
                </button>
            </div>

            {languagesI.length > 0 && (
                <div>
                    <h2>Languages</h2>
                    <ul>
                        {languagesI.map((language, index) => (
                            <li key={index}>
                                {language}{" "}
                                <X
                                    onClick={() =>
                                        removeValue("languages", language)
                                    }
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div>
                <input type="text" ref={language} />
                <button
                    onClick={() =>
                        addValue(language.current!.value, "language")
                    }
                >
                    Add
                </button>
            </div>

            {hobbiesI.length > 0 && (
                <div>
                    <h2>Hobbies</h2>
                    <ul>
                        {hobbiesI.map((hobby, index) => (
                            <li key={index}>
                                {hobby}{" "}
                                <X
                                    onClick={() =>
                                        removeValue("hobbies", hobby)
                                    }
                                />{" "}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div>
                <input type="text" ref={hobby} />
                <button onClick={() => addValue(hobby.current!.value, "hobby")}>
                    Add
                </button>
            </div>

            <button onClick={saveData} disabled={loading}>
                {loading ? "Saving..." : "Save"}
            </button>
        </>
    );
};

export default EditOtherDetails;
