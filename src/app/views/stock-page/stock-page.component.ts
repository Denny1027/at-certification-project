import { StorageService } from './../../services/storage.service';
import { StockService } from './../../services/stock.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StockItem } from '../../app.model';
import { Subject, takeUntil, Observable, of } from 'rxjs';

@Component({
  selector: 'app-stock-page',
  templateUrl: './stock-page.component.html',
  styleUrls: ['./stock-page.component.scss'],
})
export class StockPageComponent implements OnInit, OnDestroy {
  stockForm: FormGroup;
  stockList: StockItem[] = [];

  destroyed$ = new Subject();

  constructor(
    readonly stockService: StockService,
    readonly storageService: StorageService
  ) {
    const validatorsArr = [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(5),
    ];
    this.stockForm = new FormGroup({
      stockInput: new FormControl(null, validatorsArr),
    });

    /* N G   H O O K S*/
  }
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  ngOnInit(): void {
    this.storageService.stockListSubj
      .pipe(takeUntil(this.destroyed$))
      .subscribe((sl) => {
        console.log('hello there ->', sl);
        this.stockList = sl;
      });
  }

  /* U T I L S */
  searchSymbol() {
    this.stockService
      .getStockInfo(this.stockForm.get('stockInput')?.value)
      .subscribe({
        next: (res) => this.storageService.save(res),
        error: (err) => console.log('error'),
      });
  }

  /* E V E N T S */
  onDeleteItem(item: StockItem) {
    this.storageService.remove(item);
  }
}
