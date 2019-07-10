const { medicine } = require('../Database Connection/Database')


const addmedicine = (req, res, next) => {
    medicine.create({
        medicinename: req.body.medicinename,
        unit: req.body.unit,
        frequencyofintake: req.body.frequencyofintake,
        manufacturingdate: req.body.manufacturingdate,
        expirydate: req.body.expirydate,
        image:req.body.filename
    }).then((result) => {
        console.log('data inserted')
        res.status(200).send('data inserted')
    })
        .catch((error) => {
            console.log(error)
            res.status(409).send('error')
        })
}


const add_meds = (req,res,next) => {
    medicine.create({
        medicinename: req.body.medicinename,
        unit: req.body.unit,
        frequencyofintake: req.body.frequencyofintake,
        manufacturingdate: req.body.manufacturingdate,
        expirydate: req.body.expirydate
    })
    .then((result)=>{
        next()
    })
    .catch((error)=>{
        res.send(409)
    })
}

const getAllMedicines = (req, res) => {
    medicine
        .findAll()
        .then((result) => {
            console.log('found data')
            res.status(200).send(result)
        })
        .catch((error) => {
            console.log("error")
            res.sendStatus(404)
        })
}

const updateMedicines = (req, res) => {
    console.log(req.body.medicineid);
    let m = {
        medicinename: req.body.medicinename,
        unit: req.body.unit,
        frequencyofintake: req.body.frequencyofintake,
        manufacturingdate: req.body.manufacturingdate,
        expirydate: req.body.expirydate
    }
    medicine
        .update(m, { where: { medicineid: req.body.medicineid } })
        .then(function (result) {
            console.log ("updated") 
            res.status(204)
            res.json({"message":"Updated"});
            
        }).catch((error) => {
            res.sendStatus(404)
        })
}


const deleteMedicines = (req, res) => {

    medicine.destroy({where: { medicineid: req.body.medicineid } })
        .then(function (result) {
            res.status(204)
            res.json({"message":"Deleted"});
            //
        }).catch((error) => {
       console.log(error)
        })
}

const viewmedicine = (req,res) => {
    medicine.findOne({where : {medicineid : req.body.id}})
    .then((result)=>{
        res.send(result)
    })
    .catch((error)=>{
        res.sendStatus(404)
    })
}

module.exports = {
    addmedicine,
    getAllMedicines,
    updateMedicines,
    deleteMedicines,
    viewmedicine,
    add_meds
}


