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
  @HostBinding('style.font-size') fontSize = '100px';

  @Input('appTrendArrow') value?: number = 0;

  constructor(private elementRef: ElementRef) {}

  ngOnChanges(): void {
    if (this.value) {
      if (this.value > 0) {
        this.elementRef.nativeElement.innerHTML = '🡅';
        this.color = 'green';
      } else if (this.value === 0) {
        this.elementRef.nativeElement.innerHTML = '=';
        this.color = 'grey';
      } else if (this.value < 0) {
        this.elementRef.nativeElement.innerHTML = '🡇';
        this.color = 'red';
      } else {
        this.elementRef.nativeElement.innerHTML = '';
      }
    }
  }
}
