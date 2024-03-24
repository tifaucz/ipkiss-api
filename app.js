const express = require('express');
const app = express();
const port = 3000;
const apiRouter = require('./api');

app.use(express.json());
app.use('/', apiRouter);

app.listen(port, () => {
  console.log(`API is listening at http://localhost:${port}`);
});

module.exports = app;
