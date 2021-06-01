import { getObject } from 'lib/utils/objectStorage';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { pid } = req.query;
  const key = Array.isArray(pid) ? pid[0] : pid;
  // TODO: check authorization
  try {
    //await decodeToken(req.headers['x-firebase-token'] as string);
    const data = await getObject('code', key);
    // res.status(200).setHeader('Content-Type', 'image/jpeg').end(data, 'binary');
    res.status(200).send(data?.toString());
  } catch (err) {
    res.status(404).send('not found');
  }
};
