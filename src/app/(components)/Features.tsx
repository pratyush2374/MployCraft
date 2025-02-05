import features from "@/constants/features";
import Image from "next/image";
import Link from "next/link";

const Features: React.FC = () => {
    return (
        <>
            <div className="bg-gray-50" id="features">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
                                key={index}
                            >
                                <div className="w-12 h-12 bg-blue-100 rounded-lg p-2 mb-6">
                                    <Image
                                        src={`/Landing/${feature.image}`}
                                        height={50}
                                        width={50}
                                        alt="Resume"
                                    />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    {feature.title}
                                </h2>
                                <h3 className="text-gray-600">
                                    {feature.subtitle}
                                </h3>
                            </div>
                        ))}
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
