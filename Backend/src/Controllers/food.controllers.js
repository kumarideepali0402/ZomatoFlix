// const foodModel =  require("../models/food.Model");
// const storageService = require("../services/storage.service")
// const {v4 : uuid} =require("uuid");

// async function createFood(req, res) {
//     console.log(req.foodPartner);
//     console.log(req.body);
//     console.log(req.file);//video
//     console.log("hi");
    

//     const fileUploadResult = await storageService.uploadFile(req.file.buffer,uuid())
//     console.log(fileUploadResult);
    
//     res.json({msg:"food item created"})
    
// }

// module.exports={createFood}
 const storageService = require("../services/storage.service")

const foodModel = require("../models/food.Model");
const cloudinaryService = require("../services/storage.service");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
    try {
        console.log("Food partner:", req.foodPartner);
        console.log("Body data:", req.body);
        console.log("Uploaded file:", req.file);

        if (!req.file) {
            return res.status(400).json({ msg: "No file uploaded!" });
        }

        const fileUploadResult = await cloudinaryService.uploadFile(
            req.file.buffer,
            uuid()
        );

        const foodItem = await foodModel.create({
            name: req.body.name,
            description:req.body.description,
            video : fileUploadResult.url,
            foodPartner: req.foodPartner._id
        }) 

        console.log("Cloudinary upload result:", fileUploadResult);

        res.status(201).json({
            msg: "Food item created",
            
            food: foodItem
        });
    } catch (err) {
        console.error("Error in createFood:", err);
        res.status(500).json({ msg: "Server error" });
    }
}

async function getFoodItems(req, res) {
    const foodItems = await foodModel.find({});
    res.status(200).json({
        msg: "Food items fetched successfully",
        foodItems
    })

}

module.exports = { createFood, getFoodItems };
