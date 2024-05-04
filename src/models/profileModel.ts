
import mongoose, { Schema, Document,} from "mongoose";


export interface IProfile extends Document {

    gender: string,
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





