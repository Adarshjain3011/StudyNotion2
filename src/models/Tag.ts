
import mongoose, { Document,Schema } from "mongoose";

import { ICourse } from "./courseModel";

export interface ITag extends Document {


    name: string;
    course:Schema.Types.ObjectId | ICourse,

}


const tagSchema:Schema = new Schema({


    name:{

        type:String,
        required:true,

    },
    course:[{

        type:Schema.Types.ObjectId,
        ref:"Course"

    }]

})



export const Tag = mongoose.models.Tag || mongoose.model("Tag",tagSchema);

export default Tag;




