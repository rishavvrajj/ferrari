import { getAuth } from "@clerk/fastify";
import { FastifyRequest, FastifyReply } from "fastify";

declare module "fastify" {
    interface FastifyRequest {
        userId?: string
    }
}

export const shouldBeUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const auth = getAuth(request);
    const userId = auth.userId;

    if (!userId) {
        return reply.status(401).send({ message: "You are not logged in!" })
    }

    request.userId = userId;
}