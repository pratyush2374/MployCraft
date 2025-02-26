import ApiResponse from "@/lib/apiResponse";
import generateResumeAndCoverLetter from "@/lib/generateResumeAndCoverLetter";
import prisma from "@/lib/prismaClient";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

interface RequestInterface {
    companyName: string;
    position: string;
    jobDescription: string;
    trackJob: boolean;
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
            companyName,
            position,
            jobDescription,
            trackJob,
            notes,
        }: RequestInterface = await req.json();

        if (!companyName || !position || !jobDescription || !trackJob) {
            return NextResponse.json(
                new ApiResponse(
                    false,
                    "Company, position, job descriptiom and track job required"
                ),
                { status: 400 }
            );
        }

        const userId = token.id;
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                fullName: true,
                email: true,
                UserInfo: {
                    include: {
                        education: true,
                        workExperience: true,
                        projects: true,
                        certifications: true,
                        links: true,
                    },
                },
            },
        });

        if (!user) {
            return NextResponse.json(new ApiResponse(false, "User not found"), {
                status: 404,
            });
        }

        const filteredData = {
            fullName: user.fullName,
            email: user.email,
            ...user.UserInfo,
        };

        const dataFromAI = await generateResumeAndCoverLetter(
            filteredData,
            companyName,
            position,
            jobDescription
        );

        if (trackJob) {
            await prisma.resumes.create({
                data: {
                    professionalSummary: dataFromAI.professionalSummary,
                    experience: dataFromAI.experience,
                    companyName,
                    position,
                    user: { connect: { id: userId } },
                },
            });

            await prisma.jobApplication.create({
                data: {
                    company: companyName,
                    position,
                    user: { connect: { id: userId } },
                    notes,
                    salary: dataFromAI?.salary || null,
                },
            });
        }

        return NextResponse.json(
            new ApiResponse(true, "Resume and cover letter generated", dataFromAI)
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            new ApiResponse(false, "Internal server error")
        );
    }
}
