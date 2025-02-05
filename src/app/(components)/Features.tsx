import Image from "next/image";
import Link from "next/link";

const Features: React.FC = () => {
    return (
        <>
            <div className="bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg p-2 mb-6">
                                <Image
                                    src="/Landing/resume.svg"
                                    height={50}
                                    width={50}
                                    alt="Resume"
                                />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Tailor Your Resume
                            </h2>
                            <h3 className="text-gray-600">
                                Craft the perfect resume that matches job
                                requirements and highlights your unique
                                strengths
                            </h3>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg p-2 mb-6">
                                <Image
                                    src="/Landing/rank.svg"
                                    height={50}
                                    width={50}
                                    alt="Rank"
                                />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Stand Out From The Crowd
                            </h2>
                            <h3 className="text-gray-600">
                                Get noticed by recruiters with optimized
                                profiles and applications that showcase your
                                potential
                            </h3>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg p-2 mb-6">
                                <Image
                                    src="/Landing/ai.svg"
                                    height={50}
                                    width={50}
                                    alt="AI"
                                />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                AI-Powered Career Tools
                            </h2>
                            <h3 className="text-gray-600">
                                Generate tailored resumes, cover letters, and
                                referral messages in one click with our AI
                                assistant
                            </h3>
                        </div>

                        {/* Feature 4 */}
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg p-2 mb-6">
                                <Image
                                    src="/Landing/personal.svg"
                                    height={50}
                                    width={50}
                                    alt="Personalization"
                                />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Personalized Output
                            </h2>
                            <h3 className="text-gray-600">
                                Get customized cover letters and resume updates
                                based on your unique skills and experience
                            </h3>
                        </div>

                        {/* Feature 5 */}
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg p-2 mb-6">
                                <Image
                                    src="/Landing/track.svg"
                                    height={50}
                                    width={50}
                                    alt="Tracking"
                                />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Smart Application Tracking
                            </h2>
                            <h3 className="text-gray-600">
                                Keep track of all your job applications,
                                deadlines, and interview stages in one organized
                                dashboard
                            </h3>
                        </div>

                        {/* Feature 6 */}
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg p-2 mb-6">
                                <Image
                                    src="/Landing/form.svg"
                                    height={50}
                                    width={50}
                                    alt="AutoFill"
                                />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Quick Application AutoFill
                            </h2>
                            <h3 className="text-gray-600">
                                Save time with our smart fill section that helps
                                you fills forms faster
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center pb-16">
                    <Link
                        href="/sign-up"
                        className="inline-flex items-center px-8 py-4 text-lg font-semibold text-blue-500 bg-white border-2 border-blue-500 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                    >
                        Start Your Journey Today
                        <svg
                            className="ml-2 w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Features;
