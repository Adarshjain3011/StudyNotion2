
import { NextRequest, NextResponse } from "next/server";

import { z } from "zod";

const ratingAndReviewsChecker = z.object({

    
})

export async function POST (req: NextRequest, res: NextResponse){


    try{




    }catch(error:any){


        console.log(error.message);

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