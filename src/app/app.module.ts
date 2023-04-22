import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MapModule} from "./core/map/map.module";
import {CommonModule} from "./common/common.module";
import {HttpClientModule} from "@angular/common/http";
import {RouteDetailsComponent} from './core/route/components/route-details/route-details.component';
import {RouteContainerComponent} from './core/route/components/route-container/route-container.component';
import {WaypointDetailsComponent} from './core/route/components/waypoint-details/waypoint-details.component';
import {WaypointManagerComponent} from './core/route/components/waypoint-manager/waypoint-manager.component';
import {NgbModule, NgbNavModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {WeatherManagerComponent} from './core/weater/component/weather-manager/weather-manager.component';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {SearchFormComponent} from './shared/components/search-form/search-form.component';
import {FlightParametersComponent} from './core/flight-parameters/component/flight-parameters/flight-parameters.component';
import {ManualWeatherComponent} from './core/weater/component/manual-weather/manual-weather.component';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { TranslocoRootModule } from './transloco-root.module';
import {
  AutomaticWeatherComponent
} from "./core/weater/component/automatic-weather/automatic-weather.component";
import {NavbarComponent} from "./common/components/navbar/navbar.component";


@NgModule({
  declarations: [
    AppComponent,
    RouteDetailsComponent,
    RouteContainerComponent,
    WaypointDetailsComponent,
    WaypointManagerComponent,
    WeatherManagerComponent,
    SearchFormComponent,
    FlightParametersComponent,
    ManualWeatherComponent,
    AutomaticWeatherComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MapModule,
    CommonModule,
    HttpClientModule,
    NgbModule, FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TranslocoRootModule,

  ],
  providers: [],
  exports: [
    SearchFormComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
