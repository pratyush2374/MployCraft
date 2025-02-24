import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET() {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setContent(`<!DOCTYPE html>
            <html>
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <script src="https://cdn.tailwindcss.com"></script>
                    <title>Pratyush Sharma - Resume</title>
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
                <body class="bg-white p-6 font-sans text-[11px]">
                    <div class="max-w-[200mm] mx-auto">
                        <!-- Header -->
                        <header class="border-b pb-2 mb-3">
                            <div class="flex justify-between items-start">
                                <div>
                                    <h1 class="text-2xl font-bold mb-1">Pratyush Sharma</h1>
                                    <div class="text-gray-600">
                                        <a href="mailto:pratyushsharma2374@gmail.com" class="hover:text-blue-600">pratyushsharma2374@gmail.com</a>
                                        <span class="mx-2">|</span>
                                        <span>+91 9867327251</span>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <div class="space-x-2">
                                        <a href="#" class="text-blue-600 hover:underline">Portfolio</a>
                                        <a href="#" class="text-blue-600 hover:underline">LinkedIn</a>
                                        <a href="#" class="text-blue-600 hover:underline">GitHub</a>
                                    </div>
                                    <p class="text-gray-600">Mumbai, Maharashtra, India</p>
                                </div>
                            </div>
                        </header>
            
                        <!-- Professional Summary -->
                        <section class="mb-3">
                            <h2 class="text-base font-bold mb-1">Professional Summary</h2>
                            <p class="text-gray-700 leading-tight">
                                Results-driven Computer Science student skilled in building dynamic, user-focused web applications. Proficient in frontend technologies like JavaScript, React, TypeScript, Next.js, HTML, CSS, and TailwindCSS. Experienced in backend development with Node.js, Express.js, Next.js and secure authentication using JWT. Proficient in working with databases like PostgreSQL, MongoDB, MySQL, and Redis. Expertise in RESTful API testing using Postman, version control with Git, containerization with Docker, real-time communication with WebSockets, and agile tools like Jira and currently expanding skills in Redis and GraphQL to enhance API and data management.
                            </p>
                        </section>
            
                        <!-- Education -->
                        <section class="mb-3">
                            <h2 class="text-base font-bold mb-1">Education</h2>
                            <div class="space-y-1">
                                <div class="flex justify-between">
                                    <div>
                                        <h3 class="font-semibold">Kishinchand Chellaram College, Mumbai</h3>
                                        <p>B.Sc. in Computer Science (2022 – April 2025)</p>
                                    </div>
                                    <p class="text-gray-600">CGPA: 9.57</p>
                                </div>
                                <div class="flex justify-between">
                                    <div>
                                        <h3 class="font-semibold">St. Xavier's College</h3>
                                        <p>12th Std – Science (2022)</p>
                                    </div>
                                    <p class="text-gray-600">Percentage: 70.17%</p>
                                </div>
                                <div class="flex justify-between">
                                    <div>
                                        <h3 class="font-semibold">St. Joseph's High School</h3>
                                        <p>10th Std (2020)</p>
                                    </div>
                                    <p class="text-gray-600">Percentage: 92.6%</p>
                                </div>
                            </div>
                        </section>
            
                        <!-- Skills -->
                        <section class="mb-3">
                            <h2 class="text-base font-bold mb-1">Skills</h2>
                            <div class="flex flex-wrap gap-1">
                                <span class="px-2 py-0.5 bg-gray-200 rounded-full text-[10px]">JavaScript</span>
                                <span class="px-2 py-0.5 bg-gray-200 rounded-full text-[10px]">TypeScript</span>
                                <span class="px-2 py-0.5 bg-gray-200 rounded-full text-[10px]">HTML</span>
                                <span class="px-2 py-0.5 bg-gray-200 rounded-full text-[10px]">CSS</span>
                                <span class="px-2 py-0.5 bg-gray-200 rounded-full text-[10px]">React</span>
                                <span class="px-2 py-0.5 bg-gray-200 rounded-full text-[10px]">Next.js</span>
                                <span class="px-2 py-0.5 bg-gray-200 rounded-full text-[10px]">MongoDB</span>
                                <span class="px-2 py-0.5 bg-gray-200 rounded-full text-[10px]">Redis</span>
                                <span class="px-2 py-0.5 bg-gray-200 rounded-full text-[10px]">Express</span>
                                <span class="px-2 py-0.5 bg-gray-200 rounded-full text-[10px]">Node.js</span>
                                <span class="px-2 py-0.5 bg-gray-200 rounded-full text-[10px]">TailwindCSS</span>
                                <span class="px-2 py-0.5 bg-gray-200 rounded-full text-[10px]">Redux</span>
                                <span class="px-2 py-0.5 bg-gray-200 rounded-full text-[10px]">Docker</span>
                            </div>
                        </section>
            
                        <!-- Projects -->
                        <section class="mb-3">
                            <h2 class="text-base font-bold mb-1">Projects</h2>
                            <div class="grid grid-cols-2 gap-2">
                                <ul class="list-disc pl-4 text-gray-700 space-y-1 text-[10px]">
                                    <li><span class="font-semibold">PTAI:</span> AI-based fitness app with Next.js, offering personalized workouts and nutrition plans.</li>
                                    <li><span class="font-semibold">My Portfolio:</span> Website where I showcase my skills and journey</li>
                                    <li><span class="font-semibold">Shade Mail:</span> Anonymous messaging platform built with Next.js</li>
                                    <li><span class="font-semibold">SlinKit:</span> A tool for creating and managing shortened URLs like Bitly.</li>
                                </ul>
                                <ul class="list-disc pl-4 text-gray-700 space-y-1 text-[10px]">
                                    <li><span class="font-semibold">YouTube Backend:</span> Backend system for video hosting and management</li>
                                    <li><span class="font-semibold">TripTuner:</span> AI-based itinerary generator based on user input</li>
                                    <li><span class="font-semibold">MployCraft (In Progress):</span> AI-powered platform for resume & cover letter customization</li>
                                </ul>
                            </div>
                        </section>
            
                        <!-- Experience -->
                        <section class="mb-3">
                            <h2 class="text-base font-bold mb-1">Experience</h2>
                            <ul class="list-disc pl-4 space-y-1 text-gray-700 text-[10px]">
                                <li>Spearheaded and collaborated with 10+ project teams, swiftly troubleshooting and resolving critical bugs, ensuring enhanced functionality, optimized performance, and on-time project delivery</li>
                                <li>Optimized PTAI website performance, achieving an LCP of 0.5s, 0 CLS, and a perfect 100 Lighthouse score on Google Chrome</li>
                                <li>Boosted SEO performance, achieving 90+ in Chrome's Lighthouse and 100 in a Next.js web app</li>
                                <li>Proficient in version control systems (Git and GitHub), with expertise in repository management, branching strategies, and conflict resolution</li>
                                <li>Skilled in developing scalable, high-performance, and maintainable full-stack web applications using the MERN stack</li>
                            </ul>
                        </section>
            
                        <!-- Core Competencies -->
                        <section class="mb-3">
                            <h2 class="text-base font-bold mb-1">Core Competencies</h2>
                            <div class="grid grid-cols-2 gap-2 text-gray-700 text-[10px]">
                                <ul class="list-disc pl-4 space-y-0.5">
                                    <li>Web Development</li>
                                    <li>Troubleshooting & Debugging</li>
                                    <li>Database Management</li>
                                    <li>Version Control</li>
                                    <li>Programming Proficiency</li>
                                </ul>
                                <ul class="list-disc pl-4 space-y-0.5">
                                    <li>Full Stack Development</li>
                                    <li>UI Design & Integration</li>
                                    <li>Responsive Web Design</li>
                                    <li>Real-Time Communication</li>
                                    <li>Agile Methodology</li>
                                </ul>
                            </div>
                        </section>
            
                        <!-- Hobbies -->
                        <section>
                            <h2 class="text-base font-bold mb-1">Hobbies</h2>
                            <p class="text-gray-700 text-[10px]">Coding, Travelling, Bike Riding</p>
                        </section>
                    </div>
                </body>
            </html>
                `);

        const pdfBuffer = await page.pdf({ format: "A4" });
        await browser.close();

        return new NextResponse(pdfBuffer, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": 'attachment; filename="styled-pdf.pdf"',
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
