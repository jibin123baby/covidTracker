import { ChartData } from './../state-data/state-data.model';
import { StateDataService } from './../state-data/state-data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit {
  chartData: ChartData={
    'date':[],
    'deceased':[],
    'recovered':[],
    'total':[]
  };  
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: (ChartOptions | { annotation: any }) = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  constructor(private stateService: StateDataService) { }

  ngOnInit(): void {
      this.stateService.chartDataChanged.subscribe((chartData:ChartData)=>{
        this.chartData= chartData;
       this.setLineChartData();
      });
  }
  setLineChartData(){
    this.lineChartData = [
      { data:this.chartData.total, label: 'Total Active Cases' }];
    this.lineChartLabels = this.chartData.date;
    this.lineChartColors = [
      {
        backgroundColor: 'rgb(0,0,255,0.3)',
        borderColor: 'rgb(51, 51, 255)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
    ];
  }
  displayRecovered(){
    this.lineChartData = [
      { data:this.chartData.recovered, label: 'Total Recovred Cases' }];
    this.lineChartColors =[
      {
        backgroundColor: 'rgba(0,255,0,0.3)',
        borderColor: 'rgb(0, 128, 43)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
    ];
  }
  displayDeceased(){
    this.lineChartData = [
      { data:this.chartData.deceased, label: 'Total Deceased Cases' }];
    this.lineChartColors =[
      {
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
    ];
  }
  displayActive(){
      this.setLineChartData();
  }
}
