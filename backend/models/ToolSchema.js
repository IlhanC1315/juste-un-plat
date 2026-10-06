const mongoose = require('mongoose');

const ToolSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: [
            'Casserole',
            'Poêle',
            'Four',
            'Friteuse',
            'Blender',
            'Mixeur',
            'Cuiseur vapeur',
            'Grillé-pain',
            'Micro-ondes',
            'Robot de cuisine',
            'Batteur électrique',
            'Moule à gateau',
            'Plat à gratin',
            'Saladier',
            'Râpe'
        ]
    }
});

module.exports = mongoose.model('Tool', ToolSchema)