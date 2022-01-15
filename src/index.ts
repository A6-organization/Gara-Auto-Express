import cors from 'cors';
import ExpressApplication from './app';
import routes from './routers';
import env from './config/env';

const middleWares = [cors()];

const app = new ExpressApplication({
  port: parseInt(env.port) || 8080,
  middleWares,
  routes,
});

app.listen();
