const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { centerErrors } = require('./middlewares/centerErrors');
const { DATABASE_URL, PORT } = require('./config');
const routers = require('./routes/index');

const app = express();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app
  .use(requestLogger)
  .use('/', apiLimiter)
  .use(routers)
  .use(errors())
  .use(errorLogger)
  .use(centerErrors)
  .listen(PORT, () => {
    console.info(`Listening on port ${PORT}`);
  });
