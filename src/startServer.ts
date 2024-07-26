import RunLog from "./common/RunLog";
import AdminServer from "./serverImplement/adminServer";

export interface StartOptions {
    port: number;
}

export default class StartServer {
    private _adminServer: AdminServer | undefined = undefined;
    public async start(options: StartOptions) {
        return this.startServer(options);
    }

    private async startServer(options: StartOptions) {
        try {
            /** 从配置启动 */
            if (options.port) {
                this._adminServer = new AdminServer("admin server");
                return await this._adminServer.startServer(options.port);
            }
        } catch (ex: any) {
            RunLog.assert(`Start Server Exception:${ex.message}`);
        }
        return {};
    }

    public quit() {
        if (this._adminServer) {
            this._adminServer.stop();
        }
    }
}
