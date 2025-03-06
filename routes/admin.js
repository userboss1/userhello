var express = require('express');
const adminHelper = require('../helper/admin-product-helper');
const adminLogin = require('../helper/admin-login-user');

var router = express.Router();

const verifyLogin = (req, res, next) => {
  if (req.session.adminLog) {
    next();
  } else {
    res.redirect('/logIn');
  }
};

/* GET Admin Main Page */
router.get('/', verifyLogin, function (req, res, next) {
  if (!req.session.admin) {
    return res.redirect('/logIn');
  }

  let admind = {
    id: req.session.admin._id,
    name: req.session.admin.name,
  };

  adminHelper.GetAllStock(admind)
    .then((stock) => {
      res.render('admin/mainpage', { admin: true, stock });
    })
    .catch((err) => {
      console.error("Error fetching stock:", err);
      res.redirect('/admin');
    });
});

/* Admin Sign Up */
router.get('/signIn', (req, res) => {
  res.render('admin/signup');
});

router.post('/signIn', (req, res) => {
  adminLogin.adminSignUp(req.body)
    .then((response) => {
      req.session.adminLog = true;
      req.session.admin = response;
      res.redirect('/admin');
    })
    .catch((err) => {
      console.error("Signup Error:", err);
      res.redirect('/signIn');
    });
});

/* Add Product */
router.get('/AddProduct', verifyLogin, (req, res) => {
  res.render('admin/addstock', { noheader: true });
});

router.post('/addstock', verifyLogin, (req, res) => {
  console.log(req.body);

  adminHelper.addStock(req.body, req.session.admin)
    .then(() => {
      res.redirect('/admin');
    })
    .catch((err) => {
      console.error("Error adding stock:", err);
      res.redirect('/admin');
    });
});

/* Delete Product */
router.get('/delete/:id', verifyLogin, (req, res) => {
  let proId = req.params.id;
  adminHelper.DeleteProduct(proId)
    .then(() => {
      res.redirect("/admin");
    })
    .catch((err) => {
      console.error("Error deleting product:", err);
      res.redirect('/admin');
    });
});

/* Edit Product */
router.get('/edit-product/:id', verifyLogin, async (req, res) => {
  try {
    let product = await adminHelper.getStockDetails(req.params.id);
    res.render('admin/edit', { bodyR: true, product });
  } catch (err) {
    console.error("Error fetching product details:", err);
    res.redirect('/admin');
  }
});

router.post('/editstock/:id', verifyLogin, (req, res) => {
  adminHelper.updateStockDetails(req.params.id, req.body)
    .then(() => {
      res.redirect('/admin');
    })
    .catch((err) => {
      console.error("Error updating stock:", err);
      res.redirect('/admin');
    });
});

/* User Management */
router.get('/userc', verifyLogin, (req, res) => {
  adminLogin.GetUserDetail()
    .then((userLog) => {
      res.render('admin/userList', { admin: true, userLog });
    })
    .catch((err) => {
      console.error("Error fetching user details:", err);
      res.redirect('/admin');
    });
});

/* Admin Login */
router.post('/logIn', (req, res) => {
  adminLogin.adminLogin(req.body)
    .then((response) => {
      if (response.status) {
        req.session.adminLog = true;
        req.session.admin = response.user;
        res.redirect('/admin');
      } else {
        res.render('admin/login', { error: "Invalid credentials" });
      }
    })
    .catch((err) => {
      console.error("Login Error:", err);
      res.redirect('/logIn');
    });
});

/* Add User */
router.get('/adduser', verifyLogin, (req, res) => {
  res.render('admin/adduser');
});

router.post('/adduser', verifyLogin, (req, res) => {
  adminLogin.AddUser(req.body)
    .then(() => {
      res.redirect('/admin/userc');
    })
    .catch((err) => {
      console.error("Error adding user:", err);
      res.redirect('/admin/userc');
    });
});

module.exports = router;
