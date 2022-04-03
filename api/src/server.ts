import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import fileupload from 'express-fileupload';
import https from 'https';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

// SWAGGER IMPORTS

// IMPORT ROUTES

//CRON

class Server {
  public app: express.Application;
  public host: string = process.env.HOST || '0.0.0.0';
  public port: string = process.env.PORT || '3000';

  constructor() {
    /* Inicializaciones esenciales como conexiones con la DB, 
        rutas, config de middleware que se pueden hacer en metodos aparte (por prolijidad)*/
    this.app = express();
    this.app.use(express.json({ limit: '200mb' }));
    this.app.use(fileupload());
    this.app.set('port', this.port);
    mongoose.Promise = global.Promise;
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.connect(
      `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/voces`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    this.config();
    this.routes();
  }

  config() {
    /* middleware y dependencias importantes para nuestra app */
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(
      express.urlencoded({
        extended: false
      })
    );
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(cors());

    // Add headers
    this.app.use((req, res, next) => {
      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', '*');

      // Request methods you wish to allow
      res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
      );

      // Request headers you wish to allow
      res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With, Content-Type, authorization'
      );

      // Set to true if you need the website to include cookies in the requests sent to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', 'true');

      // Pass to next layer of middleware
      next();
    });
  }

  routes() {
    /* las rutas de la app */
  }

  start() {
    if (process.env.NODE_ENV === 'production') {
      https
        .createServer(
          {
            key: fs.readFileSync('cadenacampoargentino.com.key.pem'),
            cert: fs.readFileSync('cadenacampoargentino.com.pem')
          },
          this.app
        )
        .listen(this.port, () => {
          console.log(
            `My https server listening on: ${this.host}:${this.app.get(
              'port'
            )}...`
          );
        });
    } else if (process.env.NODE_ENV === 'development') {
      this.app.listen(this.app.get('port'), this.host, () => {
        /* cosas que se hagan despues del start */
        console.log(
          `Server is running on: ${process.env.HOST}:${process.env.PORT}`
        );
      });
    }
  }
}

// CREAMOS UN NUEVO OBJETO DE LA CLASE SERVER Y LO STARTEAMOS
const server = new Server();
server.start();
