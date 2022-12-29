import { StockPageComponent } from './views/stock-page/stock-page.component';
import { SentimentPageComponent } from './views/sentiment-page/sentiment-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: StockPageComponent,
  },
  {
    path: 'sentiment/:symbol',
    component: SentimentPageComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
