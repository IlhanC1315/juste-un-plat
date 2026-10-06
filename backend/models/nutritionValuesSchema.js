const mongoose = require('mongoose');

const nutritionValuesSchema = new mongoose.Schema({
    nameValues: 
    {
        type: String
    },
    values: 
    {
        type: String 
    },
})

module.exports = mongoose.model('NutritionValues', nutritionValuesSchema)