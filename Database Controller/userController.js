const {user} = require('../Database Connection/Database')


const registerUser = (req,res,next)=>{
    user.create({
        username:req.body.username,
        password:req.hashvalue,
        email:req.body.email,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        gender:req.body.gender,
        age:req.body.age
    })
    .then((result)=>{
        console.log('data inserted')})
        next()
        
    .catch((error)=>{
        console.log('error')
        
    })
}

const getAllUsers = (req,res)=>{
    user
    .findAll()
    .then((result)=>{
        res.status(200).send(result)
    })
    .catch((error)=>{
        res.sendStatus(404)
    })
}


const findOneUser = (req,res,next)=>{
    user
        .findOne({
            where : {username : req.body.username}
        })
        .then((result)=>{
           
            
            req.hashvalue = result.dataValues.password
            next()
        })
        .catch((error)=>{
            res.status(404).send('User Not Found')
        })
}


const validateForsignUp = (req,res,next)=> {
    user.findOne({
        where:{username : req.body.username}})
    .then((result)=>{
        if(result.dataValues != ''){
            res.status(409).send('User already exists')
        }
    })
    .catch((error)=>{
        //console.log(error)
        next()
    })
}
const validataEmail = (req,res,next)=> {
    user.findOne({
        where:{email : req.body.email}})
    .then((result)=>{
        if(result.dataValues != ''){
            res.status(409).send('Email already exists')
        }
    })
    .catch((error)=>{
        //console.log(error)
        next()
    })
}


module.exports = {
    registerUser,
    getAllUsers,
    findOneUser,
    validateForsignUp,
    validataEmail
}
