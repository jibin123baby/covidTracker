import { States_daily } from './../state-data/state-data.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  
  stateDataUrl:string = 'https://api.covid19india.org/states_daily.json';
  constructor(private http: HttpClient) { }
  stateArray = ["an","ap","ar","as","br","ch","ct","dd","dl","dn","ga","gj",
                                      "hp","hr","jh","jk","ka","kl","la","ld","mh","ml",
                            "mn","mp","mz","nl","or","pb","py","rj","sk","tg","tn","tr","un","up","ut","wb","tt"];	
                            
  statefullNameArray= ["Andaman and Nicobar Islands","Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chandigarh",
                    "Chhattisgarh","Dadra and Nagar Haveli","Delhi","Daman and Diu","Goa","Gujarat","Himachal Pradesh",
                    "Haryana","Jharkhand","Jammu and Kashmir	","Karnataka","Kerala","Lakshadweep","Ladak","Maharashtra",
                    "Meghalaya","Manipur","Madhya Pradesh","Mizoram","Nagaland	","Odisha","Punjab","Puducherry","Rajasthan",
                    "Sikkim","Telangana","Tamil Nadu","Tripura","Uttaranchal","Uttar Pradesh","Uttarakhand","West Bengal","Total"];	
}
