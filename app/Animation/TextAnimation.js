'use strict'

export class TextAnimation {
    
    constructor(textId){
        this.element = document.querySelector(textId);
        this.strText = this.element.textContent;
        this.splitText = this.strText.split("");
    }

    getAnimation(){
        this.addSpanForLetter(this.element);
        this.getInterval();
    }

    addSpanForLetter(element){
        element.textContent = "";
        for (let i = 0; i <this.splitText.length; i++) {
            element.innerHTML +="<span>" + this.splitText[i] + "</span>";
        }
    }

    addClassForLetter(){
        const span = this.element.querySelectorAll('span')[this.char];
        span.classList.add('fade');
        console.log( this.char);
        this.char++;
        
       

    }

    getInterval(){  
        this.char = 0;
        let timer = setInterval( () => {
            this.addClassForLetter();
            
            if(this.char === this.splitText.length){
            console.log( this.splitText.length);
            clearInterval(timer);}}, 50);
        
        
    }
}