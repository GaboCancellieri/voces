var express = require('express'),
fileupload = require('express-fileupload');
app = express(),
PORT = process.env.PORT || 8443,
mongoose = require('mongoose'),
bodyParser = require('body-parser');
var cors = require('cors')
var https = require('https');
var fs = require('fs');
const path = require('path');
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://127.0.0.1:27017/voces', { useNewUrlParser: true, useUnifiedTopology: true }); 

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, authorization');

  // Set to true if you need the website to include cookies in the requests sent to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

//model loading
var UserAdmin = require('./api/user-admin/user.schema');
var Institucional = require('./api/institucional/institucional.schema');
var EquipoDocente = require('./api/institucional/equipo-docente/equipo-docente.schema');
var Areas = require('./api/areas/areas.schema');
var Shows = require('./api/shows/shows.schema');
var Compra = require('./api/compra/compra.schema');
var Entrada = require('./api/entrada/entrada.schema');
var Cliente = require('./api/cliente/cliente.schema');
var Album = require('./api/albums/albums.schema');
var Imagen = require('./api/imagenes/imagenes.schema');
var Actividad = require('./api/actividades/actividades.schema');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileupload());

// import routes
var userAdminRoutes = require('./api/user-admin/user.routes');
var institucionalRoutes = require('./api/institucional/institucional.routes');
var areasRoutes = require('./api/areas/areas.routes');
var showsRoutes = require('./api/shows/shows.routes');
var compraRoutes = require('./api/compra/compra.routes');
var entradaRoutes = require('./api/entrada/entrada.routes');
var clienteRoutes = require('./api/cliente/cliente.routes');
var albumRoutes = require('./api/albums/albums.routes');
var imageRoutes = require('./api/image/image.routes');
var imagenesRoutes = require('./api/imagenes/imagenes.routes');
var actividadesRoutes = require('./api/actividades/actividades.routes');
var contactoRoutes = require('./api/contacto/contacto.routes');

// register routes
userAdminRoutes(app);
institucionalRoutes(app);
areasRoutes(app);
showsRoutes(app);
compraRoutes(app);
entradaRoutes(app);
clienteRoutes(app);
albumRoutes(app);
imageRoutes(app);
imagenesRoutes(app);
contactoRoutes(app);
app.use('/api', actividadesRoutes);

// Point static path to dist
app.use(express.static(path.join(__dirname, '/')))

// https.createServer({
//     key: fs.readFileSync('escuelavoces.com.key.pem'),
//     cert: fs.readFileSync('escuelavoces.com.pem')
// }, app).listen(PORT, function(){
//     console.log("My https server listening on port " + PORT + "...");
// });

app.listen(PORT);