import * as https from 'https';
import * as fs from 'fs';

import app from './app';
import { PORT } from './config/index';

const httpsOptions = {
  key: fs.readFileSync('./security/key.pem'),
  cert: fs.readFileSync('./security/cert.pem')
};

https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log('Express server listening on port ' + PORT);
})
