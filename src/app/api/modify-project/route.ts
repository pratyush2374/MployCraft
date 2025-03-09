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
        const { purpose, id, title, description, url, skillsUsed } = await req.json();

        if (purpose === "Add") {
            if (!title) {
                return NextResponse.json(
                    new ApiResponse(false, "Project title is required"),
                    { status: 400 }
                );
            }

            const userInfo = await prisma.userInfo.findUnique({
                where: { userId }
            });

            if (!userInfo) {
                return NextResponse.json(
                    new ApiResponse(false, "User info not found"),
                    { status: 404 }
                );
            }

            await prisma.project.create({
                data: {
                    title,
                    description: description || null,
                    url: url || [],
                    skillsUsed: skillsUsed || [],
                    UserInfo: { connect: { id: userInfo.id } },
                },
            });

            return NextResponse.json(
                new ApiResponse(true, "Project added successfully"),
                { status: 200 }
            );
        }

        if (purpose === "Edit") {
            if (!id) {
                return NextResponse.json(
                    new ApiResponse(false, "Project ID is required for editing"),
                    { status: 400 }
                );
            }

            const existingProject = await prisma.project.findUnique({
                where: { id },
                include: { UserInfo: true },
            });

            if (!existingProject || existingProject.UserInfo?.userId !== userId) {
                return NextResponse.json(
                    new ApiResponse(false, "Project not found or unauthorized"),
                    { status: 404 }
                );
            }

            await prisma.project.update({
                where: { id },
                data: {
                    title,
                    description: description || null,
                    url: url || [],
                    skillsUsed: skillsUsed || [],
                },
            });

            return NextResponse.json(
                new ApiResponse(true, "Project updated successfully"),
                { status: 200 }
            );
        }

        return NextResponse.json(
            new ApiResponse(false, "Invalid purpose"),
            { status: 400 }
        );
    } catch (error: unknown) {
        console.log(error);
        return NextResponse.json(
            new ApiResponse(false, "Something went wrong"),
            { status: 500 }
        );
    }
}