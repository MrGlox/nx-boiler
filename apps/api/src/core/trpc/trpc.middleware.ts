import type { Request, Response } from 'express';

export function trpc(req: Request, res: Response) {
  console.log('Trpc request', req);

  res.send({ message: 'Hello, world!' });
}
