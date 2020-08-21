import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  processDate(myDate:Date,format){
    const locale = 'en-US';
    const formattedDate = formatDate(myDate, format, locale);
    return formattedDate;
  }
  dayfromDates(dateone,datetwo){
    //console.log(dateone,datetwo);
    var dayDif = (datetwo - dateone)  / 1000 / 60 / 60 / 24;
    return dayDif;
  }

  convertDate(unformatedDate){
      let formattedDate=this.formatDates(unformatedDate);
      //console.log("Hii "+formattedDate);
      return (new Date(formattedDate[0],formattedDate[1],formattedDate[2]));
  }
  formatDates(detailsDate){ 
    if(detailsDate){
      let tmpDateArray = detailsDate.split("-");
      let monthString:number=this.getNumberMonthFromString(tmpDateArray[1]);
      return [parseInt(tmpDateArray[2])+2000,monthString,parseInt(tmpDateArray[0])];
    }
    {
      return detailsDate;
    }
  }
  getNumberMonthFromString(monthString: string){
    let monthNumber=0;
    monthString=monthString.toUpperCase();
    switch (monthString) {
      case 'JAN':
        monthNumber=0;
        break;
      case 'FEB':
        monthNumber=1;
        break;
      case 'MAR':
        monthNumber=2;
        break;
      case 'APR':
        monthNumber=3;
        break;
      case 'MAY':
        monthNumber=4;
        break;
      case 'JUN':
        monthNumber=5;
        break;
      case 'JUL':
        monthNumber=6;
        break;
      case 'AUG':
        monthNumber=7;
        break;
      case 'SEP':
        monthNumber=8;
        break;
      case 'OCT':
        monthNumber=9;
        break;
      case 'NOV':
        monthNumber=10;
        break;
      case 'DEC':
        monthNumber=11;
        break;
      case 'Jan':
        monthNumber=0;
        break;
      default:
        break;
    }
    return monthNumber;
  }
}
