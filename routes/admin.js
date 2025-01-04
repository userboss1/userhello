var express = require('express');
const adminHelper = require('../helper/admin-product-helper');
const  adminLogin  = require('../helper/admin-login-user');

var router = express.Router();
const verifyLogin=(req,res,next)=>{
  if(req.session.adminLog){
    next()
  }
  else{
    res.redirect('/logIn')
  }
}
/* GET users listing. */
router.get('/',verifyLogin,function(req, res, next) {
  let admind = {
    id: req.session.admin._id,
    name: req.session.admin.name
};


    adminHelper.GetAllStock(admind).then((stock)=>{
      
      
       
      res.render('admin/mainpage',{admin:true,stock})
    })})
  

 



router.get('/signIn',(req,res)=>{
  res.render('admin/signup')
  })
  router.post('/signIn',(req,res)=>{
    adminLogin.adminSignUp(req.body).then((response)=>{

      
      req.session.adminLog=true;
      req.session.admin=response
      
      res.redirect('/admin')
    })
    
  })
router.get('/AddProduct',verifyLogin,(req,res)=>{
res.render('admin/addstock',{noheader:true})
})
router.post('/addstock',(req,res)=>{
  console.log(req.body);
  
 adminHelper.addStock(req.body,req.session.admin).then((response)=>{
 
  res.redirect('/admin')
 })
})
// router.get('/addQuantity/:id',(req,res)=>{
//   let proId=req.params.id
//   adminHelper.decrementStock(proId).then((response)=>{
//   console.log("suces")

//   })
  
// })
router.get('/delete/:id',verifyLogin,(req,res)=>{
 let proId=req.params.id
 adminHelper.DeleteProduct(proId).then((response)=>{
  console.log(response)
  res.redirect("/admin")
 })
  
})
router.get('/edit-product/:id',verifyLogin,async(req,res)=>{
let product=await adminHelper.getStockDetails(req.params.id)

res.render('admin/edit',{bodyR:true,product})
})
router.post('/editstock/:id',(req,res)=>{
adminHelper.updateStockDetails(req.params.id,req.body).then(()=>{
  res.redirect('/admin')
})
    
})
router.get('/userc',verifyLogin,(req,res)=>{
  adminLogin.GetUserDetail().then((userLog)=>{
    console.log(userLog);
    
   
    res.render('admin/userList',{admin:true,userLog})
    
  })

  
})

router.post('/logIn',(req,res)=>{
adminLogin.adminLogin(req.body).then((response)=>{
  if(response.status){
    req.session.adminLog=true;
    req.session.admin=response.user
    res.redirect('/admin')
  }

})
  
    
})
router.get('/adduser',(req,res)=>{
  res.render('admin/adduser')
})
router.post('/adduser',(req,res)=>{
  adminLogin.AddUser(req.body).then(()=>{
    res.redirect('/admin/userc',)
  })


})
module.exports = router;
