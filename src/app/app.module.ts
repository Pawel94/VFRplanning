import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MapModule} from "./features/vfr-planning/map/map.module";
import {CommonModule} from "./common/common.module";
import {HttpClientModule} from "@angular/common/http";
import {RouteDetailsComponent} from './features/vfr-planning/route/components/route-details/route-details.component';
import {
  RouteContainerComponent
} from './features/vfr-planning/route/components/route-container/route-container.component';

import {
  WaypointManagerDialogComponent
} from './features/vfr-planning/route/components/waypoint-manager-dialog/waypoint-manager-dialog.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  WeatherManagerComponent
} from './features/vfr-parameters/weater/component/weather-manager/weather-manager.component';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {SearchFormComponent} from './shared/components/search-form/search-form.component';
import {
  FlightParametersComponent
} from './features/vfr-parameters/flight-parameters/component/flight-parameters/flight-parameters.component';
import {
  ManualWeatherComponent
} from './features/vfr-parameters/weater/component/manual-weather/manual-weather.component';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TranslocoRootModule} from './transloco-root.module';
import {
  AutomaticWeatherComponent
} from "./features/vfr-parameters/weater/component/automatic-weather/automatic-weather.component";
import {NavbarComponent} from "./common/components/navbar/navbar.component";
import {VfrPlanningComponent} from "./features/vfr-planning/vfr-planning/vfr-planning.component";
import {DegreePipe} from "./common/pipes/degree-pipe/degree.pipe";
import {DistancePipe} from "./common/pipes/distance-pipe/distance.pipe";
import {TimePipe} from "./common/pipes/time-pipe/time.pipe";


@NgModule({
  declarations: [
    AppComponent,
    RouteDetailsComponent,
    RouteContainerComponent,
    WaypointManagerDialogComponent,
    WeatherManagerComponent,
    SearchFormComponent,
    FlightParametersComponent,
    ManualWeatherComponent,
    AutomaticWeatherComponent,
    NavbarComponent,
    VfrPlanningComponent,

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
    DegreePipe,
    DistancePipe,
    TimePipe
  ],
  providers: [],
  exports: [
    SearchFormComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
