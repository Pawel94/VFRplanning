import {inject, NgModule} from '@angular/core';
import {CanMatchFn, RouterModule, Routes} from '@angular/router';
import {VfrPlanningComponent} from "./features/vfr-planning/vfr-planning/vfr-planning.component";
import {AuthService} from "./shared/services";
import {map} from "rxjs";

const routes: Routes = [
    {
        path: '',
        component: VfrPlanningComponent
    },
    {
        path: 'summary',
        loadComponent: () => import('./features/vfr-summary/vfr-summary-manager/vfr-summary-manager.component').then(mod => mod.VfrSummaryManagerComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./features/vfr-login/login/login.component').then(mod => mod.LoginComponent),
        canMatch: [isLoggedInCanMatch()]
    },
  {
        path: 'login',
        loadComponent: () => import('./features/vfr-login/login-not-match/login-not-match.component').then(mod => mod.LoginNotMatchComponent),

    },

]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

export function isLoggedInCanMatch(): CanMatchFn {
    return () =>
        inject(AuthService).isLoggedIn().pipe(map(el => el))
}
