import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DxLoadPanelModule } from 'devextreme-angular/ui/load-panel';
import { PositionConfig } from 'devextreme/animation/position';
import { CardMenuComponent } from '../card-menu/card-menu.component';
@Component({
  selector: 'card-analytics',
  templateUrl: './card-analytics2.component.html',
  styleUrls: ['./card-analytics2.component.scss'],
})

export class CardAnalytics2Component {
  @Input() titleText: string;

  @Input() contentClass: string;

  @Input() isMenuVisible = true;

  @Input() isLoading = false;

  menuItems: Array<{ text: string }> = [
    { text: 'Configure' },
    { text: 'Remove' },
  ];

  position: PositionConfig;
}
