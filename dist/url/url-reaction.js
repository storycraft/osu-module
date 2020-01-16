"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const osu_api_util_1 = require("../util/osu-api.util");
class URLReaction {
    constructor(module, token) {
        this.module = module;
        this.token = token;
        this.urlRegex = /(http(s)?:\/\/(bloodcat.com\/osu\/s|osu.ppy.sh\/(b|beatmapsets))?\/?[^\s]+)/g;
        this.mapRegex = /(http(s)?:\/\/(bloodcat.com\/osu\/s|osu.ppy.sh\/(b|beatmapsets))?\/)/g;
        this.setIdRegex = /^\d+/g;
        module.on('message', this.onMessage.bind(this));
    }
    onMessage(e, logger) {
        let urlList = e.Message.Text.match(this.urlRegex);
        if (!urlList)
            return;
        let usedURL = [];
        for (let url of urlList) {
            if (usedURL.includes(url))
                continue;
            let idList = url.replace(this.mapRegex, '').match(this.setIdRegex);
            if (!idList)
                continue;
            let id = idList[0];
            osu_api_util_1.OsuApiUtil.getBeatmapListAsync(this.token, Number.parseInt(id)).then((list) => {
                if (list.length > 0) {
                    let obj = list[0];
                    var infoMessage = `비트맵셋 정보\n\n${obj['artist']} - ${obj['title']}\nbpm: ${obj['bpm']}\n제작자: ${obj['creator']}(${obj['creator_id']})\n업데이트 날짜: ${obj['last_update']}\n비트맵: ${list.length} 개\n태그: ${obj['tags']}`;
                    e.Message.replyText(infoMessage);
                }
            }).catch((err) => {
                logger.error(`비트맵 정보를 가져오는중 오류가 발생 했습니다. ${err}`);
            });
            usedURL.push(url);
        }
    }
}
exports.URLReaction = URLReaction;
//# sourceMappingURL=url-reaction.js.map