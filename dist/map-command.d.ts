import { CommandInfo, BotCommandEvent, Logger } from "@akaiv/core";
import { OsuCommand } from "./command";
export declare class MapPPCommand extends OsuCommand implements CommandInfo {
    readonly CommandList: string[];
    readonly Description: string;
    readonly Usage: string;
    onCommand(e: BotCommandEvent, logger: Logger): Promise<void>;
}
