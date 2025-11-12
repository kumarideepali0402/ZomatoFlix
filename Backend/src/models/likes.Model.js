const mongoose = require('mongoose');
const likesSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        typeof: 'user',
        required:true
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        typeof: 'food',
        required: true
    }
},{
        timestamps: true
    })