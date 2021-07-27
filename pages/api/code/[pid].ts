import { getCodeById } from 'lib/models/Code';
import { createPost, createReply, getPostIdByCodeId } from 'lib/models/Post';
import { decodeToken } from 'lib/utils/firebaseAdmin';
import { getObject } from 'lib/utils/objectStorage';
import { NextApiRequest, NextApiResponse } from 'next';
import { ReviewContent } from 'types';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { pid } = req.query;
  const key = Array.isArray(pid) ? pid[0] : pid;
  // TODO: check authorization
  try {
    const t = await decodeToken(req.headers['x-firebase-token'] as string);
    if (req.method === 'GET') {
      const data = await getObject('code', key);
      const code = await getCodeById(key);
      const ext = code?.name.split('.').pop();
      // res.status(200).setHeader('Content-Type', 'image/jpeg').end(data, 'binary');
      res.status(200).json({ name: code?.name, ext: ext, data: data?.toString() });
    } else if (req.method === 'POST') {
      const post_id = await getPostIdByCodeId(key);
      const user_id = t.uid;
      const user_name = t.name;
      const review_content: ReviewContent = {
        type: req.body.type,
        severity: req.body.severity,
      };
      const res2 = await createReply(
        user_id,
        user_name,
        post_id,
        req.body.details,
        review_content,
      );
      res.status(200).send(res2);
    }
  } catch (err) {
    res.status(404).send('not found');
  }
};
