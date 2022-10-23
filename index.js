const express = require('express');
const app = express();
require('./data/dbConfig');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const beersRoutes = require('./routes/beersRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use(bodyParser.json());

app.use(cors());

app.all("/*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-type");
    res.header("Access-Control-Allow-Headers", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    next();
  });

app.use('/beers', beersRoutes);
app.use('/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.listen(5500, () => console.log('Serveur OK : 5500'));
