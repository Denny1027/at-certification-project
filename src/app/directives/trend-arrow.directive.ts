import {
  Directive,
  HostBinding,
  Input,
  OnChanges,
  ElementRef,
} from '@angular/core';

@Directive({
  selector: '[appTrendArrow]',
})
export class TrendArrowDirective implements OnChanges {
  @HostBinding('style.color') color = 'grey';
  @HostBinding('style.font-size') fontSize = '30px';

  @Input('appTrendArrow') value?: number = 0;

  constructor(private elementRef: ElementRef) {}

  ngOnChanges(): void {
    if (this.value) {
      if (this.value > 0) {
        this.elementRef.nativeElement.innerHTML = 'Freccia SU';
        this.color = 'green';
      } else if (this.value === 0) {
        this.elementRef.nativeElement.innerHTML = 'Uguale';
        this.color = 'grey';
      } else if (this.value < 0) {
        this.elementRef.nativeElement.innerHTML = 'Freccia GIU';
        this.color = 'red';
      } else {
        this.elementRef.nativeElement.innerHTML = '';
      }
    }
  }
}
