/* eslint-disable no-await-in-loop */
import { S3Event } from 'aws-lambda';
import * as fs from 'fs';
import { getS3Body, safeStringify, saveToS3, sendQueueMessage } from './utils';
// import Users from "./constants/Users.json";
import { User } from './interfaces/User';
import { getTransformUser } from './transformer';

const S3_OUTBOUND_BUCKET =
  process.env.S3_OUTBOUND_BUCKET || 'arn:aws:s3:::upstart-outbound';
const PARTITION_SIZE = parseInt?.(process.env.PARTITION_SIZE ?? '20', 10);
const SQS_QUEUE = process.env.SQS_QUEUE || 'https://sqs.us-east-1.amazonaws.com/918238137035/upstart-queue';

export const partitionObjectKey = async (request: PartitionFileRequest) => {
  const { Bucket, Key, size } = request;
  const s3Content =
    (await getS3Body({
      Bucket,
      Key,
    })) || '';
  const allUsers: User[] = JSON.parse(s3Content);

  let page = 0;
  while (page * size < allUsers.length) {
    const start = page * size;
    const end = start + size;
    const sliced = allUsers
      .slice(start, end + size)
      .map((user) => getTransformUser(user));
    const partitionKey = `${Key}-partition-${page + 1}.json`;
    const [pKey, pVersionId] = await saveToS3({
      Bucket: S3_OUTBOUND_BUCKET,
      Key: partitionKey,
      Body: safeStringify(sliced),
      ContentEncoding: 'utf-8',
    });
    await sendQueueMessage({
      QueueUrl: SQS_QUEUE,
      MessageBody: `${pKey}:${pVersionId}`,
    });
    page += 1;
  }
};


export const execute = async (s3Event: S3Event) => {
  await partitionObjectKey({
    Bucket: s3Event.Records[0].s3.bucket.name,
    Key: s3Event.Records[0].s3.object.key,
    size: PARTITION_SIZE,
  });
};
