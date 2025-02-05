import Image from "next/image";

const About: React.FC = () => {
    return (
        <div className="bg-white py-16 lg:py-24 md:w-[90%] m-auto" id="about">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="w-full flex justify-center lg:justify-start">
                        <Image
                            src="/Landing/about.svg"
                            alt="About MPLOYCRAFT"
                            width={500}
                            height={500}
                            className="w-full max-w-md h-auto"
                        />
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            Empowering Your Career Journey
                        </h2>
                        <div className="text-gray-600 space-y-4 text-lg">
                            <p>
                                At MPLOYCRAFT, we understand the challenges of
                                navigating today's competitive job market. Our
                                mission is to transform your career search from
                                a daunting task to an exciting opportunity for
                                growth and success.
                            </p>
                            <p>
                                Powered by cutting-edge AI technology, we
                                provide intelligent tools that help you showcase
                                your unique talents, optimize your applications,
                                and connect with the right opportunities.
                            </p>
                            <p>
                                Whether you're a recent graduate, a career
                                changer, or an experienced professional,
                                MPLOYCRAFT is designed to give you the
                                competitive edge you need to stand out and
                                achieve your career goals.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
