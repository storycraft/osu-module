import { CommandInfo, BotCommandEvent } from "@akaiv/core";
import { OsuCommand } from "./command";
export declare class PlayerStdStatCommand extends OsuCommand implements CommandInfo {
    readonly CommandList: string[];
    readonly Description: string;
    readonly Usage: string;
    buildStdStat(user: any): string;
    onCommand(e: BotCommandEvent): void;
}
export declare class PlayerTaikoStatCommand extends OsuCommand implements CommandInfo {
    readonly CommandList: string[];
    readonly Description: string;
    readonly Usage: string;
    buildTaikoStat(user: any): string;
    onCommand(e: BotCommandEvent): void;
}
export declare class PlayerCTBStatCommand extends OsuCommand implements CommandInfo {
    readonly CommandList: string[];
    readonly Description: string;
    readonly Usage: string;
    buildCTBStat(user: any): string;
    onCommand(e: BotCommandEvent): void;
}
export declare class PlayerManiaStatCommand extends OsuCommand implements CommandInfo {
    readonly CommandList: string[];
    readonly Description: string;
    readonly Usage: string;
    buildManiaStat(user: any): string;
    onCommand(e: BotCommandEvent): void;
}
