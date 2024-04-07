import mongoose from "mongoose";

//function for database connection
const dbConnection = function(URI){
    mongoose.connect(URI).then(()=>console.log("⚙ DB Connected")).catch(()=>"DB Connection Failed");
}

export {dbConnection}