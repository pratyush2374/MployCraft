import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import usePost from "@/hooks/usePost";
import Toast from "@/lib/toastClass";
import { useEffect, useState } from "react";
import { Project } from "@prisma/client";
import { X, Plus, Link, Code, FileText, Save, Loader2 } from "lucide-react";

interface ModifyProjectProps {
    project?: Project;
    purpose: "Add" | "Edit";
}

const ModifyProject: React.FC<ModifyProjectProps> = ({ project, purpose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<Project>({
        defaultValues: project,
    });

    const { post, error, resData } = usePost("/api/modify-project");
    const { toast } = useToast();

    const [urls, setUrls] = useState<string[]>(project?.url || []);
    const [skills, setSkills] = useState<string[]>(project?.skillsUsed || []);
    const [newUrl, setNewUrl] = useState("");
    const [newSkill, setNewSkill] = useState("");

    const addUrl = () => {
        if (newUrl.trim() !== "") {
            setUrls([...urls, newUrl.trim()]);
            setNewUrl("");
        }
    };

    const removeUrl = (index: number) => {
        setUrls(urls.filter((_, i) => i !== index));
    };

    const addSkill = () => {
        if (newSkill.trim() !== "") {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill("");
        }
    };

    const removeSkill = (index: number) => {
        setSkills(skills.filter((_, i) => i !== index));
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        action: () => void
    ) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            action();
        }
    };

    const onSubmit = async (data: Project) => {
        await post({ 
            ...data, 
            url: urls, 
            skillsUsed: skills, 
            id: project?.id || undefined, 
            purpose 
        });
    };

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (resData && resData.success) {
            toast(new Toast("Success", `Project ${purpose.toLowerCase()}ed successfully`));
            timeout = setTimeout(() => {
                window.location.reload();
            }, 500);
        }
        if (error) {
            toast(new Toast("Error", error || "Something went wrong", "destructive"));
        }

        return () => {
            clearTimeout(timeout);  // Fixed from clearInterval to clearTimeout
        };
    }, [resData, error, toast, purpose]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <FileText size={16} className="text-blue-500" />
                    Project Title
                </label>
                <input 
                    type="text" 
                    {...register("title", { required: "Title is required" })} 
                    className="block w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                    placeholder="Enter project title"
                />
                {errors.title && (
                    <p className="mt-1 text-red-500 text-sm">{errors.title.message}</p>
                )}
            </div>

            <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <FileText size={16} className="text-blue-500" />
                    Project Description
                </label>
                <textarea 
                    {...register("description")} 
                    className="block w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-32"
                    placeholder="Describe your project"
                />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                    <Link size={16} className="text-blue-500" />
                    Project URLs
                </label>
                
                <div className="flex items-center gap-2 mb-3">
                    <input 
                        type="text" 
                        value={newUrl} 
                        onChange={(e) => setNewUrl(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, addUrl)}
                        placeholder="https://example.com" 
                        className="flex-1 p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                    />
                    <button 
                        type="button" 
                        onClick={addUrl} 
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2.5 rounded-lg transition-colors flex items-center justify-center"
                    >
                        <Plus size={18} />
                    </button>
                </div>
                
                {urls.length > 0 ? (
                    <ul className="space-y-2 max-h-40 overflow-y-auto">
                        {urls.map((url, index) => (
                            <li 
                                key={index} 
                                className="flex items-center justify-between bg-white p-2 rounded-lg border border-gray-200 shadow-sm"
                            >
                                <span className="text-sm text-gray-700 truncate">{url}</span>
                                <button
                                    type="button"
                                    onClick={() => removeUrl(index)}
                                    className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-gray-500 italic">No URLs added yet</p>
                )}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                    <Code size={16} className="text-blue-500" />
                    Skills Used
                </label>
                
                <div className="flex items-center gap-2 mb-3">
                    <input 
                        type="text" 
                        value={newSkill} 
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, addSkill)}
                        placeholder="React, TypeScript, etc." 
                        className="flex-1 p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                    />
                    <button 
                        type="button" 
                        onClick={addSkill} 
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2.5 rounded-lg transition-colors flex items-center justify-center"
                    >
                        <Plus size={18} />
                    </button>
                </div>
                
                {skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2">
                        {skills.map((skill, index) => (
                            <div 
                                key={index} 
                                className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                            >
                                <span className="text-sm">{skill}</span>
                                <button
                                    type="button"
                                    onClick={() => removeSkill(index)}
                                    className="text-blue-600 hover:text-blue-800 rounded-full transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 italic">No skills added yet</p>
                )}
            </div>

            <div className="pt-2">
                <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            <span>{`${purpose}ing Project...`}</span>
                        </>
                    ) : (
                        <>
                            <Save size={18} />
                            <span>{`${purpose} Project`}</span>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default ModifyProject;