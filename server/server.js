/**
 * Required npm modules
 */
const bodyParser  = require('body-parser'),
      express     = require('express'),
      app         = express(),
      path        = require('path'),
      routes      = require('./routes');

/**
 * allowCrossDomain - Sets headers to allow for CORS
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
// Add allowCrossDomain as middleware
app.use(allowCrossDomain);

/**
 * Serve static files
 */
app.use(express.static(path.join(__dirname, './../client')));

/**
 * Automatically parse request body and store in req.body
 */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/**
 * ROUTING
 */

// use these routes for anything with /api
app.use('/api', routes);






app.set('port', 8080);

app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`);
});