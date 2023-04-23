import RunLog from "./common/RunLog";
import AdminServer from "./serverImplement/adminServer";

export default class StartServer {
    private _adminServer: AdminServer | undefined = undefined;
    public async start(param: any, index: number) {
        let startParam: any = 0;
        if (index >= 0 && index < param.length) {
            startParam = param[index];
        }
        if (!startParam) {
            RunLog.output("Start param not found.");
            return {};
        }
        return this.startServer(startParam);
    }

    private async startServer(param: any) {
        try {
            /** 从配置启动 */
            if (param.admin) {
                this._adminServer = new AdminServer("admin server");
                return await this._adminServer.startServer(param.admin.port);
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
