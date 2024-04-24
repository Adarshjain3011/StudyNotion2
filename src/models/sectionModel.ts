
import mongoose, { Document,Schema,Types } from "mongoose";

import { ISubSection } from "./subSection";


export interface ISection extends Document {

    sectionName:string,
    SubSection:Schema.Types.ObjectId | ISubSection,

}


const SectionSchema: Schema = new Schema({

    sectionName:{

        type: String,
        required: true,

    },
    subSectionName:[{

        type:Schema.Types.ObjectId,

        ref:"SubSection"

    }]

})


export const Section = mongoose.models.Section || mongoose.model("Section",SectionSchema);

export default Section;


