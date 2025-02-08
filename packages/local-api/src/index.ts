import express from 'express';

export function serve(port: number, filename: string, dir: string) {
  const app = express();

  return new Promise<void>((resolve, reject) => {
    const server = app.listen(port, () => {
      console.log('Server running on port', port);
      resolve();
    });

    server.on('error', (err) => reject(err));
  });
}
