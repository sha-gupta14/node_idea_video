module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if(req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Unauthorized Access');
    res.redirect('/users/login');
  }
}
