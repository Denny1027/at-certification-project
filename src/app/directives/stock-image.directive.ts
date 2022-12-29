import {
  Directive,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: 'img[appStockImage]',
})
export class StockImageDirective implements OnChanges {
  //default
  @HostBinding('attr.src') src = 'assets/images/equal_80.png';
  @HostBinding('attr.alt') alt = 'Icon by Icons8';

  @Input('appStockImage') value?: number = 0;

  constructor() {}

  ngOnChanges(): void {
    if (this.value) {
      if (this.value > 0) {
        this.src = 'assets/images/arrow_up_80.png';
      } else if (this.value === 0) {
        this.src = 'assets/images/equal_80.png';
      } else if (this.value < 0) {
        this.src = 'assets/images/arrow_down_80.png';
      } else {
        this.src = 'assets/images/warning_80.png';
      }
    }
  }
}
