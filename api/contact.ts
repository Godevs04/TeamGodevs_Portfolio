import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleContactSubmission } from '../server/contact/handler';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const result = await handleContactSubmission(req.body);

  if (!result.ok) {
    return res.status(result.status).json({ message: result.message });
  }

  return res.status(200).json({ ok: true });
}
