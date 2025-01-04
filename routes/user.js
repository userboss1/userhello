var express = require('express');
var router = express.Router();
var userHelper=require('../helper/user-helper');


/* GET home page. */

router.get('/', function(req, res, next) {
let user =req.session.user
  res.render('user/intro',{user,user:true});
  


 
});
router.get('/SignIn',(req,res)=>{
  res.render('user/signup')
})
router.post('/signUphbs', (req,res)=>{

  
 userHelper.doSignup(req.body).then((response)=>{
   req.session.user=response

   
res.redirect('/')
  })
})
router.get('/LogOut',(req,res)=>{
  console.log("clicked")
  req.session.destroy()
  res.redirect('/')
})
router.get('/logIn',(req,res)=>{
  res.render('admin/login')
})

module.exports = router;
