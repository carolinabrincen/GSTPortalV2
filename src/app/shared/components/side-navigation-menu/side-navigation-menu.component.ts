import { Component, NgModule, Output, Input, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ItemClickEvent } from 'devextreme/ui/tree_view';
import { DxTreeViewModule, DxTreeViewComponent } from 'devextreme-angular/ui/tree-view';
import { navigation, navigationID24 } from '../../../app-navigation';
import * as events from 'devextreme/events';

import { StorageService } from '../../services/storage.service';
import { Claves } from '../../models/menu/menu.model';
import notify from 'devextreme/ui/notify';
import { DatosOperadorService } from 'src/app/services/datosOperador/datosOperador.service';

//const menuTest = [];

const clave = new Claves
@Component({
  selector: 'app-side-navigation-menu',
  templateUrl: './side-navigation-menu.component.html',
  styleUrls: ['./side-navigation-menu.component.scss']
})
export class SideNavigationMenuComponent implements AfterViewInit, OnDestroy {
  @ViewChild(DxTreeViewComponent, { static: true })
  menu!: DxTreeViewComponent;

  @Output()
  selectedItemChanged = new EventEmitter<ItemClickEvent>();

  @Output()
  openMenu = new EventEmitter<any>();

  private _selectedItem!: String;
  @Input()
  set selectedItem(value: String) {
    this._selectedItem = value;
    if (!this.menu.instance) {
      return;
    }

    this.menu.instance.selectItem(value);
  }

  

  private _compactMode = false;
  @Input()
  get compactMode() {
    return this._compactMode;
  }
  set compactMode(val) {
    this._compactMode = val;

    if (!this.menu.instance) {
      return;
    }

    if (val) {
      this.menu.instance.collapseAll();
    } else {
      this.menu.instance.expandItem(this._selectedItem);
    }
  }

  idGrupo24: any;
  permisosUser: any[] = [];
  clave: string = "";
 

  constructor(
    private elementRef: ElementRef,
    private storageService: StorageService,
    private datosOpService: DatosOperadorService
  ) {
    this.idGrupo24 = this.storageService.getSession("idValidation")
    //console.log("1 "+ this.idGrupo24)

    this.permisosUser = this.storageService.getSession('permisos')
  }

   private _items!: Record <string, unknown>[];
  get items() {

    //console.log(this.permisosUser)
    //  for(let i =0; i<this.permisosUser.length; i++){ 
      
    //   clave.clave = this.permisosUser[i].clave;
      
    // }
    
    if (!this._items) {
      //if(this.idGrupo24 !== 24){
    //   const intersection = this.permisosUser.filter((obj) =>
    //     navigation.some((item) => item.path === obj.clave),
    // ) ;

    // console.log(intersection)

        this._items = navigation.map((item) => {

          if(item.path && !(/^\//.test(item.path))){
            item.path = `/${item.path}`;
          }
           return { ...item, expanded: !this._compactMode }
        }); 
        // console.log("Normal")
      // }else if(this.idGrupo24 === 24){
      //   this._items = navigationID24.map((item) => {
      //     if(item.path && !(/^\//.test(item.path))){
      //       item.path = `/${item.path}`;
      //     }
      //      return { ...item, expanded: !this._compactMode }
      //   }); 
      //   // console.log("ID24")
      // }
             
    }

    return this._items;
    
  }

  onItemClick(event: ItemClickEvent) {
    let permiso = true;
    //console.log("Evento click del menu:  ",event);

    this.permisosUser.forEach((c: any) => {
      if(c.clave == event.itemData.path && c.activo == false){
        
        permiso = c.activo;

        notify({
          message: "No tiene permisos de acceso a esta opción, verifique",
          position: {
            my: 'center',
            at: 'center',
          },
        }, 'error', 4000);
      }
      

      if(c.clave == event.itemData.path && c.activo == true){
        //console.log("Entro en la pantalla")
        this.postBitacora(event.itemData.text)
      }
    })

      if(permiso){
      this.selectedItemChanged.emit(event);
  }
   
  }

  ngAfterViewInit() {
    events.on(this.elementRef.nativeElement, 'dxclick', (e: Event) => {
      this.openMenu.next(e);
    });
  }

  ngOnDestroy() {
    events.off(this.elementRef.nativeElement, 'dxclick');
  }

  postBitacora(nomPantalla){
    let nombreArch = "";
    let otros = ""
    let cvetra = this.storageService.getSession("username")
    this.datosOpService.postBitacora(nomPantalla, cvetra, nombreArch, otros).subscribe(data =>{
      console.log(data)
    })
  }
}

@NgModule({
  imports: [ DxTreeViewModule ],
  declarations: [ SideNavigationMenuComponent ],
  exports: [ SideNavigationMenuComponent ]
})
export class SideNavigationMenuModule { }
