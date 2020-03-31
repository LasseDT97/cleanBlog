/*
Indledende kommentarer:
    Dette er index.js der er hovedsæde for alle de andre .js filer og holder styr på filstrukturen.
    Hver gang vi bruger = require('xxxxx') vil vi i den fil eller node_modules pakke have en module.exports
    På den måde kan vi importere klasser/funktioner og bruge dem i funktioner her på denne side.

    For at denne application fungerer skal man hente følgende node_modules mm.:
        1. node (node -v)
        2. npm aka. node package manager (npm -v)
        3. express (gå til npmjs.com og så på express. Følg guide til installation
        4. package.json (installeres på følgende måde:
            a. run i terminal "npm install express"
            b. npm init
            c. press enter for all questions
            d. type "yes" (optional)
            e. run i terminal "npm install express"
            f. Tjek din mappe "node_modules for at se alle de ovenstående pakker er der
       5. https://startbootstrap.com/themes/clean-blog/:
            a. Download Zip fil og lav en ny folder med projektet
            b. Gå til terminalen på din mac
            c. Skriv den absolutte sti til folderen du lige har downloadet og bruger som projekt
            d. run "npm  init og sig 'yes' til alle de spørgsmål der kommer for at oprette package.json
            e. herefter run "npm install express
       6. nodemon (automatic server restart)
            a. I interpreter terminalen kør "npm install nodemon --save-dev"
            b. for at starte nodemon (automatisk opdatering af kode kør "nodemon start" i terminalen
       7. ejs (Embedded JavaScript)
            a. Run "npm install ejs --save"
       8. MongoDB
            a. Gå til MongoDB hjemmeside og download MongoDB compass (ikke online versionen)
            b. run "brew tap mongodb/brew"
            c. run "brew install mongodb-community@4.0"
            d. for at starte MongoDB - run "mongod --config /usr/local/etc/mongod.conf
        9. Mongoose
            a. Run "npm install mongoose"
        10. body-parser
            a. run npm install body-parser
        11. Express FileUpload
            a. run "npm install --save express-fileupload"
 */

//Importerer express modulet.
const express = require('express');
//Importerer mongoose modulet.
const mongoose = require('mongoose');

/*Vi definerer en connection med mongoos.connect der tager parametrene host og database
Vi bruger localhost da databasen på nuværende tidspunkt er lokal.
Vi bruger også navnet my_database. MongoDB opretter automatisk denne */
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser:true});

const app = new express();
app.use(express.static('public'));

const ejs = require('ejs');
/*fortæller express skal bruge EJS som template engine og alle
filer der ender på .ejs skal hentes med EJS pakken */
app.set('view engine', 'ejs');

// Importerer middleware body-parser
// body.parser samler incoming request bodies og laver data fra formen tilgængelig for req.body propertien.
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//express-fileupload pakke til upload af mulitmedia
const fileUpload = require('express-fileupload');
app.use(fileUpload());

//Importerer modulet vi selv har lavet (den indeholder vores validation af formen).
const validateMiddleware = require('./middleware/validationMiddleware');
// Beder validateMiddleware om at køre inden posts/store
// posts/store referer til storePost.js som bruger BlogPost.js til at gemme data fra form + billede
app.use('/posts/store', validateMiddleware);

// Beder homeController variablen om at hente dens sti.
const homeController = require('./controllers/home');
app.get('/', homeController);

// Beder getPostController variablen om at hente dens sti.
const getPostController = require('./controllers/getPost');
app.get('/post/id:', getPostController);

// Beder storePostController variablen om at hente dens sti.
const storePostController = require('./controllers/storePost');
app.post('/posts/store', storePostController);

// Beder about variablen om at hente dens sti.
const about = require('./controllers/about');
app.get('/about', about);

// Beder contact variablen om at hente dens sti.
const contact = require('./controllers/contact');
app.get('/contact', contact);

// Beder newPostController variablen om at hente dens sti.
const newPostController = require('./controllers/newPost');
app.get('/posts/new',newPostController);

//Lytter på port 4000 af localhost og consol.logger en besked
app.listen(4000, ()=>{
    console.log('App listening on port 4000')
});