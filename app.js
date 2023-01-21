const express=require("express");
const app=express();
app.use(express.urlencoded({extended:true}));
const https = require("https");

app.use(express.static(__dirname+"/public"));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});


app.post("/",function(req,res){
    const fnam=req.body.fname;
    const lnam=req.body.lname;
    const emai=req.body.email;
    

    const data={
        members :[
            {
                email_address: emai,
                status:"subscribed",
                merge_fields:{
                    FNAME: fnam,
                    LNAME: lnam
                }
            }
        ]
    };

    const jsonData=JSON.stringify(data);
    const url="https://us21.api.mailchimp.com/3.0/lists/0501d163da";


    const options={
        method:"POST",
        auth:"sahaj:d7515ac84c406a7c2a5923e9c2c1be8b-us21"
    }

    const feed=https.request(url,options,function(response){
        
        if(response.statusCode===200)
            res.sendFile(__dirname+"/success.html");
        else
            res.sendFile(__dirname+"/failure.html");
        
        
        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
    });

    feed.write(jsonData);
    feed.end();





});

app.post("/failure",function(req,res){
    res.redirect("/");
});

//api key d7515ac84c406a7c2a5923e9c2c1be8b-us21
//list id 0501d163da
app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000");
});

