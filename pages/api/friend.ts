import { NextApiRequest, NextApiResponse } from 'next';
import { decodeToken } from '../../lib/utils/firebaseAdmin';
import { getUserById, getUsersByName } from 'lib/models/User';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const token = req.headers['x-firebase-token'];

  if (token) {
    const t = await decodeToken(token as string);
    const user_id = t.uid;

    if (req.method === 'POST') {
      try {
        const friend_name = req.body.name;
        const friends = await getUsersByName(friend_name);
        res.status(200).json(friends);
      } catch (err) {
        res.status(404).json({ message: 'unauthorized' }); // TODO:
      }
    } else if (req.method === 'GET') {
      // TODO
      try {
        const user = await getUserById(user_id);
        res.status(200).json(user?.friends);
      } catch (err) {
        res.status(404).json('not found');
      }
    }
  } else {
    res.status(403).json({ message: 'unauthorized' });
  }
};
