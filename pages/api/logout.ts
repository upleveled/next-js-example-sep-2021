// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import { deleteSessionByToken } from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { token } = JSON.parse(req.body);

    // delete the session
    if (token) {
      await deleteSessionByToken(token);

      return res.status(200).end();
    }
  }

  return res.status(405);
}
