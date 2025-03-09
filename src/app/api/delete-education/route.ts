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
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json(
                new ApiResponse(false, "Education ID is required"),
                { status: 400 }
            );
        }

        const education = await prisma.education.findUnique({
            where: { id },
            include: { UserInfo: true },
        });

        if (!education || education.UserInfo?.userId !== userId) {
            return NextResponse.json(
                new ApiResponse(false, "Education not found or unauthorized"),
                { status: 404 }
            );
        }

        await prisma.education.delete({
            where: { id },
        });

        return NextResponse.json(
            new ApiResponse(true, "Education deleted successfully"),
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