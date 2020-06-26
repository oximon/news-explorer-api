const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const userRouter = require('./routes/users');
const articleRouter = require('./routes/articles');
const indexRouter = require('./routes/index');
const { auth } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { centerErrors } = require('./middlewares/centerErrors');

const { PORT = 3000 } = process.env;
const app = express();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/news-explorer', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app
  .use(requestLogger)
  .use('/', apiLimiter)
  .use(indexRouter)
  .use(auth)
  .use(articleRouter)
  .use(userRouter)
  .use('*', (req, res) => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }))
  .use(errorLogger)
  .use(centerErrors)
  .listen(PORT, () => {
    console.info(`Listening on port ${PORT}`);
  });
