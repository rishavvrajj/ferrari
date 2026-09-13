import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { shouldBeUser } from './middleware/authMiddleware.js'

const app = new Hono()
app.use('*', clerkMiddleware())

app.get('/health', (c) => {
  return c.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now()
  })
});

app.get('/test', shouldBeUser, (c) => {
  return c.json({
    message: 'Payment service are authenticated!', 
    uesrId: c.get("userId")
  })
});

const start = (async () => {
  try {
    serve({
      fetch: app.fetch,
      port: 8002
    }, (info) => {
      console.log(`Payment Server is running on ${info.port}`)
    })

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();