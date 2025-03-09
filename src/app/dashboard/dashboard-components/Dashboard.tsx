"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import { PanelRightOpen } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const Home = lazy(() => import("./Home"));
const ColdEmailing = lazy(() => import("./ColdEmailing"));
const TrackApplications = lazy(() => import("./TrackApplications"));
const QuickApply = lazy(() => import("./QuickApply"));
const ProfileSettings = lazy(() => import("./ProfileSettings"));

const Dashboard: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const { section } = useParams<{ section: string }>();
    const router = useRouter();

    useEffect(() => {
        let int: NodeJS.Timeout;

        const windowWidth = window.innerWidth;
        if (windowWidth < 1000 && sidebarOpen) {
            int = setTimeout(() => setSidebarOpen(false), 500);
        }

        const ls = localStorage.getItem("fromSignIn");
        if (ls) {
            router.push("/user-input");
        }
        return () => clearTimeout(int);
    }, []);

    const handleClickOnMobile = () => {
        const windowWidth = window.innerWidth;
        if (windowWidth < 1000 && sidebarOpen) {
            setSidebarOpen(false);
        }
    };

    return (
        <>
            <DashboardSidebar sidebarOpen={sidebarOpen} />

            <span
                onClick={() => setSidebarOpen((curr) => !curr)}
                className={`transition-all duration-300 fixed ${
                    sidebarOpen ? "ml-64" : "ml-0"
                } p-3 text-blue-500`}
            >
                <PanelRightOpen className="w-8 h-8" />
            </span>

            <main
                className={`p-10 pt-20 md:w-3/4 m-auto ${
                    sidebarOpen ? "md:ml-72" : ""
                }`}
                onClick={handleClickOnMobile}
            >
                <Suspense
                    fallback={
                        <div className="flex items-center justify-center min-h-[50vh]">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
                        </div>
                    }
                >
                    {section === "home" && <Home />}
                    {section === "cold-emailing" && <ColdEmailing />}
                    {section === "applications" && <TrackApplications />}
                    {section === "quick-apply" && <QuickApply />}
                    {section === "profile-settings" && <ProfileSettings />}
                </Suspense>
            </main>
        </>
    );
};

export default Dashboard;
