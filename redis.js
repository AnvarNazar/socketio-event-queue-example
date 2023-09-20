const { createClient } = require("redis");
const server = require("./server");
let client = null;

getRedis = async () => {
	if (!client) {
		client = await createClient({
			url: process.env.REDIS_URL,
		})
			.on("error", server.log.fatal)
			.connect();
	}
	return client;
};

module.exports = { getRedis };
