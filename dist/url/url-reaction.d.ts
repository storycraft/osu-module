import OsuModule from "..";
import { BotMessageEvent, Logger } from "@akaiv/core";
export declare class URLReaction {
    private module;
    private token;
    private urlRegex;
    private mapRegex;
    private setIdRegex;
    constructor(module: OsuModule, token: string);
    protected onMessage(e: BotMessageEvent, logger: Logger): void;
}
