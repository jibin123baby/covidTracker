import { UtilityService } from './../utility/utility.service';
import { StateDataService } from './state-data.service';
import { StateData } from './state-data.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-state-data',
  templateUrl: './state-data.component.html',
  styleUrls: ['./state-data.component.css']
})

export class StateDataComponent implements OnInit {

  constructor(private stateDataService: StateDataService, private utilityService: UtilityService) { }

  statewiseDailyData: StateData[]; 
  statewiseEntireData: StateData[];
  displayStateData: StateData[];  

  searchMinDate: Date= new Date();
  searchMaxDate:Date= new Date();
  displayStartDate: string;

  isEntireDataDisplayed: boolean=true;
  buttonDisplayString: string='Todays Cases';
  displayDateCaption: string=" from "+this.searchMinDate+" to "+this.searchMaxDate;

  totalStatewiseDailyData: StateData;
  totalStatewiseEntireData: StateData;
  displayTotalStateData: StateData= {
      'stateName': 'Total',
      'confirmed': "-",
      'recovered':  "-",
      'deceased': "-"
  };

  // for Angular Material Data Table
  displayedColumns: string[] = ['stateName','confirmed','recovered','deceased'];
  dataSource = new MatTableDataSource(this.displayStateData);
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this.dataSource.sort = this.sort;

    this.fetchStateData();

    this.stateDataService.detailsStartDateChanged.subscribe((date=>{
      this.searchMinDate= this.utilityService.convertDate(date);
    }));
    this.stateDataService.detailsEndtDateChanged.subscribe((date=>{
      this.searchMaxDate= this.utilityService.convertDate(date);
    }));
    this.stateDataService.stateWiseDailyDataChanged.subscribe((statewiseDailyData)=>{
        this.statewiseDailyData=statewiseDailyData;
        this.processAndDisplayData(statewiseDailyData,this.totalStatewiseDailyData);
    });
    this.stateDataService.totalStatewiseDailyDataChanged.subscribe((totalStatewiseDailyData)=>{
      this.totalStatewiseDailyData=totalStatewiseDailyData;
    });
    this.stateDataService.displayStartDateChanged.subscribe((displayStartDate)=>{
      this.displayStartDate=displayStartDate;
      this.isEntireDataDisplayed=false;
    });
    
   
  }
  
  fetchStateData(){
    this.stateDataService.getStateData().subscribe((stateEntireData: StateData[])=>{
        this.statewiseEntireData=stateEntireData;  
        this.totalStatewiseEntireData=this.stateDataService.totalStateWiseEntireData;
        this.displayData();
    });
  }
  processAndDisplayData(stateData : StateData[],totalStateData: StateData){
    this.displayStateData = stateData;
    this.displayTotalStateData=totalStateData;
    this.dataSource = new MatTableDataSource(this.displayStateData);
    this.dataSource.sort = this.sort;
    if(!this.isEntireDataDisplayed){
      this.buttonDisplayString='Total Cases';    
      this.displayDateCaption=" as of "+this.displayStartDate;
      this.isEntireDataDisplayed=true;
    }
  }
  displayData(){
    if(this.isEntireDataDisplayed){
      this.processAndDisplayData(this.statewiseEntireData,this.totalStatewiseEntireData);
      this.isEntireDataDisplayed=false;
      this.buttonDisplayString='Todays Cases';
      this.displayDateCaption=" from "+this.searchMinDate+" to "+this.searchMaxDate;
    }
    else{      
      let dayDiff:  number=this.utilityService.dayfromDates(this.searchMinDate,this.searchMaxDate);
      let startIndex= dayDiff*3;
      let endIndex= startIndex+3;
      this.stateDataService.formatStateBasedOnIndex(startIndex,endIndex);
      this.isEntireDataDisplayed=true;
        
    }    
  }

  
}
