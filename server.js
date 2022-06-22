const express = require ('express');
const https = require ('https');
const fs = require ('fs');
const port =443; //4043 or 443
const app =express();
const md5 = require ('md5');
const bodyParser = require ('body-parser');
const {createClient} = require ('redis');
const { fstat } = require('fs');
const redisClient= createClient(
{
//socket:
//{
  //  port:6379,
    //host: "127.0.0.1"

 url: 'redis://default@10.128.0.2:6379', 

} //end const redisClient

); // this creates a connection to redis database


app.use (bodyParser.json()); //use the middleware (call it before anything else happens on each request)

// app.listen(port, async() =>

// {
//     await redisClient.connect(); //creating a TCP socket with Redis
//     console.log("listening on port: "+port);

// } // end await redisClient.connect ();
// )   //listening  

https.createServer (   //create the server
    {
    key: fs.readFileSync ('server.key'),
    cert: fs.readFileSync ('server.cert'),
    passphrase: 'P@ssw0rd'
    },
    app).listen(port, async() =>
    {
        await redisClient.connect(); //creating a TCP socket with Redis
        console.log ("listening on port: "+port);
        
    })


const validatePassword =async (request, response) => 
{
//await redisClient.connect(); //creating a TCP socket with Redis
const requestHashedPassword = md5 (request.body.password); //get the password from the body and hash it
const redisHashedPassword= await redisClient.hmGet('password', request.body.userName); //read password from redis
const loginRequest = request.body;
console.log ("Request Body", JSON.stringify(request.body));
console.log (redisHashedPassword);
//search database for username, and retrieve current password  

//compare the hashed version of the password that was sent with the hashed version from the database
if (requestHashedPassword==redisHashedPassword)
{
    response.status (200); //200 means Ok
    response.send ("Welcome");
} //end if statement
else
{
    response.status (401)   //401 means unauthorized
    response.send ("Unathourized");

}  //end of else statement

} //end validate password

app.get('/', (request, response)=>  
{ //every time something calls your API that is a request
    response.send ("Hello"); // a response is when the API gives the information requested

}
)

app.post('/login', validatePassword);

const signup =async (request, response) =>
{
    const requestHashedPassword = md5 (request.body.password); // hashing password
    const userName= request.body.userName; // getting username
    await redisClient.hSet('password', userName, requestHashedPassword ); //Storing password and username in Redis

    response.status (200); //200 means Ok
    response.send ("Signup successful!");

} //end const signup
app.post ('/signup', signup);