const express = require('express');
const path = require('path');
const app = express();

app.listen(3000);

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.render('index');
})