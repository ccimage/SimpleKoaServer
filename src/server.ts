import ON_DEATH = require("death");
import dotenv = require("dotenv");
import ServerBase from "./startServer";

dotenv.config();
const server = new ServerBase();
// console.log(process.argv);
ON_DEATH(() => {
    server.quit();
    process.exit(1);
});

const port = process.env.port || "3000";
/**
 * 启动方式 node server.js
 */

server.start({ port: Number(port) }).then(ret => {
    console.log("server started ", ret);
});
