var bcrypt = require('bcrypt')
var saltRounds = 10


function hashGenerator(req,res,next) {

    req.body.password // this is the plaintext password
    bcrypt.hash(req.body.password, saltRounds)
        .then(function (hash) {
            // console.log(hash);
            req.hashvalue = hash;
            next();
        })
        .catch(function (err) {

        })
}

function compareHash(req,res,next){
    bcrypt.compare(req.body.password,req.hashvalue,(err,result)=>{
        if(result){
            next()
        }else{
            res.status(400).send('Password does not match')
        }
    })
}

module.exports = {hashGenerator,compareHash}
