const MongoClient = require('mongodb').MongoClient;
const uri ="";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect(async (err) => {
  console.log('conectando');
  const collection = client.db('podCast-api').collection('podcasts');
  let documents = await collection.find({ category: 'Lifestyle' }).toArray();
  console.log(documents);
  const databaseList = await client.db().admin().listDatabases();

  databaseList.databases.forEach((db) => {
    console.log(`- ${db.name}`);
  });
  client.close();
});
