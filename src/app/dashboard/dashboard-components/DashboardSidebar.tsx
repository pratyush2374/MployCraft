import {
    Home,
    UserCog,
    FileCheck2,
    Mail,
    NotebookPen,
    User,
    LogOut,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

interface DashboardSidebar {
    setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
    sidebarOpen: boolean;
}

const items = [
    {
        title: "Home",
        icon: Home,
    },
    {
        title: "Cold emailing",
        icon: Mail,
    },
    {
        title: "Track applications",
        icon: NotebookPen,
    },
    {
        title: "Quick apply",
        icon: FileCheck2,
    },
    {
        title: "Profile settings",
        icon: UserCog,
    },
];

const DashboardSidebar: React.FC<DashboardSidebar> = ({
    setCurrentTab,
    sidebarOpen,
}) => {
    const { data } = useSession();
    const [activeTab, setActiveTab] = React.useState("Home");

    const handleTabClick = (title: string) => {
        setActiveTab(title);
        setCurrentTab(title);
    };

    const router = useRouter();

    const handleLogout = async () => {
        await signOut();
        router.push("/");
    };

    return (
        <aside
            className={`fixed top-0 left-0 h-screen bg-white shadow-lg w-64 transition-transform duration-300 ease-in-out ${
                !sidebarOpen ? "-translate-x-full" : "translate-x-0"
            }`}
        >
            {/* Profile Section */}
            <div className="px-6 py-8 border-b border-gray-100">
                <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                        <User className="w-8 h-8 text-blue-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h2 className="text-sm font-semibold text-gray-900 truncate">
                            {data?.user.fullName}
                        </h2>
                        <p className="text-xs text-gray-500 truncate">
                            {data?.user.email}
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation Items */}
            <nav className="px-4 py-6 space-y-1">
                {items.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => handleTabClick(item.title)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-150 ${
                            activeTab === item.title
                                ? "bg-blue-500 text-white"
                                : "text-gray-600 hover:bg-blue-50"
                        }`}
                    >
                        <item.icon
                            className={`w-5 h-5 ${
                                activeTab === item.title
                                    ? "text-white"
                                    : "text-blue-500"
                            }`}
                        />
                        <span className="text-sm font-medium">
                            {item.title}
                        </span>
                    </button>
                ))}
            </nav>

            {/* Logout Button */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
                <button
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors duration-150"
                    onClick={handleLogout}
                >
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default DashboardSidebar;
