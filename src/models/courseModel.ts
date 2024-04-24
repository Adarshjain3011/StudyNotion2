
import mongoose, { Document,Schema,Types } from "mongoose";

import { IUser } from "./userModel";

import { ISection } from "@/models/sectionModel";

import { IRatingAndReview } from "./ratingAndReviewsModel";

import { ITag } from "./Tag";


export interface ICourse extends Document {

    courseName:string,
    courseDescription:string,
    Instructor:Schema.Types.ObjectId | IUser,
    WhatYouWillLearn:string,
    courseContent:Schema.Types.ObjectId | ISection,
    RatingAndReviews:Schema.Types.ObjectId | IRatingAndReview, 
    price:string,
    thumbnail:string,
    Tags:Schema.Types.ObjectId | ITag,

    StudentEnrolled:Schema.Types.ObjectId | IUser


}



const courseSchema:Schema = new Schema({

    courseName:{

        type:String,
        required:true
    },
    courseDescription:{

        type:String,
        required:true

    },

    Instructor:{

        type:Schema.Types.ObjectId,
        ref:"User",
        required:true

    },
    whatYouWillLearn:{

        type:String,
        required:true

    },

    courseContent:[{

        type:Schema.Types.ObjectId,
        ref:"Section",

    }],

    RatingAndReviews:[{

        type:Schema.Types.ObjectId,
        ref:"RatingAndReview",

    }],


    price:{

        type:Number,
        required:true

    },

    thumbnail:{

        type:String,
        required:true

    },

    Tags:[{

        type:Schema.Types.ObjectId,
        ref:"Tag",
    }],


    StudentEnrolled:{

        type:Schema.Types.ObjectId,
        ref:"User",

    }


    
})



export const Course = mongoose.models.Course || mongoose.model("Course",courseSchema);

export default Course;




