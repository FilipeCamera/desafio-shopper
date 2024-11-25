import 'reflect-metadata';
import express, { Application, NextFunction, Request, Response } from 'express';
import dataSource, { driver1, driver2, driver3 } from './config/database';
import { rideRoute, customerRoute } from './routes';
import Driver from './entities/driver';

import 'dotenv/config';

class App {
  private static instance: App;
  private readonly app: Application;

  constructor() {
    this.app = express();
    this.loadDatabase();
    this.middlewares();
    this.routes();
  }

  private async loadDatabase() {
    try {
      await dataSource.initialize();

      if (dataSource.isInitialized) {
        console.log('Database loaded');
        const driverRepository = dataSource.getRepository(Driver);
        await driverRepository.clear();
        await driverRepository.upsert([driver1, driver2, driver3], ['_id']);
        console.log('Driver created in database');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }

  private middlewares() {
    this.app.use(express.json());
  }

  private routes() {
    this.app.use(rideRoute);
    this.app.use(customerRoute);
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
