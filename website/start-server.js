import { createServer } from "vite";

async function startVite() {
  const server = await createServer({
    server: {
      host: true,
      watch: {
        usePolling: true,
        interval: 100,
      },
    },
  });
  await server.listen();
}

startVite();
