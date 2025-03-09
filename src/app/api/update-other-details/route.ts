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
        const { skills, softSkills, languages, hobbies } = await req.json();

        // Update UserInfo with new details
        await prisma.userInfo.update({
            where: { userId },
            data: {
                skills,
                softSkills,
                languages,
                hobbies,
            },
        });

        return NextResponse.json(
            new ApiResponse(true, "User details updated successfully"),
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
