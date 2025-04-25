import ApiResponse from "@/lib/apiResponse";
import prisma from "@/lib/prismaClient";
import redisClient from "@/lib/redisClient";
import sendEmail from "@/lib/sendEmail";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'nodejs'
export const maxDuration = 59

export async function POST(req: NextRequest) {
    try {
        const { fullName, email, password } = await req.json();

        if (!email || !fullName || !password) {
            return NextResponse.json(
                new ApiResponse(
                    false,
                    "Fullname or email or password not found"
                ),
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

        const user = await prisma.user.findUnique({ where: { email } });

        if (user) {
            return NextResponse.json(
                new ApiResponse(false, "User already exists, try signing in"),
                { status: 409 }
            );
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        const hashedPassword = await bcrypt.hash(password, 10);

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
            new ApiResponse(true, "Verification code sent successfully"),
            { status: 200 }
        );
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json(new ApiResponse(false, "Some error occured"), {
            status: 500,
        });
    }
}
