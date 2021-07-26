import S3 from 'aws-sdk/clients/s3';

const LOCAL = process.env.LOCAL;

const s3 = new S3({
  accessKeyId: LOCAL ? 'minioadmin' : 'minio123',
  secretAccessKey: LOCAL ? 'minioadmin' : 'minio123',
  endpoint: LOCAL ? 'http://localhost:9000' : 'http://minio:9000',
  s3ForcePathStyle: true, // needed with minio?
  signatureVersion: 'v4',
});

export const createPost = async (
  bucket: string,
  key: string,
): Promise<S3.PresignedPost> => {
  const post = await s3.createPresignedPost({
    Bucket: bucket,
    Fields: {
      key: key,
    },
    Expires: 60, // seconds
    Conditions: [
      ['content-length-range', 0, 1048576 * 10], // up to 10 MB
    ],
  });
  return post;
};

export const getObject = async (bucket: string, key: string) => {
  const params = {
    Bucket: bucket,
    Key: key,
  };
  try {
    const x = await s3
      .getObject(params)
      .promise()
      .then((data) => data.Body);
    return x;
  } catch (err) {
    throw new Error('cannot get object');
  }
};
