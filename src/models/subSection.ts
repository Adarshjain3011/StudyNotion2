
import mongoose, { Document,Schema,Types } from "mongoose";

export interface ISubSection extends Document {

    Title: string,
    timeDuration:string,
    description:string,
    videoUrl:string,
    additionalUrl:string,

}


const subSectionSchema:Schema = new Schema({

    Title:{

        type:String,
        required:true

    },
    timeDuration:{

        type:String,
        required:true

    },
    description:{

        type:String,
        required:true

    },
    videoUrl:{

        type:String,
        required:true

    },

    additionalUrl:{


        type:String,

    }

})


export const SubSection = mongoose.models.SubSection || mongoose.model("SubSection",subSectionSchema);


export default SubSection;




