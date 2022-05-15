const express = require('express');
const app = express();
require('./models/dbConfig');
const beersRoutes = require('./routes/beersController');
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use('/beers', beersRoutes);

app.listen(5500, () => console.log('Serveur OK : 5500'));
