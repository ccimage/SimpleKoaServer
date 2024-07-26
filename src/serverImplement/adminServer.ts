/*
 * DO NOT  start this server.  must be called from main server
 *
 * 不能单独启动web服务， 必须从主服务器调用
 */
import WebServer from "../middleware/WebServer";

const path = require("path");
const router = require("koa-router")();

const serve = require("koa-static");
const { koaBody } = require("koa-body");

export default class AdminServer extends WebServer {
    public async startServer(port: number) {
        super.addMiddleWare(koaBody());
        super.addMiddleWare(router.routes());
        super.addMiddleWare(router.allowedMethods());
        super.addMiddleWare(this.getStaticRtx());
        return super.start(port, "0.0.0.0");
    }

    initRoute() {
        router.post("/login", (ctx: any) => {
            try {
                const { username, password } = ctx.request.body;
                if (username !== "admin" || password !== "12345678") {
                    ctx.body = { code: 500, message: "用户名或者密码错误" };
                    return;
                }
                ctx.session.user = { uid: 10001, userCheck: true, loginDate: Date.now(), expired: Date.now() + 86400000 };
                ctx.body = { code: 0, message: "success" };
                // console.log("session", ctx.session);
            } catch (error: any) {
                ctx.body = { code: 500, message: error?.message };
            }
        });
    }

    private getStaticRtx() {
        console.log("current path=", __dirname);
        const publicFiles = serve(path.join(__dirname, "../../client"));
        return publicFiles;
    }

    private loginSessionCheck(ctx: any): boolean {
        if (ctx.session.isNew || !ctx.session.user) {
            ctx.body = { code: 401, message: "用户没有登录" };
            return false;
        }
        const user = ctx.session.user;
        if (user.expired < Date.now()) {
            ctx.body = { code: 403, message: "用户登录已经过期" };
            return false;
        }
        return true;
    }
}
