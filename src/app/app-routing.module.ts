import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { DetailGridComponent } from './pages/profile/detail-grid/detail-grid.component';

import { DxDataGridModule, DxFormModule, DxSelectBoxModule, DxButtonModule, DxDropDownBoxModule, DxTreeViewModule, DxCalendarModule,
  DxPopupModule, DxTabPanelModule, DxChartModule, DxPivotGridModule, DxResponsiveBoxModule, DxDateBoxModule, DxTagBoxModule,
  DxValidatorModule, DxLoadPanelModule, DxToastModule, DxTemplateModule, DxSpeedDialActionModule, DxRadioGroupModule, DxTabsModule, DxScrollViewModule,
  DxCheckBoxModule, DxPivotGridFieldChooserModule, DxNumberBoxModule, DxAutocompleteModule, DxTreeListModule, DxBoxModule, DxTextBoxModule, DxTextAreaModule,
  DxPieChartModule, DxDropDownButtonModule} from 'devextreme-angular';
  
  import { ApplyPipeModule } from './pipes/apply.pipe';
  import { DxFunnelModule } from 'devextreme-angular/ui/funnel';
// import { OpportunitiesTickerModule } from 'src/app/components/utils/opportunities-ticker/opportunities-ticker.component';

  import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';

  import { DxoValueAxisModule } from 'devextreme-angular/ui/nested';
  import { DxRangeSelectorModule } from 'devextreme-angular/ui/range-selector';
  import { PdfViewerModule } from 'ng2-pdf-viewer';
  // import { LeafletModule } from '@asymmetrik/ngx-leaflet';
  

  import { RentContComponent } from './pages/rent-cont/rent-cont.component';
  import { RentGerComponent } from './pages/rent-ger/rent-ger.component';
  import { IngresosComponent } from './pages/ingresosAnuales/ingresos.component';
  import { GridCellDataPipe} from './pages/rent-ger/rent-ger.component';
  import { CotizadorComponent } from './pages/cotizador/cotizador.component';
  import { IngresosDetalladosComponent } from './pages/ingresos-detallados/ingresos-detallados.component';
  import { KilometrosComponent } from './pages/kilometros/kilometros.component';
  import { CostosComponent } from './pages/costos/costos.component';
  import { CostosAnualesComponent } from './pages/costos-anuales/costos-anuales.component';
  import { PermisoBitacoraComponent } from './pages/persmiso-bitacora/permiso-bitacora.component';
  import { BalanzaComponent } from './pages/balanza/balanza.component';
  import { CicloViajeComponent } from './pages/ciclo-viaje/ciclo-viaje.component';
  import { RentaComponent } from './pages/renta/renta.component';
  import { CostosAnualesNewComponent } from './pages/costos-anuales copy/costos-anuales.component';
  import { IndicadoresComponent } from './pages/indicadores/indicadores.component'; 
  import { CarteraClientesComponent } from './pages/carteraClientes/carteraClientes.component';
  import { ValidacionIngresoComponent } from './pages/validacionIngreso/validacionIngreso.component';
  import { ProyeccionCostosComponent } from './pages/proyeccionCostos/proyeccionCostos.component';
  import { RentabilidadViajesComponent } from './pages/rentabilidadViajes/rentabilidadViajes.component';
  import { RendimientoDieselComponent } from './pages/rendimientoDiesel/rendimientoDiesel.component';
  import { CarteraInterCompaniasComponent } from './pages/CarteraInterCompanias/carteraInterCompanias.component';
  import { MarcroCicloCompaniasComponent } from './pages/macroCiclo/macroCiclo.component';
  import { disponiblidadComponent } from './pages/disponibilidad/disponiblidad.component';
  import { DisponibilidadOperadoresComponent } from './pages/disponilibilidadOperadores/disponibilidadOperadores.component';
  import { MultipartidasComponent } from './pages/multipartidas/multipartidas.component';
  import { presupuestoDisponibilidadComponent } from './pages/presupuestoDisponibilidad/presupuestoDisponibilidad.component';
  import { CompensacionProvisionComponent } from './pages/compensacionProvision/compensacionProvision.component';
  import { disponibilidadMensualComponent } from './pages/disponibilidadMensual/disponiblidadMensual.component';
  import { MetricaCobranzaComponent } from './pages/CarteraMetricaCobranza/metricaCobranza.component';
  import { BitacoraViajeComponent } from './pages/bitacoraViaje/bitacoraViaje.component';
  import { PagosComponent } from './pages/pagos/pagos.component';
  import { AltasBajasComponent } from './pages/altasBajas/altasBajas.component';
  import { AnticiposComponent } from './pages/anticipos/anticipos.component';
  import { LiquidacionComponent } from './pages/liquidacion/liquidacion.component';
  import { PermisosComponent } from './pages/permisos/permisos.component';

  import { TickerCardComponent } from './components/library/ticker-card/ticker-card.component';
  import { CardAnalyticsComponent } from './components/library/card-analytics/card-analytics.component';
  import { CardMenuComponent } from './components/library/card-menu/card-menu.component';

  import { ToolbarAnalyticsComponent } from './components/utils/toolbar-analytics/toolbar-analytics.component';
  import { SalesByRangeCardComponent } from './components/utils/sales-by-range-card/sales-by-range-card.component';
  import { CardAnalytics2Component } from './components/library/card-analytics2/card-analytics2.component';
  import { SalesRangeCardComponent } from './components/utils/sales-range-card/sales-range-card.component';
  import { SalesPerformanceCardComponent } from './components/utils/sales-performance-card/sales-performance-card.component';
  import { SalesRangeGraficaComponent } from './components/utils/sales-by-range-card copy/sales-range-grafica.component';
  import { UltimoStatusComponent } from './pages/ultimoStatus/ultimoStatus.component';
  import { DatosOperadorComponent } from './pages/datosOperador/datosOperador.component';
  import { PreviewPDFComponent } from './pages/previewPDF/previewPDF.component';
  import { DocumentacionOperadorComponent } from './pages/documentacionOperador/documentacionOperador.component';
  import { MapaComponent } from './components/utils/mapa/mapa.component';

