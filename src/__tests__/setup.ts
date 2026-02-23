import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Use test database
const TEST_DB_URI = process.env.MONGO_URI?.replace('my-app-db', 'my-app-db-test') || 'mongodb://localhost:27017/my-app-db-test';

beforeAll(async () => {
  await mongoose.connect(TEST_DB_URI);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});