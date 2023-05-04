import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema=new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    token:{
        type:String,
        required:true,
    },
    tokenExpire:{
        type:Number,
        required:true,
    },
    resume:{
        type:String,
        required:true,
    }
})


UserSchema.pre('save',async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,12);
    }
    next();
})

UserSchema.method('matchPassword',async function(givenPassword){
    return bcrypt.compare(givenPassword,this?.password);
});

const User= new mongoose.model("User",UserSchema);
export default User;