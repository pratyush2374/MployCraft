import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
    const socialIcons = [
        {
            name: "linkedin",
            path: "/Landing/linkedin.svg",
            target: "https://www.linkedin.com/in/pratyush2374",
        },
        {
            name: "twitter",
            path: "/Landing/twitter.svg",
            target: "https://x.com/pratyush2374",
        },
        {
            name: "instagram",
            path: "/Landing/instagram.svg",
            target: "https://www.instagram.com/pratyush_2374",
        },
        {
            name: "github",
            path: "/Landing/github.svg",
            target: "https://github.com/pratyush2374",
        },
    ];

    return (
        <footer className="bg-white border-t border-gray-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:w-[90%]">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                    {/* Logo Section */}
                    <div className="flex items-center space-x-4">
                        <Image
                            src="/Logo.svg"
                            alt="MPLOYCRAFT Logo"
                            width={40}
                            height={40}
                            className="h-10 w-auto"
                        />
                    </div>

                    {/* Social Icons */}
                    <div className="flex space-x-5">
                        {socialIcons.map((icon) => (
                            <Link
                                key={icon.name}
                                href={icon.target}
                                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                aria-label={`${icon.name} profile`}
                            >
                                <Image
                                    src={icon.path}
                                    alt={`${icon.name} icon`}
                                    width={24}
                                    height={24}
                                    className="h-5 w-5"
                                />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} MPLOYCRAFT. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
