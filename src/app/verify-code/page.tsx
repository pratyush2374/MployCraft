import { Metadata } from "next";
import VerifyCode from "./VerifyCode";

export const metadata: Metadata = {
    title: "Verify Code - MployCraft",
    metadataBase: new URL("https://mploycraft.vercel.app"),
    description:
        "Enter your verification code to confirm your email and access MployCraft's AI-powered job search tools.",
    keywords:
        "MployCraft, verify code, email verification, account confirmation, AI cover letter, resume builder, job application tracker",
    authors: [{ name: "Pratyush Sharma" }],
    robots: "index, follow",

    openGraph: {
        title: "Verify Code - MployCraft",
        description:
            "Confirm your email with MployCraft and start using AI-powered tools for resume tailoring, cover letter generation, and job tracking.",
        siteName: "MployCraft",
        images: [
            {
                url: "/Icon.svg",
                width: 1200,
                height: 630,
                alt: "MployCraft - Verify Code",
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
            <VerifyCode />
        </>
    );
};

export default Page;
