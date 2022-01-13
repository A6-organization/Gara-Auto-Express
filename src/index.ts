import express from 'express';
import { Request, Response } from 'express';

import env from './config/env';
const app = express();
const port = env.port;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
