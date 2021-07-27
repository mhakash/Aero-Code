import { getCodeById } from 'lib/models/Code';
import { createPost, createReply, getPostById, getPostIdByCodeId } from 'lib/models/Post';
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
      const post_id = await getPostIdByCodeId(key);
      const post = await getPostById(post_id);

      res.status(200).json(post);
    }
  } catch (err) {
    res.status(404).send('not found');
  }
};
