import ApiResponse from "@/lib/apiResponse";
import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { ScoreType } from "@prisma/client";

interface Education {
    instituteName?: string;
    major?: string;
    startDate?: string;
    endDate?: string;
    score?: string;
    scoreType?: ScoreType;
}

interface Experience {
    company?: string;
    jobTitle?: string;
    startDate?: string;
    endDate?: string;
    isCurrent?: boolean;
    location?: string;
    responsibilities?: string;
}

export async function POST(req: NextRequest) {
    try {
        const token = await getToken({ req });
        const userId = token?.id;

        if (!token || !userId) {
            return NextResponse.json(
                new ApiResponse(false, "Unauthorized, Please log in"),
                { status: 401 }
            );
        }

        let { education, experience, uii } = await req.json();

        if (!uii) {
            const uifid = await prisma.userInfo.findUnique({
                where: { userId },
                select: { id: true },
            });

            if (!uifid) {
                return NextResponse.json(
                    new ApiResponse(false, "User info not found"),
                    { status: 404 }
                );
            }
            uii = uifid.id;
        }

        if (Array.isArray(education) && Array.isArray(experience)) {
            const filteredEducationData = education
                .map((e: Education) => {
                    return Object.fromEntries(
                        Object.entries(e).filter(
                            ([_, val]) => val != null && val !== ""
                        )
                    );
                })
                .filter((v: Education) => Object.keys(v).length > 0);

            const filteredWorkExperienceData = experience
                .map((e: Experience) => {
                    return Object.fromEntries(
                        Object.entries(e).filter(
                            ([_, val]) => val != null && val !== ""
                        )
                    );
                })
                .filter((v: Experience) => Object.keys(v).length > 0);

            await prisma.$transaction([
                ...filteredEducationData.map((e) =>
                    prisma.education.create({
                        data: {
                            ...e,
                            startDate: e.startDate
                                ? new Date(e.startDate)
                                : null,
                            endDate: e.endDate ? new Date(e.endDate) : null,
                            UserInfo: { connect: { id: uii } },
                        },
                    })
                ),
                ...filteredWorkExperienceData.map((e) =>
                    prisma.workExperience.create({
                        data: {
                            ...e,
                            startDate: e.startDate
                                ? new Date(e.startDate)
                                : null,
                            endDate: e.endDate ? new Date(e.endDate) : null,
                            UserInfo: { connect: { id: uii } },
                        },
                    })
                ),
            ]);
        } else {
            return NextResponse.json(
                new ApiResponse(false, "Invalid data format"),
                { status: 400 }
            );
        }

        return NextResponse.json(
            new ApiResponse(true, "User's basic details saved"),
            { status: 200 }
        );
    } catch (error: unknown) {
        console.error(error);
        return NextResponse.json(
            new ApiResponse(
                false,
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred"
            ),
            { status: 500 }
        );
    }
}
