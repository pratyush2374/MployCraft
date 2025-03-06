import ApiResponse from "@/lib/apiResponse";
import prisma from "@/lib/prismaClient";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

interface RequestData {
    id: string;
    rcid: string;
    company: string;
    position: string;
    status:
        | "APPLIED"
        | "SCREENING"
        | "INTERVIEW_SCHEDULED"
        | "TECHNICAL_ROUND"
        | "HR_ROUND"
        | "OFFER_RECEIVED"
        | "ACCEPTED"
        | "REJECTED"
        | "WITHDRAWN";
    salary?: string;
    notes?: string;
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

        const {
            id,
            company,
            position,
            status,
            salary,
            notes,
        }: RequestData = await req.json();

        if (!id  || !company || !position || !status) {
            return NextResponse.json(
                new ApiResponse(false, "Fields are missing"),
                { status: 400 }
            );
        }

        await prisma.jobApplication.update({
            where: {
                id,
            },
            data: {
                company,
                position,
                status,
                salary,
                notes,
            },
        });

        return NextResponse.json(
            new ApiResponse(true, "Application updated successfully"),
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
