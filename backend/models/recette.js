const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
  ingredientName: String,
  measurementUnit: String,
  quantity: Number
}, { _id: false });

const IngredientEtapeSchema = new mongoose.Schema({
  nameEtape: String,
  ingredient: [IngredientSchema]
}, { _id: false });

const PrepEtapeSchema = new mongoose.Schema({
  namePrepEtape: String,
  numberEtape: Number,
  instruction: String
}, { _id: false });

const recetteSchema = new mongoose.Schema({
  recipeImage: { type: String, required: false }, 
  recipeName: { type: String, required: true }, 
  prep_time: { type: Number, required: true }, 
  cook_time: { type: Number, required: true }, 
  difficulty: { type: mongoose.Schema.Types.ObjectId, ref:'Difficulty' }, 
  servings: { type: Number }, 
  estimated_cost: { type: mongoose.Schema.Types.ObjectId, ref:'EstimatedCost' },
  occasion: [{ type: mongoose.Schema.Types.ObjectId ,ref:'Occasion' }],
  season: [{ type: mongoose.Schema.Types.ObjectId, ref:'Season' }],
  mainIngredient: [{ type: mongoose.Schema.Types.ObjectId, ref:'MainIngredient' }],
  cookingMethod: [{ type: mongoose.Schema.Types.ObjectId, ref:'CookingMethod' }],
  required_tools: [{ type: mongoose.Schema.Types.ObjectId ,ref:'Tool' }],
  description: { type: String, required: true }, 
  ingredientEtapes: [IngredientEtapeSchema], 
  prepEtape: [PrepEtapeSchema], 
  chefTips: { type: String },
  nutritionValues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NutritionValues' }],
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Categorys' },
  diet: { type: mongoose.Schema.Types.ObjectId, ref:'Diet' },
  origin: { type: mongoose.Schema.Types.ObjectId, ref: 'Origins' },
  userCreated: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  views: { type: Number, default: 0, min: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Recette', recetteSchema);