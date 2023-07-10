const {
  PORT = 3000,
  MONGODB = 'mongodb://127.0.0.1:27017/mestodb',
  JWT_SECRET,
  NODE_ENV,
} = process.env;

module.exports = {
  PORT,
  MONGODB,
  JWT_SECRET,
  NODE_ENV,
};
