'use strict'

export class TextAnimation {
    
    constructor(textId){
        this.element = document.querySelector(textId);
        this.strText = element.textContent;
        this.splitText = strText.split("");
    }

    getAnimation(){
        this.addSpanForLetter(this.element);
    }

    addSpanForLetter(element){
        for (let i = 0; i <this.splitText.length; i++) {
            element.innerHTML +="<span>" + this.plitText[i] + "</span>";
        }
    }
}