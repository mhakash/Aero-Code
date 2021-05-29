import { NextApiRequest, NextApiResponse } from 'next';
// import { createUser } from '../../../lib/models/User'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    // await createUser();
  } catch {
    console.log('nice erro cannot create user');
  }
  res.status(200).json({ name: 'John Doe' });
};
