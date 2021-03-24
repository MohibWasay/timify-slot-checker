import express, { Express } from "express";
import process from 'process';

require('dotenv').config();

import database, { IDatabaseConfig } from "@app/services/database";

import routes from "@app/routes/routes";
import { prepopulateData } from "@app/utils/generate";

export class Application {
  public server: Express = express();
  public database: IDatabaseConfig = database;

  constructor() {
    this.configureApp();
    this.applyMiddlewares();
    this.initializeDatabase();
    this.registerRoutes();
  }

  configureApp() {}

  initializeDatabase() {
    this.database = database;
    this.database.initialize();
    this.database.event.on('initialize', () => {
      if (process.env.PREPOPULATE_DATA) {
        prepopulateData();
      }
    });
  }

  applyMiddlewares() {
    this.server.use(express.json());
  }

  registerRoutes() {
    this.server.use(routes);
  }
}

const app = new Application();

export default app;