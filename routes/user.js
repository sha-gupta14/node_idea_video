const express = require('express');
const {ObjectID} = require('mongodb');
const {mongoose} = require('../server/db/mongoos');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {User} = require('../server/models/user');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('users/login');
});

router.get('/register', (req, res) => {
  res.render('users/register');
});

router.post('/register', (req, res) => {
  let errors = [];
  if(req.body.password != req.body.password2){
    errors.push({text:'Passwords do not match'});
  }
  if(req.body.password.length < 6){
    errors.push({text:'Password must be at least 6 characters'});
  }
  if(errors.length > 0){
    res.render('users/register', {
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    });
  } else {
    User.findOne({email: req.body.email}).then((user) => {
      if (user) {
        req.flash('error_msg', 'User already register');
        res.redirect('/users/register');
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) {
                req.flash('error_msg', 'Unable to register new user');
                res.redirect('/users/register');
              } else {
                newUser.password = hash;
                newUser.save().then((user) => {
                  req.flash('success_msg', 'Registered successfully');
                  res.redirect('/users/login');
                }, (err) => {
                  req.flash('error_msg', 'Unable to register new user');
                  res.redirect('/users/register');
                });
              }
            });
        });
      }
    });
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect:'/ideas',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});
module.exports = router;
