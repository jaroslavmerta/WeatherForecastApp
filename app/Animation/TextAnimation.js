'use strict'

export class TextAnimation {
    
    constructor(textId){
        this.element = document.querySelector(textId);
        this.strText = this.element.textContent;
        this.splitText = this.strText.split("");
    }

    getAnimation(){
        this.addSpanForLetter(this.element);
    }

    addSpanForLetter(element){
        element.textContent = "";
        for (let i = 0; i <this.splitText.length; i++) {
            element.innerHTML +="<span>" + this.splitText[i] + "</span>";
        }
    }

    addClassForLetter(){
        const span = this.element.querySelectorAll('span');
    }
}