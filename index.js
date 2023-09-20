require("dotenv").config();
const server = require("./server");
const { log } = server;
let { io } = server;
const { getRedis } = require("./redis");

server.get("/", (req, reply) => {
	server.io.emit("hello");
	reply.send("hello");
});

server.register(require("./trips"), { prefix: "/trips" });
server.ready().then(async () => {
	// we need to wait for the server to be ready, else `server.io` is undefined
	io = server.io;
	redis = await getRedis();
	io.on("connection", async (socket) => {
		const id = socket.handshake.headers.id;
		const events = await redis.lRange(`driver:${id}`, 0, -1);
		if (events?.length) {
			socket.emit(`driver-${id}`, events);
		}
		socket.on("ack", async () => {
			await redis.del(`driver:${id}`);
		});
	});
});

const start = async () => {
	try {
		const address = await server.listen({ port: process.env.PORT });
	} catch (error) {
		log.error(error);
		process.exit(1);
	}
};
start();
