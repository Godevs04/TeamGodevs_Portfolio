import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleContactSubmission } from '../server/contact/handler.js';
import { extractRequestMeta } from '../server/contact/request-meta.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const meta = extractRequestMeta({
    headers: req.headers,
    socketRemoteAddress: req.socket?.remoteAddress,
  });

  const result = await handleContactSubmission(req.body, meta);

  if (result.ok) {
    return res.status(200).json({ ok: true });
  }

  const errorResult = result as Extract<typeof result, { ok: false }>;
  return res.status(errorResult.status).json({ message: errorResult.message });
}
