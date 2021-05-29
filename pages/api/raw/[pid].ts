import { NextApiRequest, NextApiResponse } from 'next';
import { getObject } from '../../../lib/utils/objectStorage';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === 'GET') {
    const { pid } = req.query;
    const key = Array.isArray(pid) ? pid[0] : pid;

    const data = await getObject('codes', key);
    res.status(200).end(data, 'binary');
  } else {
    res.status(404).send('not found');
  }
};
