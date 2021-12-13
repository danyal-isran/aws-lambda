/* eslint-disable import/prefer-default-export */
import { Context, S3Event, S3Handler } from 'aws-lambda';
import { execute } from './main';

export const handler: S3Handler = async (event: S3Event, context: Context) => {
  console.log('Received event', JSON.stringify(event));
  await execute(event);
};

// Download the file in memory
// Split the file into chunks & save into S3
// Put the filename:version into an SQS queue
// Recursively until all contents of file have been processed

// Lambda execution role: Must allow access to S3 buckets & send messages to SQS queue
// S3 bucket policy: Must allow to trigger lambda

// Second lambda:
// Reads paritioned file & processes that file
// Summarize data
