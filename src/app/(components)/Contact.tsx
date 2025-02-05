import { useToast } from "@/hooks/use-toast";
import Toast from "@/lib/toastClass";
import Image from "next/image";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
    name: string;
    email: string;
    message: string;
}

const Contact: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>();
    const { toast } = useToast();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setIsSubmitting(true);
        try {
            // Simulate form submission
            console.log(data);
            toast(
                new Toast(
                    "Success",
                    "We have received your message and will reach out to you"
                )
            );
            reset();
        } catch (error) {
            console.error("Submission failed", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-gray-50 py-16 lg:py-24" id="contact">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 md:w-[90%]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-center">
                    <div className="w-full flex justify-center lg:justify-start">
                        <Image
                            src="/Landing/contact.png"
                            alt="Contact MPLOYCRAFT"
                            width={500}
                            height={500}
                            className="w-full max-w-md h-auto"
                        />
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 text-center">
                            Get In Touch
                        </h2>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    {...register("name", {
                                        required: "Name is required",
                                        minLength: {
                                            value: 2,
                                            message:
                                                "Name must be at least 2 characters",
                                        },
                                    })}
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                                        errors.name
                                            ? "border-red-500 focus:ring-red-200"
                                            : "border-gray-300 focus:ring-blue-200"
                                    }`}
                                    placeholder="Your Name"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                                        errors.email
                                            ? "border-red-500 focus:ring-red-200"
                                            : "border-gray-300 focus:ring-blue-200"
                                    }`}
                                    placeholder="you@example.com"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    {...register("message", {
                                        required: "Message is required",
                                        minLength: {
                                            value: 10,
                                            message:
                                                "Message must be at least 10 characters",
                                        },
                                    })}
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 min-h-[120px] ${
                                        errors.message
                                            ? "border-red-500 focus:ring-red-200"
                                            : "border-gray-300 focus:ring-blue-200"
                                    }`}
                                    placeholder="Write your message here..."
                                ></textarea>
                                {errors.message && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.message.message}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-3 rounded-lg text-white font-semibold transition-colors duration-200 ${
                                    isSubmitting
                                        ? "bg-blue-400 cursor-not-allowed"
                                        : "bg-blue-500 hover:bg-blue-600"
                                }`}
                            >
                                {isSubmitting ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
