/**
 * Required npm modules
 */
const bodyParser  = require('body-parser'),
      express     = require('express'),
      app         = express(),
      path        = require('path'),
      routes      = require('./routes');


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