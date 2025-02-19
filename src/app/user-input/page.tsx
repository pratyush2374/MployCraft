import { Metadata } from "next";
import UserInput from "./user-input-components/UserInput";


export const metadata: Metadata = {
    title: "User Information - MployCraft",
    metadataBase: new URL("https://mploycraft.vercel.app"),
    description:
        "Provide your information to MployCraft for personalized AI-powered resume tailoring, cover letter creation, and job application tracking.",
    keywords:
        "MployCraft, user information, profile setup, AI resume builder, cover letter generator, job tracker",
    authors: [{ name: "Pratyush Sharma" }],
    robots: "index, follow",

    openGraph: {
        title: "User Information - MployCraft",
        description:
            "Complete your profile on MployCraft to unlock AI-driven job search tools for personalized resumes and cover letters.",
        siteName: "MployCraft",
        images: [
            {
                url: "/Icon.svg",
                width: 1200,
                height: 630,
                alt: "MployCraft - User Information",
            },
        ],
        type: "website",
        locale: "en_US",
    },

    icons: {
        icon: "/Icon.svg",
    },
};

const Page: React.FC = () => {
    return (
        <>
            <UserInput />
        </>
    );
};

export default Page;
