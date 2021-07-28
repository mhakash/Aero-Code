import { createCode, getCodesByUserId } from 'lib/models/Code';
import { NextApiRequest, NextApiResponse } from 'next';
import { decodeToken } from '../../../lib/utils/firebaseAdmin';
import { createObject } from '../../../lib/utils/objectStorage';
import { Code } from 'types';
import { createPost } from 'lib/models/Post';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const token = req.headers['x-firebase-token'];

  if (token) {
    const t = await decodeToken(token as string);
    const user_id = t.uid;
    const user_name = t.name;

    if (req.method === 'POST') {
      try {
        const file_name = unescape(req.body.file);
        const reviewers: string[] = req.body.reviewers ?? [];

        // console.log(file_name, reviewers);
        
        const code: Code = await createCode(user_id, file_name, reviewers);
        const post = await createObject('code', code._id);

        // TODO: change localhost to minio-url
        if (!process.env.LOCAL) post.url = post.url.replace('minio', 'localhost');
        if (process.env.RUNNER === 'yafi')
          post.url = post.url.replace('localhost', process.env.IP as string);
        const res2 = createPost(
          user_id,
          user_name,
          '',
          false,
          code._id,
          file_name,
          reviewers,
        );

        // console.log(post);
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
