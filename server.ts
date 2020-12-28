import * as dotenv from 'dotenv';

import { app } from './app';

dotenv.config();

const start = () => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log("Listening on port", PORT);
  })
}

start();
