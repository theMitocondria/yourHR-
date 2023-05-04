import jwt from "jsonwebtoken";

const generateTokem= (givenId)=>{
    const token=jwt.sign({givenId},process.env.JWT_SECRET,{expiresIn:"5d"});
    return token;
}

export default generateTokem;