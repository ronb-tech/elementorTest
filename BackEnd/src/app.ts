import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import { initData } from "./utils/generateData";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await initData();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to initialize data or start server:", error);
    process.exit(1);
  }
};

startServer();
