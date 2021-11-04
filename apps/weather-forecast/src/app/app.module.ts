import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CityTableComponent } from './components/city-table/city-table.component';
import { WeatherService } from './services/weather.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { weatherReducer } from './state/weather.reducer';
import { routes } from './app.routes';

@NgModule({
	declarations: [AppComponent, CityTableComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		RouterModule.forRoot(routes),
		FormsModule,
		ReactiveFormsModule,
		StoreModule.forRoot(
			{weather: weatherReducer},
			{
				metaReducers: !environment.production ? [] : [],
				runtimeChecks: {
					strictActionImmutability: true,
					strictStateImmutability: true,
				},
			}
		),
		EffectsModule.forRoot([]),
		!environment.production ? StoreDevtoolsModule.instrument() : [],
	],
	providers: [WeatherService],
	bootstrap: [AppComponent],
})
export class AppModule {}
