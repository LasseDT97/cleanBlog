const User = require('../models/User');

/*Vi henter user fra databasen ved User.findById. Vi tjekker derefter
om brugeren er hentet succesfuldt eller om brugeren ikke eksisterer.
Vi vil henholdsvis gå videre med next() eller redirecte tilbage til homepage */
module.exports = (req, res, next) => {
    User.findById(req.session.userId, (error, user) =>{
        if (error || !user);
        return res.redirect('/');
        next()
    })
};