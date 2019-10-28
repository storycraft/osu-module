/*
 * Created on Sun Oct 27 2019
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export class OsuCommand {

    private apiWrapper: any;

    constructor(apiWrapper: any) {
        this.apiWrapper = apiWrapper;
    }

    get APIWrapper() {
        return this.apiWrapper;
    }

}