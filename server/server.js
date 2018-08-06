const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const methodOverride = require('method-override')
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
const port = process.env.PORT || 3000;
//Loading routes
const idea = require('../routes/idea');
const user = require('../routes/user');
// Passport Config
require('../config/passport')(passport);
//handlebars middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
//Static middleware
app.use(express.static(path.join(__dirname, '../public')));
//Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Method override middleware
app.use(methodOverride('_method'));
//Express session midleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});
//Routes middleware
app.use('/ideas', idea);
app.use('/users', user);
//Home page
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Welcome'
  });
});
//About page
app.get('/about', (req, res) => {
  res.render('about');
});
//404 page not found
app.get('*', (req, res) => {
  res.render('page', {
    error_code: '404',
  });
});
//Server port
app.listen(port, () => {
  console.log(`Started on ${port} port`);
});
