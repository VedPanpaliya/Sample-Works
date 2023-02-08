const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const http = require('http');
const hostname = '127.0.0.1';
const path = require('path');

require('./src/db/conn');
const Register = require('./src/models/register');
const Contact = require('./src/models/contact');



//STATIC
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/CSS'));
app.use(express.static(__dirname + '/public/images'));


app.use(express.json());
app.use(express.urlencoded({extended : false}));



app.get('/' , function(req,res){
    res.sendFile(path.join(__dirname + '/public/Index.html'))
});
app.get('/infrastructure' , function(req,res){
    res.sendFile(path.join(__dirname + '/public/Infrastructure.html'))
});
app.get('/aboutus' , function(req,res){
    res.sendFile(path.join(__dirname + '/public/aboutus.html'))
});
app.get('/contactus' , function(req,res){
    res.sendFile(path.join(__dirname + '/public/ContactUS.html'))
});





// FORM 
app.post('/register', async(req,res)=>{
    try {
        const registerDonor = new Register({
            Name : req.body.Name,
            Age : req.body.Age,
            DOB : req.body.DOB,
            Address : req.body.Address,
            Phone : req.body.Phone,
            Email : req.body.Email,

        })

        const registered = await registerDonor.save();
        res.status(201).sendFile(path.join(__dirname + '/public/Index.html'));

    } catch (error) {
        res.status(401).send(error)
        
    }
});



// contact form
app.post('/contactform', async(req,res)=>{
    try {
        const newContact = new Contact({
            Name : req.body.Name,
            Email : req.body.Email,
            Phone : req.body.Phone,
            Address : req.body.Address,
            Message : req.body.Message
        })   


        const contacted = await newContact.save();
        res.status(201).sendFile(path.join(__dirname + '/public/ContactUs.html'));

    } catch (error) {
        console.log(error)
    }
});







//PORT LISTEN
app.listen(port ,hostname, ()=>{
    console.log(`Server running at http://${hostname}:${port}/`)
});