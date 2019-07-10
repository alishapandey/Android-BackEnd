const express =  require('express')
const app = express()
const port = 3000
const body_parser = require('body-parser')
const multer = require('multer')
const path = require('path')
const {registerUser, validateForsignUp,findOneUser,getAllUsers, validataEmail} = require('./Database Controller/userController')
const {hashGenerator,compareHash} = require('./security/hash/hash')
const {jwtTokenGen, tokenVerify} = require('./security/token/token')
const {addmedicine,
        getAllMedicines,
        updateMedicines,
        deleteMedicines,
        viewmedicine,
        add_meds
} = require('./Database Controller/MedicineController')

var publicDir = require('path').join(__dirname, './assets');
app.use(express.static(publicDir));         
app.use(body_parser.json())
app.use(body_parser.urlencoded({extended:true}))

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'content-type,X-Requested-With,Authorization');
	next(); // next passes to another application middleware 
})


app.post('/register',validateForsignUp,hashGenerator,registerUser,(req,res)=>{
        res.sendStatus(201)
})

app.get('/getAlluser',getAllUsers)

app.post('/validateusername',validateForsignUp,(req,res,next)=>{
        res.sendStatus(200)
})

app.post('/login',findOneUser,compareHash,jwtTokenGen,(req,res)=>{
        res.status('202').send({
                'message':'Logged in Success',
                'token':req.genToken
        })
})

app.post('/validataEmail',validataEmail,(req,res)=>{
        res.sendStatus(200)
})

var assetStorage = multer.diskStorage({
        destination: './assets/Images/upload',
        filename: (req, file, callback) => {
            let ext = path.extname(file.originalname);
            callback(null, file.fieldname + '-' + Date.now() + ext);
        }
      });
      
      var imageFileFilter = (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('You can upload only image files!'), false);
        }
        cb(null, true);
      }
      
      
var upload = multer({
          storage: assetStorage,
          fileFilter: imageFileFilter,
          limits: { fileSize: 10000000 }
      })
      
var imageUpload = upload.single('image')

app.post('/uploadImage',imageUpload,(req,res)=>{
        res.json(req.file)
})

app.post('/addmedicine',addmedicine)
app.post('/medsadd',add_meds,(req,res,next)=>{
        res.send(201)
})

app.get('/getmedicine',getAllMedicines)

app.put('/updatemedicines/:medicineid', updateMedicines)


app.delete('/delete/:medicineid',deleteMedicines)

app.post('/postImage',imageUpload,(req,res)=>{
  console.log('image uploaded')
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
res.json(req.file);
})

app.get('/viewmedicine/:id',viewmedicine)

app.listen(port, ()=>console.log(`Server started ${port}`))


module.exports = app