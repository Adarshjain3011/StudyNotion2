
import mongoose, { Document,Schema,Types } from "mongoose";

import { IUser } from "./userModel";

import { ISection } from "@/models/sectionModel";

import { IRatingAndReview } from "./ratingAndReviewsModel";

import { ICategory } from "./categoryModel";


export interface ICourse extends Document {

    courseName:string,
    courseDescription:string,
    Instructor:Schema.Types.ObjectId | IUser,
    WhatYouWillLearn:string,
    courseContent:Schema.Types.ObjectId | ISection,
    RatingAndReviews:Schema.Types.ObjectId | IRatingAndReview, 
    price:string,
    thumbnail:string,
    category:Schema.Types.ObjectId | ICategory,

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

    category: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",

      },


    StudentEnrolled:[{

        type:Schema.Types.ObjectId,
        ref:"User",

    }],
    status: {

        type: String,
        enum: ["Draft", "Published"],
      },
    
},{timestamps:true});

export const Course = mongoose.models.Course || mongoose.model("Course",courseSchema);

export default Course;







