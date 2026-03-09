const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken")
const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
})

// hashing the password
userSchema.pre("save",async function(next){
    console.log("pre method ", this);
    const user=this;
    if(!user.isModified('password')){
        next()
    }
    try {
        const saltRound=await bcrypt.genSalt(10);
        const hash_password=await bcrypt.hash(user.password,saltRound)
        user.password=hash_password
        
    } catch (error) {
        next(error)
    }
})

// compare password
userSchema.methods.comparePassword=async function (password) {
    return bcrypt.compare(password,this.password)
}
// generating token
userSchema.methods.generateToken=async function(){
    try {
        // payload
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin,
        },
        // signature
    process.env.JWT_SECRET_KEY,
    {
        expiresIn:"30d",
    }
    )
    } catch (error) {
        console.log(error)
    }
}


// collection name or model

const User=mongoose.model("User",userSchema)
module.exports=User;