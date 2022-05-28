// const express = require('express');
// const router = express.Router();
// const {User,Blog} = require('../models');

// router.get("/",(req,res)=>{
//     Blog.findAll().then(blogs=>{
//         console.log(blogs)
//         const hbsBlogs = blogs.map(blog=>blog.get({plain:true}))
//         console.log("==========")
//         console.log(hbsBlogs)
//         const loggedIn = req.session.user?true:false
//         res.render("home",{blogs:hbsBlogs,loggedIn,username:req.session.user?.username})
//     })
// })

// router.get("/login",(req,res)=>{
//     if(req.session.user){
//         return res.redirect("/profile")
//     }
//     res.render("login")
// })

// router.get("/profile",(req,res)=>{
//     if(!req.session.user){
//         return res.redirect("/login")
//     }
//     User.findByPk(req.session.user.id,{
//         include:[Blog]
//     }).then(userData=>{
//         console.log(userData);
//         const hbsData = userData.get({plain:true})
//         console.log("=======")
//         console.log(hbsData);
//         hbsData.loggedIn = req.session.user?true:false
//         res.render("profile",hbsData)
//     })
// })

// module.exports = router;
const express = require("express");
const router = express.Router();
const { User, Blog } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", (req, res) => {
  Blog.findAll().then((blogs) => {
    console.log(blogs);
    const hbsBlogs = blogs.map((blog) => {
      return blog.get({ plain: true });
    });
    console.log("==========");
    console.log(hbsBlogs);
    res.render("home", { hbsBlogs ,loggedIn: req.session.loggedIn});
  });
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/login");
    return;
  }
  res.render('login');
   
});

router.get("/profile", withAuth,  (req, res) => {

  Blog.findAll({
    where: {
      user_id: req.session.user_id
    }
  }).then((blogData) => {

   const blogs = blogData.map((blog)=> blog.get({plain: true}));

   res.render('profile', {
     blogs, logged_in: req.session.logged_in
   })

  });
});

module.exports = router;