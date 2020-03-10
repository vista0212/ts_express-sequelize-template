import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';

import { connect } from './database/index';

import apiController from './routes/apiController';

dotenv.config();

const app: express.Application = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use('/api', apiController);

app.use((req, res, next) => {
  // err.status = 404;
  res.status(404).json({
    success: false,
    message: 'Not Found Page'
  });
});

connect(false, true).then(() => console.log('데이터베이스와 성공적으로 연결되었습니다.')); // database connection

export default app;
