import { addVote, getPostById } from 'lib/models/Post';
import { decodeToken } from 'lib/utils/firebaseAdmin';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { pid } = req.query;
  const key = Array.isArray(pid) ? pid[0] : pid;
  // TODO: check authorization
  try {
    await decodeToken(req.headers['x-firebase-token'] as string);
    if (req.method === 'GET') {
      const post = await getPostById(key);
      res.status(200).json(post);
    } else if (req.method === 'POST') {
      await addVote(key, req.body.type, req.body.add);
      res.status(200).send('Vote added successfully');
    }
  } catch (err) {
    res.status(404).send('Discussion Not Found');
  }
};
