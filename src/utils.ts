import { S3, SQS } from 'aws-sdk';
import { GetObjectRequest, PutObjectRequest } from 'aws-sdk/clients/s3';
import { SendMessageRequest } from 'aws-sdk/clients/sqs';

const s3 = new S3();
// Gets raw content of S3 file (utf-8) decoded
export const getS3Body = async (request: GetObjectRequest) => {
  const result = await s3.getObject(request).promise();
  return result?.Body?.toString('utf-8');
};

// Save to S3 bucket & retreive key & version
export const saveToS3 = async (request: PutObjectRequest) => {
  console.log('savingToS3 %s', JSON.stringify(request))
  const result = await s3().putObject(request).promise();
  return [request.Key, result.VersionId];
};

export const sendQueueMessage = async (request: SendMessageRequest) => {
  new SQS().sendMessage(request).promise();
};

// Used for parsing circular reference objects
export const safeStringify = (obj: any, indent = 2) => {
  let cache: any[] | null = [];
  const retVal = JSON.stringify(
    obj,
    (_key, value) => {
      if (typeof value === 'object' && value !== null) {
        return cache?.includes(value)
          ? undefined // Duplicate reference found, discard key
          : cache?.push(value) && value; // Store value in our collection
      }
      return value;
    },
    indent,
  );
  cache = null;
  return retVal;
};
