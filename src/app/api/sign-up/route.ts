import ApiResponse from "@/lib/apiResponse";
import prisma from "@/lib/prismaClient";
import redisClient from "@/lib/redisClient";
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'nodejs'
export const maxDuration = 59

export async function POST(req: NextRequest) {
    try {
        const { email, code } = await req.json();
        console.log(email+code);

        if (!email || !code) {
            return NextResponse.json(
                new ApiResponse(false, "Email and code are required"),
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

        const storedUserDataInRedis = await redisClient.get(email);

        if (!storedUserDataInRedis) {
            return NextResponse.json(
                new ApiResponse(false, "Verify code expired"),
                { status: 410 }
            );
        }

        const { fullName, hashedPassword, verificationCode } = JSON.parse(
            storedUserDataInRedis
        );

        console.log(storedUserDataInRedis);

        if (code != verificationCode) {
            return NextResponse.json(
                new ApiResponse(false, "Incorrect verification code"),
                { status: 400 }
            );
        }

        const username = email.split("@")[0] + Date.now().toString().slice(-3);

        const newUser = await prisma.user.create({
            data: {
                fullName,
                email,
                password: hashedPassword,
                username,
            },
        });

        await redisClient.del(email);

        return NextResponse.json(
            new ApiResponse(true, "User signed up successfully", {
                id: newUser.id,
            }),
            { status: 200 }
        );
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json(
            new ApiResponse(false, "Some error occured", null),
            { status: 500 }
        );
    }
}
