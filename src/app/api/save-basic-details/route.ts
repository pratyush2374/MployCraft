import ApiResponse from "@/lib/apiResponse";
import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

interface Link {
    type: string;
    url: string;
}

export async function POST(req: NextRequest) {
    try {
        const token = await getToken({ req });
        const userId = token?.id;

        if (!token && !userId) {
            return NextResponse.json(
                new ApiResponse(false, "Unauthorized, Please log in "),
                { status: 401 }
            );
        }

        const {
            contactNumber,
            location,
            professionalSummary,
            skills,
            softSkills,
            languages,
            hobbies,
            links,
        } = await req.json();

        const filteredData = Object.fromEntries(
            Object.entries({
                contactNumber,
                location,
                professionalSummary,
                skills,
                softSkills,
                languages,
                hobbies,
            }).filter(
                ([_, value]) =>
                    value !== undefined &&
                    value !== "" &&
                    value !== null &&
                    !(Array.isArray(value) && value.length == 0)
            )
        );

        const userInfo = await prisma.userInfo.create({
            data: {
                ...filteredData,
                user: { connect: { id: userId } },
            },
        });

        if (!(Array.isArray(links) && links.length == 0)) {
            await Promise.all(
                links.map((link: Link) =>
                    prisma.link.create({
                        data: {
                            type: link.type,
                            url: link.url,
                            UserInfo: { connect: { id: userInfo.id } },
                        },
                    })
                )
            );
        }

        return NextResponse.json(
            new ApiResponse(true, "User's basic details saved"),
            { status: 200 }
        );
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error.message);
            return NextResponse.json(new ApiResponse(false, error.message), {
                status: 500,
            });
        }

        return NextResponse.json(
            new ApiResponse(false, "An unknown error occurred"),
            { status: 500 }
        );
    }
}
