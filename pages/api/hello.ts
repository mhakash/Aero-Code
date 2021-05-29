// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import { getObject } from '../../lib/utils/objectStorage';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const data = await getObject('codes', 'New web banner 3.png');

  res.status(200).end(data, 'binary');
};
