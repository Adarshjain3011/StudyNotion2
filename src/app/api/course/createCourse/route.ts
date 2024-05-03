


import { NextRequest, NextResponse } from "next/server";

import {z} from "zod";

// courseName:string,
// courseDescription:string,
// Instructor:Schema.Types.ObjectId | IUser,
// WhatYouWillLearn:string,
// courseContent:Schema.Types.ObjectId | ISection,
// RatingAndReviews:Schema.Types.ObjectId | IRatingAndReview, 
// price:string,
// thumbnail:string,
// Tags:Schema.Types.ObjectId | ITag,

// StudentEnrolled:Schema.Types.ObjectId | IUser


const courseSchema = z.object({

    courseName:z.string(),
    courseDescription:z.string(),
    Instructor:z.string(),
    WhatYouWillLearn:z.string(),
    courseContent:z.string(),
    RatingAndReviews:z.string(), 
    price:z.string(),
    thumbnail:z.string(),
    Tags:z.string(),
})



export async function POST(req: NextRequest,res:NextResponse) {

    try {



        const body = await req.json();

        try {

            courseSchema.parse(body);

        } catch (error: any) {

            console.log(error.message);

            return NextResponse.json({

                message: "some error occurred while creating a new section",
                error: error.message,
                data: null

            }, {

                status: 400,
            })

        }



        // successfully return the response 

        return NextResponse.json({

            message: "sub-section created successfully",
            error: null,
            data: newSubSection

        }, {

            status: 201,
        })

    } catch (error: any) {

        console.log(error.message);

        return NextResponse.json({

            message: "some error occurred while creating a course ",
            error: error.message,
            data: null

        }, {

            status: 400,
        })

    }
}