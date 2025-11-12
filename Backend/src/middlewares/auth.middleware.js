// const foodPartnerModel = require("../models/foodPartner.model")
// const jwt = require("jsonwebtoken")
// const userModel = require("../models/user.model")

// async function authFoodPartnerMiddleware(req, res, next) {
//     const token = req.cookies.token;

//     if(!token){
//         return res.status(401).json({
//             msg: "Unauthorized access , user not found"
//         })
//     }
//     try {
//         const decoded = jwt.verify(token,process.env.JWT_SECRET);
//         const foodPartner = await foodPartnerModel.findById(decoded.id);
//         req.foodPartner = foodPartner;
//         next();
//     } catch (error) {
//         return res.status(401).json({
//             msg : "Invalid token"
//         })
        
//     }



// }

// async function authUserMiddleware(req, res, next) {
//     const token = req.cookies.token;
//     if(!token) {
//         return res.status(401).json({
//             msg: "Please login first"
//         })
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await userModel.findById(decoded.id)
//         req.user = user
//         next()
        
//     } catch (error) {
//          return res.status(401).json({
//             msg : "Invalid token"
//         })
        
//     }
    
    
// }
// module.exports={
//     authFoodPartnerMiddleware,
//     authUserMiddleware

// }


const foodPartnerModel = require("../models/foodPartner.model")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")

async function authFoodPartnerMiddleware(req, res, next) {
    // 🔧 FIXED: Now using "token" instead of "foodPartnerToken"
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            msg: "Unauthorized access, please login as food partner"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 🔧 CRITICAL: Check if token is for food partner
        if (decoded.type !== 'foodPartner') {
            return res.status(401).json({
                msg: "Invalid token type - food partner access required"
            });
        }
        
        const foodPartner = await foodPartnerModel.findById(decoded.id);
        if (!foodPartner) {
            return res.status(401).json({
                msg: "Food partner not found"
            });
        }
        
        req.foodPartner = foodPartner;
        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(401).json({
            msg: "Invalid token"
        });
    }
}

async function authUserMiddleware(req, res, next) {
    // 🔧 FIXED: Now using "token" instead of "userToken"  
    const token = req.cookies.token;
    
    if(!token) {
        return res.status(401).json({
            msg: "Please login first"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 🔧 CRITICAL: Check if token is for user
        if (decoded.type !== 'user') {
            return res.status(401).json({
                msg: "Invalid token type - user access required"
            });
        }
        
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({
                msg: "User not found"
            });
        }
        
        req.user = user;
        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(401).json({
            msg: "Invalid token"
        });
    }
}

async function authBothUserAndFoodPartner(req, res, next){
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({
            msg: "PLease login first"
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded.type != "user" && decoded.type != "foodPartner") {
            return res.json({
                msg: "login as user or foodPartner first"
            })

        } 
        if (decoded.type === 'user') {
            const user = await userModel.findById(decoded.id);

            if (!user ) {
                 return res.status(401).json({
                    msg: "User not found"
                });
            }
            req.user = user;
            
        }
        if (decoded.type === 'foodPartner') {
            const foodPartner = await foodPartnerModel.findById(decoded.id);

            if (!foodPartner ) {
                 return res.status(401).json({
                    msg: "foodPartner not found"
                });
            }
            req.foodPartner = foodPartner;
           

        }
        next();

    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(401).json({
            msg: "Invalid token"
        });
    }
}

module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware,
    authBothUserAndFoodPartner
}