import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SliderComponent} from './slider.component';
import {UpdateSliderComponent} from './update-slider/update-slider.component';

const routes: Routes = [
  {
    path: 'list',
    component: SliderComponent
  }, {
    path: 'update',
    component: UpdateSliderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SliderRoutingModule {
}
