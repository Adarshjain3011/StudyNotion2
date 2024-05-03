


import { NextRequest, NextResponse } from "next/server";

import { z } from "zod";

import { ImageUploader } from "@/helper/imageUploader";

import Course from "@/models/courseModel";

import User from "@/models/userModel";

import Category from "@/models/categoryModel";


const courseSchema = z.object({

    courseName: z.string(),
    courseDescription: z.string(),
    Instructor: z.string(),
    WhatYouWillLearn: z.string(),
    price: z.string(),
    thumbnail: z.string(),
    categoryId: z.string(),

})




// create a new course 

export async function POST(req: NextRequest, res: NextResponse) {

    try {


        const body = await req.json();

        try {

            courseSchema.parse(body);

        } catch (error: any) {

            console.log(error.message);

            return NextResponse.json({

                message: "validation failed",
                error: error.message,
                data: null

            }, {

                status: 400,
            })

        }


        // fetch the data 

        const { courseName, courseDescription, Instructor, WhatYouWillLearn, price, thumbnail, categoryId } = body;


        // check instructor exists or not 

        // const instructorId = req.user.id;

        const instructorDetails = await User.findById(Instructor);

        if (!instructorDetails) {

            return NextResponse.json({

                message: " instructor details not found ",
                data: null

            })

        }

        // check the given category is exists or not 


        const isCategoryExists = await Category.findById(categoryId);

        if(!isCategoryExists){


            return NextResponse.json({

                message: "no category exists with this category id ",
                error: null,
                data: null

            }, {

                status: 400,

            })
        }


        // upload thumbnail image to the cloudinary 

        let response: any = await ImageUploader(thumbnail);
        
        // create a new course 
        
        const newCourse = await Course.create({
            
            courseName,
            courseDescription,
            Instructor,
            WhatYouWillLearn,
            price,
            thumbnail: response?.secure_url as string,
            category:isCategoryExists._id
            
        })


        // add this new course into the user course field 

        const updateUser = await User.findByIdAndUpdate(userId,{

            $push:{

                course:newCourse._id,
            }

        },{new:true});


        // push this new course into the category list 

        const updatedCategory = await Category.findByIdAndUpdate(isCategoryExists._id,{

            $push:{

                course:newCourse._id,
            }

        },{new:true})


        // successfully return the response 

        return NextResponse.json({

            message: "a new course created sucessfully ",
            error: null,
            data: newCourse

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





