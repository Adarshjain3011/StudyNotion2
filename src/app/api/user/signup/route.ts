
import { NextRequest, NextResponse } from "next/server";

import {dbConnection} from "@/config/dbConfig";

import { isEMailExists } from "@/helper/isEmailExists";

import {sendVerificationEmail} from "@/helper/resendMail";

import bcrypt from "bcrypt"

import User from "@/models/userModel";

import { z } from "zod";


const signUpSchema = z.object({

    userName: z.string(),
    email: z.string(),
    password: z.string(),
    AccountType:z.string(),

})


export async function POST(req: NextRequest, res: NextResponse) {
    
    try {

        await dbConnection();

        const body = await req.json();

        try {

            signUpSchema.parse(body);


        } catch (error: any) {

            console.log(error.message);

            return NextResponse.json({


                success: false,
                message: "fileds are not correct "

            },
                { status: 400 }
            )


        }


        const {userName,email,password,AccountType} = body ;

        // check email is already exists 

        const emailExists = await isEMailExists(email);

        if(emailExists){

            return NextResponse.json({

                success: false,
                message: "email already exists"

            },
                { status: 400 }
            )

        }

        // hash the pasword 

        const hashedPassword = await bcrypt.hash(password,10);

        // create the new user 

        const newUser = await User.create({

            userName,
            email,
            password:hashedPassword,
            AccountType:AccountType,

        })

        // send verification  email to the user 

        await sendVerificationEmail(email,userName,"1234");


        return NextResponse.json({

            success:true,
            message:"user signup successfull",
            data:newUser

        },{

            status:200
        })


    } catch (error: any) {


        console.log(error.message);

        return NextResponse.json({

            success:false,
            message:"error occur during signup "

        },{

            status:500
        })


    }


}






