import { User } from "../models/userModel.js";

const profileDetails = async(req,res)=>{

       try {


        const {id} = req.userDetails;
        
        const response = await User.findById(id).select("-password -email -imageURL");
        
         return res.render('profile',{
         blogs:response.blogs
        })


       } catch (error) {
        

           return res.render('login',{
            error:"Server Error: Data not fetched"
           })
       }

}

export default profileDetails;