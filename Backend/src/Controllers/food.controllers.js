// // const foodModel =  require("../models/food.Model");
// // const storageService = require("../services/storage.service")
// // const {v4 : uuid} =require("uuid");

// // async function createFood(req, res) {
// //     console.log(req.foodPartner);
// //     console.log(req.body);
// //     console.log(req.file);//video
// //     console.log("hi");
    

// //     const fileUploadResult = await storageService.uploadFile(req.file.buffer,uuid())
// //     console.log(fileUploadResult);
    
// //     res.json({msg:"food item created"})
    
// // }

// // module.exports={createFood}
//  const storageService = require("../services/storage.service")

// const foodModel = require("../models/food.Model");
// const cloudinaryService = require("../services/storage.service");
// const { v4: uuid } = require("uuid");

// async function createFood(req, res) {
//     try {
//         console.log("Food partner:", req.foodPartner);
//         console.log("Body data:", req.body);
//         console.log("Uploaded file:", req.file);

//         if (!req.file) {
//             return res.status(400).json({ msg: "No file uploaded!" });
//         }

//         const fileUploadResult = await cloudinaryService.uploadFile(
//             req.file.buffer,
//             uuid()
//         );

//         const foodItem = await foodModel.create({
//             name: req.body.name,
//             description:req.body.description,
//             video : fileUploadResult.url,
//             foodPartner: req.foodPartner._id
//         }) 

//         console.log("Cloudinary upload result:", fileUploadResult);

//         res.status(201).json({
//             msg: "Food item created",
            
//             food: foodItem
//         });
//     } catch (err) {
//         console.error("Error in createFood:", err);
//         res.status(500).json({ msg: "Server error" });
//     }
// }

// async function getFoodItems(req, res) {
//     const foodItems = await foodModel.find({});
//     res.status(200).json({
//         msg: "Food items fetched successfully",
//         foodItems
//     })

// }

// module.exports = { createFood, getFoodItems };

const foodModel = require("../models/food.Model");
const cloudinaryService = require("../services/storage.service");
const { v4: uuid } = require("uuid");

/**
 * Controller to create a new food item.
 * Expects:
 * - req.foodPartner: set by auth middleware
 * - req.file: uploaded video file
 * - req.body.name, req.body.description
 */
async function createFood(req, res) {
    try {
        // 1️⃣ Validate food partner
        if (!req.foodPartner || !req.foodPartner._id) {
            return res.status(401).json({ msg: "Unauthorized or missing food partner" });
        }

        // 2️⃣ Validate request body
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({ msg: "Name and description are required" });
        }

        // 3️⃣ Validate uploaded file
        if (!req.file) {
            return res.status(400).json({ msg: "No video uploaded!" });
        }

        console.log("Food partner:", req.foodPartner);
        console.log("Body data:", req.body);
        console.log("Uploaded file:", req.file);

        // 4️⃣ Upload video to Cloudinary
        const fileUploadResult = await cloudinaryService.uploadFile(req.file.buffer, uuid());
        console.log("Cloudinary upload result:", fileUploadResult);

        // 5️⃣ Save food item to DB
        const foodItem = await foodModel.create({
            name,
            description,
            video: fileUploadResult.secure_url, // use secure_url
            foodPartner: req.foodPartner._id
        });

        // 6️⃣ Send response
        res.status(201).json({
            msg: "Food item created",
            food: foodItem
        });

    } catch (err) {
        console.error("Error in createFood:", err);
        res.status(500).json({ msg: "Server error" });
    }
}

/**
 * Controller to fetch all food items
 */
async function getFoodItems(req, res) {
    try {
        const foodItems = await foodModel.find({});
        res.status(200).json({
            msg: "Food items fetched successfully",
            foodItems
        });
    } catch (err) {
        console.error("Error in getFoodItems:", err);
        res.status(500).json({ msg: "Server error" });
    }
}

module.exports = {
    createFood,
    getFoodItems
};
