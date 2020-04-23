"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@akaiv/core");
const stat_command_1 = require("./stat-command");
const map_command_1 = require("./map-command");
const url_reaction_1 = require("./url/url-reaction");
const misc_command_1 = require("./misc-command");
const HarmoniaOsu = require('harmonia-osu');
class OsuModule extends core_1.BotModule {
    constructor({ osuToken }) {
        super();
        this.apiWrapper = new HarmoniaOsu.Harmonia(osuToken);
        this.urlReaction = new url_reaction_1.URLReaction(this, osuToken);
        this.CommandManager.addCommand(new stat_command_1.PlayerStdStatCommand(this.apiWrapper));
        this.CommandManager.addCommand(new stat_command_1.PlayerTaikoStatCommand(this.apiWrapper));
        this.CommandManager.addCommand(new stat_command_1.PlayerCTBStatCommand(this.apiWrapper));
        this.CommandManager.addCommand(new stat_command_1.PlayerManiaStatCommand(this.apiWrapper));
        this.CommandManager.addCommand(new map_command_1.MapPPCommand(this.apiWrapper));
        this.CommandManager.addCommand(new misc_command_1.BackgroundCommand());
        this.CommandManager.addCommand(new misc_command_1.AudioCommand());
    }
    get APIWrapper() {
        return this.apiWrapper;
    }
    get Name() {
        return 'osu';
    }
    get Description() {
        return '오스 유저 스탯, 기록, 맵 pp 정보 제공';
    }
    get Namespace() {
        return 'osu';
    }
}
exports.OsuModule = OsuModule;
//# sourceMappingURL=osu-module.js.map