import ApiResponse from "@/lib/apiResponse";
import generateResume from "@/lib/generateResume";
import prisma from "@/lib/prismaClient";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

interface AiResponse {
    professionalSummary: string;
    experience: string[];
}

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
            where: { id: userId },
            select: {
                fullName: true,
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

        if (!user) {
            return NextResponse.json(new ApiResponse(false, "User not found"), {
                status: 404,
            });
        }

        const filteredData = {
            fullName: user.fullName,
            email: user.email,
            ...user.UserInfo,
        };

        const data: AiResponse = await generateResume(filteredData);

        await prisma.resumesAndCoverLetters.create({
            data: {
                professionalSummaryRC: data.professionalSummary,
                experience: data.experience,
                isGeneral: true,
                user: { connect: { id: userId } },
            },
        });

        return NextResponse.json(
            new ApiResponse(true, "Resume created successfully"),
            {
                status: 200,
            }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            new ApiResponse(false, "Internal server error"),
            { status: 500 }
        );
    }
}
