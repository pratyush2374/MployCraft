import useGet from "@/hooks/useGet";
import React, { useEffect, useState } from "react";
import { Certification, Link, Project } from "@prisma/client";
import {
    Pencil,
    Plus,
    Trash2,
    User,
    Mail,
    AtSign,
    Phone,
    MapPin,
    FileText,
    Code,
    Heart,
    Globe,
    BookOpen,
    Briefcase,
    ExternalLink,
    Link as LinkIcon,
    School,
    Award,
    Calendar,
    GraduationCap,
    Github,
    Building,
    UserCog,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import EditPersonalDetails from "./EditPersonalDetails";
import EditOtherDetails from "./EditOtherDetails";
import { useToast } from "@/hooks/use-toast";
import Toast from "@/lib/toastClass";
import AddLink from "./AddLink";
import EditLink from "./EditLink";
import DeleteLink from "./DeleteLink";
import ModifyEducation from "./ModifyEducation";
import ModifyExperience from "./ModifyExperience";
import ModifyProject from "./ModifyProject";
import ModifyCertification from "./ModifyCertification";
import DeleteProject from "./DeleteProject";
import DeleteCertificate from "./DeleteCertificate";
import DeleteExperience from "./DeleteExperience";
import DeleteEducation from "./DeleteEducation";

export interface Education {
    id: string;
    instituteName: string | null;
    major: string | null;
    startDate?: string;
    endDate?: string;
    score: string | null;
    scoreType: "GPA" | "Percentage" | "CGPA";
    achievements: string | null;
    userInfoId: string | null;
}

export interface WorkExperience {
    id: string;
    userInfoId: string | null;
    company?: string | null;
    jobTitle?: string | null;
    startDate?: string;
    endDate?: string;
    isCurrent: boolean;
    location?: string;
    achievementsAndResponsibilities?: string;
}

interface Data {
    id: string;
    fullName: string;
    username: string;
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

const ProfileSettings = () => {
    const { get, loading, resData, error } = useGet("/api/user-information");
    const [data, setData] = useState<Data>();
    const [links, setLinks] = useState<string[]>([]);
    const { toast } = useToast();
    useEffect(() => {
        get();
    }, []);

    useEffect(() => {
        if (resData) {
            const tempD = resData.data as Data;
            setData(tempD);
            const links = [
                "LinkedIn",
                "GitHub",
                "Portfolio",
                "Twitter",
                "Instagram",
                "Facebook",
                "Others",
            ];
            const notSelectedLinks = links.filter(
                (link) => !tempD.links?.some((l) => l.type === link)
            );
            setLinks(notSelectedLinks);
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
    }, [resData, error]);

    if (loading) {
        <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
        </div>;
    }

    if (!data) {
        return <h1>No data found</h1>;
    }

    return (
        <>
            <div className="max-w-4xl mx-auto md:p-6">
                <div className="flex items-center mb-10 space-x-4">
                    <UserCog className="w-10 h-10 text-blue-600" />
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                        Profile Settings
                    </h1>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Personal Details Card */}
                    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <User className="text-blue-500" size={20} />
                                Personal Details
                            </h1>
                            <Dialog>
                                <DialogTrigger className="p-2 rounded-full hover:bg-blue-50 transition-colors">
                                    <Pencil
                                        className="text-blue-500"
                                        size={18}
                                    />
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogTitle>
                                        Edit Personal Details
                                    </DialogTitle>
                                    <EditPersonalDetails
                                        fullName={data.fullName}
                                        username={data.username}
                                        contactNumber={data.contactNumber}
                                        location={data.location}
                                        professionalSummary={
                                            data.professionalSummary
                                        }
                                    />
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <User
                                    className="text-blue-500 mt-1"
                                    size={18}
                                />
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Full Name
                                    </p>
                                    <p className="font-medium">
                                        {data.fullName}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Mail
                                    className="text-blue-500 mt-1"
                                    size={18}
                                />
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Email
                                    </p>
                                    <p className="font-medium truncate">
                                        {data.email}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <AtSign
                                    className="text-blue-500 mt-1"
                                    size={18}
                                />
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Username
                                    </p>
                                    <p className="font-medium">
                                        {data.username}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Phone
                                    className="text-blue-500 mt-1"
                                    size={18}
                                />
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Contact Number
                                    </p>
                                    <p className="font-medium">
                                        {data.contactNumber}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <MapPin
                                    className="text-blue-500 mt-1"
                                    size={18}
                                />
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Location
                                    </p>
                                    <p className="font-medium">
                                        {data.location}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <FileText
                                    className="text-blue-500 mt-1"
                                    size={18}
                                />
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Professional Summary
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        {data.professionalSummary}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Other Details Card */}
                    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <Briefcase
                                    className="text-blue-500"
                                    size={20}
                                />
                                Other Details
                            </h1>
                            <Dialog>
                                <DialogTrigger className="p-2 rounded-full hover:bg-blue-50 transition-colors">
                                    <Pencil
                                        className="text-blue-500"
                                        size={18}
                                    />
                                </DialogTrigger>
                                <DialogContent className="scale-[.7] w-full max-w-3xl sm:max-w-4xl">
                                    <DialogTitle>
                                        Edit Other Details
                                    </DialogTitle>
                                    <EditOtherDetails
                                        hobbies={data.hobbies || []}
                                        languages={data.languages || []}
                                        skills={data.skills || []}
                                        softSkills={data.softSkills || []}
                                    />
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div className="space-y-6">
                            {Array.isArray(data.skills) &&
                                data.skills.length > 0 && (
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                            <Code
                                                className="text-blue-500"
                                                size={18}
                                            />
                                            Skills
                                        </h2>
                                        <div className="flex flex-wrap gap-2">
                                            {data.skills.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                            {Array.isArray(data.softSkills) &&
                                data.softSkills.length > 0 && (
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                            <BookOpen
                                                className="text-blue-500"
                                                size={18}
                                            />
                                            Soft Skills
                                        </h2>
                                        <div className="flex flex-wrap gap-2">
                                            {data.softSkills.map(
                                                (softSkill, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                                                    >
                                                        {softSkill}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}

                            {Array.isArray(data.languages) &&
                                data.languages.length > 0 && (
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                            <Globe
                                                className="text-blue-500"
                                                size={18}
                                            />
                                            Languages
                                        </h2>
                                        <div className="flex flex-wrap gap-2">
                                            {data.languages.map(
                                                (language, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                                                    >
                                                        {language}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}

                            {Array.isArray(data.hobbies) &&
                                data.hobbies.length > 0 && (
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                            <Heart
                                                className="text-blue-500"
                                                size={18}
                                            />
                                            Hobbies
                                        </h2>
                                        <div className="flex flex-wrap gap-2">
                                            {data.hobbies.map(
                                                (hobby, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                                                    >
                                                        {hobby}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md mt-10 p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-xl font-bold text-gray-800 flex items-center">
                            <LinkIcon className="h-5 w-5 text-blue-500 mr-2" />
                            Links
                        </h1>

                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="flex items-center gap-2 bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm">
                                    <Plus className="h-4 w-4" />
                                    <span>Add Link</span>
                                </button>
                            </DialogTrigger>
                            <DialogContent className="bg-white p-6 rounded-lg max-w-md">
                                <DialogTitle className="text-lg font-semibold text-gray-800 mb-4">
                                    Add link
                                </DialogTitle>
                                <AddLink links={links} />
                            </DialogContent>
                        </Dialog>
                    </div>

                    {Array.isArray(data.links) && data.links.length > 0 ? (
                        <div className="space-y-3">
                            {data.links.map((link, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:shadow-sm transition-all"
                                >
                                    <div className="flex-1">
                                        <h2 className="font-medium text-gray-800">
                                            {link.type}
                                        </h2>
                                        <a
                                            href={link.url}
                                            className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1 max-w-[50%] truncate"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {link.url}
                                            <ExternalLink className="h-3 w-3 inline" />
                                        </a>
                                    </div>

                                    <div className="flex space-x-2">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button className="p-1.5 hover:bg-blue-50 rounded-full transition-colors">
                                                    <Pencil className="h-4 w-4 text-blue-500" />
                                                </button>
                                            </DialogTrigger>
                                            <DialogContent className="bg-white p-6 rounded-lg max-w-md">
                                                <DialogTitle className="text-lg font-semibold text-gray-800 mb-4">
                                                    Edit link
                                                </DialogTitle>
                                                <EditLink link={link} />
                                            </DialogContent>
                                        </Dialog>

                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button className="p-1.5 hover:bg-red-50 rounded-full transition-colors">
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </button>
                                            </DialogTrigger>
                                            <DialogContent className="bg-white p-6 rounded-lg max-w-md">
                                                <DialogTitle className="text-lg font-semibold text-gray-800 mb-4 hidden">
                                                    Delete ?
                                                </DialogTitle>
                                                <DeleteLink link={link} />
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                            <LinkIcon className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-500">No links added yet</p>
                            <p className="text-sm text-gray-400 mt-1">
                                Add your social profiles or other important
                                links
                            </p>
                        </div>
                    )}
                </div>

                <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md mt-10 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-2">
                            <GraduationCap className="h-6 w-6 text-blue-500" />
                            <h1 className="text-xl font-bold text-gray-800">
                                Education
                            </h1>
                        </div>

                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white px-1 py-1 md:px-3 md:py-2 rounded-md transition-colors">
                                    <Plus className="h-4 w-4" />
                                    <span>Add Education</span>
                                </button>
                            </DialogTrigger>
                            <DialogContent className="w-[90%]">
                                <DialogTitle className="text-xl font-semibold text-gray-800 flex items-center">
                                    <GraduationCap className="h-5 w-5 text-blue-500 mr-2" />
                                    Add Education
                                </DialogTitle>
                                <ModifyEducation purpose="Add" />
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Education list section */}
                    <div>
                        <h2 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
                            <School className="h-5 w-5 text-blue-500 mr-2" />
                            Your education
                        </h2>

                        {Array.isArray(data.education) &&
                        data.education.length > 0 ? (
                            <div className="space-y-5">
                                {data.education.map((education, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-50 rounded-lg p-5 border border-gray-200 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-2">
                                                <h3 className="text-lg font-semibold text-gray-800">
                                                    {education.instituteName}
                                                </h3>
                                                {education.major && (
                                                    <p className="text-gray-700 flex items-center">
                                                        <Award className="h-4 w-4 text-blue-500 mr-2" />
                                                        {education.major}
                                                    </p>
                                                )}

                                                <div className="flex flex-wrap items-center gap-x-4 text-sm text-gray-600">
                                                    {education.startDate && (
                                                        <p className="flex items-center">
                                                            <Calendar className="h-4 w-4 text-blue-500 mr-1" />
                                                            <span>
                                                                From:{" "}
                                                                {new Date(
                                                                    education.startDate
                                                                ).toLocaleDateString(
                                                                    "en-US",
                                                                    {
                                                                        month: "short",
                                                                        year: "numeric",
                                                                    }
                                                                )}
                                                            </span>
                                                        </p>
                                                    )}

                                                    {education.endDate && (
                                                        <p className="flex items-center">
                                                            <Calendar className="h-4 w-4 text-blue-500 mr-1" />
                                                            <span>
                                                                To:{" "}
                                                                {new Date(
                                                                    education.endDate
                                                                ).toLocaleDateString(
                                                                    "en-US",
                                                                    {
                                                                        month: "short",
                                                                        year: "numeric",
                                                                    }
                                                                )}
                                                            </span>
                                                        </p>
                                                    )}
                                                </div>

                                                {(education.score ||
                                                    education.scoreType) && (
                                                    <div className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        {education.score}{" "}
                                                        {education.scoreType}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex items-center justify-center">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <button className="text-gray-500 hover:text-blue-500 p-1 rounded-full hover:bg-gray-100 transition-colors">
                                                            <Pencil className="h-5 w-5" />
                                                        </button>
                                                    </DialogTrigger>
                                                    <DialogContent className="scale-[.8] max-w-2xl sm:max-w-3xl">
                                                        <DialogTitle className="text-xl font-semibold text-gray-800 flex items-center">
                                                            <Pencil className="h-5 w-5 text-blue-500 mr-2" />
                                                            Edit Education
                                                        </DialogTitle>
                                                        <ModifyEducation
                                                            education={
                                                                education
                                                            }
                                                            purpose="Edit"
                                                        />
                                                    </DialogContent>
                                                </Dialog>

                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <button className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full transition duration-200">
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-md">
                                                        <DialogTitle className="hidden">
                                                            Delete Education
                                                        </DialogTitle>
                                                        <DeleteEducation
                                                            education={
                                                                education
                                                            }
                                                        />
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                <GraduationCap className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-500">
                                    No education details added yet.
                                </p>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <button className="mt-3 inline-flex items-center text-blue-500 hover:text-blue-600 font-medium">
                                            <Plus className="h-4 w-4 mr-1" />{" "}
                                            Add your first education
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[500px]">
                                        <DialogTitle className="text-xl font-semibold text-gray-800 flex items-center">
                                            <GraduationCap className="h-5 w-5 text-blue-500 mr-2" />
                                            Add Education
                                        </DialogTitle>
                                        <ModifyEducation purpose="Add" />
                                    </DialogContent>
                                </Dialog>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md mt-10 p-6 max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            <Briefcase className="h-5 w-5 text-blue-500" />
                            <h1 className="text-xl font-bold text-gray-800">
                                Work Experience
                            </h1>
                        </div>
                        <Dialog>
                            <DialogTrigger>
                                <span className="flex items-center gap-2 bg-blue-500 text-white px-1 py-1 md:px-3 md:py-2 rounded-md hover:bg-blue-600 transition">
                                    <Plus className="h-4 w-4" />
                                    <span>Add Experience</span>
                                </span>
                            </DialogTrigger>
                            <DialogContent className="scale-[.8]">
                                <DialogTitle className="text-xl font-semibold text-gray-800 mb-4">
                                    Add Experience
                                </DialogTitle>
                                <ModifyExperience purpose="Add" />
                            </DialogContent>
                        </Dialog>
                    </div>

                    <h2 className="text-lg font-semibold text-gray-700 mb-4">
                        Your professional journey
                    </h2>

                    {Array.isArray(data.workExperience) &&
                    data.workExperience.length > 0 ? (
                        <div className="space-y-6">
                            {data.workExperience.map((experience, index) => (
                                <div
                                    key={index}
                                    className="border-l-4 border-blue-500 pl-4 py-3 bg-gray-50 rounded-r-lg hover:shadow-md transition duration-200"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg text-gray-800">
                                                {experience.company}
                                            </h3>
                                            <p className="text-blue-600 font-medium">
                                                {experience.jobTitle}
                                            </p>

                                            <div className="flex items-center gap-2 mt-2 text-gray-600">
                                                <Calendar className="h-4 w-4 text-blue-500" />
                                                <span>
                                                    {experience.startDate &&
                                                        new Date(
                                                            experience.startDate
                                                        ).toLocaleDateString(
                                                            "en-US",
                                                            {
                                                                month: "short",
                                                                year: "numeric",
                                                            }
                                                        )}
                                                    {experience.isCurrent
                                                        ? " - Present"
                                                        : experience.endDate &&
                                                          ` - ${new Date(
                                                              experience.endDate
                                                          ).toLocaleDateString(
                                                              "en-US",
                                                              {
                                                                  month: "short",
                                                                  year: "numeric",
                                                              }
                                                          )}`}
                                                </span>
                                            </div>

                                            {experience.location && (
                                                <div className="flex items-center gap-2 mt-1 text-gray-600">
                                                    <MapPin className="h-4 w-4 text-blue-500" />
                                                    <p>{experience.location}</p>
                                                </div>
                                            )}

                                            {experience.achievementsAndResponsibilities && (
                                                <div className="mt-3">
                                                    <div className="flex items-center gap-2 text-gray-700 mb-1">
                                                        <Award className="h-4 w-4 text-blue-500" />
                                                        <h4 className="font-medium">
                                                            Achievements &
                                                            Responsibilities
                                                        </h4>
                                                    </div>
                                                    <p className="text-gray-600 ml-6">
                                                        {
                                                            experience.achievementsAndResponsibilities
                                                        }
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-center">
                                            <Dialog>
                                                <DialogTrigger>
                                                    <div className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition">
                                                        <Pencil className="h-4 w-4" />
                                                    </div>
                                                </DialogTrigger>
                                                <DialogContent className="scale-[.8]">
                                                    <DialogTitle className="text-xl font-semibold text-gray-800 mb-4">
                                                        Edit Experience
                                                    </DialogTitle>
                                                    <ModifyExperience
                                                        workExperience={
                                                            experience
                                                        }
                                                        purpose="Edit"
                                                    />
                                                </DialogContent>
                                            </Dialog>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <button className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full transition duration-200 mr-2">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </DialogTrigger>

                                                <DialogContent className="sm:max-w-md">
                                                    <DialogTitle className="hidden">
                                                        Delete experiece
                                                    </DialogTitle>
                                                    <DeleteExperience
                                                        workExperience={
                                                            experience
                                                        }
                                                    />
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg">
                            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                            <h3 className="text-lg font-medium text-gray-600 mb-2">
                                No work experience added yet
                            </h3>
                            <p className="text-gray-500 mb-4">
                                Add your professional experience to showcase
                                your career journey
                            </p>
                            <Dialog>
                                <DialogTrigger>
                                    <span className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                                        Add Your First Experience
                                    </span>
                                </DialogTrigger>
                                <DialogContent className="max-w-md">
                                    <DialogTitle className="text-xl font-semibold text-gray-800 mb-4">
                                        Add Experience
                                    </DialogTitle>
                                    <ModifyExperience purpose="Add" />
                                </DialogContent>
                            </Dialog>
                        </div>
                    )}
                </div>

                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md mt-10 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <svg
                                className="w-6 h-6 text-blue-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                                />
                            </svg>
                            <h1 className="text-xl font-bold text-gray-800">
                                Projects
                            </h1>
                        </div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200">
                                    <Plus size={18} />
                                    <span>Add Project</span>
                                </button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md scale-[.8]">
                                <DialogTitle className="text-xl font-semibold text-gray-800">
                                    Add Project
                                </DialogTitle>
                                <ModifyProject purpose="Add" />
                            </DialogContent>
                        </Dialog>
                    </div>

                    <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                        <svg
                            className="w-5 h-5 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                        </svg>
                        Your Projects
                    </h2>

                    {Array.isArray(data?.projects) &&
                    data.projects.length > 0 ? (
                        <div className="space-y-6">
                            {data.projects.map((project, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-50 rounded-lg p-5 border border-gray-200 hover:shadow-md transition duration-200"
                                >
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                            {project.title}
                                        </h3>
                                        <div className="flex">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <button className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition duration-200">
                                                        <Pencil size={18} />
                                                    </button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-md scale-[.7]">
                                                    <DialogTitle className="text-xl font-semibold text-gray-800">
                                                        Edit Project
                                                    </DialogTitle>
                                                    <ModifyProject
                                                        project={project}
                                                        purpose="Edit"
                                                    />
                                                </DialogContent>
                                            </Dialog>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <button className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full transition duration-200">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-md">
                                                    <DialogTitle className="hidden">
                                                        Delete Project
                                                    </DialogTitle>
                                                    <DeleteProject
                                                        project={project}
                                                    />
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 mb-4">
                                        {project.description}
                                    </p>

                                    {project.skillsUsed &&
                                        Array.isArray(project.skillsUsed) &&
                                        project.skillsUsed.length > 0 && (
                                            <div className="mb-4">
                                                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                                                    Skills Used
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.skillsUsed.map(
                                                        (skill, index) => (
                                                            <span
                                                                key={index}
                                                                className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full"
                                                            >
                                                                {skill}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                    {project.url &&
                                        Array.isArray(project.url) &&
                                        project.url.length > 0 && (
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                                                    Project Links
                                                </h4>
                                                <div className="space-y-2">
                                                    {project.url.map(
                                                        (url, index) => {
                                                            const isGithub =
                                                                url.includes(
                                                                    "github.com"
                                                                );
                                                            return (
                                                                <a
                                                                    key={index}
                                                                    href={url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                                                                >
                                                                    {isGithub ? (
                                                                        <Github
                                                                            size={
                                                                                16
                                                                            }
                                                                        />
                                                                    ) : (
                                                                        <Globe
                                                                            size={
                                                                                16
                                                                            }
                                                                        />
                                                                    )}
                                                                    <span className="truncate">
                                                                        {url}
                                                                    </span>
                                                                    <ExternalLink
                                                                        size={
                                                                            14
                                                                        }
                                                                    />
                                                                </a>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20 7l-8-4-8 4m16 0v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7m16 0l-8 4m0 0L4 7"
                                />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">
                                No projects added yet
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Get started by adding your first project.
                            </p>
                            <div className="mt-6">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <button className="inline-flex items-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                            <Plus className="-ml-1 mr-2 h-5 w-5" />
                                            Add Project
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-md">
                                        <DialogTitle className="text-xl font-semibold text-gray-800">
                                            Add Project
                                        </DialogTitle>
                                        <ModifyProject purpose="Add" />
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    )}
                </div>

                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mt-10">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Award className="w-6 h-6 text-blue-500" />
                            <h2 className="text-xl font-bold text-gray-800">
                                Certifications
                            </h2>
                        </div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-1 py-1 md:px-3 md:py-2 rounded-md transition duration-200">
                                    <Plus size={18} />
                                    <span>Add Certification</span>
                                </button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md scale-[.8]">
                                <DialogTitle className="text-sm md:text-xl font-semibold text-gray-800">
                                    Add Certification
                                </DialogTitle>
                                <ModifyCertification purpose="Add" />
                            </DialogContent>
                        </Dialog>
                    </div>

                    {Array.isArray(data?.certifications) &&
                    data.certifications.length > 0 ? (
                        <div className="space-y-4">
                            {data.certifications.map((certification, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-start gap-3">
                                            <div className="bg-blue-100 p-2 rounded-md">
                                                <Award className="h-6 w-6 text-blue-500" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800">
                                                    {certification.name}
                                                </h3>
                                                <div className="flex items-center gap-2 text-gray-500 mt-1">
                                                    <Building size={14} />
                                                    <span className="text-sm">
                                                        {certification.issuedBy}
                                                    </span>
                                                </div>

                                                {certification.certificateIdOrURL && (
                                                    <div className="mt-2">
                                                        <a
                                                            href={
                                                                certification.certificateIdOrURL.startsWith(
                                                                    "http"
                                                                )
                                                                    ? certification.certificateIdOrURL
                                                                    : "#"
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                                                        >
                                                            {certification.certificateIdOrURL.startsWith(
                                                                "http"
                                                            ) ? (
                                                                <>
                                                                    <ExternalLink
                                                                        size={
                                                                            14
                                                                        }
                                                                    />
                                                                    <span>
                                                                        View
                                                                        Certificate
                                                                    </span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <span className="font-medium">
                                                                        Certificate
                                                                        ID:
                                                                    </span>
                                                                    <span>
                                                                        {
                                                                            certification.certificateIdOrURL
                                                                        }
                                                                    </span>
                                                                </>
                                                            )}
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex space-x-2 mt-2 md:mt-0">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition duration-200">
                                                    <Pencil size={18} />
                                                </button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-md scale-[.8]">
                                                <DialogTitle className="text-xl font-semibold text-gray-800">
                                                    Edit Certification
                                                </DialogTitle>
                                                <ModifyCertification
                                                    certification={
                                                        certification
                                                    }
                                                    purpose="Edit"
                                                />
                                            </DialogContent>
                                        </Dialog>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full transition duration-200">
                                                    <Trash2 size={18} />
                                                </button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-md">
                                                <DialogTitle className="hidden">
                                                    Delete certificate
                                                </DialogTitle>
                                                <DeleteCertificate
                                                    certificate={certification}
                                                />
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            <Award className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">
                                No certifications added yet
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Showcase your credentials by adding
                                certifications.
                            </p>
                            <div className="mt-6">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <button className="inline-flex items-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-xs md:text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                            <Plus className="-ml-1 mr-2 h-5 w-5" />
                                            Add Certification
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-md">
                                        <DialogTitle className="text-xl font-semibold text-gray-800">
                                            Add Certification
                                        </DialogTitle>
                                        <ModifyCertification purpose="Add" />
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProfileSettings;
