const mongoose = require('mongoose');

const OrigineSchema = new mongoose.Schema({
    name: {
        type: String, 
        enum: [
            'Turquie',
            'France',
            'Italie',
            'Espagne',
            'Liban',
            'Grèce',
            'Maroc',
            'Tunisie',
            'Algerie',
            'Inde',
            'Japon',
            'Chine',
            'Corée',
            'Mexique',
            'USA',
            'Thailande',
            'Vietnam',
            'Allemagne',
            'Russie',
            'Brésil',
            'Hongrie',
            'Australie',
            'Venezuela'
        ],
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('Origins', OrigineSchema)