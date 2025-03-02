import ApiResponse from "@/lib/apiResponse";
import generateResumeAndCoverLetter from "@/lib/generateResumeAndCoverLetter";
import prisma from "@/lib/prismaClient";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

interface RequestInterface {
    companyName: string;
    position: string;
    jobDescription: string;
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
        const userId = token.id;

        // const userId = "67bea8095adb02bf9df69bad";

        const {
            companyName,
            position,
            jobDescription,
            notes,
        }: RequestInterface = await req.json();

        if (!companyName || !position || !jobDescription) {
            return NextResponse.json(
                new ApiResponse(
                    false,
                    "Company, position, job descriptiom and track job required"
                ),
                { status: 400 }
            );
        }

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

        const jobApplication = await prisma.jobApplication.create({
            data: {
                company: companyName,
                position,
                user: { connect: { id: userId } },
                notes,
                salary: dataFromAI?.salary || null,
            },
        });
        const resumeAndCoverLetter = await prisma.resumesAndCoverLetters.create(
            {
                data: {
                    professionalSummaryRC: dataFromAI.professionalSummaryRC,
                    experience: dataFromAI.experience,
                    companyName,
                    position,
                    coverLetter: dataFromAI.coverLetter,
                    user: { connect: { id: userId } },
                    jobApplication: { connect: { id: jobApplication.id } },
                },
            }
        );

        return NextResponse.json(
            new ApiResponse(true, "Resume and cover letter generated", {
                coverLetter: dataFromAI.coverLetter,
                rcid: resumeAndCoverLetter!.id,
                companyName,
                position,
            })
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            new ApiResponse(false, "Internal server error")
        );
    }
}
