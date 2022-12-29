import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { StockItem } from '../../app.model';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.scss'],
})
export class StockItemComponent implements OnInit {
  @Input() stockItem?: StockItem;
  @Output() delete = new EventEmitter();

  constructor(readonly router: Router) {}

  ngOnInit(): void {}

  onDelete() {
    this.delete.emit();
  }

  onSentiment() {
    this.router.navigate(['sentiment', this.stockItem?.symbol]);
  }
}
