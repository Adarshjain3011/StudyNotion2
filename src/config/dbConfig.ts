
import mongoose from "mongoose";

const dbConnect = async()=>{

    await mongoose.connect(process.env.DATABASE_URL!,).then((data:any)=>{

        console.log("Database Connected");

    }).catch((error:any)=>{

        console.log(error);

        console.log("error our in database connection ",error.message);

    })
}

export default dbConnect;



