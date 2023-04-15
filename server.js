const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/submit', (req, res) => {
    const countryName = req.body.country;
    console.log(countryName);
    if (countryName) {
        res.send("Good")
    }
})

const PORT = 3000
app.listen(PORT || process.env.PORT, (err) => {
    if (err)
        console.log(err)
    console.log(`Server started at port ${PORT}`);
})
