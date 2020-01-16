import { BotModule } from "@akaiv/core";
export declare class OsuModule extends BotModule {
    private apiWrapper;
    private urlReaction;
    constructor({ osuToken }: {
        osuToken: string;
    });
    readonly APIWrapper: any;
    readonly Name: string;
    readonly Description: string;
    readonly Namespace: string;
}
