const Express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');

require('dotenv').config();

const UserRoute = require('./router/user.routes');
const ProductRoute = require('./router/product.routes');

const app = Express();

app.use(BodyParser.json());

app.use('/', ProductRoute);
app.use('/', UserRoute);

(async () => {
  await Mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  app.listen(8000);
})();

module.exports = {
  app,
};
