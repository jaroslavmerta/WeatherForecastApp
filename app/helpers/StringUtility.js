'use strict'

export class StringUtility {
  
    /**
     * Checks for separator in a string
     * @param {string} string The string to be checked for the presence of a separator
     * @param {string} sep The separator to search for
     * @returns {array} if the separator was founded 
     * @returns {string} if the separator was not founded
     */
    static checkString(string, sep){
        let attributes;
        if (string.includes(sep)){
          attributes = string.split(sep);
          return attributes.map( s => s.trim());
        }
        else
          return attributes = string.trim();
    }
}