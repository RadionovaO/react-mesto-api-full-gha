require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
const routes = require('./routes');
const { errorsHandler } = require('./middlewares/errorsHandler');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// const { PORT, MONGODB } = require('./config');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

app.use(cookieParser());

// app.use(helmet());

// app.use(rateLimit({
//  windowMs: 15 * 60 * 1000,
//  max: 100,
// }));

app.use(cors);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on ${PORT} port`);
});
