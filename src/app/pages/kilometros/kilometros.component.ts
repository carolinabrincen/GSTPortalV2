import { OpcionesModel } from 'src/app/shared/models/kilometros/kilometrosModel';
import {
  NgModule, Component, ViewChild, enableProdMode, ChangeDetectionStrategy, ChangeDetectorRef,AfterViewInit, OnInit
} from '@angular/core';

import DataGrid from "devextreme/ui/data_grid";
import {
  DxDataGridComponent,
} from 'devextreme-angular';

import {
  DxChartComponent,
} from 'devextreme-angular';

import notify from 'devextreme/ui/notify';
import { KilometrosService } from 'src/app/services/kilometros/kilometrosService';
import { KilometrosModel, ResumenModel } from '../../shared/models/kilometros/kilometrosModel';



@Component({
  selector: 'app-kilometros',
  templateUrl: './kilometros.component.html',
  providers: [KilometrosService]
})
export class KilometrosComponent implements OnInit {

  arrOpciones: OpcionesModel[] = [
    { id: 1, periodo: 'MES ACTUAL' },
    { id: 2, periodo: 'MES ANTERIOR' },
    { id: 3, periodo: 'ANUAL' }
  ];

  showFilterRow: boolean;
  currentFilter: any;
  showHeaderFilter: boolean;

  loadingVisible = false;

  @ViewChild(DxChartComponent, { static: false }) chart: any;

  @ViewChild('dataGridVar', { static: false }) dataGrid: DxDataGridComponent | undefined;

  pivotGridDataSource: any;

  employee: any;
  treeBoxValue: string[];
  treeDataSource: any;

  dataSource: any;
  arrResumen: ResumenModel[] = [];
  arrKilometros: KilometrosModel[] = [];
  arrKilometrosMAnt: KilometrosModel[] = [];
  arrKilometrosMAntNL: KilometrosModel[] = [];
  
  kms: any;
  kmsGrafica: any;
  viajes: any;
  viajesGrafica: any;
  toneladas: any;
  toneladasGrafica: any;

  isTreeBoxOpened: boolean;
  
  gridDataSource: any;

  gridBoxValue: number[] = [3];

  dataGridInstance!: DataGrid;

  IdUnidadNegocio: number;
  UnidadNegocio: string;
  Anio: number;
 
  

  gridColumns: any = ['unidadNegocio','tipoOperacion', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
 


  constructor(private service: KilometrosService) { 
    
    this.getKilometosActual();
    this.getKilometosActualMAnt();
  }

  onContentReady(e) {
    e.component.option('loadPanel.enabled', false);
  }
  
  ngOnInit(): void {
  }
 onShown()
 {

 }
  
 onHidden()
 {

 }

 onRowPrepared(e: any) {
  if (e.rowType == 'group') {
      e.rowElement.style.backgroundColor = '#dcdcdc';
      e.rowElement.style.color = "black";
      e.rowElement.style.fontWeight = "bolder";
    
  }

  if (e.rowType == 'data') {
    e.cells.forEach((c: any) => {

      if (c.cellElement) {
     

        //negrita columna margen utilidad
        if (c.columnIndex == 3  || c.columnIndex == 6) {
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "14px";
          c.cellElement.style.background = "#f5f5f5";
        }
       
      }



    });
  }

  
  if (e.rowType == 'totalFooter') {
    
    e.cells.forEach((c: any) => {

      if (c.cellElement) {
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "14px";
          c.cellElement.style.background = "#ff9460";
          c.cellElement.style.color = "black";
        
      }



    });

   


  };

 }

  getKilometosActual()
  {
    this.loadingVisible = true;
      this.service.getKmsActuales().subscribe((response) => {
    
        this.arrKilometros = response.data.kmsMensuales;
        this.arrResumen = response.data.resumen;
        console.log(this.arrKilometros);
        this.loadingVisible = false;
      });
  }

  getKilometosActualMAnt()
  {
      this.service.getKmsActualesMAnt().subscribe((response) => {
    
        this.arrKilometrosMAnt = response.data.kmsMensualesLiq;
        this.arrKilometrosMAntNL = response.data.kmsMensualesNoLiq;
        console.log(this.arrKilometrosMAnt);
    
      });
  }


  clickBuscar = (e: any) => {
      
    this.getKilometosActual();
    this.getKilometosActualMAnt();
    
    this.dataGrid?.instance.refresh();
   };

}
