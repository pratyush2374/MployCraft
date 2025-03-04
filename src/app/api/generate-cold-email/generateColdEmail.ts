import {
    GoogleGenerativeAI,
    ObjectSchema,
    SchemaType,
} from "@google/generative-ai";

const generateColdEmail = async (
    companyName: string,
    jobPosition: string,
    jobDescription: string,
    aboutUs: string,
    additionalInformation: string,
    salutation: string = "Dear Hiring Manager,",
    userData: any
) => {
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

    const skills = userData.skills.join(", ") || "No skills available";

    const schema: ObjectSchema = {
        type: SchemaType.OBJECT,
        description: "Cold emailing",
        properties: {
            subject: {
                type: SchemaType.STRING,
                description: "Subject for the cold email",
            },
            body: {
                type: SchemaType.STRING,
                description: "Body for the cold email",
            },
        },
        required: ["subject", "body"],
    };

    const prompt = `Write a professional 100 words cold email to the hiring manager at ${companyName} for the ${jobPosition} position. The job description is as follows:

    Job Description: ${jobDescription}
    
    About the company: ${aboutUs}
    
    Additional Information: ${additionalInformation}

    The email should include the following:
    - An introduction of the candidate 

    Candidate details 
    - Name: ${userData.fullName}
    - Work experience: ${workExperienceInfo}
    - Skills: ${skills}
    - Projects: ${projectsInfo}
    - Certifications: ${certificationsInfo}
    - Education: ${educationInfo}

    - Why you're interested in the ${jobPosition} role at ${companyName}
    - A mention of how your skills and experience make you a great fit for the position do not specify the date and links and all just mention them 
    - A polite closing with a call to action (e.g., request a meeting or further discussion)
    - A professional closing salutation.
    - It should not be more than 100 words 
    - In the end say that i have attached my resume

    Make sure the tone is professional, respectful, and enthusiastic.
    
    Use the following salutation: ${salutation}
    End with regards and user name  ${userData.fullName}
    `;

    // Call generative AI model to generate the content for the email
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    // Configure the model for generating the email
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: schema,
        },
    });

    // Generate the email content based on the prompt
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Return the generated email
    return JSON.parse(responseText);
};

export default generateColdEmail;
