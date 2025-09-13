const {MongoClient} = require("mongodb");

const url = "mongodb+srv://tahirbasha2626:lAPTOA89hc9p6vpn@cluster-mtb.l0jojlm.mongodb.net/?retryWrites=true&w=majority&appName=cluster-mtb";
const client = new MongoClient(url);
const database = 'mongo_mtb';
async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(database);
  const collection = db.collection('User');
  const data = {
    firstname: "Basha",
    lastname: "Basha",
    city: "Bangalore"
  };
  const insertResult = await collection.insertOne(data);
  const result = await collection.find({}).toArray();
  console.log(result);

  // the following code examples can be pasted here...

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());