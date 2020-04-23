/*
 * Created on Thu Apr 23 2020
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

import { CommandInfo, BotCommandEvent, AttachmentTemplate, TemplateAttachment, AttachmentType } from "@akaiv/core";
import { OsuUtil } from "./util/osu-util";
import { get } from "request-promise";

const ojsama = require('ojsama');

export class BackgroundCommand implements CommandInfo {

    get CommandList() {
        return [ 'background' ];
    }

    get Usage() {
        return 'osu/background <비트맵 id>';
    }

    get Description() {
        return '해당 비트맵의 배경을 가져옵니다 (언랭크 대부분 불가능)';
    }

    async onCommand(e: BotCommandEvent) {
        if (e.RawArgument.length < 1) {
            e.Channel.sendText(`사용법: ${this.Usage}`);
            return;
        }

        let id = Number.parseInt(e.RawArgument);

        if (isNaN(id)) {
            e.Channel.sendText(`${id} 은(는) 올바른 비트맵 id가 아닙니다`);
            return;
        }

        let mapStr = await OsuUtil.getBloodcatBeatmapURL(id);

        if (mapStr === '') {
            e.Channel.sendText(`${id} 은(는) 올바른 비트맵이 아닙니다`);
            return;
        }

        let parser = new ojsama.parser();

        parser.feed(mapStr);

        let map = parser.map;
        let name = `${map['artist_unicode'] || map['artist']} - ${map['title_unicode'] || map['title']}`;

        let req = get(`https://bloodcat.com/osu/i/${id}`, { encoding: null });

        let filename = `${name}.jpg`;

        req.on('response', (res) => {
            var name = res.headers['content-disposition'] && res.headers['content-disposition'].match(/(filename=|filename\*='')(.*)$/);
            if (name) {
                filename = name[2];
            }
        });

        let backgroundBuffer: Buffer = await req;

        await e.Channel.sendRichTemplate(new AttachmentTemplate(`비트맵(${id}): ${name}`, new TemplateAttachment(AttachmentType.IMAGE, filename, backgroundBuffer)));
    }

}

export class AudioCommand implements CommandInfo {

    get CommandList() {
        return [ 'audio' ];
    }

    get Usage() {
        return 'osu/audio <비트맵 id>';
    }

    get Description() {
        return '해당 비트맵의 음악을 가져옵니다 (언랭크 대부분 불가능)';
    }

    async onCommand(e: BotCommandEvent) {
        if (e.RawArgument.length < 1) {
            e.Channel.sendText(`사용법: ${this.Usage}`);
            return;
        }

        let id = Number.parseInt(e.RawArgument);

        if (isNaN(id)) {
            e.Channel.sendText(`${id} 은(는) 올바른 비트맵 id가 아닙니다`);
            return;
        }

        let mapStr = await OsuUtil.getMapStringBloodcat(id);

        if (mapStr === '') {
            e.Channel.sendText(`${id} 은(는) 올바른 비트맵이 아닙니다`);
            return;
        }

        let parser = new ojsama.parser();

        parser.feed(mapStr);

        let map = parser.map;

        let name = `${map['artist_unicode'] || map['artist']} - ${map['title_unicode'] || map['title']}`;

        let req = get(`https://bloodcat.com/osu/a/${id}`, { encoding: null });

        let filename = `${name}.mp3`;

        req.on('response', (res) => {
            var name = res.headers['content-disposition'] && res.headers['content-disposition'].match(/(filename=|filename\*='')(.*)$/);
            if (name) {
                filename = name[2];
            }
        });

        let audioBuffer: Buffer = await req;

        await e.Channel.sendRichTemplate(new AttachmentTemplate(`비트맵(${id}): ${name}`, new TemplateAttachment(AttachmentType.AUDIO, filename, audioBuffer)));
    }

}