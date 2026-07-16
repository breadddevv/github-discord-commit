import type { FastifyInstance } from "fastify";
import { discordWebhook } from "../../processor/discord.ts";

export async function routes(server:FastifyInstance) {
  server.post('/:id/:token/discord', discordWebhook)
}