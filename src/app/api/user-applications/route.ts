import ApiResponse from "@/lib/apiResponse";
import prisma from "@/lib/prismaClient";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest) {
    try {
        // const token = await getToken({ req });

        // if(!token){
        //     return NextResponse.json(
        //         new ApiResponse(false, "Unauthorized, please sign in"),
        //         { status: 401 }
        //     )
        // }

        // const userId = token.id;

        // const userId = ;

        const resumeAndCoverLtr = await prisma.resumesAndCoverLetters.findMany({
            where: {
                userId : "67bea8095adb02bf9df69bad"
            },
            select : {
                id : true,
                jobApplication : true
            }
        })

        if(!resumeAndCoverLtr) {
            return NextResponse.json(
                new ApiResponse(false, "Applications not found"),
                { status: 404 }
            )
        }

        const filteredData = resumeAndCoverLtr.map((data) => {
            return {
                rcid : data.id,
                ...data.jobApplication
            }
        })

        
        return NextResponse.json(
            new ApiResponse(true, "Applications found", filteredData),
            { status: 200 }
        )   
    } catch (error : any) {
        console.log(error.message);
        return NextResponse.json(
            new ApiResponse(false, "Something went wrong"),
            { status: 500 }
        )
    }
}