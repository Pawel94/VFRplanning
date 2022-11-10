import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MapModule} from "./map/map.module";
import {CommonModule} from "./common/common.module";
import {HttpClientModule} from "@angular/common/http";
import {RouteDetailsComponent} from './route/components/route-details/route-details.component';
import {RouteContainerComponent} from './route/components/route-container/route-container.component';
import {WaypointDetailsComponent} from './route/components/waypoint-details/waypoint-details.component';
import {WaypointManagerComponent} from './route/components/waypoint-manager/waypoint-manager.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {WeatherManagerComponent} from './weater/component/weather-manager/weather-manager.component';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import { SearchFormComponent } from './shared/components/search-form/search-form.component';

@NgModule({
  declarations: [
    AppComponent,
    RouteDetailsComponent,
    RouteContainerComponent,
    WaypointDetailsComponent,
    WaypointManagerComponent,
    WeatherManagerComponent,
    SearchFormComponent
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
    AngularFireDatabaseModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
