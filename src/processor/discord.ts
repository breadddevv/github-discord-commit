import axios from "axios";
import type { FastifyReply, FastifyRequest } from "fastify";
import { push } from "./lib/push.ts";
import type { GitHubPushWebhookPayload } from "../types/github-push.ts";

interface RequestParams {
  id: string;
  token: string;
}

export async function discordWebhook(
  req: FastifyRequest<{ Params: RequestParams; Body: GitHubPushWebhookPayload }>,
  res: FastifyReply,
) {
  const { id, token } = req.params;
  try {
    await axios.get(`https://discord.com/api/webhooks/${id}/${token}`);
  } catch {
    res.status(401).send({
      message: "Invalid Webhook Token",
      code: 50027,
    });
  };

  const type = req.headers["x-github-event"];

  switch (type) {
    case "push": {
      await axios.post(`https://discord.com/api/webhooks/${id}/${token}`, push(req.body as GitHubPushWebhookPayload))
      return
    }
  }
}
