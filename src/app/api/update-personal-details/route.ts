import ApiResponse from "@/lib/apiResponse";
import prisma from "@/lib/prismaClient";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const token = await getToken({ req });
        if (!token) {
            return NextResponse.json(
                new ApiResponse(false, "Unauthorized, please sign in"),
                { status: 401 }
            );
        }

        const userId = token.id;
        const { fullName, username, contactNumber, location, professionalSummary } = await req.json();

        // Check if username is unique (excluding current user)
        const existingUser = await prisma.user.findUnique({
            where: { username },
        });
        
        if (existingUser && existingUser.id !== userId) {
            return NextResponse.json(
                new ApiResponse(false, "Username already taken"),
                { status: 400 }
            );
        }

        // Update User and UserInfo
        await prisma.user.update({
            where: { id: userId },
            data: {
                fullName,
                username,
                UserInfo: {
                    upsert: {
                        create: {
                            contactNumber,
                            location,
                            professionalSummary,
                        },
                        update: {
                            contactNumber,
                            location,
                            professionalSummary,
                        },
                    },
                },
            },
        });

        return NextResponse.json(
            new ApiResponse(true, "User information updated successfully"),
            { status: 200 }
        );
    } catch (error: unknown) {
        console.log(error);
        return NextResponse.json(
            new ApiResponse(false, "Something went wrong"),
            { status: 500 }
        );
    }
}
