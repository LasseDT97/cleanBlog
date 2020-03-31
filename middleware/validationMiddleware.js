module.exports = (req, res, next) =>{
    if(req.files == null || req.body || req.title == null){
        console.log('Success');
        return res.redirect('/posts/new')
    }
    next()
};