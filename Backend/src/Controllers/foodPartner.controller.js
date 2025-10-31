// const foodPartnerModel = require('../models/foodPartner.model')
// const foodModel = require("../models/food.Model")

// async function getFoodPartnerById(req, res) {
//     const foodPartnerId = req.params.id;
//     const foodPartner = await foodPartnerModel.findById(foodPartnerId);
//     const foodItemsByFoodPartner = await foodModel.find({ foodPartner : foodPartnerId})
//     if(!foodPartner){
//         return res.status(404).json({msg:"Food Partner not found"}); 
//     }
//     res.status(200).json({
//         msg: "Food partner retrieved successfully",
//         foodPartner: {
//             ...foodPartner.toObject(),
//             foodItems: foodItemsByFoodPartner
//         },
        
//     })

    
// }
// module.exports = {
//     getFoodPartnerById
// }


// const foodPartnerModel = require('../models/foodPartner.model')
// const foodModel = require("../models/food.Model")

// async function getFoodPartnerById(req, res) {
//     try {
//         const foodPartnerId = req.params.id;
//         console.log('🔍 Fetching food partner with ID:', foodPartnerId);
        
//         // Validate ID format
//         if (!foodPartnerId || foodPartnerId === 'undefined') {
//             return res.status(400).json({ 
//                 success: false,
//                 msg: "Invalid food partner ID" 
//             });
//         }

//         const foodPartner = await foodPartnerModel.findById(foodPartnerId);
//         console.log('🔍 Food partner found:', foodPartner ? 'Yes' : 'No');
        
//         if(!foodPartner){
//             return res.status(404).json({
//                 success: false,
//                 msg: "Food Partner not found"
//             }); 
//         }

//         const foodItemsByFoodPartner = await foodModel.find({ foodPartner: foodPartnerId });
//         console.log('🎬 Food items query result:', foodItemsByFoodPartner);
//         console.log('📊 Number of food items found:', foodItemsByFoodPartner.length);

//         // Log each food item details
//         foodItemsByFoodPartner.forEach((item, index) => {
//             console.log(`🍕 Food item ${index + 1}:`, {
//                 id: item._id,
//                 name: item.name,
//                 video: item.video,
//                 description: item.description,
//                 foodPartner: item.foodPartner
//             });
//         });

//         res.status(200).json({
//             success: true,
//             msg: "Food partner retrieved successfully",
//             foodPartner: foodPartner,
//             foodItems: foodItemsByFoodPartner
//         });

//     } catch (err) {
//         console.error('❌ Error in getFoodPartnerById:', err);
//         res.status(500).json({
//             success: false,
//             message: "Internal Server Error",
//             error: process.env.NODE_ENV === 'development' ? err.message : {}
//         });
//     }
// }

// module.exports = {
//     getFoodPartnerById
// }


const foodPartnerModel = require('../models/foodPartner.model')
const foodModel = require("../models/food.Model")

async function getFoodPartnerById(req, res) {
    try {
        const foodPartnerId = req.params.id;
        console.log('🔍 Fetching food partner with ID:', foodPartnerId);
        
        // Validate ID format
        if (!foodPartnerId || foodPartnerId === 'undefined') {
            return res.status(400).json({ 
                success: false,
                msg: "Invalid food partner ID" 
            });
        }

        const foodPartner = await foodPartnerModel.findById(foodPartnerId);
        console.log('🔍 Food partner found:', foodPartner ? foodPartner.name : 'No');
        
        if(!foodPartner){
            return res.status(404).json({
                success: false,
                msg: "Food Partner not found"
            }); 
        }

        // 🔧 ADDED: More detailed query logging
        console.log('🔍 Querying food items for foodPartner:', foodPartnerId);
        const foodItemsByFoodPartner = await foodModel.find({ foodPartner: foodPartnerId });
        
        console.log('🎬 RAW MONGOOSE QUERY RESULT:');
        console.log('- Number of documents:', foodItemsByFoodPartner.length);
        console.log('- Documents:', foodItemsByFoodPartner);
        
        // 🔧 ADDED: Check each document's foodPartner field
        console.log('🔍 CHECKING FOODPARTNER REFERENCES:');
        foodItemsByFoodPartner.forEach((item, index) => {
            console.log(`🍕 Food item ${index + 1}:`);
            console.log(`   - ID: ${item._id}`);
            console.log(`   - Name: ${item.name}`);
            console.log(`   - Video: ${item.video}`);
            console.log(`   - FoodPartner ID: ${item.foodPartner}`);
            console.log(`   - FoodPartner ID type: ${typeof item.foodPartner}`);
            console.log(`   - FoodPartner ID equals query ID: ${item.foodPartner.toString() === foodPartnerId}`);
        });

        res.status(200).json({
            success: true,
            msg: "Food partner retrieved successfully",
            foodPartner: foodPartner,
            foodItems: foodItemsByFoodPartner
        });

    } catch (err) {
        console.error('❌ Error in getFoodPartnerById:', err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: process.env.NODE_ENV === 'development' ? err.message : {}
        });
    }
}

module.exports = {
    getFoodPartnerById
}