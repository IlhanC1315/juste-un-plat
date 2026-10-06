const mongoose = require('mongoose');

// Formate les erreurs de validation de champs Mongoose de la manière que l'on veut pour cacher l'utilisation de MongoDB
let createValidationFieldsError = function (error, options) {
    let keys_error = Object.keys(error.errors) // Variable qui récupère les noms des champs en erreur
    let error_formated = error.errors // Variable qui ne contient qu'un accès direct aux informations d'erreur
    let object_error = {} // Objet vide qui contiendra le détail des erreurs
    keys_error.forEach((element) => {
        object_error[element] = error_formated[element].message // Copie le message associé à chaque champ
    })
    return object_error
};

// Normalise les différents types d'erreurs mongoose en un format commun
let parsingMongooseError = function (error, options) {
    if (error instanceof mongoose.Error.ValidationError) {
        // Erreur de validation : on renvoie le détail des champs invalides
        var field_errors = createValidationFieldsError(error, options)
        return { type: 'NOT_VALID', message: 'Le schéma est incorrect.', fields: field_errors }
        /*  {fields: { <champs en erreur>: 'Le champs est requis' }}  */
    }
    else if (error && error.code == 11000) {
        // Doublon d'un champ unique (le code 11000 est envoyé par MongoDB et non par mongoose, il faut le traiter autrement)
        return { type: 'DUPLICATE', message: "Un champ n'est pas unique.", fields: error.keyValue }
    }
    else if (error instanceof mongoose.Error.CastError) {
        // Problème de conversion d'un champ, type non adapté pour la value du field (ex: ObjectId invalide)
        return { type: 'NOT_VALID_CAST', message: 'Un champ ne dispose pas du bon format.', fields: {[error.path]: error.reason.message} }
    }
    console.log("Cas d'erreur Mongoose non géré")
    return error
};


// Point d'entrée pour parser toutes les erreurs métiers, seule fonction qu'on exporte et qu'on utilisera dans les autres fichiers
module.exports.parsingError = function (error, options) {
    if ((error instanceof mongoose.Error) || (error && error.code == 11000)) {
        // Si l'erreur vient de mongoose, on la normalise
        return parsingMongooseError(error, options)
    }
    console.log("Cas d'erreur non géré")
    return error
};