const mongoose = require('mongoose');

const CookingMethodSchema = new mongoose.Schema({
    name:{
        type: String,
        enum: [
            'Sans cuisson',
            'Cuisson au four',
            'Cuisson à la poêle',
            'Friture',
            'Vapeur',
            'Grillé / Barbecue',
            'Cuisson lente',
            "Cuisson à l'eau",
            'Micro-ondes'
        ]
    }
})

module.exports = mongoose.model('CookingMethod', CookingMethodSchema);