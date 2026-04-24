import {
  NgModule, Component, ViewChild, enableProdMode, ChangeDetectionStrategy, ChangeDetectorRef,AfterViewInit
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UnidadesService } from 'src/app/services/unidades/unidades.services';
import DataGrid from "devextreme/ui/data_grid";
import { IngresosModel } from 'src/app/shared/models/ingresos/ingresos.models';

import {
  DxDropDownBoxModule,
  DxTreeViewModule,
  DxDataGridModule,
  DxTreeViewComponent,
  DxDataGridComponent,
} from 'devextreme-angular';

import CustomStore from 'devextreme/data/custom_store';
import { CurrencyPipe } from '@angular/common';
import {
  DxPivotGridModule,
  DxPivotGridComponent,
  DxChartModule,
  DxChartComponent,
} from 'devextreme-angular';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import { ServiceSales } from './app.serviceSales';
import { IUser } from 'src/app/shared/services';


@Component({
  templateUrl: 'tasks.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UnidadesService,ServiceSales, CurrencyPipe],
})

export class TasksComponent implements AfterViewInit{

  
  

  @ViewChild(DxChartComponent, { static: false }) chart: any;

  @ViewChild('dataGridVar', { static: false }) dataGrid: DxDataGridComponent | undefined;

  pivotGridDataSource: any;

  employee: any;
  treeBoxValue: string[];
  treeDataSource: any;

  dataSource: any;
  indicadores: IngresosModel[] = [];
  indicadoresGrafica: any;
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
 
  //loading
  loadingVisible = false;

