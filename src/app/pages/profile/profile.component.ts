import {  NgModule, Component, ViewChild, enableProdMode,
} from '@angular/core';

import { Employee, Service } from './app.services';

import {DxDropDownBoxModule,  DxTreeViewModule,  DxTreeViewComponent } from 'devextreme-angular';
import { UnidadesService } from 'src/app/services/unidades/unidades.services';



  export class RESUMEN {
    ID: number | undefined;
  
    GRUPO: string | undefined;
  
    CONCEPTO: string | undefined;
  
    REAL: number | undefined;
  
    PRESUPUESTO: number | undefined;
  
    DESVIACION: number | undefined;
  
    PORCENTAJE: number | undefined;
  
  }

@Component({
  templateUrl: 'profile.component.html',
  styleUrls: [ './profile.component.scss' ],
  providers: [Service, UnidadesService],
})

export class ProfileComponent {

  @ViewChild(DxTreeViewComponent, { static: false }) treeView: any;
  @ViewChild(DxTreeViewComponent, { static: false }) treeView_TO: any;

  employee: any;
  colCountByScreen: object;
  
  employees: Employee[];

  positions: string[];

  anio: string[];

  states: string[];

  treeDataSource: any;
  treeTipoOperacionDataSource: any;


  treeBoxValue: string[];
  treeTipoOperacionBoxValue: string[];

  gridBoxValue: number[] = [3];


  now: Date = new Date();

  currentValue: String = new Date().toDateString();

  firstDay = 0;

  minDateValue: Date;

  maxDateValue: Date;

  disabledDates: Function | null = null;

  month: string  = 'year';

  cellTemplate = 'cell';

  holydays: any = [[1, 0], [4, 6], [25, 11]];

  customers: RESUMEN[];

  popupVisible = false;

  emailButtonOptions: any;

  closeButtonOptions: any;

  positionOf: string = '';


  constructor(private service: Service, private unidadesService: UnidadesService) {

    
    this.employee = {
      ID: 7,
      FirstName: 'Sandra',
      LastName: 'Johnson',
      Prefix: 'Mrs.',
      Position: 'Controller',
      Picture: 'images/employees/06.png',
      BirthDate: new Date('1974/11/15'),
      HireDate: new Date('2005/05/11'),
      /* tslint:disable-next-line:max-line-length */
      Notes: 'Sandra is a CPA and has been our controller since 2008. She loves to interact with staff so if you`ve not met her, be certain to say hi.\r\n\r\nSandra has 2 daughters both of whom are accomplished gymnasts.',
      Address: '4600 N Virginia Rd.'
    };
    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4
    };
    const meses: string[] = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    
    const anios: string[] = [
      '2022'
    ];
    const states: string[] = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
    this.positions = meses;
    this.anio = anios;
    this.states = states;


    const сustomersBD: RESUMEN[] = [{
      ID: 1,
      GRUPO: '1.- PERIODO',
      CONCEPTO: 'DIAS DEL MES',
      REAL: 31,
      PRESUPUESTO: 31,
      DESVIACION: 0,
      PORCENTAJE: 0
      
    },
    {
      ID: 2,
      GRUPO: '1.- PERIODO',
      CONCEPTO: 'DIAS TRANSCURRIDOS',
      REAL: 6,
      PRESUPUESTO: 6,
      DESVIACION: 0,
      PORCENTAJE: 0
      
    },
    {
    ID: 3,
    GRUPO: '2.- DESPACHADO',
    CONCEPTO: 'TONELADAS',
    REAL: 31,
    PRESUPUESTO: 31,
    DESVIACION: 0,
    PORCENTAJE: 0
    
  },
  
  {
    ID: 5,
    GRUPO: '2.- DESPACHADO',
    CONCEPTO: 'VIAJES',
    REAL: 6,
    PRESUPUESTO: 6,
    DESVIACION: 0,
    PORCENTAJE: 0
    
  },
  {
    ID: 6,
    GRUPO: '2.- DESPACHADO',
    CONCEPTO: 'INGRESOS',
    REAL: 6,
    PRESUPUESTO: 6,
    DESVIACION: 0,
    PORCENTAJE: 0
    
  }
  ,
  {
    ID: 7,
    GRUPO: '3.- TENDENCIAS',
    CONCEPTO: 'VOLUMEN',
    REAL: 6,
    PRESUPUESTO: 6,
    DESVIACION: 0,
    PORCENTAJE: 0
    
  },
  {
    ID: 8,
    GRUPO: '3.- TENDENCIAS',
    CONCEPTO: 'KILOMETROS',
    REAL: 6,
    PRESUPUESTO: 6,
    DESVIACION: 0,
    PORCENTAJE: 0
    
  },
  {
    ID: 9,
    GRUPO: '3.- TENDENCIAS',
    CONCEPTO: 'VIAJES',
    REAL: 6,
    PRESUPUESTO: 6,
    DESVIACION: 0,
    PORCENTAJE: 0
    
  },
  {
    ID: 10,
    GRUPO: '3.- TENDENCIAS',
    CONCEPTO: 'INGRESOS',
    REAL: 6,
    PRESUPUESTO: 6,
    DESVIACION: 0,
    PORCENTAJE: 0
    
  },
  
  {
    ID: 11,
    GRUPO: '4.- ACEPTADO',
    CONCEPTO: 'VOLUMEN',
    REAL: 6,
    PRESUPUESTO: 6,
    DESVIACION: 0,
    PORCENTAJE: 0
    
  },
  {
    ID: 12,
    GRUPO: '4.- ACEPTADO',
    CONCEPTO: 'KILOMETROS',
    REAL: 6,
    PRESUPUESTO: 6,
    DESVIACION: 0,
    PORCENTAJE: 0
    
  },
  {
    ID: 13,
    GRUPO: '4.- ACEPTADO',
    CONCEPTO: 'VIAJES',
    REAL: 6,
    PRESUPUESTO: 6,
    DESVIACION: 0,
    PORCENTAJE: 0
    
  },
  
  {
    ID: 14,
    GRUPO: '4.- ACEPTADO',
    CONCEPTO: 'INGRESOS',
    REAL: 6,
    PRESUPUESTO: 6,
    DESVIACION: 0,
    PORCENTAJE: 0
    
  }
  ,
  
  {
    ID: 15,
    GRUPO: '5.- PROMEDIOS',
    CONCEPTO: 'KMS X VIAJE',
    REAL: 6,
    PRESUPUESTO: 6,
    DESVIACION: 0,
    PORCENTAJE: 0
    
  }
  ,
  
  {
    ID: 16,
    GRUPO: '5.- PROMEDIOS',
    CONCEPTO: 'TONELADAS POR VIAJE',
    REAL: 6,
    PRESUPUESTO: 6,
    DESVIACION: 0,
    PORCENTAJE: 0
    
  }
  ,
  
  {
    ID: 17,
    GRUPO: '5.- PROMEDIOS',
    CONCEPTO: 'CARGA DIARIA',
    REAL: 6,
    PRESUPUESTO: 6,
    DESVIACION: 0,
    PORCENTAJE: 0
    
  }

];

