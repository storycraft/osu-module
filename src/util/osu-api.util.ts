import { RequestHelper } from "@akaiv/core";

export class OsuApiUtil {

    static getAPIURL() {
        return 'https://osu.ppy.sh/api';
    }

    static async getBeatmapListAsync(key: string, beatmapSetId: number): Promise<any> {
        var rawJson = await RequestHelper.get(`${OsuApiUtil.getAPIURL()}/get_beatmaps?k=${key}&s=${beatmapSetId}`);

        return JSON.parse(rawJson);
    }

}