// const express = require("express");
// const router = express.Router();
// const {User,Blog} = require("../models/");
// const bcrypt  = require("bcrypt");

// router.get("/", (req, res) => {
//   User.findAll({
//     include:[Blog]
//   })
//     .then(dbUsers => {
//       res.json(dbUsers);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ msg: "an error occured", err });
//     });
// });
// router.get("/logout",(req,res)=>{
//   req.session.destroy();
//   res.redirect("/")
// })

// router.get("/:id", (req, res) => {
//   User.findByPk(req.params.id,{})
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ msg: "an error occured", err });
//     });
// });

// router.post("/", (req, res) => {
//   User.create(req.body)
//     .then(newUser => {
//       req.session.user = {
//         id:newUser.id,
//         username:newUser.username
//       }
//       res.json(newUser);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ msg: "an error occured", err });
//     });
// });
// router.post("/login", (req, res) => {
//   User.findOne({
//     where:{
//     username:req.body.username
//   }
// }).then(foundUser=>{
//     if(!foundUser){
//       return res.status(400).json({msg:"wrong login credentials"})
//     }
//     if(bcrypt.compareSync(req.body.password,foundUser.password)){
//       req.session.user = {
//         id:foundUser.id,
//         username:foundUser.username
//       }
//       return res.json(foundUser)
//     } else {
//       return res.status(400).json({msg:"wrong login credentials"})
//     }
//   }).catch(err => {
//       console.log(err);
//       res.status(500).json({ msg: "an error occured", err });
//     });
// });

// router.put("/:id", (req, res) => {
//   User.update(req.body, {
//     where: {
//       id: req.params.id
//     }
//   }).then(updatedUser => {
//     res.json(updatedUser);
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json({ msg: "an error occured", err });
//   });
// });

// router.delete("/:id", (req, res) => {
//   User.destroy({
//     where: {
//       id: req.params.id
//     }
//   }).then(delUser => {
//     res.json(delUser);
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json({ msg: "an error occured", err });
//   });
// });


// module.exports = router;
const express = require("express");
const router = express.Router();
const { User, Blog } = require("../../models");

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.json({ msg: "logged out!" });
});

//create user
// /api/users/signup
router.post("/signup", (req, res) => {
  User.create(req.body)
    .then((newUser) => {
      req.session.save(() => {
        req.session.user_id = newUser.id;
        req.session.logged_in = true;

        res.status(200).json(newUser);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});
// /api/users/login
router.post("/login", async (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then(async (userData) => {
      
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

module.exports = router;