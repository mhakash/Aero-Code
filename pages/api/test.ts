import { createUser, getUserById } from 'lib/models/User';
import type { NextApiRequest, NextApiResponse } from 'next';
// import { dbConnect } from '../../lib/utils/dbConnect';
import { decodeToken } from '../../lib/utils/firebaseAdmin';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const token = req.headers['x-firebase-token'];
  console.log('token', token);
  if (token) {
    try {
      const t = await decodeToken(token as string);

      const _id = t.uid;
      const email = t.email as string;
      const avatar = t.picture as string;

      const user = await getUserById(_id);

      if (user) {
        return res.status(200).json(user);
      } else {
        const newUser = await createUser({ email, avatar, _id });
        return res.status(200).json(newUser);
      }

      // console.log(t);
    } catch (err) {
      res.status(403).json({ message: 'unauthorized' });
    }
  }
};
