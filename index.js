import { Storage } from "@google-cloud/storage";
import { Logging } from "@google-cloud/logging";
import { Datastore } from "@google-cloud/datastore";

const storage = new Storage();
const datastore = new Datastore();

async function deleteFile() {
  const bucketName = "my-bucket";
  const fileName = "my-file.txt";

  await storage.bucket(bucketName).file(fileName).delete();

  console.log(`gs://${bucketName}/${fileName} deleted`);
}

async function log(
  projectId = "YOUR_PROJECT_ID", // Your Google Cloud Platform project ID
  logName = "my-log" // The name of the log to write to
) {
  const logging = new Logging({ projectId });
  const log = logging.log(logName);
  const text = "Hello, world!";

  const metadata = {
    resource: { type: "global" },
    severity: "INFO",
  };

  const entry = log.entry(metadata, text);

  async function writeLog() {
    await log.write(entry);
    console.log(`Logged: ${text}`);
  }
  writeLog();
}

async function createDataStoreTask() {
  // The kind for the new entity
  const kind = "Task";

  // The name/ID for the new entity
  const name = "do something";

  // The Cloud Datastore key for the new entity
  const taskKey = datastore.key([kind, name]);

  // Prepares the new entity
  const task = {
    key: taskKey,
    data: {
      description: "do something",
    },
  };

  // Saves the entity
  await datastore.save(task);
  console.log(`Saved ${task.key.name}: ${task.data.description}`);
}

deleteFile().then(createDataStoreTask).then(log);
