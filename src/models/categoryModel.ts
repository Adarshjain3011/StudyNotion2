
import mongoose, { Document,Schema } from "mongoose";

import { ICourse } from "./courseModel";

export interface ICategory extends Document {


    name: string;
    course:Schema.Types.ObjectId | ICourse,

}

const categorySchema:Schema = new Schema({


    name:{

        type:String,
        required:true,

    },
    course:[{

        type:Schema.Types.ObjectId,
        ref:"Course"

    }]

})



export const Category = mongoose.models.Category || mongoose.model("Category",categorySchema);

export default Category;


