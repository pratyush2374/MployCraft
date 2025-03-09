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
        const { link, type } = await req.json();

        // Fetch UserInfo ID
        const userInfo = await prisma.userInfo.findUnique({
            where: { userId },
            select: { id: true },
        });

        if (!userInfo) {
            return NextResponse.json(
                new ApiResponse(false, "User info not found"),
                { status: 404 }
            );
        }

        // Add new link
        await prisma.link.create({
            data: {
                url: link,
                type,
                UserInfo: { connect: { id: userInfo.id } },
            },
        });

        return NextResponse.json(
            new ApiResponse(true, "Link added successfully"),
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
