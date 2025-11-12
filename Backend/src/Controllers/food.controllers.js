
const foodModel = require("../models/food.Model");
const likeModel = require("../models/likes.Model");
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
async function likeFood(req, res, next) {
    const user =  req.user;
    const isAlreadyLiked = await likeModel.findOne({
        user: user._id,
        food : foodId
    })
    if(isAlreadyLiked) {
        await likeModel.deleteOne({
            user: user._id,
            food : foodId
        })
        return res.status(200).json({
            msg: "food unliked successfully"
        })

    }
    const like = await likeModel.create({
        user: user._id,
        food : foodId
    })
       
    res.status(201).json({
        msg: "Food Liked successfully",
        like
    })

}

module.exports = {
    createFood,
    getFoodItems,
    likeFood
};
