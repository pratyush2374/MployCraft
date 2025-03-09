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
        const {
            purpose,
            id,
            name,
            issuedBy,
            certificateIdOrURL,
            additionalInformation,
        } = await req.json();

        if (purpose === "Add") {
            if (!name) {
                return NextResponse.json(
                    new ApiResponse(false, "Certification name is required"),
                    { status: 400 }
                );
            }

            const userInfo = await prisma.userInfo.findUnique({
                where: { userId },
            });

            if (!userInfo) {
                return NextResponse.json(
                    new ApiResponse(false, "User info not found"),
                    { status: 404 }
                );
            }

            await prisma.certification.create({
                data: {
                    name,
                    issuedBy: issuedBy || null,
                    certificateIdOrURL: certificateIdOrURL || null,
                    additionalInformation: additionalInformation || null,
                    UserInfo: { connect: { id: userInfo.id } },
                },
            });

            return NextResponse.json(
                new ApiResponse(true, "Certification added successfully"),
                { status: 200 }
            );
        }

        if (purpose === "Edit") {
            if (!id) {
                return NextResponse.json(
                    new ApiResponse(
                        false,
                        "Certification ID is required for editing"
                    ),
                    { status: 400 }
                );
            }

            const existingCertification = await prisma.certification.findUnique(
                {
                    where: { id },
                    include: { UserInfo: true },
                }
            );

            if (
                !existingCertification ||
                existingCertification.UserInfo?.userId !== userId
            ) {
                return NextResponse.json(
                    new ApiResponse(
                        false,
                        "Certification not found or unauthorized"
                    ),
                    { status: 404 }
                );
            }

            await prisma.certification.update({
                where: { id },
                data: {
                    name,
                    issuedBy: issuedBy || null,
                    certificateIdOrURL: certificateIdOrURL || null,
                    additionalInformation: additionalInformation || null,
                },
            });

            return NextResponse.json(
                new ApiResponse(true, "Certification updated successfully"),
                { status: 200 }
            );
        }

        return NextResponse.json(new ApiResponse(false, "Invalid purpose"), {
            status: 400,
        });
    } catch (error: unknown) {
        console.log(error);
        return NextResponse.json(
            new ApiResponse(false, "Something went wrong"),
            { status: 500 }
        );
    }
}
