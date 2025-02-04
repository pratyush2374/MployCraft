import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "MployCraft",
    description:
        "MployCraft helps users generate AI-powered tailored cover letters and resumes based on job descriptions, track job applications and fill forms efficiently.",
    icons: {
        icon: "/Icon.svg",
        shortcut: "/Icon.svg",
        apple: "/Icon.svg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${montserrat.className} antialiased`}>
                {children}
            </body>
        </html>
    );
}
