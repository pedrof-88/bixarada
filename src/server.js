require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const routes = require('./routes');
const engines = require('consolidate');


const app = express();

global.IP_ADDRESS = process.env.IP_ADDRESS;


mongoose.connect(
  process.env.MONGO_URL, 
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

//For render views
app.engine("ejs", engines.ejs);
app.set('views', path.join(__dirname, './views'));
app.set("view engine", "ejs");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/images', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));
app.use(routes);

app.listen(process.env.PORT || 3333);