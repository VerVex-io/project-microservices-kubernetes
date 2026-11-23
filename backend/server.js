
import cors from 'cors';
import express from 'express';
import {createClient} from 'redis';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Redis connection
const redis =
    createClient({url: process.env.REDIS_URL || 'redis://localhost:6379'});

redis.on('error', (err) => {
  console.error('Redis Error:', err.message);
});

async function startServer() {
  await redis.connect();
  console.log('Connected to Redis!');

  app.get('/api/health', (req, res) => {
    res.json({status: 'OK', service: 'backend'});
  });

  app.get('/api/visits', async (req, res) => {
    const visits = await redis.incr('visitors');
    res.json({visits});
  });

  app.get('/api/visits/count', async (req, res) => {
    const visits = await redis.get('visitors') || '0';
    res.json({visits: Number(visits)});
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend running on port ${PORT}`);
  });
}

startServer().catch(console.error);
