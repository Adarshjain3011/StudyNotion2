
import { NextRequest, NextResponse } from "next/server";

import User from "@/models/userModel";

export async function PUT(req: NextRequest, res: NextResponse) {

    try {

        // find user Id from middlware 

        let userId;
        
        const body = await req.json();

        const {

            gender="",
            dob ="",
            about ="",
            contactNumber="" 

        } = body;

        let findUser = await User.findById(userId);

        const profileInfo = await User.findById(findUser.Profile)


        if(gender !== ""){

            profileInfo.gender = gender;

        }

        if(dob !==""){

            profileInfo.dob = dob;

        }

        if(about !==""){

            profileInfo.about = about;


        }

        if(contactNumber !==""){

            profileInfo.contactNumber = contactNumber;

        }

        await profileInfo.save();


        return NextResponse.json({

            message: "sucessfully updated the user profile",
            data: profileInfo,
            error: null,    
            
        },{

            status:200,

        })


    } catch (error: any) {

        console.log(error.message);

        return NextResponse.json({

            message:"some error occur while update the profile of user ",
            data:null,
            error:error.message,

        },{

            status:400
        })

    }
}





