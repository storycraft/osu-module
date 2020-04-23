import { RequestHelper } from "@akaiv/core";
import { get } from "request-promise";

export namespace OsuApiUtil {

    export function getAPIURL() {
        return 'https://osu.ppy.sh/api';
    }

    export async function getBeatmapListAsync(key: string, beatmapSetId: number): Promise<any> {
        var rawJson = await RequestHelper.get(`${OsuApiUtil.getAPIURL()}/get_beatmaps?k=${key}&s=${beatmapSetId}`);

        return JSON.parse(rawJson);
    }

}

export namespace OsuUtil {

    let mapCache: Map<number, string> = new Map();

    export function getOfficialBeatmapURL(id: number) {
        return `https://osu.ppy.sh/osu/${id}`;
    }

    export function getBloodcatBeatmapURL(id: number) {
        return `https://bloodcat.com/osu/b/${id}`;
    }

    function validCheckOfficial(res: string): boolean {
        return res !== '';
    }

    function validCheckBloodcat(res: string): boolean {
        return res !== '' && res !== '* File not found or inaccessable!';
    }

    export async function getMapString(urlFunc: (id: number) => string, validCheckFunc: (res: string) => boolean, id: number): Promise<string> {
        if (mapCache.has(id)) {
            return mapCache.get(id) as string;
        } else if (mapCache.size > 20) {
            let deleteCount = mapCache.size - 20;
            let keys = mapCache.keys();

            for (let i = 0; i < deleteCount; i++) {
                mapCache.delete(keys.next().value);
            }
        }

        let res: string = await get(urlFunc(id));

        if (!validCheckFunc(res)) {
            return '';
        }

        mapCache.set(id, res);

        return res;
    }

    export async function getMapStringOsu(id: number): Promise<string> {
        return getMapString(getOfficialBeatmapURL, validCheckOfficial, id);
    }

    export async function getMapStringBloodcat(id: number): Promise<string> {
        return getMapString(getBloodcatBeatmapURL, validCheckBloodcat, id);
    }

}