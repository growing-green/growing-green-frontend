require('dotenv').config();

module.exports = {
  baseURL: process.env.REACT_APP_BASE_URL,
  corsOption: {
    origin: '*',
    optionsSuccessStatus: 200,
  },
  tokenSecretKey: process.env.TOKEN_SECRET_KEY,
};
