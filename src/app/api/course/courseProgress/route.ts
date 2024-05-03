
import { NextRequest, NextResponse } from "next/server";

import { dbConnection } from "@/config/dbConfig";

import Course from "@/models/courseModel";
import SubSection from "@/models/subSection";
import CourseProgress from "@/models/courseProgress";

dbConnection();


// update the course progress 

export async function PUT(req: NextRequest, res: NextResponse) {

    try {


        const body = await req.json();

        const { courseId, subSectionId } = body;


        let userId // you get it when yout implement middleware


        // check course is exists or not with the corresponding course id 

        const isCourseExists = await Course.findById(courseId);

        if (!isCourseExists) {

            return NextResponse.json({

                message: "No course is  found with the corresponding course ID ",
                data: null,
                error: null,

            }, {

                status: 400,
            })
        }


        // check subSection is exists or not with the corresponding subSection id

        const isSubSectionExists = await SubSection.findById(subSectionId);

        if (!isSubSectionExists) {

            return NextResponse.json({

                message: "No Sub section  is found with the corresponding sub section  ID ",
                data: null,
                error: null,

            }, {

                status: 400,
            })

        }


        // check course progress exists or not 

        const isCourseProgressExists:any = await CourseProgress.find({

            course:isCourseExists._id,
            user:userId,

        })

        if(!isCourseProgressExists){

            return NextResponse.json({

                message: "No Course Progress Exists  is found with the corresponding user id and course id  ",
                data: null,
                error: null,

            }, {

                status: 400,
            })

        }

        // check if the subsection id is alreay exists in the course Progress completed Videos fields 


        const isSubSectionExistsInCourseProgress = await CourseProgress.findOne(isCourseProgressExists._id,{


            completedVideos:{$elemMatch:{$eq:isSubSectionExists._id}}

        })



        if(isSubSectionExistsInCourseProgress){

            return NextResponse.json({

                message: "sub section is already in course progress completed video list",
                data: null,
                error: null,

            }, {

                status: 400,
            })

        }


        // push the sub section into  the course Progress completed Videos fields 

        isCourseProgressExists.completedVideos.push(isSubSectionExists._id);

        await isCourseProgressExists.save();

        return NextResponse.json({

            message: " sucessfully push sub section into the course progress completed videos list",
            data: isCourseProgressExists,
            error: null,

        }, {

            status: 200,

        })



    } catch (error: any) {

        console.log(error.message);


        return NextResponse.json({

            message: "some error occurred while updating course Progress ",
            error: error.message,
            data: null

        }, {

            status: 400,
        })

    }
}









