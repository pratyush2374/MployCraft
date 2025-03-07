"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
    Copy,
    Edit2,
    ExternalLink,
    ChevronDown,
    AlertCircle,
    Check,
    Briefcase,
    GraduationCap,
    Code,
    Award,
    Github,
    Linkedin,
    Twitter,
    Instagram,
    Facebook,
    Globe,
    User,
    Mail,
    Phone,
    MapPin,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Toast from "@/lib/toastClass";
import axios from "axios";
import {
    Certification,
    Education,
    Link,
    Project,
    WorkExperience,
} from "@prisma/client";

interface Data {
    fullName: string;
    email: string;
    contactNumber?: string;
    location?: string;
    professionalSummary?: string;
    skills?: string[];
    softSkills?: string[];
    languages?: string[];
    hobbies?: string[];
    links?: Link[];
    education?: Education[];
    workExperience?: WorkExperience[];
    projects?: Project[];
    certifications?: Certification[];
}

const QuickApply = () => {
    const router = useRouter();
    const [copiedField, setCopiedField] = useState<string | null>(null);
    const { toast } = useToast();
    const [data, setData] = useState<Data>();
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            const res = await axios.get("/api/user-information");
            setData(res.data.data);
        } catch (error) {
            toast(new Toast("Error", "Something went wrong", "destructive"));
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data]);
    const copyToClipboard = (text: string, fieldName: string) => {
        if (text) {
            navigator.clipboard.writeText(text);
            setCopiedField(fieldName);
            setTimeout(() => {
                setCopiedField(null);
            }, 2000);
        }
    };

    // Function to format date from ISO to Month Year
    const formatDate = (dateString: string | null) => {
        if (!dateString) return "Present";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
            </div>
        );
    }

    if (!data) return <h1>No data found</h1>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Quick Apply
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Copy your profile information to quickly fill out job
                        applications
                    </p>
                </div>
                <button
                    onClick={() => router.push("/dashboard/profile-settings")}
                    className="flex items-center mt-4 md:mt-0 bg-white text-blue-500 border border-blue-500 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Profile
                </button>
            </div>

            {/* Info Card */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-8">
                <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                    <div>
                        <p className="text-gray-700">
                            We're developing a browser extension that will help
                            you automatically fill forms during job
                            applications.
                        </p>
                        <p className="text-gray-700 mt-2">
                            Until then, you can use this page to quickly copy
                            your information to the clipboard.
                        </p>
                    </div>
                </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-blue-500" />
                    Personal Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <CopyCard
                        label="Full Name"
                        value={data.fullName}
                        onCopy={() =>
                            copyToClipboard(data.fullName, "fullName")
                        }
                        isCopied={copiedField === "fullName"}
                    />

                    <CopyCard
                        label="Email"
                        value={data.email}
                        onCopy={() => copyToClipboard(data.email, "email")}
                        isCopied={copiedField === "email"}
                        icon={<Mail className="w-4 h-4 text-gray-400" />}
                    />

                    {data.contactNumber && (
                        <CopyCard
                            label="Phone"
                            value={data.contactNumber}
                            onCopy={() =>
                                copyToClipboard(
                                    data.contactNumber || "",
                                    "phone"
                                )
                            }
                            isCopied={copiedField === "phone"}
                            icon={<Phone className="w-4 h-4 text-gray-400" />}
                        />
                    )}

                    {data.location && (
                        <CopyCard
                            label="Location"
                            value={data.location}
                            onCopy={() =>
                                copyToClipboard(data.location || "", "location")
                            }
                            isCopied={copiedField === "location"}
                            icon={<MapPin className="w-4 h-4 text-gray-400" />}
                        />
                    )}
                </div>
            </div>

            {/* Professional Summary */}
            {data.professionalSummary && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Professional Summary
                    </h2>
                    <div className="relative">
                        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                            <p className="text-gray-700">
                                {data.professionalSummary}
                            </p>
                        </div>
                        <button
                            onClick={() =>
                                copyToClipboard(
                                    data.professionalSummary || "",
                                    "summary"
                                )
                            }
                            className={`absolute top-2 right-2 p-2 rounded-md ${
                                copiedField === "summary"
                                    ? "bg-green-100 text-green-600"
                                    : "bg-white text-gray-500 hover:bg-gray-100"
                            } transition-colors`}
                        >
                            {copiedField === "summary" ? (
                                <Check className="w-4 h-4" />
                            ) : (
                                <Copy className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Skills
                    </h2>

                    <div className="flex flex-wrap gap-2">
                        {data.skills.map((skill: any, index: any) => (
                            <div
                                key={index}
                                className="bg-gray-50 hover:bg-blue-50 border border-gray-200 rounded-lg px-3 py-1 cursor-pointer transition-colors flex items-center"
                                onClick={() =>
                                    copyToClipboard(skill, `skill-${index}`)
                                }
                            >
                                <span className="text-gray-700">{skill}</span>
                                {copiedField === `skill-${index}` ? (
                                    <Check className="w-3 h-3 ml-2 text-green-600" />
                                ) : (
                                    <Copy className="w-3 h-3 ml-2 text-gray-400 opacity-0 group-hover:opacity-100" />
                                )}
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() =>
                            copyToClipboard(
                                data.skills!.join(", "),
                                "all-skills"
                            )
                        }
                        className={`mt-4 flex items-center ${
                            copiedField === "all-skills"
                                ? "bg-green-100 text-green-600 border-green-200"
                                : "bg-white text-blue-500 border-blue-200 hover:bg-blue-50"
                        } border rounded-lg px-4 py-2 transition-colors`}
                    >
                        {copiedField === "all-skills" ? (
                            <>
                                <Check className="w-4 h-4 mr-2" />
                                Copied All Skills
                            </>
                        ) : (
                            <>
                                <Copy className="w-4 h-4 mr-2" />
                                Copy All Skills
                            </>
                        )}
                    </button>
                </div>
            )}

            {/* Accordion Sections */}
            <AccordionSection
                title="Education"
                icon={<GraduationCap className="w-5 h-5 mr-2 text-blue-500" />}
                defaultOpen={true}
            >
                {data.education &&
                    data.education.length > 0 &&
                    data.education.map((edu: any, index: any) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-4 mb-4 bg-white relative group"
                        >
                            <h3 className="font-medium text-gray-800">
                                {edu.instituteName}
                            </h3>
                            <p className="text-gray-600">{edu.major}</p>
                            <p className="text-gray-500 text-sm">
                                {formatDate(edu.startDate)} -{" "}
                                {formatDate(edu.endDate)}
                            </p>
                            <p className="text-gray-500 text-sm mt-1">
                                {edu.score} {edu.scoreType}
                            </p>

                            <button
                                onClick={() =>
                                    copyToClipboard(
                                        `${edu.instituteName} - ${edu.major}, ${
                                            edu.score
                                        } ${edu.scoreType} (${formatDate(
                                            edu.startDate
                                        )} - ${formatDate(edu.endDate)})`,
                                        `edu-${index}`
                                    )
                                }
                                className={`absolute top-2 right-2 p-2 rounded-md ${
                                    copiedField === `edu-${index}`
                                        ? "bg-green-100 text-green-600"
                                        : "bg-white text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-gray-100"
                                } transition-colors`}
                            >
                                {copiedField === `edu-${index}` ? (
                                    <Check className="w-4 h-4" />
                                ) : (
                                    <Copy className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    ))}
            </AccordionSection>

            <AccordionSection
                title="Work Experience"
                icon={<Briefcase className="w-5 h-5 mr-2 text-blue-500" />}
            >
                {data.workExperience &&
                    data.workExperience.length > 0 &&
                    data.workExperience.map((exp: any, index: any) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-4 mb-4 bg-white relative group"
                        >
                            <h3 className="font-medium text-gray-800">
                                {exp.jobTitle}
                            </h3>
                            <p className="text-gray-600">{exp.company}</p>
                            <p className="text-gray-500 text-sm">
                                {formatDate(exp.startDate)} -{" "}
                                {exp.isCurrent
                                    ? "Present"
                                    : formatDate(exp.endDate)}
                            </p>
                            <p className="text-gray-500 text-sm mt-1">
                                {exp.location}
                            </p>
                            {exp.achievementsAndResponsibilities && (
                                <p className="text-gray-700 mt-2 text-sm">
                                    {exp.achievementsAndResponsibilities}
                                </p>
                            )}

                            <button
                                onClick={() => {
                                    const text = `${exp.jobTitle} at ${
                                        exp.company
                                    } (${formatDate(exp.startDate)} - ${
                                        exp.isCurrent
                                            ? "Present"
                                            : formatDate(exp.endDate)
                                    })${
                                        exp.achievementsAndResponsibilities
                                            ? `: ${exp.achievementsAndResponsibilities}`
                                            : ""
                                    }`;
                                    copyToClipboard(text, `exp-${index}`);
                                }}
                                className={`absolute top-2 right-2 p-2 rounded-md ${
                                    copiedField === `exp-${index}`
                                        ? "bg-green-100 text-green-600"
                                        : "bg-white text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-gray-100"
                                } transition-colors`}
                            >
                                {copiedField === `exp-${index}` ? (
                                    <Check className="w-4 h-4" />
                                ) : (
                                    <Copy className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    ))}
            </AccordionSection>

            <AccordionSection
                title="Projects"
                icon={<Code className="w-5 h-5 mr-2 text-blue-500" />}
            >
                {data.projects &&
                    data.projects.length > 0 &&
                    data.projects.map((project: any, index: any) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-4 mb-4 bg-white relative group"
                        >
                            <div className="flex justify-between items-start">
                                <h3 className="font-medium text-gray-800">
                                    {project.title}
                                </h3>
                                {project.url && project.url.length > 0 && (
                                    <a
                                        href={project.url[0]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:text-blue-600 flex items-center text-sm"
                                    >
                                        <ExternalLink className="w-3 h-3 mr-1" />
                                        View
                                    </a>
                                )}
                            </div>

                            <p className="text-gray-700 mt-2 text-sm">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-1 mt-3">
                                {project.skillsUsed.map(
                                    (skill: any, skillIndex: any) => (
                                        <span
                                            key={skillIndex}
                                            className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded"
                                        >
                                            {skill}
                                        </span>
                                    )
                                )}
                            </div>

                            <button
                                onClick={() => {
                                    const text = `${project.title}: ${
                                        project.description
                                    } [Skills: ${project.skillsUsed.join(
                                        ", "
                                    )}]${
                                        project.url && project.url.length > 0
                                            ? ` [URL: ${project.url[0]}]`
                                            : ""
                                    }`;
                                    copyToClipboard(text, `project-${index}`);
                                }}
                                className={`absolute top-2 right-2 p-2 rounded-md ${
                                    copiedField === `project-${index}`
                                        ? "bg-green-100 text-green-600"
                                        : "bg-white text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-gray-100"
                                } transition-colors`}
                            >
                                {copiedField === `project-${index}` ? (
                                    <Check className="w-4 h-4" />
                                ) : (
                                    <Copy className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    ))}
            </AccordionSection>

            <AccordionSection
                title="Certifications"
                icon={<Award className="w-5 h-5 mr-2 text-blue-500" />}
            >
                {data.certifications &&
                    data.certifications.length > 0 &&
                    data.certifications.map((cert: any, index: any) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-4 mb-4 bg-white relative group"
                        >
                            <h3 className="font-medium text-gray-800">
                                {cert.name}
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Issued by {cert.issuedBy}
                            </p>
                            {cert.certificateIdOrURL && (
                                <p className="text-gray-500 text-sm mt-1">
                                    ID: {cert.certificateIdOrURL}
                                </p>
                            )}
                            {cert.additionalInformation && (
                                <p className="text-gray-700 mt-2 text-sm">
                                    {cert.additionalInformation}
                                </p>
                            )}

                            <button
                                onClick={() => {
                                    const text = `${cert.name} by ${
                                        cert.issuedBy
                                    }${
                                        cert.certificateIdOrURL
                                            ? ` (ID: ${cert.certificateIdOrURL})`
                                            : ""
                                    }${
                                        cert.additionalInformation
                                            ? `: ${cert.additionalInformation}`
                                            : ""
                                    }`;
                                    copyToClipboard(text, `cert-${index}`);
                                }}
                                className={`absolute top-2 right-2 p-2 rounded-md ${
                                    copiedField === `cert-${index}`
                                        ? "bg-green-100 text-green-600"
                                        : "bg-white text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-gray-100"
                                } transition-colors`}
                            >
                                {copiedField === `cert-${index}` ? (
                                    <Check className="w-4 h-4" />
                                ) : (
                                    <Copy className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    ))}
            </AccordionSection>

            {/* Links */}
            {data.links && data.links.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Online Profiles
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.links.map((link: any, index: any) => {
                            let icon;
                            switch (link.type) {
                                case "GitHub":
                                    icon = (
                                        <Github className="w-4 h-4 text-gray-600" />
                                    );
                                    break;
                                case "LinkedIn":
                                    icon = (
                                        <Linkedin className="w-4 h-4 text-gray-600" />
                                    );
                                    break;
                                case "Twitter":
                                    icon = (
                                        <Twitter className="w-4 h-4 text-gray-600" />
                                    );
                                    break;
                                case "Instagram":
                                    icon = (
                                        <Instagram className="w-4 h-4 text-gray-600" />
                                    );
                                case "Facebook":
                                    icon = (
                                        <Facebook className="w-4 h-4 text-gray-600" />
                                    );
                                default:
                                    icon = (
                                        <Globe className="w-4 h-4 text-gray-600" />
                                    );
                            }

                            return (
                                <div
                                    key={index}
                                    className="flex items-center justify-between border border-gray-200 rounded-lg p-4 bg-white group hover:bg-gray-50"
                                >
                                    <div className="flex items-center">
                                        {icon}
                                        <span className="ml-2 text-gray-800">
                                            {link.type}
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:text-blue-600 mr-3"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </a>

                                        <button
                                            onClick={() =>
                                                copyToClipboard(
                                                    link.url,
                                                    `link-${index}`
                                                )
                                            }
                                            className={`p-1 rounded-md ${
                                                copiedField === `link-${index}`
                                                    ? "text-green-600"
                                                    : "text-gray-400 hover:text-gray-600"
                                            }`}
                                        >
                                            {copiedField === `link-${index}` ? (
                                                <Check className="w-4 h-4" />
                                            ) : (
                                                <Copy className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

// Helper Components
interface CopyCardProps {
    label: string;
    value: string;
    onCopy: () => void;
    isCopied: boolean;
    icon?: React.ReactNode;
}

const CopyCard = ({ label, value, onCopy, isCopied, icon }: CopyCardProps) => {
    return (
        <div className="border border-gray-200 rounded-lg p-4 bg-white relative group hover:shadow-sm transition-shadow">
            <p className="text-sm text-gray-500 mb-1">{label}</p>
            <div className="flex items-center">
                {icon && <span className="mr-2">{icon}</span>}
                <p className="text-gray-800 font-medium truncate">{value}</p>
            </div>

            <button
                onClick={onCopy}
                className={`absolute top-2 right-2 p-2 rounded-md ${
                    isCopied
                        ? "bg-green-100 text-green-600"
                        : "bg-white text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-gray-100"
                } transition-colors`}
            >
                {isCopied ? (
                    <Check className="w-4 h-4" />
                ) : (
                    <Copy className="w-4 h-4" />
                )}
            </button>
        </div>
    );
};

interface AccordionSectionProps {
    title: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
    defaultOpen?: boolean;
}

const AccordionSection = ({
    title,
    children,
    icon,
    defaultOpen = false,
}: AccordionSectionProps) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <button
                className="flex items-center justify-between w-full text-left focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    {icon}
                    {title}
                </h2>
                <ChevronDown
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {isOpen && <div className="mt-4">{children}</div>}
        </div>
    );
};

export default QuickApply;
