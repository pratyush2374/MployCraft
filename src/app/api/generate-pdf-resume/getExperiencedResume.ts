const getExperiencedResume = (data: any): string => {
    // Format date function to handle date strings properly
    const formatDate = (dateString: string | null): string => {
        if (!dateString) return "Present";
        const date = new Date(dateString);
        return date.getFullYear().toString();
    };

    return `<!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <script src="https://cdn.tailwindcss.com"></script>
            <title>${data.fullName || "Resume"} - Resume</title>
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
                            <h1 class="text-3xl font-bold mb-1">${
                                data.fullName || ""
                            }</h1>
                            <div class="text-gray-600">
                                <a href="mailto:${
                                    data.email || ""
                                }" class="hover:text-blue-600">${
        data.email || ""
    }</a>
                                <span class="mx-2">|</span>
                                <span>${data.contactNumber || ""}</span>
                            </div>
                        </div>
                        <div class="text-right">
                            <div>
                                ${
                                    data.links && data.links.length > 0
                                        ? data.links
                                              .filter(
                                                  (link: any) => link !== null
                                              )
                                              .map(
                                                  (link: any) =>
                                                      `<a href="${link.url}" class="text-blue-600 hover:underline">${link.type}</a>`
                                              )
                                              .join("  |  ")
                                        : ""
                                }
                            </div>
                            <p class="text-gray-600">${data.location || ""}</p>
                        </div>
                    </div>
                </header>

                <!-- Professional Summary -->
                <section class="mb-3">
                    <h2 class="text-[15px] font-bold mb-1">Professional Summary</h2>
                    <p class="text-gray-700 leading-tight text-[11px]">
                        ${
                            data.professionalSummaryRC ||
                            data.professionalSummary ||
                            ""
                        }
                    </p>
                </section>

                <!-- Work Experience -->
                <section class="mb-3">
                    <h2 class="text-[15px] font-bold mb-1">Work Experience</h2>
                    ${
                        data.workExp && data.workExp.length > 0
                            ? data.workExp
                                  .map(
                                      (exp: any) =>
                                          `<div class="mb-2 w-[95%] m-auto">
                                <div class="flex justify-between">
                                    <div class="flex gap-1">
                                        <h3 class="font-semibold">${
                                            exp.company || ""
                                        }</h3>
                                        <p>${exp.jobTitle || ""} ${
                                              exp.location
                                                  ? `(${exp.location})`
                                                  : ""
                                          }</p>
                                    </div>
                                    <p class="text-gray-600">${formatDate(
                                        exp.startDate
                                    )} - ${
                                              exp.isCurrent
                                                  ? "Present"
                                                  : formatDate(exp.endDate)
                                          }</p>
                                </div>
                                <div class="text-gray-700 leading-tight">
                                    ${exp.achievementsAndResponsibilities || ""}
                                </div>
                            </div>`
                                  )
                                  .join("")
                            : "<p>No work experience listed</p>"
                    }
                </section>
                

                <!-- Skills -->
                <section class="mb-3">
                    <h2 class="text-[15px] font-bold mb-1">Skills</h2>
                    <div class="flex flex-wrap gap-1">
                        ${
                            data.skills && data.skills.length > 0
                                ? data.skills
                                      .map(
                                          (skill: string) =>
                                              `<span class="px-2 py-0.5 bg-gray-200 rounded-full text-[11px]">• ${skill}</span>`
                                      )
                                      .join("")
                                : "<p>No skills listed</p>"
                        }
                    </div>
                </section>

                <!-- Experience Points -->
                <section class="mb-3">
                    <h2 class="text-[15px] font-bold mb-1">Experience</h2>
                    <ul class="list-disc pl-4 space-y-[2px] text-gray-700 text-[11px]">
                        ${
                            data.experience && data.experience.length > 0
                                ? data.experience
                                      .map((exp: string) => `<li>${exp}</li>`)
                                      .join("")
                                : "<li>No experience points listed</li>"
                        }
                    </ul>
                </section>

                <!-- Projects -->
                <section class="mb-3">
                    <h2 class="text-[15px] font-bold mb-1">Projects</h2>
                    <div class="grid grid-cols-1 gap-2">
                        <ul class="list-disc pl-4 text-gray-700 space-y-1 text-[11px]">
                            ${
                                data.projects && data.projects.length > 0
                                    ? data.projects
                                          .map(
                                              (project: any) =>
                                                  `<li>
                                        <span class="font-semibold">${
                                            project.title || ""
                                        }:</span> 
                                        ${project.description || ""}
                                    </li>`
                                          )
                                          .join("")
                                    : "<li>No projects listed</li>"
                            }
                        </ul>
                    </div>
                </section>                

                <!-- Education -->
                <section class="mb-3">
                    <h2 class="text-[15px] font-bold mb-1">Education</h2>
                    <div class="space-y-1 w-[95%] m-auto">
                    ${
                        data.education && data.education.length > 0
                            ? data.education
                                  .map(
                                      (edu: any) =>
                                          `<div class="flex justify-between">
                                <div>
                                    <h3 class="font-semibold">${
                                        edu.instituteName || ""
                                    }</h3>
                                    <p>${edu.major || ""} (${formatDate(
                                              edu.startDate
                                          )}-${formatDate(edu.endDate)})</p>
                                </div>
                                <p class="text-gray-600">${
                                    edu.scoreType || ""
                                } - ${edu.score || ""}</p>
                            </div>`
                                  )
                                  .join("")
                            : "<p>No education information available</p>"
                    }
                    </div>
                </section>

                <!-- Certifications -->
                ${
                    data.certifications && data.certifications.length > 0
                        ? `<section class="mb-3">
                        <h2 class="text-[15px] font-bold mb-1">Certifications</h2>
                        <ul class="list-disc pl-4 space-y-1 text-gray-700 text-[11px]">
                            ${data.certifications
                                .map(
                                    (cert: any) =>
                                        `<li>
                                    <span class="font-semibold">${
                                        cert.name || ""
                                    }</span> - 
                                    Issued by ${cert.issuedBy || ""}
                                    ${
                                        cert.additionalInformation
                                            ? ` (${cert.additionalInformation})`
                                            : ""
                                    }
                                </li>`
                                )
                                .join("")}
                        </ul>
                    </section>`
                        : ""
                }

                <!-- Hobbies -->
                ${
                    data.hobbies && data.hobbies.length > 0
                        ? `<section>
                        <h2 class="text-[15px] font-bold mb-1">Hobbies</h2>
                        <p class="text-gray-700">${data.hobbies.join(", ")}</p>
                    </section>`
                        : ""
                }
            </div>
        </body>
    </html>`;
};

export default getExperiencedResume;
