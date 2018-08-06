const mongoose = require('mongoose');
const db = require('../../config/database');
//Map global promis - get rid of warnings
mongoose.Promise = global.Promise;
mongoose.connect(db.mongoURI, { useNewUrlParser: true });

module.export = {mongoose};