    this.customers = сustomersBD;

   
    this.treeDataSource = this.unidadesService.getUnidades();

    this.treeBoxValue = ['1'];


    this.treeTipoOperacionDataSource = [
      {
        "ID": "1",
        "name": "Todas",
        "expanded": true
      },
      {
        "ID": "1_1",
        "categoryId": "1",
        "name": "SIN ASIGNAR",
        "expanded": true
      },
      {
        "ID": "1_2",
        "categoryId": "1",
        "name": "FLETES GRANEL"
      },
      {
        "ID": "1_3",
        "categoryId": "1",
        "name": "FLETES SACOS",
        "price": 220
      },
      {
        "ID": "1_4",
        "categoryId": "1",
        "name": "FLETES AGREGADOS",
        "price": 270
      },
      {
        "ID": "1_5",
        "categoryId": "1",
        "name": "FLETES CAJA SECA",
        
      },
      {
        "ID": "1_6",
        "categoryId": "1",
        "name": "FLETES GONDOLA",
        "price": 1200
      },
      {
        "ID": "1_7",
        "categoryId": "1",
        "name": "FLETES TOLVA ACERO",
        "price": 1450
      },
      {
        "ID": "1_8",
        "categoryId": "1",
        "name": "FLETES PLANAS",
        "price": 1600
      },
      {
        "ID": "1_9",
        "categoryId": "1",
        "name": "FLETES CLINKER",
        "price": 1750
      },
      {
        "ID": "1_10",
        "categoryId": "1",
        "name": "FLETES OTRO",
        "price": 1750
      },
      {
        "ID": "1_11",
        "categoryId": "1",
        "name": "FLETES GRADO ALIMENT",
        "price": 1750
      },
      {
        "ID": "1_12",
        "categoryId": "1",
        "name": "FLETES ENCORTINADO",
        "price": 1750
      }
      
    ];

    this.treeTipoOperacionBoxValue = ['1_1'];

    this.minDateValue = new Date(this.now.getTime() - 1000 * 60 * 60 * 24 * 3);
    this.maxDateValue = new Date(this.now.getTime() + 1000 * 60 * 60 * 24 * 3);

    this.currentValue = new Date().toDateString();


    this.employees = service.getEmployees();
    

  }


  onDropDownBoxValueChanged(e: any) {
    this.updateSelection(this.treeView && this.treeView.instance);
  }

  onTreeViewReady(e: any) {
    this.updateSelection(e.component);
  }

  updateSelection(treeView: any) {
    if (!treeView) return;

    if (!this.treeBoxValue) {
      treeView.unselectAll();
    }

    if (this.treeBoxValue) {
      this.treeBoxValue.forEach(((value) => {
        treeView.selectItem(value);
      }));
    }
  }

  onTreeViewSelectionChanged(e: any) {
    this.treeBoxValue = e.component.getSelectedNodeKeys();
  }

  on_TO_TreeViewSelectionChanged(e: any) {
    this.treeTipoOperacionBoxValue = e.component.getSelectedNodeKeys();
  }


  on_TO_DropDownBoxValueChanged(e: any) {
    this.updateSelection(this.treeView_TO && this.treeView_TO.instance);
  }

  on_TO_TreeViewReady(e: any) {
    this.updateSelection(e.component);
  }

  update_TO_Selection(treeView_TO: any) {
    if (!treeView_TO) return;

    if (!this.treeTipoOperacionBoxValue) {
      treeView_TO.unselectAll();
    }

    if (this.treeTipoOperacionBoxValue) {
      this.treeTipoOperacionBoxValue.forEach(((value) => {
        treeView_TO.selectItem(value);
      }));
    }
  }

  detailsButtonMouseEnter(id: any) {
    this.positionOf = `#image${id}`;
  }

  showInfo(employee: any) {
    
    this.popupVisible = true;
  }
 
}
