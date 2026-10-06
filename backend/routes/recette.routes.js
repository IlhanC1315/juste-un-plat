const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recette.controller');
const upload = require('../middlewares/upload');

//seeders
router.get('/categories', recipeController.getCategories);
router.get('/difficulties', recipeController.getDifficulties);
router.get('/estimatedCosts', recipeController.getEstimatedCosts);
router.get('/occasions', recipeController.getOccasions);
router.get('/seasons', recipeController.getSeasons);
router.get('/mainIngredients', recipeController.getMainIngredients);
router.get('/cookingMethods', recipeController.getCookingMethods);
router.get('/tools', recipeController.getTools);
router.get('/diets', recipeController.getDiets);
router.get('/origins', recipeController.getOrigins);

//post
router.post('/', upload.single('recipeImage'), recipeController.createRecipe);

//get
router.get('/most-viewed', recipeController.getMostViewedRecipes);
router.get('/', recipeController.getAllRecipe);
router.get('/category/id/:id', recipeController.getRecipesByCategory);
router.get('/name/:name', recipeController.getRecipeByName);
router.get('/pagination/list', recipeController.getRecipesPaginated);
router.get('/user/:userId', recipeController.getRecipesByUser);
router.get('/filtres/search', recipeController.getRecipesByFiltres);
router.get('/search/by-time', recipeController.getRecipesByTotalTime);
router.get('/homepage', recipeController.getHomePageData);
router.get('/:id', recipeController.getRecipeById);

//put
router.put('/:id', upload.single('recipeImage'), recipeController.updateRecipeById);
router.patch('/:id', recipeController.patchRecipe);

//delete
router.delete('/:id', recipeController.deleteRecipe);
router.delete('/all/:id', recipeController.deleteRecipeAllData);

module.exports = router;