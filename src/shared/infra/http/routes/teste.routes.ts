import { Router } from 'express';

const testeRouter = Router();

testeRouter.get('/', (req, res) => {
  return res.json({ ok: 'Ok__' });
});

export default testeRouter;
