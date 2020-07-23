require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { centerErrors } = require('./middlewares/centerErrors');
const { PORT, DATABASE_URL } = require('./config');
const routers = require('./routes/index');
const apiLimiter = require('./middlewares/limitter');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: ['http://localhost:8080', 'https://news-expl0rer.tk'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
console.log(DATABASE_URL);
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
  .use(errorLogger)
  .use(errors())
  .use(centerErrors)
  .listen(PORT, () => {
    console.info(`Listening on port ${PORT}`);
  });
