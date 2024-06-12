const router = require('express').Router();
const path = require('path');
const { database } = require('pg/lib/defaults');

router.get('/',async(req,res) =>{
    //rendering the handlebars.
    res.render('all');
    let data = database call 
    res.sendFile(path.join(__dirname, '../views/all.handlebars'))
})

module.exports = router;