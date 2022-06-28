var express = require("express");
var app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');   
const methodeOverride = require('method-override');
// const uri = "mongodb+srv://Mayeul_Croguennec:MCroguennec@cluster0.objk9dm.mongodb.net/Formulaire/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   console.log("database connected");
//   // perform actions on the collection object
//   client.close();
// });

const Form = require("./model/model");
app.use(methodeOverride('_method'));
var bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs')

const url = "mongodb+srv://Mayeul_Croguennec:MCroguennec@cluster0.objk9dm.mongodb.net/Formulaire?retryWrites=true&w=majority";

const connectionParams ={
    useNewUrlParser:true,
    useUnifiedTopology: true
}

mongoose.connect(url, connectionParams).then(()=>{
    console.log("Mongodb database connected !");
}).catch(err => console.log(err));


app.get("/", function (req, res){
    // res.send("<html><body><h1>Hello World</h1></body></html>");
    // res.sendFile("/Users/frede/Documents/formation dev web/cours/NodeJS-express/dev1/index.html");
    //  res.sendFile("/Users/mayeulcroguennec/Desktop/New_cours/cours/react/reactintro/question.html");
    // res.render("Home");
    Form.find().then(data=>{
        res.render('Home', {data:data});
    }).catch(err=>console.log(err));

})

app.post("/submit-data", function(req, res){
    // res.send("Post request");
    // console.log(req.body);
    // res.send(req.body.firstname + " " + req.body.lastname);

    
})

app.post("/submit-data-form", function(req, res){
    // res.send("Bonjour " + req.body.lastname + " " + req.body.firstname + "<br>" +
    // "Merci de nous avoir contacter."+ "<br>" +
    // "Nous reviendrons vers vous dans les plus bref délai à cette adresse : " +
    // req.body.email
    // );
    // const Data = new Form({
    //     lastname: req.body.lastname,
    //     firstname: req.body.firstname,
    //     email: req.body.email,
    //     message: req.body.message
    // });
    // Data.save().then(()=>{
    //     res.redirect('/')
    // }).catch(err=>console.log(err))

    const Data = new Form({
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        email: req.body.email,
        message: req.body.message
    })

Data.save().then(()=>{
        console.log("Data saved !");
        res.redirect("/");
    });
        // .then(()=> res.status(201).json({
        //     message: 'objet enregistré !'
        // }))
        // .catch(error => res.status(400).json({
        //     error
        // }));

});

app.get('/form/:id', (req, res) => {
    Form.findOne({
        _id: req.params.id
    }).then(data => {
        res.render('Page', { data: data });
    })
        .catch(err => console.log(err));
})

app.get('/form/edit/:id', (req, res) => {
    Form.findOne({
        _id: req.params.id
    }).then(data => {
        res.render('Edit', { data: data });
    })
        .catch(err => console.log(err));
})

app.put("/form/edit/:id", function(req, res){
    // res.send("PUT request");
    Form.findOne({
        _id: req.params.id
    }).then(data => {
        data.lastname= req.body.lastname,
        data.firstname= req.body.firstname,
        data.email= req.body.email,
        data.message= req.body.message  
        
        data.save().then(()=>{
            console.log("Data change !");
            res.redirect('/');
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
})

app.delete("/form/delete/:id", (req, res)=>{
    Form.remove({
        _id: req.params.id
    }).then(()=>{
        console.log("data delet");
        res.redirect("/");
    }).catch(err => console.log(err))
})

var server = app.listen(5000, function(){
    console.log("Node server is running");
});