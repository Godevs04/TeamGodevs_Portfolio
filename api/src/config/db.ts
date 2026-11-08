import mongoose from 'mongoose';
import { env } from './env.js';

mongoose.set('strictQuery', true);
// Fail fast instead of queueing queries for 10s when the database is unreachable.
mongoose.set('bufferCommands', false);

export function isDatabaseReady(): boolean {
  return mongoose.connection.readyState === mongoose.ConnectionStates.connected;
}

export async function connectDatabase(): Promise<void> {
  if (!env.mongodbUri) {
    console.warn('MONGODB_URI is not set — running without a database (nothing will be persisted).');
    return;
  }

  mongoose.connection.on('disconnected', () => console.warn('MongoDB disconnected.'));
  mongoose.connection.on('reconnected', () => console.info('MongoDB reconnected.'));
  mongoose.connection.on('error', (error) => console.error('MongoDB error:', error.message));

  await mongoose.connect(env.mongodbUri, {
    dbName: env.mongodbDbName,
    serverSelectionTimeoutMS: 10_000,
  });

  console.info(`Connected to MongoDB (database: ${env.mongodbDbName}).`);
}

export async function disconnectDatabase(): Promise<void> {
  if (mongoose.connection.readyState !== mongoose.ConnectionStates.disconnected) {
    await mongoose.disconnect();
  }
}
