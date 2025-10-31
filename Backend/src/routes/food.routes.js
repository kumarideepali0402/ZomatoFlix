// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../middlewares/auth.middleware")
// const foodController = require("../Controllers/food.controllers")
// const multer = require('multer');

// const upload= multer({
//     storage : multer.memoryStorage(),
// })

// // POST /api/food [protected]
// router.post('/',upload.single("video"), authMiddleware.authFoodPartnerMiddleware, foodController.createFood)

// // GET /api/food/ protected
// router.get('/', authMiddleware.authUserMiddleware, foodController.getFoodItems)


// module.exports = router
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware")
const foodController = require("../Controllers/food.controllers")
const multer = require('multer');

// Enhanced multer configuration
const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('video/')) {
            cb(null, true);
        } else {
            cb(new Error('Only video files are allowed'), false);
        }
    },
    limits: {
        fileSize: 100 * 1024 * 1024 // 100MB limit
    }
});

// POST /api/food [protected] - CORRECT ORDER
router.post('/', 
    authMiddleware.authFoodPartnerMiddleware,  // Authentication first
    upload.single("video"),                    // File upload after
    foodController.createFood
);

// GET /api/food/ protected
router.get('/', 
    authMiddleware.authUserMiddleware, 
    foodController.getFoodItems
);


module.exports = router;