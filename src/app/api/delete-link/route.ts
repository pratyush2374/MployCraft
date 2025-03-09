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

        // Check if the link exists and belongs to the user
        const existingLink = await prisma.link.findUnique({
            where: { id },
            include: { UserInfo: true }
        });

        if (!existingLink || existingLink.UserInfo?.userId !== userId) {
            return NextResponse.json(
                new ApiResponse(false, "Link not found or unauthorized"),
                { status: 404 }
            );
        }

        // Delete the link
        await prisma.link.delete({
            where: { id }
        });

        return NextResponse.json(
            new ApiResponse(true, "Link deleted successfully"),
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
