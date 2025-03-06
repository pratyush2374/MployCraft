import ApiResponse from "@/lib/apiResponse";
import prisma from "@/lib/prismaClient";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

interface RequestData {
    id: string;
    rcid: string;
}

export async function POST(req: NextRequest) {
    try {
        const token = await getToken({ req });

        if (!token) {
            return NextResponse.json(
                new ApiResponse(false, "Unauthorized, please sign in"),
                { status: 401 }
            );
        }

        const { id, rcid }: RequestData = await req.json();
        console.log(id);

        if (!id) {
            return NextResponse.json(new ApiResponse(false, "Id is required"), {
                status: 400,
            });
        }

        Promise.all([
            await prisma.jobApplication.delete({
                where: {
                    id,
                },
            }),
            await prisma.resumesAndCoverLetters.delete({
                where: {
                    id: rcid,
                },
            }),
        ]);

        return NextResponse.json(
            new ApiResponse(true, "Application deleted successfully"),
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
