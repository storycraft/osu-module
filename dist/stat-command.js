"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("./command");
const time_util_1 = require("./util/time-util");
const HarmoniaOsu = require('harmonia-osu');
class PlayerStdStatCommand extends command_1.OsuCommand {
    get CommandList() {
        return ['std', 'stats'];
    }
    get Description() {
        return '해당 유저의 오스 (공식) 스탠다드 스탯을 보여줍니다';
    }
    get Usage() {
        return 'osu/std <유저 이름 또는 id>';
    }
    buildStdStat(user) {
        let scores = user.scores;
        let performance = user.performance;
        return `유저 이름: ${user.username}
유저 id: ${user.userID}
국가: ${user.country}
모드: Standard

#${performance.rank}

레벨: ${user.level}

정확도: ${user.accuracy.toFixed(2)}
PP: ${performance.raw}

플레이 시간: ${time_util_1.TimeUtil.toFriendlyTime(user.playTime)} (${user.playTime} 초)
플레이 카운트: ${user.playCount}

총 점수: ${scores.total}
총 점수(랭크): ${scores.ranked}`;
    }
    onCommand(e) {
        let username = e.RawArgument;
        if (username.length < 1) {
            e.Channel.sendText(`사용법: ${this.Usage}`);
            return;
        }
        let prm = this.APIWrapper.getUser(username, HarmoniaOsu.Modes.STD);
        prm.then((user) => {
            e.Channel.sendText(this.buildStdStat(user));
        }).catch((ex) => {
            e.Channel.sendText(`커맨드 처리중 오류가 발생 했습니다. ${e}`);
        });
    }
}
exports.PlayerStdStatCommand = PlayerStdStatCommand;
class PlayerTaikoStatCommand extends command_1.OsuCommand {
    get CommandList() {
        return ['taiko'];
    }
    get Description() {
        return '해당 유저의 오스 (공식) 태고 스탯을 보여줍니다';
    }
    get Usage() {
        return 'osu/taiko <유저 이름 또는 id>';
    }
    buildTaikoStat(user) {
        let scores = user.scores;
        let performance = user.performance;
        return `유저 이름: ${user.username}
유저 id: ${user.userID}
국가: ${user.country}
모드: Taiko

#${performance.rank}

레벨: ${user.level}

정확도: ${user.accuracy.toFixed(2)}
PP: ${performance.raw}

플레이 시간: ${time_util_1.TimeUtil.toFriendlyTime(user.playTime)} (${user.playTime} 초)
플레이 카운트: ${user.playCount}

총 점수: ${scores.total}
총 점수(랭크): ${scores.ranked}`;
    }
    onCommand(e) {
        let username = e.RawArgument;
        if (username.length < 1) {
            e.Channel.sendText(`사용법: ${this.Usage}`);
            return;
        }
        let prm = this.APIWrapper.getUser(username, HarmoniaOsu.Modes.TAIKO);
        prm.then((user) => {
            e.Channel.sendText(this.buildTaikoStat(user));
        }).catch((e) => {
            e.Channel.sendText(`커맨드 처리중 오류가 발생 했습니다. ${e}`);
        });
    }
}
exports.PlayerTaikoStatCommand = PlayerTaikoStatCommand;
class PlayerCTBStatCommand extends command_1.OsuCommand {
    get CommandList() {
        return ['ctb'];
    }
    get Description() {
        return '해당 유저의 오스 (공식) 캐치 스탯을 보여줍니다';
    }
    get Usage() {
        return 'osu/ctb <유저 이름 또는 id>';
    }
    buildCTBStat(user) {
        let scores = user.scores;
        let performance = user.performance;
        return `유저 이름: ${user.username}
유저 id: ${user.userID}
국가: ${user.country}
모드: CTB

#${performance.rank}

레벨: ${user.level}

정확도: ${user.accuracy.toFixed(2)}
PP: ${performance.raw}

플레이 시간: ${time_util_1.TimeUtil.toFriendlyTime(user.playTime)} (${user.playTime} 초)
플레이 카운트: ${user.playCount}

총 점수: ${scores.total}
총 점수(랭크): ${scores.ranked}`;
    }
    onCommand(e) {
        let username = e.RawArgument;
        if (username.length < 1) {
            e.Channel.sendText(`사용법: ${this.Usage}`);
            return;
        }
        let prm = this.APIWrapper.getUser(username, HarmoniaOsu.Modes.CTB);
        prm.then((user) => {
            e.Channel.sendText(this.buildCTBStat(user));
        }).catch((ex) => {
            e.Channel.sendText(`커맨드 처리중 오류가 발생 했습니다. ${e}`);
        });
    }
}
exports.PlayerCTBStatCommand = PlayerCTBStatCommand;
class PlayerManiaStatCommand extends command_1.OsuCommand {
    get CommandList() {
        return ['mania'];
    }
    get Description() {
        return '해당 유저의 오스 (공식) 매니아 스탯을 보여줍니다';
    }
    get Usage() {
        return 'osu/mania <유저 이름 또는 id>';
    }
    buildManiaStat(user) {
        let scores = user.scores;
        let performance = user.performance;
        return `유저 이름: ${user.username}
유저 id: ${user.userID}
국가: ${user.country}
모드: Mania

#${performance.rank}

레벨: ${user.level}

정확도: ${user.accuracy.toFixed(2)}
PP: ${performance.raw}

플레이 시간: ${time_util_1.TimeUtil.toFriendlyTime(user.playTime)} (${user.playTime} 초)
플레이 카운트: ${user.playCount}

총 점수: ${scores.total}
총 점수(랭크): ${scores.ranked}`;
    }
    onCommand(e) {
        let username = e.RawArgument;
        if (username.length < 1) {
            e.Channel.sendText(`사용법: ${this.Usage}`);
            return;
        }
        let prm = this.APIWrapper.getUser(username, HarmoniaOsu.Modes.MANIA);
        prm.then((user) => {
            e.Channel.sendText(this.buildManiaStat(user));
        }).catch((ex) => {
            e.Channel.sendText(`커맨드 처리중 오류가 발생 했습니다. ${e}`);
        });
    }
}
exports.PlayerManiaStatCommand = PlayerManiaStatCommand;
//# sourceMappingURL=stat-command.js.map