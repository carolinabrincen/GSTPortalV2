import { Component, Input, Output, EventEmitter, inject } from '@angular/core';

import { DxButtonComponent } from "devextreme-angular";


import { ScreenService } from 'src/app/services/screen.service';
import { Dates, PanelItem } from 'src/app/types/resource';

@Component({
  selector: 'toolbar-analytics',
  templateUrl: './toolbar-analytics.component.html',
  styleUrls: ['./toolbar-analytics.component.scss'],
  
  // imports: [DxButtonComponent],
})

export class ToolbarAnalyticsComponent {
  @Input() selectedItems: Array<number>;

  @Input() titleText: string;

  @Input() panelItems: Array<PanelItem>;

  @Output() selectionChanged = new EventEmitter<Dates>();


  selectionChange(e: any) {
    // const dates = e.addedItems[0].value.split('/');

    // this.selectionChanged.emit({ startDate: dates[0], endDate: dates[1] });
  }
}
