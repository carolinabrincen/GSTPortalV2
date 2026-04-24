import {Component, Input, Output, EventEmitter,} from '@angular/core';
import { SalesOrOpportunitiesByCategory } from 'src/app/types/analytics';

@Component({
  selector: 'sales-by-range-card',
  templateUrl: './sales-by-range-card.component.html',
  styleUrls: ['./sales-by-range-card.component.scss'],
})
export class SalesByRangeCardComponent {
  @Input() data: SalesOrOpportunitiesByCategory;

  @Input() groupByPeriods: string[];
  @Input() groupByUdnMen: string[];
  @Input() groupByUdnAnu: string[];

  @Output() performancePeriodChanged = new EventEmitter();
  @Output() performanceUdnMenChanged = new EventEmitter();
  @Output() performanceUdnAnuChanged = new EventEmitter();

  @Input() itemPer: string = "Mensual";
  @Input() itemUdnM: string = "Todos";
  @Input() itemUdnA: string = "Todos";

  customizeSaleText(arg: { percentText: string }) {
    return arg.percentText;
  }

  selectBA(event) {
    this.performancePeriodChanged.emit(event);
    
    
    this.itemPer = event.item;

    this.itemUdnM = "Todos"
    this.itemUdnA = "Todos"
  }

  selectUdnMensual(event) {
    this.performanceUdnMenChanged.emit(event);
    this.itemUdnM = event.item;
       //console.log(event)  
  }
  selectUdnAnual(event) {
    this.performanceUdnAnuChanged.emit(event);
    this.itemUdnA = event.item;
        //console.log(event)  
  }
}

