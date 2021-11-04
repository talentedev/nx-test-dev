import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { WeatherService } from './services/weather.service';
import { retrievedWeather } from './state/weather.actions';
import { selectWeather } from './state/weather.selectors';
import { City } from './models/city';

@Component({
    selector: 'bp-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    title = 'weather-forecast';
    cityName = '';
    mode = 'daily';
    city : City|null = null;
    weathers = this.store.select(selectWeather);

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private weatherService: WeatherService,
        private store: Store
    ) {
        this.route.queryParams.subscribe(params => {
            this.cityName = params['city'];
            if(params['mode']) {
                this.mode = params['mode'];
            }
            this.getData();
        });
    }

    onSearchChange(e: any): void {  
        this.cityName = e.target.value;
        this.router.navigate(['/'], { queryParams: { city: this.cityName, mode: this.mode }});
        this.getData();
    }

    onModeChange(e: any): void {
        this.mode = e.target.value;
        this.router.navigate(['/'], { queryParams: { city: this.cityName, mode: this.mode }});
        this.getData();
    }

    getData() {
        this.weatherService.getCity(this.cityName).subscribe(res => {
            if(res.length > 0) {
                this.city = res[0];
                if(this.mode == 'daily') {
                    this.getDailyWeather();
                } else {
                    this.getHourlyWeather();
                }
            } else {
                this.city = null;
            }
        });
    }

    getHourlyWeather() {
        if(this.city) {
            this.weatherService.getHourlyWeather(this.city.lat, this.city.lon).subscribe((weather) => {
                this.store.dispatch(retrievedWeather({ weather }));
            });
        }
    }

    getDailyWeather() {
        if(this.city) {
            this.weatherService.getDailyWeather(this.city.lat, this.city.lon).subscribe((weather) => {
                this.store.dispatch(retrievedWeather({ weather }));
            });
        }
    }
}
