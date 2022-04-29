const express = require ('express'); //import the library

const app = express (); //use the library

app.listen(3000, () =>{console.log("listening...")});   //listening

app.get ('/', (request,response)=>{response.send ("Hello")}); //respond