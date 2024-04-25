
import mongoose, { Schema, Document } from "mongoose";

import { AccountType } from "@/constants/constant";

import { IProfile } from "./profileModel";

export interface IUser extends Document {

    userName: string;
    password: string;
    email: string;
    userImage?:string;
    contactNumber?: string;
    AccountType: AccountType,
    isVerified: boolean,
    tokenExpiry?: Date;
    token: string;
    Profile?:Schema.Types.ObjectId | IProfile;
    
}


const userSchema:Schema = new Schema({

    userName: {

        type: String,
        required: true,
        unique: true,

    },
    password: {

        type: String,
        required: true,

    },
    email: {

        type: String,
        required: true,
        unique: true,

    },
    userImage:{

        type: String,

    },
    contactNumber: {

        type: String,


    },
    AccountType: {

        type: String,
        enum: AccountType,
        required: true,

    },
    isVerified: {

        type: Boolean,
        default: false,

    },

    Profile:{

        type: Schema.Types.ObjectId,
        ref: "Profile",
    },

    token: {

        type: String,
        default: null,
    },

    tokenExpiry: {

        type: Date,
    }

},
    {
        timestamps: true
    }
)

export const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;



