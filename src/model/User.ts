import mongoose, {Schema,Document} from "mongoose";
import { Content } from "next/font/google";

export interface Message extends Document{
    Content: string;
    createdAt: Date;
}

export interface User extends Document{
    userName: string;
    email: string;
    password: string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isVerified:boolean;
    isAcceptingMessage:boolean;
    messages: Message[]
    
}
const MessageSchema: Schema<Message>=new Schema({
    Content:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now
    }
})

const UserSchema: Schema<User>=new Schema({
    userName:{
        type: String,
        required: [true,'User name is required'],
        trim: true,
        unique:true
    },
    email:{
        type: String,
        required: [true,'Email is required'],
        unique:true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    password:{
        type: String,
        required: [true,'Password is required'],
        trim: true
    },
    verifyCode:{
        type: String,
        required: [true,'Verification code is required'],
        trim: true
    },
    verifyCodeExpiry:{
        type: Date,
        required: true,
        default: Date.now
    },
    isVerified:{
        type: Boolean,
        required: true,
        default: false
    },
    isAcceptingMessage:{
        type: Boolean,
        required: true,
        default: true
    },
    messages:[MessageSchema]
})
const UserModel=( mongoose.models.User as mongoose.Model<User>)||mongoose.model<User>('User',UserSchema)
export default UserModel;