import ApiResponse from "@/lib/apiResponse";
import { NextRequest, NextResponse } from "next/server";
import generateColdEmail from "./generateColdEmail";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/prismaClient";

interface ReqData {
    companyName: string;
    jobPosition: string;
    jobDescription: string;
    aboutUs?: string;
    additionalInformation?: string;
    salutation?: string;
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
        const userId = token.id;

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                UserInfo: {
                    include: {
                        projects: true,
                        workExperience: true,
                        certifications: true,
                        education: true,
                    },
                },
            },
        });

        if (!user) {
            return NextResponse.json(new ApiResponse(false, "User not found"), {
                status: 404,
            });
        }

        const userData = {fullName: user.fullName, ...user.UserInfo};

        const {
            companyName,
            jobDescription,
            jobPosition,
            aboutUs,
            additionalInformation,
            salutation,
        }: ReqData = await req.json();

        if (!companyName || !jobDescription || !jobPosition) {
            return NextResponse.json(
                new ApiResponse(
                    false,
                    "Company name, job description and job position are required"
                ),
                { status: 400 }
            );
        }

        const dataFromAI = await generateColdEmail(
            companyName,
            jobPosition,
            jobDescription,
            aboutUs || "",
            additionalInformation || "",
            salutation,
            userData
        );

        return NextResponse.json(
            new ApiResponse(true, "Cold email generated", dataFromAI),
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            new ApiResponse(false, "Something went wrong"),
            { status: 500 }
        );
    }
}
