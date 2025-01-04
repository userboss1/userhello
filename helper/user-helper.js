var db=require('../config/connection')
var collection=require('../config/ccollection')
var bcrypt=require('bcrypt')
module.exports={
 doSignup:(userData)=>{
    return new Promise(async(resolve,reject)=>{
        userData.password=await bcrypt.hash(userData.password,10)
        db.get().collection(collection.USER_COLLLECTION).insertOne(userData).then((response)=>{{
           resolve({name:userData.name,id:response.insertedId})
        }})
    }
)
 },

}


