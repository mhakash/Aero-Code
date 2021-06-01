import { decodeToken } from 'lib/utils/firebaseAdmin';
import { NextApiRequest, NextApiResponse } from 'next';
import { createPost, getObject } from '../../../lib/utils/objectStorage';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === 'GET') {
    const { pid } = req.query;
    const key = Array.isArray(pid) ? pid[0] : pid;

    // TODO: check authorization
    try {
      await decodeToken(req.headers['x-firebase-token'] as string);
      const data = await getObject('codes', key);
      res.status(200).setHeader('Content-Type', 'image/jpeg').end(data, 'binary');
    } catch (err) {
      res.status(404).send('not found');
    }
  } else if (req.method === 'POST') {
    // TODO: create a object id and store in database
    const post = await createPost('code', 'nice');
    res.status(200).json(post);
  } else {
    res.status(405).send('method not allowed');
  }
};
