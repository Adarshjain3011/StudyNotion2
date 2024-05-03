
import { NextRequest, NextResponse } from "next/server";

import { dbConnection } from "@/config/dbConfig";

import Course from "@/models/courseModel";

import Tag from "@/models/Tag";

import { z } from "zod";

const tagSchema = z.object({

    name: z.string(),
    courseId: z.string(),

})




// create and delete tag 

export async function POST(req: NextRequest, res: NextResponse) {


    try {


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


        const { courseId, name } = body;

        // check if the course id is exists or not 


        const isCourseExists = await Course.findById(courseId);

        if (!courseId) {

            return NextResponse.json({

                message: "this course id is not exists ",
                error: null,
                data: null

            }, {

                status: 400,
            })
        }


        // check if the course  is already  exists is tag 

        const isCourseExistsInTag = await Tag.findOne({
            name,
            course: {
                $elemMatch: {
                    _id: { $eq: courseId }
                }
            }
        });



        // is course exists 

        if (isCourseExists) {

            const updatedCourse = await Tag.findOneAndUpdate(
                { name },
                { $pull: { course: { _id: courseId } } },
                { new: true }
            );

            return NextResponse.json({


                message: "Course already exists the reomve ut from the tag ",
                error: null,
                data: updatedCourse

            }, {

                status: 200,

            })

        } else {


            const updatedCourse = await Tag.findOneAndUpdate(
                { name },
                { $push: { course: { _id: courseId } } },
                { new: true }
            );

            return NextResponse.json({


                message: "course is updated successfully in the tag ",
                error: null,
                data: updatedCourse

            }, {

                status: 200,

            })
        }


    } catch (error: any) {


        console.log(error.message);

        return NextResponse.json({

            message: "some error occurred while creating a new tag ",
            error: error.message,
            data: null

        }, {

            status: 400,
        })


    }
}



// get all Course By Tag 




export async function GET(req: NextRequest, res: NextResponse){


    try{

        const body = await req.json();

        // ftech the data

        const {tagName} = body ;


        const findCourseByTagName = await Tag.find({

            name:tagName,

        })


        return NextResponse.json({

            message: "successfully found all the tag ",
            error: null,
            data: findCourseByTagName

        }, {

            status: 200,
        })
        

    }catch(error:any){


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


