const mongoose = require('mongoose');
function connectDB() {
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("DB connected");
        
    })
    .catch(()=>{
        console.log("mongodb err in connection", err);
        
    })

}

module.exports = connectDB;