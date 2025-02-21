import ApiResponse from "@/lib/apiResponse";
import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

interface Certification {
    name: string;
    issuedBy?: string;
    certificateIdOrURL?: string;
    additionalInformation?: string;
}

interface Project {
    title: string;
    skillsUsed?: string[];
    description?: string;
    startDate?: string;
    endDate?: string;
    url?: string[];
}

interface RequestBody {
    certifications?: Certification[];
    projects?: Project[];
    uii?: string | null;
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

        const {
            certifications = [],
            projects = [],
            uii,
        }: RequestBody = await req.json();

        console.log(uii);

        let userInfoId = uii;

        if (!userInfoId) {
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
            userInfoId = userInfo.id;
        }

        if (!Array.isArray(projects) || !Array.isArray(certifications)) {
            return NextResponse.json(
                new ApiResponse(false, "Invalid data format"),
                { status: 400 }
            );
        }

        // Check for blank names in projects and certifications
        if (
            projects.some((p) => !p.title) ||
            certifications.some((c) => !c.name)
        ) {
            return NextResponse.json(
                new ApiResponse(
                    false,
                    "Project title or certification name cannot be blank"
                ),
                { status: 400 }
            );
        }

        // Filter out empty values from each project and certification
        const cleanProjects = projects
            .map((p) =>
                Object.fromEntries(
                    Object.entries(p).filter(([_, v]) => v != null && v !== "")
                )
            )
            .filter((p) => Object.keys(p).length > 0);

        const cleanCertifications = certifications
            .map((c) =>
                Object.fromEntries(
                    Object.entries(c).filter(([_, v]) => v != null && v !== "")
                )
            )
            .filter((c) => Object.keys(c).length > 0);

        if (cleanProjects.length > 0 || cleanCertifications.length > 0) {
            await prisma.$transaction([
                ...cleanProjects.map((proj) =>
                    prisma.project.create({
                        data: {
                            title: proj.title,
                            ...proj,
                            UserInfo: { connect: { id: userInfoId } },
                        },
                    })
                ),
                ...cleanCertifications.map((cert) =>
                    prisma.certification.create({
                        data: {
                            name: cert.name,
                            ...cert,
                            UserInfo: { connect: { id: userInfoId } },
                        },
                    })
                ),
            ]);
        }

        return NextResponse.json(
            new ApiResponse(
                true,
                "Projects and certifications data saved successfully"
            ),
            { status: 200 }
        );
    } catch (error : unknown) {
        console.log(error);
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
