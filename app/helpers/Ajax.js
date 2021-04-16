'use strict'

export class Ajax {

    static async fetchToJSON(url){
        let response = await fetch(url);
        if (!response.ok)
            throw new Error(`${response.status} - ${response.statusText}`);
        return await response.json();
    }
}