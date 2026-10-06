const mongoose = require('mongoose');

const DietSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: [
            'Omnivore',
            'Végétarien',
            'Vegan',
            'Pescétarien',
            'Sans gluten',
            'Sans lactose',
            'Halal',
            'Casher'
        ],
    }
})

module.exports = mongoose.model('Diet', DietSchema);
