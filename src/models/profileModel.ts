
import mongoose, { Schema, Document, mongo } from "mongoose";


export interface IProfile extends Document {

    genders: string,
    dob:Date,
    about:string
    contactNumber:string

}

const profileSchema:Schema  = new Schema({

    gender:{
        
        type:String,
        required:true

    },
    dob:{

        type:Date,
    },
    about:{

        type:String

    },
    contactNumber:{

        type:String,

    }
})


export const Profile = mongoose.models.Profile || mongoose.model("Profile",profileSchema);

export default Profile;





