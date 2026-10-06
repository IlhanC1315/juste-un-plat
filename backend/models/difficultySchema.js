const mongoose = require('mongoose');

const DifficultySchema = new mongoose.Schema({
    name: {
        type: String,
        enum: [
            'Facile',
            'Moyen',
            'Difficile'
        ],
        required: true,
        unique: true
    }   
});

module.exports = mongoose.model('Difficulty', DifficultySchema)