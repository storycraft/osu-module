/*
 * Created on Wed Mar 04 2020
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export namespace TimeUtil {

    export function toFriendlyTime(time: number): string {
        if (typeof(time) === 'string') time = Number.parseInt(time);
        let secs = time % 60;
        let min = Math.floor(time / 60) % 60;
        let hours = Math.floor(time / 3600) % 24;
        let days = Math.floor(time / 86400);

        return `${days} 일 ${hours} 시간 ${min} 분 ${secs} 초`;
    }

}