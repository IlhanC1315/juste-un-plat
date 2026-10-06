const recipeService = require('../services/recipeService');

// Permet de convertir une string JSON en tablleau 
function parseJSON(champ) {
    try {
        return typeof champ === "string" ? JSON.parse(champ) : champ;
    } catch {
        return [];
    }
};

exports.createRecipe = async (req, res) => {
    try {
        const file = req.file;
        const cleanData = {
            ...req.body,
            ingredientEtapes: parseJSON(req.body.ingredientEtapes),
            prepEtape: parseJSON(req.body.prepEtape) // transforme en tableau 
        };
        const recette = await recipeService.createRecipe(cleanData, file);
        res.status(201).json(recette);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
};

exports.getCategories = async (req, res) => {
    try { res.json(await recipeService.getCategories()); }
    catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getDifficulties = async (req, res) => {
    try { res.json(await recipeService.getDifficulties()); }
    catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getEstimatedCosts = async (req, res) => {
    try { res.json(await recipeService.getEstimatedCosts()); }
    catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getOccasions = async (req, res) => {
    try { res.json(await recipeService.getOccasions()); }
    catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getSeasons = async (req, res) => {
    try { res.json(await recipeService.getSeasons()); }
    catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getMainIngredients = async (req, res) => {
    try { res.json(await recipeService.getMainIngredients()); }
    catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getCookingMethods = async (req, res) => {
    try { res.json(await recipeService.getCookingMethods()); }
    catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getTools = async (req, res) => {
    try { res.json(await recipeService.getTools()); }
    catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getDiets = async (req, res) => {
    try { res.json(await recipeService.getDiets()); }
    catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getOrigins = async (req, res) => {
    try { res.json(await recipeService.getOrigins()); }
    catch (err) { res.status(500).json({ message: err.message }); }
};

//get

exports.getAllRecipe = async (req, res) => {
    try {
        const recipes = await recipeService.getAllRecipe();
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getRecipeById = async (req, res) => {
    try {
        const recipe = await recipeService.findRecipeById(req.params.id);
        if (!recipe) return res.status(404).json({ message: "Recette introuvable" });
        //incrémentation de vue lors du get
        recipeService.incrementRecipeViews(req.params.id)
            .catch(err => console.error("Erreur incrément views :", err)); //si erreur lors de incrementation envoie de l'erreur 
        res.status(200).json(recipe);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getRecipeByName = async (req, res) => {
    try {
        const recipe = await recipeService.findRecipeByName(req.params.name);
        res.status(200).json(recipe);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

exports.getRecipesPaginated = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const recipes = await recipeService.getRecipesPaginated(
            parseInt(page),
            parseInt(limit)
        );
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getRecipesByUser = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const recipes = await recipeService.getRecipeByUser(
            req.params.userId,
            parseInt(page),
            parseInt(limit)
        );
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getRecipesByFiltres = async (req, res) => {
    try {
        const { page = 1, limit = 10, ...filters } = req.query;
        const recipes = await recipeService.getRecipesByFilters(
            filters,
            parseInt(page),
            parseInt(limit)
        );
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getRecipesByCategory = async (req, res) => {
    try {
        const recipes = await recipeService.getRecipesByCategory(req.params.id);
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getRecipesByTotalTime = async (req, res) => {
    try {
        const { maxTotalTime, page = 1, limit = 10 } = req.query;
        if (!maxTotalTime) return res.status(400).json({ message: "maxTotalTime requis" });
        const recipes = await recipeService.getRecipesByTotalTime(
            parseInt(maxTotalTime),
            parseInt(page),
            parseInt(limit)
        );
        res.status(200).json(recipes);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getMostViewedRecipes = async (req, res) => {
    try {
        const recipes = await recipeService.getMostViewedRecipes(10);
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//HomePage fonction afficher les tendances et les plus populaires

exports.getHomePageData = async (req, res) => {
    try {
        const trending = await recipeService.getTrendingRecipesWeekly(10)
        const topAllTime = await recipeService.getMostViewedRecipesAllTime(10)
        return res.status(200).json({
            trendingWeekly: trending,
            topRecipesAllTime: topAllTime
        });// j'envoie au front un objet avec les 2 tableaux variables c'est pour envoyer une seul reponse res par requetes et que les 2 variables soit séparer plus pro 
    } catch (err) {
        console.error("Erreur getHomePageData :", err);
        return res.status(500).json({ meesage: "erreur serveur" });
    }
};

exports.updateRecipeById = async (req, res) => {
    try {
        const data = {
            ...req.body,
            ingredientEtapes: parseJSON(req.body.ingredientEtapes),
            prepEtape: parseJSON(req.body.prepEtape)
        };
        if (req.file) data.recipeImage = `/uploads/${req.file.filename}`;
        const updated = await recipeService.updateRecipeById(req.params.id, data);
        if (!updated) return res.status(404).json({ message: "Recette introuvable" });
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.patchRecipe = async (req, res) => {
    try {
        const updated = await recipeService.patchRecipe(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: "Recette introuvable" });
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteRecipe = async (req, res) => {
    try {
        const deleted = await recipeService.deleteRecipe(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Recette introuvable" });
        res.status(200).json({ message: "Recette supprimée" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteRecipeAllData = async (req, res) => {
    try {
        const response = await recipeService.deleteRecipeAllData(req.params.id);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
