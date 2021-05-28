import type { NextApiRequest, NextApiResponse } from 'next';
// import { dbConnect } from '../../lib/utils/dbConnect';
import { decodeToken } from '../../lib/utils/firebaseAdmin';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  // const { db } = await dbConnect();
  // const movies = await db
  //   .collection("movies")
  //   .find({})
  //   .sort({ metacritic: -1 })
  //   .limit(20)
  //   .toArray();
  // res.json(movies);
  const token = req.headers['x-firebase-token'];
  if (token) {
    try {
      const t = await decodeToken(token as string);
      console.log(t);
    } catch (err) {
      console.log(err);
    }
  }
  console.log('done');

  res.status(200).json({ gg: 'gg' });
};
