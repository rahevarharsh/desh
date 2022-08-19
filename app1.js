const express =require('express')
const bodyParser = require('body-parser')
const request  = require('request')

const app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));

// provide home html form
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
})

app.post("/fail",function(req,res){
    res.redirect("/")
})

app.post("/",function(req,res){
const fname = req.body.fname;
const lname = req.body.lname;
const email = req.body.email;
    console.log(fname+" "+lname+" "+email);
    //cover data in flat pack
    const data =JSON.stringify( {
        members: [{
            email_address: req.body.email,
            status: "subscribed",
            merge_fields: {
                FNAME: req.body.fname,
                LNAME: req.body.lname
            }

        }]
    })

    
    // const url = "https://us10.admin.mailchimp.com/3.0/lists/b4a04b557f"
    const options = {
        url:"https://us10.api.mailchimp.com/3.0/lists/b4a04b557f",
        method:"POST",
        // auth:"HD :694abe43c66a086b37853fb97a5e8ff8",
        headers:{
            Authorization:"auth 694abe43c66a086b37853fb97a5e8ff8"
        },
        body:data
    };
  request(options,function(err,response,data){
        
        console.log(res.statusCode);
if (err) {
    res.sendFile(__dirname + "/public/fail.html")
}

            if (req.body.email === "" || req.body.fname === "" || req.body.lname === "") {
                console.log("erro ");
                res.sendFile(__dirname + "/public/fail.html")
            }
            else {
                if (res.statusCode === 200) {
                    
                    res.sendFile(__dirname + "/public/sucess.html")
                }
                else {
                    res.sendFile(__dirname + "/public/fail.html")
                }
            }
    
    })
    
})
 
app.listen(3000)

// list id
// b4a04b557f

// api key
// 694abe43c66a086b37853fb97a5e8ff8-us10

// url
// https://us19.admin.mailchimp.com/