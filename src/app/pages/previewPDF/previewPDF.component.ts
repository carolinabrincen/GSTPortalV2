import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DxSelectBoxComponent, DxFormComponent, DxDataGridComponent} from 'devextreme-angular';
import { Cartera } from '../../shared/models/carteraClientes/cartera';
import { PermisosService } from 'src/app/services/permisos/permisos.service';
import { CarteraInterCompanias } from '../..//shared/models/carteraIntercompanias/carteraIntercompanias.model';
import { CarteraTerceros } from '../../shared/models/carteraIntercompanias/carteraTerceros.model';
import { Permisos } from 'src/app/shared/models/permisos/clientesAsignados.model';

import { StorageService } from '../../shared/services/storage.service';
import themes from 'devextreme/ui/themes';
import notify from 'devextreme/ui/notify';
import { ActivatedRoute, Router } from '@angular/router';
import SelectBox from "devextreme/ui/select_box";
import { DxiDataGridColumn } from 'devextreme-angular/ui/nested/base/data-grid-column-dxi';
import { DxoGridComponent } from 'devextreme-angular/ui/nested';
import { reduce } from 'rxjs/operators';

import * as L from 'leaflet';

@Component({
  templateUrl: './previewPDF.component.html',
  styleUrls: ['./previewPDF.component.scss'],
})
export class PreviewPDFComponent implements OnInit {
@ViewChild('inputElement', {static: false}) el: ElementRef;
  loadingVisible = false;

  isVisible = false;


  pdfSrc = "htto:\\192.168.20.233\Program Files (x86)\Nom20001.Net\Imagenes\PDF\LICENCIA FERNANDO GALVAN HDZ.pdf"
  formCierre: any = {
    usuario: "",
    contrasenia: "",

  }

  private map;
  constructor(
    private permisosService: PermisosService,
    private storageService: StorageService,
    private router: Router,
    private route: ActivatedRoute,
    ) {

    }

    previewFile(event) {
      const filePDF = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (e: any) => {
      
      // var file = new Blob([filePDF], {type: 'application/pdf'});
      // var fileURL = URL.createObjectURL(file);
      // window.open(fileURL);
      //PARA DESCARGAR DOCUMENTOS
      // const a = document.createElement('a');
      // document.body.appendChild(a);
      // a.style.display = 'none';
          
      // const file = new Blob([event.target.files[0]], {type: 'aplicación/pdf'});
      // const url = window.URL.createObjectURL(file);
      // a.href = url;
      // a.download = "test.pdf";
      // a.click();
      // window.URL.revokeObjectURL(url);
      //window.open(url)
    };
    var url = reader.readAsDataURL(event.target.files[0]);

  } 

  ngOnInit(): void {
 
  }

  ngAfterViewInit(): void {
this.initMap();
  }


  onShown() {
    // setTimeout(() => {
    //   this.loadingVisible = false;
    // }, 3000);
  }

  onHidden() {
  }

    private initMap(): void {

  this.map = L.map('map', {
    center: [ 19.7547562,-95.6449205],
    zoom: 7,
    //minZoom: 5,
    //maxZoom :14
  });

  const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
  {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

  tiles.addTo(this.map);
  // this.map.pm.addControls({
  //   position: 'topleft',
  //   drawCircle: false,
  // })
  //L.marker([51.50915, -0.096112], { pmIgnore: true }).addTo(this.map);

  // listen to vertexes being added to currently drawn layer (called workingLayer)
 // listen to vertexes being added to currently drawn layer (called workingLayer)

// this.map.on('pm:drawstart', ({ workingLayer }) => {
// workingLayer.on('pm:vertexadded', e => {
  
//   this.polygono = e.workingLayer._latlngs;
//   this._storage.setLocal("key_poligono", this.polygono);

//   this.mypolygono = JSON.stringify(this._storage.getLocal("key_poligono"));
  
// });
// });

}

}


