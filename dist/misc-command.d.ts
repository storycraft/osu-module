import { CommandInfo, BotCommandEvent } from "@akaiv/core";
export declare class BackgroundCommand implements CommandInfo {
    readonly CommandList: string[];
    readonly Usage: string;
    readonly Description: string;
    onCommand(e: BotCommandEvent): Promise<void>;
}
export declare class AudioCommand implements CommandInfo {
    readonly CommandList: string[];
    readonly Usage: string;
    readonly Description: string;
    onCommand(e: BotCommandEvent): Promise<void>;
}
