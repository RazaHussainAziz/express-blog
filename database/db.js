import mongoose from "mongoose";

const dbConnection = function(URI){
    mongoose.connect(URI).then(()=>console.log("⚙ DB Connected")).catch(()=>"DB Connection Failed");
}

export {dbConnection}