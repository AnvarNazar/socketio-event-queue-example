const server = require("./server");
const { getRedis } = require("./redis");

async function createTrip(request, reply) {
	redis = await getRedis();
	reply.send("created");
	const ride = {
		id: "ride-1091",
		to: "to-location",
		from: "from-location",
	};
	await redis.lPush("driver:101", JSON.stringify(ride));
	server.io.emit("driver-101", ride);
}
module.exports = function (fastify, opts, done) {
	fastify.post("/", createTrip);
	done();
};
