import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import {userNameValidation}from '@/schemas/signUpSchema';

const UsernameQuerySchema=z.object({
    username:userNameValidation
})

export async function GET(request:Request){


    
    await dbConnect()
    
    try {
        const {searchParams}=new URL(request.url)
        const queryParam={
            username:searchParams.get('username')
        }
        // validation with username
        const result=UsernameQuerySchema.safeParse(queryParam)
        console.log(result) //TODO remove
        if(!result.success){
            const usernameErrors=result.error.format().username?._errors|| []
            return Response.json({
                success:false,
                message:usernameErrors?.length>0
                ? usernameErrors.join(' , ')
                :'invalid Query parameters',
                
            },{
                status:400
            })
        }
        const {username}=result.data
        const existingverifiedUdser=await UserModel.findOne({username,isVerified:true})
        if(existingverifiedUdser){
            return Response.json({
                success:false,
                message:'Username already taken',
                
            },{
                status:400
            })
        }
        return Response.json({
            success:true,
            message:'Username is available',
            
        },{
            status:400
        })
    } catch (error) {
        console.error('Error checking username uniqueness',error)
        return Response.json({
            success:false,
            message:'Error checking username'
            
        },
        {
            status:500
        })
    }
}
