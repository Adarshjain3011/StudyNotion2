

import SubSection, { ISubSection } from "@/models/subSection";

import Section from "@/models/sectionModel";

import { NextRequest, NextResponse } from "next/server";

import Course from "@/models/courseModel";

import { z } from "zod";

const sectionChecker = z.object({

    sectionName: z.string(),
    courseId: z.string(),

})

// create and delete it will handle 

export async function POST(req: NextRequest, res: NextResponse) {


    try {

        const body = await req.json();


        try {

            sectionChecker.parse(body);

        } catch (error: any) {

            return NextResponse.json({

                message: "all fields are not fullfilled ",
                error: null,
                data: null
            }, {

                status: 400,
            })
        }


        // fetch the data 

        const { sectionName, courseId } = body;



        // create the Section 

        const newSection = await Section.create({

            sectionName,
    
        })


        // now push this subsection into the Course id which you have given 

        const findCourse = await Course.findByIdAndUpdate(
            
            courseId,

            {

                $push:{

                    CourseContent:newSection._id,

                }
            },
            {new:true}
            
        ).populate({

            path: "CourseContent",

            populate: {

                path: "SubSection",
                
            },
        })



        if (!findCourse) {

            return NextResponse.json({

                message: "no course exists with this course  id ",
                error: null,
                data: null

            }, {

                status: 400
            })
        }


        // successfully return the response 


        return NextResponse.json({

            message: "successfully create the section and add it to the given course",
            error: null,
            data: findCourse

        }, {

            status: 200,
        })



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

}










// get all sub section using Section name 


export async function GET(req: NextRequest, res: NextResponse) {

    try {

        const body = await req.json();

        // fetch the data 

        const { sectionName } = body;

        const sectionData = await Section.find({


            sectionName: sectionName,

        }).populate("subSectionName")


        if (!sectionData) {

            return NextResponse.json({

                message: "no sub section data is found with name '" + sectionName +,
                error: null,
                data: null

            }, {

                status: 400,
            })

        }


        return NextResponse.json({

            message: "sucessfully get all the subsection",
            error: null,
            data: sectionData

        }, {

            status: 200,
        })



    } catch (error: any) {

        console.log(error.message);

        return NextResponse.json({

            message: "some error occurred while getting section",
            error: error.message,
            data: null

        }, {

            status: 400,
        })


    }
}










// update the section  


export async function PUT(req: NextRequest, res: NextResponse){

    try{

        const body = await req.json();
    
        const {sectionName,sectionId}= body;

    
        if(!sectionName || !sectionId){


        }
    
        // find the section and update the section 
    
        const sectionExists = await Section.findByIdAndUpdate(sectionId,{
    
            sectionName:sectionName,
    
        },{new:true});


    
        // successfully return the response 
    
    
        return NextResponse.json({

            message: "sucessfully update the section name ",
            error: null,
            data: sectionExists

        }, {

            status: 200,
        })


    
    }
    catch(error:any){
    
    
        console.log(error.message);

        return NextResponse.json({

            message: "some error occurred while upadte a  section", 
            error: error.message,
            data: null

        }, {

            status: 400,
        })
    
    }

}





