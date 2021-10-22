const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const BankJobs = require('./Routes/bankjobs')
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(cors());

// parse application/json, basically parse incoming Request Object as a JSON Object 
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays
//app.use(bodyParser.urlencoded({ extended: false }));
// combines the 2 above, then you can parse incoming Request Object if object, with nested objects, or generally any type.
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/bank',BankJobs)

app.get('/kotak', (req, res) => {
  res.sendFile(__dirname + "/View/index.html");
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

mongoose.connect("mongodb://benet:123456@35.153.97.179/pura?authSource=pura")
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error)
db.once('open', ()=>{
    console.log('connected to mongodb server')
})