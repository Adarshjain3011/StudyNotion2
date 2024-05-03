
import { NextRequest, NextResponse } from "next/server";

import { dbConnection } from "@/config/dbConfig";

import Course from "@/models/courseModel";

import Category from "@/models/categoryModel"

import { z } from "zod";



const categorySchema = z.object({

    name: z.string(),
    courseId: z.string(),

})




export async function POST(req: NextRequest, res: NextResponse) {


    try {


        const body = await req.json();

        try {

            categorySchema.parse(body);


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


        const { name } = body;


        const newCategory = await Category.create({ name, });


        return NextResponse.json({

            message: "a new category is successfully created ",
            error: null,
            data: newCategory

        }, {

            status: 200,

        })

    } catch (error: any) {


        console.log(error.message);

        return NextResponse.json({

            message: "some error occurred while creating a new Category ",
            error: error.message,
            data: null

        }, {

            status: 400,
        })

    }
}





// get all Course By Tag 



export async function GET(req: NextRequest, res: NextResponse) {


    try {

        const body = await req.json();

        // ftech the data

        const { categoryName } = body;


        const findCourseByTagName = await Category.find({

            name: categoryName,

        })


        return NextResponse.json({

            message: "successfully found all the tag ",
            error: null,
            data: findCourseByTagName

        }, {

            status: 200,
        })


    } catch (error: any) {


        console.log(error.message);

        return NextResponse.json({

            message: "some error occurred while getting all tag ",
            error: error.message,
            data: null

        }, {

            status: 400,
        })
    }

}


