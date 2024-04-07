import JWT from "jsonwebtoken";

const verifyToken=(req,res,next)=>{
    
      //access token from cookie
    const token = req.cookies.token;
    if(!token) return res.render('login');

         try {
            //verify token using secret
           
            const verification = JWT.verify(token,process.env.JWT_SECRET);
          
            if(!verification) return res.render('login');
   
            //passing data for authorization
            req.userDetails = verification;
            next();


         } catch (error) {
                      res.send('<h1>Error token not found</h1>')
         }
}

const generateToken=(user_data)=>{
       //generating token 
    return JWT.sign(user_data,process.env.JWT_SECRET,{expiresIn:'3d'})


}

export {verifyToken,generateToken}