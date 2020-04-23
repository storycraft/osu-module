import { BotModule } from "@akaiv/core";
import { PlayerStdStatCommand, PlayerTaikoStatCommand, PlayerCTBStatCommand, PlayerManiaStatCommand } from "./stat-command";
import { MapPPCommand } from "./map-command";
import { URLReaction } from "./url/url-reaction";
import { BackgroundCommand, AudioCommand } from "./misc-command";

/*
 * Created on Sat Oct 26 2019
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

const HarmoniaOsu = require('harmonia-osu');

export class OsuModule extends BotModule {

    private apiWrapper: any;

    private urlReaction: URLReaction;

    constructor({ osuToken }: {
        osuToken: string
    }) {
        super();

        this.apiWrapper = new HarmoniaOsu.Harmonia(osuToken);

        this.urlReaction = new URLReaction(this, osuToken);

        //stats command
        this.CommandManager.addCommand(new PlayerStdStatCommand(this.apiWrapper));
        this.CommandManager.addCommand(new PlayerTaikoStatCommand(this.apiWrapper));
        this.CommandManager.addCommand(new PlayerCTBStatCommand(this.apiWrapper));
        this.CommandManager.addCommand(new PlayerManiaStatCommand(this.apiWrapper));

        //map command
        this.CommandManager.addCommand(new MapPPCommand(this.apiWrapper));

        this.CommandManager.addCommand(new BackgroundCommand());
        this.CommandManager.addCommand(new AudioCommand());
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