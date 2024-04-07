import { Router } from "express";
import signup from "../controller/signupController.js";
import login from "../controller/loginController.js";
import profileDetails from "../controller/profileController.js";
import publishBlog from "../controller/publishController.js";
import { verifyToken } from "../middleware/auth.js";
const router = Router();

router.get("/signup",(req,res)=>{
    return res.render("signup");
})

router.get("/login",(req,res)=>{
    return res.render("login");
})
//signup route
router.post('/signup',signup)

//login route
router.post('/login',login);

router.get('/logout',verifyToken,(req,res)=>{
    return res.clearCookie("token").redirect('/');
});

router.get('/publish',verifyToken,(req,res)=>{
      res.render('publish',{user:req.userDetails.username})
})

router.post('/publish',verifyToken,publishBlog);

// profile route
router.get('/profile',verifyToken,profileDetails);

export default router