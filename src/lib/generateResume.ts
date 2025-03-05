import {
    GoogleGenerativeAI,
    SchemaType,
    ObjectSchema,
} from "@google/generative-ai";

interface AiResponse {
    professionalSummary: string;
    experience: string[];
}

const generateResume = async (userData: any): Promise<AiResponse> => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    // Define the schema for the response
    const schema: ObjectSchema = {
        type: SchemaType.OBJECT,
        description: "Resume",
        properties: {
            professionalSummary: {
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
        },
        required: ["professionalSummary", "experience"],
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
    const prompt = `Create a professional resume content for ${
        userData.fullName
    } based on the following information:

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
    1. A professional summary of exactly 100 words highlighting key skills, experiences, and qualifications.
    2. Up to 6 concise experience descriptions of approximately 30 words each, combining projects, work experience, and certifications in order of relevance. Each description should highlight achievements and responsibilities.
    
    Ensure the content is professional, concise, and highlights the strongest qualifications for a career in technology.`;

    // Generate the resume content
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const resumeData: AiResponse = JSON.parse(responseText);

    return resumeData;
};

export default generateResume;
