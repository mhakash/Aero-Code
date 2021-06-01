import { createCode } from 'lib/models/Code';
import { NextApiRequest, NextApiResponse } from 'next';
import { decodeToken } from '../../../lib/utils/firebaseAdmin';
import { createPost } from '../../../lib/utils/objectStorage';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const token = req.headers['x-firebase-token'];
  if (token) {
    try {
      const t = await decodeToken(token as string);
      const user_id = t.uid;
      
      const file_name = (Array.isArray(req.query.file))? req.query.file[0] : req.query.file;

      // TODO: find out who are reviewers
      await createCode(user_id, file_name);
      const post = await createPost('code', file_name);
      res.status(200).json(post);
    } catch (err) {
      res.status(404).json({ message: 'unauthorized' }); // TODO:
    }
  } else {
    res.status(403).json({ message: 'unauthorized' });
  }
};
