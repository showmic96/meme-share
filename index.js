const express = require('express');
const config = require('config');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Working Fine');
});

app.use(require('./api/user'));
app.use(require('./api/meme-image'));

app.use(express.static(__dirname));

const port = config.app.port;

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
