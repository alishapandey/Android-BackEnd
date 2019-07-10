var jwt = require('jsonwebtoken');

function jwtTokenGen(req, res, next) {

    jwt.sign({
            username: req.body.username,
            accessLevel: 'superadmin'
        }, 'thisissecretkey', {
            expiresIn: "10h"
        },

        function(err, token) {
            if(err != null || undefined ){
                console.log(err)
                res.status('401').send({'message':'Unauthorized token'})
                //next({"status":401, "message":"Unauthorized token"})
            }
            else{
                req.genToken=token;
                next();
                // console.log(token)
            }

        }
    )

}

function tokenVerify(req,res,next){

    console.log(req.headers)

    if(req.headers.authorization ==  undefined){

        next({status:500,message:'no authorization header present'})

    }
    else{

        let token = req.headers.authorization.slice(7,req.headers.authorization.length)

        jwt.verify(token,'thisissecretkey',function(err,decoded){
            console.log(decoded);
            if(err !=null){
                next({status:500,message:err.message})
                console.log(err);
            }
            else{
                next();
            }
        })

    }
}


module.exports = {jwtTokenGen, tokenVerify}

