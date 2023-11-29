import { Storage } from "@google-cloud/storage";

const storage = new Storage();

async function deleteFile() {
  const bucketName = "my-bucket";
  const fileName = "my-file.txt";

  await storage.bucket(bucketName).file(fileName).delete();

  console.log(`gs://${bucketName}/${fileName} deleted`);
}

deleteFile();
