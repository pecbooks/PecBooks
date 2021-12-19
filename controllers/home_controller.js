const User = require('../models/user');

module.exports.home = async function(req,res){
    // Populate the user of each post

    try{
        return res.render('home',{
            title: "PecBooks | Home",
        });
    }catch(err){
        console.log('Error', err);
        return res.redirect('back');
    }
    
};