var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
bodyParser = require('body-parser');
var cors = require('cors')
const path = require('path');
app.use(cors())
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost/voces', { useNewUrlParser: true, useUnifiedTopology: true }); 

//model loading
var UserAdmin = require('./api/user-admin/user.schema');
var Institucional = require('./api/institucional/institucional.schema');
var EquipoDocente = require('./api/institucional/equipo-docente/equipo-docente.schema');
var Areas = require('./api/areas/areas.schema');
var Shows = require('./api/shows/shows.schema');
var Compra = require('./api/compra/compra.schema');
var Entrada = require('./api/entrada/entrada.schema');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// import routes
var userAdminRoutes = require('./api/user-admin/user.routes');
var institucionalRoutes = require('./api/institucional/institucional.routes');
var areasRoutes = require('./api/areas/areas.routes');
var showsRoutes = require('./api/shows/shows.routes');
var compraRoutes = require('./api/compra/compra.routes');
var entradaRoutes = require('./api/entrada/entrada.routes');

// register routes
userAdminRoutes(app);
institucionalRoutes(app);
areasRoutes(app);
showsRoutes(app);
compraRoutes(app);
entradaRoutes(app);

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')))

// Catch other routes and return index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

app.listen(port);

console.log('Servidor Corriendo: ' + port);