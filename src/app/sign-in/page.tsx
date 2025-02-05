import { Metadata } from "next";
import SignIn from "./sign-in-components/SignIn";

export const metadata: Metadata = {
    title: "Sign In - MployCraft",
    metadataBase: new URL("https://mploycraft.vercel.app"),
    description:
        "Sign in to MployCraft to access AI-powered resume tailoring, cover letter generation, and job tracking.",
    keywords:
        "MployCraft, sign in, login, job search, AI cover letter, resume builder, job application tracker",
    authors: [{ name: "Pratyush Sharma" }],
    robots: "index, follow",

    openGraph: {
        title: "Sign In - MployCraft",
        description:
            "Log in to MployCraft and enhance your job search with AI-driven tools for resume and cover letter optimization.",
        siteName: "MployCraft",
        images: [
            {
                url: "/Icon.svg",
                width: 1200,
                height: 630,
                alt: "MployCraft - Sign In",
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
            <SignIn />
        </>
    );
};

export default Page;
