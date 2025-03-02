import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const d = await prisma.workExperience.create({
            data: {
                company: "Google",
                jobTitle: "Software Engineer",
                startDate: new Date("2020-01-01"),
                endDate : new Date("2024-01-01"),
                location: "Remote",
                UserInfo: { connect: { id: "67beacb05adb02bf9df69bae" } },
            },
        });

        const expData = await prisma.workExperience.findMany();

        return NextResponse.json(expData, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
