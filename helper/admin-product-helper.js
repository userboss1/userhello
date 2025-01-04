var db=require('../config/connection')
var collection=require('../config/ccollection')
var bcrypt=require('bcrypt')
const { response } = require('express')
var ObjectId=require('mongodb').ObjectId
module.exports={
 
addStock:(adminStock,id)=>{
   
    return new Promise((resolve,reject)=>{
        const stockData = {

            adminId:id._id,
            adminName:id.name,
            name: adminStock.name,
            description: adminStock.description,
            price: parseFloat(adminStock.price), // Convert price to number
            quantity: parseInt(adminStock.quantity) || 0, // Default to 0 if not provided
          };

        db.get().collection(collection.STOCK_COLLECTION).insertOne(stockData).then((response)=>{
            resolve("sucess")
        })
    })
},
GetAllStock:(adminData)=>{
    const { id, name } = adminData;
    console.log(adminData);
    
   
    
    return new Promise(async(resolve,reject)=>{
        let stock=await db.get().collection(collection.STOCK_COLLECTION).find({
            adminId:id,
            adminName:name
        }).toArray()
        resolve(stock)
        console.log(stock);
        
        
    })

},
decrementStock:(stockId) => {},
DeleteProduct:(spID)=>{
    return new Promise((resolve,reject)=>{
        db.get().collection(collection.STOCK_COLLECTION).deleteOne({_id:new ObjectId(spID)}).then((response)=>{
            resolve("deletd")
        })
    })
    
},
getStockDetails:(stockIde)=>{
    return new Promise((resolve,reject)=>{
        db.get().collection(collection.STOCK_COLLECTION).findOne({_id:new ObjectId(stockIde)}).then((response)=>{
            resolve(response)
        })
    })
},
updateStockDetails:(stockid,adminStock)=>{
     return new Promise((resolve,reject)=>{
        db.get().collection(collection.STOCK_COLLECTION).updateOne({_id:new ObjectId(stockid)},
    {
        $set:{
            name: adminStock.name,
            description: adminStock.description,
            price: parseFloat(adminStock.price), // Convert price to number
            quantity: parseInt(adminStock.quantity)
        }
    }
    ).then((response)=>{
        resolve()
    })


    })
},
}
