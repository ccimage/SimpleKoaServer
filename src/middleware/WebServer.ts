import Koa = require("koa");
import views = require("koa-views");
import RunLog from "../common/RunLog";

const session = require("koa-session");

interface KoaOptions {
    env?: string | undefined;
    keys?: string[] | undefined;
    proxy?: boolean | undefined;
    subdomainOffset?: number | undefined;
    proxyIpHeader?: string | undefined;
    maxIpsCount?: number | undefined;
}

export default class WebServer {
    private label: string = "";
    private app: any;
    public constructor(label: string, options?: KoaOptions) {
        this.label = label;
        this.init(options);
        this.initRoute();
    }

    private init(options?: KoaOptions) {
        this.app = new Koa(options);
        this.app.use(
            views("client", {
                extension: "html",
            }),
        );
        this.app.keys = ["067810f3c42139486e0f57be1dfcdab2b697c96c"];
        const CONFIG = {
            key: "SOME_KOA_SESS" /** (string) cookie key (default is koa.sess) */,
            /** (number || 'session') maxAge in ms (default is 1 days) */
            /** 'session' will result in a cookie that expires when session/browser is closed */
            /** Warning: If a session cookie is stolen, this cookie will never expire */
            maxAge: 86400000,
            autoCommit: true /** (boolean) automatically commit headers (default true) */,
            overwrite: true /** (boolean) can overwrite or not (default true) */,
            httpOnly: true /** (boolean) httpOnly or not (default true) */,
            signed: true /** (boolean) signed or not (default true) */,
            rolling:
                false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
            renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false) */,
            secure: false /** (boolean) secure cookie */,
            sameSite: null /** (string) session cookie sameSite options (default null, don't set it) */,
        };

        this.app.use(session(CONFIG, this.app));
    }

    protected initRoute() {}

    protected addMiddleWare(ctx: any) {
        (this.app as Koa).use(ctx);
    }

    protected start(port: number, address: string = "0.0.0.0", onStart?: () => void) {
        return (this.app as Koa).listen(port, address);
    }

    public stop() {
        RunLog.output(`(${this.label}) stop running.`);
    }
}
