import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientModule} from './client/client.module';
import {AdminModule} from './admin/admin.module';
import {adminGuardGuard} from "./admin-guard.guard";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => ClientModule,
  },
  {
    path: 'admin',
    canActivate: [adminGuardGuard],
    loadChildren: () => AdminModule,
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full'
  },
  {
    path: '404',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
