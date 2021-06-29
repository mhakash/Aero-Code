import { MongoClient, Db } from 'mongodb';

const { MONGODB_URI, MONGODB_DB } = process.env;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

if (!MONGODB_DB) {
  throw new Error('Please define the MONGODB_DB environment variable inside .env.local');
}

interface ExtendedGlobal extends NodeJS.Global {
  mongo?: any;
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as ExtendedGlobal).mongo;

if (!cached) {
  cached = (global as ExtendedGlobal).mongo = { conn: null, promise: null };
}

export const dbConnect = async (): Promise<{ client: MongoClient; db: Db }> => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = MongoClient.connect(MONGODB_URI as string, opts).then((client) => ({
      client,
      db: client.db(MONGODB_DB),
    }));
  }
  cached.conn = await cached.promise;
  return cached.conn;
};
