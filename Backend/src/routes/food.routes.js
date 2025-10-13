const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware")
const foodController = require("../Controllers/food.controllers")
const multer = require('multer');

const upload= multer({
    storage : multer.memoryStorage(),
})

// POST /api/food [protected]
router.post('/', authMiddleware.authFoodPartnerMiddleware,upload.single("video"), foodController.createFood)

// GET /api/food/ protected
router.get('/', authMiddleware.authUserMiddleware, foodController.getFoodItems)


module.exports = router