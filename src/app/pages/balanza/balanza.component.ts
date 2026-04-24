import { RentContModel, UnidadesNegocioModel, MesesModel, AniosModel, CompaniaModel } from './../../shared/models/rentabilidad-contable/renta-contable.model';
import { Component, OnInit, ViewChild } from '@angular/core';

import { DxSelectBoxComponent } from 'devextreme-angular';

import { BalanzaService } from '../../services/balanza/balanza.service';
import { CentroCostos } from '../../shared/models/balanza/centroCostos.model';
import { Balanza } from '../../shared/models/balanza/balanza.model';
import { Compania } from '../../shared/models/balanza/compania.model';
import { UnidadNegocio } from '../../shared/models/balanza/udn.model';
import { Tipos } from '../../shared/models/balanza/tipos.model';
import { Clases } from '../../shared/models/balanza/clases.model';

@Component({
  templateUrl: './balanza.component.html',
  styleUrls: ['./balanza.component.scss'],
})  
export class BalanzaComponent implements OnInit {

  @ViewChild('selectTracto') selectTracto!: DxSelectBoxComponent;

  gridBalanza: Balanza[] = [];
  gridDetalle: any[] = [];

  readonly allowedPageSizes = [5, 10, 20, 50, 100, 'all'];

  loadingVisible = false;

  selectedFechaI: any;
  selectedFechaF: any;
  selectedCompania: any;
  selectedUdN: any;
  selectedTiposCostos: any;
  selectedClasesCostos: any;
  selectedCostos: any;

  modDetalle: boolean = false;

  positionOf: string = '#myDiv';

  companias: Compania[] =[]
  unidadesNegocio: UnidadNegocio[] = [];
  tiposCostos: Tipos[] = [];
  clasesCostos: Clases[] = [];
  centroCostos: CentroCostos[] = [];

  allCompanias: any[] = [];
  allUdns: any[] = [];
  allTipos: any[] = [];
  allClases: any[] = [];

  maxDate: any;
  now: Date = new Date();

  isVisible = false;
  type = 'info';
  message = '';

  checkConsolidado: boolean = false;

  constructor(
    private balanzaService: BalanzaService
    ) {
    }


  ngOnInit(): void {
    this.getCompanias();
    this.getTipoCostos();
  }

  ngAfterViewInit(): void {}

  //=================GETS===========================
  getCompanias(){
    this.balanzaService.getCompanias().subscribe(data => {
      this.companias = data.data;
      //console.log(this.companias)
      var myData = data.data;
      for (var i = 0; i < myData.length; i++) {
        this.allCompanias.push(myData[i].idCompania);

      }

      if(this.allCompanias !== undefined){
        this.getAllUnidadesNegocio(this.allCompanias);
      }
    })
  }

  getUnidadesNegocio(id) {
    const request = new Promise((resolve, reject) => {
      this.balanzaService.postUnidadesNegocio(id).subscribe(data =>{
        this.unidadesNegocio = data.data;
      })
    });
    return request;

  }

  getAllUnidadesNegocio(id) {
    const request = new Promise((resolve, reject) => {
      this.balanzaService.postUnidadesNegocio(id).subscribe(data =>{
        
        var myData = data.data;
        for (var i = 0; i < myData.length; i++) {
          this.allUdns.push(myData[i].idUdn)
        }

      })
    });
    return request;

  }

  getTipoCostos(){
    this.balanzaService.getTipoCostos().subscribe(data =>{
      this.tiposCostos = data.data;

      var myData = data.data;
      for (var i = 0; i < myData.length; i++) {
        this.allTipos.push(myData[i].idTipoCentrocosto)
      }

      if(this.allTipos !== undefined){
        this.postAllClasesCostos(this.allTipos);
      }

    })
  }

  postClasesCostos(id){
    const request = new Promise((resolve, reject) => {
      this.balanzaService.postClasesCostos(id).subscribe(data =>{
        this.clasesCostos = data.data;
      })
    });
    return request;

  }

  postAllClasesCostos(id){
    const request = new Promise((resolve, reject) => {
      this.balanzaService.postClasesCostos(id).subscribe(data =>{
        
        var myData = data.data;
        for (var i = 0; i < myData.length; i++) {
          this.allClases.push(myData[i].idCentroCostoClase)
        }
      })
    });
    return request;

  }

  getCC(tipos, clase){
    const request = new Promise((resolve, reject) => {

      this.balanzaService.postCostosCC(tipos, clase).subscribe(data =>{
        this.centroCostos = data.data;
        //console.log(this.centroCostos)
      })
    });
    return request;
  }
  //=================SELECTS========================
  
  selectFechaI(e: any) {
    this.selectedFechaI = e.value;
  } 
  
  selectFechaF(e: any){
    //console.log(e)
    this.selectedFechaF = e.value;

    if(this.selectedFechaI >= this.selectedFechaF){
      this.isVisible = true;
    }
  } 

  selectCompania(e: any){
    this.selectedCompania = e.value;

    this.getUnidadesNegocio(this.selectedCompania)
  } 

  selectUdN(e: any){
    this.selectedUdN = e.value;
  } 

  selectTiposCostos(e: any){
    this.selectedTiposCostos = e.value;

    this.postClasesCostos(this.selectedTiposCostos)
  }

  selecttClasesCostos(e: any){
    this.selectedClasesCostos = e.value;
    //console.log(this.selectedClasesCostos)
    this.getCC(this.selectedTiposCostos, this.selectedClasesCostos)
  }

  selectCostos(e: any){
    this.selectedCostos = e.value;
  }

  checkBoxToggled(e: any){
    this.checkConsolidado = e.value;
  }
  
  buscarClick = (e: any) => {
    // if (this.selectedClasficacion !==  undefined) {
      this.loadingVisible = true;
      this.postBalanza().then(() => {
        this.loadingVisible = false;
      });
    // }

  };

  postBalanza(){
    const request = new Promise((resolve, reject) => {

      if(this.selectedCompania !== undefined && this.selectedUdN !== undefined && this.selectedTiposCostos !== undefined && this.selectedClasesCostos !== undefined){
        //console.log("entre primero")
        this.balanzaService.postBalanza(this.selectedFechaI, this.selectedFechaF, this.selectedCompania, this.selectedUdN, this.selectedTiposCostos, this.selectedClasesCostos, this.selectedCostos, this.checkConsolidado).subscribe(data =>{
          this.gridBalanza = data.data;
          // this.gridBalanza.sort((a, b) => (a.cuenta < b.cuenta ? -1 : 1));
          this.loadingVisible = false;
        })
      }else {
        //console.log("entre segundo")
        var centrocostos = [];
        this.balanzaService.postBalanza(this.selectedFechaI, this.selectedFechaF, this.allCompanias, this.allUdns, this.allTipos, this.allClases, centrocostos, this.checkConsolidado).subscribe(data =>{
          this.gridBalanza = data.data;
          // this.gridBalanza.sort((a, b) => (a.cuenta < b.cuenta ? -1 : 1));
          this.loadingVisible = false;
        })
      }




    });
    return request;
  }

  onRowPrepared(e:any){

  }

  onRowPreparedDetalle(e:any){

  }
  
  verDetallesClick(e: any) {
    this.modDetalle = true;

  }
}


