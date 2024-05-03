import { NextRequest, NextResponse } from "next/server";

import { ImageUploader } from "@/helper/imageUploader";

import Section from "@/models/sectionModel";

import {z} from "zod";
import SubSection from "@/models/subSection";

const subSectionChecker = z.object({

    Title:z.string(),
    description:z.string(),
    sectionId:z.string(),
})


// create a new SUbSection 


export async function POST(req: NextRequest,res:NextResponse){

    try{


        const body = await req.json();

        try{

            subSectionChecker.parse(body);

        }catch(error:any){

            console.log(error.message);

            return NextResponse.json({

                message: "some error occurred while creating a new section",
                error: error.message,
                data: null

            }, {

                status: 400,
            })

        }


        // fetch the data from the body 


        const {Title,description,sectionId,videoUrl} = body;


        // check the section with the corresponding id exists or not 

        const isSectionExists = await Section.findById(sectionId);

        if(!isSectionExists){

            return NextResponse.json({

                message: "no section exists with this section id ",
                error: null,
                data: null

            }, {

                status: 400
            })
        }


        // upload video to the cloudinary 

        let timeDuration:string;

        let VideoUrl:string;


        // upload video to the cloudinary 

        const response = await ImageUploader(videoUrl);

        console.log(response);

        timeDuration = response?.duartion || "";

        VideoUrl = response?.secure_url || "";
        

        // create a new sub section


        const newSubSection = await SubSection.create({

            Title,description,sectionId,VideoUrl,timeDuration

        })

        // successfully return the response 



        return NextResponse.json({

            message: "sub-section created successfully",
            error: null,
            data: newSubSection

        }, {

            status: 201,
        })



    }catch(error:any){

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





