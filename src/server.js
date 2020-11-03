const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const routes = require('./routes');


const app = express();

global.IP_ADDRESS = 'http://localhost:3333';

const Bixarada = 'mongodb+srv://cfpets:cfpetspi2020@cluster0.ybjoz.mongodb.net/dbpet?retryWrites=true&w=majority';

mongoose.connect(Bixarada, 
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/images', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));
app.use(routes);

app.listen(3333);