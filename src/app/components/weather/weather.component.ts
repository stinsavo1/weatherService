import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { CityResponse } from '../../models/city.interface';
import { HourlyExcludeEnum } from '../../enums/hourly-exclude.enum';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { combineLatest, map, mergeMap } from 'rxjs';

enum TAB_INDEX {
  HOURLY = 0,
  DAILY = 1
}

enum TAB_NAME {
  HOURLY = 'Hourly',
  DAILY = 'Daily'
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})

export class WeatherComponent implements OnInit {
  public selectedIndexTab = TAB_INDEX.HOURLY;
  public tabIndex = TAB_INDEX;
  public tabName = TAB_NAME;
  public dailyData: { [key: string]: string }[] = [];
  public hourlyData: { [key: string]: string }[] = [];
  public columnNameDaily: string[] = [];
  public loader: boolean;
  public columnNameHourly: string[] = [];
  private cityName: string;
  private searchQuery: string;

  constructor(private weatherService: WeatherService,
              private router: Router,
              private datePipe: DatePipe,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const selectedTab = this.activatedRoute.snapshot.queryParams['selectedTab'];
    if (!selectedTab) {
      this.setToUrlParams(this.selectedIndexTab === TAB_INDEX.HOURLY ? TAB_NAME.HOURLY : TAB_NAME.DAILY);
    } else {
      this.selectedIndexTab = selectedTab === TAB_NAME.HOURLY ? TAB_INDEX.HOURLY : TAB_INDEX.DAILY;
    }
  }

  public clearQuery(): void {
    this.dailyData = [];
    this.hourlyData = [];
  }

  public search(value: string): void {
    this.searchQuery = value;
    this.clearQuery();
    this.getCity(value);
  }

  public tabChanged(tab: MatTabChangeEvent): void {
    this.selectedIndexTab = tab.index;
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: { selectedTab: tab.tab.textLabel },
        queryParamsHandling: 'merge'
      });
    if (this.searchQuery) {
      this.getCity(this.searchQuery)
    }
  }

  public getCity(query: string): void {
    if (this.hourlyData.length && this.columnNameHourly.length && this.dailyData.length && this.columnNameHourly.length) {
      return;
    }
    this.loader = true;
    this.weatherService.getCity({ limit: 1, q: query }).pipe(map((city) => {
        this.cityName = city[0].name
        return city;
      })
      ,mergeMap((city) => combineLatest([
        this.weatherService.getPreset({
            lat: city[0].lat, lon: city[0].lon,
            units: 'metric',
            exclude: [HourlyExcludeEnum.current, HourlyExcludeEnum.alerts, HourlyExcludeEnum.daily, HourlyExcludeEnum.minutely]
          },
        ),
        this.weatherService.getPreset({
            lat: city[0].lat, lon: city[0].lon,
            units: 'metric',
            exclude: [HourlyExcludeEnum.current, HourlyExcludeEnum.alerts, HourlyExcludeEnum.hourly, HourlyExcludeEnum.minutely]
          }
        )
      ]))).subscribe({
      next: ([hourly, daily]) => {
        let arrDaily: { [key: string]: string } = {};

        this.hourlyData = [];
        this.columnNameHourly = [];
        this.dailyData = [];
        this.columnNameDaily = [];
        const timeStamps: number[] = this.getTimeStamp();
        const result = hourly.hourly.filter(({ dt }) => timeStamps.includes(dt))
        result.forEach((hourly) => {
          const day = this.datePipe.transform(hourly.dt * 1000, `HH:mm`);
          if (day) {
            arrDaily = {
              cityName: this.cityName,
              ...arrDaily,
              [day === '00:00' ? '24:00' : day]: hourly.temp + '\xB0C'
            }
            this.columnNameHourly.push(day === '00:00' ? '24:00' : day);
          }
        })
        this.hourlyData.push(arrDaily);
        daily.daily.splice(-1);
        daily.daily.forEach((daily) => {
          const day = this.datePipe.transform(daily.dt * 1000, `EEEEEE`);
          if (day) {
            arrDaily = {
              cityName: this.cityName,
              ...arrDaily,
              [day]: daily.temp.day + '\xB0C'
            }
            this.columnNameDaily.push(day);
          }
        })
        this.dailyData.push(arrDaily)
      },
      error: err => console.log(err)
    }).add(() => this.loader = false);
  }

  private getTimeStamp(): number[] {
    const arrLength = 24;
    const step = 3;

    const arr: number[] = [...Array(Math.floor(arrLength / step) + 1).keys()].slice(1).map((i) => i * step);
    const current: Date = new Date();
    const timeStamp: number[] = [];
    current.setDate(current.getDate() + 1);
    current.setMinutes(0)
    current.setSeconds(0)
    current.setMilliseconds(0)
    arr.forEach((x) => {
      current.setHours(x);
      timeStamp.push(current.getTime() / 1000);
    });
    return timeStamp;
  }

  private setToUrlParams(tabLabel: string): void {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: { selectedTab: tabLabel },
        queryParamsHandling: 'merge'
      });
  }
}
