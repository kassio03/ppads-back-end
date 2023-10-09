import { Storage } from '@google-cloud/storage';
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

export const sendBase64 = (image: string): string => {
  const gc = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
  });

  const fileName = uuidv4();
  const baseBucketUrl = 'https://storage.googleapis.com/happens-here/';

  const bucket = gc.bucket('happens-here');
  const file = bucket.file(fileName);

  const buffer = Buffer.from(
    image.replace(/^data:image\/\w+;base64,/, ''),
    'base64',
  );

  const stream = file.createWriteStream({
    metadata: {
      contentType: 'image/png',
    },
  });
  stream.on('error', (err) => {
    console.log(err);
  });
  stream.on('finish', () => {
    console.log('Image uploaded.');
  });
  stream.end(buffer);

  return baseBucketUrl + fileName;
};
