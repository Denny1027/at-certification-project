import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SentimentPageComponent } from './views/sentiment-page/sentiment-page.component';
import { StockPageComponent } from './views/stock-page/stock-page.component';
import { StockItemComponent } from './widgets/stock-item/stock-item.component';
import { StockImageDirective } from './utils/stock-image.directive';

@NgModule({
  declarations: [
    AppComponent,
    SentimentPageComponent,
    StockPageComponent,
    StockItemComponent,
    StockImageDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
