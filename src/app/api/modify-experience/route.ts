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
            company,
            jobTitle,
            startDate,
            endDate,
            isCurrent,
            location,
            achievementsAndResponsibilities,
        } = await req.json();

        if (purpose === "Add") {
            if (!company) {
                return NextResponse.json(
                    new ApiResponse(false, "Company name is required"),
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

            await prisma.workExperience.create({
                data: {
                    company,
                    jobTitle: jobTitle || null,
                    startDate: startDate ? new Date(startDate) : null,
                    endDate: endDate ? new Date(endDate) : null,
                    isCurrent: isCurrent ?? false,
                    location: location || null,
                    achievementsAndResponsibilities:
                        achievementsAndResponsibilities || null,
                    UserInfo: { connect: { id: userInfo.id } },
                },
            });

            return NextResponse.json(
                new ApiResponse(true, "Work experience added successfully"),
                { status: 200 }
            );
        }

        if (purpose === "Edit") {
            if (!id) {
                return NextResponse.json(
                    new ApiResponse(
                        false,
                        "Work experience ID is required for editing"
                    ),
                    { status: 400 }
                );
            }

            const existingWorkExperience =
                await prisma.workExperience.findUnique({
                    where: { id },
                    include: { UserInfo: true },
                });

            if (
                !existingWorkExperience ||
                existingWorkExperience.UserInfo?.userId !== userId
            ) {
                return NextResponse.json(
                    new ApiResponse(
                        false,
                        "Work experience not found or unauthorized"
                    ),
                    { status: 404 }
                );
            }

            await prisma.workExperience.update({
                where: { id },
                data: {
                    company,
                    jobTitle: jobTitle || null,
                    startDate: startDate ? new Date(startDate) : null,
                    endDate: endDate ? new Date(endDate) : null,
                    isCurrent: isCurrent ?? existingWorkExperience.isCurrent,
                    location: location || null,
                    achievementsAndResponsibilities:
                        achievementsAndResponsibilities || null,
                },
            });

            return NextResponse.json(
                new ApiResponse(true, "Work experience updated successfully"),
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
