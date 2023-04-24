import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VfrPlanningComponent} from "./features/vfr-planning/vfr-planning/vfr-planning.component";

const routes: Routes = [
  {
    path: '',
    component: VfrPlanningComponent
  },
  {
    path: 'summary',
    loadComponent: () => import('./features/vfr-summary/vfr-summary-manager/vfr-summary-manager.component').then(mod => mod.VfrSummaryManagerComponent)
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
