import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import router from './routes';
import { cloudSettings as config } from './config';
import passport from 'passport';
/* eslint-disable no-unused-vars */
const app = express();
require('dotenv').config();
mongoose.connect(config.cloudDbURL, { useNewUrlParser: true });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;
db.on(
  'error',
  console.error.bind(console, 'Database connection establishing error:')
);
app.use(morgan('combined'));
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
const jsonParser = bodyParser.json({ limit: 1024 * 1024 * 20, type: '*/*' });
app.use(jsonParser);
app.use(passport.initialize());
router(app);
app.use(function(err, req, res, next) {
  console.log(err);
  return res
    .status(500)
    .send({ error: 'Internal Server Error Has Occured! What a Shame...' });
});

app.listen(4000);

module.exports = app;
