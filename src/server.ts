import ON_DEATH = require("death");

import startParam from "./startParam";
import ServerBase from "./startServer";

const server = new ServerBase();
// console.log(process.argv);
ON_DEATH(() => {
    server.quit();
    process.exit(1);
});
/**
 * 启动方式 node server.js
 */

server.start(startParam, 0).then(ret => {
    console.log("server started ", ret);
});
