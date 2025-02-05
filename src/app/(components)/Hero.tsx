import Image from "next/image";
import Link from "next/link";

const Hero: React.FC = () => {
    return (
        <div className="relative overflow-hidden bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-between py-12 lg:py-20">
                    <div className="w-full lg:w-1/2 space-y-8">
                        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
                            MPLOYCRAFT
                            <span className="block text-blue-500 mt-2">
                                Your Career Accelerator
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600">
                            Transform your job search with AI-powered tools and
                            stand out from the competition
                        </p>
                        <Link
                            href="/sign-up"
                            className="inline-block px-8 py-4 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                        >
                            Get Started Free
                        </Link>
                    </div>
                    <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
                        <Image
                            src="/Landing/work.svg"
                            height={500}
                            width={500}
                            alt="Work Illustration"
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
