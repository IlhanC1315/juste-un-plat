const Recipe = require('../models/recette');
const path = require('path')
const Difficulty = require('../models/difficultySchema');
const EstimatedCost = require('../models/EstimatedCostSchema');
const Occasion = require('../models/OccasionSchema');
const Season = require('../models/SeasonSchema');
const MainIngredient = require('../models/MainIngredient');
const CookingMethod = require('../models/CookingMethodSchema');
const NutritionValue = require('../models/nutritionValuesSchema');
const Category = require('../models/categorySchema');
const Diet = require('../models/dietSchema');
const Origin = require('../models/originSchema');
const User = require('../models/UserSchema');
const ToolSchema = require('../models/ToolSchema');

exports.getCategories = async () => { return await Category.find().select('_id name'); }
exports.getDifficulties = async () => { return await Difficulty.find(); }
exports.getEstimatedCosts = async () => { return await EstimatedCost.find(); }
exports.getOccasions = async () => { return await Occasion.find(); }
exports.getSeasons = async () => { return await Season.find(); }
exports.getMainIngredients = async () => { return await MainIngredient.find(); }
exports.getCookingMethods = async () => { return await CookingMethod.find(); }
exports.getTools = async () => { return await ToolSchema.find(); }
exports.getDiets = async () => { return await Diet.find(); }
exports.getOrigins = async () => { return await Origin.find(); }

//POST 

exports.createRecipe = async (data, file) => {
    //si une image est envoye alors on récupère son chemin
    const imageUrl = file ? `/uploads/${file.filename}` : "";
    const recette = new Recipe({
        ...data,
        recipeImage: imageUrl
    });
    return await recette.save();
};

//GET
const champPopulate = [
    { path: 'difficulty', select: 'name' },
    { path: 'estimated_cost', select: 'name' },
    { path: 'occasion', select: 'name' },
    { path: 'season', select: 'name' },
    { path: 'mainIngredient', select: 'name' },
    { path: 'cookingMethod', select: 'name' },
    { path: 'required_tools', select: 'name' },
    { path: 'nutritionValues', select: 'name' },
    { path: 'category', select: 'name' },
    { path: 'diet', select: 'name' },
    { path: 'origin', select: 'name' },
    { path: 'userCreated', select: 'userName alias' }
];

exports.getAllRecipe = async () => {
    return await Recipe.find()
        .populate(champPopulate)
};

exports.findRecipeById = async (id) => {
    return await Recipe.findById(id).populate(champPopulate);
};

exports.findRecipeByName = async (name) => {
    const recipe = await Recipe.findOne({ recipeName: name });
    if (!recipe) throw new Error('Recette introuvable');
    return recipe;
};

exports.getRecipesPaginated = async (page, limit) => {
    const skip = (page - 1) * limit;
    return await Recipe.find()
        .populate(champPopulate)
        .sort({ createdAt: -1 }) // trie du recent au plus ancien 
        .skip(skip) // ignorer les recettes précédentes
        .limit(limit);   //limiter le nombre 
};

exports.getRecipeByUser = async (userId, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    return await Recipe.find({ userCreated: userId })
        .populate(champPopulate)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
};

exports.getRecipesByFilters = async (filters = {}, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    return await Recipe.find(filters)
        .populate(champPopulate)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
};

exports.getRecipesByCategory = async (catId) => {
    return await Recipe.find({ category: catId })
        .populate(champPopulate)
        .sort({ createdAt: -1 });
};

exports.getRecipesByTotalTime = async (maxTotalTime, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    return await Recipe.aggregate([
        { $addFields: { total_time: { $add: ["$prep_time", "$cook_time"] } } },
        { $match: { total_time: { $lte: maxTotalTime } } },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit }
    ]);
};

//fonction qui récupere les recettes tendances de la semaine 
exports.getTrendingRecipesWeekly = async (limit = 10) => {
    const onWeekAgo = new Date();
    //je créer un objet date avec la date et l'heure au moment ou la fonction est appelée je la stock ensuite 
    onWeekAgo.setDate(onWeekAgo.getDate() - 7)
    //setDate modifie l'objet (je get ma date donc ce que j'ai stocker juste avant et je retire 7 ce qu'il me donne "il y a une smaine avant")
    //en gros j'ai créer mon filtre 
    return await Recipe.find({
        createdAt: { $gte: onWeekAgo } //$gte veut dire "supérieur ou égal"
    }) //j'utilise mon filtre ici quand je find les recettes avec donc le createdAt : il y a 1 semaine 
    .sort({ views: -1 })  //sort pour trier par view donc et -1 pour tri décroissant (les plus vues en premier)
    .limit(limit)  //mettre la limite de recettes a afficher et evité d'envoiyer 100 recettes 
    .populate(champPopulate)
};

//fonctions get les recettes les plus vue de tout les temps 
exports.getMostViewedRecipesAllTime = async (limit = 10) => {
    return await Recipe.find()
        .sort({ views: -1 })
        .limit(limit)
        .populate(champPopulate)
}

//PUT

exports.updateRecipeById = async (id, data) => {
    return await Recipe.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

exports.updateRecipeByName = async (name, data) => {
    return await Recipe.findOneAndUpdate({ recipeName: name }, data, { new: true, runValidators: true });
};

exports.patchRecipe = async (id, updates) => {
    return await Recipe.findByIdAndUpdate(id, { $set: updates }, { new: true, runValidators: true }); //set permet de mettre a jour uniquement les champs modifer
};

exports.incrementRecipeViews = async (id) => {
    return await Recipe.findByIdAndUpdate(
        id,
        { $inc: { views: 1 } }, //$inc operation mongoose pour incrémenter un nombre => il va ajouter 1 a views donc  
        { new: true } //renvoie le document apres mise a jour 
    );
};

// DELTE

exports.deleteRecipe = async (id) => Recipe.findByIdAndDelete(id);

exports.deleteRecipeAllData = async (id) => {
    await Recipe.findByIdAndDelete(id);
    return { message: "Recette supprimée avec succès" };
};

exports.getMostViewedRecipes = async (limit = 10) => {
    return await Recipe.find()
        .sort({ views: -1 })
        .limit(limit)
        .populate(champPopulate);
};

exports.createManyRecipe = async (datas) => Recipe.insertMany(datas);