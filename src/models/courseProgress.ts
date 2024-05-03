
import mongoose,{Schema,Document} from "mongoose";

import { ICourse } from "./courseModel";

import { IUser } from "./userModel";


import { ISubSection } from "./subSection";



export interface ICourseProgress extends Document{

    courseId:Schema.Types.ObjectId | ICourse,
    userId:Schema.Types.ObjectId | IUser,
    completedVideos:[Schema.Types.ObjectId | ISubSection]


}


const courseProgressSchema:Schema = new mongoose.Schema({

    courseId: {

      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",

    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    completedVideos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubSection",
      },
    ],
  })


export const CourseProgress = mongoose.models.CourseProgress || mongoose.model("CourseProgress",courseProgressSchema);

export default CourseProgress;






