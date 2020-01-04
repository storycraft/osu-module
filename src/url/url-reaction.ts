import OsuModule from "..";
import { BotMessageEvent } from "@akaiv/core";
import { OsuApiUtil } from "../util/osu-api.util";

/*
 * Created on Sat Jan 04 2020
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export class URLReaction {

    private urlRegex: RegExp;
    private mapRegex: RegExp;
    private setIdRegex: RegExp;
    
    constructor(private module: OsuModule, private token: string) {
        this.urlRegex = /(https?:\/\/osu.ppy.sh\/b(eatmapsets)?[^\s]+)/g;
        this.mapRegex = /(https?:\/\/osu.ppy.sh\/b(eatmapsets)?\/)/g;
        this.setIdRegex = /^\d+/g;

        module.on('message', this.onMessage.bind(this));
    }

    protected onMessage(e: BotMessageEvent) {
        let urlList = e.Message.Text.match(this.urlRegex);

        if (!urlList)
            return;

        let usedURL: string[] = [];
        for (let url of urlList) {
            if (usedURL.includes(url))
                continue;
            
            let idList = url.replace(this.mapRegex, '').match(this.setIdRegex);

            if (!idList)
                continue;

            let id = idList[0];

            OsuApiUtil.getBeatmapListAsync(this.token, Number.parseInt(id)).then((list: any) => {
                for (let obj of list) {
                    var infoMessage = `비트맵 정보\n\n${obj.artist} - ${obj.title}\nbpm: ${obj.bpm}\n제작자: ${obj.creator}\n업데이트 날짜: ${obj.last_update}\n태그: ${obj.tags}`;

                    e.Message.replyText(infoMessage);
                    
                    return;
                }
            }).catch((err: Error) => {
                //e.Message.replyText(`비트맵 정보를 가져오는중 오류가 발생 했습니다. ${err}`);
            });

            usedURL.push(url);
        }
    }
}