const userModel = require("../models/user.model")
const foodPartnerModel = require("../models/foodpartner.model")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
async function registerUser(req, res) {
    const {fullName, email, password} = req.body;
    const isUserAlreadyExists = await userModel.findOne({email});
    if(isUserAlreadyExists){
        return res.status(400).json({
            msg: "User Already exists..."
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        fullName,
        email,
        password:hashedPassword
    })

    const token = jwt.sign({
        id : user._id,
    },process.env.JWT_SECRET)

    res.cookie("token" , token)
    res.status(201).json({
        msg:"user registered successfully",
        user:{
            _id: user._id,
            email:user.email,
            fullName:user.fullName

        }
    })
}
async function loginUser(req, res){
    const {email, password} = req.body;
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(400).json({
            msg:"Invalid mail or password"
        })
    }
    const validatePassword = await bcrypt.compare(password, user.password)
    if(!validatePassword){
        return res.status(400).json({
            msg:"Invalid mail or password"
        })
    }

   const token = jwt.sign({
        id : user._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token);
    res.status(200).json({
        msg:"User logged in successfully",
        user:{
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    
    })
    

}
function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        msg: "User logged Out successfully"
    });

}

async function registerFoodPartner(req, res) {
    const {name, email, password, phone, address, contactName} = req.body;
    const alreadyExist = await foodPartnerModel.findOne({email});
    if(alreadyExist){
        return res.status(400).json({
            msg:"User Already Exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const foodPartner = await foodPartnerModel.create({
        name,
        email, 
        password:hashedPassword,
        phone, 
        address, 
        contactName

    })
    const token = jwt.sign({id : foodPartner._id}, process.env.JWT_SECRET);
    res.cookie("token",token);

    res.status(201).json({
        msg:"user registered successfully",
        foodPartner:{ 
                id:foodPartner._id,
                name:foodPartner.name,
                email:foodPartner.email,
                phone: foodPartner.phone, 
                address: foodPartner.address, 
                contactName: foodPartner.contactName
                
            }
    })
}

async function loginFoodPartner(req, res) {
    const {email, password} = req.body;
    const foodPartner = await foodPartnerModel.findOne({email});
    if(!foodPartner){
        return res.status(400).json({
            msg: "Email or password Invalid"
        })
    }
    const isValid = await bcrypt.compare(password, foodPartner.password )
    if(!isValid){
        return res.status(400).json({
            msg: "Email or password Invalid"
        })
    }
    const token = jwt.sign({id:foodPartner._id}, process.env.JWT_SECRET)
    res.cookie("token", token);
    res.status(200).json({
        msg: "foodPartner got logged in successfully..",
        foodPartner:{
            _id:foodPartner._id, 
            name: foodPartner.name,
            email:foodPartner.email
        }
    })
}

function logoutFoodPartner(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        msg : "foodpartner logged out successfully"
    });
}

module.exports={
    registerUser, loginUser, logoutUser,registerFoodPartner,loginFoodPartner,logoutFoodPartner
}