import { StorageService } from './storage.service';
import {
  QuoteResponse,
  SymbolResponse,
  StockItem,
  InsiderSentimentResponse,
  SymbolItemResponse,
} from '../app.model';
import { MapperService } from './mapper.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, throwError } from 'rxjs';
import { concatMap } from 'rxjs/operators';

const API_TOKEN = 'bu4f8kn48v6uehqi3cqg';
const START_URL = 'https://finnhub.io/api/v1';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  constructor(
    readonly http: HttpClient,
    readonly mapperService: MapperService,
    readonly storageService: StorageService
  ) {}

  private _getQuote(symbol: string): Observable<QuoteResponse> {
    let params = new HttpParams();
    params = params.append('symbol', symbol);
    params = params.append('token', API_TOKEN);

    const url = `${START_URL}/quote`;
    const options = {
      params,
    };
    return this.http.get<QuoteResponse>(url, options);
  }

  private _getSymbolLookup(symbol: string): Observable<SymbolItemResponse> {
    let params = new HttpParams();
    params = params.append('q', symbol);
    params = params.append('token', API_TOKEN);

    const url = `${START_URL}/search`;
    const options = {
      params,
    };
    return this.http
      .get<SymbolResponse>(url, options)
      .pipe(map((res) => this.mapperService.getExactSymbol(res, symbol)));
  }

  private _getInsiderSentiment(
    symbol: string,
    fromDate: string,
    toDate: string
  ): Observable<InsiderSentimentResponse> {
    let params = new HttpParams();
    params = params.append('symbol', symbol);
    params = params.append('from', fromDate);
    params = params.append('to', toDate);
    params = params.append('token', API_TOKEN);

    const url = `${START_URL}/stock/insider-sentiment`;
    const options = {
      params,
    };
    return this.http.get<InsiderSentimentResponse>(url, options);
  }

  /**
   * 2 API calls:
   * - getQuote to obtain quotes data for a stock
   * - getSymbolLookup to obtain the corresponding symbol data (name for example)
   * Next, it merge both API calls to create a single StockItem object
   */
  getStockInfo(symbol: string): Observable<StockItem> {
    return forkJoin([
      this._getQuote(symbol),
      this._getSymbolLookup(symbol),
    ]).pipe(
      concatMap(([quote, lookup]) => {
        if (this.storageService.get(symbol)) {
          return throwError(() => {
            console.warn('Warning: Element already exist on local storage!');
          });
        } else {
          return of(this.mapperService.toStockItem(quote, lookup));
        }
      })
    );
  }

  /**
   * 2 API calls:
   * - getInsiderSentiment to obtain quotes data for a stock between two dates
   * - getSymbolLookup to obtain the corresponding symbol data (name for example)
   * Next, it merge both API calls to create a single InsiderSentimentResponse object
   */
  getStockSentiment(
    symbol: string,
    fromDate: string,
    toDate: string
  ): Observable<InsiderSentimentResponse> {
    return forkJoin([
      this._getInsiderSentiment(symbol, fromDate, toDate),
      this._getSymbolLookup(symbol),
    ]).pipe(
      concatMap(([sentiment, lookup]) => {
        sentiment.name = lookup.description;
        return of(sentiment);
      })
    );
  }
}
