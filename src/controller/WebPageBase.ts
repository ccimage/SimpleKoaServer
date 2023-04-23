/*
    Base Class Of WebPage
*/
import RunLog from "../common/RunLog";
import CommonFunc from "../middleware/CommonFunc";

export default class WebPageBase {
    protected _showErrorLog(msg: string) {
        RunLog.assert(msg);
    }

    protected _showDebugLog(msg: string) {
        RunLog.output(msg);
    }

    protected _clientIP(req: any): string {
        return CommonFunc.getClientIp(req);
    }

    protected _getErrorJson(code: number, msg: string): { [key: string]: string } {
        return { result: "FAILED", code: `${code}`, msg: msg };
    }

    public sendError(res: any, error: string) {
        res.json({ result: "FAILED", msg: error });
    }

    protected outputRoomError(res: any, error: string) {
        res.json({ result: "FAILED", msg: error });
    }
}
