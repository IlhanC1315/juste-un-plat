const Difficulty = require('../models/difficultySchema');
const EstimatedCost = require('../models/EstimatedCostSchema');
const Occasion = require('../models/OccasionSchema');
const Season = require('../models/SeasonSchema');
const MainIngredient = require('../models/MainIngredient');
const CookingMethod = require('../models/CookingMethodSchema');
const Tool = require('../models/ToolSchema');
const Categorys = require('../models/categorySchema');
const Diet = require('../models/dietSchema');
const Origins = require('../models/originSchema');

const seeds = [
  { model: Difficulty, values: ['Facile', 'Moyen', 'Difficile'] },
  { model: EstimatedCost, values: ['Économique', 'Moyen', 'Élevé'] },
  { model: Occasion, values: ['Repas quotidien','Fête de famille','Ramadan','Noël','Anniversaire','Saint-Valentin','Pique-nique','Dîner romantique','Réveillon','Petit dej / Brunch','Apéritif','Entrées','Déssert','Accompagnements'] },
  { model: Season, values: ['Printemps','Été','Automne','Hiver','Toutes saisons'] },
  { model: MainIngredient, values: ['Viande de boeuf','Viande de poulet',"Viande d'agneau",'Poisson','Fruits de mer','Légumes','Fromage','Oeufs','Riz','Pâtes','Légumineuses','Fruits','Chocolat','Yaourt','Pain','Viande de porc','Viande de veau'] },
  { model: CookingMethod, values: ['Sans cuisson','Cuisson au four','Cuisson à la poêle','Friture','Vapeur','Grillé / Barbecue','Cuisson lente',"Cuisson à l'eau",'Micro-ondes'] },
  { model: Tool, values: ['Casserole','Poêle','Four','Friteuse','Blender','Mixeur','Cuiseur vapeur','Grillé-pain','Micro-ondes','Robot de cuisine','Batteur électrique','Moule à gateau','Plat à gratin','Saladier','Râpe'] },
  { model: Categorys, values: ['Entrées','Plat principale','Accompagnements','Dessert','Snack / Fast-Food','Soupe et Veloutes','Salade','Petit dej / Brunch','Apéritif','Boisson','Sauce','Pays'] },
  { model: Diet, values: ['Omnivore','Végétarien','Vegan','Pescétarien','Sans gluten','Sans lactose','Halal','Casher'] },
  { model: Origins, values: ['Turquie','France','Italie','Espagne','Liban','Grèce','Maroc','Tunisie','Algerie','Inde','Japon','Chine','Corée','Mexique','USA','Thailande','Vietnam','Allemagne','Russie','Brésil','Hongrie','Australie','Venezuela'] },
];

async function seedEnums() {
    for (const { model, values } of seeds) {
        for (const name of values) {
            const exists = await model.findOne({ name })
            if(!exists) {
                await model.create({ name });
                console.log(`${model.modelName}: ${name}`);
            }
        }
    }
    console.log('Toutes les enum sont envoyer a la base de données')
}

module.exports = seedEnums;
