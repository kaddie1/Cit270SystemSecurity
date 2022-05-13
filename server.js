const express = require ('express'); //import the library
const bodyParser =require ('body-parser'); //body perser is called middleware
const port =3000;
const app = express (); //use the library
const md5 = require ('md5');
const redis = require ('redis');
const redisClient = redis.createClient();

app.use (bodyParser.json()); //use the middleware (call it before anything else happens on each request)

app.listen(port, () =>

{
    console.log("listening on port: "+port);

})   //listening  



app.post ('/login', async (request, response)=> {//a post is when a client sends new information to an API
const requestHashedPassword= md5 (request.body.password);
const redisHashedPassword= await redisClient.hGet('password', request.body.userName);
const loginRequest = request.body;
console.log ("Request Body", JSON.stringify(request.body));

//search database for username, and retrieve current password  

//compare the hashed version of the password that was sent with the hashed version from the database

const loginRequest = request.body;
if (loginRequest.userName=="jann@yahoo.com" && loginRequest.password=="Operatingsystem1!")
{
    response.status (200); //200 means Ok
    response.send ("Welcome");
} //end if statement

    else
        {
            response.status (401)   //401 means unauthorized
            response.send ("Unathourized");
 
        }  //end of else statement


});

app.get('/', (request, response)=>
{response.send ("Hello"); // a response is when the API gives the 

}
)