import useGet from "@/hooks/useGet";
import React, { useEffect, useState } from "react";
import { Certification, Link, Project } from "@prisma/client";
import { Pencil, Plus, Trash2 } from "lucide-react";
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
        <div>
            <div>
                <div className="flex gap-3">
                    <h1>Personal details</h1>
                    <Dialog>
                        <DialogTrigger>
                            <Pencil />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>Edit Other Details</DialogTitle>
                            <EditPersonalDetails
                                fullName={data.fullName}
                                username={data.username}
                                contactNumber={data.contactNumber}
                                location={data.location}
                                professionalSummary={data.professionalSummary}
                            />
                        </DialogContent>
                    </Dialog>
                </div>
                <h2>{data.fullName}</h2>
                <h2>{data.email}</h2>
                <h2>{data.username}</h2>
                <h2>{data.contactNumber}</h2>
                <h2>{data.location}</h2>
                <h2>{data.professionalSummary}</h2>
            </div>

            <div>
                <div>
                    <h1>Other details</h1>
                    <Dialog>
                        <DialogTrigger>
                            <Pencil />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>Edit Other Details</DialogTitle>
                            <EditOtherDetails
                                hobbies={data.hobbies || []}
                                languages={data.languages || []}
                                skills={data.skills || []}
                                softSkills={data.softSkills || []}
                            />
                        </DialogContent>
                    </Dialog>
                </div>
                {Array.isArray(data.skills) && data.skills.length > 0 && (
                    <div>
                        <h2>Skills</h2>
                        <ul>
                            {data.skills.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {Array.isArray(data.softSkills) &&
                    data.softSkills.length > 0 && (
                        <div>
                            <h2>Soft Skills</h2>
                            <ul>
                                {data.softSkills.map((softSkill, index) => (
                                    <li key={index}>{softSkill}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                {Array.isArray(data.languages) && data.languages.length > 0 && (
                    <div>
                        <h2>Languages</h2>
                        <ul>
                            {data.languages.map((language, index) => (
                                <li key={index}>{language}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {Array.isArray(data.hobbies) && data.hobbies.length > 0 && (
                    <div>
                        <h2>Hobbies</h2>
                        <ul>
                            {data.hobbies.map((hobby, index) => (
                                <li key={index}>{hobby}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div>
                    <h1>Links</h1>
                    <Dialog>
                        <DialogTrigger>
                            <Plus />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>Add link</DialogTitle>
                            <AddLink links={links} />
                        </DialogContent>
                    </Dialog>
                    {Array.isArray(data.links) &&
                        data.links.length > 0 &&
                        data.links.map((link, index) => (
                            <div key={index}>
                                <h2>{link.type}</h2>
                                <a href={link.url}>{link.url}</a>
                                <Dialog>
                                    <DialogTrigger>
                                        <Pencil />
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogTitle>Edit link</DialogTitle>
                                        <EditLink link={link} />
                                    </DialogContent>
                                </Dialog>
                                <Dialog>
                                    <DialogTrigger>
                                        <Trash2 />
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogTitle>Delete ?</DialogTitle>
                                        <DeleteLink link={link} />
                                    </DialogContent>
                                </Dialog>
                            </div>
                        ))}
                </div>

                <div>
                    <h1>Education</h1>
                    <Dialog>
                        <DialogTrigger>
                            <Plus />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>Add Education</DialogTitle>
                            <ModifyEducation purpose="Add" />
                        </DialogContent>
                    </Dialog>

                    <h2>Your education</h2>
                    {Array.isArray(data.education) &&
                        data.education.length > 0 &&
                        data.education.map((education, index) => (
                            <div key={index}>
                                <h3>{education.instituteName}</h3>
                                <p>{education.major}</p>
                                {education.startDate && (
                                    <p>
                                        {new Date(
                                            education.startDate
                                        ).toDateString()}
                                    </p>
                                )}
                                {education.endDate && (
                                    <p>
                                        {new Date(
                                            education.endDate
                                        ).toDateString()}
                                    </p>
                                )}
                                <p>{education.score}</p>
                                <p>{education.scoreType}</p>
                                <Dialog>
                                    <DialogTrigger>
                                        <Pencil />
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogTitle>
                                            Edit Education
                                        </DialogTitle>
                                        <ModifyEducation
                                            education={education}
                                            purpose="Edit"
                                        />
                                    </DialogContent>
                                </Dialog>
                            </div>
                        ))}
                </div>

                <h1>Work Experience</h1>
                    <Dialog>
                        <DialogTrigger>
                            <Plus />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>Add Experience</DialogTitle>
                            <ModifyExperience purpose="Add" />
                        </DialogContent>
                    </Dialog>

                    <h2>Your experience</h2>
                    {
                        Array.isArray(data.workExperience) &&
                        data.workExperience.length > 0 &&
                        data.workExperience.map((experience, index) => (
                            <div key={index}>
                                <h3>{experience.company}</h3>
                                <p>{experience.jobTitle}</p>
                                {experience.startDate && (
                                    <p>
                                        {new Date(
                                            experience.startDate
                                        ).toDateString()}
                                    </p>
                                )}
                                {experience.endDate && (
                                    <p>
                                        {new Date(
                                            experience.endDate
                                        ).toDateString()}
                                    </p>
                                )}
                                <p>{experience.location}</p>
                                <h3>{experience.achievementsAndResponsibilities}</h3>
                                <Dialog>
                                    <DialogTrigger>
                                        <Pencil />
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogTitle>
                                            Edit Experience
                                        </DialogTitle>
                                        <ModifyExperience
                                            workExperience={experience}
                                            purpose="Edit"
                                        />
                                    </DialogContent>
                                </Dialog>
                            </div>
                        ))
                    }
            </div>
        </div>
    );
};

export default ProfileSettings;
