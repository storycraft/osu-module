import { CommandInfo, BotCommandEvent } from "@akaiv/core";
import { OsuCommand } from "./command";

/*
 * Created on Sat Oct 26 2019
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

const HarmoniaOsu = require('harmonia-osu');

export class PlayerStdStatCommand extends OsuCommand implements CommandInfo {
    
    get CommandList() {
        return [ 'std', 'stats' ];
    }

    get Description() {
        return '해당 유저의 오스 (공식) 스탠다드 스탯을 보여줍니다';
    }

    get Usage() {
        return 'osu/std <유저 이름 또는 id>';
    }

    buildStdStat(user: any): string {
        let scores: any = user.scores;
        let performance: any = user.performance;

        return `유저 이름: ${user.username}
유저 id: ${user.userID}
국가: ${user.country}
모드: STD

#${performance.rank}

레벨: ${user.level}

정확도: ${user.accuracy}
PP: ${performance.raw}

플레이 시간: ${user.playTime}
플레이 카운트: ${user.playCount}

총 점수: ${scores.total}
총 점수(랭크): ${scores.ranked}`;
    }

    onCommand(e: BotCommandEvent) {
        let username = e.RawArgument;

        if (username.length < 1) {
            e.Channel.sendText(`사용법: ${this.Usage}`);
            return;
        }

        let prm = this.APIWrapper.getUser(username, HarmoniaOsu.Modes.STD) as Promise<any>;
        prm.then((user: any) => {
            e.Channel.sendText(this.buildStdStat(user));
        }).catch((e) => {
            e.Channel.sendText(`커맨드 처리중 오류가 발생 했습니다. ${e}`);
        });
    }

}

export class PlayerTaikoStatCommand extends OsuCommand implements CommandInfo {
    
    get CommandList() {
        return [ 'taiko' ];
    }

    get Description() {
        return '해당 유저의 오스 (공식) 태고 스탯을 보여줍니다';
    }

    get Usage() {
        return 'osu/taiko <유저 이름 또는 id>';
    }

    buildTaikoStat(user: any): string {
        let scores: any = user.scores;
        let performance: any = user.performance;

        return `유저 이름: ${user.username}
유저 id: ${user.userID}
국가: ${user.country}
모드: TAIKO

#${performance.rank}

레벨: ${user.level}

정확도: ${user.accuracy}
PP: ${performance.raw}

플레이 시간: ${user.playTime}
플레이 카운트: ${user.playCount}

총 점수: ${scores.total}
총 점수(랭크): ${scores.ranked}`;
    }

    onCommand(e: BotCommandEvent) {
        let username = e.RawArgument;

        if (username.length < 1) {
            e.Channel.sendText(`사용법: ${this.Usage}`);
            return;
        }

        let prm = this.APIWrapper.getUser(username, HarmoniaOsu.Modes.TAIKO) as Promise<any>;
        prm.then((user: any) => {
            e.Channel.sendText(this.buildTaikoStat(user));
        }).catch((e) => {
            e.Channel.sendText(`커맨드 처리중 오류가 발생 했습니다. ${e}`);
        });
    }

}

export class PlayerCTBStatCommand extends OsuCommand implements CommandInfo {
    
    get CommandList() {
        return [ 'ctb' ];
    }

    get Description() {
        return '해당 유저의 오스 (공식) 캐치 스탯을 보여줍니다';
    }

    get Usage() {
        return 'osu/ctb <유저 이름 또는 id>';
    }

    buildCTBStat(user: any): string {
        let scores: any = user.scores;
        let performance: any = user.performance;

        return `유저 이름: ${user.username}
유저 id: ${user.userID}
국가: ${user.country}
모드: CTB

#${performance.rank}

레벨: ${user.level}

정확도: ${user.accuracy}
PP: ${performance.raw}

플레이 시간: ${user.playTime}
플레이 카운트: ${user.playCount}

총 점수: ${scores.total}
총 점수(랭크): ${scores.ranked}`;
    }

    onCommand(e: BotCommandEvent) {
        let username = e.RawArgument;

        if (username.length < 1) {
            e.Channel.sendText(`사용법: ${this.Usage}`);
            return;
        }

        let prm = this.APIWrapper.getUser(username, HarmoniaOsu.Modes.CTB) as Promise<any>;
        prm.then((user: any) => {
            e.Channel.sendText(this.buildCTBStat(user));
        }).catch((e) => {
            e.Channel.sendText(`커맨드 처리중 오류가 발생 했습니다. ${e}`);
        });
    }

}

export class PlayerManiaStatCommand extends OsuCommand implements CommandInfo {
    
    get CommandList() {
        return [ 'mania' ];
    }

    get Description() {
        return '해당 유저의 오스 (공식) 매니아 스탯을 보여줍니다';
    }

    get Usage() {
        return 'osu/mania <유저 이름 또는 id>';
    }

    buildManiaStat(user: any): string {
        let scores: any = user.scores;
        let performance: any = user.performance;

        return `유저 이름: ${user.username}
유저 id: ${user.userID}
국가: ${user.country}
모드: MANIA

#${performance.rank}

레벨: ${user.level}

정확도: ${user.accuracy}
PP: ${performance.raw}

플레이 시간: ${user.playTime}
플레이 카운트: ${user.playCount}

총 점수: ${scores.total}
총 점수(랭크): ${scores.ranked}`;
    }

    onCommand(e: BotCommandEvent) {
        let username = e.RawArgument;

        if (username.length < 1) {
            e.Channel.sendText(`사용법: ${this.Usage}`);
            return;
        }

        let prm = this.APIWrapper.getUser(username, HarmoniaOsu.Modes.MANIA) as Promise<any>;
        prm.then((user: any) => {
            e.Channel.sendText(this.buildManiaStat(user));
        }).catch((e) => {
            e.Channel.sendText(`커맨드 처리중 오류가 발생 했습니다. ${e}`);
        });
    }

}