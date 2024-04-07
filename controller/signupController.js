import { User } from "../models/userModel.js";
import { generateToken } from "../middleware/auth.js";

const signup = async(req,res)=>{


    try {
        const { username, email, password } = req.body;
         
        const newUserData = {
            username,
            email,
            password
        }
        console.log(newUserData)
        //checking if user already exist
        const doesExist = await User.findOne({email:email});
    
        //if user exist render login page
        if(doesExist) return res.render('login',{error:"User already exist"});
    
        //if user does not exist than create a new user
        const newUser = await User.create(newUserData);

        const user_data = {
            id:newUser.id,
            username:newUser.username,
            email:newUser.email
        }

        const token = generateToken(user_data);
    
        return res.cookie("token",token).render('Home',{user:user_data.username});


    } catch (error) {

        return res.status(500).json({
            message:"internel server error",
            success:false
        })
        
    }

    
}

export default signup;