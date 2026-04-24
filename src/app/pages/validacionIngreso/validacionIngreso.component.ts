import { CostosAnualesService } from '../../services/costos-anuales/rent-cont.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { DxSelectBoxComponent, DxFormComponent } from 'devextreme-angular';

import { ValidacionIngreso } from '../../shared/models/validacionIngreso/validacionIngreso';
import { ClientesValidos } from '../../shared/models/validacionIngreso/clientesValidos';
import { Customer, Service } from './validacion.service'
import notify from 'devextreme/ui/notify';
import Validator from 'devextreme/ui/validator';

@Component({
  templateUrl: './validacionIngreso.component.html',
  styleUrls: ['./validacionIngreso.component.scss'],
  providers: [Service],
})
export class ValidacionIngresoComponent implements OnInit {

  @ViewChild('selectTracto') selectTracto!: DxSelectBoxComponent;
  @ViewChild(DxFormComponent, { static: false }) form:DxFormComponent;

  col: string = '50';

  readonly allowedPageSizes = [5, 10, 20, 50, 100, 'all'];

  loadingVisible = false;


  selectedBoxCartera: number = 0;

  modeSearch: 'true' | 'false' = 'false';

  isVisible = false;

  validacionI: ValidacionIngreso[] = [
    {udn: 'Orizaba', numGuia: 'ORI-00001', cliente: 'MATERIAS PRIMAS MONTERREY', flete: 20350.00}
  ]

  clientesV: ClientesValidos[]=[
    {id: 51, cliente: 'PUNTO A PUNTO T2', fechaIngreso: '05/06/2023 11:14', solicito: 'Alejandra Vázquez'},
    {id: 109, cliente: 'ATRATEGIC MATERIALS MEXICANA', fechaIngreso: '05/06/2023 11:14', solicito: 'Alejandra Vázquez'},
  ]

  modValidacion: boolean;
  customer: Customer;

  changePasswordMode = (name) => {
    let editor = this.form.instance.getEditor(name);
    editor.option(
      'mode',
      editor.option('mode') === 'text' ? 'password' : 'text',
    );
  };

  constructor(
    private costosAnualesService: CostosAnualesService,
    service: Service
    ) {
      this.customer = service.getCustomer();

  //===========chart===================

  }


  ngOnInit(): void {

  }

  ngAfterViewInit(): void {}

  //=================GETS===========================
  // getCACostos(){
  //   const request = new Promise((resolve, reject) => {
  //     this.costosAnuService.postCACostos(this.anioSeleccionado, this.udnSeleccionado).subscribe(data => {
  //       this.CACostos = data.data;
  //     })
  //   });
  //   return request;
  // }

  //=================SELECTS========================

  selectBoxCartera(e: any) {
    this.selectedBoxCartera = e.value;
  }

  callCostosAnuales() {
    const request = new Promise((resolve, reject) => {
      // this.getCATPS();
      // this.getCACostos();
      // this.getCAAuxiliar();
    });
    return request;
  }
  buscarClick = (e: any) => {
    // if (this.selectedClasficacion !==  undefined) {
    //   this.loadingVisible = true;
    //   this.modeSearch = 'true'

    //   this.totalesProvisiones = new Provisiones
    //   this.totalesOtrosGO = new OtrosGastosOperacion
    //   this.totalesOtrosGIE = new OtrosGastosIngresosEstraordinarios
    //   this.totalesOtros = new Otros
    //   this.totalesOperacion = new TotalesOperacion
    //   this.totalesOGIO = new OtrosGastosIngresosOrdonarios
    //   this.totalesGIF = new GastosIngresosFinancieros
    //   this.totales  = new Totales0

    //     // console.log('entre : '+this.totales.totalER)

    //   this.callCostosAnuales().then(() => {
    //     this.loadingVisible = false;
    //   });
    // }

  };

  borrarClick = (e: any) =>{
    this.selectTracto.value = '';
  }

  verDetallesClick(data) {
    var mydata = data.data;
    this.modValidacion = true;
    // this.getDetalleTPS(mydata.renglon)
  }

  passwordOptions: any = {
    mode: 'password',
    onValueChanged: () => {
      let editor = this.form.instance.getEditor('ConfirmPassword');
      if (editor.option('value')) {
        let instance = Validator.getInstance(editor.element()) as Validator;
        instance.validate();
      }
    },
    buttons: [
      {
        name: 'password',
        location: 'after',
        options: {
          icon: './assets/ojo.png',
          type: 'default',
          onClick: () => this.changePasswordMode('Password'),
        },
      },
    ],
  };

  confirmOptions: any = {
    mode: 'password',
    buttons: [
      {
        name: 'password',
        location: 'after',
        options: {
          icon: './assets/ojo.png',
          type: 'default',
          onClick: () => this.changePasswordMode('ConfirmPassword'),
        },
      },
    ],
  };

  passwordComparison = () => this.form.instance.option('formData').Contrasenia;

  buttonOptions: any = {
    text: 'Validar',
    type: 'success',
    useSubmitBehavior: true,
  };


  onFormSubmit = function (e) {
    notify({
      message: 'Validación exitosa',
      position: {
        my: 'center top',
        at: 'center top',
      },
    }, 'success', 3000);
    this.modValidacion = false;
    e.preventDefault();
  };





  onShown() {
    // setTimeout(() => {
    //   this.loadingVisible = false;
    // }, 3000);
  }

  onHidden() {
  }

  onRowPreparedCAER(e: any){
    if (e.rowType == 'data') {
      e.cells.forEach((c: any) => {

        if (c.cellElement) {
          if (c.value && c.value.toString().startsWith('-')) {
            c.cellElement.style.color = "red";
            c.cellElement.style.fontWeight = "bolder";
          }
        }



      });
    }

    if (e.rowType == 'group') {
      if (e.groupIndex == 0) {
        e.rowElement.style.backgroundColor = '#dcdcdc';
        e.rowElement.style.color = "black";
        e.rowElement.style.fontWeight = "bolder";
      }
     
    }
  }

  onCellPreparedCAER(e: any){
    if (e.rowType == 'data') {

      // if(e.colum.caption == 'Total'){
       
      //}

    }
  }

//====================personalize style excel========================================
  customizeCAER(e) {  
    var gridCell = e.gridCell;
    if (gridCell.rowType === 'data') {

      if(e.gridCell.column.caption == "Total"){
        e.backgroundColor = "#DCDCDC";
      }

    }

    if (gridCell.rowType === 'header') {
      e.backgroundColor = "#DCDCDC";
    }
  }

  onRowPreparedD(e){

  }

  onCellPreparedD(e){

  }

//==================Formato a la data de la grafica==================================
  formatSliderTooltip (value) {
    
    return Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(value);
  }

//==================Formato solo comas===============================================  
  separator(value) {
      var str = value.toString().split(".");
      str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return str.join(".");
  }

  customizeColumns(columns) {
    columns[0].width = 70;
  }


}


