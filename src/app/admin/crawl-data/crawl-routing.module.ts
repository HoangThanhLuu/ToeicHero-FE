import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CrawlComponent} from './crawl/crawl.component';
import {CrawlConfigComponent} from './crawl-config/crawl-config.component';
import {CrawlDataComponent} from './crawl-data.component';

const routes: Routes = [
  {
    path: 'get',
    component: CrawlComponent
  },
  {
    path: 'config',
    component: CrawlConfigComponent
  },
  {
    path: 'list',
    component: CrawlDataComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrawlRoutingModule {
}
