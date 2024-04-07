import { User } from "../models/userModel.js";
import { generateToken } from "../middleware/auth.js";
import bcrypt from "bcrypt"

const login = async (req,res)=>{
        
    try {
        const {email,password} = req.body;
    
        const loginData = {
            email,
            password
        }
    
        const doesExist = await User.findOne({email:email});
    
        // if user does not exist
        if(!doesExist)  return res.render('login');
    
        //if user exist comparing password
        const compareWithHash = await bcrypt.compare(loginData.password,doesExist.password);
    
        if(!compareWithHash) return res.render('login',{error:"login failed"});
    
        const user_data = {
            id:doesExist._id,
            username:doesExist.username,
            email:doesExist.email
        }
        const token = generateToken(user_data);
        //login successfull
        return res.cookie("token",token).render('Home',{user:user_data.username});


    } catch (error) {
        
       return res.status(500).json({
            message:'Server Error'
        })
    }


}

export default login;