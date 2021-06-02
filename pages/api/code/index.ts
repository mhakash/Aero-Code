import { createCode, getCodesByUserId } from 'lib/models/Code';
import { NextApiRequest, NextApiResponse } from 'next';
import { decodeToken } from '../../../lib/utils/firebaseAdmin';
import { createPost } from '../../../lib/utils/objectStorage';
import { Code } from 'types';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const token = req.headers['x-firebase-token'];

  if (token) {
    const t = await decodeToken(token as string);
    const user_id = t.uid;

    if (req.method === 'POST') {
      try {
        const file_name = Array.isArray(req.query.file)
          ? req.query.file[0]
          : req.query.file;

        // TODO: find out who are reviewers
        const code: Code = await createCode(user_id, file_name, []);
        const post = await createPost('code', code._id);
        res.status(200).json(post);
      } catch (err) {
        res.status(404).json({ message: 'unauthorized' }); // TODO:
      }
    } else if (req.method === 'GET') {
      // TODO
      try {
        const codes = await getCodesByUserId(user_id);
        res.status(200).json(codes);
      } catch (err) {
        res.status(404).json('not found');
      }
    }
  } else {
    res.status(403).json({ message: 'unauthorized' });
  }
};
