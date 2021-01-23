import { AfterContentInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[reviewRating]'
})
export class ReviewRatingDirective implements AfterContentInit {

  constructor(private el:ElementRef) { }

  ngAfterContentInit() {
    let rating = Number(this.el.nativeElement.innerText)
    switch (rating) {
      case 5:
        this.el.nativeElement.style.color = '#28a745'
        break;
        
      case 4:
        this.el.nativeElement.style.color = '#28a745'
        break;

      case 3:
        this.el.nativeElement.style.color = '#17a2b8'
        break;

      case 2:
        this.el.nativeElement.style.color = '#28a745'
        break;

      case 1:
        this.el.nativeElement.style.color = '#28a745'
        break;
    
      default:
        this.el.nativeElement.style.color = 'white'
        break;
    }

  }

}
