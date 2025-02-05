import { Metadata } from "next";
import LandingPage from "./(components)/LandingPage";

export const metadata: Metadata = {
    title: "MployCraft - Your AI-Powered Job Assistant",
    metadataBase: new URL("https://mploycraft.vercel.app"),
    description:
        "Streamline your job search with AI-generated cover letters, resume tailoring, and application tracking.",
    keywords:
        "MployCraft, job search, AI cover letter, resume builder, application tracker, job application, AI job assistant",
    authors: [{ name: "Pratyush Sharma" }],
    robots: "index, follow",

    openGraph: {
        title: "MployCraft - Your AI-Powered Job Assistant",
        description:
            "MployCraft helps you create tailored resumes, AI-generated cover letters, and track job applications seamlessly.",
        siteName: "MployCraft",
        images: [
            {
                url: "/Icon.svg",
                width: 1200,
                height: 630,
                alt: "MployCraft - AI Job Assistant",
            },
        ],
        type: "website",
        locale: "en_US",
    },

    icons: {
        icon: "/Icon.svg",
    },
};

const Landing: React.FC = () => {
    return (
        <>
            <LandingPage />
        </>
    );
};

export default Landing;
