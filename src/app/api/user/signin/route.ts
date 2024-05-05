
"use server"


import { NextRequest,NextResponse } from "next/server";

import { isEMailExists } from "@/helper/isEmailExists";

import User from "@/models/userModel";

import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";

import {z} from "zod";

const loginSchema = z.object({

    email:z.string(),
    password:z.string(),

})

export async function POST(req:NextRequest, res:NextResponse){

    try{

        const body = await req.json();

        try{

            loginSchema.parse(body);
            

        }catch(error:any){


            console.log(error.message);

            return NextResponse.json({

                message:"fileds are not valid ",
                success:false,

            },{

                status:400,

            });
        }


        // IS EMAIL EXISTS or not 

        const {email,password} = body ;

        // check email is already exists

        const isUserExists = await isEMailExists(email); 

        if(!isUserExists){

            return NextResponse.json({

                message:" this email is not exists ",
                success:false,

            },{

                status:400,

            });

        }


        if(isUserExists && isUserExists?.isVerified === false){

            return NextResponse.json({

                message:" this email is not verified ",
                success:false,

            },{

                status:400,

            });


        }


        // check password is correct or not

        const isPasswordCorrect = await bcrypt.hash(password,isUserExists?.password);

        if(!isPasswordCorrect){

            return NextResponse.json({

                message:" password is incorrect",

                success:false,

            },{

                status:400,

            });

        }


        // create the token 


        const tokenValue = {

            email:isUserExists?.email,
            id:isUserExists?.id,
        }


        const token = jwt.sign(tokenValue,process.env.JWT_SECRET_KEY as string,{

            expiresIn:"4d",

        })



    const response = NextResponse.json({

        message: "User loggedin successfully",
        status: 200,
        data: isUserExists,
        error: null,

    });

    response.cookies.set(
        "token",
        token,
        {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        }
    );

    return response;

    }catch(error:any){

        console.log(error.message);

        return NextResponse.json({

            message: "some error occur while login ",
            data: "null",
            error: error.message,
            success: false,

        }, { status: 400 }

        )


    }
}



