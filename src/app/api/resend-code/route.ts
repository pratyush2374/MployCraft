import ApiResponse from "@/lib/apiResponse";
import redisClient from "@/lib/redisClient";
import sendEmail from "@/lib/sendEmail";
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'nodejs'
export const maxDuration = 59

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                new ApiResponse(false, "Email not found"),
                { status: 400 }
            );
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            return NextResponse.json(
                new ApiResponse(false, "Invalid email address"),
                { status: 400 }
            );
        }
        const userDataInRedis = await redisClient.get(email);

        if (!userDataInRedis) {
            return NextResponse.json(
                new ApiResponse(false, "Invalid request"),
                { status: 400 }
            );
        }

        const { fullName, hashedPassword } = JSON.parse(userDataInRedis);

        const verificationCode = Math.floor(100000 + Math.random() * 900000);

        const userDataForRedis = JSON.stringify({
            fullName,
            hashedPassword,
            verificationCode,
        });

        await Promise.all([
            redisClient.set(email, userDataForRedis, "EX", 900),
            sendEmail(fullName, email, verificationCode),
        ]);

        return NextResponse.json(
            new ApiResponse(true, "Verification re-sent successfully"),
            { status: 200 }
        );
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json(new ApiResponse(false, "Some error occured"), {
            status: 500,
        });
    }
}
