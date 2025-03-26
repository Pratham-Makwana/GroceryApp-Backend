import "dotenv/config";
import { connectDB } from "./src/config/connect.js";
import fastify from "fastify";
import { PORT } from "./src/config/config.js";
import fastifySocketIO from "fastify-socket.io";
import { registerRoutes } from "./src/routes/index.js";
import { buildAdminRoute } from "./src/config/setup.js";

const start = async () => {


  await connectDB(process.env.MONGO_URI);

  const app = fastify();

  app.register(fastifySocketIO, {
    cors: {
      origin: "*",
    },
    pingInterval: 10000,
    pingInterval: 5000,
    transports: ["websocket"],
  });

  await registerRoutes(app);
  await buildAdminRoute(app)

  app.listen({ port: PORT, host: "0.0.0.0" }, (err, addr) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Grocery App running on  http://localhost:${PORT}`);
    }
  });

  app.ready().then(() => {
    app.io.on("connection", (socket) => {
      console.log("A User Connected");

      socket.on("joinRoom", (orderId) => {
        socket.join(orderId);
        console.log(`User join room ${orderId}`);
      });

      socket.on("disconnect", () => {
        console.log("User Disconnected");
      });
    });
  });
  
};

start();




