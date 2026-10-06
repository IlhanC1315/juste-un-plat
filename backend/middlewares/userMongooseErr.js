exports.traducteurMongooseError = (err) => {
    //erreur de validation de createUser (champs manquants ou mal formés)
    if (err.name === 'ValidationError') {
        
    }
}