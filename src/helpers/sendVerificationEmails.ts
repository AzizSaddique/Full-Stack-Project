import { resend } from "@/lib/resend";
import VerificationEmail from '../../emails/VerificationEmails';
import { apiResponse } from "@/types/apiResponse";
export async function sendVerificationEmail(

    email: string,
    username:string,
    verifyCode:string
):Promise<apiResponse>{
    try {
        await resend.emails.send({
  from: 'you@example.com',
  to: email,
  subject: 'mstry message| Verification code',
  react: VerificationEmail({username, otp: verifyCode}),
});
        return {
            success: true,
            message: 'Verification email sent successfully',
        };
    } catch (emailError) {
        console.error('Error sending verification emails',emailError)
        return {
            success: false,
            message: 'Failed to send verification email',
        };
        
    }
}