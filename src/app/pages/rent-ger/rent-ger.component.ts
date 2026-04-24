import { RentContService } from './../../services/rentabilidad-contable/rent-cont.service';
import { RentGerModel, TiposOperacionModel, ClientesModel, RutasModel, LiquidacionesModel } from './../../shared/models/rentabilidad-gerencial/renta-geren.model';
import { RentGerService } from './../../services/rentabilidad-gerencial/rent-ger.service';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { AniosModel, MesesModel, UnidadesNegocioModel } from 'src/app/shared/models/rentabilidad-contable/renta-contable.model';

@Component({
  selector: 'app-rent-ger',
  templateUrl: './rent-ger.component.html',
  styleUrls: ['./rent-ger.component.scss']
})
export class RentGerComponent implements OnInit {

  //Arrays de datos para pantalla
  arrUnidadesNegocio: UnidadesNegocioModel[] = [];
  arrTipoOperacion: TiposOperacionModel[] = [];
  arrRutas: RutasModel[] = [];
  arrClientes: ClientesModel[] = [];
  arrMeses: MesesModel[] = [
    { idMes: 1, nombre: 'ENERO' },
    { idMes: 2, nombre: 'FEBRERO' },
    { idMes: 3, nombre: 'MARZO' },
    { idMes: 4, nombre: 'ABRIL' },
    { idMes: 5, nombre: 'MAYO' },
    { idMes: 6, nombre: 'JUNIO' },
    { idMes: 7, nombre: 'JULIO' },
    { idMes: 8, nombre: 'AGOSTO' },
    { idMes: 9, nombre: 'SEPTIEMBRE' },
    { idMes: 10, nombre: 'OCTUBRE' },
    { idMes: 11, nombre: 'NOVIEMBRE' },
    { idMes: 12, nombre: 'DICIEMBRE' }
  ];
  arrAnos: AniosModel[] = [
    { idAnio: 2022, anio: "2022" },
    { idAnio: 2021, anio: "2021" },
  ];
  arrRentGer: RentGerModel[] = [];
  arrLiquidacionesDetalle: LiquidacionesModel[] = [];
  promedioPonderado: number = 0;

  //Servicios para obtener datos
  rentContServ!: RentContService;
  rentGerServ!: RentGerService;

  //Datos seleccionados para consulta
  mesSeleccionado: number = 0;
  anioSeleccionado: number = 0;
  udnSeleccionado: number[] = [];
  tipoOperSeleccionado: number[] = [];
  rutaSeleccionado: number[] = [];
  clienteSeleccionado: number[] = [];


  //Config Ventana modal
  bolModal: boolean = false;
  closeButtonOptions: any;
  printButtonOptions: any;
  positionOf: string = '#myDiv';

  //Config Toast (mensajes)
  isVisible = false;
  type = 'info';
  message = '';

  //loading
  loadingVisible = false;




  constructor(
    private renGerService: RentGerService,
    private renContService: RentContService,
  ) {
    const that = this;

    //Mapeo de servicios
    this.rentContServ = renContService;
    this.rentGerServ = renGerService;

    this.verDetallesClick = this.verDetallesClick.bind(this);
    this.clickClientesRutas = this.clickClientesRutas.bind(this);

    //Carga de datos
    this.getUnidadesNegocio();
    this.getTiposOperacion();

    //Configuracion de botones
    this.printButtonOptions = {
      icon: 'print',
      text: 'Imprimir',
      onClick(e: any) {
        const message = `Generado PDF...`;
        notify({
          message,
          position: {
            my: 'center top',
            at: 'center top',
          },
        }, 'success', 2000);
      },
    };

    this.closeButtonOptions = {
      text: 'Cerrar',
      onClick(e: any) {
        that.bolModal = false;
      },
    };
  }

  ngOnInit(): void {
  }

  //#region :::::::::::::::  GETTERS :::::::::::::::::::::::
  getUnidadesNegocio() {
    this.rentContServ.getUnidadesNegocio().subscribe(res => {
      this.arrUnidadesNegocio = res.data;
    });
  }

  getTiposOperacion() {
    this.renGerService.getTiposOperacion().subscribe(res => {
      this.arrTipoOperacion = res.data;
    });
  }

