'use strict'

export class StringUtility {
  
    //pokud je v předávaném řetězci čárka, rozdělí řetězec na slova podle čárky
    //, odstraní mezery ze začátku a konce slova a uloží ji do pole
    //pokud řetězec nemá čárku, odstraní jen mezery ze začátku a konce řetězce
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