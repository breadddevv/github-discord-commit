import fastify from "fastify";
import consola from "consola";
import chalk from "chalk";
import SmeeClient from "smee-client";
import { routes } from "./routes/discord-commit/route.ts" 

const ForwardClient = new SmeeClient({
  source: "https://smee.io/z3XDvtdYfyGTlcbG",
  target: `http://127.0.0.1:3000/${process.env.DISCORD_WEBHOOK_ID}/${process.env.DISCORD_WEBHOOK_TOKEN}/discord`
});

const client = ForwardClient.start()

const server = fastify();
server.register(routes)

server.get('/', function (req, res) {
  res.send('Hello!');
});

server.listen({ port: 3000, host: '0.0.0.0' }, function (err) {
  if (err) {
    server.log.error(err);
    ForwardClient.stop()
    process.exit(1);
  }
  
  consola.success(`Server listening at ${chalk.green("http://localhost:3000")}`);
  consola.info(chalk.yellow('Press CTRL+C to stop.'));
});