'use strict'

export class Ajax {

    /**
     * Performs a GET request to a given URL and returns the result
     * @param {string} url The URL address to send the request to
     * @returns {Promise<Response>}
     */
    static async fetchToJSON(url){
        let response = await fetch(url);
        if (!response.ok)
            throw new Error(`${response.status} - ${response.statusText}`);
        return await response.json();
    }
}