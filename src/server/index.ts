import { Server } from "./server";

export async function start() {
    const port = parseInt(process.env.PORT ?? '4781');

    const server = new Server(port);

    await server.init();
    await server.start();
}

