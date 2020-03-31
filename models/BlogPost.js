const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*Bruger Schema til at oprette en datamodel.
Collection repræsenterer en entity.
Schema repræsenterer hvordan collection ser ud.
Altså vil hvert Document i Collection have felterne fra Schema.*/
const BlogPostSchema = new Schema({
    title: String,
    body: String,
    username: String,
    datePosted:{
        type: Date,
        default: new Date()
    },
    image: String
});

/* Vi tilgår databsen via mongoose.model.
Name henviser til collection navnet i flertal (BlogPosts) */
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

//Eksporter BlogPost så andre filer kan grabbe den.
module.exports = BlogPost;