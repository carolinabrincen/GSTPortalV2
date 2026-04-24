import {Component, Input, Output, EventEmitter,} from '@angular/core';
import { SalesOrOpportunitiesByCategory } from 'src/app/types/analytics';

@Component({
  selector: 'sales-range-grafica',
  templateUrl: './sales-range-grafica.component.html',
  styleUrls: ['./sales-range-grafica.component.scss'],
})
export class SalesRangeGraficaComponent {
  @Input() data: SalesOrOpportunitiesByCategory;

  @Input() groupByPeriods: string[];

  @Output() performancePeriodChanged = new EventEmitter();

  customizeSaleText(arg: { percentText: string }) {
    return arg.percentText;
  }


  selectBA(event) {
    this.performancePeriodChanged.emit(event);
  }

  formatSliderTooltip (value) {
    
    return Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(value);
  }
}

