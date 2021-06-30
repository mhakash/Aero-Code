import { getMessageByChatRoomId, addMessage } from 'lib/models/Message';
import { decodeToken } from 'lib/utils/firebaseAdmin';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { chid } = req.query;
  const key = Array.isArray(chid) ? chid[0] : chid;
  const token = req.headers['x-firebase-token'];
  
  // TODO: check authorization
  try {
    if(req.method === 'GET'){
      await decodeToken(req.headers['x-firebase-token'] as string);
    const msgs = await getMessageByChatRoomId(key);
    console.log(msgs);
    // res.status(200).setHeader('Content-Type', 'image/jpeg').end(data, 'binary');
    res.status(200).json(msgs);
    }
    else if (req.method === 'POST') {
      try {
          const t = await decodeToken(token as string);
          const user_id = t.uid;
          const res2 = await addMessage(req.body.chat_room_id,user_id,req.body.msg);
          res.status(200).json(res2);
      } catch (err) {
        res.status(404).json({ message: 'unauthorized' }); // TODO:
      }
    }
  } catch (err) {
    res.status(404).send('not found');
  }
};
