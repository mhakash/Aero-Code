import { getDiscussionByGroupID, addGroupMember } from 'lib/models/Group';
import { decodeToken } from 'lib/utils/firebaseAdmin';
import { getObject } from 'lib/utils/objectStorage';

import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const token = req.headers['x-firebase-token'];

    if (token) {
        const t = await decodeToken(token as string);
        const user_id = t.uid;

        if (req.method === 'GET') {
            const { grid } = req.query;
            const key = Array.isArray(grid) ? grid[0] : grid;
            try {
                const posts = await getDiscussionByGroupID(key, user_id);
                res.status(200).json(posts);
            } catch (err) {
                res.status(404).send('not found');
            }
        }
        else {
            const { grid } = req.query;
            const _id = req.body.id;
            const name = req.body.name;
            const key = Array.isArray(grid) ? grid[0] : grid;
            try {
                const ret = await addGroupMember(_id,name,key);
                const posts = await getDiscussionByGroupID(key, user_id);
                res.status(200).json(posts);
            } catch (err) {
                res.status(404).send('not found');
            }
        }
        
        }
        else {
            res.status(403).json({ message: 'unauthorized' });
        }
};