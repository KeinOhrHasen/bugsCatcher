console.log("Hello !");

// initialize our app
let app = require("express")();
let http = require("http").Server(app);
let bodyParser = require("body-parser");

let randomNumbers = [];
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// add needed routes
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.get("/script.js", function(req, res){
    res.sendFile(__dirname + "/script.js");
});

app.get("/style.css", function(req, res){
    res.sendFile(__dirname + "/style.css");
});

app.get("/messages", function(req, res){
    randomNumbers.push({name:"RandomValue", number: Math.round(Math.random()*100)})
    res.json(randomNumbers);
});


// start server
http.listen (4000 ,function(){
    console.log("listening on port: 4000")
});