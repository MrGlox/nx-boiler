import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { getEvent } from "vinxi/http";

import { server, transports } from "@/utils/demo.sse";

export const APIRoute = createAPIFileRoute("/api/sse")({
	// @ts-ignore
	GET: async ({}) => {
		const transport = new SSEServerTransport(
			"/api/messages",
			getEvent().node.res,
		);
		transports[transport.sessionId] = transport;
		transport.onerror = (error) => {
			console.error(error);
		};
		getEvent().node.res.on("close", () => {
			delete transports[transport.sessionId];
		});
		await server.connect(transport);
	},
});
