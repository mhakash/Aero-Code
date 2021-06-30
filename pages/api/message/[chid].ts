import { getCodeById } from 'lib/models/Code';
import { getMessageByChatRoomId } from 'lib/models/Message';
import { decodeToken } from 'lib/utils/firebaseAdmin';
import { getObject } from 'lib/utils/objectStorage';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { chid } = req.query;
  const key = Array.isArray(chid) ? chid[0] : chid;
  // TODO: check authorization
  try {
    await decodeToken(req.headers['x-firebase-token'] as string);
    const msgs = await getMessageByChatRoomId(key);
    console.log(msgs);

    // res.status(200).setHeader('Content-Type', 'image/jpeg').end(data, 'binary');
    res.status(200).json(msgs);
  } catch (err) {
    res.status(404).send('not found');
  }
};
