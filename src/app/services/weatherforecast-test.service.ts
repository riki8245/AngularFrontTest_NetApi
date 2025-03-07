import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherforecastTestService {

  private API_WEATHER: string = "/weatherforecast";

  constructor() { }
  private http = inject(HttpClient);
  private URLbase = environment.apiURL + this.API_WEATHER


  public getWeather(){
    return this.http.get<any>(this.URLbase);
  }
}
