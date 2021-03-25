const express = require('express');
const config = require('config');
const bodyParser = require('body-parser')
const multer = require('multer');

const app = express();
const upload = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Working Fine');
});

app.use(require('./api/user'));

const port = config.app.port;

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
