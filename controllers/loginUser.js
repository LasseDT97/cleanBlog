//Imorterer bcrypt og user modellen.
const bcrypt = require('bcrypt');
const User = require('../models/User');

//Henter username og password fra login form ved req.body
module.exports = (req, res) =>{
    const { username, password} = req.body;

/* Bruger User.findOne til at finde KUN en bruger med inputted username.
Hvis den findes fortsætter vi med at sammenligne passworded.
Vi bruger bcrypt og ikke === for at undgå hacking
Hvis det er det samme redirecter den tilbage til index.ejs
Hvis ikke det er den samme redirecter den tilbage til login siden
Vi assigner user._id til session'en

Session pakken gemmer denne data på userens browser så hver gang brugeren laver en request
vil cookien blive sendt tilbage til serveren med godkendte id. Sådan ved vi brugeren er logget ind */
    User.findOne({username:username}, (error, user) =>{
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    req.session.userId = user._id;
                    res.redirect('/')
                }
                else {
                    res.redirect('/auth/login')
                }
            })
        }
        else {
            res.redirect('/auth/login')
        }
    })
};