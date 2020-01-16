"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@akaiv/core");
const request_promise_1 = require("request-promise");
const command_1 = require("./command");
let ojsama = require('ojsama');
class MapPPCommand extends command_1.OsuCommand {
    constructor() {
        super(...arguments);
        this.mapCache = new Map();
    }
    get CommandList() {
        return ['pp', 'map'];
    }
    get Description() {
        return '해당 비트맵의 정보를 제공합니다 (언랭크 맵 불가능, 스탠다드만 지원)';
    }
    get Usage() {
        return 'osu/pp <비트맵 id> [모드 조합]';
    }
    getBeatmapURL(id) {
        return `https://osu.ppy.sh/osu/${id}`;
    }
    async getMapString(id) {
        if (this.mapCache.has(id)) {
            return this.mapCache.get(id);
        }
        else if (this.mapCache.size > 20) {
            let deleteCount = this.mapCache.size - 20;
            let keys = this.mapCache.keys();
            for (let i = 0; i < deleteCount; i++) {
                this.mapCache.delete(keys.next().value);
            }
        }
        let res = await request_promise_1.get(this.getBeatmapURL(id));
        if (res === '') {
            return res;
        }
        this.mapCache.set(id, res);
        return res;
    }
    async onCommand(e, logger) {
        let args = new core_1.SpaceSplitedParser().parse(e.RawArgument);
        if (args.length < 1) {
            e.Channel.sendText(`사용법: ${this.Usage}`);
            return;
        }
        let id = Number.parseInt(args[0]);
        if (isNaN(id)) {
            e.Channel.sendText(`${args[0]} 은(는) 올바른 비트맵 id가 아닙니다`);
            return;
        }
        try {
            let mapStr = await this.getMapString(id);
            if (mapStr === '') {
                e.Channel.sendText(`${id} 은(는) 올바른 비트맵이 아닙니다`);
                return;
            }
            let parser = new ojsama.parser();
            parser.feed(mapStr);
            let map = parser.map;
            if (map.mode !== 0) {
                e.Channel.sendText(`해당 맵 ${map.artist_unicode} - ${map.title_unicode} [${map.version}] 은 스탠다드 맵이 아닙니다`);
                return;
            }
            let mods = ojsama.modbits.from_string(args[1] || '');
            let modsStr = ojsama.modbits.string(mods);
            let stars = new ojsama.diff().calc({ map: map, mods: mods });
            let ppInfo95 = ojsama.ppv2({
                stars: stars,
                acc_percent: 95,
            });
            let ppInfo97 = ojsama.ppv2({
                stars: stars,
                acc_percent: 97,
            });
            let ppInfo99 = ojsama.ppv2({
                stars: stars,
                acc_percent: 99,
            });
            let ppInfo100 = ojsama.ppv2({
                stars: stars,
                acc_percent: 100,
            });
            e.Channel.sendText(`맵: ${map.artist_unicode} - ${map.title_unicode} [${map.version}]
모드: ${modsStr === '' ? 'NON' : modsStr}

제작자: ${map.creator}

AR: ${map.ar.toFixed(2)} OD: ${map.od.toFixed(2)} CS: ${map.cs.toFixed(2)} HP: ${map.hp.toFixed(2)}
${stars.toString()}
최대 콤보: ${map.max_combo()}

95%: ${ppInfo95}
97%: ${ppInfo97}
99%: ${ppInfo99}
100%: ${ppInfo100}
`);
        }
        catch (err) {
            e.Channel.sendText(`api 요청중 오류가 발생했습니다. ${err}`);
            logger.warning(`api 요청중 오류가 발생했습니다. ${err}`);
        }
    }
}
exports.MapPPCommand = MapPPCommand;
//# sourceMappingURL=map-command.js.map