const express = require('express');
const app = express()
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const router= require("./route/router.js")
const port = 3000;

app.use(bodyparser.json());

mongoose.connect('mongodb+srv://Uranium-Batch:aruSjkdGdfhc9MRK@functionup.eel5r.mongodb.net/PramitDBForAssesment?retryWrites=true&w=majority', {
    useNewUrlParser: true,
})
    .then(() => {
        console.log('connected to database');
    })
    .catch((err) => {
        console.log('Mongodb connection error',err);
    });
app.use('/',router)

app.listen(port, () => {
    console.log(`server in running on PORT: ${port}`);
});