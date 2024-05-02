

import SubSection, { ISubSection } from "@/models/subSection";

import Section from "@/models/sectionModel";

import { NextRequest, NextResponse } from "next/server";

import { z } from "zod";

const ratingAndReviewsSchema = z.object({

    


});

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

        const { sectionName, SubSectionId } = body;


        // check if the Subsection is exists or not 

        const isSubSectionExists = await SubSection.findById(SubSectionId);


        if (!isSubSectionExists) {

            return NextResponse.json({

                message: "no subsection exists with this sub-section id ",
                error: null,
                data: null

            }, {

                status: 400
            })
        }


        // check is SubSection already exists in the Section array fields 


        const isSubSectionAlreadyExists = await Section.findOne({

            sectionName,
            subSectionName: { $in: [SubSectionId] }

        })


        if (isSubSectionAlreadyExists) {

            // pull it from the subsectionName Array

            isSubSectionAlreadyExists.pull(SubSectionId);


        }


        // otherwise push a new SubSectionId in to the  subsection name of the section


        isSubSectionAlreadyExists.push(isSubSectionExists._id);


        await isSubSectionAlreadyExists.save();



        return NextResponse.json({

            message: "some error occurred while creating a new section",
            error: null,
            data: isSubSectionAlreadyExists

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

        const subSectionData = await Section.find({


            sectionName: sectionName,

        }).populate("subSectionName")


        if (!subSectionData) {

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
            data: null

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





