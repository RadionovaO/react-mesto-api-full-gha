const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routes = require('./routes');
const { errorsHandler } = require('./middlewares/errorsHandler');
const cors = require('./middlewares/cors');
const { PORT, MONGODB } = require('./config');

// const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors);

mongoose.connect(MONGODB);

app.use(routes);

app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on ${PORT} port`);
});
