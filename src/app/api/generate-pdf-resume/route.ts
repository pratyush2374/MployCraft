import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
import getFresherResume from "./getFresherResume";
import chromium from "@sparticuz/chromium";
import { WorkExperience } from "@prisma/client";
import getExperiencedResume from "./getExperiencedResume";

export const runtime = 'nodejs'
export const maxDuration = 59

export async function GET(req: NextRequest) {
    try {
        const browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: true,
        });
        const page = await browser.newPage();
        const searchParams = req.nextUrl.searchParams;
        const rcid = searchParams.get("rcid");

        if (!rcid) {
            return NextResponse.redirect(
                `${process.env.URL}/error?msg=ID not found`,
                { status: 404 }
            );
        }

        const resume = await prisma.resumesAndCoverLetters.findUnique({
            where: {
                id: rcid,
            },
        });

        if (!resume) {
            return NextResponse.redirect(
                `${process.env.URL}/error?msg=Resume not found`,
                { status: 404 }
            );
        }

        const user = await prisma.user.findUnique({
            where: {
                id: resume.userId,
            },
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
            return NextResponse.redirect(
                `${process.env.URL}/error?msg=User not found`,
                { status: 404 }
            );
        }

        if (!user.UserInfo) {
            return NextResponse.redirect(
                `${process.env.URL}/error?msg=User info not found`,
                { status: 404 }
            );
        }

        let workExp = [] as WorkExperience[];
        if (user.UserInfo.workExperience) {
            workExp = user.UserInfo.workExperience.sort(
                (a, b) =>
                    new Date(b.startDate ?? 0).getTime() -
                    new Date(a.startDate ?? 0).getTime()
            );
        }

        const data = {
            fullName: user.fullName,
            email: user.email,
            ...user.UserInfo,
            ...resume,
            workExp,
        };

        let res;
        let duration;

        if (user.UserInfo!.workExperience.length != 0) {
            duration = getTotalDuration(user.UserInfo!.workExperience);
        }

        if (duration && duration > 180) {
            res = getExperiencedResume(data);
        } else {
            res = getFresherResume(data);
        }

        await page.setContent(res as string);

        const pdfBuffer = await page.pdf({ format: "A4" });
        await browser.close();

        return new NextResponse(pdfBuffer, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; "${
                    user?.fullName || ""
                } - Resume.pdf"`,
            },
        });
    } catch (error) {
        console.log(error);
        console.error("Error generating PDF:", error);
        return NextResponse.json(
            { error: "Failed to generate PDF" },
            { status: 500 }
        );
    }
}

const getTotalDuration = (workExperience: WorkExperience[]): number => {
    let durationInMs = 0;

    workExperience.forEach((ex) => {
        if (ex.endDate && ex.startDate) {
            const diff = ex.endDate.getTime() - ex.startDate.getTime();
            durationInMs += diff;
        } else if (ex.isCurrent && ex.startDate) {
            const diff = Date.now() - ex.startDate.getTime();
            durationInMs += diff;
        }
    });

    const duration = Math.floor(durationInMs / 1000 / 60 / 60 / 24);
    return duration;
};