const routes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'ingresos',
    component: IngresosDetalladosComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'rentabilidadcontable',
    component: RentContComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'rentabilidadgerencial',
    component: RentGerComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'cotizador',
    component: CotizadorComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'ingresosAnuales',
    component: IngresosComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'kilometros',
    component: KilometrosComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'costos',
    component: CostosComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'costos-anuales',
    component: CostosAnualesComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'permiso-bitacora',
    component: PermisoBitacoraComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'balanza',
    component: BalanzaComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'ciclo-viaje',
    component: CicloViajeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'renta',
    component: RentaComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'costos-anuales-new',
    component: CostosAnualesNewComponent,
    canActivate: [ AuthGuardService ]
  },{
    path: 'indicadores',
    component: IndicadoresComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'cartera-clientes',
    component: CarteraClientesComponent,
    canActivate: [ AuthGuardService]
  },
  {
    path: 'validacion-ingreso',
    component: ValidacionIngresoComponent,
    canActivate: [ AuthGuardService]
  },
  {
    path: 'proyeccion-costos',
    component: ProyeccionCostosComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'rentabilidad-viajes',
    component: RentabilidadViajesComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'rendimiento-diesel',
    component: RendimientoDieselComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'carteraInterCompanias',
    component: CarteraInterCompaniasComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'macroCiclo',
    component: MarcroCicloCompaniasComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'disponiblidad-Unidades',
    component: disponiblidadComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'disponibilidad-Operadores',
    component: DisponibilidadOperadoresComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'disponibilidad-Mensual',
    component: disponibilidadMensualComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'multipartidas',
    component: MultipartidasComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'presupuestoDisponibilidad',
    component: presupuestoDisponibilidadComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'compensacionProvision',
    component: CompensacionProvisionComponent,
    canActivate: [ AuthGuardService ],
  },
  {
    path: 'metricaCobranza',
    component: MetricaCobranzaComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'bitacoraViaje',
    component: BitacoraViajeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'pagos',
    component: PagosComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'altasBajas',
    component: AltasBajasComponent,
    canActivate: [ AuthGuardService ]
  }, 
  {
    path: 'ticketCard',
    component: TickerCardComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'cardAnalitics',
    component: CardAnalyticsComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'cardMenu',
    component: CardMenuComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'anticipos',
    component: AnticiposComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'liquidacion',
    component: LiquidacionComponent,
    canActivate: [ AuthGuardService  ]
  },
  {
    path: 'permisos',
    component: PermisosComponent,
    canActivate: [ AuthGuardService  ]
  },
  {
    path: 'toolbar',
    component: ToolbarAnalyticsComponent,
    canActivate: [ AuthGuardService  ]
  },
  {
    path: 'salesCard',
    component: SalesByRangeCardComponent,
    canActivate: [ AuthGuardService  ]
  },
  {
    path: 'cardAnalytic2',
    component: CardAnalytics2Component,
    canActivate: [ AuthGuardService  ]
  },
   {
    path: 'salesRange',
    component: SalesRangeCardComponent,
    canActivate: [ AuthGuardService  ]
  },
  {
    path: 'salesPerformace',
    component: SalesPerformanceCardComponent,
    canActivate: [ AuthGuardService  ]
  },
  {
    path: 'salesRangeGrafica',
    component: SalesRangeGraficaComponent,
    canActivate: [ AuthGuardService  ]
  },
  {
    path: 'ultimoStatus',
    component: UltimoStatusComponent,
    canActivate: [ AuthGuardService  ]
  },
  {
    path: 'datosOperador',
    component: DatosOperadorComponent,
    canActivate: [ AuthGuardService  ]
  },
  {
    path: 'previewPDF',
    component: PreviewPDFComponent,
    canActivate: [ AuthGuardService  ]
  },
  {
    path: 'documentacionOperador',
    component: DocumentacionOperadorComponent,
    canActivate: [ AuthGuardService  ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }), 
    DxFormModule, 
    DxSelectBoxModule, 
    DxButtonModule, 
    DxDropDownBoxModule, 
    DxTreeViewModule,
    DxCalendarModule, 
    DxPopupModule, 
    DxTabPanelModule, 
    DxDataGridModule, 
    DxChartModule, 
    DxPivotGridModule, 
    DxResponsiveBoxModule, 
    DxDateBoxModule,
    DxTagBoxModule, 
    DxValidatorModule, 
    DxLoadPanelModule, 
    DxToastModule, 
    CommonModule,  
    DxTemplateModule, 
    DxToolbarModule, 
    DxSpeedDialActionModule,
    DxRadioGroupModule, 
    DxTabsModule, 
    DxScrollViewModule, 
    DxCheckBoxModule,
    DxPivotGridFieldChooserModule,
    DxNumberBoxModule,
    DxAutocompleteModule,
    DxTreeListModule,
    DxBoxModule,
    DxTextBoxModule,
    DxTextAreaModule,
    BrowserModule,
    BrowserTransferStateModule,
    DxPieChartModule,
    ApplyPipeModule,
    DxFunnelModule,
    DxDropDownButtonModule,
    DxoValueAxisModule,
    DxRangeSelectorModule,
    PdfViewerModule,
    // LeafletModule
    
  ],
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [AuthGuardService],
  exports: [
    RouterModule,
    // TickerCardComponent
  ],
  declarations: [
    HomeComponent, 
    ProfileComponent, 
    TasksComponent, 
    DetailGridComponent, 
    RentContComponent, 
    RentGerComponent, 
    GridCellDataPipe,
    IngresosComponent, 
    CotizadorComponent, 
    IngresosDetalladosComponent, 
    KilometrosComponent, 
    CostosComponent, 
    CostosAnualesComponent,
    PermisoBitacoraComponent,
    BalanzaComponent,
    CicloViajeComponent,
    RentaComponent,
    CostosAnualesNewComponent,
    IndicadoresComponent,
    CarteraClientesComponent,
    ValidacionIngresoComponent,
    ProyeccionCostosComponent,
    RentabilidadViajesComponent,
    RendimientoDieselComponent,
    CarteraInterCompaniasComponent,
    MarcroCicloCompaniasComponent,
    disponiblidadComponent,
    DisponibilidadOperadoresComponent,
    MultipartidasComponent,
    presupuestoDisponibilidadComponent,
    CompensacionProvisionComponent,
    disponibilidadMensualComponent,
    MetricaCobranzaComponent,
    BitacoraViajeComponent,
    PagosComponent,
    AltasBajasComponent,
    TickerCardComponent,
    CardAnalyticsComponent,
    CardMenuComponent,
    AnticiposComponent,
    LiquidacionComponent,
    PermisosComponent,
    ToolbarAnalyticsComponent,
    SalesByRangeCardComponent,
    CardAnalytics2Component,
    SalesRangeCardComponent,
    SalesPerformanceCardComponent,
    SalesRangeGraficaComponent,
    UltimoStatusComponent,
    DatosOperadorComponent,
    PreviewPDFComponent,
    DocumentacionOperadorComponent,
    MapaComponent
  ]
})
export class AppRoutingModule { }
