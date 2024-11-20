import express, { Application } from 'express';

class App {
  private static instance: App;
  private readonly app: Application;

  constructor() {
    this.app = express();
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
