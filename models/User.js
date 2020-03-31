const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Importere bcrypt pakken i User.js
const bcrypt = require('bcrypt');

/*Bruger Schema til at oprette en datamodel.
Collection repræsenterer en entity.
Schema repræsenterer hvordan collection ser ud.
Altså vil hvert Document i Collection have felterne fra Schema.*/
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});
/*
Med UserSchema.pre fortæller vi mongoose at før vi gemmer noget i vores UserSchema
eller Users collection skal vi køre funktionen givet i 2. argument.
Det tillader os at lave ændringer til user data før vi gemmer i databasen.

I funktionen gemmer vi først brugeren ved const user = this.
Mongoose frigør UserSchema via this. */
UserSchema.pre('save', function(next){
    const user = this;
/*
Vi kalder herefter bcrypt.hash hvis første argument er håndtering af password.
Hash betyder små bider. Andet argument fortæller hvor mange gange passwordet skal krypteres (10).
Jo flere gange hash, des sikrerer men også langsommere.
Tredje argument bliver kaldt når hash er færdig. user.password = hash erstatter origianl med nyt pw.
Til sidst kaldes next for at mongoose kan fortsætte med at lave user data.
 */
    bcrypt.hash(user.password, 10, (error, hash) =>{
        user.password = hash;
        next()
    })
});

/* Vi tilgår databsen via mongoose.model.
Name henviser til collection navnet i flertal (BlogPosts) */
const User = mongoose.model('User', UserSchema);

//Eksporter BlogPost så andre filer kan grabbe den.
module.exports = User;