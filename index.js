const express = require('express');
const app = express();
require('./data/dbConfig');
const bodyParser = require('body-parser');
const cors = require('cors');

const beersRoutes = require('./routes/beersRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use(bodyParser.json());
// accès à tous
app.use(cors());

/*app.all("/*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
*/
app.use('/beers', beersRoutes);
app.use('/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')))

app.listen(5500, () => console.log('Serveur OK : 5500'));
