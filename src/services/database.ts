import mongoose, { Error, Mongoose, ConnectionOptions } from "mongoose";
import EventEmitter from "events";

const db: mongoose.Connection = mongoose.connection;

export interface IDatabaseConfig {
  url: string;
  client: Promise<Mongoose>;
  config: ConnectionOptions;
  event: EventEmitter;
  initialize: () => {};
}

export class DatabaseService implements IDatabaseConfig {
  url: string;
  client: Promise<Mongoose>;
  config: ConnectionOptions;
  event: EventEmitter;

  constructor(url: string) {
    this.url = url;
    this.config = {};
    this.event = new EventEmitter();

    this.config.useNewUrlParser = true;
    this.config.useUnifiedTopology = true;
  }

  public async initialize() {
    this.client = mongoose.connect(this.url, this.config);

    db.on('error', (error: Error) => {
      console.log(error);
    });

    db.once('open', () => {
      this.event.emit('initialize');
    });
  }
  
  public async close() {
    mongoose.connection.close(true);
  }
}

export default new DatabaseService(process.env.DATABASE_URL);