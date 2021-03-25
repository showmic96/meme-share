const express = require('express');
const config = require('config');

const app = express();

app.get('/', (req, res) => {
  res.send('Working Fine');
});

const port = config.app.port;

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
