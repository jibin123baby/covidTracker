import { UtilityService } from './../utility/utility.service';
import { StateDataService } from './../state-data/state-data.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup;
  searchMinDate: Date= new Date();
  searchMaxDate: Date= new Date();

  constructor( private stateDataService: StateDataService, private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchDate: new FormControl(new Date(),[Validators.required])
    });
    this.stateDataService.detailsStartDateChanged.subscribe((date=>{
      this.searchMinDate= this.utilityService.convertDate(date);
    }));
    this.stateDataService.detailsEndtDateChanged.subscribe((date=>{
      this.searchMaxDate= this.utilityService.convertDate(date);
    }));
  }
  searchDatefn(searchFormValue){
    let dayDiff:  number=this.utilityService.dayfromDates(this.searchMinDate,searchFormValue.searchDate);
    let startIndex= dayDiff*3;
    let endIndex= startIndex+3;
    this.stateDataService.formatStateBasedOnIndex(startIndex,endIndex);
  }

}
