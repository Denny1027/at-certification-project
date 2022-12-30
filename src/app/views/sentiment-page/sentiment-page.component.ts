import {
  InsiderSentimentResponse,
  InsiderSentimentItemResponse,
  StockSentiment,
  MonthStockSentiment,
} from '../../app.model';
import { StockService } from './../../services/stock.service';
import { takeUntil, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sentiment-page',
  templateUrl: './sentiment-page.component.html',
  styleUrls: ['./sentiment-page.component.scss'],
  providers: [DatePipe],
})
export class SentimentPageComponent implements OnInit, OnDestroy {
  private _symbol = '';
  private _destroyed$ = new Subject<boolean>();
  sentimentData?: StockSentiment;

  constructor(
    readonly activatedRoute: ActivatedRoute,
    readonly router: Router,
    readonly stockService: StockService,
    readonly datePipe: DatePipe
  ) {
    this.activatedRoute.params
      .pipe(takeUntil(this._destroyed$))
      .subscribe((p) => (this._symbol = p['symbol']));
  }

  /* N G   H O O K S*/

  ngOnInit(): void {
    const fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth() - 3);
    const toDate = new Date();

    const fromDateString =
      this.datePipe.transform(fromDate, 'yyyy-MM-dd') || '';
    const toDateString = this.datePipe.transform(toDate, 'yyyy-MM-dd') || '';

    this.stockService
      .getStockSentiment(this._symbol, fromDateString, toDateString)
      .subscribe((el) => {
        this.sentimentData = this.prepareViewObj(el);
      });
  }

  ngOnDestroy(): void {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }

  /* A C T I O N S */
  onListPage() {
    this.router.navigate(['']);
  }

  private prepareViewObj(stock: InsiderSentimentResponse): StockSentiment {
    let temp: StockSentiment = {
      name: stock.name || '',
      symbol: stock.symbol,
      monthsData: [],
    };

    /* Check for Two Month Ago*/
    const twoMonthAgo = new Date();
    twoMonthAgo.setMonth(twoMonthAgo.getMonth() - 2);
    const twoMonthAgoElem = stock.data.find(
      (el) =>
        el.month === twoMonthAgo.getMonth() + 1 &&
        el.year === twoMonthAgo.getFullYear()
    );
    const twoMonthAgoObj: MonthStockSentiment = {
      date: twoMonthAgo,
      change: twoMonthAgoElem?.change ?? undefined,
      mspr: twoMonthAgoElem?.mspr ?? undefined,
    };
    temp.monthsData.push(twoMonthAgoObj);

    /* Check for One Month Ago*/
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const oneMonthAgoElem = stock.data.find(
      (el) =>
        el.month === oneMonthAgo.getMonth() + 1 &&
        el.year === oneMonthAgo.getFullYear()
    );
    const oneMonthAgoObj: MonthStockSentiment = {
      date: oneMonthAgo,
      change: oneMonthAgoElem?.change ?? undefined,
      mspr: oneMonthAgoElem?.mspr ?? undefined,
    };
    temp.monthsData.push(oneMonthAgoObj);

    /* Check for This Month*/
    const today = new Date();
    const thisMonthElem = stock.data.find(
      (el) =>
        el.month === today.getMonth() + 1 && el.year === today.getFullYear()
    );
    const thisMonthObj: MonthStockSentiment = {
      date: today,
      change: thisMonthElem?.change ?? undefined,
      mspr: thisMonthElem?.mspr ?? undefined,
    };
    temp.monthsData.push(thisMonthObj);

    return temp;
  }
}
