import Koa = require("koa");
import views = require("koa-views");
import RunLog from "../common/RunLog";

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