  gridColumns: any = ['unidadNegocio','tipoOperacion', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
 
  

  constructor(private unidadesService: UnidadesService, private service: ServiceSales, private currencyPipe: CurrencyPipe) {
    this.IdUnidadNegocio = 0;
    this.UnidadNegocio = "Nacional";
    this.Anio = 2022;
    
    // this.getIngresosAnuales(this.Anio, this.IdUnidadNegocio);
    
    // this.getIngresosAnualesChart(this.Anio, this.IdUnidadNegocio);

    // this.getKmsAnuales(this.Anio, this.IdUnidadNegocio);
    // this.getKmsAnualesChart(this.Anio, this.IdUnidadNegocio);

    // this.getViajesAnuales(this.Anio, this.IdUnidadNegocio);
    // this.getViajesAnualesChart(this.Anio, this.IdUnidadNegocio);

    // this.getToneladasAnuales(this.Anio, this.IdUnidadNegocio);
    // this.getToneladasAnualesChart(this.Anio, this.IdUnidadNegocio);
    
    this.treeDataSource = unidadesService.getUnidades();
    
    this.isTreeBoxOpened = false;
    
    this.treeBoxValue = ['0'];

    this.customizeTooltip = this.customizeTooltip.bind(this);

    


   
    
  }

      getIngresosAnuales(Anio: number, UnidadNegocio: number)
    {
        this.service.getIndicadores(Anio, UnidadNegocio).subscribe((response) => {
      
          this.indicadores = response.data;
      
        });
    }
  
      getIngresosAnualesChart (Anio: number, UnidadNegocio: number)
     {
      this.service.getIndicadoresGrafica(Anio, UnidadNegocio).subscribe((response) => {
         
        this.indicadoresGrafica = response.data;
        
        
        
      });
      }

      getKmsAnuales(Anio: number, UnidadNegocio: number)
      {
        this.service.getKms(Anio, UnidadNegocio).subscribe((response) => {
          this.kms = response.data;
        });
      }
      
      getKmsAnualesChart (Anio: number, UnidadNegocio: number)
      {
        this.service.getKmsGrafica(Anio, UnidadNegocio).subscribe((response) => {
          
        this.kmsGrafica = response.data;
        });
      }
      getViajesAnuales(Anio: number, UnidadNegocio: number)
      {
        this.service.getViajes(Anio, UnidadNegocio).subscribe((response) => {
          this.viajes = response.data;
        });
      }
      
      getViajesAnualesChart (Anio: number, UnidadNegocio: number)
      {
        this.service.getViajesGrafica(Anio, UnidadNegocio).subscribe((response) => {
          
        this.viajesGrafica = response.data;
        });
      }

      getToneladasAnuales(Anio: number, UnidadNegocio: number)
      {
        this.service.getToneladas(Anio, UnidadNegocio).subscribe((response) => {
          this.toneladas = response.data;
        });
      }
      
      getToneladasAnualesChart (Anio: number, UnidadNegocio: number)
      {
        this.service.getToneladasGrafica(Anio, UnidadNegocio).subscribe((response) => {
          
        this.toneladasGrafica = response.data;
        
        });
      }


      clickClientesRutas = (e: any) => {
        
        // this.treeBoxValue = e.component.getSelectedNodeKeys();
        // this.UnidadNegocio = e.node.text;
        
        // this.IdUnidadNegocio = Number.parseInt(this.treeBoxValue[0]);
    
        
        this.getIngresosAnuales(this.Anio, this.IdUnidadNegocio);
        this.getIngresosAnualesChart(this.Anio, this.IdUnidadNegocio);
        this.getKmsAnuales(this.Anio, this.IdUnidadNegocio);
        this.getKmsAnualesChart(this.Anio, this.IdUnidadNegocio);
        this.getViajesAnuales(this.Anio, this.IdUnidadNegocio);
        this.getViajesAnualesChart(this.Anio, this.IdUnidadNegocio);
        this.getToneladasAnuales(this.Anio, this.IdUnidadNegocio);
        this.getToneladasAnualesChart(this.Anio, this.IdUnidadNegocio);
        this.dataGrid?.instance.refresh();
       };



  saveGridInstance (e:any) {
    this.dataGridInstance = e.component;
}

  ngAfterViewInit() {
    
    // this.pivotGrid.instance.bindChart(this.chart.instance, {
    //   dataFieldsDisplayMode: 'splitPanes',
    //   alternateDataFields: false,
    // });
  }

  customizeTooltip(args: any) {
    const valueText = (args.seriesName.indexOf('Total') != -1)
      ? new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD' }).format(args.originalValue)
      : args.originalValue;

    return {
      html: `${args.seriesName}<div class='currency'>${valueText}</div>`,
    };
  }

  makeAsyncDataSource(http: any, jsonFile: any) {
    // return new CustomStore({
    //   loadMode: 'raw',
    //   key: 'ID',
    //   load() {
    //     return http.get(`data/${jsonFile}`)
    //       .toPromise();
    //   },
    // });
  }

  print() {
    this.chart.instance.print();
  }
  export() {
    this.chart.instance.exportTo('Example', 'png');
  }
  // syncTreeViewSelection() {
  //   if (!this.treeView) return;

  //   if (!this.treeBoxValue) {
  //     this.treeView.instance.unselectAll();
  //   } else {
  //     this.treeView.instance.selectItem(this.treeBoxValue);
  //   }
  // }

  treeView_itemSelectionChanged(e:any) {
    this.treeBoxValue = e.component.getSelectedNodeKeys();
    this.UnidadNegocio = e.node.text;
    
    
    this.IdUnidadNegocio = Number.parseInt(this.treeBoxValue[0]);
    
    
    // this.getIngresosAnuales(this.Anio, this.IdUnidadNegocio);
    // this.getIngresosAnualesChart(this.Anio, this.IdUnidadNegocio);
    // this.getKmsAnuales(this.Anio, this.IdUnidadNegocio);
    // this.getKmsAnualesChart(this.Anio, this.IdUnidadNegocio);
    // this.getViajesAnuales(this.Anio, this.IdUnidadNegocio);
    // this.getViajesAnualesChart(this.Anio, this.IdUnidadNegocio);
    // this.getToneladasAnuales(this.Anio, this.IdUnidadNegocio);
    // this.getToneladasAnualesChart(this.Anio, this.IdUnidadNegocio);
   
  }

 

  onTreeBoxOptionChanged(e:any) {
    if (e.name === 'value') {
      this.isTreeBoxOpened = false;
      // this.ref.detectChanges();
    }
  }

  
}
