import Fastify from 'fastify';
import { clerkPlugin } from '@clerk/fastify'
import { shouldBeUser } from './middleware/authMiddleware.js';

const fastify = Fastify();
fastify.register(clerkPlugin);

fastify.get('/health', (request, reply) => {
    return reply.status(200).send({
        status: "ok",
        uptime: process.uptime(),
        timestamp: Date.now()
    })
});

fastify.get('/test', { preHandler: shouldBeUser }, (request, reply) => {
    return reply.send({ 
        message: "Order Service is authenticated!",
        userId: request.userId 
    })
});

const start = (async () => {
    try {
        await fastify.listen({ port: 8001 })
        console.log("Order Service is running on 8001")
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
})();