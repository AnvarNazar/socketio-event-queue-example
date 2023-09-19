const server = require("fastify")({ logger: true });
const fastifyIO = require("fastify-socket.io");

server.register(fastifyIO);

module.exports = server;
