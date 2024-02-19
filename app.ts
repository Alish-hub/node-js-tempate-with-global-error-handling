import app from "./src/configs/express";
import { datasource } from "./src/configs/ormConfig";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 7000;
let server: any;
(async () => {
  try {
    server = app.listen(PORT, async () => {
      console.log(`[SERVER]🆙 Server is running on http://localhost:${PORT}`);
    });

    await datasource.initialize();
    console.log(`[DATABASE]🆙 Database connected!`);
    server.on("close", () => {
      console.log("Server closed");
    });
  } catch (error) {
    throw error;
    console.log({ error });
  }
})();

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1); // Exit the process with an error code
});

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("🔽 Received SIGINT signal. Closing server gracefully...");
  server.close(() => {
    console.log("Server closed gracefully");
    process.exit(0);
  });
});
