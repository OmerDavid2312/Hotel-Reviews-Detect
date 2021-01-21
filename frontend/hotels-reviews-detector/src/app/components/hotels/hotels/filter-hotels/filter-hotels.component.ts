import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { EventEmitter } from "@angular/core";

@Component({
  selector: 'app-filter-hotels',
  templateUrl: './filter-hotels.component.html',
  styleUrls: ['./filter-hotels.component.css']
})
export class FilterHotelsComponent implements OnInit,OnDestroy {
  
  @Output() activeSort: EventEmitter<'All'|'Class'> = new EventEmitter();
  currentSortType = 'All';
  constructor() { }

  ngOnInit(): void {
    this.activeSort.subscribe(currentTypeState=>{
       this.currentSortType = currentTypeState;
    })
   }

  setActiveSort(type:'All'|'Class'):void {
    this.activeSort.emit(type);
  }

  ngOnDestroy(){
    this.activeSort.unsubscribe();    
  }

}
