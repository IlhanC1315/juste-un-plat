const mongoose = require('mongoose');

const UserRecipeListe = new mongoose.Schema({
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recette",
        required: true
    },
      addedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('UserRecipeList', UserRecipeListe);