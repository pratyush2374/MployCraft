import { Metadata } from "next";
import Dashboard from "../dashboard-components/Dashboard";

export const metadata: Metadata = {
    title: "Dashboard - MployCraft",
    metadataBase: new URL("https://mploycraft.vercel.app"),
    description:
        "Access your MployCraft dashboard to track job applications, generate resumes and cover letters, and manage your job search.",
    keywords:
        "MployCraft, dashboard, job tracker, AI resume builder, cover letter generator, job search tools",
    authors: [{ name: "Pratyush Sharma" }],
    robots: "index, follow",

    openGraph: {
        title: "Dashboard - MployCraft",
        description:
            "Manage your job search with MployCraft's AI-powered dashboard for tracking applications, resumes, and cover letters.",
        siteName: "MployCraft",
        images: [
            {
                url: "/Icon.svg",
                width: 1200,
                height: 630,
                alt: "MployCraft - Dashboard",
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
            <Dashboard />
        </>
    );
};

export default Page;
