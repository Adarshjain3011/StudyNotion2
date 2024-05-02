
import { NextRequest, NextResponse } from "next/server";

import { dbConnection } from "@/config/dbConfig";

import { z } from "zod";

const tagSchema = z.object({

    name:z.string(),
    courseId:z.string(),

})




// create and delete tag 

export async function POST(req: NextRequest, res: NextResponse){


    try{


        const body = await req.json();

        try {

            tagSchema.parse(body);


        } catch (error: any) {

            return NextResponse.json({

                message: "validation error ",
                error: error.message,
                data: null

            }, {

                status: 400,
            })

        }


        // fetch tht data 


        const {courseId,name} = body;





    }catch(error:any){

        console.log(error.message);


    }
}




