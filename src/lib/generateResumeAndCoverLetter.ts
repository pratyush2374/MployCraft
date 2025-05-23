import {
    GoogleGenerativeAI,
    SchemaType,
    ObjectSchema,
} from "@google/generative-ai";

interface AiResponse {
    professionalSummaryRC: string;
    experience: string[];
    salary?: string;
    coverLetter: string;
}

const generateResumeAndCoverLetter = async (
    userData: any,
    companyName: string,
    position: string,
    jobDescription: string
): Promise<AiResponse> => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    const schema: ObjectSchema = {
        type: SchemaType.OBJECT,
        description: "Resume and cover letter",
        properties: {
            professionalSummaryRC: {
                type: SchemaType.STRING,
                description:
                    "A concise professional summary of approximately 100 words highlighting key skills and experiences",
            },
            experience: {
                type: SchemaType.ARRAY,
                items: {
                    type: SchemaType.STRING,
                    description:
                        "Brief descriptions of projects, work experience, and certifications, each around 30 words",
                },
                description:
                    "Array of experience items, up to 6 entries of approximately 30 words each",
            },
            salary: {
                type: SchemaType.STRING,
                description:
                    "Add the salary if it is mentioned in the job description",
            },
            coverLetter: {
                type: SchemaType.STRING,
                description:
                    "Write a 120 word cover letter in first person based on the job description start directly without greeting just the cover letter no Dear sir/madam, hiring team and all",
            },
        },
        required: ["professionalSummaryRC", "experience", "coverLetter"],
    };

    // Configure the model
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: schema,
        },
    });

    // Extract relevant information from userData for the prompt
    const projectsInfo =
        userData.projects
            ?.map((project: any) => {
                return `Project: ${project.title}
        Skills: ${project.skillsUsed?.join(", ") || ""}
        Description: ${project.description || ""}
        URL: ${project.url?.join(", ") || ""}`;
            })
            .join("\n\n") || "No projects available";

    const workExperienceInfo =
        userData.workExperience
            ?.map((work: any) => {
                return `Company: ${work.company}
        Job Title: ${work.jobTitle}
        Duration: ${new Date(work.startDate).toLocaleDateString()} to ${
                    work.isCurrent
                        ? "Present"
                        : new Date(work.endDate).toLocaleDateString()
                }
        Location: ${work.location}
        Achievements: ${work.achievementsAndResponsibilities || ""}`;
            })
            .join("\n\n") || "No work experience available";

    const certificationsInfo =
        userData.certifications
            ?.map((cert: any) => {
                return `Name: ${cert.name}
        Issued By: ${cert.issuedBy}
        ID/URL: ${cert.certificateIdOrURL || ""}
        Additional Info: ${cert.additionalInformation || ""}`;
            })
            .join("\n\n") || "No certifications available";

    const educationInfo =
        userData.education
            ?.map((edu: any) => {
                return `Institute: ${edu.instituteName}
        Major: ${edu.major}
        Duration: ${new Date(edu.startDate).toLocaleDateString()} to ${
                    edu.endDate
                        ? new Date(edu.endDate).toLocaleDateString()
                        : "Present"
                }
        Score: ${edu.score} (${edu.scoreType})`;
            })
            .join("\n\n") || "No education information available";

    // Create the prompt
    const prompt = `Create a professional resume content based on the job description 
    
    Job description : 
    ${jobDescription}

    for the company: ${companyName} and for position ${position} and a cover letter in first person with the same

    tune the professional summary and experience according to the job summary
    if the skills do not match with the job description do not lie about it write only the skills that are common between the job description and the user's data
    
    for ${userData.fullName} based on the following information:

    Full Name: ${userData.fullName}
    Email: ${userData.email}
    Contact Number: ${userData.contactNumber}
    Location: ${userData.location}
    
    Skills: ${userData.skills?.join(", ") || ""}
    Soft Skills: ${userData.softSkills?.join(", ") || ""}
    Languages: ${userData.languages?.join(", ") || ""}
    
    Education:
    ${educationInfo}
    
    Work Experience:
    ${workExperienceInfo}
    
    Projects:
    ${projectsInfo}
    
    Certifications:
    ${certificationsInfo}
    
    Please provide:
    1. A professional summary of exactly 100 words highlighting key skills, experiences, and qualifications according to the job description company name and job position
    2. Up to 6 concise experience descriptions of approximately 30 words each, combining projects, work experience, and certifications in order of relevance. Each description should highlight achievements and responsibilities.
    3. Make sure your grammar is correct and please don't lie if the skills don't match with the job description
    4. Also in the cover letter say that how my goals are aligned with the job description and the company
    
    Ensure the content is professional, concise, and highlights the strongest qualifications for a career in technology.`;

    // Generate the resume content
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const resumeData: AiResponse = JSON.parse(responseText);

    return resumeData;
};

export default generateResumeAndCoverLetter;
