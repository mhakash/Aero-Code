import { NextApiRequest, NextApiResponse } from 'next';
import { createPost } from '../../lib/utils/objectStorage';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const post = await createPost('code', 'nice');
  res.status(200).json(post);
}
