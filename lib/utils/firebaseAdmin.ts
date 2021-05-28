import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.CLIENT_EMAIL,
      privateKey: process.env.PRIVATE_KEY,
      projectId: process.env.PROJECT_ID,
    }),
  });
}

export const decodeToken = async (token: string): Promise<admin.auth.DecodedIdToken> => {
  try {
    const user = await admin.auth().verifyIdToken(token);

    return user;
  } catch (err) {
    throw new Error('Invalid Token');
  }
};
