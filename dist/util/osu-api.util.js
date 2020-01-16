"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@akaiv/core");
class OsuApiUtil {
    static getAPIURL() {
        return 'https://osu.ppy.sh/api';
    }
    static async getBeatmapListAsync(key, beatmapSetId) {
        var rawJson = await core_1.RequestHelper.get(`${OsuApiUtil.getAPIURL()}/get_beatmaps?k=${key}&s=${beatmapSetId}`);
        return JSON.parse(rawJson);
    }
}
exports.OsuApiUtil = OsuApiUtil;
//# sourceMappingURL=osu-api.util.js.map