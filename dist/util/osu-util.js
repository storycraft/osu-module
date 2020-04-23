"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@akaiv/core");
const request_promise_1 = require("request-promise");
var OsuApiUtil;
(function (OsuApiUtil) {
    function getAPIURL() {
        return 'https://osu.ppy.sh/api';
    }
    OsuApiUtil.getAPIURL = getAPIURL;
    async function getBeatmapListAsync(key, beatmapSetId) {
        var rawJson = await core_1.RequestHelper.get(`${OsuApiUtil.getAPIURL()}/get_beatmaps?k=${key}&s=${beatmapSetId}`);
        return JSON.parse(rawJson);
    }
    OsuApiUtil.getBeatmapListAsync = getBeatmapListAsync;
})(OsuApiUtil = exports.OsuApiUtil || (exports.OsuApiUtil = {}));
var OsuUtil;
(function (OsuUtil) {
    let mapCache = new Map();
    function getOfficialBeatmapURL(id) {
        return `https://osu.ppy.sh/osu/${id}`;
    }
    OsuUtil.getOfficialBeatmapURL = getOfficialBeatmapURL;
    function getBloodcatBeatmapURL(id) {
        return `https://bloodcat.com/osu/b/${id}`;
    }
    OsuUtil.getBloodcatBeatmapURL = getBloodcatBeatmapURL;
    function validCheckOfficial(res) {
        return res !== '';
    }
    function validCheckBloodcat(res) {
        return res !== '' && res !== '* File not found or inaccessable!';
    }
    async function getMapString(urlFunc, validCheckFunc, id) {
        if (mapCache.has(id)) {
            return mapCache.get(id);
        }
        else if (mapCache.size > 20) {
            let deleteCount = mapCache.size - 20;
            let keys = mapCache.keys();
            for (let i = 0; i < deleteCount; i++) {
                mapCache.delete(keys.next().value);
            }
        }
        let res = await request_promise_1.get(urlFunc(id));
        if (!validCheckFunc(res)) {
            return res;
        }
        mapCache.set(id, res);
        return res;
    }
    OsuUtil.getMapString = getMapString;
    async function getMapStringOsu(id) {
        return getMapString(getOfficialBeatmapURL, validCheckOfficial, id);
    }
    OsuUtil.getMapStringOsu = getMapStringOsu;
    async function getMapStringBloodcat(id) {
        return getMapString(getBloodcatBeatmapURL, validCheckBloodcat, id);
    }
    OsuUtil.getMapStringBloodcat = getMapStringBloodcat;
})(OsuUtil = exports.OsuUtil || (exports.OsuUtil = {}));
//# sourceMappingURL=osu-util.js.map