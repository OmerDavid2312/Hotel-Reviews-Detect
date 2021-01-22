import { AfterContentInit, Directive,ElementRef,OnInit } from '@angular/core';

@Directive({
  selector: '[textShorter]'
})
export class ShorterDirective implements AfterContentInit  {

  constructor(private el:ElementRef) { }

  ngAfterContentInit() {
    
    if(this.el.nativeElement.innerText.length > 25){
      let shorterText =  this.el.nativeElement.innerText.substring(0,25) + ' ...'
      this.el.nativeElement.innerText = shorterText 
    } 

  }


}
