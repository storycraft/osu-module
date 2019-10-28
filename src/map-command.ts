import { CommandInfo, BotCommandEvent, SpaceSplitedParser } from "@akaiv/core";
import { get } from "request-promise";
import { OsuCommand } from "./command";

/*
 * Created on Sun Oct 27 2019
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

let objsama = require('ojsama');

export class MapPPCommand extends OsuCommand implements CommandInfo {

    private mapCache: Map<number, string> = new Map();

    get CommandList() {
        return [ 'pp' ];
    }

    get Description() {
        return '해당 비트맵의 pp정보를 제공합니다 (언랭크 맵 불가능, 스탠다드만 지원)';
    }

    get Usage() {
        return 'osu/pp <비트맵 id> [모드 조합]';
    }

    getBeatmapURL(id: number) {
        return `https://osu.ppy.sh/osu/${id}`;
    }

    async getMapString(id: number): Promise<string> {
        if (this.mapCache.has(id)) {
            return this.mapCache.get(id) as string;
        } else if (this.mapCache.size > 20) {
            let deleteCount = this.mapCache.size - 20;
            let keys = this.mapCache.keys();

            for (let i = 0; i < deleteCount; i++) {
                this.mapCache.delete(keys.next().value);
            }
        }

        let res: string = await get(this.getBeatmapURL(id));

        if (res === '') {
            return res;
        }

        this.mapCache.set(id, res);

        return res;
    }
    
    async onCommand(e: BotCommandEvent) {
        let args = new SpaceSplitedParser().parse(e.RawArgument);

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

            let parser = new objsama.parser();

            parser.feed(mapStr);

            let map = parser.map;
            let mods = objsama.modbits.from_string(args[1] || '');
            let modsStr = objsama.modbits.string(mods);

            let stars = new objsama.diff().calc({map: map, mods: mods});

            let ppInfo95 = objsama.ppv2({
                stars: stars,
                acc_percent: 95,
            });

            let ppInfo97 = objsama.ppv2({
                stars: stars,
                acc_percent: 97,
            });

            let ppInfo99 = objsama.ppv2({
                stars: stars,
                acc_percent: 97,
            });

            let ppInfo100 = objsama.ppv2({
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

        } catch (e) {
            e.Channel.sendText(`api 요청중 오류가 발생했습니다. ${e}`);
        }
    }

}