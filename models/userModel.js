import {Schema , model} from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({
       
    username : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    password : {
        type:String,
        required:true
    },
    imageURL:{
        type:String,
        default:""
    },
    blogs:[
        {
            title:{
                type:String,
                required:true
            },
            content:{
                type:String,
                required:true
            }
        }
    ]


})



userSchema.pre("save",async function(){
    let user = this;

    if (!user.isModified("password")) {
        return next();
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password,salt);
    user.password = hashedPassword;
})

const User = model("User",userSchema);

export {User}
