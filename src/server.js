const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const routes = require('./routes');
const engines = require('consolidate');


const app = express();

global.IP_ADDRESS = 'http://192.168.10.6:3333';

const Bixarada = 'mongodb+srv://cfpets:cfpetspi2020@cluster0.ybjoz.mongodb.net/dbpet?retryWrites=true&w=majority';

mongoose.connect(Bixarada, 
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

app.listen(3333);