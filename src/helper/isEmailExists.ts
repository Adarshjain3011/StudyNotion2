
import User from "@/models/userModel";

export const isEMailExists = async(email:string)=>{


    return await User.findOne({ email: email});

}



