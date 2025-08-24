// import dbConnect from "@/lib/dbConnect";
// import UserModel from "@/model/User";
// import bcrypt from "bcryptjs";
// import { sendVerificationEmail } from "@/helpers/sendVerificationEmails";
// import { success } from "zod";

// export async function POST(request: Request){
//     await dbConnect()

//     try {
//        const {username, email, password } = await request.json()
//        const existinguserbyusername=await UserModel .findOne({
//         username,
//         isVerified: true

//        })
//        if (existinguserbyusername){
//         return Response.json({
//             success: false,
//             message:'Username already taken'
//         },{
//             status:400
//         })
//        }
//        const existinguserbyemail=await UserModel.findOne({email})
//        const verifyCode= Math.floor(100000 + Math.random()*900000).toString()
//        if (existinguserbyemail){
//         if (existinguserbyemail.isVerified){
//             return Response.json({
//              success: false,
//             message:'User already exist with this email'
//         },{status:400})
//         }else{
//           const hashedpassword=await bcrypt.hash(password,10)
//           existinguserbyemail.password=hashedpassword;
//           existinguserbyemail.verifyCode=verifyCode;
//           existinguserbyemail.verifyCodeExpiry=new Date(Date.now() + 3600000)
//           await existinguserbyemail .save()  
//         }
//        }
//        else{
//         const hashedpassword=await bcrypt.hash(password,10)
//         const expiryDate = new Date()
//         expiryDate.setHours(expiryDate.getHours() +1)
//         const newUser=new UserModel({
//                 username,
//                 email,
//                 password:hashedpassword,
//                 verifyCode,
//                 verifyCodeExpiry:expiryDate,
//                 isVerified:false,
//                 isAcceptingMessage:true,
//                 messages: []
//         })
//         await newUser.save()
//        }
//        // send verification email
//        const emailResponse =await sendVerificationEmail(
//         email,
//         username,
//         verifyCode
//        )
//        if (!emailResponse.success){
//         return Response.json({
//              success: false,
//             message:emailResponse.message
//         },{status:500})
        
//         return Response.json({
//              success: true,
//             message:'User registerd successfuly. Please verify your email'
//         },{status:201})
//        }

//     } catch (error) {
//         console.error('Error registering user',error)
//         return Response.json({
//             success: false,
//             message: 'Error registering user'
//         },
//     {
//         status: 500
//     })
//     }
// }




import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmails";
import { NextResponse } from "next/server";
// ...existing code...
export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();
    const userName = body.userName ?? body.username ?? body.name;
    const email = body.email;
    const password = body.password;

    if (!userName || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
          errors: {
            userName: !userName ? "userName is required" : undefined,
            email: !email ? "email is required" : undefined,
            password: !password ? "password is required" : undefined,
          },
        },
        { status: 400 }
      );
    }

    const existinguserbyusername = await UserModel.findOne({
      userName,
      isVerified: true,
    });

    if (existinguserbyusername) {
      return NextResponse.json(
        {
          success: false,
          message: "Username already taken",
        },
        { status: 400 }
      );
    }

    const existinguserbyemail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existinguserbyemail) {
      if (existinguserbyemail.isVerified) {
        return NextResponse.json(
          {
            success: false,
            message: "User already exist with this email",
          },
          { status: 400 }
        );
      } else {
        const hashedpassword = await bcrypt.hash(password, 10);
        existinguserbyemail.password = hashedpassword;
        existinguserbyemail.verifyCode = verifyCode;
        existinguserbyemail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        // ensure DB field name matches schema (userName)
        existinguserbyemail.username = userName;
        await existinguserbyemail.save();
      }
    } else {
      const hashedpassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      const newUser = new UserModel({
        userName,
        email,
        password: hashedpassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });
      await newUser.save();
    }

    // send verification email
    const emailResponse = await sendVerificationEmail(email, userName, verifyCode);

    if (!emailResponse.success) {
      return NextResponse.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully. Please verify your email",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error registering user",
      },
      { status: 500 }
    );
  }
}
// ...existing