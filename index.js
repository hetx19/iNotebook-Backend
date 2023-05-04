import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import connect from "./database/db.js";

// Configure Enviroment Variable File
dotenv.config();

// Connecting to Database
connect();

// Express Initialize
const app = express();

// Enviroment Variables
const port = process.env.PORT;
const mode = process.env.MODE;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes path
import authRoute from "./routes/auth.js";
import noteRoute from "./routes/notes.js";

// Routes
app.use("/api/auth", authRoute);
app.use("/api/notes", noteRoute);

//rest api
app.get("/", function (req, res) {
  res.send("<h1>Welcome To iNotebook</h1>");
});

app.listen(port, () => {
  console.log(
    `iNotebook server is listening on ${mode} at http://localhost:${port}`
      .bgCyan.white
  );
});
