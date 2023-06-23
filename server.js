const express = require('express')
const app = express()
const nodemailer = require('nodemailer')
const cors = require('cors')
const mongoose = require('mongoose')
const {testmony} = require('./control/schema')
require("dotenv").config()
app.use(cors())
app.use(express.json())


const PORT = process.env.PORT || 3001
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
app.listen(PORT,()=>{
    console.log("working")
})