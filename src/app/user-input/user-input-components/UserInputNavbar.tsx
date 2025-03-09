import Image from "next/image";

const UserInputNavbar: React.FC = () => {
    return (
        <>
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
                </div>
            </nav>
        </>
    );
};

export default UserInputNavbar;
