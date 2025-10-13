const foodPartnerModel = require("../models/food.Model")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")

async function authFoodPartnerMiddleware(req, res, next) {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            msg: "Unauthorized access , user not found"
        })
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const foodPartner = await foodPartnerModel.findById(decoded.id);
        req.foodPartner = foodPartner;
        next();
    } catch (error) {
        return res.status(401).json({
            msg : "Invalid token"
        })
        
    }



}

async function authUserMiddleware(req, res, next) {
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({
            msg: "Please login first"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id)
        req.user = user
        next()
        
    } catch (error) {
         return res.status(401).json({
            msg : "Invalid token"
        })
        
    }
    
    
}
module.exports={
    authFoodPartnerMiddleware,
    authUserMiddleware

}