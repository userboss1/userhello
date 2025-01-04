var db=require('../config/connection')
var collection=require('../config/ccollection')
var bcrypt=require('bcrypt')
const { response } = require('express')

module.exports={

    adminSignUp:(info)=>{
return new Promise(async(resolve,reject)=>{
    info.password=await bcrypt.hash(info.password,10)
    db.get().collection(collection.ADMIN_COLLECTION).insertOne(info).then((response)=>{
        resolve({name:info.name,id:response.insertedId})
    })
})
    },
    adminLogin:(userdata)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus=false;
            let response={} 
            let user=await db.get().collection(collection.ADMIN_COLLECTION).findOne({email:userdata.email})
            console.log(user);
            
            if(user){
                bcrypt.compare(userdata.password,user.password).then((status)=>{
                    if(status){
                        console.log("login succes")
                        response.user=user
                        response.status=true
                        resolve(response)
                    }else{
                        console.log("log failed");
                        
                    }
                })

            }else{
                console.log("failed log user not found");
                
            }
        })
    },
    AddUser:(userdata)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLLECTION).insertOne(userdata).then((response)=>{
                resolve()
                
            })
        })
       
    },
    GetUserDetail:()=>{
      return new Promise(async(resolve,reject)=>{
        let userLog=await db.get().collection(collection.USER_COLLLECTION).find().toArray()
        resolve(userLog)
      })
    }

}