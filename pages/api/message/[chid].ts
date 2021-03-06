import { getMessageByChatRoomId, addMessage } from 'lib/models/Message';
import { decodeToken } from 'lib/utils/firebaseAdmin';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { chid } = req.query;
  const key = Array.isArray(chid) ? chid[0] : chid;
  const token = req.headers['x-firebase-token'];

  // TODO: check authorization
  try {
    if (req.method === 'GET') {
      await decodeToken(req.headers['x-firebase-token'] as string);
      const t = await decodeToken(token as string);
      const user_id = t.uid;
      
      const data = await getMessageByChatRoomId(key, user_id);
      res.status(200).json(data);
    } else if (req.method === 'POST') {
      try {
        const t = await decodeToken(token as string);
        const user_id = t.uid;
        const res2 = await addMessage(key, user_id, req.body.msg);
        res.status(200).json(res2);
      } catch (err) {
        res.status(404).json({ message: 'unauthorized' }); // TODO:
      }
    }
  } catch (err) {
    res.status(404).send('not found');
  }
};
