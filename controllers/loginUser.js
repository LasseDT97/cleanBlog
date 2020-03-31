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
Hvis ikke det er den samme redirecter den tilbage til login siden */
    User.findOne({username:username}, (error, user) =>{
        if (user) {
            bcrypt.compare(password, user.password, (error, same) =>{
                if (same) {
                    res.redirect('/')
                }
            })
        }
        else {
            res.redirect('/auth/login')
        }
    })
};