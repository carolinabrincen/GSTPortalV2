import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Sale } from 'src/app/types/analytics';

@Component({
  selector: 'mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent {
  @Input() data: Sale[];

  @Input() visualRange: unknown = {};

  @Output() visualRangeChange = new EventEmitter<unknown>();

  @Output() salesRangeChanged = new EventEmitter();

  onRangeChanged(event) {
    this.salesRangeChanged.emit(event);
    this.visualRangeChange.emit(this.visualRange);
  }
}

