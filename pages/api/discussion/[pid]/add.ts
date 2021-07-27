import { addVote, createReply, getPostById } from 'lib/models/Post';
import { decodeToken } from 'lib/utils/firebaseAdmin';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { pid } = req.query;
  const key = Array.isArray(pid) ? pid[0] : pid;
  const token = req.headers['x-firebase-token'];
  // TODO: check authorization
  try {
    const t = await decodeToken(token as string);
    const user_id = t.uid;
    const user_name = t.name;

    const res2 = await createReply(user_id, user_name, key, req.body.body);
    res.status(200).json(res2);
  } catch (err) {
    res.status(404).send('Discussion Not Found');
  }
};
