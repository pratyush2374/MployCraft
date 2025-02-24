import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const data = {
    fullName: "Pratyush Sharma",
    email: "kr.pratyushsharma2374@gmail.com",
    id: "67b93f4beb139444fde7720b",
    contactNumber: "9867327251",
    location: "Mumbai",
    professionalSummary: "Fullstack Developer",
    skills: [
        "Typescript",
        "Javascript",
        "Node.js",
        "Next.js",
        "React.js",
        "Next.js",
        "Docker",
        "Redis",
        "PostgreSQL",
        "MongoDB",
        "MySQL",
        "Git",
        "GitHub",
        "HTML",
        "CSS",
        "Express.js",
        "Tailwind CSS",
        "Redux",
    ],
    softSkills: ["Collaboration"],
    languages: ["English", "Hindi"],
    hobbies: ["Coding", "Bike riding", "Travelling"],
    userId: "67b93e7feb139444fde7720a",
    education: [
        {
            id: "67b93f5deb139444fde7720e",
            instituteName: "KC College",
            major: "Computer Science",
            startDate: null,
            endDate: null,
            score: null,
            scoreType: null,
            achievements: null,
            userInfoId: "67b93f4beb139444fde7720b",
        },
        {
            id: "67ba0957601fed3a1d55983a",
            instituteName: "jklads",
            major: null,
            startDate: "2222-02-13T00:00:00.000Z",
            endDate: null,
            score: null,
            scoreType: null,
            achievements: null,
            userInfoId: "67b93f4beb139444fde7720b",
        },
        {
            id: "67ba0a25601fed3a1d55983c",
            instituteName: "123123",
            major: null,
            startDate: "2222-03-12T00:00:00.000Z",
            endDate: "2025-01-29T00:00:00.000Z",
            score: null,
            scoreType: null,
            achievements: null,
            userInfoId: "67b93f4beb139444fde7720b",
        },
        {
            id: "67ba0aaf601fed3a1d55983e",
            instituteName: "123123123",
            major: null,
            startDate: "2025-02-14T00:00:00.000Z",
            endDate: null,
            score: null,
            scoreType: null,
            achievements: null,
            userInfoId: "67b93f4beb139444fde7720b",
        },
    ],
    workExperience: [
        {
            id: "67ba0957601fed3a1d55983b",
            company: "asdasd",
            jobTitle: null,
            startDate: null,
            endDate: "1221-02-18T00:00:00.000Z",
            isCurrent: false,
            location: null,
            achievementsAndResponsibilities: null,
            userInfoId: "67b93f4beb139444fde7720b",
        },
        {
            id: "67ba0a25601fed3a1d55983d",
            company: "asd",
            jobTitle: null,
            startDate: "2222-03-12T00:00:00.000Z",
            endDate: null,
            isCurrent: false,
            location: null,
            achievementsAndResponsibilities: null,
            userInfoId: "67b93f4beb139444fde7720b",
        },
        {
            id: "67ba0aaf601fed3a1d55983f",
            company: "weqqwe",
            jobTitle: null,
            startDate: "2025-02-08T00:00:00.000Z",
            endDate: null,
            isCurrent: false,
            location: null,
            achievementsAndResponsibilities: null,
            userInfoId: "67b93f4beb139444fde7720b",
        },
    ],
    projects: [
        {
            id: "67b94760eb139444fde7720f",
            title: "PTAI",
            skillsUsed: [],
            description: "lasjdlkasjd",
            url: [],
            userInfoId: "67b93f4beb139444fde7720b",
        },
        {
            id: "67b94bfdeb139444fde77210",
            title: "PTAI",
            skillsUsed: [],
            description: null,
            url: [],
            userInfoId: "67b93f4beb139444fde7720b",
        },
        {
            id: "67b94c2eeb139444fde77211",
            title: "PTAI",
            skillsUsed: [],
            description: null,
            url: [],
            userInfoId: "67b93f4beb139444fde7720b",
        },
        {
            id: "67b94e70eb139444fde77212",
            title: "PTAI",
            skillsUsed: [],
            description: null,
            url: [],
            userInfoId: "67b93f4beb139444fde7720b",
        },
        {
            id: "67b95c2eeb139444fde77213",
            title: "PTAI",
            skillsUsed: [],
            description: null,
            url: [],
            userInfoId: "67b93f4beb139444fde7720b",
        },
        {
            id: "67ba1bbe601fed3a1d559840",
            title: "12aeweqwe",
            skillsUsed: [],
            description: null,
            url: [],
            userInfoId: "67b93f4beb139444fde7720b",
        },
        {
            id: "67ba1db0601fed3a1d559842",
            title: "123123123",
            skillsUsed: [],
            description: null,
            url: [],
            userInfoId: "67b93f4beb139444fde7720b",
        },
    ],
    certifications: [
        {
            id: "67ba1bbe601fed3a1d559841",
            name: "1231adsdq",
            issuedBy: null,
            certificateIdOrURL: null,
            additionalInformation: null,
            userInfoId: "67b93f4beb139444fde7720b",
        },
        {
            id: "67ba1db0601fed3a1d559843",
            name: "asdqwdasdasdasd",
            issuedBy: null,
            certificateIdOrURL: null,
            additionalInformation: null,
            userInfoId: "67b93f4beb139444fde7720b",
        },
    ],
    links: [
        {
            id: "67b93f4beb139444fde7720c",
            type: "LinkedIn",
            url: "https://www.linkedin.com/",
            userInfoId: "67b93f4beb139444fde7720b",
        },
        {
            id: "67b93f4ceb139444fde7720d",
            type: "GitHub",
            url: "https://github.com/pratyush2374",
            userInfoId: "67b93f4beb139444fde7720b",
        },
    ],
};

interface AiResponse {
    professionalSummary: string;
    experience: string[];
    companyName: string;
    position: string;
}

const generateResume = async (filteredData: any): Promise<any> => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const schema = {
        type: SchemaType.OBJECT,
        properties: {
            professionalSummary: {
                type: SchemaType.STRING,
                description: "asdasdasdasdadasdas adssd",
            },
        },
    };

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: schema,
        },
    });
};

export default generateResume;
