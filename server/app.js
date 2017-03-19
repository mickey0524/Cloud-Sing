const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.all('*', (req, res, next) => {
  const origin = req.headers.origin;
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, token,sign');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
  next();
});

// app.get('/hello', function(req, res) {
//     console.log(req);
//     res.send('asd');
// });
routes(app);

app.listen(3000);
console.log('app started at port 3000...');