const mongoose = require('mongoose');

require('dotenv').config();

const {
  DB_USERNAME, DB_PASSWORD, DB_URL = 'localhost:27017', DB_NAME = 'myTodos',
} = process.env;

let authentication;

if (DB_USERNAME && DB_PASSWORD) {
  authentication = `${DB_USERNAME}:${DB_PASSWORD}@`;
} else {
  authentication = '';
}

mongoose.connect(`mongodb://${authentication}${DB_URL}/${DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}, (error) => {
  if (error) {
    console.error(`Problem connecting to Mongo: ${error}`); // eslint-disable-line
  } else {
    console.log('Connected to Mongo 🤝'); // eslint-disable-line
  }
});

module.exports = mongoose;
