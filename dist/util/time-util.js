"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TimeUtil;
(function (TimeUtil) {
    function toFriendlyTime(time) {
        if (typeof (time) === 'string')
            time = Number.parseInt(time);
        let secs = time % 60;
        let min = Math.floor(time / 60) % 60;
        let hours = Math.floor(time / 3600) % 24;
        let days = Math.floor(time / 86400);
        return `${days} 일 ${hours} 시간 ${min} 분 ${secs} 초`;
    }
    TimeUtil.toFriendlyTime = toFriendlyTime;
})(TimeUtil = exports.TimeUtil || (exports.TimeUtil = {}));
//# sourceMappingURL=time-util.js.map