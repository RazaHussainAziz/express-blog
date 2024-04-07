import { User } from "../models/userModel.js";

const publishBlog = async(req,res)=>{
        
    try {
        const {title,content} = req.body;
        const {id} = req.userDetails;
    
        // console.log(req)
    
        const addBlog = await User.findByIdAndUpdate(id,{
            $push:{
                blogs:{
                title:title,
                content:content
            }
        }
  
    })

    if(!addBlog) return res.render("Home");

       console.log(req.userDetails.username)
    return res.render('publish',{user:req.userDetails.username,message:"Blog Published"}); //for future : redirect it to blogs page where blogs



    } catch (error) {
             
        return res.render('publish',{success:false,message:"Failed to publish"});

    }
}

export default publishBlog;