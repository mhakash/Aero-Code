import S3 from 'aws-sdk/clients/s3';

const s3 = new S3({
  accessKeyId: 'minioadmin',
  secretAccessKey: 'minioadmin',
  endpoint: 'http://127.0.0.1:9000',
  s3ForcePathStyle: true, // needed with minio?
  signatureVersion: 'v4',
});

export const createPost = async (bucket: string, key: string): Promise<S3.PresignedPost> => {
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
