const mongoose = require('mongoose');

const MainIngredient = new mongoose.Schema({
    name:{
        type: String,
        enum: [
            'Viande de boeuf',
            'Viande de poulet',
            "Viande d'agneau",
            'Poisson',
            'Fruits de mer',
            'Légumes',
            'Fromage',
            'Oeufs',
            'Riz',
            'Pâtes',
            'Légumineuses',
            'Fruits',
            'Chocolat',
            'Yaourt',
            'Pain',
            'Viande de porc',
            'Viande de veau'
        ],
    }
})

module.exports = mongoose.model('MainIngredient', MainIngredient)