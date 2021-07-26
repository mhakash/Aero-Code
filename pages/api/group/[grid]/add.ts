import { createGroupCode, getCodesByUserId } from 'lib/models/Code';
import { createGroupPost } from 'lib/models/Post';
import { NextApiRequest, NextApiResponse } from 'next';
import { decodeToken } from '../../../../lib/utils/firebaseAdmin';
import { createPost } from '../../../../lib/utils/objectStorage';
import { Code } from 'types';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const token = req.headers['x-firebase-token'];

  if (token) {
    const t = await decodeToken(token as string);
    const user_id = t.uid;
    const user_name = t.name;

    if (req.method === 'POST') {
      try {
        const filename = req.body.filename;
        const grid = req.body.grid;
        const body = req.body.txt;
        
        console.log(filename, grid, body);
        let code_id:string ="";
        let code_name: string = "";
        if(filename!==""){
          console.log("code paisi aijka");
          const code: Code = await createGroupCode(user_id, filename, grid);
          code_id = code._id;
          code_name = code.name;
        }

        const res2 = await createGroupPost(user_id, user_name, body, code_id, code_name, grid);
            
        
        // TODO: change localhost to minio-url
        if(filename!==""){
          const post = await createPost('code', code_id);
          if (!process.env.LOCAL) post.url = post.url.replace('minio', 'localhost');
          console.log(post);
          res.status(200).json(post);
        }else{
          res.status(200).json(res2);
        }
        
      } catch (err) {
        res.status(404).json({ message: 'unauthorized' }); // TODO:
      }
    }
  } else {
    res.status(403).json({ message: 'unauthorized' });
  }
};
