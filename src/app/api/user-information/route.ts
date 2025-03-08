import ApiResponse from "@/lib/apiResponse";
import prisma from "@/lib/prismaClient";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const token = await getToken({ req });

        if (!token) {
            return NextResponse.json(
                new ApiResponse(false, "Unauthorized, please sign in"),
                { status: 401 }
            );
        }

        const userId = token.id;

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id : true,
                fullName: true,
                username: true,
                email: true,
                UserInfo: {
                    include: {
                        education: true,
                        workExperience: true,
                        projects: true,
                        certifications: true,
                        links: true,
                    },
                },
            },
        });

        if (!user || !user.UserInfo) {
            return NextResponse.json(
                new ApiResponse(
                    false,
                    "User data not found or data is incomplete"
                ),
                {
                    status: 404,
                }
            );
        }

        const formattedUser = {
            fullName: user.fullName,
            email: user.email,
            username: user.username,
            ...user.UserInfo,
        };
        
        return NextResponse.json(
            new ApiResponse(
                true,
                "User data fetched successfully",
                formattedUser
            ),
            { status: 200 }
        );
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json(
            new ApiResponse(false, "Something went wrong"),
            { status: 500 }
        );
    }
}
