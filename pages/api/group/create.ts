import { NextApiRequest, NextApiResponse } from 'next';
import { decodeToken } from '../../../lib/utils/firebaseAdmin';
import { createNewGroup } from 'lib/models/Group';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const token = req.headers['x-firebase-token'];

  if (token) {
    const t = await decodeToken(token as string);
    const user_id = t.uid;
    const user_name = t.name;

    if (req.method === 'POST') {
      try {
        const groupname = req.body.groupname;
        const members: { _id: string; name: string; role: number }[] =
          req.body.members ?? [];

        console.log(groupname, members);

        const res2 = await createNewGroup(user_id, user_name, groupname, members);
        res.status(200).json(res2);
      } catch (err) {
        res.status(404).json({ message: 'unauthorized' }); // TODO:
      }
    } else if (req.method === 'GET') {
      // TODO
    }
  } else {
    res.status(403).json({ message: 'unauthorized' });
  }
};
