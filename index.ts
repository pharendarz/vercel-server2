import express from "express";
import mongoose from "mongoose";
import { DatabaseDefault } from "./database.model";
import { DataDefaultModel } from "./data.model";
import { createServer } from "http";
import dotenv from "dotenv";
// dotenv setup
dotenv.config();
// express setup
const expressApp = express();
const server = createServer(expressApp);
const port = process.env.PORT || 4100;
expressApp.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// export const config = {
//   vercelDeploy: true,
//   cloudDevDatabaseConnectionString:
//     "mongodb+srv://pharendarz:uJAbCuSkLaZ1xaty@vercel-cluster.xhsxwqj.mongodb.net/?retryWrites=true&w=majority&appName=vercel-cluster",
// };

expressApp.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*"); // || 'port'
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // @ts-ignore
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});
expressApp.get("/", (req, res) => {
  console.log("[server] /", process.env.MONGODB_URI);

  res.send({ app: "vercel-server-2-3" });
});
expressApp.get("/create", (req, res) => {
  const data = new DatabaseDefault(DataDefaultModel);
  data
    .create({ userId: "qwe123", name: "przemy", surname: "przemy" })
    .then((result) => {
      console.log("[create] result:", result);
    });

  res.send({ app: "created" });
});
expressApp.get("/test", (req, res) => {
  const data = new DatabaseDefault(DataDefaultModel);
  data.findAll().then((result) => {
    console.log("[db findAll] result:", result);
    res.send({ app: "test fetch", data: result });
  });
  // res.send({ app: "test-vercel-server" });
});
expressApp.get("/api/data", (req, res) => {
  res.send({ data: [1, 2, 3] });
});
expressApp.get("/api/data-2", (req, res) => {
  res.send({ data: [1, 2, 3, 4, 5, 6, 7, 8] });
});
server.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log("[server] started on port " + port);
});

// mongoose
// const dbUri = config.vercelDeploy
//   ? process.env.MONGODB_URI
//   : config.cloudDevDatabaseConnectionString;
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("error connecting to database", err);
  });
