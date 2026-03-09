const mongoose=require("mongoose");
const URI="mongodb://localhost:27017/gymm-admin";
const connectDb=async()=>{
    try {
        await mongoose.connect(URI)
        console.log("connection successfull to database")
    } catch (error) {
        console.error("ERror connecting database")
        process.exit(0)
    }
}

module.exports=connectDb;