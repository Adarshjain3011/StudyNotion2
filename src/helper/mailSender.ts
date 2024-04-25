
import { resend } from "@/config/resend";

import VerificationEmail from "../../emails/verificationEmail";

import { apiResponse } from "@/types/apiResponse";

export async function sendVerificationEmail(

    email: string,
    username: string,
    verifyCode: string
): Promise<apiResponse> {

    try {


        await resend.emails.send({

            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Verification  Email Sent Successfully ',
            react: VerificationEmail({username,otp :verifyCode}),

        });


        return {

            success: true,
            message: "sucessfully send the email ",

        }


    } catch (error: any) {


        console.log(error.message);

        return {

            success: false,
            message: "failed to send verification email",

        }

    }
}


