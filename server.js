var http = require('http');
var fs = require('fs');

var serveur = http.createServer(function(req,res){
    //Requette HTTP
    if(req.url == '/'){

        res.writeHead(200, {"Content-type": "text/html"});

        res.write("<html><body><p>This is the Home Page </p></body></html>");
        res.end();
    }
    else if (req.url == "/student"){
        res.writeHead(200, {"Content-type": "text/html"});

        res.write("<html><body><p>This is the Student Page </p></body></html>");
        res.end();
    }
    else if (req.url == "/admin"){
        res.writeHead(200, {"Content-type": "text/html"});

        res.write("<html><body><p>This is the Admin Page !</p><h1>Node.JS c'est trop de la balle</h1></body></html>");
        res.end();
    }
    else if (req.url == "/saucisse"){
        res.writeHead(200, {"Content-type": "text/html"});

        res.write("<html><body><p>this is a saucisse page</h1></body></html>");
        res.end();
    }
    else if (req.url == '/data'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({message: "Hello, world!"}));
        res.end();
    }
    else if (req.url == "/file"){
        // fs.readFile("TestFile.txt", "utf8", function(err, data){
        //     if(err) throw err
        //     console.log(data);
        // });
        // fs.writeFile("testFile.txt", "Hello world !", function(err){
        //     if(err) throw err
        //     else
        //     console.log("write operation completed");
        // })
        fs.appendFile("TestFile.txt", "node.js c'est génial", function(err){
            if(err) throw err
            else
            res.end("invalid request !");
        }); 
        res.end();
    }
    else{
        res.end("Invalid Request !");
    }
});

serveur.listen(5000);

console.log("Server is running at port 5000...");