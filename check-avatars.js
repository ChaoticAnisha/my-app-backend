const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://anishashah0117_db_user:3ixuAF6PRhbRIaxR@cluster0.lxyqvx1.mongodb.net/my-app-db";

async function checkAvatars() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("my-app-db");
    const users = await db.collection("users").find({}).toArray();

    console.log("Users with avatars:");
    users.forEach((user) => {
      if (user.avatar) {
        console.log(`${user.name}: ${user.avatar}`);
      }
    });
  } finally {
    await client.close();
  }
}

checkAvatars();
