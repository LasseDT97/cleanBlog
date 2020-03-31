/* next() kalder alle
const customMiddleWare = (req, res, next) =>{
    console.log('Custom middle ware called');
    next()
};
app.use(customMiddleWare);


//get request på / og ref til filnavn
app.get('/', async (req, res)=>{
    const blogposts = await BlogPost.find({
        //timeStamp: "18:00"
        //date:
    });
    //res.sendFile(path.resolve(__dirname,'views/index.ejs'))
    //res.render sender et view til brugeren
    res.render('index', {
        blogposts
    });
    //console.log(blogposts)
});

KUNNE VÆRE MAN IKKE SKULLE SLETTE DET HER

//get request på /post og ref til filnavn
post/:id henter routen fra et single post (post Id)
req.param.id printer key-value parametren i post i routen
findById finder parametren for det specifikke post
app.get('/post/:id', async (req, res)=>{
    const blogpost = await BlogPost.findById(req.params.id);
    //res.sendFile(path.resolve(__dirname,'views/post.ejs'))
    //res.render sender et view til brugeren
    res.render('post',{
        blogpost
    });
});

//udkommenteret gammel kode
//get request på /about og ref til filnavn
app.get('/about',(req, res)=>{
    //res.sendFile(path.resolve(__dirname,'views/about.ejs'))
    //res.render sender et view til brugeren
    res.render('about');
});

//get request på /contact og ref til filnavn
app.get('/contact',(req, res)=>{
    //res.sendFile(path.resolve(__dirname,'views/contact.ejs'))
    //res.render sender et view til brugeren
    res.render('contact');
});

//udkommenteret gammel kode det fra ovenover
//get request på /contact og ref til filnavn
app.get('/posts/new',(req, res)=>{
    //res.sendFile(path.resolve(__dirname,'views/contact.ejs'))
    //res.render sender et view til brugeren
    res.render('create');
});

// udkommenteret for at lave en ny efterfølgende
// Nedenstående funktion henter data fra form i create.ejs og laver en POST request.
app.post('/posts/store', async (req,res)=>{
    //Model der laver et nyt document med browser data
    await BlogPost.create(req.body); //,(error, blogpost) =>{
        //console.log(error, blogpost);
        //Redirecter til '/' (homepage) ved response
        res.redirect('/')
    });

    app.post('/posts/store', (req, res) =>{
    //Laver shortcut til req.files.image med variablen image.
    //req.files.image har nogle properties som f.eks. mv
    let image = req.files.image;
    //funktionen .mv kan flytte filer andre steder hen på serveren.
    image.mv(path.resolve(__dirname, 'public/img', image.name), async (error) => {
        await BlogPost.create({
            ...req.body,
            image:'/img/' + image.name
    });
        res.redirect('/')
    })
});
 */
