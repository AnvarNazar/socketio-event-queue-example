require("dotenv").config();
const server = require("./server");

server.get("/", (req, reply) => {
	server.io.emit("hello");
});

server.ready().then(() => {
	// we need to wait for the server to be ready, else `server.io` is undefined
	server.io.on("connection", (socket) => {
		// ...
	});
});

const start = async () => {
	try {
		await server.listen({ port: process.env.PORT });
	} catch (error) {
		server.log.error(error);
		process.exit(1);
	}
};
start();
