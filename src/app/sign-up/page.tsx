import { Metadata } from "next";
import SignUp from "./SignUp";

export const metadata: Metadata = {
    title: "Sign Up - MployCraft",
    metadataBase: new URL("https://mploycraft.vercel.app"),
    description:
        "Sign up for MployCraft to access AI-powered resume tailoring, cover letter generation, and job tracking.",
    keywords:
        "MployCraft, sign up, register, job search, AI cover letter, resume builder, job application tracker",
    authors: [{ name: "Pratyush Sharma" }],
    robots: "index, follow",

    openGraph: {
        title: "Sign Up - MployCraft",
        description:
            "Create an account with MployCraft and enhance your job search with AI-driven tools for resume and cover letter optimization.",
        siteName: "MployCraft",
        images: [
            {
                url: "/Icon.svg",
                width: 1200,
                height: 630,
                alt: "MployCraft - Sign Up",
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
            <SignUp />
        </>
    );
};

export default Page;
