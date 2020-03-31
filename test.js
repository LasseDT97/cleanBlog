const mongoose = require('mongoose');

//Importerer BlogPost ved stien. BlogPost repræsenterer BlogPosts collectionen
const BlogPost = require('./models/BlogPost');

//Vi connector til databasen. Hvis my_database ikke findes, bliver den oprettet
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser:true});

//Vi laver et blogpost ved .create funktionen
BlogPost.create({
    titel:"The Mythbuster's Guide to Saving Money on Energy Bills",
    body: "If you have been here a long time, you might remember when I went on ITV Tonight " +
        "to dispense a masterclass in saving money on energy bills. Energy-saving is one of my favourite money topics," +
        " because once you get past the boring bullet-point list, a whole new world of thrifty nerdery opens up. " +
        "You know those bullet-point lists. You start spotting them everything at this time of year. " +
        "They go like this:"
/* Call-back funktion der bliver kaldt når .create er eksekveret
Den giver en error hvis der var en under .create, returnerer samtidig det nye blogpost*/
}, (error, blogpost) =>{
    console.log(error, blogspot)
});

/* For at finde alle documents i BlogPosts collection bruger vi .find metoden
som query filter parameter i et tomt document */
BlogPost.find({}, (error, blogpost) => {
    console.log(error,blogpost)
})

/* Vi kan også finde titel på et docuement i collection ved at bruge .find metoden
og søge efter title: 'The mythbusters...'*/
BlogPost.find({
    title: "The Mythbuster's Guide to Saving Money on Energy Bills"
}, (error, blogspot) =>{
    console.log(error, blogspot)
});

//Vi kan også lede efter et bestemt ord i en titel ved nedenstående metode (brug af /)
BlogPost.find({
    title:/The/}, (error, blogspot) =>{
    console.log(error, blogspot)
});

// Til sidst kan vi finde det ved et unikt ID ved findById metoden
var id = "5e7b3812ac772f68e559acb9";

BlogPost.findById(id, (error, blogspot) =>{
    console.log(error, blogspot)
});

/* Vi kan opdatere en record ved findByIdAndUpdate metoden
først giver vi et id og derefter de fields/values der skal opdateres */

var id = "5e7b3569891d5966aff1a763";

BlogPost.findByIdAndUpdate(id, {
    title: 'Updated Test Title'
}, (error,blogspot) =>{
    console.log(error,blogspot)
});

/* Det samme kan gøres for at slette med metoden findByIdAndDelete.
Her gives Id som argument */

var id = "5e7b33cc4d404764b2999f4d";

BlogPost.findByIdAndDelete(id, (error, blogspot) =>{
    console.log(error, blogpost)
});
