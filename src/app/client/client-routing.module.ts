import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientComponent} from './client.component';
import {ClientGuardGuard} from '../client-guard.guard';
import {profileResolver} from '../common/profile.service';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }, {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      }, {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      }, {
        path: 'list-test',
        loadChildren: () => import('./list-test/list-test.module').then(m => m.ListTestModule)
      },
      {
        path: 'profile',
        resolve: [profileResolver],
        canActivate: [ClientGuardGuard],
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
      }, {
        path: 'test/:examId',
        loadChildren: () => import('./test/test.module').then(m => m.TestModule)
      },
      {
        path: 'my-exam',
        resolve: [profileResolver],
        canActivate: [ClientGuardGuard],
        loadChildren: () => import('./history-exam/history-exam.module').then(m => m.HistoryExamModule)
      },
      {
        path: 'reset-password/:otp',
        loadChildren: () => import('./login/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
      },
      {path: 'oauth2', loadChildren: () => import('./redirect/redirect.module').then(m => m.RedirectModule)},
      {path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule)},
      {path: 'pricing', loadChildren: () => import('./pricing/pricing.module').then(m => m.PricingModule)},
      {
        path: 'thank-you/:payment',
        resolve: [profileResolver],
        loadChildren: () => import('./thank-you/thank-you.module').then(m => m.ThankYouModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {
}
