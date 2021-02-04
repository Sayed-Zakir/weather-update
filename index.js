const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));

app.get('/', function(req, res) {

    res.sendFile(__dirname + "/index.html")

})

app.post("/", function(req, res) {

    const city = req.body.cityname;
    const unit = "metric";
    const idkey = "dd41611f51b1e010f05376162e9cc0ff";


    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${idkey}`;
    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on('data', function(data) {
            const weatherdata = JSON.parse(data);
            const wetherdiscription = weatherdata.weather[0].description;
            const temp = weatherdata.main.temp;
            const icon = weatherdata.weather[0].icon;
            const weathericon = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

            const weatherupdate = `<h1>the weather in ${city} is ${wetherdiscription}</h1>
            <img src=${weathericon}>
            <h1>temp is ${temp} </h1>`

            res.send(weatherupdate)

        })

    })




})


app.listen(3000, function() {
    console.log("we are live");
})