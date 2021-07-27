import { createPost } from 'lib/models/Post';
import { NextApiRequest, NextApiResponse } from 'next';
import { decodeToken } from '../../../lib/utils/firebaseAdmin';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const token = req.headers['x-firebase-token'];

  if (token) {
    const t = await decodeToken(token as string);
    const user_id = t.uid;
    const user_name = t.name;

    if (req.method === 'POST') {
      try {
        const res2 = await createPost(user_id, user_name, req.body.body);
        res.status(200).json(res2);
      } catch (err) {
        res.status(404).json({ message: 'unauthorized' }); // TODO:
      }
    }
  } else {
    res.status(403).json({ message: 'unauthorized' });
  }
};
