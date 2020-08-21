import { StateDataArray, States_daily, StateData, ChartData } from './state-data.model';
import { ConfigService } from './../config/config.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, retry, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateDataService {

  constructor(private http: HttpClient, private configService: ConfigService) { }
  
  stateWiseEntireData: StateDataArray;
  stateWiseDailyData: StateData[];
  totalStateWiseEntireData: StateData;
  detailsStartDate: string;
  detailsEndtDate: string;
  
  detailsStartDateChanged = new Subject<string>();
  detailsEndtDateChanged = new Subject<string>();
  displayStartDateChanged=new Subject<string>();
  
  stateWiseDailyDataChanged = new Subject<StateData[]>();
  totalStatewiseDailyDataChanged = new Subject<StateData>();
  chartDataChanged= new Subject<ChartData>();

  getStateData(){
    return this.http.get<StateDataArray>(this.configService.stateDataUrl)
    .pipe(map((entireStateData)=>{
      this.detailsStartDate=entireStateData.states_daily[0].date;
      this.detailsEndtDate=entireStateData.states_daily[entireStateData.states_daily.length-1].date;

      this.detailsStartDateChanged.next(this.detailsStartDate);
      this.detailsEndtDateChanged.next(this.detailsEndtDate);

      this.stateWiseEntireData=entireStateData;      
      this.processDataForCharts(entireStateData);  
      return this.formatCompleteStateData(entireStateData);;
    }));
  }
  formatStateBasedOnIndex(startIndex: number, endIndex: number){
    let reqData: StateData[];
      if(this.stateWiseEntireData){
          reqData= this.formatstateWiseDailyData(this.stateWiseEntireData.states_daily.slice(startIndex,endIndex));
          this.stateWiseDailyDataChanged.next(reqData);
      }else{
        console.error("stateWiseEntireData not defined");
      }
  }
  formatstateWiseDailyData(data: States_daily[]){
    const formatedStateDataNeeded: StateData []=[];
    var stateArray = this.configService.stateArray;	
    var statefullNameArray= this.configService.statefullNameArray;
    var stateWiseData: StateData;
    var totalStatewiseDailyData: StateData;
      for(let i=0;i<stateArray.length-1 ;i++){
        stateWiseData = {
          'stateName': statefullNameArray[i],
          'confirmed': data[0][stateArray[i]],
          'recovered':  data[1][stateArray[i]],
          'deceased':  data[2][stateArray[i]],
        }
        
        formatedStateDataNeeded.push(stateWiseData);
      } 
    totalStatewiseDailyData ={
      'stateName': statefullNameArray[stateArray.length-1],
      'confirmed': data[0][stateArray[stateArray.length-1]],
      'recovered':  data[1][stateArray[stateArray.length-1]],
      'deceased':  data[2][stateArray[stateArray.length-1]]
    }
    this.totalStatewiseDailyDataChanged.next(totalStatewiseDailyData);
    this.displayStartDateChanged.next(data[data.length-1].date);
    return formatedStateDataNeeded;
  }
  formatCompleteStateData(entireStateData:StateDataArray ){
    let statewiseEntireData: StateData;
    let statewiseEntireDataArray : StateData[]=[];
    
    var stateArray = this.configService.stateArray;	
    var statefullNameArray= this.configService.statefullNameArray;

        for(let j=0;j<stateArray.length ;j++){
          let totalConfirmed=0;
          let totalRecovered=0;
          let totaldeceased=0;
          for(let i=0;i<entireStateData.states_daily.length; i=i+3){
              totalConfirmed += parseInt(entireStateData.states_daily[i][stateArray[j]]);
          }
          for(let i=1;i<entireStateData.states_daily.length; i=i+3){
              totalRecovered += parseInt(entireStateData.states_daily[i][stateArray[j]]);
          }
          for(let i=2;i<entireStateData.states_daily.length; i=i+3){
              totaldeceased += parseInt(entireStateData.states_daily[i][stateArray[j]]);
          }
          statewiseEntireData = {
            'stateName': statefullNameArray[j],
            'confirmed': totalConfirmed.toString(),
            'recovered': totalRecovered.toString(),
            'deceased':  totaldeceased.toString()
          } 
          statewiseEntireDataArray.push(statewiseEntireData);
        }
        this.totalStateWiseEntireData= statewiseEntireDataArray[statewiseEntireDataArray.length-1];
        return statewiseEntireDataArray;        
  }
  processDataForCharts(entireStateData: StateDataArray){
      let lastTenDaysData: States_daily[];
      let chartData: ChartData;
      let totalCaseArray: number[] =[];
      let recoveredCaseArray: number[] =[];
      let deceasedCaseArray: number[] =[];
      let dateArray: string[] =[];
      if(entireStateData){
          lastTenDaysData = entireStateData.states_daily.slice(entireStateData.states_daily.length-30,entireStateData.states_daily.length);
          console.log(lastTenDaysData);
          for(let i=0;i<lastTenDaysData.length;i++){
            if(lastTenDaysData[i].status == 'Confirmed' ){
              dateArray.push(lastTenDaysData[i].date);
              totalCaseArray.push(+(lastTenDaysData[i].tt));
            }
            if(lastTenDaysData[i].status == 'Recovered' ){
              recoveredCaseArray.push(+lastTenDaysData[i].tt);  
            }
            if(lastTenDaysData[i].status == 'Deceased' ){
              deceasedCaseArray.push(+lastTenDaysData[i].tt);  
            }
          }
          chartData={
            'date': dateArray,
            'total': totalCaseArray,
            'recovered': recoveredCaseArray,
            'deceased':deceasedCaseArray
          }
          this.chartDataChanged.next(chartData);
      }
  }
}
