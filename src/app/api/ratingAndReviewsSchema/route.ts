
import RatingAndReview from "@/models/ratingAndReviewsModel";
import { NextRequest, NextResponse } from "next/server";

import { dbConnection } from "@/config/dbConfig";

import { z } from "zod";

const ratingAndReviewsChecker = z.object({

    user: z.string(),
    rating: z.Number(),
    review: z.string()

})



dbConnection();

export async function POST(req: NextRequest, res: NextResponse) {


    try {


        const body = await req.json();


        try {

            ratingAndReviewsChecker.parse(body);


        } catch (error: any) {

            return NextResponse.json({

                message: "validation error ",
                error: error.message,
                data: null

            }, {

                status: 400,
            })

        }

        // ftech the data 

        const { user, rating, review } = body;

        // check the user is already give the rating 


        const isUserALeradyRating = await RatingAndReview.findOne({

            user: user,

        })


        if (isUserALeradyRating) {

            return NextResponse.json({

                message: "user is already give the rating",
                error: null,
                data: null

            }, {

                status: 400,
            })
        }

        // create the new rating and review

        const newRatingAndReview = await RatingAndReview.create({

            user, rating, review

        })

         return NextResponse.json({

            message: "some error occurred while creating a new section",
            error: null,
            data: newRatingAndReview

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




// get all rating and reviews 



export async function GET(req: NextRequest, res: NextResponse){

    try{


        const allRatingAndReviews = await RatingAndReview.find({});

        return NextResponse.json({

            message:"sucessfully retrieved all rating and reviews",
            data:allRatingAndReviews,
            error:null,

        },{

            status:200
        })


    }catch(error:any){

        console.log(error.message);
        
        return NextResponse.json({

            message: "some error occurred while getting all rating and reviews",
            error: error.message,
            data: null

        }, {

            status: 400,
        })
    }

}







