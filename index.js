import { Storage } from "@google-cloud/storage";
import { BigQuery } from "@google-cloud/bigquery";

const storage = new Storage();
const bigqueryClient = new BigQuery();

async function deleteFile() {
  const bucketName = "my-bucket";
  const fileName = "my-file.txt";

  await storage.bucket(bucketName).file(fileName).delete();

  console.log(`gs://${bucketName}/${fileName} deleted`);
}

async function createDataset() {
  const [dataset] = await bigqueryClient.createDataset("my_new_dataset");
  console.log(`Dataset ${dataset.id} created.`);
}

deleteFile().then(createDataset);
