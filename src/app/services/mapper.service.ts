import {
  SymbolResponse,
  SymbolItemResponse,
  QuoteResponse,
  StockItem,
} from '../app.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MapperService {
  constructor() {}

  getExactSymbol(obj: SymbolResponse, symbol: string): SymbolItemResponse {
    let founded;
    if (obj.result.length) {
      founded = obj.result.find((sym) => sym.symbol === symbol);
    }
    return founded ?? {};
  }

  toStockItem(
    quoteItem: QuoteResponse,
    symbolItem: SymbolItemResponse
  ): StockItem {
    return {
      name: symbolItem?.description,
      symbol: symbolItem?.symbol,
      changeToday: quoteItem.dp,
      openingPrice: quoteItem.o,
      highPrice: quoteItem.h,
      currentPrice: quoteItem.c,
    };
  }
}
