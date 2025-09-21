import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { date } from "zod";


export async function POST(request:Request) {
    await dbConnect()

    try {
        const {username,code}= await request.json()

        const decodedUsername=decodeURIComponent(username)

       const user= await UserModel.findOne({username:decodedUsername})

       if (!user){
        return Response.json({
            success:false,
            message:'Error verifying user'
            
        },
        {
            status:500
        })
       }

       const isvalidCode= user.verifyCode===code
       const iscodenotExpired= new Date(user.verifyCodeExpiry)>new Date()

       if(isvalidCode && iscodenotExpired){
        user.isVerified=true
        await user.save()

        return Response.json({
            success:true,
            message:'Account verified succesfully'
            
        },
        {
            status:200
        })
       } else if(!iscodenotExpired){
         return Response.json({
            success:false,
            message:'Verification code has expired, Please signup again to get new code'
            
        },
        {
            status:400
        })
       }else{
        return Response.json({
            success:false,
            message:'Incorrect verification code'
            
        },
        {
            status:400
        })
       }

    } catch (error) {
        console.error('Error verifying user',error)
        return Response.json({
            success:false,
            message:'Error verifying user'
            
        },
        {
            status:500
        })
    }
    
}
