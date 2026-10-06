const mongoose = require('mongoose');

const GenderSchema = new mongoose.Schema({
    name:{
        type: String,
        enum: [
            'Homme',
            'Femme',
            'Autres'
        ],
        required: true
    }
})

module.exports = mongoose.model('Gender', GenderSchema)