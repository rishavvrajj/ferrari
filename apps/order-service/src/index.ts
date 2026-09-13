import Fastify from 'fastify';
import { clerkPlugin, getAuth } from '@clerk/fastify'

const fastify = Fastify();
fastify.register(clerkPlugin);

fastify.get('/health', (request, reply) => {
    return reply.status(200).send({
        status: "ok",
        uptime: process.uptime(),
        timestamp: Date.now()
    })
});

fastify.get('/test', (request, reply) => {
    const { userId } = getAuth(request);
    if (!userId) {
        return reply.send({ message: "You are not logged In!" })
    }
    return reply.send({ message: "Order Service is authenticated!" })
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