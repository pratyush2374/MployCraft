import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(req: NextRequest) {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
        const page = await browser.newPage();
        const searchParams = req.nextUrl.searchParams;
        const rcid = searchParams.get("rcid");
        const salutation = searchParams.get("sal");

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

        if (!resume || !resume.coverLetter) {
            return NextResponse.redirect(
                `${process.env.URL}/error?msg=Cover letter not found`,
                { status: 404 }
            );
        }

        const user = await prisma.user.findUnique({
            where: {
                id: resume.userId,
            },
        });

        let res = `
            <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <script src="https://cdn.tailwindcss.com"></script>
            <title>${user?.fullName} - Cover Letter</title>
            <style>
                @page {
                    size: A4;
                    margin: 0;
                }
                body {
                    min-height: 297mm;
                    width: 210mm;
                    margin: 0;
                    padding: 0;
                }
            </style>
        </head>
        <body class="bg-white p-6 font-sans text-[12px]">
        <div class="w-[90%] m-auto mt-4">
            <div class="mb-8 text-xl font-bold text-center">
                Cover Letter
            </div>
            
            <div class="mb-4 text-sm">
                ${salutation || "Dear Hiring Manager"},
            </div>

            <!-- Cover Letter Content -->
            <div class="text-sm text-gray-800 leading-relaxed space-y-4">
                ${resume.coverLetter}
            </div>

            <div class="mt-6 text-sm">
                <p>Regards,</p>
                <p>${user?.fullName}</p>
            </div>
            </div>
        </body>
    </html>
        `;

        await page.setContent(res);

        const pdfBuffer = await page.pdf({ format: "A4" });
        await browser.close();

        return new NextResponse(pdfBuffer, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="${
                    user?.fullName || ""
                } - Cover Letter.pdf"`,
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
