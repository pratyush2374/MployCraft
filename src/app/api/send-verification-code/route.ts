import ApiResponse from "@/lib/apiResponse";
import redisClient from "@/lib/redisClient";
import sendEmail from "@/lib/sendEmail";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { fullName, identifier, password } = await req.json();

        if (!identifier || !fullName || !password) {
            return NextResponse.json(
                new ApiResponse(
                    false,
                    "Fullname or email or password not found"
                ),
                { status: 400 }
            );
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(identifier)) {
            return NextResponse.json(
                new ApiResponse(false, "Invalid email address"),
                { status: 400 }
            );
        }

        const verificationCode = Math.floor(Math.random() * 1000000);
        const hashedPassword = await bcrypt.hash(password, 10);

        const userDataForRedis = JSON.stringify({
            fullName,
            hashedPassword,
            verificationCode,
        });

        await Promise.all([
            redisClient.set(identifier, userDataForRedis, "EX", 900),
            sendEmail(fullName, identifier, verificationCode),
        ]);

        return NextResponse.json(
            new ApiResponse(true, "Verification code sent successfully"),
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(new ApiResponse(false, "Some error occured"), {
            status: 500,
        });
    }
}
