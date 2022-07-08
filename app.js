var express = require("express");
var app = express();
const bcrypt = require('bcrypt'); 
const methodeOverride = require('method-override');
// const uri = "mongodb+srv://Mayeul_Croguennec:MCroguennec@cluster0.objk9dm.mongodb.net/Formulaire/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   console.log("database connected");
//   // perform actions on the collection object
//   client.close();
// });

var cors = require('cors');
app.use(cors());


const path = require('path');
app.use(express.static(path.join(__dirname, "public")));

const Form = require("./model/model");
const Qcm = require("./model/Qcm");
const Reponse = require("./model/Reponse");

app.use(methodeOverride('_method'));
var bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs')

require('dotenv').config();
const url = process.env.DATABASE_URL;

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
        pseudo: req.body.pseudo,
        password: req.body. password,
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

app.put("/qcm/edit/:userId/:qcmId/", function(req, res){
    // res.send("PUT request");
    // console.log(req.body.questionId);
    Qcm.findOne({
        _id: req.params.qcmId,/*  "questions._id ": req.body.questionId, */
    }).then(data => {
        console.log(req.body);
        // console.log(data.questions.id(req.body.questionId).description);
        // data.questions.id(req.body.questionId).description =  "q";
        // console.log(data.questions.id(req.body.questionId).description);
        // console.log(data.children[0]);
        if (req.body.titre){
            data.titreQuestionnaire = req.body.titre;
        }
        else{
            data.questions.id(req.body.questionId).description =  req.body.description;
            data.questions.id(req.body.questionId).reponse1 =  req.body.rep1;
            data.questions.id(req.body.questionId).reponse2 =  req.body.rep2;
            data.questions.id(req.body.questionId).reponse3 =  req.body.rep3;
            data.questions.id(req.body.questionId).reponse4 =  req.body.rep4;
        }
        

        
        data.save().then(()=>{
            console.log("Data change !");
            res.redirect("/edit/"+req.params.userId);
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
})


app.delete("/qcm/delete/:userId/:qcmId/", (req, res)=>{

    console.log( "body     :");
    console.log(req.body);

    if (req.body.titre){
        Qcm.remove({_id: req.params.qcmId})
        .then(()=>{
            console.log("data deleted !!");
        res.redirect("/edit/"+req.params.userId);
        }).catch(err => console.log(err))
    }
    else {


        Qcm.findOne({
        _id: req.params.qcmId
    }).then(data =>{
        console.log(data);
        console.log(data.questions.id(req.body.questionId));
        data.questions.id(req.body.questionId).remove();
        data.save().then(()=>{
            console.log("data deleted !!");
        res.redirect("/edit/"+req.params.userId);
        }).catch(err => console.log(err))
        
    }).catch(err => console.log(err))
    }

    
})

//page permettant de choisir les différentes fonctionnalités 
app.get("/choice/:id", (req,res)=>{

    User.findOne({_id: req.params.id})
    .then((user)=>{
        res.render("Choice", {user: user});
    })
    
});


const { userInfo } = require("os");

//page pour créer un qcm
app.get("/create/:id", (req,res)=>{
    // res.render("Create");

    User.findOne({ _id : req.params.id})
    .then( user => {
        if (user.admin){
            res.render('Create', {user:user});
        }
        else{
            res.status(404).send("Vous n'avez pas l'accès");
        }
    })
    .catch(err=>console.log(err));

    
});

//page pour modifier les questions 
app.get("/edit/:id", (req,res)=>{

    User.findOne({ _id : req.params.id})
    .then( user => {
        if (user.admin){
            Qcm.find().then(data=>{
            res.render('Edit', {data:data, user:user});
            }).catch(err=>console.log(err));
        }
        else{
            res.status(404).send("Vous n'avez pas l'accès");
        }
    })
    .catch(err=>console.log(err));

});

//enregistrer la question créée
app.post("/create-qcm/:id", (req,res)=>{


    Qcm.findOne({titreQuestionnaire : req.body.titre})
    .then(qcm => {

        console.log(qcm);
        var userId = req.params.id;


        if(qcm){
            qcm.questions.push({
                description:  req.body.question,
            reponse1 : req.body.rep1,
            reponse2 : req.body.rep2, 
            reponse3 : req.body.rep3, 
            reponse4 : req.body.rep4

            })


            qcm.save().then(()=>{
                console.log("Data saved !");
                console.log(qcm);
                res.redirect("/profil/"+userId); 
            })
        }
        else
        {
            const Data = new Qcm({
                titreQuestionnaire : req.body.titre,
                auteur: req.params.id,
                questions : [{description:  req.body.question,
                    reponse1 : req.body.rep1,
                    reponse2 : req.body.rep2, 
                    reponse3 : req.body.rep3, 
                    reponse4 : req.body.rep4
                }],
            })
            
            Data.save().then(()=>{
                    console.log("Data saved !");
                    console.log(Data);
                    res.redirect("/profil/"+userId);      
            });
        }
    })
    .catch(err => console.log(err));
    
});

//remplir les qcms 
app.get("/fill/:id", (req,res)=>{
    User.findOne({ _id : req.params.id})
    .then( user => {

        Qcm.find()
        .then(data=>{
        Qcm.distinct("titreQuestionnaire")
        .then(titres => {
            res.render('Fill', {data:data, titres:titres, user:user});
        })
        .catch(err => console.log(err))})
    .catch(err=>console.log(err));
    })
    .catch(err=>console.log(err));
    

});


app.post("/submit-qcm/:userId/:qcmId", (req,res)=>{

    console.log('Body  :');
    console.log(req.body)
    Qcm.findOne({ _id : req.params.qcmId})
    .then(data => {
        console.log('Data :   ');
        console.log(data);
        // const Data = new Reponse({
        //     idquestionnaire : data._id,
        //     titreQuestionnaire : data.titreQuestionnaire,
        //     auteur : data.auteur,
        //     utilisateur : req.params.userId,
        //     questions : [{
        //         description : data.
        //     }]

        // })

        // data.questions.forEach(q => {

        // })

        // var reponses = [];
        // reponses.push({description:  q.description,
        //             reponse1 : q.reponse1,
        //             reponse2 : req.body.rep2, 
        //             reponse3 : req.body.rep3, 
        //             reponse4 : req.body.rep4
        //         })

    //     questions : [{description:  req.body.question,
    //         reponse1 : req.body.rep1,
    //         reponse2 : req.body.rep2, 
    //         reponse3 : req.body.rep3, 
    //         reponse4 : req.body.rep4
    //     }],
    // })
    })


    // res.redirect("/fill");
});


//Inscription 
const User = require('./model/User');

app.get('/signin', (req, res) => {
    res.render('Register');
});

app.post('/api/register', (req, res)=>{
    const Data = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 5),
        admin: false,
    });
    Data.save()
    .then( () => {
        console.log('User saved !');
        // res.json(Data);
        // res.redirect('http://localhost:3000/login');
        // res.render('UserPage', {user : Data});
        // res.redirect('/choice');
        res.redirect('http://localhost:3000/');
    })
    .catch(err => console.log(err));
});

//Connexion
app.get('/login', (req, res) => {  
    // res.render('Login');
    
    Form.find().then(data=>{
        res.render('Home', {data:data});
    }).catch(err=>console.log(err));
});


app.post('/api/login', (req, res) => {

    User.findOne({ email : req.body.email})
    .then((user) => {

        if (!user){
            return res.status(404).send('No user found');
        }
        console.log(user);
        if ( !bcrypt.compareSync(req.body.password,user.password )){
            return res.status(404).send('Invalid password!');
        }
        res.render('UserPage', {user : user})
    })
    .catch(err => console.log(err));

});

//page de profil 
app.get('/profil/:id', (req, res)=> {
    User.findOne({_id: req.params.id})
    .then( (user) => {
        res.render('UserPage', {user : user})
    })
    .catch(err => {console.log(err)})
}); 


const port = process.env.PORT || 5000; 

var server = app.listen(port, function(){
    console.log("Node server is running");
});

