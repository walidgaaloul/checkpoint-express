const express = require('express');
const path = require('path');



const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.engine('pug', require('pug').__express);

//verfication of time
app.use(verifDate = (req, res, next) => {
    const date = new Date();
    const day = date.toDateString().substring(0, 3);
    const hour = date.toTimeString().substring(0, 2);
    let time = false;
    switch (day) {
        case 'Mon': time = true
        case 'Tue': time = true
        case 'Thu': time = true
        case 'Wed': time = true
        case 'Fri': time = true
    }
    if (time === true && hour >= 9 && hour <= 17) {
        next();
    }
    else res.send("The website is closed !")
})

app.get('/' , (req , res) =>{
    res.render('Home')
})
app.get('/Contact' , (req , res) =>{
    res.render('Contact')
})

app.get('/services' , (req , res) =>{
    res.render('services')
})
const port = 3000;
app.listen(port , (err) =>{
    if (err) console.log("connection Failed")
    else console.log(`server is connected ${port}`)
})