import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmailComponent} from './email.component';
import {UpdateEmailComponent} from './update-email/update-email.component';
import {TemplateEmailComponent} from './template-email/template-email.component';
import {UpdateTemplateEmailComponent} from './template-email/update-template-email/update-template-email.component';

const routes: Routes = [
  {
    path: 'account/list',
    component: EmailComponent
  }, {
    path: 'account/update',
    component: UpdateEmailComponent
  }, {
    path: 'template-email/list',
    component: TemplateEmailComponent
  }, {
    path: 'template-email/update',
    component: UpdateTemplateEmailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailRoutingModule {
}
