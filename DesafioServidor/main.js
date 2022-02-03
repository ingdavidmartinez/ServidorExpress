
const  express = require('express');
const contenedor =require('./contenedor.js')
const productService = new contenedor();


const app = express();

const PORT = 8080;
const  connectedserver =app.listen(PORT,()=>{
    console.log("Listening on port 8080");
})

app.get('/productos',(req,res)=>{
    productService.getAll().then(result =>res.send(result.payload)).catch(result =>res.send(result))
      
})

app.get('/productoRandom',(req,res)=>{
     let random = Math.floor(Math.random()*3+1)
     productService.getByid(random).then(result =>res.send(result.payload)).catch(result =>res.send(result))
   
})