import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {WeatherforecastTestService} from './services/weatherforecast-test.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'AngularFront_ApiDotNet_Test';

  weatherForecastService = inject(WeatherforecastTestService);

  weathers: any[] = [];

  constructor() {
    this.weatherForecastService.getWeather().subscribe(data => {
      this.weathers = data;
    })
  }
}
