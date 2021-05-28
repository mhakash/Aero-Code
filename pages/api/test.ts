import type { NextApiRequest, NextApiResponse } from 'next';
// import { dbConnect } from '../../lib/utils/dbConnect';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  // const { db } = await dbConnect();
  // const movies = await db
  //   .collection("movies")
  //   .find({})
  //   .sort({ metacritic: -1 })
  //   .limit(20)
  //   .toArray();
  // res.json(movies);
  res.status(200).json({ gg: 'gg' });
};
