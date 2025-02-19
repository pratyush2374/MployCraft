import { ChevronLast } from "lucide-react";
import Image from "next/image";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

const UserInputNavbar: React.FC = () => {
    return (
        <>
            <AlertDialog>
                <nav className="w-full bg-white py-4 px-6 border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                        <div className="flex items-center">
                            <Image
                                height={150}
                                width={150}
                                src="/Logo.svg"
                                alt="Logo"
                                className="object-contain"
                            />
                        </div>

                        <AlertDialogTrigger asChild>
                            <button className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors duration-200">
                                <span className="font-medium">Skip</span>
                                <ChevronLast className="h-5 w-5" />
                            </button>
                        </AlertDialogTrigger>
                    </div>
                </nav>

                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Skip ?</AlertDialogTitle>
                        <AlertDialogDescription>
                            We recommend that you fill in the details as the
                            tailored resume and cover letter will be generated
                            from these details.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Link href="/dashboard">
                            <AlertDialogAction className="bg-red-500 hover:bg-red-600">
                                Skip
                            </AlertDialogAction>
                        </Link>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default UserInputNavbar;
