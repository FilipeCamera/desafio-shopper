import 'reflect-metadata';
import express, { Application, NextFunction, Request, Response } from 'express';
import dataSource from './config/database';
import rideRoute from './routes';
import { ValidationError } from 'express-json-validator-middleware';

class App {
  private static instance: App;
  private readonly app: Application;

  constructor() {
    this.app = express();
    this.loadDatabase();
    this.middlewares();
    this.routes();
  }

  private loadDatabase() {
    dataSource
      .initialize()
      .then(() => console.log('Database loaded!'))
      .catch((error) => console.error('Error: ', error));
  }

  private middlewares() {
    this.app.use(express.json());
  }

  private routes() {
    this.app.use(rideRoute);
  }

  public static getInstance(): App {
    if (!App.instance) {
      App.instance = new App();
    }

    return App.instance;
  }

  public listen(port: number) {
    this.app.listen(port, () => console.log('Listen port:' + port));
  }
}

export default App.getInstance();
