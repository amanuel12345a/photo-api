const express = require('express')
const app = express()
const nodemailer = require('nodemailer')
const cors = require('cors')
const mongoose = require('mongoose')
const {testmony} = require('./control/schema')
const { images } = require('./control/Images')
require("dotenv").config()
app.use(cors({
  credentials:true,   
}))
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));


const PORT = process.env.PORT || 3002

mongoose.connect(`mongodb+srv://amnuelsewgegn:${process.env.MONGODBPASSWORD}@cluster0.m3q9i77.mongodb.net/photoretryWrites=true&w=majority`)
app.post('/email',(req,res)=>{
    const {firstName,email,text,lastName, phone} = req.body
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
               user: `${process.env.EMAIL}`,
               pass: `${process.env.PASSWORD}`
           }
       });
       const mailOptions = {
         from: email, // sender address
         to: process.env.EMAIL, // list of receivers
         subject: `their name ${firstName} email ${email}`, // Subject line
         text: `the package they want ${text}. their name ${firstName} ${lastName}. and their phone number ${phone} and email ${email}`// plain text body
       };
       transporter.sendMail(mailOptions, function (err, info) {
          if(err)
        {
        res.send('try again')}
          else{
            res.send('email send successful')
          }
       });
})
const Data = mongoose.model('data',testmony)
app.post('/data',async (req,res)=>{
    const {firstName,email,text,lastName, phone} = req.body
    await mongoose.connect(`mongodb+srv://amnuelsewgegn:${process.env.MONGODBPASSWORD}@cluster0.m3q9i77.mongodb.net/photoretryWrites=true&w=majority`).then(()=>console.log('working'))
    const person = new Data({
        firstName:firstName,
        email:email,
        phone:phone,
        text:text,
        lastName:lastName
    })
    person.save().then(()=>console.log('saved'))
    
    res.send('succefull')
})
app.get('/data',async (req,res)=>{
    const responce = await Data.find({})
    res.send(responce)
})
const img = mongoose.model('image',images)
app.post('/image',async (req,res)=>{
  const {image,imageType} = req.body
  const singleImg = new img({
    image,
    imageType
  })
  await singleImg.save().then(()=>console.log('working1'))
  res.send('data recieved')
})
app.get('/image',async(req,res)=>{
  let images = await img.find({})
  res.send(images)
})
app.delete('/image/:id',async(req,res)=>{
  const {id} = req.params
  img.findOneAndRemove({_id:id}).then(()=>console.log('deleted'))
  res.send('image deleted')
})
app.listen(PORT,()=>{
    console.log("working")
})