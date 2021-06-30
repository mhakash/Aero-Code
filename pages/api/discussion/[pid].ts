import { getPostById } from 'lib/models/Post';
import { decodeToken } from 'lib/utils/firebaseAdmin';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { pid } = req.query;
  const key = Array.isArray(pid) ? pid[0] : pid;
  // TODO: check authorization
  try {
    await decodeToken(req.headers['x-firebase-token'] as string);
    const post = await getPostById(key);
    res.status(200).json(post);
  } catch (err) {
    res.status(404).send('Discussion Not Found');
  }
};
