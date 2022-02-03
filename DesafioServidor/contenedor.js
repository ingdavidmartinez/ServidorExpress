const fs =require('fs')
const { threadId } = require('worker_threads')

 pathToProducts = './files/products.txt';

class contenedor {

    constructor(pathToProducts){
        this.pathToProducts = pathToProducts;
    }
    save = async(object)=>{
        if(!object.title||!object.price||!object.thumbnail)return{status:"error",error:"missing fields"} 
        try {
            if(fs.existsSync(pathToProducts)){
                let data =await fs.promises.readFile(pathToProducts,'utf-8')
                let objects =JSON.parse(data);
                let id = objects[objects.length-1].id+1;//access to possition of the array then to the id number
                object.id = id;
                objects.push(object);
                await fs.promises.writeFile(pathToProducts,JSON.stringify(objects,null,2))
                return{status:"success", message:"created",id:object.id}
            }
            else{
                object.id=1;
                await fs.promises.writeFile(pathToProducts,JSON.stringify([object],null,2))
                return{status:"success", message:"user created",id:object.id}
            }
            
        } catch (error) {
            return{status:"error",message:error}
        }
    }

    getByid = async (id)=>{
        if(!id)return({status: "error",error:"id needed"})
        if(fs.existsSync(pathToProducts)){
            let data =await fs.promises.readFile(pathToProducts,'utf-8')
            let products =JSON.parse(data);
            let product = products.find(p=>p.id===id);
            if(product)return{status:"success",payload:product}
            else return null
         }
    }

    getAll = async()=>{
        if(fs.existsSync(pathToProducts)){
            let data =await fs.promises.readFile(pathToProducts,'utf-8')
            let products =JSON.parse(data);
            return{status:"success",payload:products}
            }
            else return {status:"error",payload:"file no found!"}
    }

    delateById =async (id)=>{
        if(!id)retur({status: "error",error:"id needed"})
        if(fs.existsSync(pathToProducts)){
            let data =await fs.promises.readFile(pathToProducts,'utf-8')
            let products =JSON.parse(data); // array of objets 
            let filterProducts=products.filter(p => p.id!==id)//filter for all objects except this id object
            await fs.promises.writeFile(pathToProducts,JSON.stringify(filterProducts,null,2))
            return({status:"success",message:"user delated!"})

        }
    }
    delateAll = async()=>{
        if(fs.existsSync(pathToProducts)){
            await fs.promises.unlink(pathToProducts);
            return ({status:"success",message:"file contents are delated!"})
            
        }
    }




}

module.exports =contenedor;