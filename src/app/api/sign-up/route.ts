import ApiResponse from "@/lib/apiResponse";
import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { fullName, email, password } = await req.json();
        const username = email.split("@")[0] + Date.now().toString().slice(-3);

        const existingUser = await prisma.user.findUnique({
            where: email,
        });

        if (existingUser) {
            return NextResponse.json(
                new ApiResponse(false, "User already exists", null),
                { status: 400 }
            );
        }

        const newUser = await prisma.user.create({
            data: {
                fullName,
                email,
                password,
                username,
            },
        });

        return NextResponse.json(
            new ApiResponse(true, "User signed up successfully", {
                id: newUser.id,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            new ApiResponse(false, "Some error occured", null),
            { status: 500 }
        );
    }
}
