

import mongoose, { Document,Schema } from "mongoose";

import { IUser } from "./userModel";

export interface IRatingAndReview extends Document {

    user :Schema.Types.ObjectId | IUser,

    rating : number,
    review:string,

}


const ratingAndReviewsSchema:Schema = new Schema({

    user:{

        type:Schema.Types.ObjectId,

        ref:"User",

        required:true

    },
    course:{

        type:Schema.Types.ObjectId,

        ref:"Course",

        required:true
    },
    rating:{

        type:Number,

    },
    review:{

        type:String,
    }

});


export const RatingAndReview = mongoose.models.RatingAndReview || mongoose.model("RatingAndReview",ratingAndReviewsSchema);


export default RatingAndReview;


