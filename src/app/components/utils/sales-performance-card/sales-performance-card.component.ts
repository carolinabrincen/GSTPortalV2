import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Sale } from 'src/app/types/analytics';

@Component({
  selector: 'sales-performance-card',
  templateUrl: './sales-performance-card.component.html',
  styleUrls: ['./sales-performance-card.component.scss'],

})
export class SalesPerformanceCardComponent {
  @Input() groupByPeriods: string[];

  @Input() salesByDateAndCategory: Sale[];

  @Input() visualRange: unknown = {};

  @Output() performancePeriodChanged = new EventEmitter();

  customiseToolip({ seriesName }) {
    return { text: seriesName };
  }

  onDropDownSelectionChange(event) {
    this.performancePeriodChanged.emit(event);
  }
}
