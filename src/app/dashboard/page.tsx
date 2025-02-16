"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Page: React.FC = () => {
    const { data: session, status } = useSession();
    const [data, setData] = useState<any>();

    useEffect(() => {
        if (status === "authenticated" && session) {
            console.log(session); // Logs actual session object
            setData(session);
        }
    }, [session, status]);

    if (status === "loading") {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <h1>{data ? `Welcome ${data.user?.name}` : "No session data"}</h1>
        </>
    );
};

export default Page;
