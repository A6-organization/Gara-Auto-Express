import cors from 'cors';
import './modules/cronEngine/cron';
import ExpressApplication from './app';
import routes from './routers';
import env, { Environment } from './config/env';

const middleWares = [cors()];

const app = new ExpressApplication({
  port:
    env.environment === Environment.Production
      ? parseInt(env.port)
      : parseInt(env.portLocal) || 8080,
  middleWares,
  routes,
});

app.listen();
