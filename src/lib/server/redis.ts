import { createClient } from 'redis';

let redis: ReturnType<typeof createClient>;

if (!globalThis.__redis) {
  const client = createClient({
    url: process.env.REDIS_URL ?? 'redis://localhost:6379'
  });

  client.on('error', (err) => {
    console.error('Redis error:', err);
  });

  await client.connect();

  globalThis.__redis = client;
}

redis = globalThis.__redis;

export default redis;