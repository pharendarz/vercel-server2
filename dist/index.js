"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = require("http");
const expressApp = (0, express_1.default)();
const server = (0, http_1.createServer)(expressApp);
const port = process.env.PORT || 4100;
expressApp.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});
exports.config = {
    vercelDeploy: true,
    cloudDevDatabaseConnectionString: "mongodb+srv://pharendarz:uJAbCuSkLaZ1xaty@vercel-cluster.xhsxwqj.mongodb.net/?retryWrites=true&w=majority&appName=vercel-cluster",
};
expressApp.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*"); // || 'port'
    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // @ts-ignore
    res.setHeader("Access-Control-Allow-Credentials", true);
    // Pass to next layer of middleware
    next();
});
expressApp.get("/", (req, res) => {
    // const data = new DatabaseDefault(DataDefaultModel);
    // data
    //   .create({ userId: "123", name: "przemy", surname: "przemy" })
    //   .then((result) => {
    //     console.log("[create] result:", result);
    //   });
    res.send({ app: "vercel-server-2" });
});
expressApp.get("/test", (req, res) => {
    // const io = req.app.get("socketio");
    // io.emit("test event", "[server] test event data");
    res.send({ app: "test-vercel-server" });
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
const dbUri = exports.config.vercelDeploy
    ? process.env.MONGODB_URI
    : exports.config.cloudDevDatabaseConnectionString;
mongoose_1.default
    .connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    console.log("connected to database");
})
    .catch((err) => {
    console.log("error connecting to database", err);
});
//# sourceMappingURL=index.js.map