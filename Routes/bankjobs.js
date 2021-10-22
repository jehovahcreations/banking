const express = require('express')
let app = express.Router()
var request = require("request");
const axios = require('axios');
const mongoose = require('mongoose')
const Bank = require('../model/bank')

app.get('/', function (req, res) {
    res.send('All Blogs');
});
app.get('/:id', function (req, res) {
    res.send('View Blogs' + req.params.id);
});

app.post('/kotak',async(req,res)=>{
console.log(req.body);
var name ='rakesh';
var url = "https://api.onecode.in/userForm/addLead?hash=eyJvbmVjb2RlIjoiT25lQDgwODAxMDA1MTIiLCJwYXJ0bmVySWQiOiI1NyJ9&hasOtpCheck=false";
var body ={"ocPartnerFormId":33,"ocFieldValues":[{"ocFieldId":"145","value":req.body.name},{"ocFieldId":"146","value":req.body.phone},{"ocFieldId":"147","value":req.body.email}]};
let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'accept':'application/json'
    }
  };

try {
    const response = await axios.post(url, body, axiosConfig);
    //return response.data;
    console.log(response.data.data.url);
    const bank = new Bank({
        name:req.body.name,
        user:req.body.user,
        phone:req.body.phone,
        email:req.body.email,
        isActive:1,
        mainMenu:'bankingjobs',
        subMenu:'Kotak',
        url:response.data.data.url,
        status:1
    })
    bank.save();
    res.send(response.data.data.url)
   } catch (err) {
    throw getError(err);
   }

})
module.exports = app