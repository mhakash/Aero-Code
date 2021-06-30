import { addMessage,getMessageByChatRoomId } from 'lib/models/Message';
import { NextApiRequest, NextApiResponse } from 'next';
import { decodeToken } from '../../../lib/utils/firebaseAdmin';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const token = req.headers['x-firebase-token'];
  
    if (token) {
      const t = await decodeToken(token as string);
      const user_id = t.uid;
  
      if (req.method === 'POST') {
        try {
            const t = await decodeToken(token as string);
            const user_id = t.uid;
            const res2 = await addMessage(req.body.chat_room_id, user_id,req.body.msg);
            res.status(200).json(res2);
        } catch (err) {
          res.status(404).json({ message: 'unauthorized' }); // TODO:
        }
      } else if (req.method === 'GET') {
        // TODO
        try {

            ///EKHANE ENSURE KORA LAGBE J MESSAGE E DHUKLE JATE SENT SOB MESSAGE DEKHA JAY
            const messages = getMessageByChatRoomId(req.body.chid);
            res.status(200).json(messages);
            /*const user = await getUserById(user_id);
          res.status(200).json(user?.friends);
        */
        } catch (err) {
          res.status(404).json('not found');
        }
      }
    } else {
      res.status(403).json({ message: 'unauthorized' });
    }
  };
  