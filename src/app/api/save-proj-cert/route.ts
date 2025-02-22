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

        let { certifications, projects, uii }: RequestBody = await req.json();

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
            userInfoId = userInfo.id as string;
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
        if (projects.length > 0) {
            const cleanProjects = projects
                .map((p) =>
                    Object.fromEntries(
                        Object.entries(p).filter(
                            ([_, v]) => v != null && v !== ""
                        )
                    )
                )
                .filter((p) => Object.keys(p).length > 0);

            if (cleanProjects.length > 0) {
                await prisma.$transaction([
                    ...cleanProjects.map((proj) => {
                        return prisma.project.create({
                            data: {
                                title: proj.title,
                                ...proj,
                                UserInfo: { connect: { id: userInfoId } },
                            },
                        });
                    }),
                ]);
            }
        }
        if (certifications.length > 0) {
            const cleanCertifications = certifications
                .map((c) =>
                    Object.fromEntries(
                        Object.entries(c).filter(
                            ([_, v]) => v != null && v !== ""
                        )
                    )
                )
                .filter((c) => Object.keys(c).length > 0);

            if (cleanCertifications.length > 0) {
                await prisma.$transaction([
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
        }

        return NextResponse.json(
            new ApiResponse(
                true,
                "Projects and certifications data saved successfully"
            ),
            { status: 200 }
        );
    } catch (error: unknown) {
        // Enhanced error logging
        console.error("Error details:");
        console.error("Error object:", error);

        if (error instanceof Error) {
            console.error("Error name:", error.name);
            console.error("Error message:", error.message);
            console.error("Error stack:", error.stack);

            // If it's a Prisma error, it might have additional details
            if ("code" in error) {
                console.error("Error code:", (error as any).code);
            }

            return NextResponse.json(
                new ApiResponse(false, `${error.name}: ${error.message}`),
                { status: 500 }
            );
        }

        // For non-Error objects
        console.error("Non-Error object thrown:", typeof error);
        return NextResponse.json(
            new ApiResponse(false, "An unknown error occurred"),
            { status: 500 }
        );
    }
}
