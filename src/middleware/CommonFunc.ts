import RunLog from "../common/RunLog";

export default class CommonFunc {
    public static checkClientIP(req: any): boolean {
        try {
            const ipAddr = CommonFunc.getClientIp(req);
            if (!ipAddr) {
                return false;
            }
            const ipArray = ipAddr.split(":");

            for (let i = 0; i < ipArray.length; i++) {
                if (ipArray[i].length <= 1) {
                    continue;
                }
                if (
                    ipArray[i] === "127.0.0.1" ||
                    ipArray[i].substring(0, 7) === "192.168" ||
                    ipArray[i] === "60.191.53.138" ||
                    ipArray[i] === "60.191.53.139" ||
                    ipArray[i] === "124.202.170.74"
                ) {
                    return true;
                }
            }
        } catch (ex) {
            RunLog.output(`获取不到IP地址, from page = ${req.params[0]}`);
        }
        return false;
    }

    public static formatDate(dateTime: Date, format: string): string {
        const o: { [key: string]: any } = {
            "M+": dateTime.getMonth() + 1, // month
            "d+": dateTime.getDate(), // day
            "h+": dateTime.getHours(), // hour
            "m+": dateTime.getMinutes(), // minute
            "s+": dateTime.getSeconds(), // second
            "q+": Math.floor((dateTime.getMonth() + 3) / 3), // quarter
            S: dateTime.getMilliseconds(), // millisecond
        };
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1, `${dateTime.getFullYear()}`.substring(4 - RegExp.$1.length));
        for (const k in o) {
            if (new RegExp(`(${k})`).test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substring(`${o[k]}`.length));
            }
        }

        return format;
    }

    public static getClientIp(req: any): string {
        try {
            const ipaddr = req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;

            return ipaddr;
        } catch (ex) {
            return "";
        }
    }
}
