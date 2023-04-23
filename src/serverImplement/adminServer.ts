/*
 * DO NOT  start this server.  must be called from main server
 *
 * 不能单独启动web服务， 必须从主服务器调用
 */
import Koa = require("koa");
import WebServer from "../middleware/WebServer";

const path = require("path");
const router = require("koa-router")();
const serve = require("koa-static");

export default class AdminServer extends WebServer {
    public async startServer(port: number) {
        // router.get(/\/client\/.*\.html/, (ctx: any) => {
        //     ctx.render(".." + decodeURI(ctx.originalUrl));
        // });

        // super.addMiddleWare(this.responseTime);
        // super.addMiddleWare(router.routes());
        // super.addMiddleWare(router.allowedMethods());
        super.addMiddleWare(this.getStaticRtx());
        return super.start(port, "0.0.0.0");
    }

    private async responseTime(ctx: Koa.Context, next: any) {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        ctx.set("X-Response-Time", `${ms}ms`);
    }

    private getStaticRtx() {
        console.log("current path=", __dirname);
        const publicFiles = serve(path.join(__dirname, "../../client"));
        return publicFiles;
    }
}
