module.exports = (req, res) =>{
    if(req.session.userId){
        return res.render('create');
    }
    res.redirect('/auth/login')
};

/* Ovenstående tjekker om session'en indeholder et user id.
Hvis den gør vises create post siden. Hvis ikke redirectes tilbage til login siden */