export declare namespace OsuApiUtil {
    function getAPIURL(): string;
    function getBeatmapListAsync(key: string, beatmapSetId: number): Promise<any>;
}
export declare namespace OsuUtil {
    function getOfficialBeatmapURL(id: number): string;
    function getBloodcatBeatmapURL(id: number): string;
    function getMapString(urlFunc: (id: number) => string, validCheckFunc: (res: string) => boolean, id: number): Promise<string>;
    function getMapStringOsu(id: number): Promise<string>;
    function getMapStringBloodcat(id: number): Promise<string>;
}
