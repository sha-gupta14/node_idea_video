const express = require('express');
const {ObjectID} = require('mongodb');
const {mongoose} = require('../server/db/mongoos');
const {Idea} = require('../server/models/idea');
const {ensureAuthenticated} = require('../helpers/auth');
const router = express.Router();

router.get('/', ensureAuthenticated, (req, res) => {
  Idea.find({user: req.user.id}).sort({date: 'desc'}).then((ideas) => {
    res.render('ideas/index', {ideas});
  });
});

router.get('/add', ensureAuthenticated, (rq, res) => {
  res.render('ideas/add');
});

router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.render('ideas/add', {
      error_id: 'Data not found'
    });
    return false;
  }
  Idea.findById(id).then((ideas) => {
    res.render('ideas/add', {
      ideas,
      is_edit: 1
    });
  });
});

router.post('/', ensureAuthenticated, (req, res) => {
  const errors = [];
  if (!req.body.title) {
    errors.push({text: 'Please add a title'});
  }
  if (!req.body.details) {
    errors.push({text: 'Please add some details'});
  }
  if (errors.length > 0) {
    res.render('ideas/add', {
      errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    const idea = new Idea({
      title: req.body.title,
      details: req.body.details,
      user: req.user.id
    });
    idea.save().then((idea) => {
      req.flash('success_msg', 'Saved successfully');
      res.redirect('/ideas');
    }, (err) => {
      req.flash('error_msg', err);
      res.redirect('/ideas');
    });
  }
});

router.put('/:id', ensureAuthenticated, (req, res) => {
  Idea.findOne({_id: req.params.id}).then((idea) => {
    if (idea.user !== req.user.id) {
      req.flash('error_msg', 'Unauthorized Access');
      res.redirect('/ideas');
    }
    idea.title = req.body.title,
    idea.details = req.body.details
    idea.save().then((idea) => {
      req.flash('success_msg', 'Updated successfully');
      res.redirect('/ideas');
    });
  });
});

router.delete('/:id', ensureAuthenticated, (req, res) => {
  Idea.findByIdAndRemove({_id: req.params.id}).then(() => {
    req.flash('success_msg', 'Removed successfully');
    res.redirect('/ideas');
  });
})

module.exports = router;
