// // create serrver
// const express = require("express");
// const cookieParser = require('cookie-parser');
// const authRoutes = require('./routes/auth.routes')
// const foodRoutes = require('./routes/food.routes')
// const foodPartnerRoutes = require('./routes/food-partner.routes')
// const cors = require("cors")

// const app = express();
// app.use(cors({
//     origin:"http://localhost:5173",
//     credentials: true
// }))
// app.use(cookieParser());
// app.use(express.json());


// app.get("/",(req, res)=>{
//     res.send("Hello World")
// })
// app.use('/api/auth', authRoutes);
// app.use('/api/food', foodRoutes);
// app.use('/api/food-partner', foodPartnerRoutes)

// module.exports = app

const express = require("express");
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes')
const foodRoutes = require('./routes/food.routes')
const foodPartnerRoutes = require('./routes/food-partner.routes')
const cors = require("cors")

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World")
});

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/food-partner', foodPartnerRoutes);

// Alternative 404 handler - more explicit
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.originalUrl} not found`
    });
});

// 🔧 FIXED: Global Error Handling Middleware - MUST BE LAST
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

module.exports = app;
