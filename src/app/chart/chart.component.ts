import { ChartData } from './../state-data/state-data.model';
import { StateDataService } from './../state-data/state-data.service';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  chartData: ChartData={
    'date':[],
    'deceased':[],
    'recovered':[],
    'total':[]
  };
  public barChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July']; //dummy data
  public barChartType:ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataSets[] = [] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];
  constructor(private stateService: StateDataService) { }
  
  ngOnInit(): void {
      this.stateService.chartDataChanged.subscribe((chartData:ChartData)=>{
        this.chartData= chartData;
       this.setChartData(this.chartData);
      });
  }
  public barChartOptions: ChartOptions = {
    showLines:false,    
    responsive: true
  };
     
  setChartData(chartData: ChartData){
      this.barChartLabels= chartData.date;
      this.barChartData = [
        {data: this.chartData.total, label: 'Total'},
        {data: this.chartData.recovered, label: 'Recovred'},
        {data: this.chartData.deceased, label: 'Deceased'}
      ];
      
  }

}