  getClientesRutas() {
    if (this.mesSeleccionado > 0 && this.anioSeleccionado > 0) {
      this.renGerService.getClientesRutas(
        this.anioSeleccionado,
        this.mesSeleccionado,
        this.udnSeleccionado,
        this.tipoOperSeleccionado).subscribe(res => {
          if (res.data.clientes.length === 0 || res.data.rutas.length === 0) {
            this.message = 'No se encontraron registros con los paramtros de busqueda proporcionados, verifique.';
            this.type = 'error';
            notify(this.message, this.type, 6000);
          } else {
            this.message = 'Carga completa, se encontraron: ' + res.data.rutas.length + ' rutas, y ' +
              res.data.clientes.length + ' clientes';
            this.type = 'success';
            notify(this.message, this.type, 6000);
          }
          //this.isVisible = true;
          this.arrClientes = res.data.clientes;
          this.arrRutas = res.data.rutas;
          console.log(this.arrClientes);
          this.loadingVisible = false;

        });
    }
    else {
      notify('Debe seleccionar al menos: Mes y Año para la consulta, verifique', 'error', 6000);
      this.loadingVisible = false;
    }
  }

  getRentGerencial() {
    if (this.mesSeleccionado > 0 && this.anioSeleccionado > 0) {
      this.renGerService.getRentGer(
        this.anioSeleccionado,
        this.mesSeleccionado,
        this.udnSeleccionado,
        this.tipoOperSeleccionado,
        this.rutaSeleccionado,
        this.clienteSeleccionado).subscribe(res => {
          this.promedioPonderado = res.data.promPondedaro;
          if (res.data.rentabilidaRutas.length > 0) {
            notify('Datos procesados correctamente', 'succes', 3000);
          } else {
            notify('No se encontraron registros con los paramtros de busqueda proporcionados, verifique.', 'error', 6000);
          }
          this.arrRentGer = res.data.rentabilidaRutas;
          this.loadingVisible = false;
        });
    }
    else {
      notify('Debe seleccionar al menos: Mes y Año para la consulta, verifique', 'error', 6000);
      this.loadingVisible = false;
    }

  }

  //#endregion :::::::::: FIN GETTERS ::::::::::::::::::::


  //#region ::::::::::::: EVENTOS ::::::::::::::::::::::::
  clickClientesRutas = (e: any) => {
    this.loadingVisible = true;
    this.getClientesRutas();
  };

  clickBuscar = (e: any) => {
    this.loadingVisible = true;
    this.getRentGerencial();
  };

  limpirarArrClientesRutas() {
    this.arrClientes = [];
    this.arrRutas = [];
  }

  seleccionarMes(e: any) {
    this.mesSeleccionado = e.value;
    this.limpirarArrClientesRutas();
  }

  seleccionarAnio(e: any) {
    this.anioSeleccionado = e.value;
    this.limpirarArrClientesRutas();
  }

  seleccionarUDN(e: any) {
    this.udnSeleccionado = [];
    this.udnSeleccionado = e.value;
    this.limpirarArrClientesRutas();
  }

  seleccionarTipoOperacion(e: any) {
    this.tipoOperSeleccionado = [];
    this.tipoOperSeleccionado = e.value;
    this.limpirarArrClientesRutas();
  }

  seleccionarClientes(e: any) {
    this.clienteSeleccionado = [];
    this.clienteSeleccionado = e.value;
  }

  seleccionarRutas(e: any) {
    this.rutaSeleccionado = [];
    this.rutaSeleccionado = e.value;
  }
  //#endregion :::::::: FIN EVENTOS ::::::::::::::::::::::



  onRowPrepared(e: any) {
    if (e.rowType == 'data') {

      e.cells.forEach((c: any) => {
        if (c.columnIndex == 7 && c.value <= 0.20) {
          c.cellElement.style.color = "red";
        }
      })
    }
  }

  onRowPreparedDetalle(e: any){
    if (e.rowType == 'data') {
      e.cells.forEach((c: any) => {

        if (c.cellElement) {
          //poner en rojo negativos
          if (c.value && c.value.toString().startsWith('-')) {
            c.cellElement.style.color = "red";
          }

          //negrita columna margen utilidad
          if (c.columnIndex == 7  || c.columnIndex == 8 || c.columnIndex == 9) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "14px";
            c.cellElement.style.background = "#f5f5f5";
          }
        }
      });
    }

  }

  verDetallesClick(e: any) {
    this.arrLiquidacionesDetalle = [];
    const clonedItem = { ...e.row.data };
    let array: LiquidacionesModel[] = clonedItem.liquidaciones;

    array.forEach(element => {
      element.inicio = new Date(element.inicio);
      element.fin = new Date(element.fin);
    });

    this.arrLiquidacionesDetalle = array;
    console.log('🍋', this.arrLiquidacionesDetalle);


    this.bolModal = true;


    e.event.preventDefault();
  }

}

@Pipe({ name: 'gridCellData' })
export class GridCellDataPipe implements PipeTransform {
  transform(gridData: any) {
    return gridData.data[gridData.column.caption.toLowerCase()];
  }
}
