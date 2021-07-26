import { getDiscussionByGroupID } from 'lib/models/Group';
import { decodeToken } from 'lib/utils/firebaseAdmin';
import { getObject } from 'lib/utils/objectStorage';

import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const token = req.headers['x-firebase-token'];

    if (token) {
        const { grid } = req.query;
        const key = Array.isArray(grid) ? grid[0] : grid;
        try {
            const posts = await getDiscussionByGroupID(key);
            res.status(200).json(posts);
        } catch (err) {
            res.status(404).send('not found');
    }
}
};