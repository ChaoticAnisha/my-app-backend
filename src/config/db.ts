import mongoose from 'mongoose';
import { ENV } from './env';

export const connectDB = async () => {
  try {
    if (!ENV.MONGO_URI) {
      console.error('❌ MONGO_URI is not set in environment variables');
      console.error('Please create a .env file with MONGO_URI=mongodb://localhost:27017/my-app-db');
      process.exit(1);
    }

    await mongoose.connect(ENV.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error: any) {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('\n💡 Troubleshooting steps:');
    console.error('1. Make sure MongoDB is installed and running');
    console.error('2. For local MongoDB: Start the service with "mongod" or "net start MongoDB"');
    console.error('3. Check your .env file has MONGO_URI set correctly');
    console.error('4. For MongoDB Atlas: Use your connection string from Atlas dashboard');
    console.error('5. Verify MongoDB is accessible at the specified URI\n');
    process.exit(1);
  }
};
