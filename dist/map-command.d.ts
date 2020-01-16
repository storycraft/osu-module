import { CommandInfo, BotCommandEvent, Logger } from "@akaiv/core";
import { OsuCommand } from "./command";
export declare class MapPPCommand extends OsuCommand implements CommandInfo {
    private mapCache;
    readonly CommandList: string[];
    readonly Description: string;
    readonly Usage: string;
    getBeatmapURL(id: number): string;
    getMapString(id: number): Promise<string>;
    onCommand(e: BotCommandEvent, logger: Logger): Promise<void>;
}
