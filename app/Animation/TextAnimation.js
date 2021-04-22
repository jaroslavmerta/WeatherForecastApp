'use strict'

export class TextAnimation {
    
    constructor(textId){
        this.text = document.querySelector(textId);
        this.strText = text.textContent;
        this.splitText = strText.split("");
    }
}