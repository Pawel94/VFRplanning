import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './components/map/map.component';
import { MapContainerComponent } from './components/map-container/map-container.component';


@NgModule({
  declarations: [
    MapComponent,
    MapContainerComponent
  ],
  imports: [
    CommonModule,LeafletModule

  ],
  exports: [
    MapComponent,
    MapContainerComponent
  ]
})
export class MapModule { }
