"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@akaiv/core");
const osu_util_1 = require("./util/osu-util");
const request_promise_1 = require("request-promise");
const ojsama = require('ojsama');
class BackgroundCommand {
    get CommandList() {
        return ['background'];
    }
    get Usage() {
        return 'osu/background <비트맵 id>';
    }
    get Description() {
        return '해당 비트맵의 배경을 가져옵니다 (언랭크 대부분 불가능)';
    }
    async onCommand(e) {
        if (e.RawArgument.length < 1) {
            e.Channel.sendText(`사용법: ${this.Usage}`);
            return;
        }
        let id = Number.parseInt(e.RawArgument);
        if (isNaN(id)) {
            e.Channel.sendText(`${id} 은(는) 올바른 비트맵 id가 아닙니다`);
            return;
        }
        let mapStr = await osu_util_1.OsuUtil.getMapStringBloodcat(id);
        if (mapStr === '') {
            e.Channel.sendText(`${id} 은(는) 올바른 비트맵이 아닙니다`);
            return;
        }
        let parser = new ojsama.parser();
        parser.feed(mapStr);
        let map = parser.map;
        let name = `${map['artist_unicode'] || map['artist']} - ${map['title_unicode'] || map['title']}`;
        let req = request_promise_1.get(`https://bloodcat.com/osu/i/${id}`, { encoding: null });
        let filename = `${name}.jpg`;
        req.on('response', (res) => {
            var contentName = res.headers['content-disposition'] && res.headers['content-disposition'].match(/(filename=|filename\*='')(.*)$/);
            if (contentName) {
                filename = contentName[2];
            }
        });
        let backgroundBuffer = await req;
        await e.Channel.sendRichTemplate(new core_1.AttachmentTemplate(`비트맵(${id}): ${name}`, new core_1.TemplateAttachment(core_1.AttachmentType.IMAGE, filename, backgroundBuffer)));
    }
}
exports.BackgroundCommand = BackgroundCommand;
class AudioCommand {
    get CommandList() {
        return ['audio'];
    }
    get Usage() {
        return 'osu/audio <비트맵 id>';
    }
    get Description() {
        return '해당 비트맵의 음악을 가져옵니다 (언랭크 대부분 불가능)';
    }
    async onCommand(e) {
        if (e.RawArgument.length < 1) {
            e.Channel.sendText(`사용법: ${this.Usage}`);
            return;
        }
        let id = Number.parseInt(e.RawArgument);
        if (isNaN(id)) {
            e.Channel.sendText(`${id} 은(는) 올바른 비트맵 id가 아닙니다`);
            return;
        }
        let mapStr = await osu_util_1.OsuUtil.getMapStringBloodcat(id);
        if (mapStr === '') {
            e.Channel.sendText(`${id} 은(는) 올바른 비트맵이 아닙니다`);
            return;
        }
        let parser = new ojsama.parser();
        parser.feed(mapStr);
        let map = parser.map;
        let name = `${map['artist_unicode'] || map['artist']} - ${map['title_unicode'] || map['title']}`;
        let req = request_promise_1.get(`https://bloodcat.com/osu/a/${id}`, { encoding: null });
        let filename = `${name}.mp3`;
        req.on('response', (res) => {
            var contentName = res.headers['content-disposition'] && res.headers['content-disposition'].match(/(filename=|filename\*='')(.*)$/);
            if (contentName) {
                filename = contentName[2];
            }
        });
        let audioBuffer = await req;
        await e.Channel.sendRichTemplate(new core_1.AttachmentTemplate(`비트맵(${id}): ${name}`, new core_1.TemplateAttachment(core_1.AttachmentType.AUDIO, filename, audioBuffer)));
    }
}
exports.AudioCommand = AudioCommand;
//# sourceMappingURL=misc-command.js.map