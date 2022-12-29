import { BehaviorSubject, Subject } from 'rxjs';
import { StockItem } from '../app.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _stockList: StockItem[] = [];
  stockListSubj = new BehaviorSubject<StockItem[]>([]);

  constructor() {
    const savedData = localStorage.getItem('savedStockList');
    if (savedData) {
      this._stockList = JSON.parse(savedData) as StockItem[];
      this.stockListSubj.next(this._stockList);
    }
  }

  save(item: StockItem) {
    this._stockList?.push(item);
    localStorage.removeItem('savedStockList');
    localStorage.setItem('savedStockList', JSON.stringify(this._stockList));
    this.stockListSubj.next(this._stockList);
  }

  remove(item: StockItem) {
    this._stockList = this._stockList.filter((el) => el.symbol !== item.symbol);
    localStorage.removeItem('savedStockList');
    localStorage.setItem('savedStockList', JSON.stringify(this._stockList));
    this.stockListSubj.next(this._stockList);
  }

  get(symbol: string) {
    return this._stockList.find((item) => item.symbol === symbol);
  }
}
