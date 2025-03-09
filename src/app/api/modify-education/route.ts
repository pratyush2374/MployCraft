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
        const {
            purpose,
            id,
            instituteName,
            major,
            startDate,
            endDate,
            score,
            scoreType,
            achievements,
        } = await req.json();

        if (purpose === "Add") {
            if (!instituteName) {
                return NextResponse.json(
                    new ApiResponse(false, "Institute name is required"),
                    { status: 400 }
                );
            }

            const userInfo = await prisma.userInfo.findUnique({
                where: { userId },
            });

            if (!userInfo) {
                return NextResponse.json(
                    new ApiResponse(false, "User info not found"),
                    { status: 404 }
                );
            }

            await prisma.education.create({
                data: {
                    instituteName,
                    major: major || null,
                    startDate: startDate ? new Date(startDate) : null,
                    endDate: endDate ? new Date(endDate) : null,
                    score: score || null,
                    scoreType: scoreType || null,
                    achievements: achievements || null,
                    UserInfo: { connect: { id: userInfo.id } },
                },
            });

            return NextResponse.json(
                new ApiResponse(true, "Education added successfully"),
                { status: 200 }
            );
        }

        if (purpose === "Edit") {
            if (!id) {
                return NextResponse.json(
                    new ApiResponse(
                        false,
                        "Education ID is required for editing"
                    ),
                    { status: 400 }
                );
            }

            const existingEducation = await prisma.education.findUnique({
                where: { id },
                include: { UserInfo: true },
            });

            if (
                !existingEducation ||
                existingEducation.UserInfo?.userId !== userId
            ) {
                return NextResponse.json(
                    new ApiResponse(
                        false,
                        "Education not found or unauthorized"
                    ),
                    { status: 404 }
                );
            }

            await prisma.education.update({
                where: { id },
                data: {
                    instituteName,
                    major: major || null,
                    startDate: startDate ? new Date(startDate) : null,
                    endDate: endDate ? new Date(endDate) : null,
                    score: score || null,
                    scoreType: scoreType || null,
                    achievements: achievements || null,
                },
            });

            return NextResponse.json(
                new ApiResponse(true, "Education updated successfully"),
                { status: 200 }
            );
        }

        return NextResponse.json(new ApiResponse(false, "Invalid purpose"), {
            status: 400,
        });
    } catch (error: unknown) {
        console.log(error);
        return NextResponse.json(
            new ApiResponse(false, "Something went wrong"),
            { status: 500 }
        );
    }
}
