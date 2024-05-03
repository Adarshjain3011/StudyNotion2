
import RatingAndReview from "@/models/ratingAndReviewsModel";

import mongoose from "mongoose";

import { NextRequest, NextResponse } from "next/server";

import { dbConnection } from "@/config/dbConfig";

import { NextApiRequest } from "next";

import { z } from "zod";

import Course from "@/models/courseModel";

const ratingAndReviewsChecker = z.object({

    user: z.string(),
    course: z.string(),
    rating: z.number(),
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

        const { user, rating, review, course } = body;


        // check the user enrolled in the course 

        const isUserEnrolled = await Course.findOne({

            _id: course,

            StudentEnrolled: { $elemMatch: { $eq: user } },

        })


        if (!isUserEnrolled) {

            return NextResponse.json({

                message: "student is not enrolled",
                data: null,
                error: null,

            }, {

                status: 400,

            })
        }

        // is user is enrolled in the course 


        // check the user is already give the rating 


        const isUserAlreadyGiveRating = await RatingAndReview.findOne({

            user: user,
            course: course

        })



        if (isUserAlreadyGiveRating) {

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

            user, rating, review, course

        })



        // add this new rating the course 

        const updatedCourse = await Course.findByIdAndUpdate(course, {

            $push: {

                RatingAndReviews: newRatingAndReview._id,

            }

        }, { new: true })


        return NextResponse.json({

            message: "",
            error: null,
            data: updatedCourse

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

// get average rating and reviews



export async function GET(req: NextApiRequest, res: NextResponse) {

    try {


        const { courseId, action } = req.query;


        if (action === "averageRating") {

            const result = await RatingAndReview.find(

                {

                    $match: {

                        course: new mongoose.Types.ObjectId(courseId),
                    }
                },
                {

                    $group: {

                        _id: null,
                        averageRating: { $avg: "$rating" },
                    },
                }

            )

            if (result.length === 0) {

                return NextResponse.json({

                    message: "No reviews found with the corresponding course ID ",
                    data: null,
                    error: null,

                }, {

                    status: 400,
                })
            }

            return NextResponse.json({

                message: "sucessfully retrieved all rating and reviews",
                data: result[0].averageRating,
                error: null,

            }, {

                status: 200

            })


        }


        const allRatingAndReviews = await RatingAndReview.find({})

            .sort({ rating: "desc" }).populate({

                path: "user",
                select: "userName userImage email"

            }).populate({

                path: "course",
                select: "courseName"

            }).exec();


        return NextResponse.json({

            message: "sucessfully retrieved all rating and reviews",
            data: allRatingAndReviews,
            error: null,

        }, {

            status: 200
        })


    } catch (error: any) {

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






