const mongoose = require('mongoose');

const EstimatedCostSchema = new mongoose.Schema({
    name:{
        type: String,
        enum: ['Économique', 'Moyen', 'Élevé'],
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('EstimatedCost', EstimatedCostSchema)