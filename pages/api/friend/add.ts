import { NextApiRequest, NextApiResponse } from 'next';
import { decodeToken } from '../../../lib/utils/firebaseAdmin';
import { addFriend } from 'lib/models/User';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const token = req.headers['x-firebase-token'];

  if (token) {
    try {
      const t = await decodeToken(token as string);
      const user_id = t.uid; 
      const friend_id = req.body.id;
      const friend_name = req.body.name;
      const res2 = await addFriend(user_id, friend_id, friend_name);
      res.status(200).json(res2);
    } catch (err) {
      res.status(404).json('not found');
    }
  } else {
    res.status(403).json({ message: 'unauthorized' });
  }
};
