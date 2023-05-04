import User from "../Models/User.js";
import generateTokem from "../middleware/generateTOken.js";

export const registerUser = async (req, res) => {
    try {
        const file =req.file;
        const { email, name, password } = req.body;
        console.log(file, email, password, name);
        if (!email || !password || !name  || !file) {
            return res.status(401).json({
                success: false,
                messsage: "Provide all the credentials"
            })
        }

        const emailFound = await User.findOne({ email });
        if (emailFound) {
            return res.status(403).json({
                success: false,
                messsage: "Already registered please login"
            })
        }

        const urlPath=file?.path;
        const user = await User.create({
            name,
            email,
            password,
            token: generateTokem(email),
            tokenExpire: Date.now() + 1000 * 60 * 60 * 24 * 5,
            resume:urlPath
        });
        return res.status(200).json({
            success: true,
            message: "User created successfully",
            user,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email ||  !password){
            return res.status(401).json({
             success:false,
             messsage:"Provide all the credentials"
            })
         }


        const emailFound=await User.findOne({email});
        if (!emailFound) {
            return res.status(403).json({
                success: false,
                messsage: "Not registered please register"
            })
        }

        const passwordCheck=await emailFound.matchPassword(password);
        if(!passwordCheck){
            return res.status(403).json({
                success: false,
                messsage: "Invalid login credentials"
            })
        }

        emailFound.token=generateTokem(emailFound.email);
        emailFound.tokenExpire=Date.now()+1000*60*60*24*5;
        await emailFound.save();

        return res.status(200).json({
            message:"Logeed in successfully",
            success:true,
            emailFound,
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const isLoggedIn=async (req,res)=>{
    const {token,tokenexpire}=req.headers;
    const user=await User.findOne({token});

    if(user){
        const time=Date.now();
        console.log(time);
        console.log(token);
        if(tokenexpire>time){
            return res.status(200).json({
                success:true,
                message:"Not expired"
            })
        }else{
           return res.status(500).json({
            success:false,
            message:"Expired token"
           }) 
        }
    }else{
        return res.status(500).json({
            success:false,
            message:"unverified token"
           }) 
    }
}