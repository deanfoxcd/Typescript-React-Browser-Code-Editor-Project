import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import { stringify } from 'querystring';

interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}

export function createCellsRouter(filename: string, dir: string) {
  const router = express.Router();

  const fullPath = path.join(dir, filename);

  router.get('/cells', async (req, res) => {});

  router.post('/cells', async (req, res) => {
    const { cells }: { cells: Cell[] } = req.body;

    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');

    res.send({ status: 'ok' });
  });

  return router;
}
