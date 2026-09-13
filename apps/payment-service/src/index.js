import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
const app = new Hono();
app.use('*', clerkMiddleware());
app.get('/health', (c) => {
    return c.json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: Date.now()
    });
});
app.get('/test', (c) => {
    const { userId } = getAuth(c);
    if (!userId) {
        return c.json({
            message: 'You are not logged in.',
        });
    }
    return c.json({
        message: 'Payment service are authenticated!',
    });
});
const start = (async () => {
    try {
        serve({
            fetch: app.fetch,
            port: 8002
        }, (info) => {
            console.log(`Payment Server is running on ${info.port}`);
        });
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
