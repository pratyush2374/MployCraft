"use client";

import { Suspense, lazy, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserInputNavbar from "./UserInputNavbar";

// Lazy load the components
const BasicDetails = lazy(() => import("./BasicDetails"));
const EduAndExp = lazy(() => import("./EduAndExp"));
const CertificateAndProject = lazy(() => import("./CertificateAndProject"));

// Loading fallback component
const LoadingComponent = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const UserInput = () => {
  const [tab, setTab] = useState<number>(3);
  const router = useRouter();

  useEffect(() => {
    const fromSignIn = localStorage.getItem("fromSignIn");
    if (!fromSignIn) {
      router.push("/dashboard");
    }
  }, []);

  const renderActiveTab = () => {
    return (
      <Suspense fallback={<LoadingComponent />}>
        {tab === 1 && <BasicDetails setTab={setTab} />}
        {tab === 2 && <EduAndExp setTab={setTab} />}
        {tab === 3 && <CertificateAndProject />}
      </Suspense>
    );
  };

  return (
    <>
      <UserInputNavbar />
      {renderActiveTab()}
    </>
  );
};

export default UserInput;