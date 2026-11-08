import type { Request, Response } from 'express';
import { handleContactSubmission } from '../services/contact.service.js';
import { extractRequestMeta } from '../utils/request-meta.js';

export async function submitContact(req: Request, res: Response) {
  await handleContactSubmission(req.body, extractRequestMeta(req));
  res.status(200).json({ ok: true });
}
