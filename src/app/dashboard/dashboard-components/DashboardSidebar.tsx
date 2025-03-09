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
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface DashboardSidebar {
    sidebarOpen: boolean;
}

const items = [
    {
        title: "Home",
        icon: Home,
        url: "home",
    },
    {
        title: "Cold emailing",
        icon: Mail,
        url: "cold-emailing",
    },
    {
        title: "Track applications",
        icon: NotebookPen,
        url: "applications",
    },
    {
        title: "Quick apply",
        icon: FileCheck2,
        url: "quick-apply",
    },
    {
        title: "Profile settings",
        icon: UserCog,
        url: "profile-settings",
    },
];

const DashboardSidebar: React.FC<DashboardSidebar> = ({ sidebarOpen }) => {
    const { data } = useSession();
    const [activeTab, setActiveTab] = React.useState("Home");
    const router = useRouter();
    const { section } = useParams();

    const handleTabClick = (url: string) => {
        router.push(`/dashboard/${url}`);
    };

    useEffect(() => {
        if (section) {
            setActiveTab(section as string);
        }
    }, []);
    const handleLogout = async () => {
        await signOut();
        router.push("/");
    };

    return (
        <aside
            className={`z-[40] fixed top-0 left-0 h-screen bg-white shadow-lg w-64 transition-transform duration-300 ease-in-out ${
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
                        onClick={() => handleTabClick(item.url)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-150 ${
                            activeTab === item.url
                                ? "bg-blue-500 text-white"
                                : "text-gray-600 hover:bg-blue-50"
                        }`}
                    >
                        <item.icon
                            className={`w-5 h-5 ${
                                activeTab === item.url
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
