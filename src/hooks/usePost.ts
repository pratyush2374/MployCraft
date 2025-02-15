"use client";

import axios from "axios";
import { useState } from "react";

interface ApiResponse {
    success: boolean;
    message: string;
    data : any;
}

const usePost = (url: string) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [resData, setResData] = useState<ApiResponse | null>(null);

    const post = async (body: any) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(url, body, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            setResData(response.data);
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message;
            setError(errorMessage);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { post, loading, error, resData };
};

export default usePost;
