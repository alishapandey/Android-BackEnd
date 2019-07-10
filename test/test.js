const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const chailike = require('chai-like')
const chaithings = require('chai-things')

const app = require('../index')

chai.use(chaiHttp)
chai.use(chailike)
chai.use(chaithings)
describe('Users',function(){
    describe('Post Register',()=>{
        it('It should register a new user',(done)=>{
            chai
            .request(app)
            .post('/register')
            .send({
                "username":"ally17",
                "password":"ally",
                "email":"ally17@gmail.com",
                "firstname":"ally",
                "lastname":"ally",
                "gender":"female",
                "age":12
            })
            .end((err,res)=>{
                res.should.have.status(201)
            })
            done()
        })
    })

    describe('Post Login',()=>{
        it('It should login the user',(done)=>{
            chai
            .request(app)
            .post('/login')
            .send({
                "username":"ally56892",
                "password":"ally"
            })
            .end((err,res)=>{
                res.should.have.status(201)
            })
            done()
        })
    })

    describe('get All user',()=>{
        it('It should return all the user',(done)=>{
            chai
            .request(app)
            .get('/getAlluser')
            .send()
            .end((err,res)=>{
                res.should.have.status(200)
            })
            done()
        })
    })
})

describe('Medicine',function(){
    describe('Medicine Register',()=>{
        it('It should register a new medicine',(done)=>{
            chai
            .request(app)
            .post('/medsadd')
            .send({
                "medicinename": "zaccino",
                "unit": "tablet",
                "frequencyofintake": "Before breakfast",
                "manufacturingdate": "2019-01-12",
                "expirydate": "2021-01-13"
                })
            .end((err,res)=>{
                res.should.have.status(201)
            })
            done()
        })
    })

    describe('get Medicine',()=>{
        it('It should return data about medicines',(done)=>{
            chai
            .request(app)
            .get('/getmedicine')
            .send()
            .end((err,res)=>{
                res.should.have.status(200)
            })
            done()
        })
    })
})

