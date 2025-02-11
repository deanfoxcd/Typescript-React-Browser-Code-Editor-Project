import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { createCellsRouter } from './routes/cells';

export function serve(
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
) {
  const app = express();

  app.use(createCellsRouter(filename, dir));

  if (useProxy) {
    app.use(
      createProxyMiddleware({
        target: 'http://localhost:3000',
        ws: true,
        // logger: 'silent',
      })
    );
  } else {
    const packagePath = require.resolve(
      '@foxy-jsnote/local-client/build/index.html'
    );
    app.use(express.static(path.dirname(packagePath)));
  }

  return new Promise<void>((resolve, reject) => {
    const server = app.listen(port, () => {
      console.log('Server running on port', port);
      resolve();
    });

    server.on('error', (err) => reject(err));
  });
}
