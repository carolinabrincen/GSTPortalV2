import { Component, OnInit, ViewChild } from '@angular/core';
import { DxSelectBoxComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { DxChartComponent, } from 'devextreme-angular';
import { IndicadoresService } from '../../services/indicadores/indicadores.service';
import { ScoreCard } from '../../shared/models/indicadores/scoreCard.model';
import { GraficaIngresoO } from '../../shared/models/indicadores/graficaIngresosO.model';
import { SubtotalesKCV } from '../../shared/models/indicadores/subtotalesKCV.model';
import { 
  CustomTotalKE,
  CustomTotalKF,
  CustomTotalKM,
  CustomTotalKA,
  CustomTotalKMY,
  CustomTotalKJN,
  CustomTotalKJL,
  CustomTotalKAG,
  CustomTotalKS,
  CustomTotalKOC,
  CustomTotalKNV,
  CustomTotalKDC } from '../../shared/models/indicadores/cutomTotal.model';

  import { CustomTArrayL } from '../../shared/models/indicadores/customTArrayL.model';
  import { 
    TotalIngresosTotal,
    TotalOperacionIngresosTotal,
    TotalIngresos, 
    TotalKilometros, 
    TotalOperacionIK,
    AgrupamietoIngresoTotalE,
    AgrupamietoIngresoTotalF,
    AgrupamietoIngresoTotalM,
    AgrupamietoIngresoTotalA,
    AgrupamietoIngresoTotalMY,
    AgrupamietoIngresoTotalJN,
    AgrupamietoIngresoTotalJL,
    AgrupamietoIngresoTotalAG,
    AgrupamietoIngresoTotalS,
    AgrupamietoIngresoTotalOC,
    AgrupamietoIngresoTotalNV,
    AgrupamietoIngresoTotalDC,
    AgrupamietoIngresoE,
    AgrupamietoIngresoF,
    AgrupamietoIngresoM,
    AgrupamietoIngresoA,
    AgrupamietoIngresoMY,
    AgrupamietoIngresoJN,
    AgrupamietoIngresoJL,
    AgrupamietoIngresoAG,
    AgrupamietoIngresoS,
    AgrupamietoIngresoOC,
    AgrupamietoIngresoNV,
    AgrupamietoIngresoDC,
    AgrupamietoKilometrosE,
    AgrupamietoKilometrosF,
    AgrupamietoKilometrosM,
    AgrupamietoKilometrosA,
    AgrupamietoKilometrosMY,
    AgrupamietoKilometrosJN,
    AgrupamietoKilometrosJL,
    AgrupamietoKilometrosAG,
    AgrupamietoKilometrosS,
    AgrupamietoKilometrosOC,
    AgrupamietoKilometrosNV,
    AgrupamietoKilometrosDC,
    TotalAgrupamientoIngresosTotalE,
    TotalAgrupamientoIngresosTotalF,
    TotalAgrupamientoIngresosTotalM,
    TotalAgrupamientoIngresosTotalA,
    TotalAgrupamientoIngresosTotalMY,
    TotalAgrupamientoIngresosTotalJN,
    TotalAgrupamientoIngresosTotalJL,
    TotalAgrupamientoIngresosTotalAG,
    TotalAgrupamientoIngresosTotalS,
    TotalAgrupamientoIngresosTotalOC,
    TotalAgrupamientoIngresosTotalNV,
    TotalAgrupamientoIngresosTotalDC,
    TotalAgrupamientoIKE,
    TotalAgrupamientoIKF,
    TotalAgrupamientoIKM,
    TotalAgrupamientoIKA,
    TotalAgrupamientoIKMY,
    TotalAgrupamientoIKJN,
    TotalAgrupamientoIKJL,
    TotalAgrupamientoIKAG,
    TotalAgrupamientoIKS,
    TotalAgrupamientoIKOC,
    TotalAgrupamientoIKNV,
    TotalAgrupamientoIKDC,
   } from '../../shared/models/indicadores/totalIngresoskilometros.model';
   import { 
    ViajesCargadosE,
    ViajesCargadosF,
    ViajesCargadosM,
    ViajesCargadosA,
    ViajesCargadosMY,
    ViajesCargadosJN,
    ViajesCargadosJL,
    ViajesCargadosAG,
    ViajesCargadosS,
    ViajesCargadosOC,
    ViajesCargadosNV,
    ViajesCargadosDC,
    TotalViajesCargados,
    TotalIngresosVCE,
    TotalIngresosVCF,
    TotalIngresosVCM,
    TotalIngresosVCA,
    TotalIngresosVCMY,
    TotalIngresosVCJN,
    TotalIngresosVCJL,
    TotalIngresosVCAG,
    TotalIngresosVCS,
    TotalIngresosVCOC,
    TotalIngresosVCNV,
    TotalIngresosVCDC,
    TotalOperacionIVC,
    TotalKilomeotrsVCE,
    TotalKilomeotrsVCF,
    TotalKilomeotrsVCM,
    TotalKilomeotrsVCA,
    TotalKilomeotrsVCMY,
    TotalKilomeotrsVCJN,
    TotalKilomeotrsVCJL,
    TotalKilomeotrsVCAG,
    TotalKilomeotrsVCS,
    TotalKilomeotrsVCOC,
    TotalKilomeotrsVCNV,
    TotalKilomeotrsVCDC,
    TotalOperacionKVC
   } from '../../shared/models/indicadores/totalIngresosViajes.model';
   import { KMSMensuales } from '../../shared/models/indicadores/kmsMensuales.model'
   import { Chart, ChartDescription } from '../../shared/models/indicadores/chart.model';
   import { exportWidgets } from 'devextreme/viz/export';

   import { exportFromMarkup } from 'devextreme/viz/export';
   import canvg from 'canvg';
  //  import { Canvg } from 'canvg';

const getOrderDay = function (rowData: any): number {
  return (new Date(rowData.OrderDate)).getDay();
};

//=====================TOTALES INGRESOS/KILOMETROS============================================
const totalIngresosTL24 = new TotalIngresosTotal
const totalIngresosTL25 = new TotalIngresosTotal
const totalIngresosTL26 = new TotalIngresosTotal
const totalOperacionITL24 = new TotalOperacionIngresosTotal;
const totalOperacionITL25 = new TotalOperacionIngresosTotal;
const totalOperacionITL26 = new TotalOperacionIngresosTotal;
const totalIngresos = new TotalIngresos;
const totalIngresos24 = new TotalIngresos;
const totalIngresos25 = new TotalIngresos;
const totalIngresos26 = new TotalIngresos;
const totalKilomentros = new TotalKilometros;
const totalKilomentros24 = new TotalKilometros;
const totalKilomentros25 = new TotalKilometros;
const totalKilomentros26 = new TotalKilometros;
const totalOperacionIK = new TotalOperacionIK;
const totalOperacionIK24 = new TotalOperacionIK;
const totalOperacionIK25 = new TotalOperacionIK;
const totalOperacionIK26 = new TotalOperacionIK;

const agrupamientoITLE24 = new AgrupamietoIngresoTotalE;
const agrupamientoITLE25 = new AgrupamietoIngresoTotalE;
const agrupamientoITLE26 = new AgrupamietoIngresoTotalE;
const agrupamientoITLF24 = new AgrupamietoIngresoTotalF;
const agrupamientoITLF25 = new AgrupamietoIngresoTotalF;
const agrupamientoITLF26 = new AgrupamietoIngresoTotalF;
const agrupamientoITLM24 = new AgrupamietoIngresoTotalM;
const agrupamientoITLM25 = new AgrupamietoIngresoTotalM;
const agrupamientoITLM26 = new AgrupamietoIngresoTotalM;
const agrupamientoITLA24 = new AgrupamietoIngresoTotalA;
const agrupamientoITLA25 = new AgrupamietoIngresoTotalA;
const agrupamientoITLA26 = new AgrupamietoIngresoTotalA;
const agrupamientoITLMY24 = new AgrupamietoIngresoTotalMY;
const agrupamientoITLMY25 = new AgrupamietoIngresoTotalMY;
const agrupamientoITLMY26 = new AgrupamietoIngresoTotalMY;
const agrupamientoITLJN24 = new AgrupamietoIngresoTotalJN;
const agrupamientoITLJN25 = new AgrupamietoIngresoTotalJN;
const agrupamientoITLJN26 = new AgrupamietoIngresoTotalJN;
const agrupamientoITLJL24 = new AgrupamietoIngresoTotalJL;
const agrupamientoITLJL25 = new AgrupamietoIngresoTotalJL;
const agrupamientoITLJL26 = new AgrupamietoIngresoTotalJL;
const agrupamientoITLAG24 = new AgrupamietoIngresoTotalAG;
const agrupamientoITLAG25 = new AgrupamietoIngresoTotalAG;
const agrupamientoITLAG26 = new AgrupamietoIngresoTotalAG;
const agrupamientoITLS24 = new AgrupamietoIngresoTotalS;
const agrupamientoITLS25 = new AgrupamietoIngresoTotalS;
const agrupamientoITLS26 = new AgrupamietoIngresoTotalS;
const agrupamientoITLOC24 = new AgrupamietoIngresoTotalOC;
const agrupamientoITLOC25 = new AgrupamietoIngresoTotalOC;
const agrupamientoITLOC26 = new AgrupamietoIngresoTotalOC;
const agrupamientoITLNV24 = new AgrupamietoIngresoTotalNV;
const agrupamientoITLNV25 = new AgrupamietoIngresoTotalNV;
const agrupamientoITLNV26 = new AgrupamietoIngresoTotalNV;
const agrupamientoITLDC24 = new AgrupamietoIngresoTotalDC;
const agrupamientoITLDC25 = new AgrupamietoIngresoTotalDC;
const agrupamientoITLDC26 = new AgrupamietoIngresoTotalDC;
const agrupamientoIE = new AgrupamietoIngresoE;
const agrupamientoIE24 = new AgrupamietoIngresoE;
const agrupamientoIE25 = new AgrupamietoIngresoE;
const agrupamientoIE26 = new AgrupamietoIngresoE;
const agrupamientoIF = new AgrupamietoIngresoF;
const agrupamientoIF24 = new AgrupamietoIngresoF;
const agrupamientoIF25 = new AgrupamietoIngresoF;
const agrupamientoIF26 = new AgrupamietoIngresoF;
const agrupamientoIM = new AgrupamietoIngresoM;
const agrupamientoIM24 = new AgrupamietoIngresoM;
const agrupamientoIM25 = new AgrupamietoIngresoM;
const agrupamientoIM26 = new AgrupamietoIngresoM;
const agrupamientoIA = new AgrupamietoIngresoA;
const agrupamientoIA24 = new AgrupamietoIngresoA;
const agrupamientoIA25 = new AgrupamietoIngresoA;
const agrupamientoIA26 = new AgrupamietoIngresoA;
const agrupamientoIMY = new AgrupamietoIngresoMY;
const agrupamientoIMY24 = new AgrupamietoIngresoMY;
const agrupamientoIMY25 = new AgrupamietoIngresoMY;
const agrupamientoIMY26 = new AgrupamietoIngresoMY;
const agrupamientoIJN = new AgrupamietoIngresoJN;
const agrupamientoIJN24 = new AgrupamietoIngresoJN;
const agrupamientoIJN25 = new AgrupamietoIngresoJN;
const agrupamientoIJN26 = new AgrupamietoIngresoJN;
const agrupamientoIJL = new AgrupamietoIngresoJL;
const agrupamientoIJL24 = new AgrupamietoIngresoJL;
const agrupamientoIJL25 = new AgrupamietoIngresoJL;
const agrupamientoIJL26 = new AgrupamietoIngresoJL;
const agrupamientoIAG = new AgrupamietoIngresoAG;
const agrupamientoIAG24 = new AgrupamietoIngresoAG;
const agrupamientoIAG25 = new AgrupamietoIngresoAG;
const agrupamientoIAG26 = new AgrupamietoIngresoAG;
const agrupamientoIS = new AgrupamietoIngresoS;
const agrupamientoIS24 = new AgrupamietoIngresoS;
const agrupamientoIS25 = new AgrupamietoIngresoS;
const agrupamientoIS26 = new AgrupamietoIngresoS;
const agrupamientoIOC = new AgrupamietoIngresoOC;
const agrupamientoIOC24 = new AgrupamietoIngresoOC;
const agrupamientoIOC25 = new AgrupamietoIngresoOC;
const agrupamientoIOC26 = new AgrupamietoIngresoOC;
const agrupamientoINV = new AgrupamietoIngresoNV;
const agrupamientoINV24 = new AgrupamietoIngresoNV;
const agrupamientoINV25 = new AgrupamietoIngresoNV;
const agrupamientoINV26 = new AgrupamietoIngresoNV;
const agrupamientoIDC = new AgrupamietoIngresoDC;
const agrupamientoIDC24 = new AgrupamietoIngresoDC;
const agrupamientoIDC25 = new AgrupamietoIngresoDC;
const agrupamientoIDC26 = new AgrupamietoIngresoDC;
const agrupamientoKE = new AgrupamietoKilometrosE;
const agrupamientoKE24 = new AgrupamietoKilometrosE;
const agrupamientoKE25 = new AgrupamietoKilometrosE;
const agrupamientoKE26 = new AgrupamietoKilometrosE;
const agrupamientoKF = new AgrupamietoKilometrosF;
const agrupamientoKF24 = new AgrupamietoKilometrosF;
const agrupamientoKF25 = new AgrupamietoKilometrosF;
const agrupamientoKF26 = new AgrupamietoKilometrosF;
const agrupamientoKM = new AgrupamietoKilometrosM;
const agrupamientoKM24 = new AgrupamietoKilometrosM;
const agrupamientoKM25 = new AgrupamietoKilometrosM;
const agrupamientoKM26 = new AgrupamietoKilometrosM;
const agrupamientoKA = new AgrupamietoKilometrosA;
const agrupamientoKA24 = new AgrupamietoKilometrosA;
const agrupamientoKA25 = new AgrupamietoKilometrosA;
const agrupamientoKA26 = new AgrupamietoKilometrosA;
const agrupamientoKMY = new AgrupamietoKilometrosMY;
const agrupamientoKMY24 = new AgrupamietoKilometrosMY;
const agrupamientoKMY25 = new AgrupamietoKilometrosMY;
const agrupamientoKMY26 = new AgrupamietoKilometrosMY;
const agrupamientoKJN = new AgrupamietoKilometrosJN;
const agrupamientoKJN24 = new AgrupamietoKilometrosJN;
const agrupamientoKJN25 = new AgrupamietoKilometrosJN;
const agrupamientoKJN26 = new AgrupamietoKilometrosJN;
const agrupamientoKJL = new AgrupamietoKilometrosJL;
const agrupamientoKJL24 = new AgrupamietoKilometrosJL;
const agrupamientoKJL25 = new AgrupamietoKilometrosJL;
const agrupamientoKJL26 = new AgrupamietoKilometrosJL;
const agrupamientoKAG = new AgrupamietoKilometrosAG;
const agrupamientoKAG24 = new AgrupamietoKilometrosAG;
const agrupamientoKAG25 = new AgrupamietoKilometrosAG;
const agrupamientoKAG26 = new AgrupamietoKilometrosAG;
const agrupamientoKS = new AgrupamietoKilometrosS;
const agrupamientoKS24 = new AgrupamietoKilometrosS;
const agrupamientoKS25 = new AgrupamietoKilometrosS;
const agrupamientoKS26 = new AgrupamietoKilometrosS;
const agrupamientoKOC = new AgrupamietoKilometrosOC;
const agrupamientoKOC24 = new AgrupamietoKilometrosOC;
const agrupamientoKOC25 = new AgrupamietoKilometrosOC;
const agrupamientoKOC26 = new AgrupamietoKilometrosOC;
const agrupamientoKNV = new AgrupamietoKilometrosNV;
const agrupamientoKNV24 = new AgrupamietoKilometrosNV;
const agrupamientoKNV25 = new AgrupamietoKilometrosNV;
const agrupamientoKNV26 = new AgrupamietoKilometrosNV;
const agrupamientoKDC = new AgrupamietoKilometrosDC;
const agrupamientoKDC24 = new AgrupamietoKilometrosDC;
const agrupamientoKDC25 = new AgrupamietoKilometrosDC;
const agrupamientoKDC26 = new AgrupamietoKilometrosDC;

const totalAgrupamientoITLE24 = new TotalAgrupamientoIngresosTotalE;
const totalAgrupamientoITLE25 = new TotalAgrupamientoIngresosTotalE;
const totalAgrupamientoITLE26 = new TotalAgrupamientoIngresosTotalE;
const totalAgrupamientoITLF24 = new TotalAgrupamientoIngresosTotalF;
const totalAgrupamientoITLF25 = new TotalAgrupamientoIngresosTotalF;
const totalAgrupamientoITLF26 = new TotalAgrupamientoIngresosTotalF;
const totalAgrupamientoITLM24 = new TotalAgrupamientoIngresosTotalM;
const totalAgrupamientoITLM25 = new TotalAgrupamientoIngresosTotalM;
const totalAgrupamientoITLM26 = new TotalAgrupamientoIngresosTotalM;
const totalAgrupamientoITLA24 = new TotalAgrupamientoIngresosTotalA;
const totalAgrupamientoITLA25 = new TotalAgrupamientoIngresosTotalA;
const totalAgrupamientoITLA26 = new TotalAgrupamientoIngresosTotalA;
const totalAgrupamientoITLMY24 = new TotalAgrupamientoIngresosTotalMY;
const totalAgrupamientoITLMY25 = new TotalAgrupamientoIngresosTotalMY;
const totalAgrupamientoITLMY26 = new TotalAgrupamientoIngresosTotalMY;
const totalAgrupamientoITLJN24 = new TotalAgrupamientoIngresosTotalJN;
const totalAgrupamientoITLJN25 = new TotalAgrupamientoIngresosTotalJN;
const totalAgrupamientoITLJN26 = new TotalAgrupamientoIngresosTotalJN;
const totalAgrupamientoITLJL24 = new TotalAgrupamientoIngresosTotalJL;
const totalAgrupamientoITLJL25 = new TotalAgrupamientoIngresosTotalJL;
const totalAgrupamientoITLJL26 = new TotalAgrupamientoIngresosTotalJL;
const totalAgrupamientoITLAG24 = new TotalAgrupamientoIngresosTotalAG;
const totalAgrupamientoITLAG25 = new TotalAgrupamientoIngresosTotalAG;
const totalAgrupamientoITLAG26 = new TotalAgrupamientoIngresosTotalAG;
const totalAgrupamientoITLS24 = new TotalAgrupamientoIngresosTotalS;
const totalAgrupamientoITLS25 = new TotalAgrupamientoIngresosTotalS;
const totalAgrupamientoITLS26 = new TotalAgrupamientoIngresosTotalS;
const totalAgrupamientoITLOC24 = new TotalAgrupamientoIngresosTotalOC;
const totalAgrupamientoITLOC25 = new TotalAgrupamientoIngresosTotalOC;
const totalAgrupamientoITLOC26 = new TotalAgrupamientoIngresosTotalOC;
const totalAgrupamientoITLNV24 = new TotalAgrupamientoIngresosTotalNV;
const totalAgrupamientoITLNV25 = new TotalAgrupamientoIngresosTotalNV;
const totalAgrupamientoITLNV26 = new TotalAgrupamientoIngresosTotalNV;
const totalAgrupamientoITLDC24 = new TotalAgrupamientoIngresosTotalDC;
const totalAgrupamientoITLDC25 = new TotalAgrupamientoIngresosTotalDC;
const totalAgrupamientoITLDC26 = new TotalAgrupamientoIngresosTotalDC;
const totalAgrupamientoIKE = new TotalAgrupamientoIKE;
const totalAgrupamientoIKE24 = new TotalAgrupamientoIKE;
const totalAgrupamientoIKE25 = new TotalAgrupamientoIKE;
const totalAgrupamientoIKE26 = new TotalAgrupamientoIKE;
const totalAgrupamientoIKF = new TotalAgrupamientoIKF;
const totalAgrupamientoIKF24 = new TotalAgrupamientoIKF;
const totalAgrupamientoIKF25 = new TotalAgrupamientoIKF;
const totalAgrupamientoIKF26 = new TotalAgrupamientoIKF;
const totalAgrupamientoIKM = new TotalAgrupamientoIKM;
const totalAgrupamientoIKM24 = new TotalAgrupamientoIKM;
const totalAgrupamientoIKM25 = new TotalAgrupamientoIKM;
const totalAgrupamientoIKM26 = new TotalAgrupamientoIKM;
const totalAgrupamientoIKA = new TotalAgrupamientoIKA;
const totalAgrupamientoIKA24 = new TotalAgrupamientoIKA;
const totalAgrupamientoIKA25 = new TotalAgrupamientoIKA;
const totalAgrupamientoIKA26 = new TotalAgrupamientoIKA;
const totalAgrupamientoIKMY = new TotalAgrupamientoIKMY;
const totalAgrupamientoIKMY24 = new TotalAgrupamientoIKMY;
const totalAgrupamientoIKMY25 = new TotalAgrupamientoIKMY;
const totalAgrupamientoIKMY26 = new TotalAgrupamientoIKMY;
const totalAgrupamientoIKJN = new TotalAgrupamientoIKJN;
const totalAgrupamientoIKJN24 = new TotalAgrupamientoIKJN;
const totalAgrupamientoIKJN25 = new TotalAgrupamientoIKJN;
const totalAgrupamientoIKJN26 = new TotalAgrupamientoIKJN;
const totalAgrupamientoIKJL = new TotalAgrupamientoIKJL;
const totalAgrupamientoIKJL24 = new TotalAgrupamientoIKJL;
const totalAgrupamientoIKJL25 = new TotalAgrupamientoIKJL;
const totalAgrupamientoIKJL26 = new TotalAgrupamientoIKJL;
const totalAgrupamientoIKAG = new TotalAgrupamientoIKAG;
const totalAgrupamientoIKAG24 = new TotalAgrupamientoIKAG;
const totalAgrupamientoIKAG25 = new TotalAgrupamientoIKAG;
const totalAgrupamientoIKAG26 = new TotalAgrupamientoIKAG;
const totalAgrupamientoIKS = new TotalAgrupamientoIKS;
const totalAgrupamientoIKS24 = new TotalAgrupamientoIKS;
const totalAgrupamientoIKS25 = new TotalAgrupamientoIKS;
const totalAgrupamientoIKS26 = new TotalAgrupamientoIKS;
const totalAgrupamientoIKOC = new TotalAgrupamientoIKOC;
const totalAgrupamientoIKOC24 = new TotalAgrupamientoIKOC;
const totalAgrupamientoIKOC25 = new TotalAgrupamientoIKOC;
const totalAgrupamientoIKOC26 = new TotalAgrupamientoIKOC;
const totalAgrupamientoIKNV = new TotalAgrupamientoIKNV;
const totalAgrupamientoIKNV24 = new TotalAgrupamientoIKNV;
const totalAgrupamientoIKNV25 = new TotalAgrupamientoIKNV;
const totalAgrupamientoIKNV26 = new TotalAgrupamientoIKNV;
const totalAgrupamientoIKDC = new TotalAgrupamientoIKDC;
const totalAgrupamientoIKDC24 = new TotalAgrupamientoIKDC;
const totalAgrupamientoIKDC25 = new TotalAgrupamientoIKDC;
const totalAgrupamientoIKDC26 = new TotalAgrupamientoIKDC;

//=====================TOTALES VIAJES/INGRESOS============================================
const viajesCargadosE = new ViajesCargadosE;
const viajesCargadosE24 = new ViajesCargadosE;
const viajesCargadosE25 = new ViajesCargadosE;
const viajesCargadosE26 = new ViajesCargadosE;
const viajesCargadosF = new ViajesCargadosF;
const viajesCargadosF24 = new ViajesCargadosF;
const viajesCargadosF25 = new ViajesCargadosF;
const viajesCargadosF26 = new ViajesCargadosF;
const viajesCargadosM = new ViajesCargadosM;
const viajesCargadosM24 = new ViajesCargadosM;
const viajesCargadosM25 = new ViajesCargadosM;
const viajesCargadosM26 = new ViajesCargadosM;
const viajesCargadosA = new ViajesCargadosA;
const viajesCargadosA24 = new ViajesCargadosA;
const viajesCargadosA25 = new ViajesCargadosA;
const viajesCargadosA26 = new ViajesCargadosA;
const viajesCargadosMY = new ViajesCargadosMY;
const viajesCargadosMY24 = new ViajesCargadosMY;
const viajesCargadosMY25 = new ViajesCargadosMY;
const viajesCargadosMY26 = new ViajesCargadosMY;
const viajesCargadosJN = new ViajesCargadosJN;
const viajesCargadosJN24 = new ViajesCargadosJN;
const viajesCargadosJN25 = new ViajesCargadosJN;
const viajesCargadosJN26 = new ViajesCargadosJN;
const viajesCargadosJL = new ViajesCargadosJL;
const viajesCargadosJL24 = new ViajesCargadosJL;
const viajesCargadosJL25 = new ViajesCargadosJL;
const viajesCargadosJL26 = new ViajesCargadosJL;
const viajesCargadosAG = new ViajesCargadosAG;
const viajesCargadosAG24 = new ViajesCargadosAG;
const viajesCargadosAG25 = new ViajesCargadosAG;
const viajesCargadosAG26 = new ViajesCargadosAG;
const viajesCargadosS = new ViajesCargadosS;
const viajesCargadosS24 = new ViajesCargadosS;
const viajesCargadosS25 = new ViajesCargadosS;
const viajesCargadosS26 = new ViajesCargadosS;
const viajesCargadosOC = new ViajesCargadosOC;
const viajesCargadosOC24 = new ViajesCargadosOC;
const viajesCargadosOC25 = new ViajesCargadosOC;
const viajesCargadosOC26 = new ViajesCargadosOC;
const viajesCargadosNV = new ViajesCargadosNV;
const viajesCargadosNV24 = new ViajesCargadosNV;
const viajesCargadosNV25 = new ViajesCargadosNV;
const viajesCargadosNV26 = new ViajesCargadosNV;
const viajesCargadosDC = new ViajesCargadosDC;
const viajesCargadosDC24 = new ViajesCargadosDC;
const viajesCargadosDC25 = new ViajesCargadosDC;
const viajesCargadosDC26 = new ViajesCargadosDC;
const totalVC = new TotalViajesCargados;
const totalVC24 = new TotalViajesCargados;
const totalVC25 = new TotalViajesCargados;
const totalVC26 = new TotalViajesCargados;
const totalOperacionIVC = new TotalOperacionIVC;
const totalOperacionIVC24 = new TotalOperacionIVC;
const totalOperacionIVC25 = new TotalOperacionIVC;
const totalOperacionIVC26 = new TotalOperacionIVC;
const totalOperacionKVC = new TotalOperacionKVC;
const totalOperacionKVC24 = new TotalOperacionKVC;
const totalOperacionKVC25 = new TotalOperacionKVC;
const totalOperacionKVC26 = new TotalOperacionKVC;
const totalIVCE = new TotalIngresosVCE;
const totalIVCE24 = new TotalIngresosVCE;
const totalIVCE25 = new TotalIngresosVCE;
const totalIVCE26 = new TotalIngresosVCE;
const totalIVCF = new TotalIngresosVCF;
const totalIVCF24 = new TotalIngresosVCF;
const totalIVCF25 = new TotalIngresosVCF;
const totalIVCF26 = new TotalIngresosVCF;
const totalIVCM = new TotalIngresosVCM;
const totalIVCM24 = new TotalIngresosVCM;
const totalIVCM25 = new TotalIngresosVCM;
const totalIVCM26 = new TotalIngresosVCM;
const totalIVCA = new TotalIngresosVCA;
const totalIVCA24 = new TotalIngresosVCA;
const totalIVCA25 = new TotalIngresosVCA;
const totalIVCA26 = new TotalIngresosVCA;
const totalIVCMY = new TotalIngresosVCMY;
const totalIVCMY24 = new TotalIngresosVCMY;
const totalIVCMY25 = new TotalIngresosVCMY;
const totalIVCMY26 = new TotalIngresosVCMY;
const totalIVCJN = new TotalIngresosVCJN;
const totalIVCJN24 = new TotalIngresosVCJN;
const totalIVCJN25 = new TotalIngresosVCJN;
const totalIVCJN26 = new TotalIngresosVCJN;
const totalIVCJL = new TotalIngresosVCJL;
const totalIVCJL24 = new TotalIngresosVCJL;
const totalIVCJL25 = new TotalIngresosVCJL;
const totalIVCJL26 = new TotalIngresosVCJL;
const totalIVCAG = new TotalIngresosVCAG;
const totalIVCAG24 = new TotalIngresosVCAG;
const totalIVCAG25 = new TotalIngresosVCAG;
const totalIVCAG26 = new TotalIngresosVCAG;
const totalIVCS = new TotalIngresosVCS;
const totalIVCS24 = new TotalIngresosVCS;
const totalIVCS25 = new TotalIngresosVCS;
const totalIVCS26 = new TotalIngresosVCS;
const totalIVCOC = new TotalIngresosVCOC;
const totalIVCOC24 = new TotalIngresosVCOC;
const totalIVCOC25 = new TotalIngresosVCOC;
const totalIVCOC26 = new TotalIngresosVCOC;
const totalIVCNV = new TotalIngresosVCNV;
const totalIVCNV24 = new TotalIngresosVCNV;
const totalIVCNV25 = new TotalIngresosVCNV;
const totalIVCNV26 = new TotalIngresosVCNV;
const totalIVCDC = new TotalIngresosVCDC;
const totalIVCDC24 = new TotalIngresosVCDC;
const totalIVCDC25 = new TotalIngresosVCDC;
const totalIVCDC26 = new TotalIngresosVCDC;
const totalKVCE = new TotalKilomeotrsVCE;
const totalKVCE24 = new TotalKilomeotrsVCE;
const totalKVCE25 = new TotalKilomeotrsVCE;
const totalKVCE26 = new TotalKilomeotrsVCE;
const totalKVCF = new TotalKilomeotrsVCF;
const totalKVCF24 = new TotalKilomeotrsVCF;
const totalKVCF25 = new TotalKilomeotrsVCF;
const totalKVCF26 = new TotalKilomeotrsVCF;
const totalKVCM = new TotalKilomeotrsVCM;
const totalKVCM24 = new TotalKilomeotrsVCM;
const totalKVCM25 = new TotalKilomeotrsVCM;
const totalKVCM26 = new TotalKilomeotrsVCM;
const totalKVCA = new TotalKilomeotrsVCA;
const totalKVCA24 = new TotalKilomeotrsVCA;
const totalKVCA25 = new TotalKilomeotrsVCA;
const totalKVCA26 = new TotalKilomeotrsVCA;
const totalKVCMY = new TotalKilomeotrsVCMY;
const totalKVCMY24 = new TotalKilomeotrsVCMY;
const totalKVCMY25 = new TotalKilomeotrsVCMY;
const totalKVCMY26 = new TotalKilomeotrsVCMY;
const totalKVCJN = new TotalKilomeotrsVCJN;
const totalKVCJN24 = new TotalKilomeotrsVCJN;
const totalKVCJN25 = new TotalKilomeotrsVCJN;
const totalKVCJN26 = new TotalKilomeotrsVCJN;
const totalKVCJL = new TotalKilomeotrsVCJL;
const totalKVCJL24 = new TotalKilomeotrsVCJL;
const totalKVCJL25 = new TotalKilomeotrsVCJL;
const totalKVCJL26 = new TotalKilomeotrsVCJL;
const totalKVCAG = new TotalKilomeotrsVCAG;
const totalKVCAG24 = new TotalKilomeotrsVCAG;
const totalKVCAG25 = new TotalKilomeotrsVCAG;
const totalKVCAG26 = new TotalKilomeotrsVCAG;
const totalKVCS = new TotalKilomeotrsVCS;
const totalKVCS24 = new TotalKilomeotrsVCS;
const totalKVCS25 = new TotalKilomeotrsVCS;
const totalKVCS26 = new TotalKilomeotrsVCS;
const totalKVCOC = new TotalKilomeotrsVCOC;
const totalKVCOC24 = new TotalKilomeotrsVCOC;
const totalKVCOC25 = new TotalKilomeotrsVCOC;
const totalKVCOC26 = new TotalKilomeotrsVCOC;
const totalKVCNV = new TotalKilomeotrsVCNV;
const totalKVCNV24 = new TotalKilomeotrsVCNV;
const totalKVCNV25 = new TotalKilomeotrsVCNV;
const totalKVCNV26 = new TotalKilomeotrsVCNV;
const totalKVCDC = new TotalKilomeotrsVCDC;
const totalKVCDC24 = new TotalKilomeotrsVCDC;
const totalKVCDC25 = new TotalKilomeotrsVCDC;
const totalKVCDC26 = new TotalKilomeotrsVCDC;

@Component({
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.scss'],
})
export class IndicadoresComponent implements OnInit {

  @ViewChild("chart1", { static: false }) chart1: DxChartComponent;
  @ViewChild("chart2", { static: false }) chart2: DxChartComponent;
  @ViewChild("chart3", { static: false }) chart3: DxChartComponent;
  @ViewChild("chart4", { static: false }) chart4: DxChartComponent;
  @ViewChild("chart5", { static: false }) chart5: DxChartComponent;
  @ViewChild("chart6", { static: false }) chart6: DxChartComponent;

  @ViewChild("chart1", { static: false }) chart124: DxChartComponent;
  @ViewChild("chart2", { static: false }) chart224: DxChartComponent;
  @ViewChild("chart3", { static: false }) chart324: DxChartComponent;
  @ViewChild("chart4", { static: false }) chart424: DxChartComponent;
  @ViewChild("chart5", { static: false }) chart524: DxChartComponent;
  @ViewChild("chart6", { static: false }) chart624: DxChartComponent;

  @ViewChild("chart1Test", { static: false }) chart1Test: DxChartComponent;
  @ViewChild("canvas", { static: false }) canvas;

  @ViewChild('selectTracto') selectTracto!: DxSelectBoxComponent;

  ingresos: ScoreCard[] = [];
  ingresos24: ScoreCard[] = [];
  ingresos25: ScoreCard[] = [];
  ingresos26: ScoreCard[] = [];

  ingresosTotal2024: ScoreCard[] = [];
  ingresosTotal2025: ScoreCard[] = [];
  ingresosTotal2026: ScoreCard[] = [];

  kilomentros: ScoreCard[] = [];
  kilomentros24: ScoreCard[] = [];
  kilomentros25: ScoreCard[] = [];
  kilomentros26: ScoreCard[] = [];

  ingresosKilometros: ScoreCard[] = [];
  ingresosKilometros24: ScoreCard[] = [];
  ingresosKilometros25: ScoreCard[] = [];
  ingresosKilometros26: ScoreCard[] = [];

  viajes: ScoreCard[] = [];
  viajes24: ScoreCard[] = [];
  viajes25: ScoreCard[] = [];
  viajes26: ScoreCard[] = [];

  kilometroViajes: ScoreCard[] = [];
  kilometroViajes24: ScoreCard[] = [];
  kilometroViajes25: ScoreCard[] = [];
  kilometroViajes26: ScoreCard[] = [];
  
  ingresoViajes: ScoreCard[] = [];
  ingresoViajes24: ScoreCard[] = [];
  ingresoViajes25: ScoreCard[] = [];
  ingresoViajes26: ScoreCard[] = [];

  precioMeta: ScoreCard[] = [];
  precioMeta24: ScoreCard[] = [];
  precioMeta25: ScoreCard[] = [];
  precioMeta26: ScoreCard[] = [];

  viajesCargados: ScoreCard[] = [];
  viajesCargados24: ScoreCard[] = [];
  viajesCargados25: ScoreCard[] = [];
  viajesCargados26: ScoreCard[] = [];

  operadoresUDN: ScoreCard[] = [];
  operadoresUDN24: ScoreCard[] = [];
  operadoresUDN25: ScoreCard[] = [];
  operadoresUDN26: ScoreCard[] = [];

  ingresoOperador: ScoreCard[] = [];
  ingresoOperador24: ScoreCard[] = [];
  ingresoOperador25: ScoreCard[] = [];
  ingresoOperador26: ScoreCard[] = [];

  ingresoOpProm24: any[] = [];
  ingresoOpProm25: any[] = [];
  ingresoOpProm26: any[] = [];

  graficaIXO24: any[] = [];
  graficaIXO25: any[] = [];
  graficaIXO26: any[] = [];
  graficaOP24: any[] = [];
  graficaOP25: any[] = [];
  graficaOP26: any[] = [];

  chartData: any[] = [];

  kmsXOperacion: Chart[] = [];
  kmsXUdn: Chart[] = [];
  porXCargadosUdn: Chart[] = [];
  porXFlotaOperacion: Chart[] = [];
  porXFlotaUdn: Chart[] = [];
  porXOperacion: Chart[] = [];

  kmsXOperacion24: Chart[] = [];
  kmsXOperacionDescription24: ChartDescription[] = [];
  kmsXUdn24: Chart[] = [];
  KmsXUdnDescription24: ChartDescription[] = [];
  kmsXUdnTotal24: ChartDescription[] = [];
  porXCargadosUdn24: Chart[] = [];
  porXCargadosUdnDescription24: ChartDescription[] = [];
  porXFlotaOperacion24: Chart[] = [];
  porXFlotaOperacionDescription24: ChartDescription[] = [];
  porXFlotaUdn24: Chart[] = [];
  porXFlotaUdnDescription24: ChartDescription[] = [];
  porXOperacion24: Chart[] = [];
  porXOperacionDescription24: ChartDescription[] = [];

  kmsXOperacion25: Chart[] = [];
  kmsXOperacionDescription25: ChartDescription[] = [];
  kmsXUdn25: Chart[] = [];
  KmsXUdnDescription25: ChartDescription[] = [];
  kmsXUdnTotal25: ChartDescription[] = [];
  porXCargadosUdn25: Chart[] = [];
  porXCargadosUdnDescription25: ChartDescription[] = [];
  porXFlotaOperacion25: Chart[] = [];
  porXFlotaOperacionDescription25: ChartDescription[] = [];
  porXFlotaUdn25: Chart[] = [];
  porXFlotaUdnDescription25: ChartDescription[] = [];
  porXOperacion25: Chart[] = [];
  porXOperacionDescription25: ChartDescription[] = [];

  kmsXOperacion26: Chart[] = [];
  kmsXOperacionDescription26: ChartDescription[] = [];
  kmsXUdn26: Chart[] = [];
  KmsXUdnDescription26: ChartDescription[] = [];
  kmsXUdnTotal26: ChartDescription[] = [];
  porXCargadosUdn26: Chart[] = [];
  porXCargadosUdnDescription26: ChartDescription[] = [];
  porXFlotaOperacion26: Chart[] = [];
  porXFlotaOperacionDescription26: ChartDescription[] = [];
  porXFlotaUdn26: Chart[] = [];
  porXFlotaUdnDescription26: ChartDescription[] = [];
  porXOperacion26: Chart[] = [];
  porXOperacionDescription26: ChartDescription[] = [];

  periodoVariacion: string = "";

  paginacion: number = 0;
  paginacionKV: number = 0;
  expandGroup: boolean = true;
  expandGroupKV: boolean = true;

  tipoOperacion: any[] = [
    { id: 1, nombre: 'CAJA SECA' },
    { id: 2, nombre: 'GONDOLA' },
    { id: 3, nombre: 'TOLVA GRANEL' },
    { id: 4, nombre: 'ENCORITNADO' },
    { id: 5, nombre: 'GRADO ALIMENT' },
  ];

  customOperations: Array<any>;
  popupPosition: any;

  kmsMensykaes: KMSMensuales[] = [];
  kmsMensuales: any[] = [];
  periodo: any[] = [
    { id: 202604, periodo: 202604 },
    { id: 202603, periodo: 202603 },
    { id: 202602, periodo: 202602 },
    { id: 202601, periodo: 202601 },
    { id: 202512, periodo: 202512 },
    { id: 202511, periodo: 202511 },
    { id: 202510, periodo: 202510 },
    { id: 202509, periodo: 202509 },
    { id: 202508, periodo: 202508 },
    { id: 202507, periodo: 202507 },
    { id: 202506, periodo: 202506 },
    { id: 202505, periodo: 202505 },
    { id: 202504, periodo: 202504 },
    { id: 202503, periodo: 202503 },
    { id: 202502, periodo: 202502 },
    { id: 202501, periodo: 202501 },
    { id: 202412, periodo: 202412 },
    { id: 202411, periodo: 202411 },
    { id: 202410, periodo: 202410 },
    { id: 202409, periodo: 202409 },
    { id: 202408, periodo: 202408 },
    { id: 202407, periodo: 202407 },
    { id: 202406, periodo: 202406 },
    { id: 202405, periodo: 202405 },
    { id: 202404, periodo: 202404 },
    { id: 202403, periodo: 202403 },
    { id: 202402, periodo: 202402 },
    { id: 202401, periodo: 202401 },
    { id: 202312, periodo: 202312 },
    { id: 202311, periodo: 202311 },
    { id: 202310, periodo: 202310 },
    { id: 202309, periodo: 202309 },
    { id: 202308, periodo: 202308 },
    { id: 202307, periodo: 202307 },
    { id: 202306, periodo: 202306 },
    { id: 202305, periodo: 202305 },
    { id: 202304, periodo: 202304 },
    { id: 202303, periodo: 202303 },
    { id: 202302, periodo: 202302 },
    { id: 202301, periodo: 202301 },
  ];

  periodoAC: any[] = [
    { id: 202401, periodo: 202401 },
    { id: 202402, periodo: 202402 },
    { id: 202403, periodo: 202403 },
    { id: 202404, periodo: 202404 },
    { id: 202405, periodo: 202405 },
    { id: 202406, periodo: 202406 },
    { id: 202407, periodo: 202407 },
    { id: 202408, periodo: 202408 },
    { id: 202409, periodo: 202409 },
    { id: 202410, periodo: 202410 },
    { id: 202411, periodo: 202411 },
    { id: 202412, periodo: 202412 },
  ];

  periodoAC25: any[] = [
    { id: 202501, periodo: 202501 },
    { id: 202502, periodo: 202502 },
    { id: 202503, periodo: 202503 },
    { id: 202504, periodo: 202504 },
    { id: 202505, periodo: 202505 },
    { id: 202506, periodo: 202506 },
    { id: 202507, periodo: 202507 },
    { id: 202508, periodo: 202508 },
    { id: 202509, periodo: 202509 },
    { id: 202510, periodo: 202510 },
    { id: 202511, periodo: 202511 },
    { id: 202512, periodo: 202512 },
  ];

  periodoAC26: any[] = [
    { id: 202601, periodo: 202601 },
    { id: 202602, periodo: 202602 },
    { id: 202603, periodo: 202603 },
    { id: 202604, periodo: 202604 },
    { id: 202605, periodo: 202605 },
    { id: 202606, periodo: 202606 },
    { id: 202607, periodo: 202607 },
    { id: 202608, periodo: 202608 },
    { id: 202609, periodo: 202609 },
    { id: 202610, periodo: 202610 },
    { id: 202611, periodo: 202611 },
    { id: 202612, periodo: 202612 },
  ];

  periodoIpC: any[] = [
    { id: 202604, periodo: 202604 },
    { id: 202603, periodo: 202603 },
    { id: 202602, periodo: 202602 },
    { id: 202601, periodo: 202601 },
    { id: 202512, periodo: 202512 },
    { id: 202511, periodo: 202511 },
    { id: 202510, periodo: 202510 },
    { id: 202509, periodo: 202509 },
    { id: 202508, periodo: 202508 },
    { id: 202507, periodo: 202507 },
    { id: 202506, periodo: 202506 },
    { id: 202505, periodo: 202505 },
    { id: 202504, periodo: 202504 },
    { id: 202503, periodo: 202503 },
    { id: 202502, periodo: 202502 },
    { id: 202501, periodo: 202501 },
    { id: 202412, periodo: 202412 },
    { id: 202411, periodo: 202411 },
    { id: 202410, periodo: 202410 },
    { id: 202409, periodo: 202409 },
    { id: 202408, periodo: 202408 },
    { id: 202407, periodo: 202407 },
    { id: 202406, periodo: 202406 },
    { id: 202405, periodo: 202405 },
    { id: 202404, periodo: 202404 },
    { id: 202403, periodo: 202403 },
    { id: 202402, periodo: 202402 },
    { id: 202401, periodo: 202401 },
    { id: 202312, periodo: 202312 },
    { id: 202311, periodo: 202311 },
    { id: 202310, periodo: 202310 },
    { id: 202309, periodo: 202309 },
    { id: 202308, periodo: 202308 },
    { id: 202307, periodo: 202307 },
    { id: 202306, periodo: 202306 },
    { id: 202305, periodo: 202305 },
    { id: 202304, periodo: 202304 },
    { id: 202303, periodo: 202303 },
    { id: 202302, periodo: 202302 },
    { id: 202301, periodo: 202301 },
  ];

  anio: any[] = [
    { id: 2024, anio: 2024 },
    { id: 2025, anio: 2025 },
    { id: 2026, anio: 2026 },
  ];
  selectedPeriodo: number = 0;
  selectedPerAC: number = 0;
  selectedPerAC25: number = 0;
  selectedPerAC26: number = 0;
  selectedIpC: number = 0;
  selectedIpCAnual: number = 0;

  loadingVisible = false;

  graficaModel: GraficaIngresoO[] = [];
  subtalesGrafica: SubtotalesKCV;

  collapseGroup: boolean;

  graficaSueldoOp: any[] = [];
  graficaSueldoOp2025: any[] = [];
  graficaSueldoOp2026: any[] = [];
  graficaSueldoOpAc: any[] = [];
  graficaSueldoOpAc2025: any[] = [];
  graficaSueldoOpAc2026: any[] = [];

  arrUnidadesNegocio: any[] = [];
  arrTractos: string[] = [];

  mesSeleccionado: number = 0;
  anioSeleccionado: number = 0;
  udnSeleccionado: number[] = [];
  tractoSeleccionado: string = '';

  sueldoDetalle: any[] = [];

  sueldoDetalle25: any[] = [];
  sueldoDetalle26: any[] = [];

  graficaIpC: any[] = [];
  graficaIpCAnual: any[] = [];
  IpCViajes: any[] = [];
  IpCViajesAnual: any[] = [];

  arrMeses: any[] = [
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
  arrAnos: any[] = [
    { idAnio: 2024, anio: "2024" },
    { idAnio: 2023, anio: "2023" },
    { idAnio: 2022, anio: "2022" },
    { idAnio: 2021, anio: "2021" },
  ];

//=============================Customize Export Excel===============================================
  customTotalKE= new CustomTotalKE;
  customTotalKF = new CustomTotalKF;
  customTotalKM = new CustomTotalKM;
  customTotalKA = new CustomTotalKA;
  customTotalKMY = new CustomTotalKMY;
  customTotalKJN = new CustomTotalKJN;
  customTotalKJL = new CustomTotalKJL;
  customTotalKAG = new CustomTotalKAG;
  customTotalKS = new CustomTotalKS;
  customTotalKOC = new CustomTotalKOC;
  customTotalKNV = new CustomTotalKNV;
  customTotalKDC = new CustomTotalKDC;

  customTArrayL = new CustomTArrayL;

  oilProductionData = [];

  lineStyleValue: string;

  autoBreaksEnabledValue = true;
  breaksCountValue: number;

  soEne: number = 0;
  soFeb: number = 0;
  soMar: number = 0;
  soAbr: number = 0;
  soMay: number = 0;
  soJun: number = 0;

  sdEne: number = 0;
  sdFeb: number = 0;
  sdMar: number = 0;
  sdAbr: number = 0;
  sdMay: number = 0;
  sdJun: number = 0;

  totalOperaSO: number = 0;
  totalSueldoDSO: number = 0;

  autogrouping = false;

  soEneAC: number = 0;
  soFebAC: number = 0;
  soMarAC: number = 0;
  soAbrAC: number = 0;
  soMayAC: number = 0;
  soJunAC: number = 0;

  sdEneAC: number = 0;
  sdFebAC: number = 0;
  sdMarAC: number = 0;
  sdAbrAC: number = 0;
  sdMayAC: number = 0;
  sdJunAC: number = 0;

  totalOperaSOAC: number = 0;
  totalSueldoDSOAC: number = 0;

  autogroupingAC = false;

  screen = (window.innerWidth > 0) ? window.innerWidth : screen.width;

  constructor(
    private indicadorService: IndicadoresService
  ) {
    this.popupPosition = {
      of: window, at: 'top', my: 'top', offset: { y: 10 },
    };
    
    this.customOperations = [{
      name: 'weekends',
      caption: 'Weekends',
      dataTypes: ['date'],
      icon: 'check',
      hasValue: false,
      calculateFilterExpression() {
        return [[getOrderDay, '=', 0], 'or', [getOrderDay, '=', 6]];
      },
    }];

    this.calcularPorcentajes = this.calcularPorcentajes.bind(this);
    
  }

  customizeTooltip = ({ points, argumentText }) => ({
    html: `<div><div class='tooltip-header'>${
      argumentText}</div>`
                + '<div class=\'tooltip-body\'><div class=\'series-name\'>'
                + `<span class='top-series-name'>${points[0].seriesName}</span>`
                + ': </div><div class=\'value-text\'>'
                + `<span class='top-series-value'>${points[0].valueText}</span>`
                + '</div><div class=\'series-name\'>'
                + `<span class='bottom-series-name'>${points[1].seriesName}</span>`
                + ': </div><div class=\'value-text\'>'
                + `<span class='bottom-series-value'>${points[1].valueText}</span>`
                + '% </div></div></div>',
  });


  ngOnInit(): void {
    this.getScoreCard2026();
    this.getGraficaIO26();
    this.getIndicadoresChart26();
    // this.getSueldoBase25();
    this.getSueldoOpAc26();
    this.getUnidadesNegocio();
    this.getTractos();
  }

  ngAfterViewInit(): void {}

  customizeSeries(valueFromNameField: number) {
    return valueFromNameField === 2009
      ? { type: 'line', label: { visible: true }, color: '#ff3f7a' } : {};
  }

  //=================GETS===========================
  cuautitlan: number;
  guadalajara: number;
  hermosillo: number;
  mexicali: number;
  orizaba: number;
  ramisArispe: number;
  total: number;
  tultitlan: number;

  cuautitlanKV: number;
  guadalajaraKV: number;
  hermosilloKV: number;
  mexicaliKV: number;
  orizabaKV: number;
  ramisArispeKV: number;
  totalKV: number;
  tultitlanKV: number;

  /*=========================GET APIS =============================*/
  getUnidadesNegocio() {
    this.indicadorService.getUnidadesNegocio().subscribe(res => {
      this.arrUnidadesNegocio = res.data;

    });

  }

  getTractos() {
    if (this.anioSeleccionado && this.mesSeleccionado && this.udnSeleccionado) {
      this.arrTractos = [];
      this.selectTracto.value = '';
      this.indicadorService.getTractos(this.anioSeleccionado, this.mesSeleccionado, this.udnSeleccionado).subscribe(res => {
        this.arrTractos = res.data.tractos;

      });
    }
  }

  getScoreCard(){
    this.loadingVisible = true;
    this.indicadorService.getScoreCard().subscribe(data => {
      
// ====================================INGRESOS======================================================================================================
      this.ingresos = data.data.scIng;
      this.ingresos.sort((a, b) => (a.orden < b.orden ? -1 : 1))
// ====================================KILOMETROS====================================================================================================
      this.kilomentros = data.data.scKms;      
      this.kilomentros.sort((a, b) => (a.orden < b.orden ? -1 : 1));
// ====================================VIAJES========================================================================================================
      this.viajes = data.data.scViajes;
      this.viajes.sort((a, b) => (a.orden < b.orden ? -1 : 1));
// ====================================VIAJES CARGADOS===============================================================================================
      this.viajesCargados = data.data.scViajesC;      
      this.viajesCargados.sort((a, b) => (a.orden < b.orden ? -1 : 1));
// ====================================INGRESO / KILOMETROS==========================================================================================
      this.ingresosKilometros = data.data.scIngXKm;
      this.ingresosKilometros.sort((a, b) => (a.orden < b.orden ? -1 : 1));
// ====================================KILOMETROS / VIAJES===========================================================================================
      this.kilometroViajes = data.data.scKmsViaje;      
      this.kilometroViajes.sort((a, b) => (a.orden < b.orden ? -1 : 1));
// ====================================INGRESO / VIAJES==============================================================================================
      this.ingresoViajes = data.data.scIngrViaje;      
      this.ingresoViajes.sort((a, b) => (a.orden < b.orden ? -1 : 1));
// ====================================OPERADORES UDN ===============================================================================================  
      this.operadoresUDN = data.data.scOperadores;
// ====================================INGRESO POR OPERADOR =========================================================================================      
      this.ingresoOperador = data.data.scIngrXOperador;

      this.precioMeta = data.data.scPrecioMeta;

      var myPrecioM = data.data.scPrecioMeta;
      for (var i = 0; i<myPrecioM.length; i++){
        this.cuautitlan = myPrecioM[i].cuatitlan;
        this.tultitlan = myPrecioM[i].tultitlan;
        this.guadalajara = myPrecioM[i].guadalajara;
        this.hermosillo = myPrecioM[i].hermosillo;
        this.mexicali = myPrecioM[i].mexicali;
        this.orizaba = myPrecioM[i].orizaba;
        this.ramisArispe = myPrecioM[i].ramosArizpe;
        this.total = myPrecioM[i].total;


        this.cuautitlanKV = myPrecioM[i].cuatitlan;
        this.tultitlanKV = myPrecioM[i].tultitlan;
        this.guadalajaraKV = myPrecioM[i].guadalajara;
        this.hermosilloKV = myPrecioM[i].hermosillo;
        this.mexicaliKV = myPrecioM[i].mexicali;
        this.orizabaKV = myPrecioM[i].orizaba;
        this.ramisArispeKV = myPrecioM[i].ramosArizpe;
        this.totalKV = myPrecioM[i].total;
      }

      this.expandGroup = true;
      this.expandGroupKV = true;

      this.loadingVisible = false;

    })
  }

  getScoreCard2024(){
    this.loadingVisible = true;
    this.indicadorService.getScoreCard2024().subscribe(data => {
// ====================================INGRESOS TOTAL======================================================================================================
      this.ingresosTotal2024 = data.data.scIngTotal;
// ====================================INGRESOS======================================================================================================
      const myingresos24 = data.data.scIng.filter((word) => word.mes !== "");      
      this.ingresos24 = myingresos24//data.data.scIng;
      ////(this.ingresos24)
      // this.ingresos24.sort((a, b) => (a.orden < b.orden ? -1 : 1))
// ====================================KILOMETROS====================================================================================================
      const mykilomentros24 = data.data.scKms.filter((word) => word.mes !== "");      
      this.kilomentros24 = mykilomentros24//data.data.scKms;      
      //this.kilomentros24.sort((a, b) => (a.orden < b.orden ? -1 : 1));
// ====================================VIAJES========================================================================================================
      const myviajes24 = data.data.scViajes.filter((word) => word.mes !== "");      
      this.viajes24 = myviajes24//data.data.scViajes;
      //this.viajes24.sort((a, b) => (a.orden < b.orden ? -1 : 1));
// ====================================VIAJES CARGADOS===============================================================================================
      const myviajesCargados24 = data.data.scViajesC.filter((word) => word.mes !== "");      
      this.viajesCargados24 = myviajesCargados24//data.data.scViajesC;      
      //this.viajesCargados24.sort((a, b) => (a.orden < b.orden ? -1 : 1));
// ====================================INGRESO / KILOMETROS==========================================================================================
      const myingresosKilometros24 = data.data.scIngXKm.filter((word) => word.mes !== "");      
      this.ingresosKilometros24 = myingresosKilometros24//data.data.scIngXKm;
      //this.ingresosKilometros24.sort((a, b) => (a.orden < b.orden ? -1 : 1));
// ====================================KILOMETROS / VIAJES===========================================================================================
      const mykilometroViajes24 = data.data.scKmsViaje.filter((word) => word.mes !== "");            
      this.kilometroViajes24 = mykilometroViajes24//data.data.scKmsViaje;      
      //this.kilometroViajes24.sort((a, b) => (a.orden < b.orden ? -1 : 1));
// ====================================INGRESO / VIAJES==============================================================================================
      const myingresoViajes24 = data.data.scIngrViaje.filter((word) => word.mes !== "");            
      this.ingresoViajes24 = myingresoViajes24//data.data.scIngrViaje
      //this.ingresoViajes24.sort((a, b) => (a.orden < b.orden ? -1 : 1));
// ====================================OPERADORES UDN ===============================================================================================  
      this.operadoresUDN24 = data.data.scOperadores// data.data.scOperadores;
// ====================================INGRESO POR OPERADOR =========================================================================================      
      const myIO2024 = data.data.scIngrXOperador.filter((word) => word.mes !== "(0)");
      this.ingresoOperador24 = myIO2024//data.data.scIngrXOperador;   
      ////(this.ingresoOperador24) 
      
      const myIOP2024 = data.data.scIngrXOperadorProm.filter((word) => word.mes !== "(0)");
      this.ingresoOpProm24 = myIOP2024//data.data.scIngrXOperadorProm;
 
      this.precioMeta24 = data.data.scPrecioMeta;

      var myPrecioM = data.data.scPrecioMeta;
      for (var i = 0; i<myPrecioM.length; i++){
        this.cuautitlan = myPrecioM[i].cuatitlan;
        this.tultitlan = myPrecioM[i].tultitlan;
        this.guadalajara = myPrecioM[i].guadalajara;
        this.hermosillo = myPrecioM[i].hermosillo;
        this.mexicali = myPrecioM[i].mexicali;
        this.orizaba = myPrecioM[i].orizaba;
        this.ramisArispe = myPrecioM[i].ramosArizpe;
        this.total = myPrecioM[i].total;


        this.cuautitlanKV = myPrecioM[i].cuatitlan;
        this.tultitlanKV = myPrecioM[i].tultitlan;
        this.guadalajaraKV = myPrecioM[i].guadalajara;
        this.hermosilloKV = myPrecioM[i].hermosillo;
        this.mexicaliKV = myPrecioM[i].mexicali;
        this.orizabaKV = myPrecioM[i].orizaba;
        this.ramisArispeKV = myPrecioM[i].ramosArizpe;
        this.totalKV = myPrecioM[i].total;
      }

      this.expandGroup = true;
      this.expandGroupKV = true;
      this.loadingVisible = false;

    })
  }

  getScoreCard2025(){
    // this.loadingVisible = true;
    this.indicadorService.getScoreCard2025().subscribe(data => {
// ====================================INGRESOS TOTAL======================================================================================================
      this.ingresosTotal2025 = data.data.scIngTotal;
// ====================================INGRESOS======================================================================================================
      this.ingresos25 = data.data.scIng;
      // this.ingresos25.sort((a, b) => (a.orden < b.orden ? -1 : 1))
// ====================================KILOMETROS====================================================================================================
      this.kilomentros25 = data.data.scKms;      
      //this.kilomentros25.sort((a, b) => (a.orden < b.orden ? -1 : 1));
// ====================================VIAJES========================================================================================================
      this.viajes25 = data.data.scViajes;
      //this.viajes25.sort((a, b) => (a.orden < b.orden ? -1 : 1));
// ====================================VIAJES CARGADOS===============================================================================================
      this.viajesCargados25 = data.data.scViajesC;      
      //this.viajesCargados25.sort((a, b) => (a.orden < b.orden ? -1 : 1));
// ====================================INGRESO / KILOMETROS==========================================================================================
      this.ingresosKilometros25 = data.data.scIngXKm;
      //this.ingresosKilometros25.sort((a, b) => (a.orden < b.orden ? -1 : 1));
// ====================================KILOMETROS / VIAJES===========================================================================================
      this.kilometroViajes25 = data.data.scKmsViaje;      
      //this.kilometroViajes25.sort((a, b) => (a.orden < b.orden ? -1 : 1));
// ====================================INGRESO / VIAJES==============================================================================================
      this.ingresoViajes25 = data.data.scIngrViaje
      //this.ingresoViajes25.sort((a, b) => (a.orden < b.orden ? -1 : 1));
// ====================================OPERADORES UDN ===============================================================================================  
      this.operadoresUDN25 = data.data.scOperadores// data.data.scOperadores;
// ====================================INGRESO POR OPERADOR =========================================================================================      
      this.ingresoOperador25 = data.data.scIngrXOperador;   
      ////(this.ingresoOperador25) 
      
      this.ingresoOpProm25 = data.data.scIngrXOperadorProm;
 
      this.precioMeta25 = data.data.scPrecioMeta;

      var myPrecioM = data.data.scPrecioMeta;
      for (var i = 0; i<myPrecioM.length; i++){
        this.cuautitlan = myPrecioM[i].cuatitlan;
        this.tultitlan = myPrecioM[i].tultitlan;
        this.guadalajara = myPrecioM[i].guadalajara;
        this.hermosillo = myPrecioM[i].hermosillo;
        this.mexicali = myPrecioM[i].mexicali;
        this.orizaba = myPrecioM[i].orizaba;
        this.ramisArispe = myPrecioM[i].ramosArizpe;
        this.total = myPrecioM[i].total;


        this.cuautitlanKV = myPrecioM[i].cuatitlan;
        this.tultitlanKV = myPrecioM[i].tultitlan;
        this.guadalajaraKV = myPrecioM[i].guadalajara;
        this.hermosilloKV = myPrecioM[i].hermosillo;
        this.mexicaliKV = myPrecioM[i].mexicali;
        this.orizabaKV = myPrecioM[i].orizaba;
        this.ramisArispeKV = myPrecioM[i].ramosArizpe;
        this.totalKV = myPrecioM[i].total;
      }

      this.expandGroup = true;
      this.expandGroupKV = true;

      this.loadingVisible = false;

    })
  }

  getScoreCard2026(){
    // this.loadingVisible = true;
    this.indicadorService.getScoreCard2026().subscribe(data => {
// ====================================INGRESOS TOTAL======================================================================================================
      this.ingresosTotal2026 = data.data.scIngTotal;
// ====================================INGRESOS======================================================================================================
      this.ingresos26 = data.data.scIng;
      // this.ingresos26.sort((a, b) => (a.orden < b.orden ? -1 : 1))
// ====================================KILOMETROS====================================================================================================
      this.kilomentros26 = data.data.scKms;      
      //this.kilomentros26.sort((a, b) => (a.orden < b.orden ? -1 : 1));
// ====================================VIAJES========================================================================================================
      this.viajes26 = data.data.scViajes;
      //this.viajes26.sort((a, b) => (a.orden < b.orden ? -1 : 1));
// ====================================VIAJES CARGADOS===============================================================================================
      this.viajesCargados26 = data.data.scViajesC;      
      //this.viajesCargados26.sort((a, b) => (a.orden < b.orden ? -1 : 1));
// ====================================INGRESO / KILOMETROS==========================================================================================
      this.ingresosKilometros26 = data.data.scIngXKm;
      //this.ingresosKilometros26.sort((a, b) => (a.orden < b.orden ? -1 : 1));
// ====================================KILOMETROS / VIAJES===========================================================================================
      this.kilometroViajes26 = data.data.scKmsViaje;      
      //this.kilometroViajes26.sort((a, b) => (a.orden < b.orden ? -1 : 1));
// ====================================INGRESO / VIAJES==============================================================================================
      this.ingresoViajes26 = data.data.scIngrViaje
      //this.ingresoViajes26.sort((a, b) => (a.orden < b.orden ? -1 : 1));
// ====================================OPERADORES UDN ===============================================================================================  
      this.operadoresUDN26 = data.data.scOperadores// data.data.scOperadores;
// ====================================INGRESO POR OPERADOR =========================================================================================      
      this.ingresoOperador26 = data.data.scIngrXOperador;   
      //(this.ingresoOperador26) 
      
      this.ingresoOpProm26 = data.data.scIngrXOperadorProm;
      //(this.ingresoOpProm26)
 
      this.precioMeta26 = data.data.scPrecioMeta;

      var myPrecioM = data.data.scPrecioMeta;
      for (var i = 0; i<myPrecioM.length; i++){
        this.cuautitlan = myPrecioM[i].cuatitlan;
        this.tultitlan = myPrecioM[i].tultitlan;
        this.guadalajara = myPrecioM[i].guadalajara;
        this.hermosillo = myPrecioM[i].hermosillo;
        this.mexicali = myPrecioM[i].mexicali;
        this.orizaba = myPrecioM[i].orizaba;
        this.ramisArispe = myPrecioM[i].ramosArizpe;
        this.total = myPrecioM[i].total;


        this.cuautitlanKV = myPrecioM[i].cuatitlan;
        this.tultitlanKV = myPrecioM[i].tultitlan;
        this.guadalajaraKV = myPrecioM[i].guadalajara;
        this.hermosilloKV = myPrecioM[i].hermosillo;
        this.mexicaliKV = myPrecioM[i].mexicali;
        this.orizabaKV = myPrecioM[i].orizaba;
        this.ramisArispeKV = myPrecioM[i].ramosArizpe;
        this.totalKV = myPrecioM[i].total;
      }

      this.expandGroup = true;
      this.expandGroupKV = true;

    })
  }

  getkmsMensuales(){
    const request = new Promise((resolve, reject) => {
    this.indicadorService.getkmsMensuales(this.selectedPeriodo).subscribe(data => {
      this.kmsMensuales = data.data;
      this.kmsMensuales.sort((a, b) => (a.udN < b.udN ? -1 : 1));
      //(this.kmsMensuales)
     
      this.loadingVisible = false;
    })

    })
    return request;
  }

  getIndicadoresChart(){
    this.indicadorService.getIndicadoresChart().subscribe(data => {
/*==========================MILLONES DE KMS RECORRIDOS POR TIPO DE OPERACIÓN=============================*/
      this.kmsXOperacion = data.data.kmsXOperacion;
      this.kmsXOperacion.sort((a, b) => (a.periodo < b.periodo ? -1 : 1)); 
/*==========================MILLONES KMS RECORRIDOS UDN==================================================*/
      this.kmsXUdn = data.data.kmsXUDN;
      this.kmsXUdn.sort((a, b) => (a.periodo < b.periodo ? -1 : 1));
/*===========================% KMS POR TIPO OPERACIÓN===================================================*/
      this.porXOperacion = data.data.porXOperacion;
      this.porXOperacion.sort((a, b) => (a.periodo < b.periodo ? -1 : 1));
/*===========================*% KMS CARGADOS UDN========================================================*/
      this.porXCargadosUdn = data.data.porXCargadosUDN;
      this.porXCargadosUdn.sort((a, b) => (a.periodo < b.periodo ? -1 : 1));
/*===========================% FLOTA ACTIVA TIPO OPERACIÓN==============================================*/
      this.porXFlotaOperacion = data.data.porXFlotaOperacion;
      this.porXFlotaOperacion.sort((a, b) => (a.periodo < b.periodo ? -1 : 1));
/*===========================% FLOTA ACTIVA UDN=========================================================*/
      this.porXFlotaUdn = data.data.porXFlotaUDN;
      this.porXFlotaUdn.sort((a, b) => (a.periodo < b.periodo ? -1 : 1));
    })
  }

  getIndicadoresChart24(){
    this.indicadorService.getIndicadoresChart24().subscribe(data => {
      // //(data.data)
      this.periodoVariacion = data.data.periodoVariacion;
      
/*==========================MILLONES DE KMS RECORRIDOS POR TIPO DE OPERACIÓN=============================*/
      var myKMSO = data.data.varKmsXOperacion;
      this.kmsXOperacion24 = data.data.kmsXOperacion;
      this.kmsXOperacion24.sort((a, b) => (a.periodo < b.periodo ? -1 : 1)); 
      // //(this.kmsXOperacion24)
      
      const dataKMSO = data.data.varKmsXOperacion.filter((word) => word.clasificacion !== "KMS RECORRIDOS");
      this.kmsXOperacionDescription24 = dataKMSO;
      this.kmsXOperacionDescription24.sort((a, b) => (a.clasificacion < b.clasificacion ? -1 : 1));

      for(let i =0; i<myKMSO.length; i++){
        var myvalue = Math.trunc(myKMSO[i].kmsDiferencia);

        var myFormat = myvalue.toString().split(".");
        myFormat[0] = myFormat[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        
        myKMSO[i].kmsDiferencia = myFormat.join("");

      }
/*==========================MILLONES KMS RECORRIDOS UDN==================================================*/
      var myKMSRUDN = data.data.varKmsXUDN

      this.kmsXUdn24 = data.data.kmsXUDN;
      this.kmsXUdn24.sort((a, b) => (a.periodo < b.periodo ? -1 : 1));
      this.KmsXUdnDescription24 = data.data.varKmsXUDN
      this.KmsXUdnDescription24.sort((a, b) => (a.clasificacion < b.clasificacion ? -1 : 1));

      var myTotal = []
      myTotal.push(data.data.varKmsXOperacion[0])
      this.kmsXUdnTotal24 = myTotal;

      for(let i =0; i<myKMSRUDN.length; i++){
        var myvalue = Math.trunc(myKMSRUDN[i].kmsDiferencia);

        var myFormat = myvalue.toString().split(".");
        myFormat[0] = myFormat[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        
        myKMSRUDN[i].kmsDiferencia = myFormat.join("");
      }
/*===========================% KMS POR TIPO OPERACIÓN===================================================*/
      var myKMSTOP = data.data.varPorXOperacion;

      this.porXOperacion24 = data.data.porXOperacion;
      this.porXOperacion24.sort((a, b) => (a.periodo < b.periodo ? -1 : 1));
      this.porXOperacionDescription24 = data.data.varPorXOperacion;
      this.porXOperacionDescription24.sort((a, b) => (a.clasificacion < b.clasificacion ? -1 : 1));

      for(let i =0; i<myKMSTOP.length; i++){

        var option = {
          style: 'percent',
          minimumFractionDigits: 1,
          maximumFractionDigits: 1
        };
        
        var formatter = new Intl.NumberFormat("en-US", option);
        var discountFormat = formatter.format(myKMSTOP[i].kmsDiferencia);
        
        myKMSTOP[i].kmsDiferencia = discountFormat;
      }

/*===========================*% KMS CARGADOS UDN========================================================*/
      var myKMSCUDN = data.data.varPorXCargadosUDN;
      this.porXCargadosUdn24 = data.data.porXCargadosUDN;
      this.porXCargadosUdn24.sort((a, b) => (a.periodo < b.periodo ? -1 : 1));
      this.porXCargadosUdnDescription24 = data.data.varPorXCargadosUDN;
      this.porXCargadosUdnDescription24.sort((a, b) => (a.clasificacion < b.clasificacion ? -1 : 1));

      for(let i =0; i<myKMSCUDN.length; i++){
        var option = {
          style: 'percent',
          minimumFractionDigits: 1,
          maximumFractionDigits: 1
        };
        
        var formatter2 = new Intl.NumberFormat("en-US", option);
        var discountFormat2 = formatter2.format(myKMSCUDN[i].kmsDiferencia);
        
        myKMSCUDN[i].kmsDiferencia = discountFormat2;

        var textMayus = myKMSCUDN[i].clasificacion.toUpperCase();
        myKMSCUDN[i].clasificacion = textMayus;
 
      }

/*===========================% FLOTA ACTIVA TIPO OPERACIÓN==============================================*/
      this.porXFlotaOperacion24 = data.data.porXFlotaOperacion;
      this.porXFlotaOperacion24.sort((a, b) => (a.periodo < b.periodo ? -1 : 1));
      //onsole.log(this.porXFlotaOperacion24)


      const result = data.data.varPorXFlotaOperacion.filter((word) => word.clasificacion !== "KMS RECORRIDOS");
      this.porXFlotaOperacionDescription24 = result;
      this.porXFlotaOperacionDescription24.sort((a, b) => (a.clasificacion < b.clasificacion ? -1 : 1));

      var myFATO = result;
/*===========================% FLOTA ACTIVA UDN=========================================================*/
      this.porXFlotaUdn24 = data.data.porXFlotaUDN;
      this.porXFlotaUdn24.sort((a, b) => (a.periodo < b.periodo ? -1 : 1));
      this.porXFlotaUdnDescription24 = data.data.varPorXFlotaUDN;
      this.porXFlotaUdnDescription24.sort((a, b) => (a.clasificacion < b.clasificacion ? -1 : 1));

      var myFAUDN = data.data.varPorXFlotaUDN;
    })
  }

  getIndicadoresChart25(){
    this.indicadorService.getIndicadoresChart25().subscribe(data => {
       //(data.data)
      this.periodoVariacion = data.data.periodoVariacion;
      
/*==========================MILLONES DE KMS RECORRIDOS POR TIPO DE OPERACIÓN=============================*/
      var myKMSO = data.data.varKmsXOperacion;
      this.kmsXOperacion25 = data.data.kmsXOperacion;
      this.kmsXOperacion25.sort((a, b) => (a.periodo < b.periodo ? -1 : 1)); 
      // //(this.kmsXOperacion25)
      
      const dataKMSO = data.data.varKmsXOperacion.filter((word) => word.clasificacion !== "KMS RECORRIDOS" && word.clasificacion !== "GONDOLA");
      this.kmsXOperacionDescription25 = dataKMSO;
      this.kmsXOperacionDescription25.sort((a, b) => (a.clasificacion < b.clasificacion ? -1 : 1));

      for(let i =0; i<myKMSO.length; i++){
        var myvalue = Math.trunc(myKMSO[i].kmsDiferencia);

        var myFormat = myvalue.toString().split(".");
        myFormat[0] = myFormat[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        
        myKMSO[i].kmsDiferencia = myFormat.join("");

      }
/*==========================MILLONES KMS RECORRIDOS UDN==================================================*/
      var myKMSRUDN = data.data.varKmsXUDN

      this.kmsXUdn25 = data.data.kmsXUDN;
      this.kmsXUdn25.sort((a, b) => (a.periodo < b.periodo ? -1 : 1));
      this.KmsXUdnDescription25 = data.data.varKmsXUDN
      this.KmsXUdnDescription25.sort((a, b) => (a.clasificacion < b.clasificacion ? -1 : 1));

      var myTotal = []
      myTotal.push(data.data.varKmsXOperacion[0])
      this.kmsXUdnTotal25 = myTotal;
      // //(this.kmsXUdnTotal25)

      for(let i =0; i<myKMSRUDN.length; i++){
        var myvalue = Math.trunc(myKMSRUDN[i].kmsDiferencia);

        var myFormat = myvalue.toString().split(".");
        myFormat[0] = myFormat[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        
        myKMSRUDN[i].kmsDiferencia = myFormat.join("");
      }
/*===========================% KMS POR TIPO OPERACIÓN===================================================*/
      var myKMSTOP = data.data.varPorXOperacion;

      this.porXOperacion25 = data.data.porXOperacion;
      this.porXOperacion25.sort((a, b) => (a.periodo < b.periodo ? -1 : 1));
      this.porXOperacionDescription25 = data.data.varPorXOperacion.filter((word) => word.clasificacion !== "GONDOLA");
      this.porXOperacionDescription25.sort((a, b) => (a.clasificacion < b.clasificacion ? -1 : 1));

      for(let i =0; i<myKMSTOP.length; i++){

        var option = {
          style: 'percent',
          minimumFractionDigits: 1,
          maximumFractionDigits: 1
        };
        
        var formatter = new Intl.NumberFormat("en-US", option);
        var discountFormat = formatter.format(myKMSTOP[i].kmsDiferencia);
        
        myKMSTOP[i].kmsDiferencia = discountFormat;
      }

/*===========================*% KMS CARGADOS UDN========================================================*/
      var myKMSCUDN = data.data.varPorXCargadosUDN;
      this.porXCargadosUdn25 = data.data.porXCargadosUDN;
      this.porXCargadosUdn25.sort((a, b) => (a.periodo < b.periodo ? -1 : 1));
      this.porXCargadosUdnDescription25 = data.data.varPorXCargadosUDN;
      this.porXCargadosUdnDescription25.sort((a, b) => (a.clasificacion < b.clasificacion ? -1 : 1));

      for(let i =0; i<myKMSCUDN.length; i++){
        var option = {
          style: 'percent',
          minimumFractionDigits: 1,
          maximumFractionDigits: 1
        };
        
        var formatter2 = new Intl.NumberFormat("en-US", option);
        var discountFormat2 = formatter2.format(myKMSCUDN[i].kmsDiferencia);
        
        myKMSCUDN[i].kmsDiferencia = discountFormat2;

        var textMayus = myKMSCUDN[i].clasificacion.toUpperCase();
        myKMSCUDN[i].clasificacion = textMayus;
 
      }

/*===========================% FLOTA ACTIVA TIPO OPERACIÓN==============================================*/
      this.porXFlotaOperacion25 = data.data.porXFlotaOperacion;
      this.porXFlotaOperacion25.sort((a, b) => (a.periodo < b.periodo ? -1 : 1));
      //(this.porXFlotaOperacion25)


      const result = data.data.varPorXFlotaOperacion.filter((word) => word.clasificacion !== "KMS RECORRIDOS");
      this.porXFlotaOperacionDescription25 = result;
      this.porXFlotaOperacionDescription25.sort((a, b) => (a.clasificacion < b.clasificacion ? -1 : 1));

      var myFATO = result;
/*===========================% FLOTA ACTIVA UDN=========================================================*/
      this.porXFlotaUdn25 = data.data.porXFlotaUDN;
      this.porXFlotaUdn25.sort((a, b) => (a.periodo < b.periodo ? -1 : 1));
      this.porXFlotaUdnDescription25 = data.data.varPorXFlotaUDN;
      this.porXFlotaUdnDescription25.sort((a, b) => (a.clasificacion < b.clasificacion ? -1 : 1));

      var myFAUDN = data.data.varPorXFlotaUDN;
    })
  }

  getIndicadoresChart26(){
    this.indicadorService.getIndicadoresChart26().subscribe(data => {
       //(data.data)
      this.periodoVariacion = data.data.periodoVariacion;
      
/*==========================MILLONES DE KMS RECORRIDOS POR TIPO DE OPERACIÓN=============================*/
      var myKMSO = data.data.varKmsXOperacion;
      this.kmsXOperacion26 = data.data.kmsXOperacion;
      this.kmsXOperacion26.sort((a, b) => (a.periodo < b.periodo ? -1 : 1)); 
      // //(this.kmsXOperacion26)
      
      const dataKMSO = data.data.varKmsXOperacion.filter((word) => word.clasificacion !== "KMS RECORRIDOS" && word.clasificacion !== "GONDOLA");
      this.kmsXOperacionDescription26 = dataKMSO;
      this.kmsXOperacionDescription26.sort((a, b) => (a.clasificacion < b.clasificacion ? -1 : 1));

      for(let i =0; i<myKMSO.length; i++){
        var myvalue = Math.trunc(myKMSO[i].kmsDiferencia);

        var myFormat = myvalue.toString().split(".");
        myFormat[0] = myFormat[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        
        myKMSO[i].kmsDiferencia = myFormat.join("");

      }
/*==========================MILLONES KMS RECORRIDOS UDN==================================================*/
      var myKMSRUDN = data.data.varKmsXUDN

      this.kmsXUdn26 = data.data.kmsXUDN;
      this.kmsXUdn26.sort((a, b) => (a.periodo < b.periodo ? -1 : 1));
      this.KmsXUdnDescription26 = data.data.varKmsXUDN
      this.KmsXUdnDescription26.sort((a, b) => (a.clasificacion < b.clasificacion ? -1 : 1));

      var myTotal = []
      myTotal.push(data.data.varKmsXOperacion[0])
      this.kmsXUdnTotal26 = myTotal;
      // //(this.kmsXUdnTotal26)

      for(let i =0; i<myKMSRUDN.length; i++){
        var myvalue = Math.trunc(myKMSRUDN[i].kmsDiferencia);

        var myFormat = myvalue.toString().split(".");
        myFormat[0] = myFormat[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        
        myKMSRUDN[i].kmsDiferencia = myFormat.join("");
      }
/*===========================% KMS POR TIPO OPERACIÓN===================================================*/
      var myKMSTOP = data.data.varPorXOperacion;

      this.porXOperacion26 = data.data.porXOperacion;
      this.porXOperacion26.sort((a, b) => (a.periodo < b.periodo ? -1 : 1));
      this.porXOperacionDescription26 = data.data.varPorXOperacion.filter((word) => word.clasificacion !== "GONDOLA");
      this.porXOperacionDescription26.sort((a, b) => (a.clasificacion < b.clasificacion ? -1 : 1));

      for(let i =0; i<myKMSTOP.length; i++){

        var option = {
          style: 'percent',
          minimumFractionDigits: 1,
          maximumFractionDigits: 1
        };
        
        var formatter = new Intl.NumberFormat("en-US", option);
        var discountFormat = formatter.format(myKMSTOP[i].kmsDiferencia);
        
        myKMSTOP[i].kmsDiferencia = discountFormat;
      }

/*===========================*% KMS CARGADOS UDN========================================================*/
      var myKMSCUDN = data.data.varPorXCargadosUDN;
      this.porXCargadosUdn26 = data.data.porXCargadosUDN;
      this.porXCargadosUdn26.sort((a, b) => (a.periodo < b.periodo ? -1 : 1));
      this.porXCargadosUdnDescription26 = data.data.varPorXCargadosUDN;
      this.porXCargadosUdnDescription26.sort((a, b) => (a.clasificacion < b.clasificacion ? -1 : 1));

      for(let i =0; i<myKMSCUDN.length; i++){
        var option = {
          style: 'percent',
          minimumFractionDigits: 1,
          maximumFractionDigits: 1
        };
        
        var formatter2 = new Intl.NumberFormat("en-US", option);
        var discountFormat2 = formatter2.format(myKMSCUDN[i].kmsDiferencia);
        
        myKMSCUDN[i].kmsDiferencia = discountFormat2;

        var textMayus = myKMSCUDN[i].clasificacion.toUpperCase();
        myKMSCUDN[i].clasificacion = textMayus;
 
      }

/*===========================% FLOTA ACTIVA TIPO OPERACIÓN==============================================*/
      this.porXFlotaOperacion26 = data.data.porXFlotaOperacion;
      this.porXFlotaOperacion26.sort((a, b) => (a.periodo < b.periodo ? -1 : 1));
      //(this.porXFlotaOperacion26)


      const result = data.data.varPorXFlotaOperacion.filter((word) => word.clasificacion !== "KMS RECORRIDOS");
      this.porXFlotaOperacionDescription26 = result;
      this.porXFlotaOperacionDescription26.sort((a, b) => (a.clasificacion < b.clasificacion ? -1 : 1));

      var myFATO = result;
/*===========================% FLOTA ACTIVA UDN=========================================================*/
      this.porXFlotaUdn26 = data.data.porXFlotaUDN;
      this.porXFlotaUdn26.sort((a, b) => (a.periodo < b.periodo ? -1 : 1));
      this.porXFlotaUdnDescription26 = data.data.varPorXFlotaUDN;
      this.porXFlotaUdnDescription26.sort((a, b) => (a.clasificacion < b.clasificacion ? -1 : 1));

      var myFAUDN = data.data.varPorXFlotaUDN;
    })
  }

  getGraficaIO24(){
    this.indicadorService.getScoreCard2024().subscribe(data => {

      const myData = data.data.scIngrXOperador.filter((word) => word.mes != "(0)");
      this.graficaIXO24 = myData//data.data.scIngrXOperador;      
      //(this.graficaIXO24)
      // var myArray = [
      //   {orden: 0, mes: '12 DIC', operadores: 0, ingreso: 0, ingresoXOperador: 0},
      // ]

      // this.graficaIXO24.push(myArray[0]);

      // this.graficaOP24.push(myArray[0],myArray[1],myArray[2],myArray[3],myArray[4]);
      
      const result = data.data.scIngrXOperadorProm.filter((word) => word.operacion != "SIN OPERACION" && word.mes != "(0)");

      this.graficaOP24 = result;
      ////(this.graficaOP24)

    })
  }

  getGraficaIO25(){
    this.indicadorService.getScoreCard2025().subscribe(data => {
      this.graficaIXO25 = data.data.scIngrXOperador;            
      
      var myArray25 = [
        {ingreso: 0, ingresoXOperador: 0, mes: '03 MARZO', operadores: 0, orden: 0},
        {orden: 0, mes: '04 ABRIL', operadores: 0, ingreso: 0, ingresoXOperador: 0},
        {orden: 0, mes: '05 MAYO', operadores: 0, ingreso: 0, ingresoXOperador: 0},
        {orden: 0, mes: '06 JUNIO', operadores: 0, ingreso: 0, ingresoXOperador: 0},
        {orden: 0, mes: '07 JULIO', operadores: 0, ingreso: 0, ingresoXOperador: 0},
        {orden: 0, mes: '08 AGOSTO', operadores: 0, ingreso: 0, ingresoXOperador: 0},
        {orden: 0, mes: '09 SEPTIEMBRE', operadores: 0, ingreso: 0, ingresoXOperador: 0},
        {orden: 0, mes: '10 OCTUBRE', operadores: 0, ingreso: 0, ingresoXOperador: 0},
        {orden: 0, mes: '11 NOVIEMBRE', operadores: 0, ingreso: 0, ingresoXOperador: 0},
        {orden: 0, mes: '12 DICIEMBRE', operadores: 0, ingreso: 0, ingresoXOperador: 0}
      ]

      // this.graficaIXO25.push(myArray25[0]);
      //  //(this.graficaIXO25)
      // this.graficaOP25.push(myArray25[0],myArray25[1],myArray25[2],myArray25[3],myArray25[4],myArray25[5],myArray25[6],myArray25[7],myArray25[8],myArray25[9]);
      
      const result = data.data.scIngrXOperadorProm.filter((word) => word.operacion != "SIN OPERACION");

      this.graficaOP25 = result;
      ////(this.graficaOP24)

    })
  }

  getGraficaIO26(){
    this.indicadorService.getScoreCard2026().subscribe(data => {
      this.graficaIXO26 = data.data.scIngrXOperador;            
      //(this.graficaIXO26)
      var myArray26 = [
        {ingreso: 0, ingresoXOperador: 0, mes: '03 MARZO', operadores: 0, orden: 0},
        {orden: 0, mes: '04 ABRIL', operadores: 0, ingreso: 0, ingresoXOperador: 0},
        {orden: 0, mes: '05 MAYO', operadores: 0, ingreso: 0, ingresoXOperador: 0},
        {orden: 0, mes: '06 JUNIO', operadores: 0, ingreso: 0, ingresoXOperador: 0},
        {orden: 0, mes: '07 JULIO', operadores: 0, ingreso: 0, ingresoXOperador: 0},
        {orden: 0, mes: '08 AGOSTO', operadores: 0, ingreso: 0, ingresoXOperador: 0},
        {orden: 0, mes: '09 SEPTIEMBRE', operadores: 0, ingreso: 0, ingresoXOperador: 0},
        {orden: 0, mes: '10 OCTUBRE', operadores: 0, ingreso: 0, ingresoXOperador: 0},
        {orden: 0, mes: '11 NOVIEMBRE', operadores: 0, ingreso: 0, ingresoXOperador: 0},
        {orden: 0, mes: '12 DICIEMBRE', operadores: 0, ingreso: 0, ingresoXOperador: 0}
      ]

      // this.graficaIXO26.push(myArray26[0]);
      //  //(this.graficaIXO26)
      // this.graficaOP26.push(myArray26[8],myArray26[9]);
      
      const result = data.data.scIngrXOperadorProm.filter((word) => word.operacion != "SIN OPERACION");

      this.graficaOP26 = result;
      //(this.graficaOP26)

    })
  }

  getSueldoBase(){
    this.loadingVisible = true;
    var anio = 2024;
    var mes = 4;
    var idTracto = "string"
    var unidadesNegocio = [0]
    this.indicadorService.getSueldoOperador(anio, mes, idTracto, unidadesNegocio).subscribe(data => {
      this.graficaSueldoOp = data.data;
      this.graficaSueldoOp.sort((a, b) => (a.mes < b.mes ? -1 : 1))
      ////(this.graficaSueldoOp)
      this.loadingVisible = false;
    })
  }

  getSueldoBase25(){
    var anio = 2025;
    var mes = 4;
    var idTracto = "string"
    var unidadesNegocio = [0]
    this.indicadorService.getSueldoOperador25(anio, mes, idTracto, unidadesNegocio).subscribe(data => {
      this.graficaSueldoOp = data.data;
      this.graficaSueldoOp.sort((a, b) => (a.mes < b.mes ? -1 : 1))
      ////(this.graficaSueldoOp)
    })
  }
  getSueldoBase26(){
    var anio = 2026;
    var mes = 4;
    var idTracto = "string"
    var unidadesNegocio = [0]
    this.indicadorService.getSueldoOperador26(anio, mes, idTracto, unidadesNegocio).subscribe(data => {
      this.graficaSueldoOp = data.data;
      this.graficaSueldoOp.sort((a, b) => (a.mes < b.mes ? -1 : 1))
      ////(this.graficaSueldoOp)
    })
  }

  getSueldoOpAc(){
    this.loadingVisible = true;
    this.indicadorService.getSueldoOpAc().subscribe(data => {
      this.graficaSueldoOpAc = data.data;
      this.loadingVisible = false;
    })
  }

  getSueldoOpAc25(){
    this.loadingVisible = true;
    this.indicadorService.getSueldoOpAc25().subscribe(data => {
      this.graficaSueldoOpAc2025 = data.data;
      //(data)
      this.loadingVisible = false;
    })
  }

  getSueldoOpAc26(){
    this.loadingVisible = true;
    this.indicadorService.getSueldoOpAc26().subscribe(data => {
      this.graficaSueldoOpAc2026 = data.data;
      //(data)
      this.loadingVisible = false;
    })
  }

  getSueldoDetalle(){
    const request = new Promise((resolve, reject) => {
      this.indicadorService.postSueldoDetalle(this.selectedPerAC).subscribe(data =>{
        this.sueldoDetalle = data.data;
        ////(this.sueldoDetalle)
        this.loadingVisible = false;
      })
    })
  return request;
    
  }

  getSueldoDetalle25(){
    const request = new Promise((resolve, reject) => {
      this.indicadorService.postSueldoDetalle25(this.selectedPerAC25).subscribe(data =>{
        this.sueldoDetalle25 = data.data;
        ////(this.sueldoDetalle25)
        this.loadingVisible = false;
      })
    })
  return request;
    
  }

  getSueldoDetalle26(){
    const request = new Promise((resolve, reject) => {
      this.indicadorService.postSueldoDetalle26(this.selectedPerAC26).subscribe(data =>{
        this.sueldoDetalle26 = data.data;
        ////(this.sueldoDetalle26)
        this.loadingVisible = false;
      })
    })
  return request;
    
  }


  getIngresoXCliente(){
    const request = new Promise((resolve, reject) => {
      this.indicadorService.getIngresosXCliente(this.selectedIpC).subscribe(data =>{
        this.IpCViajes = data.data.viajes;
        this.graficaIpC = data.data.graficaIngrXCliente;;
        ////(this.graficaIpC)
        //const ixc = data.data.graficaIngrXCliente;

        // for(let i =0; i<ixc.length; i++){
        //   const myValue = `${parseFloat(ixc[i].porcentaje).toFixed(2)}%`;
        //   ixc[i].porcentaje = myValue;
        // }

        

        // this.graficaIpC.sort((a, b) => (a.ingreso > b.ingreso ? -1 : 1))

        this.loadingVisible = false;
      })
    })
  return request;
    
  }

  getIngresoXClienteAnual(){
    const request = new Promise((resolve, reject) => {
      this.indicadorService.getIngresosXClienteAnual(this.selectedIpCAnual).subscribe(data =>{
        this.IpCViajesAnual = data.data.viajes;
        this.graficaIpCAnual = data.data.graficaIngrXCliente;;
        ////(this.graficaIpCAnual)

        this.loadingVisible = false;
      })
    })
  return request;
    
  }

//=====================================Function Selected ======================================
  toPercenage(num) {
    return `${Math.round(num * 100)}%`;
  }

  percentageFormatter(num) {
    return new Intl.NumberFormat('default', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  }
  
  seleccionarTipoOpe(e: any) {}

  seleccionarPeriodo(e: any) {
    this.selectedPeriodo = e.value
    //(this.selectedPeriodo)
  }

  seleccionarMes(e: any) {
    this.mesSeleccionado = e.value;

    this.getTractos();

  }
  seleccionarAnio(e: any) {
    this.anioSeleccionado = e.value;

    this.getTractos();

  }
  seleccionarUDN(e: any) {
    this.udnSeleccionado = [];
    this.udnSeleccionado = e.value;


    this.getTractos();
  }
  seleccionarTracto(e: any) {
    this.tractoSeleccionado = e.value;

  }
  selectPeriodoAC(e: any) {
    this.selectedPerAC = e.value
    //(this.selectedPerAC)
  }

  selectPeriodoAC25(e: any) {
    this.selectedPerAC25 = e.value
    //(this.selectedPerAC25)
  }

  selectPeriodoAC26(e: any) {
    this.selectedPerAC26 = e.value
    //(this.selectedPerAC26)
  }


  selectPeriodoIpC(e: any) {
    this.selectedIpC = e.value
    //(this.selectedIpC)
  }

  selectPeriodoIpCAnual(e: any) {
    this.selectedIpCAnual = e.value
    //(this.selectedIpCAnual)
  }
  
  buscarClick = (e: any) => {

    if (this.selectedPeriodo) {
      this.loadingVisible = true;
      this.getkmsMensuales().then(() => {
        this.loadingVisible = false;
      });
    }else{
      notify({
        message: 'Por favor seleccione el periodo',
        position: {
          my: 'center center',
          at: 'center center',
        },
      }, 'warning', 3000);
    }

  };

  buscarAC = (e: any) => {

    if (this.selectedPerAC) {
      this.loadingVisible = true;
      this.getSueldoDetalle().then(() => {
        this.loadingVisible = false;
      });
    }else{
      notify({
        message: 'Por favor seleccione el periodo',
        position: {
          my: 'center center',
          at: 'center center',
        },
      }, 'warning', 3000);
    }

  };

  buscarAC25 = (e: any) => {

    if (this.selectedPerAC25) {
      this.loadingVisible = true;
      this.getSueldoDetalle25().then(() => {
        this.loadingVisible = false;
      });
    }else{
      notify({
        message: 'Por favor seleccione el periodo',
        position: {
          my: 'center center',
          at: 'center center',
        },
      }, 'warning', 3000);
    }

  };

  buscarAC26 = (e: any) => {

    if (this.selectedPerAC26) {
      this.loadingVisible = true;
      this.getSueldoDetalle26().then(() => {
        this.loadingVisible = false;
      });
    }else{
      notify({
        message: 'Por favor seleccione el periodo',
        position: {
          my: 'center center',
          at: 'center center',
        },
      }, 'warning', 3000);
    }

  };

  buscarIpC = (e: any) => {

    if (this.selectedIpC) {
      this.loadingVisible = true;
      this.getIngresoXCliente().then(() => {
        this.loadingVisible = false;
      });
    }else{
      notify({
        message: 'Por favor seleccione el periodo',
        position: {
          my: 'center center',
          at: 'center center',
        },
      }, 'warning', 3000);
    }

  };

  buscarIpCAnual = (e: any) => {

    if (this.selectedIpCAnual) {
      this.loadingVisible = true;
      this.getIngresoXClienteAnual().then(() => {
        this.loadingVisible = false;
      });
    }else{
      notify({
        message: 'Por favor seleccione el año',
        position: {
          my: 'center center',
          at: 'center center',
        },
      }, 'warning', 3000);
    }

  };

  borrarClick = (e: any) =>{
    this.selectTracto.value = '';
  }

  Actualizar = (e: any) => {
    this.loadingVisible = true;
    this.getScoreCard2026();
  };

  ActualizarSO26 = (e:any)=>{
        //this.getSueldoBase25();
  }

  ActualizarSOA26 = (e: any)=>{
     this.getSueldoOpAc26();
  }

  getDataSO25 = (e:any)=>{
        //this.getSueldoBase25();
  }

  getDataSOA25 = (e: any)=>{
     this.getSueldoOpAc25();
  }

  getDataSOA2024 = (e: any) =>{
    this.getSueldoOpAc();
  }

  getDataSO2024 = (e:any)=>{
    this.getSueldoBase();
  }

  getData2025= (e:any)=>{
    this.getScoreCard2025();
    this.getIndicadoresChart25();
    this.getGraficaIO25();
    this.loadingVisible = true;
  }

  getData2024= (e:any)=>{
    this.getScoreCard2024();
    this.getIndicadoresChart24();
    this.getGraficaIO24();
  } 

  getData2023= (e:any)=>{
    this.getScoreCard();
    this.getIndicadoresChart();
  } 

//==============================INGRESOS=========================================
  onRowPreparedI(event){

    if (event.rowType == 'group'){
      
      if (event.data.key == '01 ENE') {
 
        if(event.summaryCells[4].length !== 0){
        agrupamientoIE.cuautitlan = event.summaryCells[4][0].value;
        }
        if(event.summaryCells[5].length !== 0){
        agrupamientoIE.tultitlan = event.summaryCells[5][0].value;
        }
        if(event.summaryCells[6].length !== 0){
        agrupamientoIE.guadalajara = event.summaryCells[6][0].value;
        }
        if(event.summaryCells[7].length !== 0){
        agrupamientoIE.hermosillo = event.summaryCells[7][0].value;
        }
        if(event.summaryCells[8].length !== 0){
        agrupamientoIE.mexicali = event.summaryCells[8][0].value;
        }
        if(event.summaryCells[9].length !== 0){
        agrupamientoIE.orizaba = event.summaryCells[9][0].value;
        }
        if(event.summaryCells[10].length !== 0){
        agrupamientoIE.ramosArispe = event.summaryCells[10][0].value;
        }
        if(event.summaryCells[11].length !== 0){
        agrupamientoIE.total = event.summaryCells[11][0].value;
        }
      }
      if (event.data.key == '02 FEB'){
        agrupamientoIF.cuautitlan = event.summaryCells[4][0]?.value;
        agrupamientoIF.tultitlan = event.summaryCells[5][0]?.value;
        agrupamientoIF.guadalajara = event.summaryCells[6][0]?.value;
        agrupamientoIF.hermosillo = event.summaryCells[7][0]?.value;
        agrupamientoIF.mexicali = event.summaryCells[8][0]?.value;
        agrupamientoIF.orizaba = event.summaryCells[9][0]?.value;
        agrupamientoIF.ramosArispe = event.summaryCells[10][0]?.value;
        agrupamientoIF.total = event.summaryCells[11][0]?.value;
      }
      if (event.data.key == '03 MAR'){
        agrupamientoIM.cuautitlan = event.summaryCells[4][0]?.value;
        agrupamientoIM.tultitlan = event.summaryCells[5][0]?.value;
        agrupamientoIM.guadalajara = event.summaryCells[6][0]?.value;
        agrupamientoIM.hermosillo = event.summaryCells[7][0]?.value;
        agrupamientoIM.mexicali = event.summaryCells[8][0]?.value;
        agrupamientoIM.orizaba = event.summaryCells[9][0]?.value;
        agrupamientoIM.ramosArispe = event.summaryCells[10][0]?.value;
        agrupamientoIM.total = event.summaryCells[11][0]?.value;
      }
      if (event.data.key == '04 ABR'){
        agrupamientoIA.cuautitlan = event.summaryCells[4][0]?.value;
        agrupamientoIA.tultitlan = event.summaryCells[5][0]?.value;
        agrupamientoIA.guadalajara = event.summaryCells[6][0]?.value;
        agrupamientoIA.hermosillo = event.summaryCells[7][0]?.value;
        agrupamientoIA.mexicali = event.summaryCells[8][0]?.value;
        agrupamientoIA.orizaba = event.summaryCells[9][0]?.value;
        agrupamientoIA.ramosArispe = event.summaryCells[10][0]?.value;
        agrupamientoIA.total = event.summaryCells[11][0]?.value;
      }
      if (event.data.key == '05 MAY'){
        agrupamientoIMY.cuautitlan = event.summaryCells[4][0]?.value;
        agrupamientoIMY.tultitlan = event.summaryCells[5][0]?.value;
        agrupamientoIMY.guadalajara = event.summaryCells[6][0]?.value;
        agrupamientoIMY.hermosillo = event.summaryCells[7][0]?.value;
        agrupamientoIMY.mexicali = event.summaryCells[8][0]?.value;
        agrupamientoIMY.orizaba = event.summaryCells[9][0]?.value;
        agrupamientoIMY.ramosArispe = event.summaryCells[10][0]?.value;
        agrupamientoIMY.total = event.summaryCells[11][0]?.value;
      }
      if (event.data.key == '06 JUN'){
        agrupamientoIJN.cuautitlan = event.summaryCells[4][0]?.value;
        agrupamientoIJN.tultitlan = event.summaryCells[5][0]?.value;
        agrupamientoIJN.guadalajara = event.summaryCells[6][0]?.value;
        agrupamientoIJN.hermosillo = event.summaryCells[7][0]?.value;
        agrupamientoIJN.mexicali = event.summaryCells[8][0]?.value;
        agrupamientoIJN.orizaba = event.summaryCells[9][0]?.value;
        agrupamientoIJN.ramosArispe = event.summaryCells[10][0]?.value;
        agrupamientoIJN.total = event.summaryCells[11][0]?.value;
      }
      if (event.data.key == '07 JUL'){
        agrupamientoIJL.cuautitlan = event.summaryCells[4][0]?.value;
        agrupamientoIJL.tultitlan = event.summaryCells[5][0]?.value;
        agrupamientoIJL.guadalajara = event.summaryCells[6][0]?.value;
        agrupamientoIJL.hermosillo = event.summaryCells[7][0]?.value;
        agrupamientoIJL.mexicali = event.summaryCells[8][0]?.value;
        agrupamientoIJL.orizaba = event.summaryCells[9][0]?.value;
        agrupamientoIJL.ramosArispe = event.summaryCells[10][0]?.value;
        agrupamientoIJL.total = event.summaryCells[11][0]?.value;
      }
      if (event.data.key == '08 AGO'){
        agrupamientoIAG.cuautitlan = event.summaryCells[4][0]?.value;
        agrupamientoIAG.tultitlan = event.summaryCells[5][0]?.value;
        agrupamientoIAG.guadalajara = event.summaryCells[6][0]?.value;
        agrupamientoIAG.hermosillo = event.summaryCells[7][0]?.value;
        agrupamientoIAG.mexicali = event.summaryCells[8][0]?.value;
        agrupamientoIAG.orizaba = event.summaryCells[9][0]?.value;
        agrupamientoIAG.ramosArispe = event.summaryCells[10][0]?.value;
        agrupamientoIAG.total = event.summaryCells[11][0]?.value;
      }
      if (event.data.key == '09 SEP'){
        agrupamientoIS.cuautitlan = event.summaryCells[4][0].value;
        agrupamientoIS.tultitlan = event.summaryCells[5][0].value;
        agrupamientoIS.guadalajara = event.summaryCells[6][0].value;
        agrupamientoIS.hermosillo = event.summaryCells[7][0].value;
        agrupamientoIS.mexicali = event.summaryCells[8][0].value;
        agrupamientoIS.orizaba = event.summaryCells[9][0].value;
        agrupamientoIS.ramosArispe = event.summaryCells[10][0].value;
        agrupamientoIS.total = event.summaryCells[11][0].value;
      }
      if (event.data.key == '10 OCT'){
        agrupamientoIOC.cuautitlan = event.summaryCells[4][0].value;
        agrupamientoIOC.tultitlan = event.summaryCells[5][0].value;
        agrupamientoIOC.guadalajara = event.summaryCells[6][0].value;
        agrupamientoIOC.hermosillo = event.summaryCells[7][0].value;
        agrupamientoIOC.mexicali = event.summaryCells[8][0].value;
        agrupamientoIOC.orizaba = event.summaryCells[9][0].value;
        agrupamientoIOC.ramosArispe = event.summaryCells[10][0].value;
        agrupamientoIOC.total = event.summaryCells[11][0].value;
      }
      if (event.data.key == '11 NOV'){
        agrupamientoINV.cuautitlan = event.summaryCells[4][0].value;
        agrupamientoINV.tultitlan = event.summaryCells[5][0].value;
        agrupamientoINV.guadalajara = event.summaryCells[6][0].value;
        agrupamientoINV.hermosillo = event.summaryCells[7][0].value;
        agrupamientoINV.mexicali = event.summaryCells[8][0].value;
        agrupamientoINV.orizaba = event.summaryCells[9][0].value;
        agrupamientoINV.ramosArispe = event.summaryCells[10][0].value;
        agrupamientoINV.total = event.summaryCells[11][0].value;
      }

      if (event.data.key == '12 DIC'){
        agrupamientoIDC.cuautitlan = event.summaryCells[4][0].value;
        agrupamientoIDC.tultitlan = event.summaryCells[5][0].value;
        agrupamientoIDC.guadalajara = event.summaryCells[6][0].value;
        agrupamientoIDC.hermosillo = event.summaryCells[7][0].value;
        agrupamientoIDC.mexicali = event.summaryCells[8][0].value;
        agrupamientoIDC.orizaba = event.summaryCells[9][0].value;
        agrupamientoIDC.ramosArispe = event.summaryCells[10][0].value;
        agrupamientoIDC.total = event.summaryCells[11][0].value;
      }
    }

    if(event.rowType == "totalFooter"){
      totalIngresos.cuautitlan = event.summaryCells[4][0]?.value;
      totalIngresos.tultitlan = event.summaryCells[5][0]?.value;
      totalIngresos.guadalajara = event.summaryCells[6][0]?.value;
      totalIngresos.hermosillo = event.summaryCells[7][0]?.value;
      totalIngresos.mexicali = event.summaryCells[8][0]?.value;
      totalIngresos.orizaba = event.summaryCells[9][0]?.value;
      totalIngresos.ramosArispe = event.summaryCells[10][0].value;
      totalIngresos.total = event.summaryCells[11][0].value;
    }
  }
  onCellPreparedI(e: any) {
    if (e.rowType == 'group'){

      e.cellElement.style.fontSize = '12px';
      e.cellElement.style.background = "#DCDCDC";
    }

    if (e.rowType == 'totalFooter') {
      e.totalItem.cells.forEach((c: any) => {
        if (c.cellElement) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "16px";
            c.cellElement.style.background = "#ff9460";
            c.cellElement.style.color = "black"; 
        }   
      });
    }
  }
  customizeI(e) {  

    var gridCell = e.gridCell;
    if (gridCell.rowType === 'group') {
      
      e.backgroundColor = "#DCDCDC";
      e.fontWeight = "bolder"
      e.font = {bold: true}

  }

  if (gridCell.rowType === 'totalFooter') {
      
    e.backgroundColor = "#ff9460";
    e.fontWeight = "bolder"
    e.font = {bold: true}

  }
  }

//==============================KILOMETROS=======================================
  onRowPreparedK(e){

    if (e.rowType == 'group'){
      
      if (e.data.key == '01 ENE') {

        if(e.summaryCells[4].length !== 0){
        agrupamientoKE.cuautitlan = e.summaryCells[4][0].value;
        }
        if(e.summaryCells[5].length !== 0){
        agrupamientoKE.tultitlan = e.summaryCells[5][0].value;
        }
        if(e.summaryCells[6].length !== 0){
        agrupamientoKE.guadalajara = e.summaryCells[6][0].value;
        }
        if(e.summaryCells[7].length !== 0){
        agrupamientoKE.hermosillo = e.summaryCells[7][0].value;
        }
        if(e.summaryCells[8].length !== 0){
        agrupamientoKE.mexicali = e.summaryCells[8][0].value;
        }
        if(e.summaryCells[9].length !== 0){
        agrupamientoKE.orizaba = e.summaryCells[9][0].value;
        }
        if(e.summaryCells[10].length !== 0){
        agrupamientoKE.ramosArispe = e.summaryCells[10][0].value;
        }
        if(e.summaryCells[11].length !== 0){
        agrupamientoKE.total = e.summaryCells[11][0].value;
        }

        totalAgrupamientoIKE.cuautitlan = agrupamientoIE.cuautitlan / agrupamientoKE.cuautitlan;
        totalAgrupamientoIKE.tultitlan = agrupamientoIE.tultitlan / agrupamientoKE.tultitlan;
        totalAgrupamientoIKE.guadalajara = agrupamientoIE.guadalajara / agrupamientoKE.guadalajara;
        totalAgrupamientoIKE.hermosillo = agrupamientoIE.hermosillo / agrupamientoKE.hermosillo;
        totalAgrupamientoIKE.mexicali = agrupamientoIE.mexicali / agrupamientoKE.mexicali;
        totalAgrupamientoIKE.orizaba = agrupamientoIE.orizaba / agrupamientoKE.orizaba;
        totalAgrupamientoIKE.ramosArispe = agrupamientoIE.ramosArispe / agrupamientoKE.ramosArispe;
        totalAgrupamientoIKE.total = agrupamientoIE.total / agrupamientoKE.total
      }
      if (e.data.key == '02 FEB'){
        agrupamientoKF.cuautitlan = e.summaryCells[4][0]?.value;
        agrupamientoKF.tultitlan = e.summaryCells[5][0]?.value;
        agrupamientoKF.guadalajara = e.summaryCells[6][0]?.value;
        agrupamientoKF.hermosillo = e.summaryCells[7][0]?.value;
        agrupamientoKF.mexicali = e.summaryCells[8][0]?.value;
        agrupamientoKF.orizaba = e.summaryCells[9][0]?.value;
        agrupamientoKF.ramosArispe = e.summaryCells[10][0]?.value;
        agrupamientoKF.total = e.summaryCells[11][0]?.value;

        totalAgrupamientoIKF.cuautitlan = agrupamientoIF.cuautitlan / agrupamientoKF.cuautitlan;
        totalAgrupamientoIKF.tultitlan = agrupamientoIF.tultitlan / agrupamientoKF.tultitlan;
        totalAgrupamientoIKF.guadalajara = agrupamientoIF.guadalajara / agrupamientoKF.guadalajara;
        totalAgrupamientoIKF.hermosillo = agrupamientoIF.hermosillo / agrupamientoKF.hermosillo;
        totalAgrupamientoIKF.mexicali = agrupamientoIF.mexicali / agrupamientoKF.mexicali;
        totalAgrupamientoIKF.orizaba = agrupamientoIF.orizaba / agrupamientoKF.orizaba;
        totalAgrupamientoIKF.ramosArispe = agrupamientoIF.ramosArispe / agrupamientoKF.ramosArispe;
        totalAgrupamientoIKF.total = agrupamientoIF.total / agrupamientoKF.total;
      }
      if (e.data.key == '03 MAR'){
        agrupamientoKM.cuautitlan = e.summaryCells[4][0]?.value;
        agrupamientoKM.tultitlan = e.summaryCells[5][0]?.value;
        agrupamientoKM.guadalajara = e.summaryCells[6][0]?.value;
        agrupamientoKM.hermosillo = e.summaryCells[7][0]?.value;
        agrupamientoKM.mexicali = e.summaryCells[8][0]?.value;
        agrupamientoKM.orizaba = e.summaryCells[9][0]?.value;
        agrupamientoKM.ramosArispe = e.summaryCells[10][0]?.value;
        agrupamientoKM.total = e.summaryCells[11][0]?.value;

        totalAgrupamientoIKM.cuautitlan = agrupamientoIM.cuautitlan / agrupamientoKM.cuautitlan;
        totalAgrupamientoIKM.tultitlan = agrupamientoIM.tultitlan / agrupamientoKM.tultitlan;
        totalAgrupamientoIKM.guadalajara = agrupamientoIM.guadalajara / agrupamientoKM.guadalajara;
        totalAgrupamientoIKM.hermosillo = agrupamientoIM.hermosillo / agrupamientoKM.hermosillo;
        totalAgrupamientoIKM.mexicali = agrupamientoIM.mexicali / agrupamientoKM.mexicali;
        totalAgrupamientoIKM.orizaba = agrupamientoIM.orizaba / agrupamientoKM.orizaba;
        totalAgrupamientoIKM.ramosArispe = agrupamientoIM.ramosArispe / agrupamientoKM.ramosArispe;
        totalAgrupamientoIKM.total = agrupamientoIM.total / agrupamientoKM.total;
      }
      if (e.data.key == '04 ABR'){
        agrupamientoKA.cuautitlan = e.summaryCells[4][0]?.value;
        agrupamientoKA.tultitlan = e.summaryCells[5][0]?.value;
        agrupamientoKA.guadalajara = e.summaryCells[6][0]?.value;
        agrupamientoKA.hermosillo = e.summaryCells[7][0]?.value;
        agrupamientoKA.mexicali = e.summaryCells[8][0]?.value;
        agrupamientoKA.orizaba = e.summaryCells[9][0]?.value;
        agrupamientoKA.ramosArispe = e.summaryCells[10][0]?.value;
        agrupamientoKA.total = e.summaryCells[11][0]?.value;

        totalAgrupamientoIKA.cuautitlan = agrupamientoIA.cuautitlan / agrupamientoKA.cuautitlan;
        totalAgrupamientoIKA.tultitlan = agrupamientoIA.tultitlan / agrupamientoKA.tultitlan;
        totalAgrupamientoIKA.guadalajara = agrupamientoIA.guadalajara / agrupamientoKA.guadalajara;
        totalAgrupamientoIKA.hermosillo = agrupamientoIA.hermosillo / agrupamientoKA.hermosillo;
        totalAgrupamientoIKA.mexicali = agrupamientoIA.mexicali / agrupamientoKA.mexicali;
        totalAgrupamientoIKA.orizaba = agrupamientoIA.orizaba / agrupamientoKA.orizaba;
        totalAgrupamientoIKA.ramosArispe = agrupamientoIA.ramosArispe / agrupamientoKA.ramosArispe;
        totalAgrupamientoIKA.total = agrupamientoIA.total / agrupamientoKA.total;
      }
      if (e.data.key == '05 MAY'){
        agrupamientoKMY.cuautitlan = e.summaryCells[4][0]?.value;
        agrupamientoKMY.tultitlan = e.summaryCells[5][0]?.value;
        agrupamientoKMY.guadalajara = e.summaryCells[6][0]?.value;
        agrupamientoKMY.hermosillo = e.summaryCells[7][0]?.value;
        agrupamientoKMY.mexicali = e.summaryCells[8][0]?.value;
        agrupamientoKMY.orizaba = e.summaryCells[9][0]?.value;
        agrupamientoKMY.ramosArispe = e.summaryCells[10][0]?.value;
        agrupamientoKMY.total = e.summaryCells[11][0]?.value;

        totalAgrupamientoIKMY.cuautitlan = agrupamientoIMY.cuautitlan / agrupamientoKMY.cuautitlan;
        totalAgrupamientoIKMY.tultitlan = agrupamientoIMY.tultitlan / agrupamientoKMY.tultitlan;
        totalAgrupamientoIKMY.guadalajara = agrupamientoIMY.guadalajara / agrupamientoKMY.guadalajara;
        totalAgrupamientoIKMY.hermosillo = agrupamientoIMY.hermosillo / agrupamientoKMY.hermosillo;
        totalAgrupamientoIKMY.mexicali = agrupamientoIMY.mexicali / agrupamientoKMY.mexicali;
        totalAgrupamientoIKMY.orizaba = agrupamientoIMY.orizaba / agrupamientoKMY.orizaba;
        totalAgrupamientoIKMY.ramosArispe = agrupamientoIMY.ramosArispe / agrupamientoKMY.ramosArispe;
        totalAgrupamientoIKMY.total = agrupamientoIMY.total / agrupamientoKMY.total;
      }
      if (e.data.key == '06 JUN'){
        agrupamientoKJN.cuautitlan = e.summaryCells[4][0]?.value;
        agrupamientoKJN.tultitlan = e.summaryCells[5][0]?.value;
        agrupamientoKJN.guadalajara = e.summaryCells[6][0]?.value;
        agrupamientoKJN.hermosillo = e.summaryCells[7][0]?.value;
        agrupamientoKJN.mexicali = e.summaryCells[8][0]?.value;
        agrupamientoKJN.orizaba = e.summaryCells[9][0]?.value;
        agrupamientoKJN.ramosArispe = e.summaryCells[10][0]?.value;
        agrupamientoKJN.total = e.summaryCells[11][0]?.value;

        totalAgrupamientoIKJN.cuautitlan = agrupamientoIJN.cuautitlan / agrupamientoKJN.cuautitlan;
        totalAgrupamientoIKJN.tultitlan = agrupamientoIJN.tultitlan / agrupamientoKJN.tultitlan;
        totalAgrupamientoIKJN.guadalajara = agrupamientoIJN.guadalajara / agrupamientoKJN.guadalajara;
        totalAgrupamientoIKJN.hermosillo = agrupamientoIJN.hermosillo / agrupamientoKJN.hermosillo;
        totalAgrupamientoIKJN.mexicali = agrupamientoIJN.mexicali / agrupamientoKJN.mexicali;
        totalAgrupamientoIKJN.orizaba = agrupamientoIJN.orizaba / agrupamientoKJN.orizaba;
        totalAgrupamientoIKJN.ramosArispe = agrupamientoIJN.ramosArispe / agrupamientoKJN.ramosArispe;
        totalAgrupamientoIKJN.total = agrupamientoIJN.total / agrupamientoKJN.total;
      }
      if (e.data.key == '07 JUL'){
        agrupamientoKJL.cuautitlan = e.summaryCells[4][0]?.value;
        agrupamientoKJL.tultitlan = e.summaryCells[5][0]?.value;
        agrupamientoKJL.guadalajara = e.summaryCells[6][0]?.value;
        agrupamientoKJL.hermosillo = e.summaryCells[7][0]?.value;
        agrupamientoKJL.mexicali = e.summaryCells[8][0]?.value;
        agrupamientoKJL.orizaba = e.summaryCells[9][0]?.value;
        agrupamientoKJL.ramosArispe = e.summaryCells[10][0]?.value;
        agrupamientoKJL.total = e.summaryCells[11][0]?.value;

        totalAgrupamientoIKJL.cuautitlan = agrupamientoIJL.cuautitlan / agrupamientoKJL.cuautitlan;
        totalAgrupamientoIKJL.tultitlan = agrupamientoIJL.tultitlan / agrupamientoKJL.tultitlan;
        totalAgrupamientoIKJL.guadalajara = agrupamientoIJL.guadalajara / agrupamientoKJL.guadalajara;
        totalAgrupamientoIKJL.hermosillo = agrupamientoIJL.hermosillo / agrupamientoKJL.hermosillo;
        totalAgrupamientoIKJL.mexicali = agrupamientoIJL.mexicali / agrupamientoKJL.mexicali;
        totalAgrupamientoIKJL.orizaba = agrupamientoIJL.orizaba / agrupamientoKJL.orizaba;
        totalAgrupamientoIKJL.ramosArispe = agrupamientoIJL.ramosArispe / agrupamientoKJL.ramosArispe;
        totalAgrupamientoIKJL.total = agrupamientoIJL.total / agrupamientoKJL.total;
      }
      if (e.data.key == '08 AGO'){
        agrupamientoKAG.cuautitlan = e.summaryCells[4][0]?.value;
        agrupamientoKAG.tultitlan = e.summaryCells[5][0]?.value;
        agrupamientoKAG.guadalajara = e.summaryCells[6][0]?.value;
        agrupamientoKAG.hermosillo = e.summaryCells[7][0]?.value;
        agrupamientoKAG.mexicali = e.summaryCells[8][0]?.value;
        agrupamientoKAG.orizaba = e.summaryCells[9][0]?.value;
        agrupamientoKAG.ramosArispe = e.summaryCells[10][0]?.value;
        agrupamientoKAG.total = e.summaryCells[11][0]?.value;

        totalAgrupamientoIKAG.cuautitlan = agrupamientoIAG.cuautitlan / agrupamientoKAG.cuautitlan;
        totalAgrupamientoIKAG.tultitlan = agrupamientoIAG.tultitlan / agrupamientoKAG.tultitlan;
        totalAgrupamientoIKAG.guadalajara = agrupamientoIAG.guadalajara / agrupamientoKAG.guadalajara;
        totalAgrupamientoIKAG.hermosillo = agrupamientoIAG.hermosillo / agrupamientoKAG.hermosillo;
        totalAgrupamientoIKAG.mexicali = agrupamientoIAG.mexicali / agrupamientoKAG.mexicali;
        totalAgrupamientoIKAG.orizaba = agrupamientoIAG.orizaba / agrupamientoKAG.orizaba;
        totalAgrupamientoIKAG.ramosArispe = agrupamientoIAG.ramosArispe / agrupamientoKAG.ramosArispe;
        totalAgrupamientoIKAG.total = agrupamientoIAG.total / agrupamientoKAG.total;
      }
      if (e.data.key == '09 SEP'){
        agrupamientoKS.cuautitlan = e.summaryCells[4][0].value;
        agrupamientoKS.tultitlan = e.summaryCells[5][0].value;
        agrupamientoKS.guadalajara = e.summaryCells[6][0].value;
        agrupamientoKS.hermosillo = e.summaryCells[7][0].value;
        agrupamientoKS.mexicali = e.summaryCells[8][0].value;
        agrupamientoKS.orizaba = e.summaryCells[9][0].value;
        agrupamientoKS.ramosArispe = e.summaryCells[10][0].value;
        agrupamientoKS.total = e.summaryCells[11][0].value;

        totalAgrupamientoIKS.cuautitlan = agrupamientoIS.cuautitlan / agrupamientoKS.cuautitlan;
        totalAgrupamientoIKS.tultitlan = agrupamientoIS.tultitlan / agrupamientoKS.tultitlan;
        totalAgrupamientoIKS.guadalajara = agrupamientoIS.guadalajara / agrupamientoKS.guadalajara;
        totalAgrupamientoIKS.hermosillo = agrupamientoIS.hermosillo / agrupamientoKS.hermosillo;
        totalAgrupamientoIKS.mexicali = agrupamientoIS.mexicali / agrupamientoKS.mexicali;
        totalAgrupamientoIKS.orizaba = agrupamientoIS.orizaba / agrupamientoKS.orizaba;
        totalAgrupamientoIKS.ramosArispe = agrupamientoIS.ramosArispe / agrupamientoKS.ramosArispe;
        totalAgrupamientoIKS.total = agrupamientoIS.total / agrupamientoKS.total;
      }
      if (e.data.key == '10 OCT'){
        agrupamientoKOC.cuautitlan = e.summaryCells[4][0].value;
        agrupamientoKOC.tultitlan = e.summaryCells[5][0].value;
        agrupamientoKOC.guadalajara = e.summaryCells[6][0].value;
        agrupamientoKOC.hermosillo = e.summaryCells[7][0].value;
        agrupamientoKOC.mexicali = e.summaryCells[8][0].value;
        agrupamientoKOC.orizaba = e.summaryCells[9][0].value;
        agrupamientoKOC.ramosArispe = e.summaryCells[10][0].value;
        agrupamientoKOC.total = e.summaryCells[11][0].value;

        totalAgrupamientoIKOC.cuautitlan = agrupamientoIOC.cuautitlan / agrupamientoKOC.cuautitlan;
        totalAgrupamientoIKOC.tultitlan = agrupamientoIOC.tultitlan / agrupamientoKOC.tultitlan;
        totalAgrupamientoIKOC.guadalajara = agrupamientoIOC.guadalajara / agrupamientoKOC.guadalajara;
        totalAgrupamientoIKOC.hermosillo = agrupamientoIOC.hermosillo / agrupamientoKOC.hermosillo;
        totalAgrupamientoIKOC.mexicali = agrupamientoIOC.mexicali / agrupamientoKOC.mexicali;
        totalAgrupamientoIKOC.orizaba = agrupamientoIOC.orizaba / agrupamientoKOC.orizaba;
        totalAgrupamientoIKOC.ramosArispe = agrupamientoIOC.ramosArispe / agrupamientoKOC.ramosArispe;
        totalAgrupamientoIKOC.total = agrupamientoIOC.total / agrupamientoKOC.total;
      }
      if (e.data.key == '11 NOV'){
        agrupamientoKNV.cuautitlan = e.summaryCells[4][0].value;
        agrupamientoKNV.tultitlan = e.summaryCells[5][0].value;
        agrupamientoKNV.guadalajara = e.summaryCells[6][0].value;
        agrupamientoKNV.hermosillo = e.summaryCells[7][0].value;
        agrupamientoKNV.mexicali = e.summaryCells[8][0].value;
        agrupamientoKNV.orizaba = e.summaryCells[9][0].value;
        agrupamientoKNV.ramosArispe = e.summaryCells[10][0].value;
        agrupamientoKNV.total = e.summaryCells[11][0].value;

        totalAgrupamientoIKNV.cuautitlan = agrupamientoINV.cuautitlan / agrupamientoKNV.cuautitlan;
        totalAgrupamientoIKNV.tultitlan = agrupamientoINV.tultitlan / agrupamientoKNV.tultitlan;
        totalAgrupamientoIKNV.guadalajara = agrupamientoINV.guadalajara / agrupamientoKNV.guadalajara;
        totalAgrupamientoIKNV.hermosillo = agrupamientoINV.hermosillo / agrupamientoKNV.hermosillo;
        totalAgrupamientoIKNV.mexicali = agrupamientoINV.mexicali / agrupamientoKNV.mexicali;
        totalAgrupamientoIKNV.orizaba = agrupamientoINV.orizaba / agrupamientoKNV.orizaba;
        totalAgrupamientoIKNV.ramosArispe = agrupamientoINV.ramosArispe / agrupamientoKNV.ramosArispe;
        totalAgrupamientoIKNV.total = agrupamientoINV.total / agrupamientoKNV.total;
      }
      if (e.data.key == '12 DIC'){
        agrupamientoKDC.cuautitlan = e.summaryCells[4][0].value;
        agrupamientoKDC.tultitlan = e.summaryCells[5][0].value;
        agrupamientoKDC.guadalajara = e.summaryCells[6][0].value;
        agrupamientoKDC.hermosillo = e.summaryCells[7][0].value;
        agrupamientoKDC.mexicali = e.summaryCells[8][0].value;
        agrupamientoKDC.orizaba = e.summaryCells[9][0].value;
        agrupamientoKDC.ramosArispe = e.summaryCells[10][0].value;
        agrupamientoKDC.total = e.summaryCells[11][0].value;

        totalAgrupamientoIKDC.cuautitlan = agrupamientoIDC.cuautitlan / agrupamientoKDC.cuautitlan;
        totalAgrupamientoIKDC.tultitlan = agrupamientoIDC.tultitlan / agrupamientoKDC.tultitlan;
        totalAgrupamientoIKDC.guadalajara = agrupamientoIDC.guadalajara / agrupamientoKDC.guadalajara;
        totalAgrupamientoIKDC.hermosillo = agrupamientoIDC.hermosillo / agrupamientoKDC.hermosillo;
        totalAgrupamientoIKDC.mexicali = agrupamientoIDC.mexicali / agrupamientoKDC.mexicali;
        totalAgrupamientoIKDC.orizaba = agrupamientoIDC.orizaba / agrupamientoKDC.orizaba;
        totalAgrupamientoIKDC.ramosArispe = agrupamientoIDC.ramosArispe / agrupamientoKDC.ramosArispe;
        totalAgrupamientoIKDC.total = agrupamientoIDC.total / agrupamientoKDC.total;
      }
   

    }

    if(e.rowType == "totalFooter"){
      totalKilomentros.cuautitlan = e.summaryCells[4][0]?.value;
      totalKilomentros.tultitlan = e.summaryCells[5][0]?.value;
      totalKilomentros.guadalajara = e.summaryCells[6][0]?.value;
      totalKilomentros.hermosillo = e.summaryCells[7][0]?.value;
      totalKilomentros.mexicali = e.summaryCells[8][0]?.value;
      totalKilomentros.orizaba = e.summaryCells[9][0]?.value;
      totalKilomentros.ramosArispe = e.summaryCells[10][0].value;
      totalKilomentros.total = e.summaryCells[11][0].value;

      totalOperacionIK.cuautitlan = totalIngresos.cuautitlan / totalKilomentros.cuautitlan;
      totalOperacionIK.tultitlan = totalIngresos.tultitlan / totalKilomentros.tultitlan;
      totalOperacionIK.guadalajara = totalIngresos.guadalajara / totalKilomentros.guadalajara;
      totalOperacionIK.hermosillo = totalIngresos.hermosillo / totalKilomentros.hermosillo;
      totalOperacionIK.mexicali = totalIngresos.mexicali / totalKilomentros.mexicali;
      totalOperacionIK.orizaba = totalIngresos.orizaba / totalKilomentros.orizaba;
      totalOperacionIK.ramosArispe = totalIngresos.ramosArispe / totalKilomentros.ramosArispe;
      totalOperacionIK.total = totalIngresos.total / totalKilomentros.total;
    }
  }
  onCellPreparedK(e){
    if (e.rowType == 'group'){

      e.cellElement.style.fontSize = '12px';
      e.cellElement.style.background = "#DCDCDC";
    }

    if (e.rowType == 'totalFooter') {
      e.totalItem.cells.forEach((c: any) => {
        if (c.cellElement) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "16px";
            c.cellElement.style.background = "#ff9460";
            c.cellElement.style.color = "black"; 
        }   
      });
    }
  }
  customizeK(e) {  

    var gridCell = e.gridCell;
    if (gridCell.rowType === 'group') {
      
      e.backgroundColor = "#DCDCDC";
      e.fontWeight = "bolder"
      e.font = {bold: true}

  }

  if (gridCell.rowType === 'totalFooter') {
      
    e.backgroundColor = "#ff9460";
    e.fontWeight = "bolder"
    e.font = {bold: true}

  }
  }

//==============================INGRESOS KILOMETROS===============================
onCellPreparedPM(e){

  if (e.rowType == 'data'){

    e.cellElement.style.fontSize = '12px';
    e.cellElement.style.background = "#DCDCDC";
  }
}  

  onRowPreparedIK(e){
    if (e.rowType == 'group'){

      if(e.isExpanded == true){
        this.collapseGroup == true
      }


      if (e.data.key == '01 ENE') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value =  totalAgrupamientoIKE.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalAgrupamientoIKE.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalAgrupamientoIKE.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalAgrupamientoIKE.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalAgrupamientoIKE.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalAgrupamientoIKE.orizaba;
        }
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalAgrupamientoIKE.ramosArispe;
        }
        if(e.summaryCells[11].length !== 0){
        e.summaryCells[11][0].value = totalAgrupamientoIKE.total;
        }
      
      }

      if (e.data.key == '02 FEB') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalAgrupamientoIKF.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalAgrupamientoIKF.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalAgrupamientoIKF.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalAgrupamientoIKF.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalAgrupamientoIKF.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalAgrupamientoIKF.orizaba;
        }
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalAgrupamientoIKF.ramosArispe;
        }
        if(e.summaryCells[11].length !== 0){
        e.summaryCells[11][0].value = totalAgrupamientoIKF.total;
        }
      }

      if (e.data.key == '03 MAR') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalAgrupamientoIKM.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalAgrupamientoIKM.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalAgrupamientoIKM.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalAgrupamientoIKM.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalAgrupamientoIKM.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalAgrupamientoIKM.orizaba;
        }
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalAgrupamientoIKM.ramosArispe;
        }
        if(e.summaryCells[11].length !== 0){
        e.summaryCells[11][0].value = totalAgrupamientoIKM.total;
        }

      }

      if (e.data.key == '04 ABR') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalAgrupamientoIKA.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalAgrupamientoIKA.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalAgrupamientoIKA.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalAgrupamientoIKA.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalAgrupamientoIKA.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalAgrupamientoIKA.orizaba;
        }
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalAgrupamientoIKA.ramosArispe;
        }
        if(e.summaryCells[11].length !== 0){
        e.summaryCells[11][0].value = totalAgrupamientoIKA.total;
        }


      }

      if (e.data.key == '05 MAY') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalAgrupamientoIKMY.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalAgrupamientoIKMY.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalAgrupamientoIKMY.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalAgrupamientoIKMY.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalAgrupamientoIKMY.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalAgrupamientoIKMY.orizaba;
        }
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalAgrupamientoIKMY.ramosArispe;
        }
        if(e.summaryCells[11].length !== 0){
        e.summaryCells[11][0].value = totalAgrupamientoIKMY.total;
        }

      }

      if (e.data.key == '06 JUN') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalAgrupamientoIKJN.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalAgrupamientoIKJN.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalAgrupamientoIKJN.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalAgrupamientoIKJN.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalAgrupamientoIKJN.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalAgrupamientoIKJN.orizaba;
        }
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalAgrupamientoIKJN.ramosArispe;
        }
        if(e.summaryCells[11].length !== 0){
        e.summaryCells[11][0].value = totalAgrupamientoIKJN.total;
        }
      }

      if (e.data.key == '07 JUL') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalAgrupamientoIKJL.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalAgrupamientoIKJL.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalAgrupamientoIKJL.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalAgrupamientoIKJL.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalAgrupamientoIKJL.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalAgrupamientoIKJL.orizaba;
        }
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalAgrupamientoIKJL.ramosArispe;
        }
        if(e.summaryCells[11].length !== 0){
        e.summaryCells[11][0].value = totalAgrupamientoIKJL.total;
        }
      }

      if (e.data.key == '08 AGO') {
          if(e.summaryCells[4].length !== 0){
          e.summaryCells[4][0].value = totalAgrupamientoIKAG.cuautitlan;
          }

          if(e.summaryCells[5].length !== 0){
          e.summaryCells[5][0].value = totalAgrupamientoIKAG.tultitlan;
          }
        
          if(e.summaryCells[6].length !== 0){
          e.summaryCells[6][0].value = totalAgrupamientoIKAG.guadalajara;
          }
        
          if(e.summaryCells[7].length !== 0){
          e.summaryCells[7][0].value = totalAgrupamientoIKAG.hermosillo;
          }
        
          if(e.summaryCells[8].length !== 0){
          e.summaryCells[8][0].value = totalAgrupamientoIKAG.mexicali;
          }
        
          if(e.summaryCells[9].length !== 0){
          e.summaryCells[9][0].value = totalAgrupamientoIKAG.orizaba;
          }
        
          if(e.summaryCells[10].length !== 0){
          e.summaryCells[10][0].value = totalAgrupamientoIKAG.ramosArispe;
          }
        
          if(e.summaryCells[11].length !== 0){
          e.summaryCells[11][0].value = totalAgrupamientoIKAG.total;
          }
      }

      if (e.data.key == '09 SEP') {
        if(e.summaryCells[4][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKS.cuautitlan)){
            e.summaryCells[4][0].value = 0;  
          }else{
            e.summaryCells[4][0].value = totalAgrupamientoIKS.cuautitlan;
          }
        }
        if(e.summaryCells[5][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKS.tultitlan)){
            e.summaryCells[5][0].value = 0;  
          }else{
            e.summaryCells[5][0].value = totalAgrupamientoIKS.tultitlan;
          }
        }
        if(e.summaryCells[6][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKS.guadalajara)){
            e.summaryCells[6][0].value = 0;
          }else{
            e.summaryCells[6][0].value = totalAgrupamientoIKS.guadalajara;
          }
        }
        if(e.summaryCells[7][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKS.hermosillo)){
            e.summaryCells[7][0].value = 0;
          }else{
            e.summaryCells[7][0].value = totalAgrupamientoIKS.hermosillo;
          }
        }
        if(e.summaryCells[8][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKS.mexicali)){
            e.summaryCells[8][0].value = 0;
          }else{
            e.summaryCells[8][0].value = totalAgrupamientoIKS.mexicali;
          }
        }
        if(e.summaryCells[9][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKS.orizaba)){
            e.summaryCells[9][0].value = 0;
          }else{
            e.summaryCells[9][0].value = totalAgrupamientoIKS.orizaba;
          }
        }
        if(e.summaryCells[10][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKS.ramosArispe)){
            e.summaryCells[10][0].value = 0;
          }else{
            e.summaryCells[10][0].value = totalAgrupamientoIKS.ramosArispe;
          }
        }
        if(e.summaryCells[11][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKS.total)){
            e.summaryCells[11][0].value = 0;
          }else{
            e.summaryCells[11][0].value = totalAgrupamientoIKS.total;
          }
        }
      }

      if (e.data.key == '10 OCT') {
        if(e.summaryCells[4][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKOC.cuautitlan)){
            e.summaryCells[4][0].value = 0;
          }else{
            e.summaryCells[4][0].value = totalAgrupamientoIKOC.cuautitlan;
          }
        }
        if(e.summaryCells[5][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKOC.tultitlan)){
            e.summaryCells[5][0].value = 0;
          }else{
            e.summaryCells[5][0].value = totalAgrupamientoIKOC.tultitlan;
          }
        }
        if(e.summaryCells[6][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKOC.guadalajara)){
            e.summaryCells[6][0].value = 0;
          }else{
            e.summaryCells[6][0].value = totalAgrupamientoIKOC.guadalajara;
          }
        }
        if(e.summaryCells[7][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKOC.hermosillo)){
            e.summaryCells[7][0].value = 0;
          }else{
            e.summaryCells[7][0].value = totalAgrupamientoIKOC.hermosillo;
          }
        }
        if(e.summaryCells[8][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKOC.mexicali)){
            e.summaryCells[8][0].value = 0;
          }else{
            e.summaryCells[8][0].value = totalAgrupamientoIKOC.mexicali;
          }
        }
        if(e.summaryCells[9][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKOC.orizaba)){
            e.summaryCells[9][0].value = 0;
          }{
            e.summaryCells[9][0].value = totalAgrupamientoIKOC.orizaba;
          }
        }
        if(e.summaryCells[10][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKOC.ramosArispe)){
            e.summaryCells[10][0].value = 0;
          }else{
            e.summaryCells[10][0].value = totalAgrupamientoIKOC.ramosArispe;
          }
        }
        if(e.summaryCells[11][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKOC.total)){
            e.summaryCells[11][0].value = 0;
          }else{
            e.summaryCells[11][0].value = totalAgrupamientoIKOC.total;
          }
        }

      }

      if (e.data.key == '11 NOV') {
        if(e.summaryCells[4][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKNV.cuautitlan)){
            e.summaryCells[4][0].value = 0;
          }else{
            e.summaryCells[4][0].value = totalAgrupamientoIKNV.cuautitlan;
          }
        }
        if(e.summaryCells[5][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKNV.tultitlan)){
            e.summaryCells[5][0].value = 0;
          }else{
            e.summaryCells[5][0].value = totalAgrupamientoIKNV.tultitlan;
          }
        }
        if(e.summaryCells[6][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKNV.guadalajara)){
            e.summaryCells[6][0].value = 0;
          }else{
            e.summaryCells[6][0].value = totalAgrupamientoIKNV.guadalajara;
          }
        }
        if(e.summaryCells[7][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKNV.hermosillo)){
            e.summaryCells[7][0].value = 0;
          }else{
            e.summaryCells[7][0].value = totalAgrupamientoIKNV.hermosillo;
          }
        }
        if(e.summaryCells[8][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKNV.mexicali)){
            e.summaryCells[8][0].value = 0;
          }else{
            e.summaryCells[8][0].value = totalAgrupamientoIKNV.mexicali;
          }
        }
        if(e.summaryCells[9][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKNV.orizaba)){
            e.summaryCells[9][0].value = 0;
          }else{
            e.summaryCells[9][0].value = totalAgrupamientoIKNV.orizaba;
          }
        }
        if(e.summaryCells[10][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKNV.ramosArispe)){
            e.summaryCells[10][0].value = 0;
          }else{
            e.summaryCells[10][0].value = totalAgrupamientoIKNV.ramosArispe;
          }
        }
        if(e.summaryCells[11][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKNV.total)){
            e.summaryCells[11][0].value = 0;
          }else{
            e.summaryCells[11][0].value = totalAgrupamientoIKNV.total;
          }
        }
      }

      if (e.data.key == '12 DIC') {
        if(e.summaryCells[4][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKDC.cuautitlan)){
            e.summaryCells[4][0].value = 0;
          }else{
            e.summaryCells[4][0].value = totalAgrupamientoIKDC.cuautitlan;
          }
        }
        if(e.summaryCells[5][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKDC.tultitlan)){
            e.summaryCells[5][0].value = 0;
          }else{
            e.summaryCells[5][0].value = totalAgrupamientoIKDC.tultitlan;
          }
        }
        if(e.summaryCells[6][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKDC.guadalajara)){
            e.summaryCells[6][0].value = 0;
          }else{
            e.summaryCells[6][0].value = totalAgrupamientoIKDC.guadalajara;
          }
        }
        if(e.summaryCells[7][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKDC.hermosillo)){
            e.summaryCells[7][0].value = 0;
          }else{
            e.summaryCells[7][0].value = totalAgrupamientoIKDC.hermosillo;
          }
        }
        if(e.summaryCells[8][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKDC.mexicali)){
            e.summaryCells[8][0].value = 0;
          }else{
            e.summaryCells[8][0].value = totalAgrupamientoIKDC.mexicali;
          }
        }
        if(e.summaryCells[9][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKDC.orizaba)){
            e.summaryCells[9][0].value = 0;
          }else{
            e.summaryCells[9][0].value = totalAgrupamientoIKDC.orizaba;
          }
        }
        if(e.summaryCells[10][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKDC.ramosArispe)){
            e.summaryCells[10][0].value = 0;
          }else{
            e.summaryCells[10][0].value = totalAgrupamientoIKDC.ramosArispe;
        }
        }
        if(e.summaryCells[11][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKDC.total)){
            e.summaryCells[11][0].value = 0;
          }else{
            e.summaryCells[11][0].value = totalAgrupamientoIKDC.total;
          }
        }

      }
     
    }

    this.paginacion = 60;
    if(this.paginacion = 60){
      this.expandGroup = false
    }
  }


  CuautitlanTS = 0;
  TultitlanTS = 0;
  GuadalajaraTS = 0;
  HermosilloTS = 0;
  MexicaliTS = 0;
  OrizabaTS = 0;
  RamosATS = 0;
  TotalTS = 0;

  totalCuautitlan = 0;
  totalTultitlan = 0;
  totalGuadalajara = 0;
  totalHermosillo = 0;
  totalMexicali = 0;
  totalOrizaba = 0;
  totalRamosA = 0;
  totalTotal = 0;
  onCellPreparedIK(e){
    if (e.rowType == 'group'){

      e.cellElement.style.fontSize = '12px';
      e.cellElement.style.background = "#DCDCDC";

    }

    if (e.rowType == 'totalFooter') {
   
      e.totalItem.cells.forEach((c: any) => {
        if(c.totalItem.summaryCells[4][0]?.value != undefined){
          c.totalItem.summaryCells[4][0].value = totalOperacionIK.cuautitlan;
        }
        if(c.totalItem.summaryCells[5][0]?.value != undefined){
          c.totalItem.summaryCells[5][0].value = totalOperacionIK.tultitlan;
        }
        if(c.totalItem.summaryCells[6][0]?.value != undefined){
          c.totalItem.summaryCells[6][0].value = totalOperacionIK.guadalajara;
        }
        if(c.totalItem.summaryCells[7][0]?.value != undefined){
          c.totalItem.summaryCells[7][0].value = totalOperacionIK.hermosillo;          
        }
        if(c.totalItem.summaryCells[8][0]?.value != undefined){
          c.totalItem.summaryCells[8][0].value = totalOperacionIK.mexicali;
        }
        if(c.totalItem.summaryCells[9][0]?.value != undefined){
          c.totalItem.summaryCells[9][0].value = totalOperacionIK.orizaba;
        }
        if(c.totalItem.summaryCells[10][0]?.value != undefined){
          c.totalItem.summaryCells[10][0].value = totalOperacionIK.ramosArispe;
        }
        if(c.totalItem.summaryCells[11][0]?.value != undefined){
          c.totalItem.summaryCells[11][0].value = totalOperacionIK.total;
        }

        if (c.cellElement) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "16px";
            c.cellElement.style.background = "#ff9460";
            c.cellElement.style.color = "black"; 
        }   
      });
    }
  }

  //=============PARA DAR FORMATO Y ESTILOS AL EXPORTAR============================
  customizeIK(e) {  

    var gridCell = e.gridCell;

    if (gridCell.rowType === 'group') {
    
      e.backgroundColor = "#DCDCDC";
      e.fontWeight = "bolder"
      e.font = {bold: true}

    }

    if (gridCell.rowType === 'totalFooter') {

      e.backgroundColor = "#ff9460";
      e.fontWeight = "bolder"
      e.font = {bold: true}

    }

  }
  //=============PARA EDITAR EL DATA ANTES DE EXPORTAR=============================
  customizeExportData(cols, rows){  

    rows.forEach((row: any) =>{  
      
      var rowValues =  row.values;  

      if(row.rowType == "group"){
        if(row.key[0] == '01 ENE'){
          //(rowValues)
          rowValues[3][0].value = totalAgrupamientoIKE.cuautitlan;
          rowValues[4][0].value = totalAgrupamientoIKE.tultitlan;
          rowValues[5][0].value = totalAgrupamientoIKE.guadalajara;
          rowValues[6][0].value = totalAgrupamientoIKE.hermosillo;
          rowValues[7][0].value = totalAgrupamientoIKE.mexicali;
          rowValues[8][0].value = totalAgrupamientoIKE.orizaba;
          rowValues[9][0].value = totalAgrupamientoIKE.ramosArispe;
          rowValues[10][0].value = totalAgrupamientoIKE.total;
        }

        if(row.key[0] == '02 FEB'){

          rowValues[3][0].value = totalAgrupamientoIKF.cuautitlan;
          rowValues[4][0].value = totalAgrupamientoIKF.tultitlan;
          rowValues[5][0].value = totalAgrupamientoIKF.guadalajara;
          rowValues[6][0].value = totalAgrupamientoIKF.hermosillo;
          rowValues[7][0].value = totalAgrupamientoIKF.mexicali;
          rowValues[8][0].value = totalAgrupamientoIKF.orizaba;
          rowValues[9][0].value = totalAgrupamientoIKF.ramosArispe;
          rowValues[10][0].value = totalAgrupamientoIKF.total;
        }

        if(row.key[0] == '03 MAR'){

          rowValues[3][0].value = totalAgrupamientoIKM.cuautitlan;
          rowValues[4][0].value = totalAgrupamientoIKM.tultitlan;
          rowValues[5][0].value = totalAgrupamientoIKM.guadalajara;
          rowValues[6][0].value = totalAgrupamientoIKM.hermosillo;
          rowValues[7][0].value = totalAgrupamientoIKM.mexicali;
          rowValues[8][0].value = totalAgrupamientoIKM.orizaba;
          rowValues[9][0].value = totalAgrupamientoIKM.ramosArispe;
          rowValues[10][0].value = totalAgrupamientoIKM.total;
        }

        if(row.key[0] == '04 ABR'){

          rowValues[3][0].value = totalAgrupamientoIKA.cuautitlan;
          rowValues[4][0].value = totalAgrupamientoIKA.tultitlan;
          rowValues[5][0].value = totalAgrupamientoIKA.guadalajara;
          rowValues[6][0].value = totalAgrupamientoIKA.hermosillo;
          rowValues[7][0].value = totalAgrupamientoIKA.mexicali;
          rowValues[8][0].value = totalAgrupamientoIKA.orizaba;
          rowValues[9][0].value = totalAgrupamientoIKA.ramosArispe;
          rowValues[10][0].value = totalAgrupamientoIKA.total;
        }

        if(row.key[0] == '05 MAY'){

          rowValues[3][0].value = totalAgrupamientoIKMY.cuautitlan;
          rowValues[4][0].value = totalAgrupamientoIKMY.tultitlan;
          rowValues[5][0].value = totalAgrupamientoIKMY.guadalajara;
          rowValues[6][0].value = totalAgrupamientoIKMY.hermosillo;
          rowValues[7][0].value = totalAgrupamientoIKMY.mexicali;
          rowValues[8][0].value = totalAgrupamientoIKMY.orizaba;
          rowValues[9][0].value = totalAgrupamientoIKMY.ramosArispe;
          rowValues[10][0].value = totalAgrupamientoIKMY.total;
        }

        if(row.key[0] == '06 JUN'){

          rowValues[3][0].value = totalAgrupamientoIKJN.cuautitlan;
          rowValues[4][0].value = totalAgrupamientoIKJN.tultitlan;
          rowValues[5][0].value = totalAgrupamientoIKJN.guadalajara;
          rowValues[6][0].value = totalAgrupamientoIKJN.hermosillo;
          rowValues[7][0].value = totalAgrupamientoIKJN.mexicali;
          rowValues[8][0].value = totalAgrupamientoIKJN.orizaba;
          rowValues[9][0].value = totalAgrupamientoIKJN.ramosArispe;
          rowValues[10][0].value = totalAgrupamientoIKJN.total;
        }

        if(row.key[0] == '07 JUL'){

          rowValues[3][0].value = totalAgrupamientoIKJL.cuautitlan;
          rowValues[4][0].value = totalAgrupamientoIKJL.tultitlan;
          rowValues[5][0].value = totalAgrupamientoIKJL.guadalajara;
          rowValues[6][0].value = totalAgrupamientoIKJL.hermosillo;
          rowValues[7][0].value = totalAgrupamientoIKJL.mexicali;
          rowValues[8][0].value = totalAgrupamientoIKJL.orizaba;
          rowValues[9][0].value = totalAgrupamientoIKJL.ramosArispe;
          rowValues[10][0].value = totalAgrupamientoIKJL.total;

        }

        if(row.key[0] == '08 AGO'){

          rowValues[3][0].value = totalAgrupamientoIKAG.cuautitlan;
          rowValues[4][0].value = totalAgrupamientoIKAG.tultitlan;
          rowValues[5][0].value = totalAgrupamientoIKAG.guadalajara;
          rowValues[6][0].value = totalAgrupamientoIKAG.hermosillo;
          rowValues[7][0].value = totalAgrupamientoIKAG.mexicali;
          rowValues[8][0].value = totalAgrupamientoIKAG.orizaba;
          rowValues[9][0].value = totalAgrupamientoIKAG.ramosArispe;
          rowValues[10][0].value = totalAgrupamientoIKAG.total;

        }

        if(row.key[0] == '09 SEP'){

          rowValues[3][0].value = totalAgrupamientoIKS.cuautitlan;
          rowValues[4][0].value = totalAgrupamientoIKS.tultitlan;
          rowValues[5][0].value = totalAgrupamientoIKS.guadalajara;
          rowValues[6][0].value = totalAgrupamientoIKS.hermosillo;
          rowValues[7][0].value = totalAgrupamientoIKS.mexicali;
          rowValues[8][0].value = totalAgrupamientoIKS.orizaba;
          rowValues[9][0].value = totalAgrupamientoIKS.ramosArispe;
          rowValues[10][0].value = totalAgrupamientoIKS.total;

        }

        if(row.key[0] == '10 OCT'){

          rowValues[3][0].value = totalAgrupamientoIKOC.cuautitlan;
          rowValues[4][0].value = totalAgrupamientoIKOC.tultitlan;
          rowValues[5][0].value = totalAgrupamientoIKOC.guadalajara;
          rowValues[6][0].value = totalAgrupamientoIKOC.hermosillo;
          rowValues[7][0].value = totalAgrupamientoIKOC.mexicali;
          rowValues[8][0].value = totalAgrupamientoIKOC.orizaba;
          rowValues[9][0].value = totalAgrupamientoIKOC.ramosArispe;
          rowValues[10][0].value = totalAgrupamientoIKOC.total;

        }

        if(row.key[0] == '11 NOV'){

          rowValues[3][0].value = totalAgrupamientoIKNV.cuautitlan;
          rowValues[4][0].value = totalAgrupamientoIKNV.tultitlan;
          rowValues[5][0].value = totalAgrupamientoIKNV.guadalajara;
          rowValues[6][0].value = totalAgrupamientoIKNV.hermosillo;
          rowValues[7][0].value = totalAgrupamientoIKNV.mexicali;
          rowValues[8][0].value = totalAgrupamientoIKNV.orizaba;
          rowValues[9][0].value = totalAgrupamientoIKNV.ramosArispe;
          rowValues[10][0].value = totalAgrupamientoIKNV.total;

        }

        if(row.key[0] == '12 DIC'){

          rowValues[3][0].value = totalAgrupamientoIKDC.cuautitlan;
          rowValues[4][0].value = totalAgrupamientoIKDC.tultitlan;
          rowValues[5][0].value = totalAgrupamientoIKDC.guadalajara;
          rowValues[6][0].value = totalAgrupamientoIKDC.hermosillo;
          rowValues[7][0].value = totalAgrupamientoIKDC.mexicali;
          rowValues[8][0].value = totalAgrupamientoIKDC.orizaba;
          rowValues[9][0].value = totalAgrupamientoIKDC.ramosArispe;
          rowValues[10][0].value = totalAgrupamientoIKDC.total;

        }
      }

      if(row.rowType == "totalFooter"){
        row.values[3].value = totalOperacionIK.cuautitlan;
        row.values[4].value = totalOperacionIK.tultitlan;
        row.values[5].value = totalOperacionIK.guadalajara;
        row.values[6].value = totalOperacionIK.hermosillo;
        row.values[7].value = totalOperacionIK.mexicali;
        row.values[8].value = totalOperacionIK.orizaba;
        row.values[9].value = totalOperacionIK.ramosArispe;
      }

    });
  }  

//==============================VIAJES============================================
  onRowPreparedV(e){
    
  }
  onCellPreparedV(e){
    if (e.rowType == 'group'){

      e.cellElement.style.fontSize = '12px';
      e.cellElement.style.background = "#DCDCDC";
    }

    if (e.rowType == 'totalFooter') {
      e.totalItem.cells.forEach((c: any) => {
        if (c.cellElement) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "16px";
            c.cellElement.style.background = "#ff9460";
            c.cellElement.style.color = "black"; 
        }   
      });
    }
  }
  customizeV(e) {  

    var gridCell = e.gridCell;
    if (gridCell.rowType === 'group') {
      
      e.backgroundColor = "#DCDCDC";
      e.fontWeight = "bolder"
      e.font = {bold: true}

  }

  if (gridCell.rowType === 'totalFooter') {
      
    e.backgroundColor = "#ff9460";
    e.fontWeight = "bolder"
    e.font = {bold: true}

  }
  }

  //==============================VIAJES CARGADOS============================================
  onRowPreparedVC(event){
    
    if (event.rowType == 'group'){
      
      if (event.data.key == '01 ENE') {
         
        viajesCargadosE.cuautitlan = event.summaryCells[4][0]?.value;
        viajesCargadosE.tultitlan = event.summaryCells[5][0]?.value;
        viajesCargadosE.guadalajara = event.summaryCells[6][0]?.value;
        viajesCargadosE.hermosillo = event.summaryCells[7][0]?.value;
        viajesCargadosE.mexicali = event.summaryCells[8][0]?.value;
        viajesCargadosE.orizaba = event.summaryCells[9][0]?.value;
        viajesCargadosE.ramosArispe = event.summaryCells[10][0]?.value;
        viajesCargadosE.total = event.summaryCells[11][0]?.value;

        totalIVCE.cuautitlan = agrupamientoIE.cuautitlan / viajesCargadosE.cuautitlan;
        totalIVCE.tultitlan = agrupamientoIE.tultitlan / viajesCargadosE.tultitlan;
        totalIVCE.guadalajara = agrupamientoIE.guadalajara / viajesCargadosE.guadalajara;
        totalIVCE.hermosillo = agrupamientoIE.hermosillo / viajesCargadosE.hermosillo;
        totalIVCE.mexicali = agrupamientoIE.mexicali / viajesCargadosE.mexicali;
        totalIVCE.orizaba = agrupamientoIE.orizaba / viajesCargadosE.orizaba;
        totalIVCE.ramosArispe = agrupamientoIE.ramosArispe / viajesCargadosE.ramosArispe;
        totalIVCE.total = agrupamientoIE.total / viajesCargadosE.total;

        totalKVCE.cuautitlan = agrupamientoKE.cuautitlan / viajesCargadosE.cuautitlan;
        totalKVCE.tultitlan = agrupamientoKE.tultitlan / viajesCargadosE.tultitlan;
        totalKVCE.guadalajara = agrupamientoKE.guadalajara / viajesCargadosE.guadalajara;
        totalKVCE.hermosillo = agrupamientoKE.hermosillo / viajesCargadosE.hermosillo;
        totalKVCE.mexicali = agrupamientoKE.mexicali / viajesCargadosE.mexicali;
        totalKVCE.orizaba = agrupamientoKE.orizaba / viajesCargadosE.orizaba;
        totalKVCE.ramosArispe = agrupamientoKE.ramosArispe / viajesCargadosE.ramosArispe;
        totalKVCE.total = agrupamientoKE.total / viajesCargadosE.total;


      }
      if (event.data.key == '02 FEB'){
        viajesCargadosF.cuautitlan = event.summaryCells[4][0]?.value;
        viajesCargadosF.tultitlan = event.summaryCells[5][0]?.value;
        viajesCargadosF.guadalajara = event.summaryCells[6][0]?.value;
        viajesCargadosF.hermosillo = event.summaryCells[7][0]?.value;
        viajesCargadosF.mexicali = event.summaryCells[8][0]?.value;
        viajesCargadosF.orizaba = event.summaryCells[9][0]?.value;
        viajesCargadosF.ramosArispe = event.summaryCells[10][0]?.value;
        viajesCargadosF.total = event.summaryCells[11][0]?.value;

        totalIVCF.cuautitlan = agrupamientoIF.cuautitlan / viajesCargadosF.cuautitlan;
        totalIVCF.tultitlan = agrupamientoIF.tultitlan / viajesCargadosF.tultitlan;
        totalIVCF.guadalajara = agrupamientoIF.guadalajara / viajesCargadosF.guadalajara;
        totalIVCF.hermosillo = agrupamientoIF.hermosillo / viajesCargadosF.hermosillo;
        totalIVCF.mexicali = agrupamientoIF.mexicali / viajesCargadosF.mexicali;
        totalIVCF.orizaba = agrupamientoIF.orizaba / viajesCargadosF.orizaba;
        totalIVCF.ramosArispe = agrupamientoIF.ramosArispe / viajesCargadosF.ramosArispe;
        totalIVCF.total = agrupamientoIF.total / viajesCargadosF.total;

        totalKVCF.cuautitlan = agrupamientoKF.cuautitlan / viajesCargadosF.cuautitlan;
        totalKVCF.tultitlan = agrupamientoKF.tultitlan / viajesCargadosF.tultitlan;
        totalKVCF.guadalajara = agrupamientoKF.guadalajara / viajesCargadosF.guadalajara;
        totalKVCF.hermosillo = agrupamientoKF.hermosillo / viajesCargadosF.hermosillo;
        totalKVCF.mexicali = agrupamientoKF.mexicali / viajesCargadosF.mexicali;
        totalKVCF.orizaba = agrupamientoKF.orizaba / viajesCargadosF.orizaba;
        totalKVCF.ramosArispe = agrupamientoKF.ramosArispe / viajesCargadosF.ramosArispe;
        totalKVCF.total = agrupamientoKF.total / viajesCargadosF.total;
      }
      if (event.data.key == '03 MAR'){
        viajesCargadosM.cuautitlan = event.summaryCells[4][0]?.value;
        viajesCargadosM.tultitlan = event.summaryCells[5][0]?.value;
        viajesCargadosM.guadalajara = event.summaryCells[6][0]?.value;
        viajesCargadosM.hermosillo = event.summaryCells[7][0]?.value;
        viajesCargadosM.mexicali = event.summaryCells[8][0]?.value;
        viajesCargadosM.orizaba = event.summaryCells[9][0]?.value;
        viajesCargadosM.ramosArispe = event.summaryCells[10][0]?.value;
        viajesCargadosM.total = event.summaryCells[11][0]?.value;

        totalIVCM.cuautitlan = agrupamientoIM.cuautitlan / viajesCargadosM.cuautitlan;
        totalIVCM.tultitlan = agrupamientoIM.tultitlan / viajesCargadosM.tultitlan;
        totalIVCM.guadalajara = agrupamientoIM.guadalajara / viajesCargadosM.guadalajara;
        totalIVCM.hermosillo = agrupamientoIM.hermosillo / viajesCargadosM.hermosillo;
        totalIVCM.mexicali = agrupamientoIM.mexicali / viajesCargadosM.mexicali;
        totalIVCM.orizaba = agrupamientoIM.orizaba / viajesCargadosM.orizaba;
        totalIVCM.ramosArispe = agrupamientoIM.ramosArispe / viajesCargadosM.ramosArispe;
        totalIVCM.total = agrupamientoIM.total / viajesCargadosM.total;

        totalKVCM.cuautitlan = agrupamientoKM.cuautitlan / viajesCargadosM.cuautitlan;
        totalKVCM.tultitlan = agrupamientoKM.tultitlan / viajesCargadosM.tultitlan;
        totalKVCM.guadalajara = agrupamientoKM.guadalajara / viajesCargadosM.guadalajara;
        totalKVCM.hermosillo = agrupamientoKM.hermosillo / viajesCargadosM.hermosillo;
        totalKVCM.mexicali = agrupamientoKM.mexicali / viajesCargadosM.mexicali;
        totalKVCM.orizaba = agrupamientoKM.orizaba / viajesCargadosM.orizaba;
        totalKVCM.ramosArispe = agrupamientoKM.ramosArispe / viajesCargadosM.ramosArispe;
        totalKVCM.total = agrupamientoKM.total / viajesCargadosM.total;
      }
      if (event.data.key == '04 ABR'){
        viajesCargadosA.cuautitlan = event.summaryCells[4][0]?.value;
        viajesCargadosA.tultitlan = event.summaryCells[5][0]?.value;
        viajesCargadosA.guadalajara = event.summaryCells[6][0]?.value;
        viajesCargadosA.hermosillo = event.summaryCells[7][0]?.value;
        viajesCargadosA.mexicali = event.summaryCells[8][0]?.value;
        viajesCargadosA.orizaba = event.summaryCells[9][0]?.value;
        viajesCargadosA.ramosArispe = event.summaryCells[10][0]?.value;
        viajesCargadosA.total = event.summaryCells[11][0]?.value;

        totalIVCA.cuautitlan = agrupamientoIA.cuautitlan / viajesCargadosA.cuautitlan;
        totalIVCA.tultitlan = agrupamientoIA.tultitlan / viajesCargadosA.tultitlan;
        totalIVCA.guadalajara = agrupamientoIA.guadalajara / viajesCargadosA.guadalajara;
        totalIVCA.hermosillo = agrupamientoIA.hermosillo / viajesCargadosA.hermosillo;
        totalIVCA.mexicali = agrupamientoIA.mexicali / viajesCargadosA.mexicali;
        totalIVCA.orizaba = agrupamientoIA.orizaba / viajesCargadosA.orizaba;
        totalIVCA.ramosArispe = agrupamientoIA.ramosArispe / viajesCargadosA.ramosArispe;
        totalIVCA.total = agrupamientoIA.total / viajesCargadosA.total;

        totalKVCA.cuautitlan = agrupamientoKA.cuautitlan / viajesCargadosA.cuautitlan;
        totalKVCA.tultitlan = agrupamientoKA.tultitlan / viajesCargadosA.tultitlan;
        totalKVCA.guadalajara = agrupamientoKA.guadalajara / viajesCargadosA.guadalajara;
        totalKVCA.hermosillo = agrupamientoKA.hermosillo / viajesCargadosA.hermosillo;
        totalKVCA.mexicali = agrupamientoKA.mexicali / viajesCargadosA.mexicali;
        totalKVCA.orizaba = agrupamientoKA.orizaba / viajesCargadosA.orizaba;
        totalKVCA.ramosArispe = agrupamientoKA.ramosArispe / viajesCargadosA.ramosArispe;
        totalKVCA.total = agrupamientoKA.total / viajesCargadosA.total;
      }
      if (event.data.key == '05 MAY'){
        viajesCargadosMY.cuautitlan = event.summaryCells[4][0]?.value;
        viajesCargadosMY.tultitlan = event.summaryCells[5][0]?.value;
        viajesCargadosMY.guadalajara = event.summaryCells[6][0]?.value;
        viajesCargadosMY.hermosillo = event.summaryCells[7][0]?.value;
        viajesCargadosMY.mexicali = event.summaryCells[8][0]?.value;
        viajesCargadosMY.orizaba = event.summaryCells[9][0]?.value;
        viajesCargadosMY.ramosArispe = event.summaryCells[10][0]?.value;
        viajesCargadosMY.total = event.summaryCells[11][0]?.value;

        totalIVCMY.cuautitlan = agrupamientoIMY.cuautitlan / viajesCargadosMY.cuautitlan;
        totalIVCMY.tultitlan = agrupamientoIMY.tultitlan / viajesCargadosMY.tultitlan;
        totalIVCMY.guadalajara = agrupamientoIMY.guadalajara / viajesCargadosMY.guadalajara;
        totalIVCMY.hermosillo = agrupamientoIMY.hermosillo / viajesCargadosMY.hermosillo;
        totalIVCMY.mexicali = agrupamientoIMY.mexicali / viajesCargadosMY.mexicali;
        totalIVCMY.orizaba = agrupamientoIMY.orizaba / viajesCargadosMY.orizaba;
        totalIVCMY.ramosArispe = agrupamientoIMY.ramosArispe / viajesCargadosMY.ramosArispe;
        totalIVCMY.total = agrupamientoIMY.total / viajesCargadosMY.total;

        totalKVCMY.cuautitlan = agrupamientoKMY.cuautitlan / viajesCargadosMY.cuautitlan;
        totalKVCMY.tultitlan = agrupamientoKMY.tultitlan / viajesCargadosMY.tultitlan;
        totalKVCMY.guadalajara = agrupamientoKMY.guadalajara / viajesCargadosMY.guadalajara;
        totalKVCMY.hermosillo = agrupamientoKMY.hermosillo / viajesCargadosMY.hermosillo;
        totalKVCMY.mexicali = agrupamientoKMY.mexicali / viajesCargadosMY.mexicali;
        totalKVCMY.orizaba = agrupamientoKMY.orizaba / viajesCargadosMY.orizaba;
        totalKVCMY.ramosArispe = agrupamientoKMY.ramosArispe / viajesCargadosMY.ramosArispe;
        totalKVCMY.total = agrupamientoKMY.total / viajesCargadosMY.total;
      }
      if (event.data.key == '06 JUN'){
        viajesCargadosJN.cuautitlan = event.summaryCells[4][0]?.value;
        viajesCargadosJN.tultitlan = event.summaryCells[5][0]?.value;
        viajesCargadosJN.guadalajara = event.summaryCells[6][0]?.value;
        viajesCargadosJN.hermosillo = event.summaryCells[7][0]?.value;
        viajesCargadosJN.mexicali = event.summaryCells[8][0]?.value;
        viajesCargadosJN.orizaba = event.summaryCells[9][0]?.value;
        viajesCargadosJN.ramosArispe = event.summaryCells[10][0]?.value;
        viajesCargadosJN.total = event.summaryCells[11][0]?.value;

        totalIVCJN.cuautitlan = agrupamientoIJN.cuautitlan / viajesCargadosJN.cuautitlan;
        totalIVCJN.tultitlan = agrupamientoIJN.tultitlan / viajesCargadosJN.tultitlan;
        totalIVCJN.guadalajara = agrupamientoIJN.guadalajara / viajesCargadosJN.guadalajara;
        totalIVCJN.hermosillo = agrupamientoIJN.hermosillo / viajesCargadosJN.hermosillo;
        totalIVCJN.mexicali = agrupamientoIJN.mexicali / viajesCargadosJN.mexicali;
        totalIVCJN.orizaba = agrupamientoIJN.orizaba / viajesCargadosJN.orizaba;
        totalIVCJN.ramosArispe = agrupamientoIJN.ramosArispe / viajesCargadosJN.ramosArispe;
        totalIVCJN.total = agrupamientoIJN.total / viajesCargadosJN.total;

        totalKVCJN.cuautitlan = agrupamientoKJN.cuautitlan / viajesCargadosJN.cuautitlan;
        totalKVCJN.tultitlan = agrupamientoKJN.tultitlan / viajesCargadosJN.tultitlan;
        totalKVCJN.guadalajara = agrupamientoKJN.guadalajara / viajesCargadosJN.guadalajara;
        totalKVCJN.hermosillo = agrupamientoKJN.hermosillo / viajesCargadosJN.hermosillo;
        totalKVCJN.mexicali = agrupamientoKJN.mexicali / viajesCargadosJN.mexicali;
        totalKVCJN.orizaba = agrupamientoKJN.orizaba / viajesCargadosJN.orizaba;
        totalKVCJN.ramosArispe = agrupamientoKJN.ramosArispe / viajesCargadosJN.ramosArispe;
        totalKVCJN.total = agrupamientoKJN.total / viajesCargadosJN.total;
      }
      if (event.data.key == '07 JUL'){
        viajesCargadosJL.cuautitlan = event.summaryCells[4][0]?.value;
        viajesCargadosJL.tultitlan = event.summaryCells[5][0]?.value;
        viajesCargadosJL.guadalajara = event.summaryCells[6][0]?.value;
        viajesCargadosJL.hermosillo = event.summaryCells[7][0]?.value;
        viajesCargadosJL.mexicali = event.summaryCells[8][0]?.value;
        viajesCargadosJL.orizaba = event.summaryCells[9][0]?.value;
        viajesCargadosJL.ramosArispe = event.summaryCells[10][0]?.value;
        viajesCargadosJL.total = event.summaryCells[11][0]?.value;

        totalIVCJL.cuautitlan = agrupamientoIJL.cuautitlan / viajesCargadosJL.cuautitlan;
        totalIVCJL.tultitlan = agrupamientoIJL.tultitlan / viajesCargadosJL.tultitlan;
        totalIVCJL.guadalajara = agrupamientoIJL.guadalajara / viajesCargadosJL.guadalajara;
        totalIVCJL.hermosillo = agrupamientoIJL.hermosillo / viajesCargadosJL.hermosillo;
        totalIVCJL.mexicali = agrupamientoIJL.mexicali / viajesCargadosJL.mexicali;
        totalIVCJL.orizaba = agrupamientoIJL.orizaba / viajesCargadosJL.orizaba;
        totalIVCJL.ramosArispe = agrupamientoIJL.ramosArispe / viajesCargadosJL.ramosArispe;
        totalIVCJL.total = agrupamientoIJL.total / viajesCargadosJL.total;

        totalKVCJL.cuautitlan = agrupamientoKJL.cuautitlan / viajesCargadosJL.cuautitlan;
        totalKVCJL.tultitlan = agrupamientoKJL.tultitlan / viajesCargadosJL.tultitlan;
        totalKVCJL.guadalajara = agrupamientoKJL.guadalajara / viajesCargadosJL.guadalajara;
        totalKVCJL.hermosillo = agrupamientoKJL.hermosillo / viajesCargadosJL.hermosillo;
        totalKVCJL.mexicali = agrupamientoKJL.mexicali / viajesCargadosJL.mexicali;
        totalKVCJL.orizaba = agrupamientoKJL.orizaba / viajesCargadosJL.orizaba;
        totalKVCJL.ramosArispe = agrupamientoKJL.ramosArispe / viajesCargadosJL.ramosArispe;
        totalKVCJL.total = agrupamientoKJL.total / viajesCargadosJL.total;
      }
      if (event.data.key == '08 AGO'){
        viajesCargadosAG.cuautitlan = event.summaryCells[4][0]?.value;
        viajesCargadosAG.tultitlan = event.summaryCells[5][0]?.value;
        viajesCargadosAG.guadalajara = event.summaryCells[6][0]?.value;
        viajesCargadosAG.hermosillo = event.summaryCells[7][0]?.value;
        viajesCargadosAG.mexicali = event.summaryCells[8][0]?.value;
        viajesCargadosAG.orizaba = event.summaryCells[9][0]?.value;
        viajesCargadosAG.ramosArispe = event.summaryCells[10][0]?.value;
        viajesCargadosAG.total = event.summaryCells[11][0]?.value;

        totalIVCAG.cuautitlan = agrupamientoIAG.cuautitlan / viajesCargadosAG.cuautitlan;
        totalIVCAG.tultitlan = agrupamientoIAG.tultitlan / viajesCargadosAG.tultitlan;
        totalIVCAG.guadalajara = agrupamientoIAG.guadalajara / viajesCargadosAG.guadalajara;
        totalIVCAG.hermosillo = agrupamientoIAG.hermosillo / viajesCargadosAG.hermosillo;
        totalIVCAG.mexicali = agrupamientoIAG.mexicali / viajesCargadosAG.mexicali;
        totalIVCAG.orizaba = agrupamientoIAG.orizaba / viajesCargadosAG.orizaba;
        totalIVCAG.ramosArispe = agrupamientoIAG.ramosArispe / viajesCargadosAG.ramosArispe;
        totalIVCAG.total = agrupamientoIAG.total / viajesCargadosAG.total;

        totalKVCAG.cuautitlan = agrupamientoKAG.cuautitlan / viajesCargadosAG.cuautitlan;
        totalKVCAG.tultitlan = agrupamientoKAG.tultitlan / viajesCargadosAG.tultitlan;
        totalKVCAG.guadalajara = agrupamientoKAG.guadalajara / viajesCargadosAG.guadalajara;
        totalKVCAG.hermosillo = agrupamientoKAG.hermosillo / viajesCargadosAG.hermosillo;
        totalKVCAG.mexicali = agrupamientoKAG.mexicali / viajesCargadosAG.mexicali;
        totalKVCAG.orizaba = agrupamientoKAG.orizaba / viajesCargadosAG.orizaba;
        totalKVCAG.ramosArispe = agrupamientoKAG.ramosArispe / viajesCargadosAG.ramosArispe;
        totalKVCAG.total = agrupamientoKAG.total / viajesCargadosAG.total;
      }
      if (event.data.key == '09 SEP'){
        viajesCargadosS.cuautitlan = event.summaryCells[4][0].value;
        viajesCargadosS.tultitlan = event.summaryCells[5][0].value;
        viajesCargadosS.guadalajara = event.summaryCells[6][0].value;
        viajesCargadosS.hermosillo = event.summaryCells[7][0].value;
        viajesCargadosS.mexicali = event.summaryCells[8][0].value;
        viajesCargadosS.orizaba = event.summaryCells[9][0].value;
        viajesCargadosS.ramosArispe = event.summaryCells[10][0].value;
        viajesCargadosS.total = event.summaryCells[11][0].value;

        totalIVCS.cuautitlan = agrupamientoIS.cuautitlan / viajesCargadosS.cuautitlan;
        totalIVCS.tultitlan = agrupamientoIS.tultitlan / viajesCargadosS.tultitlan;
        totalIVCS.guadalajara = agrupamientoIS.guadalajara / viajesCargadosS.guadalajara;
        totalIVCS.hermosillo = agrupamientoIS.hermosillo / viajesCargadosS.hermosillo;
        totalIVCS.mexicali = agrupamientoIS.mexicali / viajesCargadosS.mexicali;
        totalIVCS.orizaba = agrupamientoIS.orizaba / viajesCargadosS.orizaba;
        totalIVCS.ramosArispe = agrupamientoIS.ramosArispe / viajesCargadosS.ramosArispe;
        totalIVCS.total = agrupamientoIS.total / viajesCargadosS.total;

        totalKVCS.cuautitlan = agrupamientoKS.cuautitlan / viajesCargadosS.cuautitlan;
        totalKVCS.tultitlan = agrupamientoKS.tultitlan / viajesCargadosS.tultitlan;
        totalKVCS.guadalajara = agrupamientoKS.guadalajara / viajesCargadosS.guadalajara;
        totalKVCS.hermosillo = agrupamientoKS.hermosillo / viajesCargadosS.hermosillo;
        totalKVCS.mexicali = agrupamientoKS.mexicali / viajesCargadosS.mexicali;
        totalKVCS.orizaba = agrupamientoKS.orizaba / viajesCargadosS.orizaba;
        totalKVCS.ramosArispe = agrupamientoKS.ramosArispe / viajesCargadosS.ramosArispe;
        totalKVCS.total = agrupamientoKS.total / viajesCargadosS.total;
      }
      if (event.data.key == '10 OCT'){
        viajesCargadosOC.cuautitlan = event.summaryCells[4][0].value;
        viajesCargadosOC.tultitlan = event.summaryCells[5][0].value;
        viajesCargadosOC.guadalajara = event.summaryCells[6][0].value;
        viajesCargadosOC.hermosillo = event.summaryCells[7][0].value;
        viajesCargadosOC.mexicali = event.summaryCells[8][0].value;
        viajesCargadosOC.orizaba = event.summaryCells[9][0].value;
        viajesCargadosOC.ramosArispe = event.summaryCells[10][0].value;
        viajesCargadosOC.total = event.summaryCells[11][0].value;

        totalIVCOC.cuautitlan = agrupamientoIOC.cuautitlan / viajesCargadosOC.cuautitlan;
        totalIVCOC.tultitlan = agrupamientoIOC.tultitlan / viajesCargadosOC.tultitlan;
        totalIVCOC.guadalajara = agrupamientoIOC.guadalajara / viajesCargadosOC.guadalajara;
        totalIVCOC.hermosillo = agrupamientoIOC.hermosillo / viajesCargadosOC.hermosillo;
        totalIVCOC.mexicali = agrupamientoIOC.mexicali / viajesCargadosOC.mexicali;
        totalIVCOC.orizaba = agrupamientoIOC.orizaba / viajesCargadosOC.orizaba;
        totalIVCOC.ramosArispe = agrupamientoIOC.ramosArispe / viajesCargadosOC.ramosArispe;
        totalIVCOC.total = agrupamientoIOC.total / viajesCargadosOC.total;

        totalKVCOC.cuautitlan = agrupamientoKOC.cuautitlan / viajesCargadosOC.cuautitlan;
        totalKVCOC.tultitlan = agrupamientoKOC.tultitlan / viajesCargadosOC.tultitlan;
        totalKVCOC.guadalajara = agrupamientoKOC.guadalajara / viajesCargadosOC.guadalajara;
        totalKVCOC.hermosillo = agrupamientoKOC.hermosillo / viajesCargadosOC.hermosillo;
        totalKVCOC.mexicali = agrupamientoKOC.mexicali / viajesCargadosOC.mexicali;
        totalKVCOC.orizaba = agrupamientoKOC.orizaba / viajesCargadosOC.orizaba;
        totalKVCOC.ramosArispe = agrupamientoKOC.ramosArispe / viajesCargadosOC.ramosArispe;
        totalKVCOC.total = agrupamientoKOC.total / viajesCargadosOC.total;
      }
      if (event.data.key == '11 NOV'){
        viajesCargadosNV.cuautitlan = event.summaryCells[4][0].value;
        viajesCargadosNV.tultitlan = event.summaryCells[5][0].value;
        viajesCargadosNV.guadalajara = event.summaryCells[6][0].value;
        viajesCargadosNV.hermosillo = event.summaryCells[7][0].value;
        viajesCargadosNV.mexicali = event.summaryCells[8][0].value;
        viajesCargadosNV.orizaba = event.summaryCells[9][0].value;
        viajesCargadosNV.ramosArispe = event.summaryCells[10][0].value;
        viajesCargadosNV.total = event.summaryCells[11][0].value;

        totalIVCNV.cuautitlan = agrupamientoINV.cuautitlan / viajesCargadosNV.cuautitlan;
        totalIVCNV.tultitlan = agrupamientoINV.tultitlan / viajesCargadosNV.tultitlan;
        totalIVCNV.guadalajara = agrupamientoINV.guadalajara / viajesCargadosNV.guadalajara;
        totalIVCNV.hermosillo = agrupamientoINV.hermosillo / viajesCargadosNV.hermosillo;
        totalIVCNV.mexicali = agrupamientoINV.mexicali / viajesCargadosNV.mexicali;
        totalIVCNV.orizaba = agrupamientoINV.orizaba / viajesCargadosNV.orizaba;
        totalIVCNV.ramosArispe = agrupamientoINV.ramosArispe / viajesCargadosNV.ramosArispe;
        totalIVCNV.total = agrupamientoINV.total / viajesCargadosNV.total;

        totalKVCNV.cuautitlan = agrupamientoKNV.cuautitlan / viajesCargadosNV.cuautitlan;
        totalKVCNV.tultitlan = agrupamientoKNV.tultitlan / viajesCargadosNV.tultitlan;
        totalKVCNV.guadalajara = agrupamientoKNV.guadalajara / viajesCargadosNV.guadalajara;
        totalKVCNV.hermosillo = agrupamientoKNV.hermosillo / viajesCargadosNV.hermosillo;
        totalKVCNV.mexicali = agrupamientoKNV.mexicali / viajesCargadosNV.mexicali;
        totalKVCNV.orizaba = agrupamientoKNV.orizaba / viajesCargadosNV.orizaba;
        totalKVCNV.ramosArispe = agrupamientoKNV.ramosArispe / viajesCargadosNV.ramosArispe;
        totalKVCNV.total = agrupamientoKNV.total / viajesCargadosNV.total;
      }
      if (event.data.key == '12 DIC'){
        viajesCargadosDC.cuautitlan = event.summaryCells[4][0].value;
        viajesCargadosDC.tultitlan = event.summaryCells[5][0].value;
        viajesCargadosDC.guadalajara = event.summaryCells[6][0].value;
        viajesCargadosDC.hermosillo = event.summaryCells[7][0].value;
        viajesCargadosDC.mexicali = event.summaryCells[8][0].value;
        viajesCargadosDC.orizaba = event.summaryCells[9][0].value;
        viajesCargadosDC.ramosArispe = event.summaryCells[10][0].value;
        viajesCargadosDC.total = event.summaryCells[11][0].value;

        totalIVCDC.cuautitlan = agrupamientoIDC.cuautitlan / viajesCargadosDC.cuautitlan;
        totalIVCDC.tultitlan = agrupamientoIDC.tultitlan / viajesCargadosDC.tultitlan;
        totalIVCDC.guadalajara = agrupamientoIDC.guadalajara / viajesCargadosDC.guadalajara;
        totalIVCDC.hermosillo = agrupamientoIDC.hermosillo / viajesCargadosDC.hermosillo;
        totalIVCDC.mexicali = agrupamientoIDC.mexicali / viajesCargadosDC.mexicali;
        totalIVCDC.orizaba = agrupamientoIDC.orizaba / viajesCargadosDC.orizaba;
        totalIVCDC.ramosArispe = agrupamientoIDC.ramosArispe / viajesCargadosDC.ramosArispe;
        totalIVCDC.total = agrupamientoIDC.total / viajesCargadosDC.total;

        totalKVCDC.cuautitlan = agrupamientoKDC.cuautitlan / viajesCargadosDC.cuautitlan;
        totalKVCDC.tultitlan = agrupamientoKDC.tultitlan / viajesCargadosDC.tultitlan;
        totalKVCDC.guadalajara = agrupamientoKDC.guadalajara / viajesCargadosDC.guadalajara;
        totalKVCDC.hermosillo = agrupamientoKDC.hermosillo / viajesCargadosDC.hermosillo;
        totalKVCDC.mexicali = agrupamientoKDC.mexicali / viajesCargadosDC.mexicali;
        totalKVCDC.orizaba = agrupamientoKDC.orizaba / viajesCargadosDC.orizaba;
        totalKVCDC.ramosArispe = agrupamientoKDC.ramosArispe / viajesCargadosDC.ramosArispe;
        totalKVCDC.total = agrupamientoKDC.total / viajesCargadosDC.total;
      }
    }

    if(event.rowType == "totalFooter"){
      totalVC.cuautitlan = event.summaryCells[4][0]?.value;
      totalVC.tultitlan = event.summaryCells[5][0]?.value;
      totalVC.guadalajara = event.summaryCells[6][0]?.value;
      totalVC.hermosillo = event.summaryCells[7][0]?.value;
      totalVC.mexicali = event.summaryCells[8][0]?.value;
      totalVC.orizaba = event.summaryCells[9][0]?.value;
      totalVC.ramosArispe = event.summaryCells[10][0]?.value;
      totalVC.total = event.summaryCells[11][0]?.value

      totalOperacionIVC.cuautitlan = totalIngresos.cuautitlan / totalVC.cuautitlan;
      totalOperacionIVC.tultitlan = totalIngresos.tultitlan / totalVC.tultitlan;
      totalOperacionIVC.guadalajara = totalIngresos.guadalajara / totalVC.guadalajara;
      totalOperacionIVC.hermosillo = totalIngresos.hermosillo / totalVC.hermosillo;
      totalOperacionIVC.mexicali = totalIngresos.mexicali / totalVC.mexicali;
      totalOperacionIVC.orizaba = totalIngresos.orizaba / totalVC.orizaba;
      totalOperacionIVC.ramosArispe = totalIngresos.ramosArispe / totalVC.ramosArispe;
      totalOperacionIVC.total = totalIngresos.total / totalVC.total;

      totalOperacionKVC.cuautitlan = totalKilomentros.cuautitlan / totalVC.cuautitlan;
      totalOperacionKVC.tultitlan = totalKilomentros.tultitlan / totalVC.tultitlan;
      totalOperacionKVC.guadalajara = totalKilomentros.guadalajara / totalVC.guadalajara;
      totalOperacionKVC.hermosillo = totalKilomentros.hermosillo / totalVC.hermosillo;
      totalOperacionKVC.mexicali = totalKilomentros.mexicali / totalVC.mexicali;
      totalOperacionKVC.orizaba = totalKilomentros.orizaba / totalVC.orizaba;
      totalOperacionKVC.ramosArispe = totalKilomentros.ramosArispe / totalVC.ramosArispe;
      totalOperacionKVC.total = totalKilomentros.total / totalVC.total;


    }

  }
  onCellPreparedVC(e){
    if (e.rowType == 'group'){

      e.cellElement.style.fontSize = '12px';
      e.cellElement.style.background = "#DCDCDC";
    }

    if (e.rowType == 'totalFooter') {
      e.totalItem.cells.forEach((c: any) => {
        if (c.cellElement) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "16px";
            c.cellElement.style.background = "#ff9460";
            c.cellElement.style.color = "black"; 
        }   
      });
    }
  }
  customizeVC(e) {  

    var gridCell = e.gridCell;
    if (gridCell.rowType === 'group') {
      
      e.backgroundColor = "#DCDCDC";
      e.fontWeight = "bolder"
      e.font = {bold: true}

  }

  if (gridCell.rowType === 'totalFooter') {
      
    e.backgroundColor = "#ff9460";
    e.fontWeight = "bolder"
    e.font = {bold: true}

  }
  }

//==============================VIAJES KILOMETROS=================================
  onRowPreparedKV(e){

    if (e.rowType == 'group'){

      if(e.isExpanded == true){
        this.collapseGroup == true
      }


      if (e.data.key == '01 ENE') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalKVCE.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalKVCE.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalKVCE.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalKVCE.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalKVCE.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalKVCE.orizaba;
        }
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalKVCE.ramosArispe;
        }
        if(e.summaryCells[11].length !== 0){
        e.summaryCells[11][0].value = totalKVCE.total;
        }
        
      }

      if (e.data.key == '02 FEB') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalKVCF.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalKVCF.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalKVCF.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalKVCF.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalKVCF.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalKVCF.orizaba;
        }
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalKVCF.ramosArispe;
        }
        if(e.summaryCells[11].length !== 0){
        e.summaryCells[11][0].value = totalKVCF.total;
        }
      }

      if (e.data.key == '03 MAR') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalKVCM.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalKVCM.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalKVCM.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalKVCM.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalKVCM.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalKVCM.orizaba;
        }
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalKVCM.ramosArispe;
        }
        if(e.summaryCells[11].length !== 0){
        e.summaryCells[11][0].value = totalKVCM.total;
        }
      }

      if (e.data.key == '04 ABR') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalKVCA.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalKVCA.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalKVCA.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalKVCA.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalKVCA.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalKVCA.orizaba;
        }
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalKVCA.ramosArispe;
        }
        if(e.summaryCells[11].length !== 0){
        e.summaryCells[11][0].value = totalKVCA.total;
        }
      }

      if (e.data.key == '05 MAY') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalKVCMY.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalKVCMY.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalKVCMY.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalKVCMY.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalKVCMY.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalKVCMY.orizaba;
        }
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalKVCMY.ramosArispe;
        }
        if(e.summaryCells[11].length !== 0){
        e.summaryCells[11][0].value = totalKVCMY.total;
        }
      }

      if (e.data.key == '06 JUN') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalKVCJN.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalKVCJN.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalKVCJN.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalKVCJN.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalKVCJN.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalKVCJN.orizaba;
        }
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalKVCJN.ramosArispe;
        }
        if(e.summaryCells[11].length !== 0){
        e.summaryCells[11][0].value = totalKVCJN.total;
        }
      }

      if (e.data.key == '07 JUL') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalKVCJL.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalKVCJL.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalKVCJL.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalKVCJL.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalKVCJL.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalKVCJL.orizaba;
        }
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalKVCJL.ramosArispe;
        }
        if(e.summaryCells[11].length !== 0){
        e.summaryCells[11][0].value = totalKVCJL.total;
        }


      }

      if (e.data.key == '08 AGO') {
          if(e.summaryCells[4].length !== 0){
          e.summaryCells[4][0].value = totalKVCAG.cuautitlan;
          }
          if(e.summaryCells[5].length !== 0){
          e.summaryCells[5][0].value = totalKVCAG.tultitlan; 
          }         
          if(e.summaryCells[6].length !== 0){
          e.summaryCells[6][0].value = totalKVCAG.guadalajara;    
          }      
          if(e.summaryCells[7].length !== 0){
          e.summaryCells[7][0].value = totalKVCAG.hermosillo;
          }
          if(e.summaryCells[8].length !== 0){
          e.summaryCells[8][0].value = totalKVCAG.mexicali;
          }
          if(e.summaryCells[9].length !== 0){
          e.summaryCells[9][0].value = totalKVCAG.orizaba;   
          }       
          if(e.summaryCells[10].length !== 0){
          e.summaryCells[10][0].value = totalKVCAG.ramosArispe; 
          }         
          if(e.summaryCells[11].length !== 0){
          e.summaryCells[11][0].value = totalKVCAG.total;   
          }       
      }

      if (e.data.key == '09 SEP') {
        if(e.summaryCells[4][0].length !== 0){
          if(Number.isNaN(totalKVCS.cuautitlan)){
            e.summaryCells[4][0].value = 0;
          }else{
            e.summaryCells[4][0].value = totalKVCS.cuautitlan;
          }
        }
        if(e.summaryCells[5][0].length !== 0){
          if(Number.isNaN(totalKVCS.tultitlan)){
            e.summaryCells[5][0].value = 0;
          }else{
            e.summaryCells[5][0].value = totalKVCS.tultitlan;
          }
        }
        if(e.summaryCells[6][0].length !== 0){
          if(Number.isNaN(totalKVCS.guadalajara)){
            e.summaryCells[6][0].value = 0;
          }else{
            e.summaryCells[6][0].value = totalKVCS.guadalajara;
          }
        }
        if(e.summaryCells[7][0].length !== 0){
          if(Number.isNaN(totalKVCS.hermosillo)){
            e.summaryCells[7][0].value = 0;  
          }else{
            e.summaryCells[7][0].value = totalKVCS.hermosillo;
          }
        }
        if(e.summaryCells[8][0].length !== 0){
          if(Number.isNaN(totalKVCS.mexicali)){
            e.summaryCells[8][0].value = 0;
          }else{
            e.summaryCells[8][0].value = totalKVCS.mexicali;
          }
        }
        if(e.summaryCells[9][0].value.length !== 0){
          if(Number.isNaN(totalKVCS.orizaba)){
            e.summaryCells[9][0].value = 0;
          }else{
            e.summaryCells[9][0].value = totalKVCS.orizaba;
          }
        }
        if(e.summaryCells[10][0].length !== 0){
          if(Number.isNaN(totalKVCS.ramosArispe)){
            e.summaryCells[10][0].value = 0;  
          }else{
            e.summaryCells[10][0].value = totalKVCS.ramosArispe;
          }
        }
        if(e.summaryCells[11][0].length !== 0){
          if(Number.isNaN(totalKVCS.total)){
            e.summaryCells[11][0].value = 0;
          }else{
            e.summaryCells[11][0].value = totalKVCS.total;
          }
        }
      }

      if (e.data.key == '10 OCT') {
        if(e.summaryCells[4][0].length !== 0){
          if(Number.isNaN(totalKVCOC.cuautitlan)){
            e.summaryCells[4][0].value = 0;
          }else{
            e.summaryCells[4][0].value = totalKVCOC.cuautitlan;
          }
        }
        if(e.summaryCells[5][0].length !== 0){
          if(Number.isNaN(totalKVCOC.tultitlan)){
            e.summaryCells[5][0].value = 0;
          }else{
            e.summaryCells[5][0].value = totalKVCOC.tultitlan;
          }
        }
        if(e.summaryCells[6][0].length !== 0){
          if(Number.isNaN(totalKVCOC.guadalajara)){
            e.summaryCells[6][0].value = 0;
          }else{
            e.summaryCells[6][0].value = totalKVCOC.guadalajara;
          }
        }
        if(e.summaryCells[7][0].length !== 0){
          if(Number.isNaN(totalKVCOC.hermosillo)){
            e.summaryCells[7][0].value = 0;
          }else{
            e.summaryCells[7][0].value = totalKVCOC.hermosillo;
          }
        }
        if(e.summaryCells[8][0].length !== 0){
          if(Number.isNaN(totalKVCOC.mexicali)){
            e.summaryCells[8][0].value = 0;
          }else{
            e.summaryCells[8][0].value = totalKVCOC.mexicali;
          }
        }
        if(e.summaryCells[9][0].length !== 0){
          if(Number.isNaN(totalKVCOC.orizaba)){
            e.summaryCells[9][0].value = 0;
          }else{
            e.summaryCells[9][0].value = totalKVCOC.orizaba;
          }
        }
        if(e.summaryCells[10][0].length !== 0){
          if(Number.isNaN(totalKVCOC.ramosArispe)){
            e.summaryCells[10][0].value = 0;
          }else{
            e.summaryCells[10][0].value = totalKVCOC.ramosArispe;
          }
        }
        if(e.summaryCells[11][0].length !== 0){
          if(Number.isNaN(totalKVCOC.total)){
            e.summaryCells[11][0].value = 0;
          }else{
            e.summaryCells[11][0].value = totalKVCOC.total;
          }
        }

      }

      if (e.data.key == '11 NOV') {
        if(e.summaryCells[4][0].length !== 0){
          if(Number.isNaN(totalKVCNV.cuautitlan)){
            e.summaryCells[4][0].value = 0;
          }else{
            e.summaryCells[4][0].value = totalKVCNV.cuautitlan;
          }
        }
        if(e.summaryCells[5][0].length !== 0){
          if(Number.isNaN(totalKVCNV.tultitlan)){
            e.summaryCells[5][0].value = 0;
          }else{
            e.summaryCells[5][0].value = totalKVCNV.tultitlan;
          }
        }
        if(e.summaryCells[6][0].length !== 0){
          if(Number.isNaN(totalKVCNV.guadalajara)){
            e.summaryCells[6][0].value = 0;
          }else{
            e.summaryCells[6][0].value = totalKVCNV.guadalajara;
          }
        }
        if(e.summaryCells[7][0].length !== 0){
          if(Number.isNaN(totalKVCNV.hermosillo)){
            e.summaryCells[7][0].value = 0;
          }else{
            e.summaryCells[7][0].value = totalKVCNV.hermosillo;
          }
        }
        if(e.summaryCells[8][0].length !== 0){
          if(Number.isNaN(totalKVCNV.mexicali)){
            e.summaryCells[8][0].value = 0;
          }else{
            e.summaryCells[8][0].value = totalKVCNV.mexicali;
          }
        }
        if(e.summaryCells[9][0].length !== 0){
          if(Number.isNaN(totalKVCNV.orizaba)){
            e.summaryCells[9][0].value = 0;
          }else{
            e.summaryCells[9][0].value = totalKVCNV.orizaba;
          }
        }
        if(e.summaryCells[10][0].length !== 0){
          if(Number.isNaN(totalKVCNV.ramosArispe)){
            e.summaryCells[10][0].value = 0;
          }else{
            e.summaryCells[10][0].value = totalKVCNV.ramosArispe;
          }
        }
        if(e.summaryCells[11][0].length !== 0){
          if(Number.isNaN(totalKVCNV.total)){
            e.summaryCells[11][0].value = 0;
          }else{
            e.summaryCells[11][0].value = totalKVCNV.total;
          }
        }

      }

      if (e.data.key == '12 DIC') {
        if(e.summaryCells[4][0].length !== 0){
          if(Number.isNaN(totalIVCDC.cuautitlan)){
            e.summaryCells[4][0].value = 0;
          }else{
            e.summaryCells[4][0].value = totalIVCDC.cuautitlan;
          }
        }
        if(e.summaryCells[5][0].length !== 0){
          if(Number.isNaN(totalIVCDC.tultitlan)){
            e.summaryCells[5][0].value = 0;
          }else{
            e.summaryCells[5][0].value = totalIVCDC.tultitlan;
          }
        }
        if(e.summaryCells[6][0].length !== 0){
          if(Number.isNaN(totalIVCDC.guadalajara)){
            e.summaryCells[6][0].value = 0;
          }else{
            e.summaryCells[6][0].value = totalIVCDC.guadalajara;
          }
        }
        if(e.summaryCells[7][0].length !== 0){
          if(Number.isNaN(totalIVCDC.hermosillo)){
            e.summaryCells[7][0].value = 0;
          }else{
            e.summaryCells[7][0].value = totalIVCDC.hermosillo;
          }
        }
        if(e.summaryCells[8][0].length !== 0){
          if(Number.isNaN(totalIVCDC.mexicali)){
            e.summaryCells[8][0].value = 0;
          }else{
            e.summaryCells[8][0].value = totalIVCDC.mexicali;
          }
          }
        if(e.summaryCells[9][0].length !== 0){
          if(Number.isNaN(totalIVCDC.orizaba)){
            e.summaryCells[9][0].value = 0;
          }else{
            e.summaryCells[9][0].value = totalIVCDC.orizaba;
          }
        }
        if(e.summaryCells[10][0].length !== 0){
          if(Number.isNaN(totalIVCDC.ramosArispe)){
            e.summaryCells[10][0].value = 0;
          }else{
            e.summaryCells[10][0].value = totalIVCDC.ramosArispe;
          }
        }
        if(e.summaryCells[11][0].length !== 0){
          if(Number.isNaN(totalIVCDC.total)){
            e.summaryCells[11][0].value = 0;
          }else{
            e.summaryCells[11][0].value = totalIVCDC.total;
          }
        }

      }

    }

    this.paginacionKV = 60;
    if(this.paginacionKV = 60){
      this.expandGroupKV = false
    }
  }

  onCellPreparedKV(e){
    if (e.rowType == 'group'){

      e.cellElement.style.fontSize = '12px';
      e.cellElement.style.background = "#DCDCDC";

    }

    if (e.rowType == 'totalFooter') {
   
      e.totalItem.cells.forEach((c: any) => {

        if(c.totalItem.summaryCells[4][0]?.value != undefined){
          c.totalItem.summaryCells[4][0].value = totalOperacionKVC.cuautitlan;
        }

        if(c.totalItem.summaryCells[5][0]?.value != undefined){
          c.totalItem.summaryCells[5][0].value = totalOperacionKVC.tultitlan;
        }

        if(c.totalItem.summaryCells[6][0]?.value != undefined){
          c.totalItem.summaryCells[6][0].value = totalOperacionKVC.guadalajara;
        }

        if(c.totalItem.summaryCells[7][0]?.value != undefined){
          c.totalItem.summaryCells[7][0].value = totalOperacionKVC.hermosillo;          
        }

        if(c.totalItem.summaryCells[8][0]?.value != undefined){
          c.totalItem.summaryCells[8][0].value = totalOperacionKVC.mexicali;
        }

        if(c.totalItem.summaryCells[9][0]?.value != undefined){
          c.totalItem.summaryCells[9][0].value = totalOperacionKVC.orizaba;
        }
        if(c.totalItem.summaryCells[10][0]?.value != undefined){
          c.totalItem.summaryCells[10][0].value = totalOperacionKVC.ramosArispe;
        }

        if(c.totalItem.summaryCells[11][0]?.value != undefined){
          c.totalItem.summaryCells[11][0].value = totalOperacionKVC.total;
        }


        // this.TotalTS = this.totalKE.totalTE + this.totalKF.totalTF +this.totalKM.totalTM + this.totalKA.totalTA + this.totalKMY.totalTMY;
        // this.totalTotal = this.TotalTS / 5;//this.sumaTotalGT.length;
        // c.totalItem.summaryCells[9][0].value = this.totalTotal;

        if (c.cellElement) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "16px";
            c.cellElement.style.background = "#ff9460";
            c.cellElement.style.color = "black"; 
        }   
      });
    }
  }
  customizeKV(e) {  

    var gridCell = e.gridCell;
    if (gridCell.rowType === 'group') {
      
      e.backgroundColor = "#DCDCDC";
      e.fontWeight = "bolder"
      e.font = {bold: true}

  }

  if (gridCell.rowType === 'totalFooter') {
      
    e.backgroundColor = "#ff9460";
    e.fontWeight = "bolder"
    e.font = {bold: true}

  }
  }

  customizeExportDataKV(cols, rows){

    rows.forEach((row: any) =>{  
      
      var rowValues =  row.values;  
      

      if(row.rowType == "group"){
        if(row.key[0] == '01 ENE'){
  
          rowValues[3][0].value = totalKVCE.cuautitlan;
          rowValues[4][0].value = totalKVCE.tultitlan;
          rowValues[5][0].value = totalKVCE.guadalajara;
          rowValues[6][0].value = totalKVCE.hermosillo;
          rowValues[7][0].value = totalKVCE.mexicali;
          rowValues[8][0].value = totalKVCE.orizaba;
          rowValues[9][0].value = totalKVCE.ramosArispe;
          rowValues[10][0].value = totalKVCE.total;
        }
  
        if(row.key[0] == '02 FEB'){
  
          rowValues[3][0].value = totalKVCF.cuautitlan;
          rowValues[4][0].value = totalKVCF.tultitlan;
          rowValues[5][0].value = totalKVCF.guadalajara;
          rowValues[6][0].value = totalKVCF.hermosillo;
          rowValues[7][0].value = totalKVCF.mexicali;
          rowValues[8][0].value = totalKVCF.orizaba;
          rowValues[9][0].value = totalKVCF.ramosArispe;
          rowValues[10][0].value = totalKVCF.total;
        }
  
        if(row.key[0] == '03 MAR'){
  
          rowValues[3][0].value = totalKVCM.cuautitlan;
          rowValues[4][0].value = totalKVCM.tultitlan;
          rowValues[5][0].value = totalKVCM.guadalajara;
          rowValues[6][0].value = totalKVCM.hermosillo;
          rowValues[7][0].value = totalKVCM.mexicali;
          rowValues[8][0].value = totalKVCM.orizaba;
          rowValues[9][0].value = totalKVCM.ramosArispe;
          rowValues[10][0].value = totalKVCM.total;
        }
  
        if(row.key[0] == '04 ABR'){
  
          rowValues[3][0].value = totalKVCA.cuautitlan;
          rowValues[4][0].value = totalKVCA.tultitlan;
          rowValues[5][0].value = totalKVCA.guadalajara;
          rowValues[6][0].value = totalKVCA.hermosillo;
          rowValues[7][0].value = totalKVCA.mexicali;
          rowValues[8][0].value = totalKVCA.orizaba;
          rowValues[9][0].value = totalKVCA.ramosArispe;
          rowValues[10][0].value = totalKVCA.total;
        }
  
        if(row.key[0] == '05 MAY'){
  
          rowValues[3][0].value = totalKVCMY.cuautitlan;
          rowValues[4][0].value = totalKVCMY.tultitlan;
          rowValues[5][0].value = totalKVCMY.guadalajara;
          rowValues[6][0].value = totalKVCMY.hermosillo;
          rowValues[7][0].value = totalKVCMY.mexicali;
          rowValues[8][0].value = totalKVCMY.orizaba;
          rowValues[9][0].value = totalKVCMY.ramosArispe;
          rowValues[10][0].value = totalKVCMY.total;
        }
  
        if(row.key[0] == '06 JUN'){
  
          rowValues[3][0].value = totalKVCJN.cuautitlan;
          rowValues[4][0].value = totalKVCJN.tultitlan;
          rowValues[5][0].value = totalKVCJN.guadalajara;
          rowValues[6][0].value = totalKVCJN.hermosillo;
          rowValues[7][0].value = totalKVCJN.mexicali;
          rowValues[8][0].value = totalKVCJN.orizaba;
          rowValues[9][0].value = totalKVCJN.ramosArispe;
          rowValues[10][0].value = totalKVCJN.total;
        }
  
        if(row.key[0] == '07 JUL'){
  
          rowValues[3][0].value = totalKVCJL.cuautitlan;
          rowValues[4][0].value = totalKVCJL.tultitlan;
          rowValues[5][0].value = totalKVCJL.guadalajara;
          rowValues[6][0].value = totalKVCJL.hermosillo;
          rowValues[7][0].value = totalKVCJL.mexicali;
          rowValues[8][0].value = totalKVCJL.orizaba;
          rowValues[9][0].value = totalKVCJL.ramosArispe;
          rowValues[10][0].value = totalKVCJL.total;
  
        }

        if(row.key[0] == '08 AGO'){
  
          rowValues[3][0].value = totalKVCAG.cuautitlan;
          rowValues[4][0].value = totalKVCAG.tultitlan;
          rowValues[5][0].value = totalKVCAG.guadalajara;
          rowValues[6][0].value = totalKVCAG.hermosillo;
          rowValues[7][0].value = totalKVCAG.mexicali;
          rowValues[8][0].value = totalKVCAG.orizaba;
          rowValues[9][0].value = totalKVCAG.ramosArispe;
          rowValues[10][0].value = totalKVCAG.total;
  
        }

        if(row.key[0] == '09 SEP'){
  
          rowValues[3][0].value = totalKVCS.cuautitlan;
          rowValues[4][0].value = totalKVCS.tultitlan;
          rowValues[5][0].value = totalKVCS.guadalajara;
          rowValues[6][0].value = totalKVCS.hermosillo;
          rowValues[7][0].value = totalKVCS.mexicali;
          rowValues[8][0].value = totalKVCS.orizaba;
          rowValues[9][0].value = totalKVCS.ramosArispe;
          rowValues[10][0].value = totalKVCS.total;
  
        }

        if(row.key[0] == '10 OCT'){
  
          rowValues[3][0].value = totalKVCOC.cuautitlan;
          rowValues[4][0].value = totalKVCOC.tultitlan;
          rowValues[5][0].value = totalKVCOC.guadalajara;
          rowValues[6][0].value = totalKVCOC.hermosillo;
          rowValues[7][0].value = totalKVCOC.mexicali;
          rowValues[8][0].value = totalKVCOC.orizaba;
          rowValues[9][0].value = totalKVCOC.ramosArispe;
          rowValues[10][0].value = totalKVCOC.total;
  
        }

        if(row.key[0] == '11 NOV'){
  
          rowValues[3][0].value = totalKVCNV.cuautitlan;
          rowValues[4][0].value = totalKVCNV.tultitlan;
          rowValues[5][0].value = totalKVCNV.guadalajara;
          rowValues[6][0].value = totalKVCNV.hermosillo;
          rowValues[7][0].value = totalKVCNV.mexicali;
          rowValues[8][0].value = totalKVCNV.orizaba;
          rowValues[9][0].value = totalKVCNV.ramosArispe;
          rowValues[10][0].value = totalKVCNV.total;
  
        }
        if(row.key[0] == '12 NOV'){
  
          rowValues[3][0].value = totalKVCDC.cuautitlan;
          rowValues[4][0].value = totalKVCDC.tultitlan;
          rowValues[5][0].value = totalKVCDC.guadalajara;
          rowValues[6][0].value = totalKVCDC.hermosillo;
          rowValues[7][0].value = totalKVCDC.mexicali;
          rowValues[8][0].value = totalKVCDC.orizaba;
          rowValues[9][0].value = totalKVCDC.ramosArispe;
          rowValues[10][0].value = totalKVCDC.total;
  
        }
      }
  
      if(row.rowType == "totalFooter"){
        
  
        row.values[3].value = totalOperacionKVC.cuautitlan;
        row.values[4].value = totalOperacionKVC.tultitlan;
        row.values[5].value = totalOperacionKVC.guadalajara;
        row.values[6].value = totalOperacionKVC.hermosillo;
        row.values[7].value = totalOperacionKVC.mexicali;
        row.values[8].value = totalOperacionKVC.orizaba;
        row.values[9].value = totalOperacionKVC.ramosArispe;
        row.values[10].value = totalOperacionKVC.total;
      }
    });
  }
//==============================INGRESO VIAJES=================================
  onRowPreparedIV(e){
    if (e.rowType == 'group'){

      if(e.isExpanded == true){
        this.collapseGroup == true
      }


      if (e.data.key == '01 ENE') {
        if(e.summaryCells[4].length !== 0){
          e.summaryCells[4][0].value = totalIVCE.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
          e.summaryCells[5][0].value = totalIVCE.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
          e.summaryCells[6][0].value = totalIVCE.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
          e.summaryCells[7][0].value = totalIVCE.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
          e.summaryCells[8][0].value = totalIVCE.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
          e.summaryCells[9][0].value = totalIVCE.orizaba;
        }
        if(e.summaryCells[10].length !== 0){
          e.summaryCells[10][0].value = totalIVCE.ramosArispe;
        }
        if(e.summaryCells[11].length !== 0){
          e.summaryCells[11][0].value = totalIVCE.total;
        }

      }

      if (e.data.key == '02 FEB') {
        if(e.summaryCells[4].length !== 0){
          e.summaryCells[4][0].value = totalIVCF.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
          e.summaryCells[5][0].value = totalIVCF.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
          e.summaryCells[6][0].value = totalIVCF.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
          e.summaryCells[7][0].value = totalIVCF.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
          e.summaryCells[8][0].value = totalIVCF.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
          e.summaryCells[9][0].value = totalIVCF.orizaba;
        }
        if(e.summaryCells[10].length !== 0){
          e.summaryCells[10][0].value = totalIVCF.ramosArispe;
        }
        if(e.summaryCells[11].length !== 0){
          e.summaryCells[11][0].value = totalIVCF.total;
        }
      }

      if (e.data.key == '03 MAR') {
        if(e.summaryCells[4].length !== 0){
          e.summaryCells[4][0].value = totalIVCM.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
          e.summaryCells[5][0].value = totalIVCM.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
          e.summaryCells[6][0].value = totalIVCM.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
          e.summaryCells[7][0].value = totalIVCM.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
          e.summaryCells[8][0].value = totalIVCM.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
          e.summaryCells[9][0].value = totalIVCM.orizaba;
        }
        if(e.summaryCells[10].length !== 0){
          e.summaryCells[10][0].value = totalIVCM.ramosArispe;
        }
        if(e.summaryCells[11].length !== 0){
          e.summaryCells[11][0].value = totalIVCM.total;
        }
      }

      if (e.data.key == '04 ABR') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalIVCA.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalIVCA.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalIVCA.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalIVCA.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalIVCA.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalIVCA.orizaba;
        }
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalIVCA.ramosArispe;
        }
        if(e.summaryCells[11].length !== 0){
        e.summaryCells[11][0].value = totalIVCA.total;
        }
      }

      if (e.data.key == '05 MAY') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalIVCMY.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalIVCMY.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalIVCMY.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalIVCMY.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalIVCMY.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalIVCMY.orizaba;
        }
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalIVCMY.ramosArispe;
        }
        if(e.summaryCells[11].length !== 0){
        e.summaryCells[11][0].value = totalIVCMY.total;
        }
      }

      if (e.data.key == '06 JUN') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalIVCJN.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalIVCJN.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalIVCJN.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalIVCJN.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalIVCJN.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalIVCJN.orizaba;
        }
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalIVCJN.ramosArispe;
        }
        if(e.summaryCells[11].length !== 0){
        e.summaryCells[11][0].value = totalIVCJN.total;
        }
      }

      if (e.data.key == '07 JUL') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalIVCJL.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalIVCJL.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalIVCJL.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalIVCJL.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalIVCJL.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalIVCJL.orizaba;
        }
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalIVCJL.ramosArispe;
        }
        if(e.summaryCells[11].length !== 0){
        e.summaryCells[11][0].value = totalIVCJL.total;
        }


      }

      if (e.data.key == '08 AGO') {
          if(e.summaryCells[4].length !== 0){
          e.summaryCells[4][0].value = totalIVCAG.cuautitlan;
          }
          if(e.summaryCells[5].length !== 0){
          e.summaryCells[5][0].value = totalIVCAG.tultitlan;
          }          
          if(e.summaryCells[6].length !== 0){
          e.summaryCells[6][0].value = totalIVCAG.guadalajara;  
          }        
          if(e.summaryCells[7].length !== 0){
          e.summaryCells[7][0].value = totalIVCAG.hermosillo;
          }
          if(e.summaryCells[8].length !== 0){
          e.summaryCells[8][0].value = totalIVCAG.mexicali;
          }
          if(e.summaryCells[9].length !== 0){
          e.summaryCells[9][0].value = totalIVCAG.orizaba;
          }          
          if(e.summaryCells[10].length !== 0){
          e.summaryCells[10][0].value = totalIVCAG.ramosArispe;     
          }     
          if(e.summaryCells[11].length !== 0){
          e.summaryCells[11][0].value = totalIVCAG.total;   
          }       
        
      }

      if (e.data.key == '09 SEP') {
        if(e.summaryCells[4][0].length !== 0){
          if(Number.isNaN(totalIVCS.cuautitlan)){
            e.summaryCells[4][0].value = 0;
          }else{
            e.summaryCells[4][0].value = totalIVCS.cuautitlan;
          }
        }
        if(e.summaryCells[5][0].length !== 0){
          if(Number.isNaN(totalIVCS.tultitlan)){
            e.summaryCells[5][0].value = 0;  
          }else{
            e.summaryCells[5][0].value = totalIVCS.tultitlan;
          }
        }
        if(e.summaryCells[6][0].length !== 0){
          if(Number.isNaN(totalIVCS.guadalajara)){
            e.summaryCells[6][0].value = 0;
          }else{
            e.summaryCells[6][0].value = totalIVCS.guadalajara;
          }
        }
        if(e.summaryCells[7][0].length !== 0){
          if(Number.isNaN(totalIVCS.hermosillo)){
            e.summaryCells[7][0].value = 0;
          }else{
            e.summaryCells[7][0].value = totalIVCS.hermosillo;
          }
        }
        if(e.summaryCells[8][0].length !== 0){
          if(Number.isNaN(totalIVCS.mexicali)){
            e.summaryCells[8][0].value = 0;  
          }else{
            e.summaryCells[8][0].value = totalIVCS.mexicali;
          }
        }
        if(e.summaryCells[9][0].length !== 0){
          if(Number.isNaN(totalIVCS.orizaba)){
            e.summaryCells[9][0].value = 0;
          }else{
            e.summaryCells[9][0].value = totalIVCS.orizaba;
          }
        }
        if(e.summaryCells[10][0].length !== 0){
          if(Number.isNaN(totalIVCS.ramosArispe)){
            e.summaryCells[10][0].value = 0;
          }else{
            e.summaryCells[10][0].value = totalIVCS.ramosArispe;
          }
        }
        if(e.summaryCells[11][0].length !== 0){
          if(Number.isNaN(totalIVCS.total)){
            e.summaryCells[11][0].value = 0;  
          }else{
            e.summaryCells[11][0].value = totalIVCS.total;
          }
        }
      }

      if (e.data.key == '10 OCT') {
        if(e.summaryCells[4][0].length !== 0){
          if(Number.isNaN(totalIVCOC.cuautitlan)){
            e.summaryCells[4][0].value = 0;
          }else{
            e.summaryCells[4][0].value = totalIVCOC.cuautitlan;
          }
        }
        if(e.summaryCells[5][0].length !== 0){
          if(Number.isNaN(totalIVCOC.tultitlan)){
            e.summaryCells[5][0].value = 0;
          }else{
            e.summaryCells[5][0].value = totalIVCOC.tultitlan;
          }
        }
        if(e.summaryCells[6][0].length !== 0){
          if(Number.isNaN(totalIVCOC.guadalajara)){
            e.summaryCells[6][0].value = 0;
          }else{
            e.summaryCells[6][0].value = totalIVCOC.guadalajara;
          }
        }
        if(e.summaryCells[7][0].length !== 0){
          if(Number.isNaN(totalIVCOC.hermosillo)){
            e.summaryCells[7][0].value = 0;
          } else{
            e.summaryCells[7][0].value = totalIVCOC.hermosillo;
          }
        }
        if(e.summaryCells[8][0].length !== 0){
          if(Number.isNaN(totalIVCOC.mexicali)){
            e.summaryCells[8][0].value = 0;
          }else{
            e.summaryCells[8][0].value = totalIVCOC.mexicali;
          }
        }
        if(e.summaryCells[9][0].length !== 0){
          if(Number.isNaN(totalIVCOC.orizaba)){
            e.summaryCells[9][0].value = 0;
          }else{
            e.summaryCells[9][0].value = totalIVCOC.orizaba;
          }
        }
        if(e.summaryCells[10][0].length !== 0){
          if(Number.isNaN(totalIVCOC.ramosArispe)){
            e.summaryCells[10][0].value = 0;
          }else{
            e.summaryCells[10][0].value = totalIVCOC.ramosArispe;
          }
        }
        if(e.summaryCells[11][0].length !== 0){
          if(Number.isNaN(totalIVCOC.total)){
            e.summaryCells[11][0].value = 0;
          }else{
            e.summaryCells[11][0].value = totalIVCOC.total;
          }
        }
      }

      if (e.data.key == '11 NOV') {
        if(e.summaryCells[4][0].length !== 0){
          if(Number.isNaN(totalIVCNV.cuautitlan)){
            e.summaryCells[4][0].value = 0;
          }else{
            e.summaryCells[4][0].value = totalIVCNV.cuautitlan;
          }
        }
        if(e.summaryCells[5][0].length !== 0){
          if(Number.isNaN(totalIVCNV.tultitlan)){
            e.summaryCells[5][0].value = 0;
          }else{
            e.summaryCells[5][0].value = totalIVCNV.tultitlan;
          }
        }
        if(e.summaryCells[6][0].length !== 0){
          if(Number.isNaN(totalIVCNV.guadalajara)){
            e.summaryCells[6][0].value = 0;
          }else{
            e.summaryCells[6][0].value = totalIVCNV.guadalajara;
          }
        }
        if(e.summaryCells[7][0].length !== 0){
          if(Number.isNaN(totalIVCNV.hermosillo)){
            e.summaryCells[7][0].value = 0;
          } else{
            e.summaryCells[7][0].value = totalIVCNV.hermosillo;
          }
        }
        if(e.summaryCells[8][0].length !== 0){
          if(Number.isNaN(totalIVCNV.mexicali)){
            e.summaryCells[8][0].value = 0;
          }else{
            e.summaryCells[8][0].value = totalIVCNV.mexicali;
          }
        }
        if(e.summaryCells[9][0].length !== 0){
          if(Number.isNaN(totalIVCNV.orizaba)){
            e.summaryCells[9][0].value = 0;
          }else{
            e.summaryCells[9][0].value = totalIVCNV.orizaba;
          }
        }
        if(e.summaryCells[10][0].length !== 0){
          if(Number.isNaN(totalIVCNV.ramosArispe)){
            e.summaryCells[10][0].value = 0;
          }else{
            e.summaryCells[10][0].value = totalIVCNV.ramosArispe;
          }
        }
        if(e.summaryCells[11][0].length !== 0){
          if(Number.isNaN(totalIVCNV.total)){
            e.summaryCells[11][0].value = 0;
          }else{
            e.summaryCells[11][0].value = totalIVCNV.total;
          }
        }
      }

      if (e.data.key == '12 DIC') {
        if(e.summaryCells[4][0].length !== 0){
          if(Number.isNaN(totalIVCDC.cuautitlan)){
            e.summaryCells[4][0].value = 0;
          }else{
            e.summaryCells[4][0].value = totalIVCDC.cuautitlan;
          }
        }
      if(e.summaryCells[5][0].length !== 0){
        if(Number.isNaN(totalIVCDC.tultitlan)){
          e.summaryCells[5][0].value = 0;
        }else{
          e.summaryCells[5][0].value = totalIVCDC.tultitlan;
        }
      }
      if(e.summaryCells[6][0].length !== 0){
        if(Number.isNaN(totalIVCDC.guadalajara)){
          e.summaryCells[6][0].value = 0;
        }else{
          e.summaryCells[6][0].value = totalIVCDC.guadalajara;
        }
      }
      if(e.summaryCells[7][0].length !== 0){
        if(Number.isNaN(totalIVCDC.hermosillo)){
          e.summaryCells[7][0].value = 0;
        }else{
          e.summaryCells[7][0].value = totalIVCDC.hermosillo;
        }
      }
      if(e.summaryCells[8][0].length !== 0){
        if(Number.isNaN(totalIVCDC.mexicali)){
          e.summaryCells[8][0].value = 0;
        }else{
          e.summaryCells[8][0].value = totalIVCDC.mexicali;
        }
      }
      if(e.summaryCells[9][0].length !== 0){
        if(Number.isNaN(totalIVCDC.orizaba)){
          e.summaryCells[9][0].value = 0;
        }else{
          e.summaryCells[9][0].value = totalIVCDC.orizaba;
        }
      }
      if(e.summaryCells[10][0].length !== 0){
        if(Number.isNaN(totalIVCDC.ramosArispe)){
          e.summaryCells[10][0].value = 0;
        }else{
          e.summaryCells[10][0].value = totalIVCDC.ramosArispe;
        }
      }
      if(e.summaryCells[11][0].length !== 0){
        if(Number.isNaN(totalIVCDC.total)){
          e.summaryCells[11][0].value = 0;
        }else{
          e.summaryCells[11][0].value = totalIVCDC.total;
      }
    }



      }    
     
    }

    this.paginacion = 60;
    if(this.paginacion = 60){
      this.expandGroup = false
    }
  }

  onCellPreparedIV(e){
    if (e.rowType == 'group'){

      e.cellElement.style.fontSize = '12px';
      e.cellElement.style.background = "#DCDCDC";

    }

    if (e.rowType == 'totalFooter') {
   
      e.totalItem.cells.forEach((c: any) => {
        if(c.totalItem.summaryCells[4][0]?.value != undefined){
          c.totalItem.summaryCells[4][0].value = totalOperacionIVC.cuautitlan;
        }

        if(c.totalItem.summaryCells[5][0]?.value != undefined){
          c.totalItem.summaryCells[5][0].value = totalOperacionIVC.tultitlan;
        }

        if(c.totalItem.summaryCells[6][0]?.value != undefined){
          c.totalItem.summaryCells[6][0].value = totalOperacionIVC.guadalajara;
        }

        if(c.totalItem.summaryCells[7][0]?.value != undefined){
          c.totalItem.summaryCells[7][0].value = totalOperacionIVC.hermosillo;          
        }

        if(c.totalItem.summaryCells[8][0]?.value != undefined){
          c.totalItem.summaryCells[8][0].value = totalOperacionIVC.mexicali;
        }

        if(c.totalItem.summaryCells[9][0]?.value != undefined){
          c.totalItem.summaryCells[9][0].value = totalOperacionIVC.orizaba;
        }
        if(c.totalItem.summaryCells[10][0]?.value != undefined){
          c.totalItem.summaryCells[10][0].value = totalOperacionIVC.ramosArispe;
        }

        if(c.totalItem.summaryCells[11][0]?.value != undefined){
          c.totalItem.summaryCells[11][0].value = totalOperacionIVC.total;
        }

        if (c.cellElement) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "16px";
            c.cellElement.style.background = "#ff9460";
            c.cellElement.style.color = "black"; 
        }   
      });
    }

  }

  customizeIV(e){
    var gridCell = e.gridCell;
    if (gridCell.rowType === 'group') {
      
      e.backgroundColor = "#DCDCDC";
      e.fontWeight = "bolder"
      e.font = {bold: true}

    }

    if (gridCell.rowType === 'totalFooter') {

      e.backgroundColor = "#ff9460";
      e.fontWeight = "bolder"
      e.font = {bold: true}

    }
  }

  customizeExportDataIV(cols, rows){

    rows.forEach((row: any) =>{  
    var rowValues =  row.values;  

    if(row.rowType == "group"){
      if(row.key[0] == '01 ENE'){

        rowValues[3][0].value = totalIVCE.cuautitlan;
        rowValues[4][0].value = totalIVCE.tultitlan;
        rowValues[5][0].value = totalIVCE.guadalajara;
        rowValues[6][0].value = totalIVCE.hermosillo;
        rowValues[7][0].value = totalIVCE.mexicali;
        rowValues[8][0].value = totalIVCE.orizaba;
        rowValues[9][0].value = totalIVCE.ramosArispe;
        rowValues[10][0].value = totalIVCE.total;
      }

      if(row.key[0] == '02 FEB'){

        rowValues[3][0].value = totalIVCF.cuautitlan;
        rowValues[4][0].value = totalIVCF.tultitlan;
        rowValues[5][0].value = totalIVCF.guadalajara;
        rowValues[6][0].value = totalIVCF.hermosillo;
        rowValues[7][0].value = totalIVCF.mexicali;
        rowValues[8][0].value = totalIVCF.orizaba;
        rowValues[9][0].value = totalIVCF.ramosArispe;
        rowValues[10][0].value = totalIVCF.total;
      }

      if(row.key[0] == '03 MAR'){

        rowValues[3][0].value = totalIVCM.cuautitlan;
        rowValues[4][0].value = totalIVCM.tultitlan;
        rowValues[5][0].value = totalIVCM.guadalajara;
        rowValues[6][0].value = totalIVCM.hermosillo;
        rowValues[7][0].value = totalIVCM.mexicali;
        rowValues[8][0].value = totalIVCM.orizaba;
        rowValues[9][0].value = totalIVCM.ramosArispe;
        rowValues[10][0].value = totalIVCM.total;
      }

      if(row.key[0] == '04 ABR'){

        rowValues[3][0].value = totalIVCA.cuautitlan;
        rowValues[4][0].value = totalIVCA.tultitlan;
        rowValues[5][0].value = totalIVCA.guadalajara;
        rowValues[6][0].value = totalIVCA.hermosillo;
        rowValues[7][0].value = totalIVCA.mexicali;
        rowValues[8][0].value = totalIVCA.orizaba;
        rowValues[9][0].value = totalIVCA.ramosArispe;
        rowValues[10][0].value = totalIVCA.total;
      }

      if(row.key[0] == '05 MAY'){

        rowValues[3][0].value = totalIVCMY.cuautitlan;
        rowValues[4][0].value = totalIVCMY.tultitlan;
        rowValues[5][0].value = totalIVCMY.guadalajara;
        rowValues[6][0].value = totalIVCMY.hermosillo;
        rowValues[7][0].value = totalIVCMY.mexicali;
        rowValues[8][0].value = totalIVCMY.orizaba;
        rowValues[9][0].value = totalIVCMY.ramosArispe;
        rowValues[10][0].value = totalIVCMY.total;
      }

      if(row.key[0] == '06 JUN'){

        rowValues[3][0].value = totalIVCJN.cuautitlan;
        rowValues[4][0].value = totalIVCJN.tultitlan;
        rowValues[5][0].value = totalIVCJN.guadalajara;
        rowValues[6][0].value = totalIVCJN.hermosillo;
        rowValues[7][0].value = totalIVCJN.mexicali;
        rowValues[8][0].value = totalIVCJN.orizaba;
        rowValues[9][0].value = totalIVCJN.ramosArispe;
        rowValues[10][0].value = totalIVCJN.total;
      }

      if(row.key[0] == '07 JUL'){

        rowValues[3][0].value = totalIVCJL.cuautitlan;
        rowValues[4][0].value = totalIVCJL.tultitlan;
        rowValues[5][0].value = totalIVCJL.guadalajara;
        rowValues[6][0].value = totalIVCJL.hermosillo;
        rowValues[7][0].value = totalIVCJL.mexicali;
        rowValues[8][0].value = totalIVCJL.orizaba;
        rowValues[9][0].value = totalIVCJL.ramosArispe;
        rowValues[10][0].value = totalIVCJL.total;

      }

      if(row.key[0] == '08 AGO'){

        rowValues[3][0].value = totalIVCAG.cuautitlan;
        rowValues[4][0].value = totalIVCAG.tultitlan;
        rowValues[5][0].value = totalIVCAG.guadalajara;
        rowValues[6][0].value = totalIVCAG.hermosillo;
        rowValues[7][0].value = totalIVCAG.mexicali;
        rowValues[8][0].value = totalIVCAG.orizaba;
        rowValues[9][0].value = totalIVCAG.ramosArispe;
        rowValues[10][0].value = totalIVCAG.total;
      }

      if(row.key[0] == '09 SEP'){

        rowValues[3][0].value = totalIVCS.cuautitlan;
        rowValues[4][0].value = totalIVCS.tultitlan;
        rowValues[5][0].value = totalIVCS.guadalajara;
        rowValues[6][0].value = totalIVCS.hermosillo;
        rowValues[7][0].value = totalIVCS.mexicali;
        rowValues[8][0].value = totalIVCS.orizaba;
        rowValues[9][0].value = totalIVCS.ramosArispe;
        rowValues[10][0].value = totalIVCS.total;
      }

      if(row.key[0] == '10 OCT'){

        rowValues[3][0].value = totalIVCOC.cuautitlan;
        rowValues[4][0].value = totalIVCOC.tultitlan;
        rowValues[5][0].value = totalIVCOC.guadalajara;
        rowValues[6][0].value = totalIVCOC.hermosillo;
        rowValues[7][0].value = totalIVCOC.mexicali;
        rowValues[8][0].value = totalIVCOC.orizaba;
        rowValues[9][0].value = totalIVCOC.ramosArispe;
        rowValues[10][0].value = totalIVCOC.total;
      }

      if(row.key[0] == '11 NOV'){

        rowValues[3][0].value = totalIVCNV.cuautitlan;
        rowValues[4][0].value = totalIVCNV.tultitlan;
        rowValues[5][0].value = totalIVCNV.guadalajara;
        rowValues[6][0].value = totalIVCNV.hermosillo;
        rowValues[7][0].value = totalIVCNV.mexicali;
        rowValues[8][0].value = totalIVCNV.orizaba;
        rowValues[9][0].value = totalIVCNV.ramosArispe;
        rowValues[10][0].value = totalIVCNV.total;
      }

      if(row.key[0] == '12 DIC'){

        rowValues[3][0].value = totalIVCDC.cuautitlan;
        rowValues[4][0].value = totalIVCDC.tultitlan;
        rowValues[5][0].value = totalIVCDC.guadalajara;
        rowValues[6][0].value = totalIVCDC.hermosillo;
        rowValues[7][0].value = totalIVCDC.mexicali;
        rowValues[8][0].value = totalIVCDC.orizaba;
        rowValues[9][0].value = totalIVCDC.ramosArispe;
        rowValues[10][0].value = totalIVCDC.total;
      }
    }

    if(row.rowType == "totalFooter"){
      row.values[3].value = totalOperacionIVC.cuautitlan;
      row.values[4].value = totalOperacionIVC.tultitlan;
      row.values[5].value = totalOperacionIVC.guadalajara;
      row.values[6].value = totalOperacionIVC.hermosillo;
      row.values[7].value = totalOperacionIVC.mexicali;
      row.values[8].value = totalOperacionIVC.orizaba;
      row.values[9].value = totalOperacionIVC.ramosArispe;
      row.values[10].value = totalOperacionIVC.total;
    }

  });

  }
//=============================OPERADORE UDN====================================
  onRowPreparedOUDN(e){
    
  }

  onCellPreparedOUDN(e){
    if (e.rowType == 'data'){
      e.cellElement.style.fontSize = '12px';
      e.cellElement.style.background = "#DCDCDC";
    }
  }

//==============================INGRESO OPERADOR===================================
  onRowPreparedIO(e){
  
  }
  
  onCellPreparedIO(e){
    if (e.rowType == 'data'){
      e.cellElement.style.fontSize = '12px';
      e.cellElement.style.background = "#DCDCDC";
    }
  }
//==================================================================================//  
//==============================INGRESOS 2024=======================================//
//==================================================================================//
  onRowPreparedITL2024(event){
    
    if (event.rowType == 'group'){
      if(event.data.key == '01 ENE'){
        agrupamientoITLE24.cuatitlanIngr = event.summaryCells[4][0].value;
        agrupamientoITLE24.cuatitlanPres = event.summaryCells[5][0].value;
        agrupamientoITLE24.cuatitlanIngrAc = event.summaryCells[7][0].value;
        agrupamientoITLE24.cuatitlanPresAc = event.summaryCells[8][0].value;
        agrupamientoITLE24.cuatitlanIngrAnt = event.summaryCells[10][0].value;
        agrupamientoITLE24.tultitlanIngr = event.summaryCells[12][0].value;
        agrupamientoITLE24.tultitlanPres = event.summaryCells[13][0].value;
        agrupamientoITLE24.tultitlanIngrAc = event.summaryCells[15][0].value;
        agrupamientoITLE24.tultitlanPresAc = event.summaryCells[16][0].value;
        agrupamientoITLE24.tultitlanIngrAnt = event.summaryCells[18][0].value;
        agrupamientoITLE24.guadalajaraIngr = event.summaryCells[20][0].value;
        agrupamientoITLE24.guadalajaraPres = event.summaryCells[21][0].value;
        agrupamientoITLE24.guadalajaraIngrAc = event.summaryCells[23][0].value;
        agrupamientoITLE24.guadalajaraPresAc = event.summaryCells[24][0].value;
        agrupamientoITLE24.guadalajaraIngrAnt = event.summaryCells[26][0].value;
        agrupamientoITLE24.hermosilloIngr = event.summaryCells[28][0].value;
        agrupamientoITLE24.hermosilloPres = event.summaryCells[29][0].value;
        agrupamientoITLE24.hermosilloIngrAc = event.summaryCells[31][0].value;
        agrupamientoITLE24.hermosilloPresAc = event.summaryCells[32][0].value;
        agrupamientoITLE24.hermosilloIngrAnt = event.summaryCells[34][0].value;
        agrupamientoITLE24.mexicaliIngr = event.summaryCells[36][0].value;
        agrupamientoITLE24.mexicaliPres = event.summaryCells[37][0].value;
        agrupamientoITLE24.mexicaliIngrAc = event.summaryCells[39][0].value;
        agrupamientoITLE24.mexicaliPresAc = event.summaryCells[40][0].value;
        agrupamientoITLE24.mexicaliIngrAnt = event.summaryCells[42][0].value;
        agrupamientoITLE24.orizabaIngr = event.summaryCells[44][0].value;
        agrupamientoITLE24.orizabaPres = event.summaryCells[45][0].value;
        agrupamientoITLE24.orizabaIngrAc = event.summaryCells[47][0].value;
        agrupamientoITLE24.orizabaPresAc = event.summaryCells[48][0].value;
        agrupamientoITLE24.orizabaIngrAnt = event.summaryCells[50][0].value;

        totalAgrupamientoITLE24.cuatitlanPresPor = agrupamientoITLE24.cuatitlanIngr / agrupamientoITLE24.cuatitlanPres;
        totalAgrupamientoITLE24.cuatitlanPresAcPor = agrupamientoITLE24.cuatitlanIngrAc / agrupamientoITLE24.cuatitlanPresAc;
        totalAgrupamientoITLE24.cuatitlanIngrAntPor = agrupamientoITLE24.cuatitlanIngr / agrupamientoITLE24.cuatitlanIngrAnt;
        totalAgrupamientoITLE24.tultitlanPresPor = agrupamientoITLE24.tultitlanIngr / agrupamientoITLE24.tultitlanPres;
        totalAgrupamientoITLE24.tultitlanPresAcPor = agrupamientoITLE24.tultitlanIngrAc / agrupamientoITLE24.tultitlanPresAc;
        totalAgrupamientoITLE24.tultitlanIngrAntPor = agrupamientoITLE24.tultitlanIngr / agrupamientoITLE24.tultitlanIngrAnt;
        totalAgrupamientoITLE24.guadalajaraPresPor = agrupamientoITLE24.guadalajaraIngr / agrupamientoITLE24.guadalajaraPres;
        totalAgrupamientoITLE24.guadalajaraPresAcPor = agrupamientoITLE24.guadalajaraIngrAc / agrupamientoITLE24.guadalajaraPresAc;
        totalAgrupamientoITLE24.guadalajaraIngrAntPor = agrupamientoITLE24.guadalajaraIngr / agrupamientoITLE24.guadalajaraIngrAnt;
        totalAgrupamientoITLE24.hermosilloPresPor = agrupamientoITLE24.hermosilloIngr / agrupamientoITLE24.hermosilloPres;
        totalAgrupamientoITLE24.hermosilloPresAcPor = agrupamientoITLE24.hermosilloIngrAc / agrupamientoITLE24.hermosilloPresAc;
        totalAgrupamientoITLE24.hermosilloIngrAntPor = agrupamientoITLE24.hermosilloIngr / agrupamientoITLE24.hermosilloIngrAnt;
        totalAgrupamientoITLE24.mexicaliPresPor = agrupamientoITLE24.mexicaliIngr / agrupamientoITLE24.mexicaliPres;
        totalAgrupamientoITLE24.mexicaliPresAcPor = agrupamientoITLE24.mexicaliIngrAc / agrupamientoITLE24.mexicaliPresAc;
        totalAgrupamientoITLE24.mexicaliIngrAntPor = agrupamientoITLE24.mexicaliIngr / agrupamientoITLE24.mexicaliIngrAnt;
        totalAgrupamientoITLE24.orizabaPresPor = agrupamientoITLE24.orizabaIngr / agrupamientoITLE24.orizabaPres;
        totalAgrupamientoITLE24.orizabaPresAcPor = agrupamientoITLE24.orizabaIngrAc / agrupamientoITLE24.orizabaPresAc;
        totalAgrupamientoITLE24.orizabaIngrAntPor = agrupamientoITLE24.orizabaIngr / agrupamientoITLE24.orizabaIngrAnt;

        event.summaryCells[6][0].value = totalAgrupamientoITLE24.cuatitlanPresPor;
        event.summaryCells[9][0].value = totalAgrupamientoITLE24.cuatitlanPresAcPor;
        event.summaryCells[11][0].value = totalAgrupamientoITLE24.cuatitlanIngrAntPor;
        event.summaryCells[14][0].value = totalAgrupamientoITLE24.tultitlanPresPor;
        event.summaryCells[17][0].value = totalAgrupamientoITLE24.tultitlanPresAcPor;
        event.summaryCells[19][0].value = totalAgrupamientoITLE24.tultitlanIngrAntPor;
        event.summaryCells[22][0].value = totalAgrupamientoITLE24.guadalajaraPresPor;
        event.summaryCells[25][0].value = totalAgrupamientoITLE24.guadalajaraPresAcPor;
        event.summaryCells[27][0].value = totalAgrupamientoITLE24.guadalajaraIngrAntPor;
        event.summaryCells[30][0].value = totalAgrupamientoITLE24.hermosilloPresPor;
        event.summaryCells[33][0].value = totalAgrupamientoITLE24.hermosilloPresAcPor;
        event.summaryCells[35][0].value = totalAgrupamientoITLE24.hermosilloIngrAntPor;
        event.summaryCells[38][0].value = totalAgrupamientoITLE24.mexicaliPresPor;
        event.summaryCells[41][0].value = totalAgrupamientoITLE24.mexicaliPresAcPor;
        event.summaryCells[43][0].value = totalAgrupamientoITLE24.mexicaliIngrAntPor;
        event.summaryCells[46][0].value = totalAgrupamientoITLE24.orizabaPresPor;
        event.summaryCells[49][0].value = totalAgrupamientoITLE24.orizabaPresAcPor;
        event.summaryCells[51][0].value = totalAgrupamientoITLE24.orizabaIngrAntPor;
      }
      if(event.data.key == '02 FEB'){
        agrupamientoITLF24.cuatitlanIngr = event.summaryCells[4][0].value;
        agrupamientoITLF24.cuatitlanPres = event.summaryCells[5][0].value;
        agrupamientoITLF24.cuatitlanIngrAc = event.summaryCells[7][0].value;
        agrupamientoITLF24.cuatitlanPresAc = event.summaryCells[8][0].value;
        agrupamientoITLF24.cuatitlanIngrAnt = event.summaryCells[10][0].value;
        agrupamientoITLF24.tultitlanIngr = event.summaryCells[12][0].value;
        agrupamientoITLF24.tultitlanPres = event.summaryCells[13][0].value;
        agrupamientoITLF24.tultitlanIngrAc = event.summaryCells[15][0].value;
        agrupamientoITLF24.tultitlanPresAc = event.summaryCells[16][0].value;
        agrupamientoITLF24.tultitlanIngrAnt = event.summaryCells[18][0].value;
        agrupamientoITLF24.guadalajaraIngr = event.summaryCells[20][0].value;
        agrupamientoITLF24.guadalajaraPres = event.summaryCells[21][0].value;
        agrupamientoITLF24.guadalajaraIngrAc = event.summaryCells[23][0].value;
        agrupamientoITLF24.guadalajaraPresAc = event.summaryCells[24][0].value;
        agrupamientoITLF24.guadalajaraIngrAnt = event.summaryCells[26][0].value;
        agrupamientoITLF24.hermosilloIngr = event.summaryCells[28][0].value;
        agrupamientoITLF24.hermosilloPres = event.summaryCells[29][0].value;
        agrupamientoITLF24.hermosilloIngrAc = event.summaryCells[31][0].value;
        agrupamientoITLF24.hermosilloPresAc = event.summaryCells[32][0].value;
        agrupamientoITLF24.hermosilloIngrAnt = event.summaryCells[34][0].value;
        agrupamientoITLF24.mexicaliIngr = event.summaryCells[36][0].value;
        agrupamientoITLF24.mexicaliPres = event.summaryCells[37][0].value;
        agrupamientoITLF24.mexicaliIngrAc = event.summaryCells[39][0].value;
        agrupamientoITLF24.mexicaliPresAc = event.summaryCells[40][0].value;
        agrupamientoITLF24.mexicaliIngrAnt = event.summaryCells[42][0].value;
        agrupamientoITLF24.orizabaIngr = event.summaryCells[44][0].value;
        agrupamientoITLF24.orizabaPres = event.summaryCells[45][0].value;
        agrupamientoITLF24.orizabaIngrAc = event.summaryCells[47][0].value;
        agrupamientoITLF24.orizabaPresAc = event.summaryCells[48][0].value;
        agrupamientoITLF24.orizabaIngrAnt = event.summaryCells[50][0].value;

        totalAgrupamientoITLF24.cuatitlanPresPor = agrupamientoITLF24.cuatitlanIngr / agrupamientoITLF24.cuatitlanPres;
        totalAgrupamientoITLF24.cuatitlanPresAcPor = agrupamientoITLF24.cuatitlanIngrAc / agrupamientoITLF24.cuatitlanPresAc;
        totalAgrupamientoITLF24.cuatitlanIngrAntPor = agrupamientoITLF24.cuatitlanIngr / agrupamientoITLF24.cuatitlanIngrAnt;
        totalAgrupamientoITLF24.tultitlanPresPor = agrupamientoITLF24.tultitlanIngr / agrupamientoITLF24.tultitlanPres;
        totalAgrupamientoITLF24.tultitlanPresAcPor = agrupamientoITLF24.tultitlanIngrAc / agrupamientoITLF24.tultitlanPresAc;
        totalAgrupamientoITLF24.tultitlanIngrAntPor = agrupamientoITLF24.tultitlanIngr / agrupamientoITLF24.tultitlanIngrAnt;
        totalAgrupamientoITLF24.guadalajaraPresPor = agrupamientoITLF24.guadalajaraIngr / agrupamientoITLF24.guadalajaraPres;
        totalAgrupamientoITLF24.guadalajaraPresAcPor = agrupamientoITLF24.guadalajaraIngrAc / agrupamientoITLF24.guadalajaraPresAc;
        totalAgrupamientoITLF24.guadalajaraIngrAntPor = agrupamientoITLF24.guadalajaraIngr / agrupamientoITLF24.guadalajaraIngrAnt;
        totalAgrupamientoITLF24.hermosilloPresPor = agrupamientoITLF24.hermosilloIngr / agrupamientoITLF24.hermosilloPres;
        totalAgrupamientoITLF24.hermosilloPresAcPor = agrupamientoITLF24.hermosilloIngrAc / agrupamientoITLF24.hermosilloPresAc;
        totalAgrupamientoITLF24.hermosilloIngrAntPor = agrupamientoITLF24.hermosilloIngr / agrupamientoITLF24.hermosilloIngrAnt;
        totalAgrupamientoITLF24.mexicaliPresPor = agrupamientoITLF24.mexicaliIngr / agrupamientoITLF24.mexicaliPres;
        totalAgrupamientoITLF24.mexicaliPresAcPor = agrupamientoITLF24.mexicaliIngrAc / agrupamientoITLF24.mexicaliPresAc;
        totalAgrupamientoITLF24.mexicaliIngrAntPor = agrupamientoITLF24.mexicaliIngr / agrupamientoITLF24.mexicaliIngrAnt;
        totalAgrupamientoITLF24.orizabaPresPor = agrupamientoITLF24.orizabaIngr / agrupamientoITLF24.orizabaPres;
        totalAgrupamientoITLF24.orizabaPresAcPor = agrupamientoITLF24.orizabaIngrAc / agrupamientoITLF24.orizabaPresAc;
        totalAgrupamientoITLF24.orizabaIngrAntPor = agrupamientoITLF24.orizabaIngr / agrupamientoITLF24.orizabaIngrAnt;
      
        event.summaryCells[6][0].value = totalAgrupamientoITLF24.cuatitlanPresPor;
        event.summaryCells[9][0].value = totalAgrupamientoITLF24.cuatitlanPresAcPor;
        event.summaryCells[11][0].value = totalAgrupamientoITLF24.cuatitlanIngrAntPor;
        event.summaryCells[14][0].value = totalAgrupamientoITLF24.tultitlanPresPor;
        event.summaryCells[17][0].value = totalAgrupamientoITLF24.tultitlanPresAcPor;
        event.summaryCells[19][0].value = totalAgrupamientoITLF24.tultitlanIngrAntPor;
        event.summaryCells[22][0].value = totalAgrupamientoITLF24.guadalajaraPresPor;
        event.summaryCells[25][0].value = totalAgrupamientoITLF24.guadalajaraPresAcPor;
        event.summaryCells[27][0].value = totalAgrupamientoITLF24.guadalajaraIngrAntPor;
        event.summaryCells[30][0].value = totalAgrupamientoITLF24.hermosilloPresPor;
        event.summaryCells[33][0].value = totalAgrupamientoITLF24.hermosilloPresAcPor;
        event.summaryCells[35][0].value = totalAgrupamientoITLF24.hermosilloIngrAntPor;
        event.summaryCells[38][0].value = totalAgrupamientoITLF24.mexicaliPresPor;
        event.summaryCells[41][0].value = totalAgrupamientoITLF24.mexicaliPresAcPor;
        event.summaryCells[43][0].value = totalAgrupamientoITLF24.mexicaliIngrAntPor;
        event.summaryCells[46][0].value = totalAgrupamientoITLF24.orizabaPresPor;
        event.summaryCells[49][0].value = totalAgrupamientoITLF24.orizabaPresAcPor;
        event.summaryCells[51][0].value = totalAgrupamientoITLF24.orizabaIngrAntPor;
      }
      if(event.data.key == '03 MAR'){
        agrupamientoITLM24.cuatitlanIngr = event.summaryCells[4][0].value;
        agrupamientoITLM24.cuatitlanPres = event.summaryCells[5][0].value;
        agrupamientoITLM24.cuatitlanIngrAc = event.summaryCells[7][0].value;
        agrupamientoITLM24.cuatitlanPresAc = event.summaryCells[8][0].value;
        agrupamientoITLM24.cuatitlanIngrAnt = event.summaryCells[10][0].value;
        agrupamientoITLM24.tultitlanIngr = event.summaryCells[12][0].value;
        agrupamientoITLM24.tultitlanPres = event.summaryCells[13][0].value;
        agrupamientoITLM24.tultitlanIngrAc = event.summaryCells[15][0].value;
        agrupamientoITLM24.tultitlanPresAc = event.summaryCells[16][0].value;
        agrupamientoITLM24.tultitlanIngrAnt = event.summaryCells[18][0].value;
        agrupamientoITLM24.guadalajaraIngr = event.summaryCells[20][0].value;
        agrupamientoITLM24.guadalajaraPres = event.summaryCells[21][0].value;
        agrupamientoITLM24.guadalajaraIngrAc = event.summaryCells[23][0].value;
        agrupamientoITLM24.guadalajaraPresAc = event.summaryCells[24][0].value;
        agrupamientoITLM24.guadalajaraIngrAnt = event.summaryCells[26][0].value;
        agrupamientoITLM24.hermosilloIngr = event.summaryCells[28][0].value;
        agrupamientoITLM24.hermosilloPres = event.summaryCells[29][0].value;
        agrupamientoITLM24.hermosilloIngrAc = event.summaryCells[31][0].value;
        agrupamientoITLM24.hermosilloPresAc = event.summaryCells[32][0].value;
        agrupamientoITLM24.hermosilloIngrAnt = event.summaryCells[34][0].value;
        agrupamientoITLM24.mexicaliIngr = event.summaryCells[36][0].value;
        agrupamientoITLM24.mexicaliPres = event.summaryCells[37][0].value;
        agrupamientoITLM24.mexicaliIngrAc = event.summaryCells[39][0].value;
        agrupamientoITLM24.mexicaliPresAc = event.summaryCells[40][0].value;
        agrupamientoITLM24.mexicaliIngrAnt = event.summaryCells[42][0].value;
        agrupamientoITLM24.orizabaIngr = event.summaryCells[44][0].value;
        agrupamientoITLM24.orizabaPres = event.summaryCells[45][0].value;
        agrupamientoITLM24.orizabaIngrAc = event.summaryCells[47][0].value;
        agrupamientoITLM24.orizabaPresAc = event.summaryCells[48][0].value;
        agrupamientoITLM24.orizabaIngrAnt = event.summaryCells[50][0].value;

        totalAgrupamientoITLM24.cuatitlanPresPor = agrupamientoITLM24.cuatitlanIngr / agrupamientoITLM24.cuatitlanPres;
        totalAgrupamientoITLM24.cuatitlanPresAcPor = agrupamientoITLM24.cuatitlanIngrAc / agrupamientoITLM24.cuatitlanPresAc;
        totalAgrupamientoITLM24.cuatitlanIngrAntPor = agrupamientoITLM24.cuatitlanIngr / agrupamientoITLM24.cuatitlanIngrAnt;
        totalAgrupamientoITLM24.tultitlanPresPor = agrupamientoITLM24.tultitlanIngr / agrupamientoITLM24.tultitlanPres;
        totalAgrupamientoITLM24.tultitlanPresAcPor = agrupamientoITLM24.tultitlanIngrAc / agrupamientoITLM24.tultitlanPresAc;
        totalAgrupamientoITLM24.tultitlanIngrAntPor = agrupamientoITLM24.tultitlanIngr / agrupamientoITLM24.tultitlanIngrAnt;
        totalAgrupamientoITLM24.guadalajaraPresPor = agrupamientoITLM24.guadalajaraIngr / agrupamientoITLM24.guadalajaraPres;
        totalAgrupamientoITLM24.guadalajaraPresAcPor = agrupamientoITLM24.guadalajaraIngrAc / agrupamientoITLM24.guadalajaraPresAc;
        totalAgrupamientoITLM24.guadalajaraIngrAntPor = agrupamientoITLM24.guadalajaraIngr / agrupamientoITLM24.guadalajaraIngrAnt;
        totalAgrupamientoITLM24.hermosilloPresPor = agrupamientoITLM24.hermosilloIngr / agrupamientoITLM24.hermosilloPres;
        totalAgrupamientoITLM24.hermosilloPresAcPor = agrupamientoITLM24.hermosilloIngrAc / agrupamientoITLM24.hermosilloPresAc;
        totalAgrupamientoITLM24.hermosilloIngrAntPor = agrupamientoITLM24.hermosilloIngr / agrupamientoITLM24.hermosilloIngrAnt;
        totalAgrupamientoITLM24.mexicaliPresPor = agrupamientoITLM24.mexicaliIngr / agrupamientoITLM24.mexicaliPres;
        totalAgrupamientoITLM24.mexicaliPresAcPor = agrupamientoITLM24.mexicaliIngrAc / agrupamientoITLM24.mexicaliPresAc;
        totalAgrupamientoITLM24.mexicaliIngrAntPor = agrupamientoITLM24.mexicaliIngr / agrupamientoITLM24.mexicaliIngrAnt;
        totalAgrupamientoITLM24.orizabaPresPor = agrupamientoITLM24.orizabaIngr / agrupamientoITLM24.orizabaPres;
        totalAgrupamientoITLM24.orizabaPresAcPor = agrupamientoITLM24.orizabaIngrAc / agrupamientoITLM24.orizabaPresAc;
        totalAgrupamientoITLM24.orizabaIngrAntPor = agrupamientoITLM24.orizabaIngr / agrupamientoITLM24.orizabaIngrAnt;
      
        event.summaryCells[6][0].value = totalAgrupamientoITLM24.cuatitlanPresPor;
        event.summaryCells[9][0].value = totalAgrupamientoITLM24.cuatitlanPresAcPor;
        event.summaryCells[11][0].value = totalAgrupamientoITLM24.cuatitlanIngrAntPor;
        event.summaryCells[14][0].value = totalAgrupamientoITLM24.tultitlanPresPor;
        event.summaryCells[17][0].value = totalAgrupamientoITLM24.tultitlanPresAcPor;
        event.summaryCells[19][0].value = totalAgrupamientoITLM24.tultitlanIngrAntPor;
        event.summaryCells[22][0].value = totalAgrupamientoITLM24.guadalajaraPresPor;
        event.summaryCells[25][0].value = totalAgrupamientoITLM24.guadalajaraPresAcPor;
        event.summaryCells[27][0].value = totalAgrupamientoITLM24.guadalajaraIngrAntPor;
        event.summaryCells[30][0].value = totalAgrupamientoITLM24.hermosilloPresPor;
        event.summaryCells[33][0].value = totalAgrupamientoITLM24.hermosilloPresAcPor;
        event.summaryCells[35][0].value = totalAgrupamientoITLM24.hermosilloIngrAntPor;
        event.summaryCells[38][0].value = totalAgrupamientoITLM24.mexicaliPresPor;
        event.summaryCells[41][0].value = totalAgrupamientoITLM24.mexicaliPresAcPor;
        event.summaryCells[43][0].value = totalAgrupamientoITLM24.mexicaliIngrAntPor;
        event.summaryCells[46][0].value = totalAgrupamientoITLM24.orizabaPresPor;
        event.summaryCells[49][0].value = totalAgrupamientoITLM24.orizabaPresAcPor;
        event.summaryCells[51][0].value = totalAgrupamientoITLM24.orizabaIngrAntPor;
      }
      if(event.data.key == '04 ABR'){
        agrupamientoITLA24.cuatitlanIngr = event.summaryCells[4][0].value;
        agrupamientoITLA24.cuatitlanPres = event.summaryCells[5][0].value;
        agrupamientoITLA24.cuatitlanIngrAc = event.summaryCells[7][0].value;
        agrupamientoITLA24.cuatitlanPresAc = event.summaryCells[8][0].value;
        agrupamientoITLA24.cuatitlanIngrAnt = event.summaryCells[10][0].value;
        agrupamientoITLA24.tultitlanIngr = event.summaryCells[12][0].value;
        agrupamientoITLA24.tultitlanPres = event.summaryCells[13][0].value;
        agrupamientoITLA24.tultitlanIngrAc = event.summaryCells[15][0].value;
        agrupamientoITLA24.tultitlanPresAc = event.summaryCells[16][0].value;
        agrupamientoITLA24.tultitlanIngrAnt = event.summaryCells[18][0].value;
        agrupamientoITLA24.guadalajaraIngr = event.summaryCells[20][0].value;
        agrupamientoITLA24.guadalajaraPres = event.summaryCells[21][0].value;
        agrupamientoITLA24.guadalajaraIngrAc = event.summaryCells[23][0].value;
        agrupamientoITLA24.guadalajaraPresAc = event.summaryCells[24][0].value;
        agrupamientoITLA24.guadalajaraIngrAnt = event.summaryCells[26][0].value;
        agrupamientoITLA24.hermosilloIngr = event.summaryCells[28][0].value;
        agrupamientoITLA24.hermosilloPres = event.summaryCells[29][0].value;
        agrupamientoITLA24.hermosilloIngrAc = event.summaryCells[31][0].value;
        agrupamientoITLA24.hermosilloPresAc = event.summaryCells[32][0].value;
        agrupamientoITLA24.hermosilloIngrAnt = event.summaryCells[34][0].value;
        agrupamientoITLA24.mexicaliIngr = event.summaryCells[36][0].value;
        agrupamientoITLA24.mexicaliPres = event.summaryCells[37][0].value;
        agrupamientoITLA24.mexicaliIngrAc = event.summaryCells[39][0].value;
        agrupamientoITLA24.mexicaliPresAc = event.summaryCells[40][0].value;
        agrupamientoITLA24.mexicaliIngrAnt = event.summaryCells[42][0].value;
        agrupamientoITLA24.orizabaIngr = event.summaryCells[44][0].value;
        agrupamientoITLA24.orizabaPres = event.summaryCells[45][0].value;
        agrupamientoITLA24.orizabaIngrAc = event.summaryCells[47][0].value;
        agrupamientoITLA24.orizabaPresAc = event.summaryCells[48][0].value;
        agrupamientoITLA24.orizabaIngrAnt = event.summaryCells[50][0].value;

        totalAgrupamientoITLA24.cuatitlanPresPor = agrupamientoITLA24.cuatitlanIngr / agrupamientoITLA24.cuatitlanPres;
        totalAgrupamientoITLA24.cuatitlanPresAcPor = agrupamientoITLA24.cuatitlanIngrAc / agrupamientoITLA24.cuatitlanPresAc;
        totalAgrupamientoITLA24.cuatitlanIngrAntPor = agrupamientoITLA24.cuatitlanIngr / agrupamientoITLA24.cuatitlanIngrAnt;
        totalAgrupamientoITLA24.tultitlanPresPor = agrupamientoITLA24.tultitlanIngr / agrupamientoITLA24.tultitlanPres;
        totalAgrupamientoITLA24.tultitlanPresAcPor = agrupamientoITLA24.tultitlanIngrAc / agrupamientoITLA24.tultitlanPresAc;
        totalAgrupamientoITLA24.tultitlanIngrAntPor = agrupamientoITLA24.tultitlanIngr / agrupamientoITLA24.tultitlanIngrAnt;
        totalAgrupamientoITLA24.guadalajaraPresPor = agrupamientoITLA24.guadalajaraIngr / agrupamientoITLA24.guadalajaraPres;
        totalAgrupamientoITLA24.guadalajaraPresAcPor = agrupamientoITLA24.guadalajaraIngrAc / agrupamientoITLA24.guadalajaraPresAc;
        totalAgrupamientoITLA24.guadalajaraIngrAntPor = agrupamientoITLA24.guadalajaraIngr / agrupamientoITLA24.guadalajaraIngrAnt;
        totalAgrupamientoITLA24.hermosilloPresPor = agrupamientoITLA24.hermosilloIngr / agrupamientoITLA24.hermosilloPres;
        totalAgrupamientoITLA24.hermosilloPresAcPor = agrupamientoITLA24.hermosilloIngrAc / agrupamientoITLA24.hermosilloPresAc;
        totalAgrupamientoITLA24.hermosilloIngrAntPor = agrupamientoITLA24.hermosilloIngr / agrupamientoITLA24.hermosilloIngrAnt;
        totalAgrupamientoITLA24.mexicaliPresPor = agrupamientoITLA24.mexicaliIngr / agrupamientoITLA24.mexicaliPres;
        totalAgrupamientoITLA24.mexicaliPresAcPor = agrupamientoITLA24.mexicaliIngrAc / agrupamientoITLA24.mexicaliPresAc;
        totalAgrupamientoITLA24.mexicaliIngrAntPor = agrupamientoITLA24.mexicaliIngr / agrupamientoITLA24.mexicaliIngrAnt;
        totalAgrupamientoITLA24.orizabaPresPor = agrupamientoITLA24.orizabaIngr / agrupamientoITLA24.orizabaPres;
        totalAgrupamientoITLA24.orizabaPresAcPor = agrupamientoITLA24.orizabaIngrAc / agrupamientoITLA24.orizabaPresAc;
        totalAgrupamientoITLA24.orizabaIngrAntPor = agrupamientoITLA24.orizabaIngr / agrupamientoITLA24.orizabaIngrAnt;
      
        event.summaryCells[6][0].value = totalAgrupamientoITLA24.cuatitlanPresPor;
        event.summaryCells[9][0].value = totalAgrupamientoITLA24.cuatitlanPresAcPor;
        event.summaryCells[11][0].value = totalAgrupamientoITLA24.cuatitlanIngrAntPor;
        event.summaryCells[14][0].value = totalAgrupamientoITLA24.tultitlanPresPor;
        event.summaryCells[17][0].value = totalAgrupamientoITLA24.tultitlanPresAcPor;
        event.summaryCells[19][0].value = totalAgrupamientoITLA24.tultitlanIngrAntPor;
        event.summaryCells[22][0].value = totalAgrupamientoITLA24.guadalajaraPresPor;
        event.summaryCells[25][0].value = totalAgrupamientoITLA24.guadalajaraPresAcPor;
        event.summaryCells[27][0].value = totalAgrupamientoITLA24.guadalajaraIngrAntPor;
        event.summaryCells[30][0].value = totalAgrupamientoITLA24.hermosilloPresPor;
        event.summaryCells[33][0].value = totalAgrupamientoITLA24.hermosilloPresAcPor;
        event.summaryCells[35][0].value = totalAgrupamientoITLA24.hermosilloIngrAntPor;
        event.summaryCells[38][0].value = totalAgrupamientoITLA24.mexicaliPresPor;
        event.summaryCells[41][0].value = totalAgrupamientoITLA24.mexicaliPresAcPor;
        event.summaryCells[43][0].value = totalAgrupamientoITLA24.mexicaliIngrAntPor;
        event.summaryCells[46][0].value = totalAgrupamientoITLA24.orizabaPresPor;
        event.summaryCells[49][0].value = totalAgrupamientoITLA24.orizabaPresAcPor;
        event.summaryCells[51][0].value = totalAgrupamientoITLA24.orizabaIngrAntPor;
      }
      if(event.data.key == '05 MAY'){
        agrupamientoITLMY24.cuatitlanIngr = event.summaryCells[4][0].value;
        agrupamientoITLMY24.cuatitlanPres = event.summaryCells[5][0].value;
        agrupamientoITLMY24.cuatitlanIngrAc = event.summaryCells[7][0].value;
        agrupamientoITLMY24.cuatitlanPresAc = event.summaryCells[8][0].value;
        agrupamientoITLMY24.cuatitlanIngrAnt = event.summaryCells[10][0].value;
        agrupamientoITLMY24.tultitlanIngr = event.summaryCells[12][0].value;
        agrupamientoITLMY24.tultitlanPres = event.summaryCells[13][0].value;
        agrupamientoITLMY24.tultitlanIngrAc = event.summaryCells[15][0].value;
        agrupamientoITLMY24.tultitlanPresAc = event.summaryCells[16][0].value;
        agrupamientoITLMY24.tultitlanIngrAnt = event.summaryCells[18][0].value;
        agrupamientoITLMY24.guadalajaraIngr = event.summaryCells[20][0].value;
        agrupamientoITLMY24.guadalajaraPres = event.summaryCells[21][0].value;
        agrupamientoITLMY24.guadalajaraIngrAc = event.summaryCells[23][0].value;
        agrupamientoITLMY24.guadalajaraPresAc = event.summaryCells[24][0].value;
        agrupamientoITLMY24.guadalajaraIngrAnt = event.summaryCells[26][0].value;
        agrupamientoITLMY24.hermosilloIngr = event.summaryCells[28][0].value;
        agrupamientoITLMY24.hermosilloPres = event.summaryCells[29][0].value;
        agrupamientoITLMY24.hermosilloIngrAc = event.summaryCells[31][0].value;
        agrupamientoITLMY24.hermosilloPresAc = event.summaryCells[32][0].value;
        agrupamientoITLMY24.hermosilloIngrAnt = event.summaryCells[34][0].value;
        agrupamientoITLMY24.mexicaliIngr = event.summaryCells[36][0].value;
        agrupamientoITLMY24.mexicaliPres = event.summaryCells[37][0].value;
        agrupamientoITLMY24.mexicaliIngrAc = event.summaryCells[39][0].value;
        agrupamientoITLMY24.mexicaliPresAc = event.summaryCells[40][0].value;
        agrupamientoITLMY24.mexicaliIngrAnt = event.summaryCells[42][0].value;
        agrupamientoITLMY24.orizabaIngr = event.summaryCells[44][0].value;
        agrupamientoITLMY24.orizabaPres = event.summaryCells[45][0].value;
        agrupamientoITLMY24.orizabaIngrAc = event.summaryCells[47][0].value;
        agrupamientoITLMY24.orizabaPresAc = event.summaryCells[48][0].value;
        agrupamientoITLMY24.orizabaIngrAnt = event.summaryCells[50][0].value;

        totalAgrupamientoITLMY24.cuatitlanPresPor = agrupamientoITLMY24.cuatitlanIngr / agrupamientoITLMY24.cuatitlanPres;
        totalAgrupamientoITLMY24.cuatitlanPresAcPor = agrupamientoITLMY24.cuatitlanIngrAc / agrupamientoITLMY24.cuatitlanPresAc;
        totalAgrupamientoITLMY24.cuatitlanIngrAntPor = agrupamientoITLMY24.cuatitlanIngr / agrupamientoITLMY24.cuatitlanIngrAnt;
        totalAgrupamientoITLMY24.tultitlanPresPor = agrupamientoITLMY24.tultitlanIngr / agrupamientoITLMY24.tultitlanPres;
        totalAgrupamientoITLMY24.tultitlanPresAcPor = agrupamientoITLMY24.tultitlanIngrAc / agrupamientoITLMY24.tultitlanPresAc;
        totalAgrupamientoITLMY24.tultitlanIngrAntPor = agrupamientoITLMY24.tultitlanIngr / agrupamientoITLMY24.tultitlanIngrAnt;
        totalAgrupamientoITLMY24.guadalajaraPresPor = agrupamientoITLMY24.guadalajaraIngr / agrupamientoITLMY24.guadalajaraPres;
        totalAgrupamientoITLMY24.guadalajaraPresAcPor = agrupamientoITLMY24.guadalajaraIngrAc / agrupamientoITLMY24.guadalajaraPresAc;
        totalAgrupamientoITLMY24.guadalajaraIngrAntPor = agrupamientoITLMY24.guadalajaraIngr / agrupamientoITLMY24.guadalajaraIngrAnt;
        totalAgrupamientoITLMY24.hermosilloPresPor = agrupamientoITLMY24.hermosilloIngr / agrupamientoITLMY24.hermosilloPres;
        totalAgrupamientoITLMY24.hermosilloPresAcPor = agrupamientoITLMY24.hermosilloIngrAc / agrupamientoITLMY24.hermosilloPresAc;
        totalAgrupamientoITLMY24.hermosilloIngrAntPor = agrupamientoITLMY24.hermosilloIngr / agrupamientoITLMY24.hermosilloIngrAnt;
        totalAgrupamientoITLMY24.mexicaliPresPor = agrupamientoITLMY24.mexicaliIngr / agrupamientoITLMY24.mexicaliPres;
        totalAgrupamientoITLMY24.mexicaliPresAcPor = agrupamientoITLMY24.mexicaliIngrAc / agrupamientoITLMY24.mexicaliPresAc;
        totalAgrupamientoITLMY24.mexicaliIngrAntPor = agrupamientoITLMY24.mexicaliIngr / agrupamientoITLMY24.mexicaliIngrAnt;
        totalAgrupamientoITLMY24.orizabaPresPor = agrupamientoITLMY24.orizabaIngr / agrupamientoITLMY24.orizabaPres;
        totalAgrupamientoITLMY24.orizabaPresAcPor = agrupamientoITLMY24.orizabaIngrAc / agrupamientoITLMY24.orizabaPresAc;
        totalAgrupamientoITLMY24.orizabaIngrAntPor = agrupamientoITLMY24.orizabaIngr / agrupamientoITLMY24.orizabaIngrAnt;
      
        event.summaryCells[6][0].value = totalAgrupamientoITLMY24.cuatitlanPresPor;
        event.summaryCells[9][0].value = totalAgrupamientoITLMY24.cuatitlanPresAcPor;
        event.summaryCells[11][0].value = totalAgrupamientoITLMY24.cuatitlanIngrAntPor;
        event.summaryCells[14][0].value = totalAgrupamientoITLMY24.tultitlanPresPor;
        event.summaryCells[17][0].value = totalAgrupamientoITLMY24.tultitlanPresAcPor;
        event.summaryCells[19][0].value = totalAgrupamientoITLMY24.tultitlanIngrAntPor;
        event.summaryCells[22][0].value = totalAgrupamientoITLMY24.guadalajaraPresPor;
        event.summaryCells[25][0].value = totalAgrupamientoITLMY24.guadalajaraPresAcPor;
        event.summaryCells[27][0].value = totalAgrupamientoITLMY24.guadalajaraIngrAntPor;
        event.summaryCells[30][0].value = totalAgrupamientoITLMY24.hermosilloPresPor;
        event.summaryCells[33][0].value = totalAgrupamientoITLMY24.hermosilloPresAcPor;
        event.summaryCells[35][0].value = totalAgrupamientoITLMY24.hermosilloIngrAntPor;
        event.summaryCells[38][0].value = totalAgrupamientoITLMY24.mexicaliPresPor;
        event.summaryCells[41][0].value = totalAgrupamientoITLMY24.mexicaliPresAcPor;
        event.summaryCells[43][0].value = totalAgrupamientoITLMY24.mexicaliIngrAntPor;
        event.summaryCells[46][0].value = totalAgrupamientoITLMY24.orizabaPresPor;
        event.summaryCells[49][0].value = totalAgrupamientoITLMY24.orizabaPresAcPor;
        event.summaryCells[51][0].value = totalAgrupamientoITLMY24.orizabaIngrAntPor;
      }
      if(event.data.key == '06 JUN'){
        agrupamientoITLJN24.cuatitlanIngr = event.summaryCells[4][0].value;
        agrupamientoITLJN24.cuatitlanPres = event.summaryCells[5][0].value;
        agrupamientoITLJN24.cuatitlanIngrAc = event.summaryCells[7][0].value;
        agrupamientoITLJN24.cuatitlanPresAc = event.summaryCells[8][0].value;
        agrupamientoITLJN24.cuatitlanIngrAnt = event.summaryCells[10][0].value;
        agrupamientoITLJN24.tultitlanIngr = event.summaryCells[12][0].value;
        agrupamientoITLJN24.tultitlanPres = event.summaryCells[13][0].value;
        agrupamientoITLJN24.tultitlanIngrAc = event.summaryCells[15][0].value;
        agrupamientoITLJN24.tultitlanPresAc = event.summaryCells[16][0].value;
        agrupamientoITLJN24.tultitlanIngrAnt = event.summaryCells[18][0].value;
        agrupamientoITLJN24.guadalajaraIngr = event.summaryCells[20][0].value;
        agrupamientoITLJN24.guadalajaraPres = event.summaryCells[21][0].value;
        agrupamientoITLJN24.guadalajaraIngrAc = event.summaryCells[23][0].value;
        agrupamientoITLJN24.guadalajaraPresAc = event.summaryCells[24][0].value;
        agrupamientoITLJN24.guadalajaraIngrAnt = event.summaryCells[26][0].value;
        agrupamientoITLJN24.hermosilloIngr = event.summaryCells[28][0].value;
        agrupamientoITLJN24.hermosilloPres = event.summaryCells[29][0].value;
        agrupamientoITLJN24.hermosilloIngrAc = event.summaryCells[31][0].value;
        agrupamientoITLJN24.hermosilloPresAc = event.summaryCells[32][0].value;
        agrupamientoITLJN24.hermosilloIngrAnt = event.summaryCells[34][0].value;
        agrupamientoITLJN24.mexicaliIngr = event.summaryCells[36][0].value;
        agrupamientoITLJN24.mexicaliPres = event.summaryCells[37][0].value;
        agrupamientoITLJN24.mexicaliIngrAc = event.summaryCells[39][0].value;
        agrupamientoITLJN24.mexicaliPresAc = event.summaryCells[40][0].value;
        agrupamientoITLJN24.mexicaliIngrAnt = event.summaryCells[42][0].value;
        agrupamientoITLJN24.orizabaIngr = event.summaryCells[44][0].value;
        agrupamientoITLJN24.orizabaPres = event.summaryCells[45][0].value;
        agrupamientoITLJN24.orizabaIngrAc = event.summaryCells[47][0].value;
        agrupamientoITLJN24.orizabaPresAc = event.summaryCells[48][0].value;
        agrupamientoITLJN24.orizabaIngrAnt = event.summaryCells[50][0].value;

        totalAgrupamientoITLJN24.cuatitlanPresPor = agrupamientoITLJN24.cuatitlanIngr / agrupamientoITLJN24.cuatitlanPres;
        totalAgrupamientoITLJN24.cuatitlanPresAcPor = agrupamientoITLJN24.cuatitlanIngrAc / agrupamientoITLJN24.cuatitlanPresAc;
        totalAgrupamientoITLJN24.cuatitlanIngrAntPor = agrupamientoITLJN24.cuatitlanIngr / agrupamientoITLJN24.cuatitlanIngrAnt;
        totalAgrupamientoITLJN24.tultitlanPresPor = agrupamientoITLJN24.tultitlanIngr / agrupamientoITLJN24.tultitlanPres;
        totalAgrupamientoITLJN24.tultitlanPresAcPor = agrupamientoITLJN24.tultitlanIngrAc / agrupamientoITLJN24.tultitlanPresAc;
        totalAgrupamientoITLJN24.tultitlanIngrAntPor = agrupamientoITLJN24.tultitlanIngr / agrupamientoITLJN24.tultitlanIngrAnt;
        totalAgrupamientoITLJN24.guadalajaraPresPor = agrupamientoITLJN24.guadalajaraIngr / agrupamientoITLJN24.guadalajaraPres;
        totalAgrupamientoITLJN24.guadalajaraPresAcPor = agrupamientoITLJN24.guadalajaraIngrAc / agrupamientoITLJN24.guadalajaraPresAc;
        totalAgrupamientoITLJN24.guadalajaraIngrAntPor = agrupamientoITLJN24.guadalajaraIngr / agrupamientoITLJN24.guadalajaraIngrAnt;
        totalAgrupamientoITLJN24.hermosilloPresPor = agrupamientoITLJN24.hermosilloIngr / agrupamientoITLJN24.hermosilloPres;
        totalAgrupamientoITLJN24.hermosilloPresAcPor = agrupamientoITLJN24.hermosilloIngrAc / agrupamientoITLJN24.hermosilloPresAc;
        totalAgrupamientoITLJN24.hermosilloIngrAntPor = agrupamientoITLJN24.hermosilloIngr / agrupamientoITLJN24.hermosilloIngrAnt;
        totalAgrupamientoITLJN24.mexicaliPresPor = agrupamientoITLJN24.mexicaliIngr / agrupamientoITLJN24.mexicaliPres;
        totalAgrupamientoITLJN24.mexicaliPresAcPor = agrupamientoITLJN24.mexicaliIngrAc / agrupamientoITLJN24.mexicaliPresAc;
        totalAgrupamientoITLJN24.mexicaliIngrAntPor = agrupamientoITLJN24.mexicaliIngr / agrupamientoITLJN24.mexicaliIngrAnt;
        totalAgrupamientoITLJN24.orizabaPresPor = agrupamientoITLJN24.orizabaIngr / agrupamientoITLJN24.orizabaPres;
        totalAgrupamientoITLJN24.orizabaPresAcPor = agrupamientoITLJN24.orizabaIngrAc / agrupamientoITLJN24.orizabaPresAc;
        totalAgrupamientoITLJN24.orizabaIngrAntPor = agrupamientoITLJN24.orizabaIngr / agrupamientoITLJN24.orizabaIngrAnt;
      
        event.summaryCells[6][0].value = totalAgrupamientoITLJN24.cuatitlanPresPor;
        event.summaryCells[9][0].value = totalAgrupamientoITLJN24.cuatitlanPresAcPor;
        event.summaryCells[11][0].value = totalAgrupamientoITLJN24.cuatitlanIngrAntPor;
        event.summaryCells[14][0].value = totalAgrupamientoITLJN24.tultitlanPresPor;
        event.summaryCells[17][0].value = totalAgrupamientoITLJN24.tultitlanPresAcPor;
        event.summaryCells[19][0].value = totalAgrupamientoITLJN24.tultitlanIngrAntPor;
        event.summaryCells[22][0].value = totalAgrupamientoITLJN24.guadalajaraPresPor;
        event.summaryCells[25][0].value = totalAgrupamientoITLJN24.guadalajaraPresAcPor;
        event.summaryCells[27][0].value = totalAgrupamientoITLJN24.guadalajaraIngrAntPor;
        event.summaryCells[30][0].value = totalAgrupamientoITLJN24.hermosilloPresPor;
        event.summaryCells[33][0].value = totalAgrupamientoITLJN24.hermosilloPresAcPor;
        event.summaryCells[35][0].value = totalAgrupamientoITLJN24.hermosilloIngrAntPor;
        event.summaryCells[38][0].value = totalAgrupamientoITLJN24.mexicaliPresPor;
        event.summaryCells[41][0].value = totalAgrupamientoITLJN24.mexicaliPresAcPor;
        event.summaryCells[43][0].value = totalAgrupamientoITLJN24.mexicaliIngrAntPor;
        event.summaryCells[46][0].value = totalAgrupamientoITLJN24.orizabaPresPor;
        event.summaryCells[49][0].value = totalAgrupamientoITLJN24.orizabaPresAcPor;
        event.summaryCells[51][0].value = totalAgrupamientoITLJN24.orizabaIngrAntPor;
      }
      if(event.data.key == '07 JUL'){
        agrupamientoITLJL24.cuatitlanIngr = event.summaryCells[4][0].value;
        agrupamientoITLJL24.cuatitlanPres = event.summaryCells[5][0].value;
        agrupamientoITLJL24.cuatitlanIngrAc = event.summaryCells[7][0].value;
        agrupamientoITLJL24.cuatitlanPresAc = event.summaryCells[8][0].value;
        agrupamientoITLJL24.cuatitlanIngrAnt = event.summaryCells[10][0].value;
        agrupamientoITLJL24.tultitlanIngr = event.summaryCells[12][0].value;
        agrupamientoITLJL24.tultitlanPres = event.summaryCells[13][0].value;
        agrupamientoITLJL24.tultitlanIngrAc = event.summaryCells[15][0].value;
        agrupamientoITLJL24.tultitlanPresAc = event.summaryCells[16][0].value;
        agrupamientoITLJL24.tultitlanIngrAnt = event.summaryCells[18][0].value;
        agrupamientoITLJL24.guadalajaraIngr = event.summaryCells[20][0].value;
        agrupamientoITLJL24.guadalajaraPres = event.summaryCells[21][0].value;
        agrupamientoITLJL24.guadalajaraIngrAc = event.summaryCells[23][0].value;
        agrupamientoITLJL24.guadalajaraPresAc = event.summaryCells[24][0].value;
        agrupamientoITLJL24.guadalajaraIngrAnt = event.summaryCells[26][0].value;
        agrupamientoITLJL24.hermosilloIngr = event.summaryCells[28][0].value;
        agrupamientoITLJL24.hermosilloPres = event.summaryCells[29][0].value;
        agrupamientoITLJL24.hermosilloIngrAc = event.summaryCells[31][0].value;
        agrupamientoITLJL24.hermosilloPresAc = event.summaryCells[32][0].value;
        agrupamientoITLJL24.hermosilloIngrAnt = event.summaryCells[34][0].value;
        agrupamientoITLJL24.mexicaliIngr = event.summaryCells[36][0].value;
        agrupamientoITLJL24.mexicaliPres = event.summaryCells[37][0].value;
        agrupamientoITLJL24.mexicaliIngrAc = event.summaryCells[39][0].value;
        agrupamientoITLJL24.mexicaliPresAc = event.summaryCells[40][0].value;
        agrupamientoITLJL24.mexicaliIngrAnt = event.summaryCells[42][0].value;
        agrupamientoITLJL24.orizabaIngr = event.summaryCells[44][0].value;
        agrupamientoITLJL24.orizabaPres = event.summaryCells[45][0].value;
        agrupamientoITLJL24.orizabaIngrAc = event.summaryCells[47][0].value;
        agrupamientoITLJL24.orizabaPresAc = event.summaryCells[48][0].value;
        agrupamientoITLJL24.orizabaIngrAnt = event.summaryCells[50][0].value;

        totalAgrupamientoITLJL24.cuatitlanPresPor = agrupamientoITLJL24.cuatitlanIngr / agrupamientoITLJL24.cuatitlanPres;
        totalAgrupamientoITLJL24.cuatitlanPresAcPor = agrupamientoITLJL24.cuatitlanIngrAc / agrupamientoITLJL24.cuatitlanPresAc;
        totalAgrupamientoITLJL24.cuatitlanIngrAntPor = agrupamientoITLJL24.cuatitlanIngr / agrupamientoITLJL24.cuatitlanIngrAnt;
        totalAgrupamientoITLJL24.tultitlanPresPor = agrupamientoITLJL24.tultitlanIngr / agrupamientoITLJL24.tultitlanPres;
        totalAgrupamientoITLJL24.tultitlanPresAcPor = agrupamientoITLJL24.tultitlanIngrAc / agrupamientoITLJL24.tultitlanPresAc;
        totalAgrupamientoITLJL24.tultitlanIngrAntPor = agrupamientoITLJL24.tultitlanIngr / agrupamientoITLJL24.tultitlanIngrAnt;
        totalAgrupamientoITLJL24.guadalajaraPresPor = agrupamientoITLJL24.guadalajaraIngr / agrupamientoITLJL24.guadalajaraPres;
        totalAgrupamientoITLJL24.guadalajaraPresAcPor = agrupamientoITLJL24.guadalajaraIngrAc / agrupamientoITLJL24.guadalajaraPresAc;
        totalAgrupamientoITLJL24.guadalajaraIngrAntPor = agrupamientoITLJL24.guadalajaraIngr / agrupamientoITLJL24.guadalajaraIngrAnt;
        totalAgrupamientoITLJL24.hermosilloPresPor = agrupamientoITLJL24.hermosilloIngr / agrupamientoITLJL24.hermosilloPres;
        totalAgrupamientoITLJL24.hermosilloPresAcPor = agrupamientoITLJL24.hermosilloIngrAc / agrupamientoITLJL24.hermosilloPresAc;
        totalAgrupamientoITLJL24.hermosilloIngrAntPor = agrupamientoITLJL24.hermosilloIngr / agrupamientoITLJL24.hermosilloIngrAnt;
        totalAgrupamientoITLJL24.mexicaliPresPor = agrupamientoITLJL24.mexicaliIngr / agrupamientoITLJL24.mexicaliPres;
        totalAgrupamientoITLJL24.mexicaliPresAcPor = agrupamientoITLJL24.mexicaliIngrAc / agrupamientoITLJL24.mexicaliPresAc;
        totalAgrupamientoITLJL24.mexicaliIngrAntPor = agrupamientoITLJL24.mexicaliIngr / agrupamientoITLJL24.mexicaliIngrAnt;
        totalAgrupamientoITLJL24.orizabaPresPor = agrupamientoITLJL24.orizabaIngr / agrupamientoITLJL24.orizabaPres;
        totalAgrupamientoITLJL24.orizabaPresAcPor = agrupamientoITLJL24.orizabaIngrAc / agrupamientoITLJL24.orizabaPresAc;
        totalAgrupamientoITLJL24.orizabaIngrAntPor = agrupamientoITLJL24.orizabaIngr / agrupamientoITLJL24.orizabaIngrAnt;
      
        event.summaryCells[6][0].value = totalAgrupamientoITLJL24.cuatitlanPresPor;
        event.summaryCells[9][0].value = totalAgrupamientoITLJL24.cuatitlanPresAcPor;
        event.summaryCells[11][0].value = totalAgrupamientoITLJL24.cuatitlanIngrAntPor;
        event.summaryCells[14][0].value = totalAgrupamientoITLJL24.tultitlanPresPor;
        event.summaryCells[17][0].value = totalAgrupamientoITLJL24.tultitlanPresAcPor;
        event.summaryCells[19][0].value = totalAgrupamientoITLJL24.tultitlanIngrAntPor;
        event.summaryCells[22][0].value = totalAgrupamientoITLJL24.guadalajaraPresPor;
        event.summaryCells[25][0].value = totalAgrupamientoITLJL24.guadalajaraPresAcPor;
        event.summaryCells[27][0].value = totalAgrupamientoITLJL24.guadalajaraIngrAntPor;
        event.summaryCells[30][0].value = totalAgrupamientoITLJL24.hermosilloPresPor;
        event.summaryCells[33][0].value = totalAgrupamientoITLJL24.hermosilloPresAcPor;
        event.summaryCells[35][0].value = totalAgrupamientoITLJL24.hermosilloIngrAntPor;
        event.summaryCells[38][0].value = totalAgrupamientoITLJL24.mexicaliPresPor;
        event.summaryCells[41][0].value = totalAgrupamientoITLJL24.mexicaliPresAcPor;
        event.summaryCells[43][0].value = totalAgrupamientoITLJL24.mexicaliIngrAntPor;
        event.summaryCells[46][0].value = totalAgrupamientoITLJL24.orizabaPresPor;
        event.summaryCells[49][0].value = totalAgrupamientoITLJL24.orizabaPresAcPor;
        event.summaryCells[51][0].value = totalAgrupamientoITLJL24.orizabaIngrAntPor;
      }
      if(event.data.key == '08 AGO'){
        agrupamientoITLAG24.cuatitlanIngr = event.summaryCells[4][0].value;
        agrupamientoITLAG24.cuatitlanPres = event.summaryCells[5][0].value;
        agrupamientoITLAG24.cuatitlanIngrAc = event.summaryCells[7][0].value;
        agrupamientoITLAG24.cuatitlanPresAc = event.summaryCells[8][0].value;
        agrupamientoITLAG24.cuatitlanIngrAnt = event.summaryCells[10][0].value;
        agrupamientoITLAG24.tultitlanIngr = event.summaryCells[12][0].value;
        agrupamientoITLAG24.tultitlanPres = event.summaryCells[13][0].value;
        agrupamientoITLAG24.tultitlanIngrAc = event.summaryCells[15][0].value;
        agrupamientoITLAG24.tultitlanPresAc = event.summaryCells[16][0].value;
        agrupamientoITLAG24.tultitlanIngrAnt = event.summaryCells[18][0].value;
        agrupamientoITLAG24.guadalajaraIngr = event.summaryCells[20][0].value;
        agrupamientoITLAG24.guadalajaraPres = event.summaryCells[21][0].value;
        agrupamientoITLAG24.guadalajaraIngrAc = event.summaryCells[23][0].value;
        agrupamientoITLAG24.guadalajaraPresAc = event.summaryCells[24][0].value;
        agrupamientoITLAG24.guadalajaraIngrAnt = event.summaryCells[26][0].value;
        agrupamientoITLAG24.hermosilloIngr = event.summaryCells[28][0].value;
        agrupamientoITLAG24.hermosilloPres = event.summaryCells[29][0].value;
        agrupamientoITLAG24.hermosilloIngrAc = event.summaryCells[31][0].value;
        agrupamientoITLAG24.hermosilloPresAc = event.summaryCells[32][0].value;
        agrupamientoITLAG24.hermosilloIngrAnt = event.summaryCells[34][0].value;
        agrupamientoITLAG24.mexicaliIngr = event.summaryCells[36][0].value;
        agrupamientoITLAG24.mexicaliPres = event.summaryCells[37][0].value;
        agrupamientoITLAG24.mexicaliIngrAc = event.summaryCells[39][0].value;
        agrupamientoITLAG24.mexicaliPresAc = event.summaryCells[40][0].value;
        agrupamientoITLAG24.mexicaliIngrAnt = event.summaryCells[42][0].value;
        agrupamientoITLAG24.orizabaIngr = event.summaryCells[44][0].value;
        agrupamientoITLAG24.orizabaPres = event.summaryCells[45][0].value;
        agrupamientoITLAG24.orizabaIngrAc = event.summaryCells[47][0].value;
        agrupamientoITLAG24.orizabaPresAc = event.summaryCells[48][0].value;
        agrupamientoITLAG24.orizabaIngrAnt = event.summaryCells[50][0].value;

        totalAgrupamientoITLAG24.cuatitlanPresPor = agrupamientoITLAG24.cuatitlanIngr / agrupamientoITLAG24.cuatitlanPres;
        totalAgrupamientoITLAG24.cuatitlanPresAcPor = agrupamientoITLAG24.cuatitlanIngrAc / agrupamientoITLAG24.cuatitlanPresAc;
        totalAgrupamientoITLAG24.cuatitlanIngrAntPor = agrupamientoITLAG24.cuatitlanIngr / agrupamientoITLAG24.cuatitlanIngrAnt;
        totalAgrupamientoITLAG24.tultitlanPresPor = agrupamientoITLAG24.tultitlanIngr / agrupamientoITLAG24.tultitlanPres;
        totalAgrupamientoITLAG24.tultitlanPresAcPor = agrupamientoITLAG24.tultitlanIngrAc / agrupamientoITLAG24.tultitlanPresAc;
        totalAgrupamientoITLAG24.tultitlanIngrAntPor = agrupamientoITLAG24.tultitlanIngr / agrupamientoITLAG24.tultitlanIngrAnt;
        totalAgrupamientoITLAG24.guadalajaraPresPor = agrupamientoITLAG24.guadalajaraIngr / agrupamientoITLAG24.guadalajaraPres;
        totalAgrupamientoITLAG24.guadalajaraPresAcPor = agrupamientoITLAG24.guadalajaraIngrAc / agrupamientoITLAG24.guadalajaraPresAc;
        totalAgrupamientoITLAG24.guadalajaraIngrAntPor = agrupamientoITLAG24.guadalajaraIngr / agrupamientoITLAG24.guadalajaraIngrAnt;
        totalAgrupamientoITLAG24.hermosilloPresPor = agrupamientoITLAG24.hermosilloIngr / agrupamientoITLAG24.hermosilloPres;
        totalAgrupamientoITLAG24.hermosilloPresAcPor = agrupamientoITLAG24.hermosilloIngrAc / agrupamientoITLAG24.hermosilloPresAc;
        totalAgrupamientoITLAG24.hermosilloIngrAntPor = agrupamientoITLAG24.hermosilloIngr / agrupamientoITLAG24.hermosilloIngrAnt;
        totalAgrupamientoITLAG24.mexicaliPresPor = agrupamientoITLAG24.mexicaliIngr / agrupamientoITLAG24.mexicaliPres;
        totalAgrupamientoITLAG24.mexicaliPresAcPor = agrupamientoITLAG24.mexicaliIngrAc / agrupamientoITLAG24.mexicaliPresAc;
        totalAgrupamientoITLAG24.mexicaliIngrAntPor = agrupamientoITLAG24.mexicaliIngr / agrupamientoITLAG24.mexicaliIngrAnt;
        totalAgrupamientoITLAG24.orizabaPresPor = agrupamientoITLAG24.orizabaIngr / agrupamientoITLAG24.orizabaPres;
        totalAgrupamientoITLAG24.orizabaPresAcPor = agrupamientoITLAG24.orizabaIngrAc / agrupamientoITLAG24.orizabaPresAc;
        totalAgrupamientoITLAG24.orizabaIngrAntPor = agrupamientoITLAG24.orizabaIngr / agrupamientoITLAG24.orizabaIngrAnt;
      
        event.summaryCells[6][0].value = totalAgrupamientoITLAG24.cuatitlanPresPor;
        event.summaryCells[9][0].value = totalAgrupamientoITLAG24.cuatitlanPresAcPor;
        event.summaryCells[11][0].value = totalAgrupamientoITLAG24.cuatitlanIngrAntPor;
        event.summaryCells[14][0].value = totalAgrupamientoITLAG24.tultitlanPresPor;
        event.summaryCells[17][0].value = totalAgrupamientoITLAG24.tultitlanPresAcPor;
        event.summaryCells[19][0].value = totalAgrupamientoITLAG24.tultitlanIngrAntPor;
        event.summaryCells[22][0].value = totalAgrupamientoITLAG24.guadalajaraPresPor;
        event.summaryCells[25][0].value = totalAgrupamientoITLAG24.guadalajaraPresAcPor;
        event.summaryCells[27][0].value = totalAgrupamientoITLAG24.guadalajaraIngrAntPor;
        event.summaryCells[30][0].value = totalAgrupamientoITLAG24.hermosilloPresPor;
        event.summaryCells[33][0].value = totalAgrupamientoITLAG24.hermosilloPresAcPor;
        event.summaryCells[35][0].value = totalAgrupamientoITLAG24.hermosilloIngrAntPor;
        event.summaryCells[38][0].value = totalAgrupamientoITLAG24.mexicaliPresPor;
        event.summaryCells[41][0].value = totalAgrupamientoITLAG24.mexicaliPresAcPor;
        event.summaryCells[43][0].value = totalAgrupamientoITLAG24.mexicaliIngrAntPor;
        event.summaryCells[46][0].value = totalAgrupamientoITLAG24.orizabaPresPor;
        event.summaryCells[49][0].value = totalAgrupamientoITLAG24.orizabaPresAcPor;
        event.summaryCells[51][0].value = totalAgrupamientoITLAG24.orizabaIngrAntPor;
      }
      if(event.data.key == '09 SEP'){
        agrupamientoITLS24.cuatitlanIngr = event.summaryCells[4][0].value;
        agrupamientoITLS24.cuatitlanPres = event.summaryCells[5][0].value;
        agrupamientoITLS24.cuatitlanIngrAc = event.summaryCells[7][0].value;
        agrupamientoITLS24.cuatitlanPresAc = event.summaryCells[8][0].value;
        agrupamientoITLS24.cuatitlanIngrAnt = event.summaryCells[10][0].value;
        agrupamientoITLS24.tultitlanIngr = event.summaryCells[12][0].value;
        agrupamientoITLS24.tultitlanPres = event.summaryCells[13][0].value;
        agrupamientoITLS24.tultitlanIngrAc = event.summaryCells[15][0].value;
        agrupamientoITLS24.tultitlanPresAc = event.summaryCells[16][0].value;
        agrupamientoITLS24.tultitlanIngrAnt = event.summaryCells[18][0].value;
        agrupamientoITLS24.guadalajaraIngr = event.summaryCells[20][0].value;
        agrupamientoITLS24.guadalajaraPres = event.summaryCells[21][0].value;
        agrupamientoITLS24.guadalajaraIngrAc = event.summaryCells[23][0].value;
        agrupamientoITLS24.guadalajaraPresAc = event.summaryCells[24][0].value;
        agrupamientoITLS24.guadalajaraIngrAnt = event.summaryCells[26][0].value;
        agrupamientoITLS24.hermosilloIngr = event.summaryCells[28][0].value;
        agrupamientoITLS24.hermosilloPres = event.summaryCells[29][0].value;
        agrupamientoITLS24.hermosilloIngrAc = event.summaryCells[31][0].value;
        agrupamientoITLS24.hermosilloPresAc = event.summaryCells[32][0].value;
        agrupamientoITLS24.hermosilloIngrAnt = event.summaryCells[34][0].value;
        agrupamientoITLS24.mexicaliIngr = event.summaryCells[36][0].value;
        agrupamientoITLS24.mexicaliPres = event.summaryCells[37][0].value;
        agrupamientoITLS24.mexicaliIngrAc = event.summaryCells[39][0].value;
        agrupamientoITLS24.mexicaliPresAc = event.summaryCells[40][0].value;
        agrupamientoITLS24.mexicaliIngrAnt = event.summaryCells[42][0].value;
        agrupamientoITLS24.orizabaIngr = event.summaryCells[44][0].value;
        agrupamientoITLS24.orizabaPres = event.summaryCells[45][0].value;
        agrupamientoITLS24.orizabaIngrAc = event.summaryCells[47][0].value;
        agrupamientoITLS24.orizabaPresAc = event.summaryCells[48][0].value;
        agrupamientoITLS24.orizabaIngrAnt = event.summaryCells[50][0].value;

        totalAgrupamientoITLS24.cuatitlanPresPor = agrupamientoITLS24.cuatitlanIngr / agrupamientoITLS24.cuatitlanPres;
        totalAgrupamientoITLS24.cuatitlanPresAcPor = agrupamientoITLS24.cuatitlanIngrAc / agrupamientoITLS24.cuatitlanPresAc;
        totalAgrupamientoITLS24.cuatitlanIngrAntPor = agrupamientoITLS24.cuatitlanIngr / agrupamientoITLS24.cuatitlanIngrAnt;
        totalAgrupamientoITLS24.tultitlanPresPor = agrupamientoITLS24.tultitlanIngr / agrupamientoITLS24.tultitlanPres;
        totalAgrupamientoITLS24.tultitlanPresAcPor = agrupamientoITLS24.tultitlanIngrAc / agrupamientoITLS24.tultitlanPresAc;
        totalAgrupamientoITLS24.tultitlanIngrAntPor = agrupamientoITLS24.tultitlanIngr / agrupamientoITLS24.tultitlanIngrAnt;
        totalAgrupamientoITLS24.guadalajaraPresPor = agrupamientoITLS24.guadalajaraIngr / agrupamientoITLS24.guadalajaraPres;
        totalAgrupamientoITLS24.guadalajaraPresAcPor = agrupamientoITLS24.guadalajaraIngrAc / agrupamientoITLS24.guadalajaraPresAc;
        totalAgrupamientoITLS24.guadalajaraIngrAntPor = agrupamientoITLS24.guadalajaraIngr / agrupamientoITLS24.guadalajaraIngrAnt;
        totalAgrupamientoITLS24.hermosilloPresPor = agrupamientoITLS24.hermosilloIngr / agrupamientoITLS24.hermosilloPres;
        totalAgrupamientoITLS24.hermosilloPresAcPor = agrupamientoITLS24.hermosilloIngrAc / agrupamientoITLS24.hermosilloPresAc;
        totalAgrupamientoITLS24.hermosilloIngrAntPor = agrupamientoITLS24.hermosilloIngr / agrupamientoITLS24.hermosilloIngrAnt;
        totalAgrupamientoITLS24.mexicaliPresPor = agrupamientoITLS24.mexicaliIngr / agrupamientoITLS24.mexicaliPres;
        totalAgrupamientoITLS24.mexicaliPresAcPor = agrupamientoITLS24.mexicaliIngrAc / agrupamientoITLS24.mexicaliPresAc;
        totalAgrupamientoITLS24.mexicaliIngrAntPor = agrupamientoITLS24.mexicaliIngr / agrupamientoITLS24.mexicaliIngrAnt;
        totalAgrupamientoITLS24.orizabaPresPor = agrupamientoITLS24.orizabaIngr / agrupamientoITLS24.orizabaPres;
        totalAgrupamientoITLS24.orizabaPresAcPor = agrupamientoITLS24.orizabaIngrAc / agrupamientoITLS24.orizabaPresAc;
        totalAgrupamientoITLS24.orizabaIngrAntPor = agrupamientoITLS24.orizabaIngr / agrupamientoITLS24.orizabaIngrAnt;
      
        event.summaryCells[6][0].value = totalAgrupamientoITLS24.cuatitlanPresPor;
        event.summaryCells[9][0].value = totalAgrupamientoITLS24.cuatitlanPresAcPor;
        event.summaryCells[11][0].value = totalAgrupamientoITLS24.cuatitlanIngrAntPor;
        event.summaryCells[14][0].value = totalAgrupamientoITLS24.tultitlanPresPor;
        event.summaryCells[17][0].value = totalAgrupamientoITLS24.tultitlanPresAcPor;
        event.summaryCells[19][0].value = totalAgrupamientoITLS24.tultitlanIngrAntPor;
        event.summaryCells[22][0].value = totalAgrupamientoITLS24.guadalajaraPresPor;
        event.summaryCells[25][0].value = totalAgrupamientoITLS24.guadalajaraPresAcPor;
        event.summaryCells[27][0].value = totalAgrupamientoITLS24.guadalajaraIngrAntPor;
        event.summaryCells[30][0].value = totalAgrupamientoITLS24.hermosilloPresPor;
        event.summaryCells[33][0].value = totalAgrupamientoITLS24.hermosilloPresAcPor;
        event.summaryCells[35][0].value = totalAgrupamientoITLS24.hermosilloIngrAntPor;
        event.summaryCells[38][0].value = totalAgrupamientoITLS24.mexicaliPresPor;
        event.summaryCells[41][0].value = totalAgrupamientoITLS24.mexicaliPresAcPor;
        event.summaryCells[43][0].value = totalAgrupamientoITLS24.mexicaliIngrAntPor;
        event.summaryCells[46][0].value = totalAgrupamientoITLS24.orizabaPresPor;
        event.summaryCells[49][0].value = totalAgrupamientoITLS24.orizabaPresAcPor;
        event.summaryCells[51][0].value = totalAgrupamientoITLS24.orizabaIngrAntPor;
      }
      if(event.data.key == '10 OCT'){
        agrupamientoITLOC24.cuatitlanIngr = event.summaryCells[4][0].value;
        agrupamientoITLOC24.cuatitlanPres = event.summaryCells[5][0].value;
        agrupamientoITLOC24.cuatitlanIngrAc = event.summaryCells[7][0].value;
        agrupamientoITLOC24.cuatitlanPresAc = event.summaryCells[8][0].value;
        agrupamientoITLOC24.cuatitlanIngrAnt = event.summaryCells[10][0].value;
        agrupamientoITLOC24.tultitlanIngr = event.summaryCells[12][0].value;
        agrupamientoITLOC24.tultitlanPres = event.summaryCells[13][0].value;
        agrupamientoITLOC24.tultitlanIngrAc = event.summaryCells[15][0].value;
        agrupamientoITLOC24.tultitlanPresAc = event.summaryCells[16][0].value;
        agrupamientoITLOC24.tultitlanIngrAnt = event.summaryCells[18][0].value;
        agrupamientoITLOC24.guadalajaraIngr = event.summaryCells[20][0].value;
        agrupamientoITLOC24.guadalajaraPres = event.summaryCells[21][0].value;
        agrupamientoITLOC24.guadalajaraIngrAc = event.summaryCells[23][0].value;
        agrupamientoITLOC24.guadalajaraPresAc = event.summaryCells[24][0].value;
        agrupamientoITLOC24.guadalajaraIngrAnt = event.summaryCells[26][0].value;
        agrupamientoITLOC24.hermosilloIngr = event.summaryCells[28][0].value;
        agrupamientoITLOC24.hermosilloPres = event.summaryCells[29][0].value;
        agrupamientoITLOC24.hermosilloIngrAc = event.summaryCells[31][0].value;
        agrupamientoITLOC24.hermosilloPresAc = event.summaryCells[32][0].value;
        agrupamientoITLOC24.hermosilloIngrAnt = event.summaryCells[34][0].value;
        agrupamientoITLOC24.mexicaliIngr = event.summaryCells[36][0].value;
        agrupamientoITLOC24.mexicaliPres = event.summaryCells[37][0].value;
        agrupamientoITLOC24.mexicaliIngrAc = event.summaryCells[39][0].value;
        agrupamientoITLOC24.mexicaliPresAc = event.summaryCells[40][0].value;
        agrupamientoITLOC24.mexicaliIngrAnt = event.summaryCells[42][0].value;
        agrupamientoITLOC24.orizabaIngr = event.summaryCells[44][0].value;
        agrupamientoITLOC24.orizabaPres = event.summaryCells[45][0].value;
        agrupamientoITLOC24.orizabaIngrAc = event.summaryCells[47][0].value;
        agrupamientoITLOC24.orizabaPresAc = event.summaryCells[48][0].value;
        agrupamientoITLOC24.orizabaIngrAnt = event.summaryCells[50][0].value;

        totalAgrupamientoITLOC24.cuatitlanPresPor = agrupamientoITLOC24.cuatitlanIngr / agrupamientoITLOC24.cuatitlanPres;
        totalAgrupamientoITLOC24.cuatitlanPresAcPor = agrupamientoITLOC24.cuatitlanIngrAc / agrupamientoITLOC24.cuatitlanPresAc;
        totalAgrupamientoITLOC24.cuatitlanIngrAntPor = agrupamientoITLOC24.cuatitlanIngr / agrupamientoITLOC24.cuatitlanIngrAnt;
        totalAgrupamientoITLOC24.tultitlanPresPor = agrupamientoITLOC24.tultitlanIngr / agrupamientoITLOC24.tultitlanPres;
        totalAgrupamientoITLOC24.tultitlanPresAcPor = agrupamientoITLOC24.tultitlanIngrAc / agrupamientoITLOC24.tultitlanPresAc;
        totalAgrupamientoITLOC24.tultitlanIngrAntPor = agrupamientoITLOC24.tultitlanIngr / agrupamientoITLOC24.tultitlanIngrAnt;
        totalAgrupamientoITLOC24.guadalajaraPresPor = agrupamientoITLOC24.guadalajaraIngr / agrupamientoITLOC24.guadalajaraPres;
        totalAgrupamientoITLOC24.guadalajaraPresAcPor = agrupamientoITLOC24.guadalajaraIngrAc / agrupamientoITLOC24.guadalajaraPresAc;
        totalAgrupamientoITLOC24.guadalajaraIngrAntPor = agrupamientoITLOC24.guadalajaraIngr / agrupamientoITLOC24.guadalajaraIngrAnt;
        totalAgrupamientoITLOC24.hermosilloPresPor = agrupamientoITLOC24.hermosilloIngr / agrupamientoITLOC24.hermosilloPres;
        totalAgrupamientoITLOC24.hermosilloPresAcPor = agrupamientoITLOC24.hermosilloIngrAc / agrupamientoITLOC24.hermosilloPresAc;
        totalAgrupamientoITLOC24.hermosilloIngrAntPor = agrupamientoITLOC24.hermosilloIngr / agrupamientoITLOC24.hermosilloIngrAnt;
        totalAgrupamientoITLOC24.mexicaliPresPor = agrupamientoITLOC24.mexicaliIngr / agrupamientoITLOC24.mexicaliPres;
        totalAgrupamientoITLOC24.mexicaliPresAcPor = agrupamientoITLOC24.mexicaliIngrAc / agrupamientoITLOC24.mexicaliPresAc;
        totalAgrupamientoITLOC24.mexicaliIngrAntPor = agrupamientoITLOC24.mexicaliIngr / agrupamientoITLOC24.mexicaliIngrAnt;
        totalAgrupamientoITLOC24.orizabaPresPor = agrupamientoITLOC24.orizabaIngr / agrupamientoITLOC24.orizabaPres;
        totalAgrupamientoITLOC24.orizabaPresAcPor = agrupamientoITLOC24.orizabaIngrAc / agrupamientoITLOC24.orizabaPresAc;
        totalAgrupamientoITLOC24.orizabaIngrAntPor = agrupamientoITLOC24.orizabaIngr / agrupamientoITLOC24.orizabaIngrAnt;
      
        event.summaryCells[6][0].value = totalAgrupamientoITLOC24.cuatitlanPresPor;
        event.summaryCells[9][0].value = totalAgrupamientoITLOC24.cuatitlanPresAcPor;
        event.summaryCells[11][0].value = totalAgrupamientoITLOC24.cuatitlanIngrAntPor;
        event.summaryCells[14][0].value = totalAgrupamientoITLOC24.tultitlanPresPor;
        event.summaryCells[17][0].value = totalAgrupamientoITLOC24.tultitlanPresAcPor;
        event.summaryCells[19][0].value = totalAgrupamientoITLOC24.tultitlanIngrAntPor;
        event.summaryCells[22][0].value = totalAgrupamientoITLOC24.guadalajaraPresPor;
        event.summaryCells[25][0].value = totalAgrupamientoITLOC24.guadalajaraPresAcPor;
        event.summaryCells[27][0].value = totalAgrupamientoITLOC24.guadalajaraIngrAntPor;
        event.summaryCells[30][0].value = totalAgrupamientoITLOC24.hermosilloPresPor;
        event.summaryCells[33][0].value = totalAgrupamientoITLOC24.hermosilloPresAcPor;
        event.summaryCells[35][0].value = totalAgrupamientoITLOC24.hermosilloIngrAntPor;
        event.summaryCells[38][0].value = totalAgrupamientoITLOC24.mexicaliPresPor;
        event.summaryCells[41][0].value = totalAgrupamientoITLOC24.mexicaliPresAcPor;
        event.summaryCells[43][0].value = totalAgrupamientoITLOC24.mexicaliIngrAntPor;
        event.summaryCells[46][0].value = totalAgrupamientoITLOC24.orizabaPresPor;
        event.summaryCells[49][0].value = totalAgrupamientoITLOC24.orizabaPresAcPor;
        event.summaryCells[51][0].value = totalAgrupamientoITLOC24.orizabaIngrAntPor;
      }
      if(event.data.key == '11 NOV'){
        agrupamientoITLNV24.cuatitlanIngr = event.summaryCells[4][0].value;
        agrupamientoITLNV24.cuatitlanPres = event.summaryCells[5][0].value;
        agrupamientoITLNV24.cuatitlanIngrAc = event.summaryCells[7][0].value;
        agrupamientoITLNV24.cuatitlanPresAc = event.summaryCells[8][0].value;
        agrupamientoITLNV24.cuatitlanIngrAnt = event.summaryCells[10][0].value;
        agrupamientoITLNV24.tultitlanIngr = event.summaryCells[12][0].value;
        agrupamientoITLNV24.tultitlanPres = event.summaryCells[13][0].value;
        agrupamientoITLNV24.tultitlanIngrAc = event.summaryCells[15][0].value;
        agrupamientoITLNV24.tultitlanPresAc = event.summaryCells[16][0].value;
        agrupamientoITLNV24.tultitlanIngrAnt = event.summaryCells[18][0].value;
        agrupamientoITLNV24.guadalajaraIngr = event.summaryCells[20][0].value;
        agrupamientoITLNV24.guadalajaraPres = event.summaryCells[21][0].value;
        agrupamientoITLNV24.guadalajaraIngrAc = event.summaryCells[23][0].value;
        agrupamientoITLNV24.guadalajaraPresAc = event.summaryCells[24][0].value;
        agrupamientoITLNV24.guadalajaraIngrAnt = event.summaryCells[26][0].value;
        agrupamientoITLNV24.hermosilloIngr = event.summaryCells[28][0].value;
        agrupamientoITLNV24.hermosilloPres = event.summaryCells[29][0].value;
        agrupamientoITLNV24.hermosilloIngrAc = event.summaryCells[31][0].value;
        agrupamientoITLNV24.hermosilloPresAc = event.summaryCells[32][0].value;
        agrupamientoITLNV24.hermosilloIngrAnt = event.summaryCells[34][0].value;
        agrupamientoITLNV24.mexicaliIngr = event.summaryCells[36][0].value;
        agrupamientoITLNV24.mexicaliPres = event.summaryCells[37][0].value;
        agrupamientoITLNV24.mexicaliIngrAc = event.summaryCells[39][0].value;
        agrupamientoITLNV24.mexicaliPresAc = event.summaryCells[40][0].value;
        agrupamientoITLNV24.mexicaliIngrAnt = event.summaryCells[42][0].value;
        agrupamientoITLNV24.orizabaIngr = event.summaryCells[44][0].value;
        agrupamientoITLNV24.orizabaPres = event.summaryCells[45][0].value;
        agrupamientoITLNV24.orizabaIngrAc = event.summaryCells[47][0].value;
        agrupamientoITLNV24.orizabaPresAc = event.summaryCells[48][0].value;
        agrupamientoITLNV24.orizabaIngrAnt = event.summaryCells[50][0].value;

        totalAgrupamientoITLNV24.cuatitlanPresPor = agrupamientoITLNV24.cuatitlanIngr / agrupamientoITLNV24.cuatitlanPres;
        totalAgrupamientoITLNV24.cuatitlanPresAcPor = agrupamientoITLNV24.cuatitlanIngrAc / agrupamientoITLNV24.cuatitlanPresAc;
        totalAgrupamientoITLNV24.cuatitlanIngrAntPor = agrupamientoITLNV24.cuatitlanIngr / agrupamientoITLNV24.cuatitlanIngrAnt;
        totalAgrupamientoITLNV24.tultitlanPresPor = agrupamientoITLNV24.tultitlanIngr / agrupamientoITLNV24.tultitlanPres;
        totalAgrupamientoITLNV24.tultitlanPresAcPor = agrupamientoITLNV24.tultitlanIngrAc / agrupamientoITLNV24.tultitlanPresAc;
        totalAgrupamientoITLNV24.tultitlanIngrAntPor = agrupamientoITLNV24.tultitlanIngr / agrupamientoITLNV24.tultitlanIngrAnt;
        totalAgrupamientoITLNV24.guadalajaraPresPor = agrupamientoITLNV24.guadalajaraIngr / agrupamientoITLNV24.guadalajaraPres;
        totalAgrupamientoITLNV24.guadalajaraPresAcPor = agrupamientoITLNV24.guadalajaraIngrAc / agrupamientoITLNV24.guadalajaraPresAc;
        totalAgrupamientoITLNV24.guadalajaraIngrAntPor = agrupamientoITLNV24.guadalajaraIngr / agrupamientoITLNV24.guadalajaraIngrAnt;
        totalAgrupamientoITLNV24.hermosilloPresPor = agrupamientoITLNV24.hermosilloIngr / agrupamientoITLNV24.hermosilloPres;
        totalAgrupamientoITLNV24.hermosilloPresAcPor = agrupamientoITLNV24.hermosilloIngrAc / agrupamientoITLNV24.hermosilloPresAc;
        totalAgrupamientoITLNV24.hermosilloIngrAntPor = agrupamientoITLNV24.hermosilloIngr / agrupamientoITLNV24.hermosilloIngrAnt;
        totalAgrupamientoITLNV24.mexicaliPresPor = agrupamientoITLNV24.mexicaliIngr / agrupamientoITLNV24.mexicaliPres;
        totalAgrupamientoITLNV24.mexicaliPresAcPor = agrupamientoITLNV24.mexicaliIngrAc / agrupamientoITLNV24.mexicaliPresAc;
        totalAgrupamientoITLNV24.mexicaliIngrAntPor = agrupamientoITLNV24.mexicaliIngr / agrupamientoITLNV24.mexicaliIngrAnt;
        totalAgrupamientoITLNV24.orizabaPresPor = agrupamientoITLNV24.orizabaIngr / agrupamientoITLNV24.orizabaPres;
        totalAgrupamientoITLNV24.orizabaPresAcPor = agrupamientoITLNV24.orizabaIngrAc / agrupamientoITLNV24.orizabaPresAc;
        totalAgrupamientoITLNV24.orizabaIngrAntPor = agrupamientoITLNV24.orizabaIngr / agrupamientoITLNV24.orizabaIngrAnt;
      
        event.summaryCells[6][0].value = totalAgrupamientoITLNV24.cuatitlanPresPor;
        event.summaryCells[9][0].value = totalAgrupamientoITLNV24.cuatitlanPresAcPor;
        event.summaryCells[11][0].value = totalAgrupamientoITLNV24.cuatitlanIngrAntPor;
        event.summaryCells[14][0].value = totalAgrupamientoITLNV24.tultitlanPresPor;
        event.summaryCells[17][0].value = totalAgrupamientoITLNV24.tultitlanPresAcPor;
        event.summaryCells[19][0].value = totalAgrupamientoITLNV24.tultitlanIngrAntPor;
        event.summaryCells[22][0].value = totalAgrupamientoITLNV24.guadalajaraPresPor;
        event.summaryCells[25][0].value = totalAgrupamientoITLNV24.guadalajaraPresAcPor;
        event.summaryCells[27][0].value = totalAgrupamientoITLNV24.guadalajaraIngrAntPor;
        event.summaryCells[30][0].value = totalAgrupamientoITLNV24.hermosilloPresPor;
        event.summaryCells[33][0].value = totalAgrupamientoITLNV24.hermosilloPresAcPor;
        event.summaryCells[35][0].value = totalAgrupamientoITLNV24.hermosilloIngrAntPor;
        event.summaryCells[38][0].value = totalAgrupamientoITLNV24.mexicaliPresPor;
        event.summaryCells[41][0].value = totalAgrupamientoITLNV24.mexicaliPresAcPor;
        event.summaryCells[43][0].value = totalAgrupamientoITLNV24.mexicaliIngrAntPor;
        event.summaryCells[46][0].value = totalAgrupamientoITLNV24.orizabaPresPor;
        event.summaryCells[49][0].value = totalAgrupamientoITLNV24.orizabaPresAcPor;
        event.summaryCells[51][0].value = totalAgrupamientoITLNV24.orizabaIngrAntPor;
      }

      if(event.data.key == '12 DIC'){
        agrupamientoITLDC24.cuatitlanIngr = event.summaryCells[4][0].value;
        agrupamientoITLDC24.cuatitlanPres = event.summaryCells[5][0].value;
        agrupamientoITLDC24.cuatitlanIngrAc = event.summaryCells[7][0].value;
        agrupamientoITLDC24.cuatitlanPresAc = event.summaryCells[8][0].value;
        agrupamientoITLDC24.cuatitlanIngrAnt = event.summaryCells[10][0].value;
        agrupamientoITLDC24.tultitlanIngr = event.summaryCells[12][0].value;
        agrupamientoITLDC24.tultitlanPres = event.summaryCells[13][0].value;
        agrupamientoITLDC24.tultitlanIngrAc = event.summaryCells[15][0].value;
        agrupamientoITLDC24.tultitlanPresAc = event.summaryCells[16][0].value;
        agrupamientoITLDC24.tultitlanIngrAnt = event.summaryCells[18][0].value;
        agrupamientoITLDC24.guadalajaraIngr = event.summaryCells[20][0].value;
        agrupamientoITLDC24.guadalajaraPres = event.summaryCells[21][0].value;
        agrupamientoITLDC24.guadalajaraIngrAc = event.summaryCells[23][0].value;
        agrupamientoITLDC24.guadalajaraPresAc = event.summaryCells[24][0].value;
        agrupamientoITLDC24.guadalajaraIngrAnt = event.summaryCells[26][0].value;
        agrupamientoITLDC24.hermosilloIngr = event.summaryCells[28][0].value;
        agrupamientoITLDC24.hermosilloPres = event.summaryCells[29][0].value;
        agrupamientoITLDC24.hermosilloIngrAc = event.summaryCells[31][0].value;
        agrupamientoITLDC24.hermosilloPresAc = event.summaryCells[32][0].value;
        agrupamientoITLDC24.hermosilloIngrAnt = event.summaryCells[34][0].value;
        agrupamientoITLDC24.mexicaliIngr = event.summaryCells[36][0].value;
        agrupamientoITLDC24.mexicaliPres = event.summaryCells[37][0].value;
        agrupamientoITLDC24.mexicaliIngrAc = event.summaryCells[39][0].value;
        agrupamientoITLDC24.mexicaliPresAc = event.summaryCells[40][0].value;
        agrupamientoITLDC24.mexicaliIngrAnt = event.summaryCells[42][0].value;
        agrupamientoITLDC24.orizabaIngr = event.summaryCells[44][0].value;
        agrupamientoITLDC24.orizabaPres = event.summaryCells[45][0].value;
        agrupamientoITLDC24.orizabaIngrAc = event.summaryCells[47][0].value;
        agrupamientoITLDC24.orizabaPresAc = event.summaryCells[48][0].value;
        agrupamientoITLDC24.orizabaIngrAnt = event.summaryCells[50][0].value;

        totalAgrupamientoITLDC24.cuatitlanPresPor = agrupamientoITLDC24.cuatitlanIngr / agrupamientoITLDC24.cuatitlanPres;
        totalAgrupamientoITLDC24.cuatitlanPresAcPor = agrupamientoITLDC24.cuatitlanIngrAc / agrupamientoITLDC24.cuatitlanPresAc;
        totalAgrupamientoITLDC24.cuatitlanIngrAntPor = agrupamientoITLDC24.cuatitlanIngr / agrupamientoITLDC24.cuatitlanIngrAnt;
        totalAgrupamientoITLDC24.tultitlanPresPor = agrupamientoITLDC24.tultitlanIngr / agrupamientoITLDC24.tultitlanPres;
        totalAgrupamientoITLDC24.tultitlanPresAcPor = agrupamientoITLDC24.tultitlanIngrAc / agrupamientoITLDC24.tultitlanPresAc;
        totalAgrupamientoITLDC24.tultitlanIngrAntPor = agrupamientoITLDC24.tultitlanIngr / agrupamientoITLDC24.tultitlanIngrAnt;
        totalAgrupamientoITLDC24.guadalajaraPresPor = agrupamientoITLDC24.guadalajaraIngr / agrupamientoITLDC24.guadalajaraPres;
        totalAgrupamientoITLDC24.guadalajaraPresAcPor = agrupamientoITLDC24.guadalajaraIngrAc / agrupamientoITLDC24.guadalajaraPresAc;
        totalAgrupamientoITLDC24.guadalajaraIngrAntPor = agrupamientoITLDC24.guadalajaraIngr / agrupamientoITLDC24.guadalajaraIngrAnt;
        totalAgrupamientoITLDC24.hermosilloPresPor = agrupamientoITLDC24.hermosilloIngr / agrupamientoITLDC24.hermosilloPres;
        totalAgrupamientoITLDC24.hermosilloPresAcPor = agrupamientoITLDC24.hermosilloIngrAc / agrupamientoITLDC24.hermosilloPresAc;
        totalAgrupamientoITLDC24.hermosilloIngrAntPor = agrupamientoITLDC24.hermosilloIngr / agrupamientoITLDC24.hermosilloIngrAnt;
        totalAgrupamientoITLDC24.mexicaliPresPor = agrupamientoITLDC24.mexicaliIngr / agrupamientoITLDC24.mexicaliPres;
        totalAgrupamientoITLDC24.mexicaliPresAcPor = agrupamientoITLDC24.mexicaliIngrAc / agrupamientoITLDC24.mexicaliPresAc;
        totalAgrupamientoITLDC24.mexicaliIngrAntPor = agrupamientoITLDC24.mexicaliIngr / agrupamientoITLDC24.mexicaliIngrAnt;
        totalAgrupamientoITLDC24.orizabaPresPor = agrupamientoITLDC24.orizabaIngr / agrupamientoITLDC24.orizabaPres;
        totalAgrupamientoITLDC24.orizabaPresAcPor = agrupamientoITLDC24.orizabaIngrAc / agrupamientoITLDC24.orizabaPresAc;
        totalAgrupamientoITLDC24.orizabaIngrAntPor = agrupamientoITLDC24.orizabaIngr / agrupamientoITLDC24.orizabaIngrAnt;
      
        event.summaryCells[6][0].value = totalAgrupamientoITLDC24.cuatitlanPresPor;
        event.summaryCells[9][0].value = totalAgrupamientoITLDC24.cuatitlanPresAcPor;
        event.summaryCells[11][0].value = totalAgrupamientoITLDC24.cuatitlanIngrAntPor;
        event.summaryCells[14][0].value = totalAgrupamientoITLDC24.tultitlanPresPor;
        event.summaryCells[17][0].value = totalAgrupamientoITLDC24.tultitlanPresAcPor;
        event.summaryCells[19][0].value = totalAgrupamientoITLDC24.tultitlanIngrAntPor;
        event.summaryCells[22][0].value = totalAgrupamientoITLDC24.guadalajaraPresPor;
        event.summaryCells[25][0].value = totalAgrupamientoITLDC24.guadalajaraPresAcPor;
        event.summaryCells[27][0].value = totalAgrupamientoITLDC24.guadalajaraIngrAntPor;
        event.summaryCells[30][0].value = totalAgrupamientoITLDC24.hermosilloPresPor;
        event.summaryCells[33][0].value = totalAgrupamientoITLDC24.hermosilloPresAcPor;
        event.summaryCells[35][0].value = totalAgrupamientoITLDC24.hermosilloIngrAntPor;
        event.summaryCells[38][0].value = totalAgrupamientoITLDC24.mexicaliPresPor;
        event.summaryCells[41][0].value = totalAgrupamientoITLDC24.mexicaliPresAcPor;
        event.summaryCells[43][0].value = totalAgrupamientoITLDC24.mexicaliIngrAntPor;
        event.summaryCells[46][0].value = totalAgrupamientoITLDC24.orizabaPresPor;
        event.summaryCells[49][0].value = totalAgrupamientoITLDC24.orizabaPresAcPor;
        event.summaryCells[51][0].value = totalAgrupamientoITLDC24.orizabaIngrAntPor;
      }
      
    }
  }

  onCellPreparedITL2024(e){
    if (e.rowType == 'group'){

      e.cellElement.style.fontSize = '12px';
      e.cellElement.style.background = "#DCDCDC";
    }

    if (e.rowType == 'totalFooter') {
    
      e.totalItem.cells.forEach((c: any) => {

        if (c.cellElement) {
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "16px";
          c.cellElement.style.background = "#ff9460";
          c.cellElement.style.color = "black"; 
      }   

      totalOperacionITL24.cuatitlanIngr = c.totalItem.summaryCells[4][0].value;
      totalOperacionITL24.cuatitlanPres = c.totalItem.summaryCells[5][0].value;
      totalOperacionITL24.cuatitlanIngrAc = c.totalItem.summaryCells[7][0].value;
      totalOperacionITL24.cuatitlanPresAc = c.totalItem.summaryCells[8][0].value;
      totalOperacionITL24.cuatitlanIngrAnt = c.totalItem.summaryCells[10][0].value;
      totalOperacionITL24.tultitlanIngr = c.totalItem.summaryCells[12][0].value;
      totalOperacionITL24.tultitlanPres = c.totalItem.summaryCells[13][0].value;
      totalOperacionITL24.tultitlanIngrAc = c.totalItem.summaryCells[15][0].value;
      totalOperacionITL24.tultitlanPresAc = c.totalItem.summaryCells[16][0].value;
      totalOperacionITL24.tultitlanIngrAnt = c.totalItem.summaryCells[18][0].value;
      totalOperacionITL24.guadalajaraIngr = c.totalItem.summaryCells[20][0].value;
      totalOperacionITL24.guadalajaraPres = c.totalItem.summaryCells[21][0].value;
      totalOperacionITL24.guadalajaraIngrAc = c.totalItem.summaryCells[23][0].value;
      totalOperacionITL24.guadalajaraPresAc = c.totalItem.summaryCells[24][0].value;
      totalOperacionITL24.guadalajaraIngrAnt = c.totalItem.summaryCells[26][0].value;
      totalOperacionITL24.hermosilloIngr = c.totalItem.summaryCells[28][0].value;
      totalOperacionITL24.hermosilloPres = c.totalItem.summaryCells[29][0].value;
      totalOperacionITL24.hermosilloIngrAc = c.totalItem.summaryCells[31][0].value;
      totalOperacionITL24.hermosilloPresAc = c.totalItem.summaryCells[32][0].value;
      totalOperacionITL24.hermosilloIngrAnt = c.totalItem.summaryCells[34][0].value;
      totalOperacionITL24.mexicaliIngr = c.totalItem.summaryCells[36][0].value;
      totalOperacionITL24.mexicaliPres = c.totalItem.summaryCells[37][0].value;
      totalOperacionITL24.mexicaliIngrAc = c.totalItem.summaryCells[39][0].value;
      totalOperacionITL24.mexicaliPresAc = c.totalItem.summaryCells[40][0].value;
      totalOperacionITL24.mexicaliIngrAnt = c.totalItem.summaryCells[42][0].value;
      totalOperacionITL24.orizabaIngr = c.totalItem.summaryCells[44][0].value;
      totalOperacionITL24.orizabaPres = c.totalItem.summaryCells[45][0].value;
      totalOperacionITL24.orizabaIngrAc = c.totalItem.summaryCells[47][0].value;
      totalOperacionITL24.orizabaPresAc = c.totalItem.summaryCells[48][0].value;
      totalOperacionITL24.orizabaIngrAnt = c.totalItem.summaryCells[50][0].value;
      
      totalOperacionITL24.cuatitlanIngr === 0 ? c.totalItem.summaryCells[6][0].value = 0 : c.totalItem.summaryCells[6][0].value = totalOperacionITL24.cuatitlanIngr / totalOperacionITL24.cuatitlanPres;
      totalOperacionITL24.cuatitlanIngrAc == 0 ? c.totalItem.summaryCells[9][0].value = 0 : c.totalItem.summaryCells[9][0].value =   totalOperacionITL24.cuatitlanIngrAc / totalOperacionITL24.cuatitlanPresAc;
      totalOperacionITL24.cuatitlanIngr == 0 ? c.totalItem.summaryCells[11][0].value = 0 : c.totalItem.summaryCells[11][0].value =   totalOperacionITL24.cuatitlanIngr / totalOperacionITL24.cuatitlanIngrAnt;
      totalOperacionITL24.tultitlanIngr == 0 ? c.totalItem.summaryCells[14][0].value = 0 : c.totalItem.summaryCells[14][0].value =   totalOperacionITL24.tultitlanIngr / totalOperacionITL24.tultitlanPres;
      totalOperacionITL24.tultitlanIngrAc == 0 ? c.totalItem.summaryCells[17][0].value = 0 : c.totalItem.summaryCells[17][0].value =   totalOperacionITL24.tultitlanIngrAc / totalOperacionITL24.tultitlanPresAc;
      totalOperacionITL24.tultitlanIngr == 0 ? c.totalItem.summaryCells[19][0].value = 0 : c.totalItem.summaryCells[19][0].value =   totalOperacionITL24.tultitlanIngr / totalOperacionITL24.tultitlanIngrAnt;
      totalOperacionITL24.guadalajaraIngr == 0 ? c.totalItem.summaryCells[22][0].value = 0 : c.totalItem.summaryCells[22][0].value =   totalOperacionITL24.guadalajaraIngr / totalOperacionITL24.guadalajaraPres;
      totalOperacionITL24.guadalajaraIngrAc == 0 ? c.totalItem.summaryCells[25][0].value = 0 : c.totalItem.summaryCells[25][0].value =   totalOperacionITL24.guadalajaraIngrAc / totalOperacionITL24.guadalajaraPresAc;
      totalOperacionITL24.guadalajaraIngr == 0 ? c.totalItem.summaryCells[27][0].value = 0 : c.totalItem.summaryCells[27][0].value =   totalOperacionITL24.guadalajaraIngr / totalOperacionITL24.guadalajaraIngrAnt;
      totalOperacionITL24.hermosilloIngr == 0 ? c.totalItem.summaryCells[30][0].value = 0 : c.totalItem.summaryCells[30][0].value =   totalOperacionITL24.hermosilloIngr / totalOperacionITL24.hermosilloPres;
      totalOperacionITL24.hermosilloIngrAc == 0 ? c.totalItem.summaryCells[33][0].value = 0 : c.totalItem.summaryCells[33][0].value =   totalOperacionITL24.hermosilloIngrAc / totalOperacionITL24.hermosilloPresAc;
      totalOperacionITL24.hermosilloIngr == 0 ? c.totalItem.summaryCells[35][0].value = 0 : c.totalItem.summaryCells[35][0].value =   totalOperacionITL24.hermosilloIngr / totalOperacionITL24.hermosilloIngrAnt;
      totalOperacionITL24.mexicaliIngr == 0 ? c.totalItem.summaryCells[38][0].value = 0 : c.totalItem.summaryCells[38][0].value =   totalOperacionITL24.mexicaliIngr / totalOperacionITL24.mexicaliPres;
      totalOperacionITL24.mexicaliIngrAc == 0 ? c.totalItem.summaryCells[41][0].value = 0 : c.totalItem.summaryCells[41][0].value =   totalOperacionITL24.mexicaliIngrAc / totalOperacionITL24.mexicaliPresAc;
      totalOperacionITL24.mexicaliIngr == 0 ? c.totalItem.summaryCells[43][0].value = 0 : c.totalItem.summaryCells[43][0].value =   totalOperacionITL24.mexicaliIngr / totalOperacionITL24.mexicaliIngrAnt;
      totalOperacionITL24.orizabaIngr == 0 ? c.totalItem.summaryCells[46][0].value = 0 : c.totalItem.summaryCells[46][0].value =   totalOperacionITL24.orizabaIngr / totalOperacionITL24.orizabaPres;
      totalOperacionITL24.orizabaIngrAc == 0 ? c.totalItem.summaryCells[49][0].value = 0 : c.totalItem.summaryCells[49][0].value =   totalOperacionITL24.orizabaIngrAc / totalOperacionITL24.orizabaPresAc;
      totalOperacionITL24.orizabaIngr == 0 ? c.totalItem.summaryCells[51][0].value = 0 : c.totalItem.summaryCells[51][0].value =   totalOperacionITL24.orizabaIngr / totalOperacionITL24.orizabaIngrAnt;
        

      totalIngresosTL24.cuatitlanPresPor = c.totalItem.summaryCells[6][0].value;
      totalIngresosTL24.cuatitlanPresAcPor = c.totalItem.summaryCells[9][0].value;
      totalIngresosTL24.cuatitlanIngrAntPor = c.totalItem.summaryCells[11][0].value;
      totalIngresosTL24.tultitlanPresPor = c.totalItem.summaryCells[14][0].value;
      totalIngresosTL24.tultitlanPresAcPor = c.totalItem.summaryCells[17][0].value;
      totalIngresosTL24.tultitlanIngrAntPor = c.totalItem.summaryCells[19][0].value;
      totalIngresosTL24.guadalajaraPresPor = c.totalItem.summaryCells[22][0].value;
      totalIngresosTL24.guadalajaraPresAcPor = c.totalItem.summaryCells[25][0].value;
      totalIngresosTL24.guadalajaraIngrAntPor = c.totalItem.summaryCells[27][0].value;
      totalIngresosTL24.hermosilloPresPor = c.totalItem.summaryCells[30][0].value;
      totalIngresosTL24.hermosilloPresAcPor = c.totalItem.summaryCells[33][0].value;
      totalIngresosTL24.hermosilloIngrAntPor = c.totalItem.summaryCells[35][0].value;
      totalIngresosTL24.mexicaliPresPor = c.totalItem.summaryCells[38][0].value;
      totalIngresosTL24.mexicaliPresAcPor = c.totalItem.summaryCells[41][0].value;
      totalIngresosTL24.mexicaliIngrAntPor = c.totalItem.summaryCells[43][0].value;
      totalIngresosTL24.orizabaPresPor = c.totalItem.summaryCells[46][0].value;
      totalIngresosTL24.orizabaPresAcPor = c.totalItem.summaryCells[49][0].value;
      totalIngresosTL24.orizabaIngrAntPor = c.totalItem.summaryCells[51][0].value;
      })
    }
  }

  onRowPreparedI2024(event){

    if (event.rowType == 'group'){
      if (event.data.key == '01 ENE') {

        if(event.summaryCells[4].length !== 0){
        agrupamientoIE24.cuautitlan = event.summaryCells[4][0].value;
        }
        if(event.summaryCells[5].length !== 0){
          agrupamientoIE24.tultitlan = event.summaryCells[5][0].value;
        }
        if(event.summaryCells[6].length !== 0){
          agrupamientoIE24.guadalajara = event.summaryCells[6][0].value;
        }
        if(event.summaryCells[7].length !== 0){
          agrupamientoIE24.hermosillo = event.summaryCells[7][0].value;
        }
        if(event.summaryCells[8].length !== 0){
          agrupamientoIE24.mexicali = event.summaryCells[8][0].value;
        }
        if(event.summaryCells[9].length !== 0){
          agrupamientoIE24.orizaba = event.summaryCells[9][0].value;
        }
        // if(event.summaryCells[10].length !== 0){
        //   agrupamientoIE24.ramosArispe = event.summaryCells[10][0].value;
        // }
        if(event.summaryCells[10].length !== 0){
          agrupamientoIE24.total = event.summaryCells[10][0].value;
        }
      }
      if (event.data.key == '02 FEB'){
        agrupamientoIF24.cuautitlan = event.summaryCells[4][0]?.value;
        agrupamientoIF24.tultitlan = event.summaryCells[5][0]?.value;
        agrupamientoIF24.guadalajara = event.summaryCells[6][0]?.value;
        agrupamientoIF24.hermosillo = event.summaryCells[7][0]?.value;
        agrupamientoIF24.mexicali = event.summaryCells[8][0]?.value;
        agrupamientoIF24.orizaba = event.summaryCells[9][0]?.value;
        // agrupamientoIF24.ramosArispe = event.summaryCells[10][0]?.value;
        agrupamientoIF24.total = event.summaryCells[10][0]?.value;
      }
      if (event.data.key == '03 MAR'){
        agrupamientoIM24.cuautitlan = event.summaryCells[4][0]?.value;
        agrupamientoIM24.tultitlan = event.summaryCells[5][0]?.value;
        agrupamientoIM24.guadalajara = event.summaryCells[6][0]?.value;
        agrupamientoIM24.hermosillo = event.summaryCells[7][0]?.value;
        agrupamientoIM24.mexicali = event.summaryCells[8][0]?.value;
        agrupamientoIM24.orizaba = event.summaryCells[9][0]?.value;
        // agrupamientoIM24.ramosArispe = event.summaryCells[10][0]?.value;
        agrupamientoIM24.total = event.summaryCells[10][0]?.value;
      }
      if (event.data.key == '04 ABR'){
        agrupamientoIA24.cuautitlan = event.summaryCells[4][0]?.value;
        agrupamientoIA24.tultitlan = event.summaryCells[5][0]?.value;
        agrupamientoIA24.guadalajara = event.summaryCells[6][0]?.value;
        agrupamientoIA24.hermosillo = event.summaryCells[7][0]?.value;
        agrupamientoIA24.mexicali = event.summaryCells[8][0]?.value;
        agrupamientoIA24.orizaba = event.summaryCells[9][0]?.value;
        // agrupamientoIA24.ramosArispe = event.summaryCells[10][0]?.value;
        agrupamientoIA24.total = event.summaryCells[10][0]?.value;
      }
      if (event.data.key == '05 MAY'){
        agrupamientoIMY24.cuautitlan = event.summaryCells[4][0]?.value;
        agrupamientoIMY24.tultitlan = event.summaryCells[5][0]?.value;
        agrupamientoIMY24.guadalajara = event.summaryCells[6][0]?.value;
        agrupamientoIMY24.hermosillo = event.summaryCells[7][0]?.value;
        agrupamientoIMY24.mexicali = event.summaryCells[8][0]?.value;
        agrupamientoIMY24.orizaba = event.summaryCells[9][0]?.value;
        // agrupamientoIMY24.ramosArispe = event.summaryCells[10][0]?.value;
        agrupamientoIMY24.total = event.summaryCells[10][0]?.value;
      }
      if (event.data.key == '06 JUN'){
        agrupamientoIJN24.cuautitlan = event.summaryCells[4][0]?.value;
        agrupamientoIJN24.tultitlan = event.summaryCells[5][0]?.value;
        agrupamientoIJN24.guadalajara = event.summaryCells[6][0]?.value;
        agrupamientoIJN24.hermosillo = event.summaryCells[7][0]?.value;
        agrupamientoIJN24.mexicali = event.summaryCells[8][0]?.value;
        agrupamientoIJN24.orizaba = event.summaryCells[9][0]?.value;
        // agrupamientoIJN24.ramosArispe = event.summaryCells[10][0]?.value;
        agrupamientoIJN24.total = event.summaryCells[10][0]?.value;
      }
      if (event.data.key == '07 JUL'){
        agrupamientoIJL24.cuautitlan = event.summaryCells[4][0]?.value;
        agrupamientoIJL24.tultitlan = event.summaryCells[5][0]?.value;
        agrupamientoIJL24.guadalajara = event.summaryCells[6][0]?.value;
        agrupamientoIJL24.hermosillo = event.summaryCells[7][0]?.value;
        agrupamientoIJL24.mexicali = event.summaryCells[8][0]?.value;
        agrupamientoIJL24.orizaba = event.summaryCells[9][0]?.value;
        // agrupamientoIJL24.ramosArispe = event.summaryCells[10][0]?.value;
        agrupamientoIJL24.total = event.summaryCells[10][0]?.value;
      }
      if (event.data.key == '08 AGO'){
        agrupamientoIAG24.cuautitlan = event.summaryCells[4][0]?.value;
        agrupamientoIAG24.tultitlan = event.summaryCells[5][0]?.value;
        agrupamientoIAG24.guadalajara = event.summaryCells[6][0]?.value;
        agrupamientoIAG24.hermosillo = event.summaryCells[7][0]?.value;
        agrupamientoIAG24.mexicali = event.summaryCells[8][0]?.value;
        agrupamientoIAG24.orizaba = event.summaryCells[9][0]?.value;
        // agrupamientoIAG24.ramosArispe = event.summaryCells[10][0]?.value;
        agrupamientoIAG24.total = event.summaryCells[10][0]?.value;
      }
      if (event.data.key == '09 SEP'){
        agrupamientoIS24.cuautitlan = event.summaryCells[4][0].value;
        agrupamientoIS24.tultitlan = event.summaryCells[5][0].value;
        agrupamientoIS24.guadalajara = event.summaryCells[6][0].value;
        agrupamientoIS24.hermosillo = event.summaryCells[7][0].value;
        agrupamientoIS24.mexicali = event.summaryCells[8][0].value;
        agrupamientoIS24.orizaba = event.summaryCells[9][0].value;
        // agrupamientoIS24.ramosArispe = event.summaryCells[10][0].value;
        agrupamientoIS24.total = event.summaryCells[10][0].value;
      }
      if (event.data.key == '10 OCT'){
        agrupamientoIOC24.cuautitlan = event.summaryCells[4][0].value;
        agrupamientoIOC24.tultitlan = event.summaryCells[5][0].value;
        agrupamientoIOC24.guadalajara = event.summaryCells[6][0].value;
        agrupamientoIOC24.hermosillo = event.summaryCells[7][0].value;
        agrupamientoIOC24.mexicali = event.summaryCells[8][0].value;
        agrupamientoIOC24.orizaba = event.summaryCells[9][0].value;
        // agrupamientoIOC24.ramosArispe = event.summaryCells[10][0].value;
        agrupamientoIOC24.total = event.summaryCells[10][0].value;
      }
      if (event.data.key == '11 NOV'){
        agrupamientoINV24.cuautitlan = event.summaryCells[4][0].value;
        agrupamientoINV24.tultitlan = event.summaryCells[5][0].value;
        agrupamientoINV24.guadalajara = event.summaryCells[6][0].value;
        agrupamientoINV24.hermosillo = event.summaryCells[7][0].value;
        agrupamientoINV24.mexicali = event.summaryCells[8][0].value;
        agrupamientoINV24.orizaba = event.summaryCells[9][0].value;
        // agrupamientoINV24.ramosArispe = event.summaryCells[10][0].value;
        agrupamientoINV24.total = event.summaryCells[10][0].value;
      }
      if (event.data.key == '12 DIC'){
        agrupamientoIDC24.cuautitlan = event.summaryCells[4][0].value;
        agrupamientoIDC24.tultitlan = event.summaryCells[5][0].value;
        agrupamientoIDC24.guadalajara = event.summaryCells[6][0].value;
        agrupamientoIDC24.hermosillo = event.summaryCells[7][0].value;
        agrupamientoIDC24.mexicali = event.summaryCells[8][0].value;
        agrupamientoIDC24.orizaba = event.summaryCells[9][0].value;
        // agrupamientoIDC24.ramosArispe = event.summaryCells[10][0].value;
        agrupamientoIDC24.total = event.summaryCells[10][0].value;
      }
    }

    if(event.rowType == "totalFooter"){
      totalIngresos24.cuautitlan = event.summaryCells[4][0]?.value;
      totalIngresos24.tultitlan = event.summaryCells[5][0]?.value;
      totalIngresos24.guadalajara = event.summaryCells[6][0]?.value;
      totalIngresos24.hermosillo = event.summaryCells[7][0]?.value;
      totalIngresos24.mexicali = event.summaryCells[8][0]?.value;
      totalIngresos24.orizaba = event.summaryCells[9][0]?.value;
      // totalIngresos24.ramosArispe = event.summaryCells[10][0].value;
      totalIngresos24.total = event.summaryCells[10][0].value;
    }
  }
  onCellPreparedI2024(e: any) {
    if (e.rowType == 'group'){

      e.cellElement.style.fontSize = '12px';
      e.cellElement.style.background = "#DCDCDC";
    }

    if (e.rowType == 'totalFooter') {
      e.totalItem.cells.forEach((c: any) => {
        if (c.cellElement) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "16px";
            c.cellElement.style.background = "#ff9460";
            c.cellElement.style.color = "black"; 
        }   
      });
    }
  }
  customizeI2024(e) {  

    var gridCell = e.gridCell;
    if (gridCell.rowType === 'group') {
      
      e.backgroundColor = "#DCDCDC";
      e.fontWeight = "bolder"
      e.font = {bold: true}

  }

  if (gridCell.rowType === 'totalFooter') {
      
    e.backgroundColor = "#ff9460";
    e.fontWeight = "bolder"
    e.font = {bold: true}

  }
  }
//==============================KILOMETROS 2024=======================================
  onRowPreparedK2024(e){

    if (e.rowType == 'group'){
      
      if (e.data.key == '01 ENE') {

        if(e.summaryCells[4].length !== 0){
        agrupamientoKE24.cuautitlan = e.summaryCells[4][0].value;
        }
        if(e.summaryCells[5].length !== 0){
          agrupamientoKE24.tultitlan = e.summaryCells[5][0].value;
        }
        if(e.summaryCells[6].length !== 0){
          agrupamientoKE24.guadalajara = e.summaryCells[6][0].value;
        }
        if(e.summaryCells[7].length !== 0){
          agrupamientoKE24.hermosillo = e.summaryCells[7][0].value;
        }
        if(e.summaryCells[8].length !== 0){
          agrupamientoKE24.mexicali = e.summaryCells[8][0].value;
        }
        if(e.summaryCells[9].length !== 0){
          agrupamientoKE24.orizaba = e.summaryCells[9][0].value;
        }
        // if(e.summaryCells[10].length !== 0){
        //   agrupamientoKE24.ramosArispe = e.summaryCells[10][0].value;
        // }
        if(e.summaryCells[10].length !== 0){
          agrupamientoKE24.total = e.summaryCells[10][0].value;
        }

        totalAgrupamientoIKE24.cuautitlan = agrupamientoIE24.cuautitlan / agrupamientoKE24.cuautitlan;
        totalAgrupamientoIKE24.tultitlan = agrupamientoIE24.tultitlan / agrupamientoKE24.tultitlan;
        totalAgrupamientoIKE24.guadalajara = agrupamientoIE24.guadalajara / agrupamientoKE24.guadalajara;
        totalAgrupamientoIKE24.hermosillo = agrupamientoIE24.hermosillo / agrupamientoKE24.hermosillo;
        totalAgrupamientoIKE24.mexicali = agrupamientoIE24.mexicali / agrupamientoKE24.mexicali;
        totalAgrupamientoIKE24.orizaba = agrupamientoIE24.orizaba / agrupamientoKE24.orizaba;
        // totalAgrupamientoIKE24.ramosArispe = agrupamientoIE24.ramosArispe / agrupamientoKE24.ramosArispe;
        totalAgrupamientoIKE24.total = agrupamientoIE24.total / agrupamientoKE24.total
      }
      if (e.data.key == '02 FEB'){
        agrupamientoKF24.cuautitlan = e.summaryCells[4][0]?.value;
        agrupamientoKF24.tultitlan = e.summaryCells[5][0]?.value;
        agrupamientoKF24.guadalajara = e.summaryCells[6][0]?.value;
        agrupamientoKF24.hermosillo = e.summaryCells[7][0]?.value;
        agrupamientoKF24.mexicali = e.summaryCells[8][0]?.value;
        agrupamientoKF24.orizaba = e.summaryCells[9][0]?.value;
        // agrupamientoKF24.ramosArispe = e.summaryCells[10][0]?.value;
        agrupamientoKF24.total = e.summaryCells[10][0]?.value;

        totalAgrupamientoIKF24.cuautitlan = agrupamientoIF24.cuautitlan / agrupamientoKF24.cuautitlan;
        totalAgrupamientoIKF24.tultitlan = agrupamientoIF24.tultitlan / agrupamientoKF24.tultitlan;
        totalAgrupamientoIKF24.guadalajara = agrupamientoIF24.guadalajara / agrupamientoKF24.guadalajara;
        totalAgrupamientoIKF24.hermosillo = agrupamientoIF24.hermosillo / agrupamientoKF24.hermosillo;
        totalAgrupamientoIKF24.mexicali = agrupamientoIF24.mexicali / agrupamientoKF24.mexicali;
        totalAgrupamientoIKF24.orizaba = agrupamientoIF24.orizaba / agrupamientoKF24.orizaba;
        // totalAgrupamientoIKF24.ramosArispe = agrupamientoIF24.ramosArispe / agrupamientoKF24.ramosArispe;
        totalAgrupamientoIKF24.total = agrupamientoIF24.total / agrupamientoKF24.total;
      }
      if (e.data.key == '03 MAR'){
        agrupamientoKM24.cuautitlan = e.summaryCells[4][0]?.value;
        agrupamientoKM24.tultitlan = e.summaryCells[5][0]?.value;
        agrupamientoKM24.guadalajara = e.summaryCells[6][0]?.value;
        agrupamientoKM24.hermosillo = e.summaryCells[7][0]?.value;
        agrupamientoKM24.mexicali = e.summaryCells[8][0]?.value;
        agrupamientoKM24.orizaba = e.summaryCells[9][0]?.value;
        // agrupamientoKM24.ramosArispe = e.summaryCells[10][0]?.value;
        agrupamientoKM24.total = e.summaryCells[10][0]?.value;

        totalAgrupamientoIKM24.cuautitlan = agrupamientoIM24.cuautitlan / agrupamientoKM24.cuautitlan;
        totalAgrupamientoIKM24.tultitlan = agrupamientoIM24.tultitlan / agrupamientoKM24.tultitlan;
        totalAgrupamientoIKM24.guadalajara = agrupamientoIM24.guadalajara / agrupamientoKM24.guadalajara;
        totalAgrupamientoIKM24.hermosillo = agrupamientoIM24.hermosillo / agrupamientoKM24.hermosillo;
        totalAgrupamientoIKM24.mexicali = agrupamientoIM24.mexicali / agrupamientoKM24.mexicali;
        totalAgrupamientoIKM24.orizaba = agrupamientoIM24.orizaba / agrupamientoKM24.orizaba;
        // totalAgrupamientoIKM24.ramosArispe = agrupamientoIM24.ramosArispe / agrupamientoKM24.ramosArispe;
        totalAgrupamientoIKM24.total = agrupamientoIM24.total / agrupamientoKM24.total;
      }
      if (e.data.key == '04 ABR'){
        agrupamientoKA24.cuautitlan = e.summaryCells[4][0]?.value;
        agrupamientoKA24.tultitlan = e.summaryCells[5][0]?.value;
        agrupamientoKA24.guadalajara = e.summaryCells[6][0]?.value;
        agrupamientoKA24.hermosillo = e.summaryCells[7][0]?.value;
        agrupamientoKA24.mexicali = e.summaryCells[8][0]?.value;
        agrupamientoKA24.orizaba = e.summaryCells[9][0]?.value;
        // agrupamientoKA24.ramosArispe = e.summaryCells[10][0]?.value;
        agrupamientoKA24.total = e.summaryCells[10][0]?.value;

        totalAgrupamientoIKA24.cuautitlan = agrupamientoIA24.cuautitlan / agrupamientoKA24.cuautitlan;
        totalAgrupamientoIKA24.tultitlan = agrupamientoIA24.tultitlan / agrupamientoKA24.tultitlan;
        totalAgrupamientoIKA24.guadalajara = agrupamientoIA24.guadalajara / agrupamientoKA24.guadalajara;
        totalAgrupamientoIKA24.hermosillo = agrupamientoIA24.hermosillo / agrupamientoKA24.hermosillo;
        totalAgrupamientoIKA24.mexicali = agrupamientoIA24.mexicali / agrupamientoKA24.mexicali;
        totalAgrupamientoIKA24.orizaba = agrupamientoIA24.orizaba / agrupamientoKA24.orizaba;
        // totalAgrupamientoIKA24.ramosArispe = agrupamientoIA24.ramosArispe / agrupamientoKA24.ramosArispe;
        totalAgrupamientoIKA24.total = agrupamientoIA24.total / agrupamientoKA24.total;
      }
      if (e.data.key == '05 MAY'){
        agrupamientoKMY24.cuautitlan = e.summaryCells[4][0]?.value;
        agrupamientoKMY24.tultitlan = e.summaryCells[5][0]?.value;
        agrupamientoKMY24.guadalajara = e.summaryCells[6][0]?.value;
        agrupamientoKMY24.hermosillo = e.summaryCells[7][0]?.value;
        agrupamientoKMY24.mexicali = e.summaryCells[8][0]?.value;
        agrupamientoKMY24.orizaba = e.summaryCells[9][0]?.value;
        // agrupamientoKMY24.ramosArispe = e.summaryCells[10][0]?.value;
        agrupamientoKMY24.total = e.summaryCells[10][0]?.value;

        totalAgrupamientoIKMY24.cuautitlan = agrupamientoIMY24.cuautitlan / agrupamientoKMY24.cuautitlan;
        totalAgrupamientoIKMY24.tultitlan = agrupamientoIMY24.tultitlan / agrupamientoKMY24.tultitlan;
        totalAgrupamientoIKMY24.guadalajara = agrupamientoIMY24.guadalajara / agrupamientoKMY24.guadalajara;
        totalAgrupamientoIKMY24.hermosillo = agrupamientoIMY24.hermosillo / agrupamientoKMY24.hermosillo;
        totalAgrupamientoIKMY24.mexicali = agrupamientoIMY24.mexicali / agrupamientoKMY24.mexicali;
        totalAgrupamientoIKMY24.orizaba = agrupamientoIMY24.orizaba / agrupamientoKMY24.orizaba;
        // totalAgrupamientoIKMY24.ramosArispe = agrupamientoIMY24.ramosArispe / agrupamientoKMY24.ramosArispe;
        totalAgrupamientoIKMY24.total = agrupamientoIMY24.total / agrupamientoKMY24.total;
      }
      if (e.data.key == '06 JUN'){
        agrupamientoKJN24.cuautitlan = e.summaryCells[4][0]?.value;
        agrupamientoKJN24.tultitlan = e.summaryCells[5][0]?.value;
        agrupamientoKJN24.guadalajara = e.summaryCells[6][0]?.value;
        agrupamientoKJN24.hermosillo = e.summaryCells[7][0]?.value;
        agrupamientoKJN24.mexicali = e.summaryCells[8][0]?.value;
        agrupamientoKJN24.orizaba = e.summaryCells[9][0]?.value;
        // agrupamientoKJN24.ramosArispe = e.summaryCells[10][0]?.value;
        agrupamientoKJN24.total = e.summaryCells[10][0]?.value;

        totalAgrupamientoIKJN24.cuautitlan = agrupamientoIJN24.cuautitlan / agrupamientoKJN24.cuautitlan;
        totalAgrupamientoIKJN24.tultitlan = agrupamientoIJN24.tultitlan / agrupamientoKJN24.tultitlan;
        totalAgrupamientoIKJN24.guadalajara = agrupamientoIJN24.guadalajara / agrupamientoKJN24.guadalajara;
        totalAgrupamientoIKJN24.hermosillo = agrupamientoIJN24.hermosillo / agrupamientoKJN24.hermosillo;
        totalAgrupamientoIKJN24.mexicali = agrupamientoIJN24.mexicali / agrupamientoKJN24.mexicali;
        totalAgrupamientoIKJN24.orizaba = agrupamientoIJN24.orizaba / agrupamientoKJN24.orizaba;
        // totalAgrupamientoIKJN24.ramosArispe = agrupamientoIJN24.ramosArispe / agrupamientoKJN24.ramosArispe;
        totalAgrupamientoIKJN24.total = agrupamientoIJN24.total / agrupamientoKJN24.total;
      }
      if (e.data.key == '07 JUL'){
        agrupamientoKJL24.cuautitlan = e.summaryCells[4][0]?.value;
        agrupamientoKJL24.tultitlan = e.summaryCells[5][0]?.value;
        agrupamientoKJL24.guadalajara = e.summaryCells[6][0]?.value;
        agrupamientoKJL24.hermosillo = e.summaryCells[7][0]?.value;
        agrupamientoKJL24.mexicali = e.summaryCells[8][0]?.value;
        agrupamientoKJL24.orizaba = e.summaryCells[9][0]?.value;
        // agrupamientoKJL24.ramosArispe = e.summaryCells[10][0]?.value;
        agrupamientoKJL24.total = e.summaryCells[10][0]?.value;

        totalAgrupamientoIKJL24.cuautitlan = agrupamientoIJL24.cuautitlan / agrupamientoKJL24.cuautitlan;
        totalAgrupamientoIKJL24.tultitlan = agrupamientoIJL24.tultitlan / agrupamientoKJL24.tultitlan;
        totalAgrupamientoIKJL24.guadalajara = agrupamientoIJL24.guadalajara / agrupamientoKJL24.guadalajara;
        totalAgrupamientoIKJL24.hermosillo = agrupamientoIJL24.hermosillo / agrupamientoKJL24.hermosillo;
        totalAgrupamientoIKJL24.mexicali = agrupamientoIJL24.mexicali / agrupamientoKJL24.mexicali;
        totalAgrupamientoIKJL24.orizaba = agrupamientoIJL24.orizaba / agrupamientoKJL24.orizaba;
        // totalAgrupamientoIKJL24.ramosArispe = agrupamientoIJL24.ramosArispe / agrupamientoKJL24.ramosArispe;
        totalAgrupamientoIKJL24.total = agrupamientoIJL24.total / agrupamientoKJL24.total;
      }
      if (e.data.key == '08 AGO'){
        agrupamientoKAG24.cuautitlan = e.summaryCells[4][0]?.value;
        agrupamientoKAG24.tultitlan = e.summaryCells[5][0]?.value;
        agrupamientoKAG24.guadalajara = e.summaryCells[6][0]?.value;
        agrupamientoKAG24.hermosillo = e.summaryCells[7][0]?.value;
        agrupamientoKAG24.mexicali = e.summaryCells[8][0]?.value;
        agrupamientoKAG24.orizaba = e.summaryCells[9][0]?.value;
        // agrupamientoKAG24.ramosArispe = e.summaryCells[10][0]?.value;
        agrupamientoKAG24.total = e.summaryCells[10][0]?.value;

        totalAgrupamientoIKAG24.cuautitlan = agrupamientoIAG24.cuautitlan / agrupamientoKAG24.cuautitlan;
        totalAgrupamientoIKAG24.tultitlan = agrupamientoIAG24.tultitlan / agrupamientoKAG24.tultitlan;
        totalAgrupamientoIKAG24.guadalajara = agrupamientoIAG24.guadalajara / agrupamientoKAG24.guadalajara;
        totalAgrupamientoIKAG24.hermosillo = agrupamientoIAG24.hermosillo / agrupamientoKAG24.hermosillo;
        totalAgrupamientoIKAG24.mexicali = agrupamientoIAG24.mexicali / agrupamientoKAG24.mexicali;
        totalAgrupamientoIKAG24.orizaba = agrupamientoIAG24.orizaba / agrupamientoKAG24.orizaba;
        // totalAgrupamientoIKAG24.ramosArispe = agrupamientoIAG24.ramosArispe / agrupamientoKAG24.ramosArispe;
        totalAgrupamientoIKAG24.total = agrupamientoIAG24.total / agrupamientoKAG24.total;
      }
      if (e.data.key == '09 SEP'){
        agrupamientoKS24.cuautitlan = e.summaryCells[4][0].value;
        agrupamientoKS24.tultitlan = e.summaryCells[5][0].value;
        agrupamientoKS24.guadalajara = e.summaryCells[6][0].value;
        agrupamientoKS24.hermosillo = e.summaryCells[7][0].value;
        agrupamientoKS24.mexicali = e.summaryCells[8][0].value;
        agrupamientoKS24.orizaba = e.summaryCells[9][0].value;
        // agrupamientoKS24.ramosArispe = e.summaryCells[10][0].value;
        agrupamientoKS24.total = e.summaryCells[10][0].value;

        totalAgrupamientoIKS24.cuautitlan = agrupamientoIS24.cuautitlan / agrupamientoKS24.cuautitlan;
        totalAgrupamientoIKS24.tultitlan = agrupamientoIS24.tultitlan / agrupamientoKS24.tultitlan;
        totalAgrupamientoIKS24.guadalajara = agrupamientoIS24.guadalajara / agrupamientoKS24.guadalajara;
        totalAgrupamientoIKS24.hermosillo = agrupamientoIS24.hermosillo / agrupamientoKS24.hermosillo;
        totalAgrupamientoIKS24.mexicali = agrupamientoIS24.mexicali / agrupamientoKS24.mexicali;
        totalAgrupamientoIKS24.orizaba = agrupamientoIS24.orizaba / agrupamientoKS24.orizaba;
        // totalAgrupamientoIKS24.ramosArispe = agrupamientoIS24.ramosArispe / agrupamientoKS24.ramosArispe;
        totalAgrupamientoIKS24.total = agrupamientoIS24.total / agrupamientoKS24.total;
      }
      if (e.data.key == '10 OCT'){
        agrupamientoKOC24.cuautitlan = e.summaryCells[4][0].value;
        agrupamientoKOC24.tultitlan = e.summaryCells[5][0].value;
        agrupamientoKOC24.guadalajara = e.summaryCells[6][0].value;
        agrupamientoKOC24.hermosillo = e.summaryCells[7][0].value;
        agrupamientoKOC24.mexicali = e.summaryCells[8][0].value;
        agrupamientoKOC24.orizaba = e.summaryCells[9][0].value;
        // agrupamientoKOC24.ramosArispe = e.summaryCells[10][0].value;
        agrupamientoKOC24.total = e.summaryCells[10][0].value;

        totalAgrupamientoIKOC24.cuautitlan = agrupamientoIOC24.cuautitlan / agrupamientoKOC24.cuautitlan;
        totalAgrupamientoIKOC24.tultitlan = agrupamientoIOC24.tultitlan / agrupamientoKOC24.tultitlan;
        totalAgrupamientoIKOC24.guadalajara = agrupamientoIOC24.guadalajara / agrupamientoKOC24.guadalajara;
        totalAgrupamientoIKOC24.hermosillo = agrupamientoIOC24.hermosillo / agrupamientoKOC24.hermosillo;
        totalAgrupamientoIKOC24.mexicali = agrupamientoIOC24.mexicali / agrupamientoKOC24.mexicali;
        totalAgrupamientoIKOC24.orizaba = agrupamientoIOC24.orizaba / agrupamientoKOC24.orizaba;
        // totalAgrupamientoIKOC24.ramosArispe = agrupamientoIOC24.ramosArispe / agrupamientoKOC24.ramosArispe;
        totalAgrupamientoIKOC24.total = agrupamientoIOC24.total / agrupamientoKOC24.total;
      }
      if (e.data.key == '11 NOV'){
        agrupamientoKNV24.cuautitlan = e.summaryCells[4][0].value;
        agrupamientoKNV24.tultitlan = e.summaryCells[5][0].value;
        agrupamientoKNV24.guadalajara = e.summaryCells[6][0].value;
        agrupamientoKNV24.hermosillo = e.summaryCells[7][0].value;
        agrupamientoKNV24.mexicali = e.summaryCells[8][0].value;
        agrupamientoKNV24.orizaba = e.summaryCells[9][0].value;
        // agrupamientoKNV24.ramosArispe = e.summaryCells[10][0].value;
        agrupamientoKNV24.total = e.summaryCells[10][0].value;

        totalAgrupamientoIKNV24.cuautitlan = agrupamientoINV24.cuautitlan / agrupamientoKNV24.cuautitlan;
        totalAgrupamientoIKNV24.tultitlan = agrupamientoINV24.tultitlan / agrupamientoKNV24.tultitlan;
        totalAgrupamientoIKNV24.guadalajara = agrupamientoINV24.guadalajara / agrupamientoKNV24.guadalajara;
        totalAgrupamientoIKNV24.hermosillo = agrupamientoINV24.hermosillo / agrupamientoKNV24.hermosillo;
        totalAgrupamientoIKNV24.mexicali = agrupamientoINV24.mexicali / agrupamientoKNV24.mexicali;
        totalAgrupamientoIKNV24.orizaba = agrupamientoINV24.orizaba / agrupamientoKNV24.orizaba;
        // totalAgrupamientoIKNV24.ramosArispe = agrupamientoINV24.ramosArispe / agrupamientoKNV24.ramosArispe;
        totalAgrupamientoIKNV24.total = agrupamientoINV24.total / agrupamientoKNV24.total;
      }
      if (e.data.key == '12 DIC'){
        agrupamientoKDC24.cuautitlan = e.summaryCells[4][0].value;
        agrupamientoKDC24.tultitlan = e.summaryCells[5][0].value;
        agrupamientoKDC24.guadalajara = e.summaryCells[6][0].value;
        agrupamientoKDC24.hermosillo = e.summaryCells[7][0].value;
        agrupamientoKDC24.mexicali = e.summaryCells[8][0].value;
        agrupamientoKDC24.orizaba = e.summaryCells[9][0].value;
        // agrupamientoKDC24.ramosArispe = e.summaryCells[10][0].value;
        agrupamientoKDC24.total = e.summaryCells[10][0].value;

        totalAgrupamientoIKDC24.cuautitlan = agrupamientoIDC24.cuautitlan / agrupamientoKDC24.cuautitlan;
        totalAgrupamientoIKDC24.tultitlan = agrupamientoIDC24.tultitlan / agrupamientoKDC24.tultitlan;
        totalAgrupamientoIKDC24.guadalajara = agrupamientoIDC24.guadalajara / agrupamientoKDC24.guadalajara;
        totalAgrupamientoIKDC24.hermosillo = agrupamientoIDC24.hermosillo / agrupamientoKDC24.hermosillo;
        totalAgrupamientoIKDC24.mexicali = agrupamientoIDC24.mexicali / agrupamientoKDC24.mexicali;
        totalAgrupamientoIKDC24.orizaba = agrupamientoIDC24.orizaba / agrupamientoKDC24.orizaba;
        // totalAgrupamientoIKDC24.ramosArispe = agrupamientoIDC24.ramosArispe / agrupamientoKDC24.ramosArispe;
        totalAgrupamientoIKDC24.total = agrupamientoIDC24.total / agrupamientoKDC24.total;
      }
  

    }

    if(e.rowType == "totalFooter"){
      totalKilomentros24.cuautitlan = e.summaryCells[4][0]?.value;
      totalKilomentros24.tultitlan = e.summaryCells[5][0]?.value;
      totalKilomentros24.guadalajara = e.summaryCells[6][0]?.value;
      totalKilomentros24.hermosillo = e.summaryCells[7][0]?.value;
      totalKilomentros24.mexicali = e.summaryCells[8][0]?.value;
      totalKilomentros24.orizaba = e.summaryCells[9][0]?.value;
      // totalKilomentros24.ramosArispe = e.summaryCells[10][0].value;
      totalKilomentros24.total = e.summaryCells[10][0].value;

      totalOperacionIK24.cuautitlan = totalIngresos24.cuautitlan / totalKilomentros24.cuautitlan;
      totalOperacionIK24.tultitlan = totalIngresos24.tultitlan / totalKilomentros24.tultitlan;
      totalOperacionIK24.guadalajara = totalIngresos24.guadalajara / totalKilomentros24.guadalajara;
      totalOperacionIK24.hermosillo = totalIngresos24.hermosillo / totalKilomentros24.hermosillo;
      totalOperacionIK24.mexicali = totalIngresos24.mexicali / totalKilomentros24.mexicali;
      totalOperacionIK24.orizaba = totalIngresos24.orizaba / totalKilomentros24.orizaba;
      // totalOperacionIK24.ramosArispe = totalIngresos24.ramosArispe / totalKilomentros24.ramosArispe;
      totalOperacionIK24.total = totalIngresos24.total / totalKilomentros24.total;
    }
  }
  onCellPreparedK2024(e){
    if (e.rowType == 'group'){

      e.cellElement.style.fontSize = '12px';
      e.cellElement.style.background = "#DCDCDC";
    }

    if (e.rowType == 'totalFooter') {
      e.totalItem.cells.forEach((c: any) => {
        if (c.cellElement) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "16px";
            c.cellElement.style.background = "#ff9460";
            c.cellElement.style.color = "black"; 
        }   
      });
    }
  }
  customizeK2024(e) {  

    var gridCell = e.gridCell;
    if (gridCell.rowType === 'group') {
      
      e.backgroundColor = "#DCDCDC";
      e.fontWeight = "bolder"
      e.font = {bold: true}

  }

  if (gridCell.rowType === 'totalFooter') {
      
    e.backgroundColor = "#ff9460";
    e.fontWeight = "bolder"
    e.font = {bold: true}

  }
  }
//==============================VIAJES TOTALES 2024============================================
  onRowPreparedV2024(e){}
  onCellPreparedV2024(e){
    if (e.rowType == 'group'){

      e.cellElement.style.fontSize = '12px';
      e.cellElement.style.background = "#DCDCDC";
    }

    if (e.rowType == 'totalFooter') {
      e.totalItem.cells.forEach((c: any) => {
        if (c.cellElement) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "16px";
            c.cellElement.style.background = "#ff9460";
            c.cellElement.style.color = "black"; 
        }   
      });
    }
  }
  customizeV2024(e) {  

    var gridCell = e.gridCell;
    if (gridCell.rowType === 'group') {
      
      e.backgroundColor = "#DCDCDC";
      e.fontWeight = "bolder"
      e.font = {bold: true}

  }

  if (gridCell.rowType === 'totalFooter') {
      
    e.backgroundColor = "#ff9460";
    e.fontWeight = "bolder"
    e.font = {bold: true}

  }
  }
//==============================VIAJES CARGADOS 2024============================================
  onRowPreparedVC2024(event){
    
    if (event.rowType == 'group'){
      
      if (event.data.key == '01 ENE') {
         
        viajesCargadosE24.cuautitlan = event.summaryCells[4][0]?.value;
        viajesCargadosE24.tultitlan = event.summaryCells[5][0]?.value;
        viajesCargadosE24.guadalajara = event.summaryCells[6][0]?.value;
        viajesCargadosE24.hermosillo = event.summaryCells[7][0]?.value;
        viajesCargadosE24.mexicali = event.summaryCells[8][0]?.value;
        viajesCargadosE24.orizaba = event.summaryCells[9][0]?.value;
        // viajesCargadosE24.ramosArispe = event.summaryCells[10][0]?.value;
        viajesCargadosE24.total = event.summaryCells[10][0]?.value;

        totalIVCE24.cuautitlan = agrupamientoIE24.cuautitlan / viajesCargadosE24.cuautitlan;
        totalIVCE24.tultitlan = agrupamientoIE24.tultitlan / viajesCargadosE24.tultitlan;
        totalIVCE24.guadalajara = agrupamientoIE24.guadalajara / viajesCargadosE24.guadalajara;
        totalIVCE24.hermosillo = agrupamientoIE24.hermosillo / viajesCargadosE24.hermosillo;
        totalIVCE24.mexicali = agrupamientoIE24.mexicali / viajesCargadosE24.mexicali;
        totalIVCE24.orizaba = agrupamientoIE24.orizaba / viajesCargadosE24.orizaba;
        // totalIVCE24.ramosArispe = agrupamientoIE24.ramosArispe / viajesCargadosE24.ramosArispe;
        totalIVCE24.total = agrupamientoIE24.total / viajesCargadosE24.total;

        totalKVCE24.cuautitlan = agrupamientoKE24.cuautitlan / viajesCargadosE24.cuautitlan;
        totalKVCE24.tultitlan = agrupamientoKE24.tultitlan / viajesCargadosE24.tultitlan;
        totalKVCE24.guadalajara = agrupamientoKE24.guadalajara / viajesCargadosE24.guadalajara;
        totalKVCE24.hermosillo = agrupamientoKE24.hermosillo / viajesCargadosE24.hermosillo;
        totalKVCE24.mexicali = agrupamientoKE24.mexicali / viajesCargadosE24.mexicali;
        totalKVCE24.orizaba = agrupamientoKE24.orizaba / viajesCargadosE24.orizaba;
        // totalKVCE24.ramosArispe = agrupamientoKE24.ramosArispe / viajesCargadosE24.ramosArispe;
        totalKVCE24.total = agrupamientoKE24.total / viajesCargadosE24.total;


      }
      if (event.data.key == '02 FEB'){
        viajesCargadosF24.cuautitlan = event.summaryCells[4][0]?.value;
        viajesCargadosF24.tultitlan = event.summaryCells[5][0]?.value;
        viajesCargadosF24.guadalajara = event.summaryCells[6][0]?.value;
        viajesCargadosF24.hermosillo = event.summaryCells[7][0]?.value;
        viajesCargadosF24.mexicali = event.summaryCells[8][0]?.value;
        viajesCargadosF24.orizaba = event.summaryCells[9][0]?.value;
        // viajesCargadosF24.ramosArispe = event.summaryCells[10][0]?.value;
        viajesCargadosF24.total = event.summaryCells[10][0]?.value;

        totalIVCF24.cuautitlan = agrupamientoIF24.cuautitlan / viajesCargadosF24.cuautitlan;
        totalIVCF24.tultitlan = agrupamientoIF24.tultitlan / viajesCargadosF24.tultitlan;
        totalIVCF24.guadalajara = agrupamientoIF24.guadalajara / viajesCargadosF24.guadalajara;
        totalIVCF24.hermosillo = agrupamientoIF24.hermosillo / viajesCargadosF24.hermosillo;
        totalIVCF24.mexicali = agrupamientoIF24.mexicali / viajesCargadosF24.mexicali;
        totalIVCF24.orizaba = agrupamientoIF24.orizaba / viajesCargadosF24.orizaba;
        // totalIVCF24.ramosArispe = agrupamientoIF24.ramosArispe / viajesCargadosF24.ramosArispe;
        totalIVCF24.total = agrupamientoIF24.total / viajesCargadosF24.total;

        totalKVCF24.cuautitlan = agrupamientoKF24.cuautitlan / viajesCargadosF24.cuautitlan;
        totalKVCF24.tultitlan = agrupamientoKF24.tultitlan / viajesCargadosF24.tultitlan;
        totalKVCF24.guadalajara = agrupamientoKF24.guadalajara / viajesCargadosF24.guadalajara;
        totalKVCF24.hermosillo = agrupamientoKF24.hermosillo / viajesCargadosF24.hermosillo;
        totalKVCF24.mexicali = agrupamientoKF24.mexicali / viajesCargadosF24.mexicali;
        totalKVCF24.orizaba = agrupamientoKF24.orizaba / viajesCargadosF24.orizaba;
        // totalKVCF24.ramosArispe = agrupamientoKF24.ramosArispe / viajesCargadosF24.ramosArispe;
        totalKVCF24.total = agrupamientoKF24.total / viajesCargadosF24.total;
      }
      if (event.data.key == '03 MAR'){
        viajesCargadosM24.cuautitlan = event.summaryCells[4][0]?.value;
        viajesCargadosM24.tultitlan = event.summaryCells[5][0]?.value;
        viajesCargadosM24.guadalajara = event.summaryCells[6][0]?.value;
        viajesCargadosM24.hermosillo = event.summaryCells[7][0]?.value;
        viajesCargadosM24.mexicali = event.summaryCells[8][0]?.value;
        viajesCargadosM24.orizaba = event.summaryCells[9][0]?.value;
        // viajesCargadosM24.ramosArispe = event.summaryCells[10][0]?.value;
        viajesCargadosM24.total = event.summaryCells[10][0]?.value;

        totalIVCM24.cuautitlan = agrupamientoIM24.cuautitlan / viajesCargadosM24.cuautitlan;
        totalIVCM24.tultitlan = agrupamientoIM24.tultitlan / viajesCargadosM24.tultitlan;
        totalIVCM24.guadalajara = agrupamientoIM24.guadalajara / viajesCargadosM24.guadalajara;
        totalIVCM24.hermosillo = agrupamientoIM24.hermosillo / viajesCargadosM24.hermosillo;
        totalIVCM24.mexicali = agrupamientoIM24.mexicali / viajesCargadosM24.mexicali;
        totalIVCM24.orizaba = agrupamientoIM24.orizaba / viajesCargadosM24.orizaba;
        // totalIVCM24.ramosArispe = agrupamientoIM24.ramosArispe / viajesCargadosM24.ramosArispe;
        totalIVCM24.total = agrupamientoIM24.total / viajesCargadosM24.total;

        totalKVCM24.cuautitlan = agrupamientoKM24.cuautitlan / viajesCargadosM24.cuautitlan;
        totalKVCM24.tultitlan = agrupamientoKM24.tultitlan / viajesCargadosM24.tultitlan;
        totalKVCM24.guadalajara = agrupamientoKM24.guadalajara / viajesCargadosM24.guadalajara;
        totalKVCM24.hermosillo = agrupamientoKM24.hermosillo / viajesCargadosM24.hermosillo;
        totalKVCM24.mexicali = agrupamientoKM24.mexicali / viajesCargadosM24.mexicali;
        totalKVCM24.orizaba = agrupamientoKM24.orizaba / viajesCargadosM24.orizaba;
        // totalKVCM24.ramosArispe = agrupamientoKM24.ramosArispe / viajesCargadosM24.ramosArispe;
        totalKVCM24.total = agrupamientoKM24.total / viajesCargadosM24.total;
      }
      if (event.data.key == '04 ABR'){
        viajesCargadosA24.cuautitlan = event.summaryCells[4][0]?.value;
        viajesCargadosA24.tultitlan = event.summaryCells[5][0]?.value;
        viajesCargadosA24.guadalajara = event.summaryCells[6][0]?.value;
        viajesCargadosA24.hermosillo = event.summaryCells[7][0]?.value;
        viajesCargadosA24.mexicali = event.summaryCells[8][0]?.value;
        viajesCargadosA24.orizaba = event.summaryCells[9][0]?.value;
        // viajesCargadosA24.ramosArispe = event.summaryCells[10][0]?.value;
        viajesCargadosA24.total = event.summaryCells[10][0]?.value;

        totalIVCA24.cuautitlan = agrupamientoIA24.cuautitlan / viajesCargadosA24.cuautitlan;
        totalIVCA24.tultitlan = agrupamientoIA24.tultitlan / viajesCargadosA24.tultitlan;
        totalIVCA24.guadalajara = agrupamientoIA24.guadalajara / viajesCargadosA24.guadalajara;
        totalIVCA24.hermosillo = agrupamientoIA24.hermosillo / viajesCargadosA24.hermosillo;
        totalIVCA24.mexicali = agrupamientoIA24.mexicali / viajesCargadosA24.mexicali;
        totalIVCA24.orizaba = agrupamientoIA24.orizaba / viajesCargadosA24.orizaba;
        // totalIVCA24.ramosArispe = agrupamientoIA24.ramosArispe / viajesCargadosA24.ramosArispe;
        totalIVCA24.total = agrupamientoIA24.total / viajesCargadosA24.total;

        totalKVCA24.cuautitlan = agrupamientoKA24.cuautitlan / viajesCargadosA24.cuautitlan;
        totalKVCA24.tultitlan = agrupamientoKA24.tultitlan / viajesCargadosA24.tultitlan;
        totalKVCA24.guadalajara = agrupamientoKA24.guadalajara / viajesCargadosA24.guadalajara;
        totalKVCA24.hermosillo = agrupamientoKA24.hermosillo / viajesCargadosA24.hermosillo;
        totalKVCA24.mexicali = agrupamientoKA24.mexicali / viajesCargadosA24.mexicali;
        totalKVCA24.orizaba = agrupamientoKA24.orizaba / viajesCargadosA24.orizaba;
        // totalKVCA24.ramosArispe = agrupamientoKA24.ramosArispe / viajesCargadosA24.ramosArispe;
        totalKVCA24.total = agrupamientoKA24.total / viajesCargadosA24.total;
      }
      if (event.data.key == '05 MAY'){
        viajesCargadosMY24.cuautitlan = event.summaryCells[4][0]?.value;
        viajesCargadosMY24.tultitlan = event.summaryCells[5][0]?.value;
        viajesCargadosMY24.guadalajara = event.summaryCells[6][0]?.value;
        viajesCargadosMY24.hermosillo = event.summaryCells[7][0]?.value;
        viajesCargadosMY24.mexicali = event.summaryCells[8][0]?.value;
        viajesCargadosMY24.orizaba = event.summaryCells[9][0]?.value;
        // viajesCargadosMY24.ramosArispe = event.summaryCells[10][0]?.value;
        viajesCargadosMY24.total = event.summaryCells[10][0]?.value;

        totalIVCMY24.cuautitlan = agrupamientoIMY24.cuautitlan / viajesCargadosMY24.cuautitlan;
        totalIVCMY24.tultitlan = agrupamientoIMY24.tultitlan / viajesCargadosMY24.tultitlan;
        totalIVCMY24.guadalajara = agrupamientoIMY24.guadalajara / viajesCargadosMY24.guadalajara;
        totalIVCMY24.hermosillo = agrupamientoIMY24.hermosillo / viajesCargadosMY24.hermosillo;
        totalIVCMY24.mexicali = agrupamientoIMY24.mexicali / viajesCargadosMY24.mexicali;
        totalIVCMY24.orizaba = agrupamientoIMY24.orizaba / viajesCargadosMY24.orizaba;
        // totalIVCMY24.ramosArispe = agrupamientoIMY24.ramosArispe / viajesCargadosMY24.ramosArispe;
        totalIVCMY24.total = agrupamientoIMY24.total / viajesCargadosMY24.total;

        totalKVCMY24.cuautitlan = agrupamientoKMY24.cuautitlan / viajesCargadosMY24.cuautitlan;
        totalKVCMY24.tultitlan = agrupamientoKMY24.tultitlan / viajesCargadosMY24.tultitlan;
        totalKVCMY24.guadalajara = agrupamientoKMY24.guadalajara / viajesCargadosMY24.guadalajara;
        totalKVCMY24.hermosillo = agrupamientoKMY24.hermosillo / viajesCargadosMY24.hermosillo;
        totalKVCMY24.mexicali = agrupamientoKMY24.mexicali / viajesCargadosMY24.mexicali;
        totalKVCMY24.orizaba = agrupamientoKMY24.orizaba / viajesCargadosMY24.orizaba;
        // totalKVCMY24.ramosArispe = agrupamientoKMY24.ramosArispe / viajesCargadosMY24.ramosArispe;
        totalKVCMY24.total = agrupamientoKMY24.total / viajesCargadosMY24.total;
      }
      if (event.data.key == '06 JUN'){
        viajesCargadosJN24.cuautitlan = event.summaryCells[4][0]?.value;
        viajesCargadosJN24.tultitlan = event.summaryCells[5][0]?.value;
        viajesCargadosJN24.guadalajara = event.summaryCells[6][0]?.value;
        viajesCargadosJN24.hermosillo = event.summaryCells[7][0]?.value;
        viajesCargadosJN24.mexicali = event.summaryCells[8][0]?.value;
        viajesCargadosJN24.orizaba = event.summaryCells[9][0]?.value;
        // viajesCargadosJN24.ramosArispe = event.summaryCells[10][0]?.value;
        viajesCargadosJN24.total = event.summaryCells[10][0]?.value;

        totalIVCJN24.cuautitlan = agrupamientoIJN24.cuautitlan / viajesCargadosJN24.cuautitlan;
        totalIVCJN24.tultitlan = agrupamientoIJN24.tultitlan / viajesCargadosJN24.tultitlan;
        totalIVCJN24.guadalajara = agrupamientoIJN24.guadalajara / viajesCargadosJN24.guadalajara;
        totalIVCJN24.hermosillo = agrupamientoIJN24.hermosillo / viajesCargadosJN24.hermosillo;
        totalIVCJN24.mexicali = agrupamientoIJN24.mexicali / viajesCargadosJN24.mexicali;
        totalIVCJN24.orizaba = agrupamientoIJN24.orizaba / viajesCargadosJN24.orizaba;
        // totalIVCJN24.ramosArispe = agrupamientoIJN24.ramosArispe / viajesCargadosJN24.ramosArispe;
        totalIVCJN24.total = agrupamientoIJN24.total / viajesCargadosJN24.total;

        totalKVCJN24.cuautitlan = agrupamientoKJN24.cuautitlan / viajesCargadosJN24.cuautitlan;
        totalKVCJN24.tultitlan = agrupamientoKJN24.tultitlan / viajesCargadosJN24.tultitlan;
        totalKVCJN24.guadalajara = agrupamientoKJN24.guadalajara / viajesCargadosJN24.guadalajara;
        totalKVCJN24.hermosillo = agrupamientoKJN24.hermosillo / viajesCargadosJN24.hermosillo;
        totalKVCJN24.mexicali = agrupamientoKJN24.mexicali / viajesCargadosJN24.mexicali;
        totalKVCJN24.orizaba = agrupamientoKJN24.orizaba / viajesCargadosJN24.orizaba;
        // totalKVCJN24.ramosArispe = agrupamientoKJN24.ramosArispe / viajesCargadosJN24.ramosArispe;
        totalKVCJN24.total = agrupamientoKJN24.total / viajesCargadosJN24.total;
      }
      if (event.data.key == '07 JUL'){
        viajesCargadosJL24.cuautitlan = event.summaryCells[4][0]?.value;
        viajesCargadosJL24.tultitlan = event.summaryCells[5][0]?.value;
        viajesCargadosJL24.guadalajara = event.summaryCells[6][0]?.value;
        viajesCargadosJL24.hermosillo = event.summaryCells[7][0]?.value;
        viajesCargadosJL24.mexicali = event.summaryCells[8][0]?.value;
        viajesCargadosJL24.orizaba = event.summaryCells[9][0]?.value;
        // viajesCargadosJL24.ramosArispe = event.summaryCells[10][0]?.value;
        viajesCargadosJL24.total = event.summaryCells[10][0]?.value;

        totalIVCJL24.cuautitlan = agrupamientoIJL24.cuautitlan / viajesCargadosJL24.cuautitlan;
        totalIVCJL24.tultitlan = agrupamientoIJL24.tultitlan / viajesCargadosJL24.tultitlan;
        totalIVCJL24.guadalajara = agrupamientoIJL24.guadalajara / viajesCargadosJL24.guadalajara;
        totalIVCJL24.hermosillo = agrupamientoIJL24.hermosillo / viajesCargadosJL24.hermosillo;
        totalIVCJL24.mexicali = agrupamientoIJL24.mexicali / viajesCargadosJL24.mexicali;
        totalIVCJL24.orizaba = agrupamientoIJL24.orizaba / viajesCargadosJL24.orizaba;
        // totalIVCJL24.ramosArispe = agrupamientoIJL24.ramosArispe / viajesCargadosJL24.ramosArispe;
        totalIVCJL24.total = agrupamientoIJL24.total / viajesCargadosJL24.total;

        totalKVCJL24.cuautitlan = agrupamientoKJL24.cuautitlan / viajesCargadosJL24.cuautitlan;
        totalKVCJL24.tultitlan = agrupamientoKJL24.tultitlan / viajesCargadosJL24.tultitlan;
        totalKVCJL24.guadalajara = agrupamientoKJL24.guadalajara / viajesCargadosJL24.guadalajara;
        totalKVCJL24.hermosillo = agrupamientoKJL24.hermosillo / viajesCargadosJL24.hermosillo;
        totalKVCJL24.mexicali = agrupamientoKJL24.mexicali / viajesCargadosJL24.mexicali;
        totalKVCJL24.orizaba = agrupamientoKJL24.orizaba / viajesCargadosJL24.orizaba;
        // totalKVCJL24.ramosArispe = agrupamientoKJL24.ramosArispe / viajesCargadosJL24.ramosArispe;
        totalKVCJL24.total = agrupamientoKJL24.total / viajesCargadosJL24.total;
      }
      if (event.data.key == '08 AGO'){
        viajesCargadosAG24.cuautitlan = event.summaryCells[4][0]?.value;
        viajesCargadosAG24.tultitlan = event.summaryCells[5][0]?.value;
        viajesCargadosAG24.guadalajara = event.summaryCells[6][0]?.value;
        viajesCargadosAG24.hermosillo = event.summaryCells[7][0]?.value;
        viajesCargadosAG24.mexicali = event.summaryCells[8][0]?.value;
        viajesCargadosAG24.orizaba = event.summaryCells[9][0]?.value;
        // viajesCargadosAG24.ramosArispe = event.summaryCells[10][0]?.value;
        viajesCargadosAG24.total = event.summaryCells[10][0]?.value;

        totalIVCAG24.cuautitlan = agrupamientoIAG24.cuautitlan / viajesCargadosAG24.cuautitlan;
        totalIVCAG24.tultitlan = agrupamientoIAG24.tultitlan / viajesCargadosAG24.tultitlan;
        totalIVCAG24.guadalajara = agrupamientoIAG24.guadalajara / viajesCargadosAG24.guadalajara;
        totalIVCAG24.hermosillo = agrupamientoIAG24.hermosillo / viajesCargadosAG24.hermosillo;
        totalIVCAG24.mexicali = agrupamientoIAG24.mexicali / viajesCargadosAG24.mexicali;
        totalIVCAG24.orizaba = agrupamientoIAG24.orizaba / viajesCargadosAG24.orizaba;
        // totalIVCAG24.ramosArispe = agrupamientoIAG24.ramosArispe / viajesCargadosAG24.ramosArispe;
        totalIVCAG24.total = agrupamientoIAG24.total / viajesCargadosAG24.total;

        totalKVCAG24.cuautitlan = agrupamientoKAG24.cuautitlan / viajesCargadosAG24.cuautitlan;
        totalKVCAG24.tultitlan = agrupamientoKAG24.tultitlan / viajesCargadosAG24.tultitlan;
        totalKVCAG24.guadalajara = agrupamientoKAG24.guadalajara / viajesCargadosAG24.guadalajara;
        totalKVCAG24.hermosillo = agrupamientoKAG24.hermosillo / viajesCargadosAG24.hermosillo;
        totalKVCAG24.mexicali = agrupamientoKAG24.mexicali / viajesCargadosAG24.mexicali;
        totalKVCAG24.orizaba = agrupamientoKAG24.orizaba / viajesCargadosAG24.orizaba;
        // totalKVCAG24.ramosArispe = agrupamientoKAG24.ramosArispe / viajesCargadosAG24.ramosArispe;
        totalKVCAG24.total = agrupamientoKAG24.total / viajesCargadosAG24.total;
      }
      if (event.data.key == '09 SEP'){
        viajesCargadosS24.cuautitlan = event.summaryCells[4][0].value;
        viajesCargadosS24.tultitlan = event.summaryCells[5][0].value;
        viajesCargadosS24.guadalajara = event.summaryCells[6][0].value;
        viajesCargadosS24.hermosillo = event.summaryCells[7][0].value;
        viajesCargadosS24.mexicali = event.summaryCells[8][0].value;
        viajesCargadosS24.orizaba = event.summaryCells[9][0].value;
        // viajesCargadosS24.ramosArispe = event.summaryCells[10][0].value;
        viajesCargadosS24.total = event.summaryCells[10][0].value;

        totalIVCS24.cuautitlan = agrupamientoIS24.cuautitlan / viajesCargadosS24.cuautitlan;
        totalIVCS24.tultitlan = agrupamientoIS24.tultitlan / viajesCargadosS24.tultitlan;
        totalIVCS24.guadalajara = agrupamientoIS24.guadalajara / viajesCargadosS24.guadalajara;
        totalIVCS24.hermosillo = agrupamientoIS24.hermosillo / viajesCargadosS24.hermosillo;
        totalIVCS24.mexicali = agrupamientoIS24.mexicali / viajesCargadosS24.mexicali;
        totalIVCS24.orizaba = agrupamientoIS24.orizaba / viajesCargadosS24.orizaba;
        // totalIVCS24.ramosArispe = agrupamientoIS24.ramosArispe / viajesCargadosS24.ramosArispe;
        totalIVCS24.total = agrupamientoIS24.total / viajesCargadosS24.total;

        totalKVCS24.cuautitlan = agrupamientoKS24.cuautitlan / viajesCargadosS24.cuautitlan;
        totalKVCS24.tultitlan = agrupamientoKS24.tultitlan / viajesCargadosS24.tultitlan;
        totalKVCS24.guadalajara = agrupamientoKS24.guadalajara / viajesCargadosS24.guadalajara;
        totalKVCS24.hermosillo = agrupamientoKS24.hermosillo / viajesCargadosS24.hermosillo;
        totalKVCS24.mexicali = agrupamientoKS24.mexicali / viajesCargadosS24.mexicali;
        totalKVCS24.orizaba = agrupamientoKS24.orizaba / viajesCargadosS24.orizaba;
        // totalKVCS24.ramosArispe = agrupamientoKS24.ramosArispe / viajesCargadosS24.ramosArispe;
        totalKVCS24.total = agrupamientoKS24.total / viajesCargadosS24.total;
      }
      if (event.data.key == '10 OCT'){
        viajesCargadosOC24.cuautitlan = event.summaryCells[4][0].value;
        viajesCargadosOC24.tultitlan = event.summaryCells[5][0].value;
        viajesCargadosOC24.guadalajara = event.summaryCells[6][0].value;
        viajesCargadosOC24.hermosillo = event.summaryCells[7][0].value;
        viajesCargadosOC24.mexicali = event.summaryCells[8][0].value;
        viajesCargadosOC24.orizaba = event.summaryCells[9][0].value;
        // viajesCargadosOC24.ramosArispe = event.summaryCells[10][0].value;
        viajesCargadosOC24.total = event.summaryCells[10][0].value;

        totalIVCOC24.cuautitlan = agrupamientoIOC24.cuautitlan / viajesCargadosOC24.cuautitlan;
        totalIVCOC24.tultitlan = agrupamientoIOC24.tultitlan / viajesCargadosOC24.tultitlan;
        totalIVCOC24.guadalajara = agrupamientoIOC24.guadalajara / viajesCargadosOC24.guadalajara;
        totalIVCOC24.hermosillo = agrupamientoIOC24.hermosillo / viajesCargadosOC24.hermosillo;
        totalIVCOC24.mexicali = agrupamientoIOC24.mexicali / viajesCargadosOC24.mexicali;
        totalIVCOC24.orizaba = agrupamientoIOC24.orizaba / viajesCargadosOC24.orizaba;
        // totalIVCOC24.ramosArispe = agrupamientoIOC24.ramosArispe / viajesCargadosOC24.ramosArispe;
        totalIVCOC24.total = agrupamientoIOC24.total / viajesCargadosOC24.total;

        totalKVCOC24.cuautitlan = agrupamientoKOC24.cuautitlan / viajesCargadosOC24.cuautitlan;
        totalKVCOC24.tultitlan = agrupamientoKOC24.tultitlan / viajesCargadosOC24.tultitlan;
        totalKVCOC24.guadalajara = agrupamientoKOC24.guadalajara / viajesCargadosOC24.guadalajara;
        totalKVCOC24.hermosillo = agrupamientoKOC24.hermosillo / viajesCargadosOC24.hermosillo;
        totalKVCOC24.mexicali = agrupamientoKOC24.mexicali / viajesCargadosOC24.mexicali;
        totalKVCOC24.orizaba = agrupamientoKOC24.orizaba / viajesCargadosOC24.orizaba;
        // totalKVCOC24.ramosArispe = agrupamientoKOC24.ramosArispe / viajesCargadosOC24.ramosArispe;
        totalKVCOC24.total = agrupamientoKOC24.total / viajesCargadosOC24.total;
      }
      if (event.data.key == '11 NOV'){
        viajesCargadosNV24.cuautitlan = event.summaryCells[4][0].value;
        viajesCargadosNV24.tultitlan = event.summaryCells[5][0].value;
        viajesCargadosNV24.guadalajara = event.summaryCells[6][0].value;
        viajesCargadosNV24.hermosillo = event.summaryCells[7][0].value;
        viajesCargadosNV24.mexicali = event.summaryCells[8][0].value;
        viajesCargadosNV24.orizaba = event.summaryCells[9][0].value;
        // viajesCargadosNV24.ramosArispe = event.summaryCells[10][0].value;
        viajesCargadosNV24.total = event.summaryCells[10][0].value;

        totalIVCNV24.cuautitlan = agrupamientoINV24.cuautitlan / viajesCargadosNV24.cuautitlan;
        totalIVCNV24.tultitlan = agrupamientoINV24.tultitlan / viajesCargadosNV24.tultitlan;
        totalIVCNV24.guadalajara = agrupamientoINV24.guadalajara / viajesCargadosNV24.guadalajara;
        totalIVCNV24.hermosillo = agrupamientoINV24.hermosillo / viajesCargadosNV24.hermosillo;
        totalIVCNV24.mexicali = agrupamientoINV24.mexicali / viajesCargadosNV24.mexicali;
        totalIVCNV24.orizaba = agrupamientoINV24.orizaba / viajesCargadosNV24.orizaba;
        // totalIVCNV24.ramosArispe = agrupamientoINV24.ramosArispe / viajesCargadosNV24.ramosArispe;
        totalIVCNV24.total = agrupamientoINV24.total / viajesCargadosNV24.total;

        totalKVCNV24.cuautitlan = agrupamientoKNV24.cuautitlan / viajesCargadosNV24.cuautitlan;
        totalKVCNV24.tultitlan = agrupamientoKNV24.tultitlan / viajesCargadosNV24.tultitlan;
        totalKVCNV24.guadalajara = agrupamientoKNV24.guadalajara / viajesCargadosNV24.guadalajara;
        totalKVCNV24.hermosillo = agrupamientoKNV24.hermosillo / viajesCargadosNV24.hermosillo;
        totalKVCNV24.mexicali = agrupamientoKNV24.mexicali / viajesCargadosNV24.mexicali;
        totalKVCNV24.orizaba = agrupamientoKNV24.orizaba / viajesCargadosNV24.orizaba;
        // totalKVCNV24.ramosArispe = agrupamientoKNV24.ramosArispe / viajesCargadosNV24.ramosArispe;
        totalKVCNV24.total = agrupamientoKNV24.total / viajesCargadosNV24.total;
      }
      if (event.data.key == '12 DIC'){
        viajesCargadosDC24.cuautitlan = event.summaryCells[4][0].value;
        viajesCargadosDC24.tultitlan = event.summaryCells[5][0].value;
        viajesCargadosDC24.guadalajara = event.summaryCells[6][0].value;
        viajesCargadosDC24.hermosillo = event.summaryCells[7][0].value;
        viajesCargadosDC24.mexicali = event.summaryCells[8][0].value;
        viajesCargadosDC24.orizaba = event.summaryCells[9][0].value;
        // viajesCargadosDC24.ramosArispe = event.summaryCells[10][0].value;
        viajesCargadosDC24.total = event.summaryCells[10][0].value;

        totalIVCDC24.cuautitlan = agrupamientoIDC24.cuautitlan / viajesCargadosDC24.cuautitlan;
        totalIVCDC24.tultitlan = agrupamientoIDC24.tultitlan / viajesCargadosDC24.tultitlan;
        totalIVCDC24.guadalajara = agrupamientoIDC24.guadalajara / viajesCargadosDC24.guadalajara;
        totalIVCDC24.hermosillo = agrupamientoIDC24.hermosillo / viajesCargadosDC24.hermosillo;
        totalIVCDC24.mexicali = agrupamientoIDC24.mexicali / viajesCargadosDC24.mexicali;
        totalIVCDC24.orizaba = agrupamientoIDC24.orizaba / viajesCargadosDC24.orizaba;
        // totalIVCDC24.ramosArispe = agrupamientoIDC24.ramosArispe / viajesCargadosDC24.ramosArispe;
        totalIVCDC24.total = agrupamientoIDC24.total / viajesCargadosDC24.total;

        totalKVCDC24.cuautitlan = agrupamientoKDC24.cuautitlan / viajesCargadosDC24.cuautitlan;
        totalKVCDC24.tultitlan = agrupamientoKDC24.tultitlan / viajesCargadosDC24.tultitlan;
        totalKVCDC24.guadalajara = agrupamientoKDC24.guadalajara / viajesCargadosDC24.guadalajara;
        totalKVCDC24.hermosillo = agrupamientoKDC24.hermosillo / viajesCargadosDC24.hermosillo;
        totalKVCDC24.mexicali = agrupamientoKDC24.mexicali / viajesCargadosDC24.mexicali;
        totalKVCDC24.orizaba = agrupamientoKDC24.orizaba / viajesCargadosDC24.orizaba;
        // totalKVCDC24.ramosArispe = agrupamientoKDC24.ramosArispe / viajesCargadosDC24.ramosArispe;
        totalKVCDC24.total = agrupamientoKDC24.total / viajesCargadosDC24.total;
      }
    }

    if(event.rowType == "totalFooter"){
      totalVC24.cuautitlan = event.summaryCells[4][0]?.value;
      totalVC24.tultitlan = event.summaryCells[5][0]?.value;
      totalVC24.guadalajara = event.summaryCells[6][0]?.value;
      totalVC24.hermosillo = event.summaryCells[7][0]?.value;
      totalVC24.mexicali = event.summaryCells[8][0]?.value;
      totalVC24.orizaba = event.summaryCells[9][0]?.value;
      // totalVC24.ramosArispe = event.summaryCells[10][0]?.value;
      totalVC24.total = event.summaryCells[10][0]?.value

      totalOperacionIVC24.cuautitlan = totalIngresos24.cuautitlan / totalVC24.cuautitlan;
      totalOperacionIVC24.tultitlan = totalIngresos24.tultitlan / totalVC24.tultitlan;
      totalOperacionIVC24.guadalajara = totalIngresos24.guadalajara / totalVC24.guadalajara;
      totalOperacionIVC24.hermosillo = totalIngresos24.hermosillo / totalVC24.hermosillo;
      totalOperacionIVC24.mexicali = totalIngresos24.mexicali / totalVC24.mexicali;
      totalOperacionIVC24.orizaba = totalIngresos24.orizaba / totalVC24.orizaba;
      // totalOperacionIVC24.ramosArispe = totalIngresos24.ramosArispe / totalVC24.ramosArispe;
      totalOperacionIVC24.total = totalIngresos24.total / totalVC24.total;

      totalOperacionKVC24.cuautitlan = totalKilomentros24.cuautitlan / totalVC24.cuautitlan;
      totalOperacionKVC24.tultitlan = totalKilomentros24.tultitlan / totalVC24.tultitlan;
      totalOperacionKVC24.guadalajara = totalKilomentros24.guadalajara / totalVC24.guadalajara;
      totalOperacionKVC24.hermosillo = totalKilomentros24.hermosillo / totalVC24.hermosillo;
      totalOperacionKVC24.mexicali = totalKilomentros24.mexicali / totalVC24.mexicali;
      totalOperacionKVC24.orizaba = totalKilomentros24.orizaba / totalVC24.orizaba;
      // totalOperacionKVC24.ramosArispe = totalKilomentros24.ramosArispe / totalVC24.ramosArispe;
      totalOperacionKVC24.total = totalKilomentros24.total / totalVC24.total;


    }

  }
  onCellPreparedVC2024(e){
    if (e.rowType == 'group'){

      e.cellElement.style.fontSize = '12px';
      e.cellElement.style.background = "#DCDCDC";
    }

    if (e.rowType == 'totalFooter') {
      e.totalItem.cells.forEach((c: any) => {
        if (c.cellElement) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "16px";
            c.cellElement.style.background = "#ff9460";
            c.cellElement.style.color = "black"; 
        }   
      });
    }
  }
  customizeVC2024(e) {  

    var gridCell = e.gridCell;
    if (gridCell.rowType === 'group') {
      
      e.backgroundColor = "#DCDCDC";
      e.fontWeight = "bolder"
      e.font = {bold: true}

  }

  if (gridCell.rowType === 'totalFooter') {
      
    e.backgroundColor = "#ff9460";
    e.fontWeight = "bolder"
    e.font = {bold: true}

  }
  }
//==============================INGRESOS KILOMETROS 2024===============================
  onCellPreparedPM2024(e){

    if (e.rowType == 'data'){

      e.cellElement.style.fontSize = '12px';
      e.cellElement.style.background = "#DCDCDC";
    }
  }  

  onRowPreparedIK2024(e){
    if (e.rowType == 'group'){

      if(e.isExpanded == true){
        this.collapseGroup == true
      }


      if (e.data.key == '01 ENE') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value =  totalAgrupamientoIKE24.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalAgrupamientoIKE24.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalAgrupamientoIKE24.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalAgrupamientoIKE24.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalAgrupamientoIKE24.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalAgrupamientoIKE24.orizaba;
        }
        // if(e.summaryCells[10].length !== 0){
        // e.summaryCells[10][0].value = totalAgrupamientoIKE24.ramosArispe;
        // }
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalAgrupamientoIKE24.total;
        }
      
      }
      if (e.data.key == '02 FEB') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalAgrupamientoIKF24.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalAgrupamientoIKF24.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalAgrupamientoIKF24.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalAgrupamientoIKF24.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalAgrupamientoIKF24.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalAgrupamientoIKF24.orizaba;
        }
        // if(e.summaryCells[10].length !== 0){
        // e.summaryCells[10][0].value = totalAgrupamientoIKF24.ramosArispe;
        // }
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalAgrupamientoIKF24.total;
        }
      }
      if (e.data.key == '03 MAR') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalAgrupamientoIKM24.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalAgrupamientoIKM24.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalAgrupamientoIKM24.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalAgrupamientoIKM24.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalAgrupamientoIKM24.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalAgrupamientoIKM24.orizaba;
        }
        // if(e.summaryCells[10].length !== 0){
        // e.summaryCells[10][0].value = totalAgrupamientoIKM24.ramosArispe;
        // }
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalAgrupamientoIKM24.total;
        }

      }
      if (e.data.key == '04 ABR') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalAgrupamientoIKA24.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalAgrupamientoIKA24.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalAgrupamientoIKA24.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalAgrupamientoIKA24.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalAgrupamientoIKA24.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalAgrupamientoIKA24.orizaba;
        }
        // if(e.summaryCells[10].length !== 0){
        // e.summaryCells[10][0].value = totalAgrupamientoIKA24.ramosArispe;
        // }
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalAgrupamientoIKA24.total;
        }


      }
      if (e.data.key == '05 MAY') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalAgrupamientoIKMY24.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalAgrupamientoIKMY24.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalAgrupamientoIKMY24.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalAgrupamientoIKMY24.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalAgrupamientoIKMY24.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalAgrupamientoIKMY24.orizaba;
        }
        // if(e.summaryCells[10].length !== 0){
        // e.summaryCells[10][0].value = totalAgrupamientoIKMY24.ramosArispe;
        // }
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalAgrupamientoIKMY24.total;
        }

      }
      if (e.data.key == '06 JUN') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalAgrupamientoIKJN24.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalAgrupamientoIKJN24.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalAgrupamientoIKJN24.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalAgrupamientoIKJN24.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalAgrupamientoIKJN24.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalAgrupamientoIKJN24.orizaba;
        }
        // if(e.summaryCells[10].length !== 0){
        // e.summaryCells[10][0].value = totalAgrupamientoIKJN24.ramosArispe;
        // }
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalAgrupamientoIKJN24.total;
        }
      }
      if (e.data.key == '07 JUL') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalAgrupamientoIKJL24.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalAgrupamientoIKJL24.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalAgrupamientoIKJL24.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalAgrupamientoIKJL24.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalAgrupamientoIKJL24.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalAgrupamientoIKJL24.orizaba;
        }
        // if(e.summaryCells[10].length !== 0){
        // e.summaryCells[10][0].value = totalAgrupamientoIKJL24.ramosArispe;
        // }
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalAgrupamientoIKJL24.total;
        }
      }
      if (e.data.key == '08 AGO') {
          if(e.summaryCells[4].length !== 0){
          e.summaryCells[4][0].value = totalAgrupamientoIKAG24.cuautitlan;
          }

          if(e.summaryCells[5].length !== 0){
          e.summaryCells[5][0].value = totalAgrupamientoIKAG24.tultitlan;
          }
        
          if(e.summaryCells[6].length !== 0){
          e.summaryCells[6][0].value = totalAgrupamientoIKAG24.guadalajara;
          }
        
          if(e.summaryCells[7].length !== 0){
          e.summaryCells[7][0].value = totalAgrupamientoIKAG24.hermosillo;
          }
        
          if(e.summaryCells[8].length !== 0){
          e.summaryCells[8][0].value = totalAgrupamientoIKAG24.mexicali;
          }
        
          if(e.summaryCells[9].length !== 0){
          e.summaryCells[9][0].value = totalAgrupamientoIKAG24.orizaba;
          }
        
          // if(e.summaryCells[10].length !== 0){
          // e.summaryCells[10][0].value = totalAgrupamientoIKAG24.ramosArispe;
          // }
        
          if(e.summaryCells[10].length !== 0){
          e.summaryCells[10][0].value = totalAgrupamientoIKAG24.total;
          }
      }
      if (e.data.key == '09 SEP') {
        if(e.summaryCells[4][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKS24.cuautitlan)){
            e.summaryCells[4][0].value = 0;  
          }else{
            e.summaryCells[4][0].value = totalAgrupamientoIKS24.cuautitlan;
          }
        }
        if(e.summaryCells[5][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKS24.tultitlan)){
            e.summaryCells[5][0].value = 0;  
          }else{
            e.summaryCells[5][0].value = totalAgrupamientoIKS24.tultitlan;
          }
        }
        if(e.summaryCells[6][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKS24.guadalajara)){
            e.summaryCells[6][0].value = 0;
          }else{
            e.summaryCells[6][0].value = totalAgrupamientoIKS24.guadalajara;
          }
        }
        if(e.summaryCells[7][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKS24.hermosillo)){
            e.summaryCells[7][0].value = 0;
          }else{
            e.summaryCells[7][0].value = totalAgrupamientoIKS24.hermosillo;
          }
        }
        if(e.summaryCells[8][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKS24.mexicali)){
            e.summaryCells[8][0].value = 0;
          }else{
            e.summaryCells[8][0].value = totalAgrupamientoIKS24.mexicali;
          }
        }
        if(e.summaryCells[9][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKS24.orizaba)){
            e.summaryCells[9][0].value = 0;
          }else{
            e.summaryCells[9][0].value = totalAgrupamientoIKS24.orizaba;
          }
        }
        // if(e.summaryCells[10][0].length !== 0){
        //   if(Number.isNaN(totalAgrupamientoIKS24.ramosArispe)){
        //     e.summaryCells[10][0].value = 0;
        //   }else{
        //     e.summaryCells[10][0].value = totalAgrupamientoIKS24.ramosArispe;
        //   }
        // }
        if(e.summaryCells[10][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKS24.total)){
            e.summaryCells[10][0].value = 0;
          }else{
            e.summaryCells[10][0].value = totalAgrupamientoIKS24.total;
          }
        }
      }
      if (e.data.key == '10 OCT') {
        if(e.summaryCells[4][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKOC24.cuautitlan)){
            e.summaryCells[4][0].value = 0;
          }else{
            e.summaryCells[4][0].value = totalAgrupamientoIKOC24.cuautitlan;
          }
        }
        if(e.summaryCells[5][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKOC24.tultitlan)){
            e.summaryCells[5][0].value = 0;
          }else{
            e.summaryCells[5][0].value = totalAgrupamientoIKOC24.tultitlan;
          }
        }
        if(e.summaryCells[6][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKOC24.guadalajara)){
            e.summaryCells[6][0].value = 0;
          }else{
            e.summaryCells[6][0].value = totalAgrupamientoIKOC24.guadalajara;
          }
        }
        if(e.summaryCells[7][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKOC24.hermosillo)){
            e.summaryCells[7][0].value = 0;
          }else{
            e.summaryCells[7][0].value = totalAgrupamientoIKOC24.hermosillo;
          }
        }
        if(e.summaryCells[8][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKOC24.mexicali)){
            e.summaryCells[8][0].value = 0;
          }else{
            e.summaryCells[8][0].value = totalAgrupamientoIKOC24.mexicali;
          }
        }
        if(e.summaryCells[9][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKOC24.orizaba)){
            e.summaryCells[9][0].value = 0;
          }{
            e.summaryCells[9][0].value = totalAgrupamientoIKOC24.orizaba;
          }
        }
        // if(e.summaryCells[10][0].length !== 0){
        //   if(Number.isNaN(totalAgrupamientoIKOC24.ramosArispe)){
        //     e.summaryCells[10][0].value = 0;
        //   }else{
        //     e.summaryCells[10][0].value = totalAgrupamientoIKOC24.ramosArispe;
        //   }
        // }
        if(e.summaryCells[10][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKOC24.total)){
            e.summaryCells[10][0].value = 0;
          }else{
            e.summaryCells[10][0].value = totalAgrupamientoIKOC24.total;
          }
        }

      }
      if (e.data.key == '11 NOV') {
        if(e.summaryCells[4][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKNV24.cuautitlan)){
            e.summaryCells[4][0].value = 0;
          }else{
            e.summaryCells[4][0].value = totalAgrupamientoIKNV24.cuautitlan;
          }
        }
        if(e.summaryCells[5][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKNV24.tultitlan)){
            e.summaryCells[5][0].value = 0;
          }else{
            e.summaryCells[5][0].value = totalAgrupamientoIKNV24.tultitlan;
          }
        }
        if(e.summaryCells[6][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKNV24.guadalajara)){
            e.summaryCells[6][0].value = 0;
          }else{
            e.summaryCells[6][0].value = totalAgrupamientoIKNV24.guadalajara;
          }
        }
        if(e.summaryCells[7][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKNV24.hermosillo)){
            e.summaryCells[7][0].value = 0;
          }else{
            e.summaryCells[7][0].value = totalAgrupamientoIKNV24.hermosillo;
          }
        }
        if(e.summaryCells[8][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKNV24.mexicali)){
            e.summaryCells[8][0].value = 0;
          }else{
            e.summaryCells[8][0].value = totalAgrupamientoIKNV24.mexicali;
          }
        }
        if(e.summaryCells[9][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKNV24.orizaba)){
            e.summaryCells[9][0].value = 0;
          }else{
            e.summaryCells[9][0].value = totalAgrupamientoIKNV24.orizaba;
          }
        }
        // if(e.summaryCells[10][0].length !== 0){
        //   if(Number.isNaN(totalAgrupamientoIKNV24.ramosArispe)){
        //     e.summaryCells[10][0].value = 0;
        //   }else{
        //     e.summaryCells[10][0].value = totalAgrupamientoIKNV24.ramosArispe;
        //   }
        // }
        if(e.summaryCells[10][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKNV24.total)){
            e.summaryCells[10][0].value = 0;
          }else{
            e.summaryCells[10][0].value = totalAgrupamientoIKNV24.total;
          }
        }
      }
      if (e.data.key == '12 DIC') {
        if(e.summaryCells[4][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKDC24.cuautitlan)){
            e.summaryCells[4][0].value = 0;
          }else{
            e.summaryCells[4][0].value = totalAgrupamientoIKDC24.cuautitlan;
          }
        }
        if(e.summaryCells[5][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKDC24.tultitlan)){
            e.summaryCells[5][0].value = 0;
          }else{
            e.summaryCells[5][0].value = totalAgrupamientoIKDC24.tultitlan;
          }
        }
        if(e.summaryCells[6][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKDC24.guadalajara)){
            e.summaryCells[6][0].value = 0;
          }else{
            e.summaryCells[6][0].value = totalAgrupamientoIKDC24.guadalajara;
          }
        }
        if(e.summaryCells[7][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKDC24.hermosillo)){
            e.summaryCells[7][0].value = 0;
          }else{
            e.summaryCells[7][0].value = totalAgrupamientoIKDC24.hermosillo;
          }
        }
        if(e.summaryCells[8][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKDC24.mexicali)){
            e.summaryCells[8][0].value = 0;
          }else{
            e.summaryCells[8][0].value = totalAgrupamientoIKDC24.mexicali;
          }
        }
        if(e.summaryCells[9][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKDC24.orizaba)){
            e.summaryCells[9][0].value = 0;
          }else{
            e.summaryCells[9][0].value = totalAgrupamientoIKDC24.orizaba;
          }
        }
        // if(e.summaryCells[10][0].length !== 0){
        //   if(Number.isNaN(totalAgrupamientoIKDC24.ramosArispe)){
        //     e.summaryCells[10][0].value = 0;
        //   }else{
        //     e.summaryCells[10][0].value = totalAgrupamientoIKDC24.ramosArispe;
        // }
        // }
        if(e.summaryCells[10][0].length !== 0){
          if(Number.isNaN(totalAgrupamientoIKDC24.total)){
            e.summaryCells[10][0].value = 0;
          }else{
            e.summaryCells[10][0].value = totalAgrupamientoIKDC24.total;
          }
        }

      }
     
    }

    this.paginacion = 60;
    if(this.paginacion = 60){
      this.expandGroup = false
    }
  }
  onCellPreparedIK2024(e){
    if (e.rowType == 'group'){

      e.cellElement.style.fontSize = '12px';
      e.cellElement.style.background = "#DCDCDC";

    }

    if (e.rowType == 'totalFooter') {
   
      e.totalItem.cells.forEach((c: any) => {
        if(c.totalItem.summaryCells[4][0]?.value != undefined){
          c.totalItem.summaryCells[4][0].value = totalOperacionIK24.cuautitlan;
        }
        if(c.totalItem.summaryCells[5][0]?.value != undefined){
          c.totalItem.summaryCells[5][0].value = totalOperacionIK24.tultitlan;
        }
        if(c.totalItem.summaryCells[6][0]?.value != undefined){
          c.totalItem.summaryCells[6][0].value = totalOperacionIK24.guadalajara;
        }
        if(c.totalItem.summaryCells[7][0]?.value != undefined){
          c.totalItem.summaryCells[7][0].value = totalOperacionIK24.hermosillo;          
        }
        if(c.totalItem.summaryCells[8][0]?.value != undefined){
          c.totalItem.summaryCells[8][0].value = totalOperacionIK24.mexicali;
        }
        if(c.totalItem.summaryCells[9][0]?.value != undefined){
          c.totalItem.summaryCells[9][0].value = totalOperacionIK24.orizaba;
        }
        // if(c.totalItem.summaryCells[10][0]?.value != undefined){
        //   c.totalItem.summaryCells[10][0].value = totalOperacionIK24.ramosArispe;
        // }
        if(c.totalItem.summaryCells[10][0]?.value != undefined){
          c.totalItem.summaryCells[10][0].value = totalOperacionIK24.total;
        }

        if (c.cellElement) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "16px";
            c.cellElement.style.background = "#ff9460";
            c.cellElement.style.color = "black"; 
        }   
      });
    }
  }
//==============================VIAJES KILOMETROS 2024=================================
  onRowPreparedKV2024(e){

    if (e.rowType == 'group'){

      if(e.isExpanded == true){
        this.collapseGroup == true
      }


      if (e.data.key == '01 ENE') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalKVCE24.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalKVCE24.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalKVCE24.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalKVCE24.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalKVCE24.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalKVCE24.orizaba;
        }
        // if(e.summaryCells[10].length !== 0){
        // e.summaryCells[10][0].value = totalKVCE24.ramosArispe;
        // }
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalKVCE24.total;
        }
        
      }
      if (e.data.key == '02 FEB') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalKVCF24.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalKVCF24.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalKVCF24.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalKVCF24.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalKVCF24.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalKVCF24.orizaba;
        }
        // if(e.summaryCells[10].length !== 0){
        // e.summaryCells[10][0].value = totalKVCF24.ramosArispe;
        // }
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalKVCF24.total;
        }
      }
      if (e.data.key == '03 MAR') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalKVCM24.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalKVCM24.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalKVCM24.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalKVCM24.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalKVCM24.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalKVCM24.orizaba;
        }
        // if(e.summaryCells[10].length !== 0){
        // e.summaryCells[10][0].value = totalKVCM24.ramosArispe;
        // }
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalKVCM24.total;
        }
      }
      if (e.data.key == '04 ABR') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalKVCA24.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalKVCA24.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalKVCA24.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalKVCA24.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalKVCA24.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalKVCA24.orizaba;
        }
        // if(e.summaryCells[10].length !== 0){
        // e.summaryCells[10][0].value = totalKVCA24.ramosArispe;
        // }
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalKVCA24.total;
        }
      }
      if (e.data.key == '05 MAY') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalKVCMY24.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalKVCMY24.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalKVCMY24.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalKVCMY24.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalKVCMY24.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalKVCMY24.orizaba;
        }
        // if(e.summaryCells[10].length !== 0){
        // e.summaryCells[10][0].value = totalKVCMY24.ramosArispe;
        // }
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalKVCMY24.total;
        }
      }
      if (e.data.key == '06 JUN') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalKVCJN24.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalKVCJN24.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalKVCJN24.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalKVCJN24.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalKVCJN24.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalKVCJN24.orizaba;
        }
        // if(e.summaryCells[10].length !== 0){
        // e.summaryCells[10][0].value = totalKVCJN24.ramosArispe;
        // }
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalKVCJN24.total;
        }
      }
      if (e.data.key == '07 JUL') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalKVCJL24.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalKVCJL24.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalKVCJL24.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalKVCJL24.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalKVCJL24.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalKVCJL24.orizaba;
        }
        // if(e.summaryCells[10].length !== 0){
        // e.summaryCells[10][0].value = totalKVCJL24.ramosArispe;
        // }
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalKVCJL24.total;
        }
      }
      if (e.data.key == '08 AGO') {
          if(e.summaryCells[4].length !== 0){
          e.summaryCells[4][0].value = totalKVCAG24.cuautitlan;
          }
          if(e.summaryCells[5].length !== 0){
          e.summaryCells[5][0].value = totalKVCAG24.tultitlan; 
          }         
          if(e.summaryCells[6].length !== 0){
          e.summaryCells[6][0].value = totalKVCAG24.guadalajara;    
          }      
          if(e.summaryCells[7].length !== 0){
          e.summaryCells[7][0].value = totalKVCAG24.hermosillo;
          }
          if(e.summaryCells[8].length !== 0){
          e.summaryCells[8][0].value = totalKVCAG24.mexicali;
          }
          if(e.summaryCells[9].length !== 0){
          e.summaryCells[9][0].value = totalKVCAG24.orizaba;   
          }       
          // if(e.summaryCells[10].length !== 0){
          // e.summaryCells[10][0].value = totalKVCAG24.ramosArispe; 
          // }         
          if(e.summaryCells[10].length !== 0){
          e.summaryCells[10][0].value = totalKVCAG24.total;   
          }       
      }
      if (e.data.key == '09 SEP') {
        if(e.summaryCells[4][0].length !== 0){
          if(Number.isNaN(totalKVCS24.cuautitlan)){
            e.summaryCells[4][0].value = 0;
          }else{
            e.summaryCells[4][0].value = totalKVCS24.cuautitlan;
          }
        }
        if(e.summaryCells[5][0].length !== 0){
          if(Number.isNaN(totalKVCS24.tultitlan)){
            e.summaryCells[5][0].value = 0;
          }else{
            e.summaryCells[5][0].value = totalKVCS24.tultitlan;
          }
        }
        if(e.summaryCells[6][0].length !== 0){
          if(Number.isNaN(totalKVCS24.guadalajara)){
            e.summaryCells[6][0].value = 0;
          }else{
            e.summaryCells[6][0].value = totalKVCS24.guadalajara;
          }
        }
        if(e.summaryCells[7][0].length !== 0){
          if(Number.isNaN(totalKVCS24.hermosillo)){
            e.summaryCells[7][0].value = 0;  
          }else{
            e.summaryCells[7][0].value = totalKVCS24.hermosillo;
          }
        }
        if(e.summaryCells[8][0].length !== 0){
          if(Number.isNaN(totalKVCS24.mexicali)){
            e.summaryCells[8][0].value = 0;
          }else{
            e.summaryCells[8][0].value = totalKVCS24.mexicali;
          }
        }
        if(e.summaryCells[9][0].value.length !== 0){
          if(Number.isNaN(totalKVCS24.orizaba)){
            e.summaryCells[9][0].value = 0;
          }else{
            e.summaryCells[9][0].value = totalKVCS24.orizaba;
          }
        }
        // if(e.summaryCells[10][0].length !== 0){
        //   if(Number.isNaN(totalKVCS24.ramosArispe)){
        //     e.summaryCells[10][0].value = 0;  
        //   }else{
        //     e.summaryCells[10][0].value = totalKVCS24.ramosArispe;
        //   }
        // }
        if(e.summaryCells[10][0].length !== 0){
          if(Number.isNaN(totalKVCS24.total)){
            e.summaryCells[10][0].value = 0;
          }else{
            e.summaryCells[10][0].value = totalKVCS24.total;
          }
        }
      }
      if (e.data.key == '10 OCT') {
        if(e.summaryCells[4][0].length !== 0){
          if(Number.isNaN(totalKVCOC24.cuautitlan)){
            e.summaryCells[4][0].value = 0;
          }else{
            e.summaryCells[4][0].value = totalKVCOC24.cuautitlan;
          }
        }
        if(e.summaryCells[5][0].length !== 0){
          if(Number.isNaN(totalKVCOC24.tultitlan)){
            e.summaryCells[5][0].value = 0;
          }else{
            e.summaryCells[5][0].value = totalKVCOC24.tultitlan;
          }
        }
        if(e.summaryCells[6][0].length !== 0){
          if(Number.isNaN(totalKVCOC24.guadalajara)){
            e.summaryCells[6][0].value = 0;
          }else{
            e.summaryCells[6][0].value = totalKVCOC24.guadalajara;
          }
        }
        if(e.summaryCells[7][0].length !== 0){
          if(Number.isNaN(totalKVCOC24.hermosillo)){
            e.summaryCells[7][0].value = 0;
          }else{
            e.summaryCells[7][0].value = totalKVCOC24.hermosillo;
          }
        }
        if(e.summaryCells[8][0].length !== 0){
          if(Number.isNaN(totalKVCOC24.mexicali)){
            e.summaryCells[8][0].value = 0;
          }else{
            e.summaryCells[8][0].value = totalKVCOC24.mexicali;
          }
        }
        if(e.summaryCells[9][0].length !== 0){
          if(Number.isNaN(totalKVCOC24.orizaba)){
            e.summaryCells[9][0].value = 0;
          }else{
            e.summaryCells[9][0].value = totalKVCOC24.orizaba;
          }
        }
        // if(e.summaryCells[10][0].length !== 0){
        //   if(Number.isNaN(totalKVCOC24.ramosArispe)){
        //     e.summaryCells[10][0].value = 0;
        //   }else{
        //     e.summaryCells[10][0].value = totalKVCOC24.ramosArispe;
        //   }
        // }
        if(e.summaryCells[10][0].length !== 0){
          if(Number.isNaN(totalKVCOC24.total)){
            e.summaryCells[10][0].value = 0;
          }else{
            e.summaryCells[10][0].value = totalKVCOC24.total;
          }
        }

      }
      if (e.data.key == '11 NOV') {
        if(e.summaryCells[4][0].length !== 0){
          if(Number.isNaN(totalKVCNV24.cuautitlan)){
            e.summaryCells[4][0].value = 0;
          }else{
            e.summaryCells[4][0].value = totalKVCNV24.cuautitlan;
          }
        }
        if(e.summaryCells[5][0].length !== 0){
          if(Number.isNaN(totalKVCNV24.tultitlan)){
            e.summaryCells[5][0].value = 0;
          }else{
            e.summaryCells[5][0].value = totalKVCNV24.tultitlan;
          }
        }
        if(e.summaryCells[6][0].length !== 0){
          if(Number.isNaN(totalKVCNV24.guadalajara)){
            e.summaryCells[6][0].value = 0;
          }else{
            e.summaryCells[6][0].value = totalKVCNV24.guadalajara;
          }
        }
        if(e.summaryCells[7][0].length !== 0){
          if(Number.isNaN(totalKVCNV24.hermosillo)){
            e.summaryCells[7][0].value = 0;
          }else{
            e.summaryCells[7][0].value = totalKVCNV24.hermosillo;
          }
        }
        if(e.summaryCells[8][0].length !== 0){
          if(Number.isNaN(totalKVCNV24.mexicali)){
            e.summaryCells[8][0].value = 0;
          }else{
            e.summaryCells[8][0].value = totalKVCNV24.mexicali;
          }
        }
        if(e.summaryCells[9][0].length !== 0){
          if(Number.isNaN(totalKVCNV24.orizaba)){
            e.summaryCells[9][0].value = 0;
          }else{
            e.summaryCells[9][0].value = totalKVCNV24.orizaba;
          }
        }
        // if(e.summaryCells[10][0].length !== 0){
        //   if(Number.isNaN(totalKVCNV24.ramosArispe)){
        //     e.summaryCells[10][0].value = 0;
        //   }else{
        //     e.summaryCells[10][0].value = totalKVCNV24.ramosArispe;
        //   }
        // }
        if(e.summaryCells[10][0].length !== 0){
          if(Number.isNaN(totalKVCNV24.total)){
            e.summaryCells[10][0].value = 0;
          }else{
            e.summaryCells[10][0].value = totalKVCNV24.total;
          }
        }

      }
      if (e.data.key == '12 DIC') {
        if(e.summaryCells[4][0].length !== 0){
          if(Number.isNaN(totalKVCDC24.cuautitlan)){
            e.summaryCells[4][0].value = 0;
          }else{
            e.summaryCells[4][0].value = totalKVCDC24.cuautitlan;
          }
        }
        if(e.summaryCells[5][0].length !== 0){
          if(Number.isNaN(totalKVCDC24.tultitlan)){
            e.summaryCells[5][0].value = 0;
          }else{
            e.summaryCells[5][0].value = totalKVCDC24.tultitlan;
          }
        }
        if(e.summaryCells[6][0].length !== 0){
          if(Number.isNaN(totalKVCDC24.guadalajara)){
            e.summaryCells[6][0].value = 0;
          }else{
            e.summaryCells[6][0].value = totalKVCDC24.guadalajara;
          }
        }
        if(e.summaryCells[7][0].length !== 0){
          if(Number.isNaN(totalKVCDC24.hermosillo)){
            e.summaryCells[7][0].value = 0;
          }else{
            e.summaryCells[7][0].value = totalKVCDC24.hermosillo;
          }
        }
        if(e.summaryCells[8][0].length !== 0){
          if(Number.isNaN(totalKVCDC24.mexicali)){
            e.summaryCells[8][0].value = 0;
          }else{
            e.summaryCells[8][0].value = totalKVCDC24.mexicali;
          }
          }
        if(e.summaryCells[9][0].length !== 0){
          if(Number.isNaN(totalKVCDC24.orizaba)){
            e.summaryCells[9][0].value = 0;
          }else{
            e.summaryCells[9][0].value = totalKVCDC24.orizaba;
          }
        }
        // if(e.summaryCells[10][0].length !== 0){
        //   if(Number.isNaN(totalKVCDC24.ramosArispe)){
        //     e.summaryCells[10][0].value = 0;
        //   }else{
        //     e.summaryCells[10][0].value = totalKVCDC24.ramosArispe;
        //   }
        // }
        if(e.summaryCells[10][0].length !== 0){
          if(Number.isNaN(totalKVCDC24.total)){
            e.summaryCells[10][0].value = 0;
          }else{
            e.summaryCells[10][0].value = totalKVCDC24.total;
          }
        }

      }

    }

    this.paginacionKV = 60;
    if(this.paginacionKV = 60){
      this.expandGroupKV = false
    }
  }

  onCellPreparedKV2024(e){
    if (e.rowType == 'group'){

      e.cellElement.style.fontSize = '12px';
      e.cellElement.style.background = "#DCDCDC";

    }

    if (e.rowType == 'totalFooter') {
  
      e.totalItem.cells.forEach((c: any) => {

        if(c.totalItem.summaryCells[4][0]?.value != undefined){
          c.totalItem.summaryCells[4][0].value = totalOperacionKVC24.cuautitlan;
        }

        if(c.totalItem.summaryCells[5][0]?.value != undefined){
          c.totalItem.summaryCells[5][0].value = totalOperacionKVC24.tultitlan;
        }

        if(c.totalItem.summaryCells[6][0]?.value != undefined){
          c.totalItem.summaryCells[6][0].value = totalOperacionKVC24.guadalajara;
        }

        if(c.totalItem.summaryCells[7][0]?.value != undefined){
          c.totalItem.summaryCells[7][0].value = totalOperacionKVC24.hermosillo;          
        }

        if(c.totalItem.summaryCells[8][0]?.value != undefined){
          c.totalItem.summaryCells[8][0].value = totalOperacionKVC24.mexicali;
        }

        if(c.totalItem.summaryCells[9][0]?.value != undefined){
          c.totalItem.summaryCells[9][0].value = totalOperacionKVC24.orizaba;
        }
        // if(c.totalItem.summaryCells[10][0]?.value != undefined){
        //   c.totalItem.summaryCells[10][0].value = totalOperacionKVC24.ramosArispe;
        // }

        if(c.totalItem.summaryCells[10][0]?.value != undefined){
          c.totalItem.summaryCells[10][0].value = totalOperacionKVC24.total;
        }

        if (c.cellElement) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "16px";
            c.cellElement.style.background = "#ff9460";
            c.cellElement.style.color = "black"; 
        }   
      });
    }
  }
  customizeKV2024(e) {  

    var gridCell = e.gridCell;
    if (gridCell.rowType === 'group') {
      
      e.backgroundColor = "#DCDCDC";
      e.fontWeight = "bolder"
      e.font = {bold: true}

  }

  if (gridCell.rowType === 'totalFooter') {
      
    e.backgroundColor = "#ff9460";
    e.fontWeight = "bolder"
    e.font = {bold: true}

  }
  }

  customizeExportDataKV2024(cols, rows){

    rows.forEach((row: any) =>{  
      
      var rowValues =  row.values;  
      

      if(row.rowType == "group"){
        if(row.key[0] == '01 ENE'){

          rowValues[3][0].value = totalKVCE24.cuautitlan;
          rowValues[4][0].value = totalKVCE24.tultitlan;
          rowValues[5][0].value = totalKVCE24.guadalajara;
          rowValues[6][0].value = totalKVCE24.hermosillo;
          rowValues[7][0].value = totalKVCE24.mexicali;
          rowValues[8][0].value = totalKVCE24.orizaba;
          // rowValues[9][0].value = totalKVCE.ramosArispe;
          rowValues[9][0].value = totalKVCE24.total;
        }
        if(row.key[0] == '02 FEB'){

          rowValues[3][0].value = totalKVCF24.cuautitlan;
          rowValues[4][0].value = totalKVCF24.tultitlan;
          rowValues[5][0].value = totalKVCF24.guadalajara;
          rowValues[6][0].value = totalKVCF24.hermosillo;
          rowValues[7][0].value = totalKVCF24.mexicali;
          rowValues[8][0].value = totalKVCF24.orizaba;
          // rowValues[9][0].value = totalKVCF.ramosArispe;
          rowValues[9][0].value = totalKVCF24.total;
        }
        if(row.key[0] == '03 MAR'){

          rowValues[3][0].value = totalKVCM24.cuautitlan;
          rowValues[4][0].value = totalKVCM24.tultitlan;
          rowValues[5][0].value = totalKVCM24.guadalajara;
          rowValues[6][0].value = totalKVCM24.hermosillo;
          rowValues[7][0].value = totalKVCM24.mexicali;
          rowValues[8][0].value = totalKVCM24.orizaba;
          // rowValues[9][0].value = totalKVCM.ramosArispe;
          rowValues[9][0].value = totalKVCM24.total;
        }
        if(row.key[0] == '04 ABR'){

          rowValues[3][0].value = totalKVCA24.cuautitlan;
          rowValues[4][0].value = totalKVCA24.tultitlan;
          rowValues[5][0].value = totalKVCA24.guadalajara;
          rowValues[6][0].value = totalKVCA24.hermosillo;
          rowValues[7][0].value = totalKVCA24.mexicali;
          rowValues[8][0].value = totalKVCA24.orizaba;
          // rowValues[9][0].value = totalKVCA.ramosArispe;
          rowValues[9][0].value = totalKVCA24.total;
        }
        if(row.key[0] == '05 MAY'){

          rowValues[3][0].value = totalKVCMY24.cuautitlan;
          rowValues[4][0].value = totalKVCMY24.tultitlan;
          rowValues[5][0].value = totalKVCMY24.guadalajara;
          rowValues[6][0].value = totalKVCMY24.hermosillo;
          rowValues[7][0].value = totalKVCMY24.mexicali;
          rowValues[8][0].value = totalKVCMY24.orizaba;
          // rowValues[9][0].value = totalKVCMY.ramosArispe;
          rowValues[9][0].value = totalKVCMY24.total;
        }
        if(row.key[0] == '06 JUN'){

          rowValues[3][0].value = totalKVCJN24.cuautitlan;
          rowValues[4][0].value = totalKVCJN24.tultitlan;
          rowValues[5][0].value = totalKVCJN24.guadalajara;
          rowValues[6][0].value = totalKVCJN24.hermosillo;
          rowValues[7][0].value = totalKVCJN24.mexicali;
          rowValues[8][0].value = totalKVCJN24.orizaba;
          // rowValues[9][0].value = totalKVCJN24.ramosArispe;
          rowValues[9][0].value = totalKVCJN24.total;
        }
        if(row.key[0] == '07 JUL'){

          rowValues[3][0].value = totalKVCJL.cuautitlan;
          rowValues[4][0].value = totalKVCJL.tultitlan;
          rowValues[5][0].value = totalKVCJL.guadalajara;
          rowValues[6][0].value = totalKVCJL.hermosillo;
          rowValues[7][0].value = totalKVCJL.mexicali;
          rowValues[8][0].value = totalKVCJL.orizaba;
          // rowValues[9][0].value = totalKVCJL.ramosArispe;
          rowValues[9][0].value = totalKVCJL.total;

        }
        if(row.key[0] == '08 AGO'){

          rowValues[3][0].value = totalKVCAG.cuautitlan;
          rowValues[4][0].value = totalKVCAG.tultitlan;
          rowValues[5][0].value = totalKVCAG.guadalajara;
          rowValues[6][0].value = totalKVCAG.hermosillo;
          rowValues[7][0].value = totalKVCAG.mexicali;
          rowValues[8][0].value = totalKVCAG.orizaba;
          // rowValues[9][0].value = totalKVCAG.ramosArispe;
          rowValues[9][0].value = totalKVCAG.total;

        }
        if(row.key[0] == '09 SEP'){

          rowValues[3][0].value = totalKVCS.cuautitlan;
          rowValues[4][0].value = totalKVCS.tultitlan;
          rowValues[5][0].value = totalKVCS.guadalajara;
          rowValues[6][0].value = totalKVCS.hermosillo;
          rowValues[7][0].value = totalKVCS.mexicali;
          rowValues[8][0].value = totalKVCS.orizaba;
          // rowValues[9][0].value = totalKVCS.ramosArispe;
          rowValues[9][0].value = totalKVCS.total;

        }
        if(row.key[0] == '10 OCT'){

          rowValues[3][0].value = totalKVCOC.cuautitlan;
          rowValues[4][0].value = totalKVCOC.tultitlan;
          rowValues[5][0].value = totalKVCOC.guadalajara;
          rowValues[6][0].value = totalKVCOC.hermosillo;
          rowValues[7][0].value = totalKVCOC.mexicali;
          rowValues[8][0].value = totalKVCOC.orizaba;
          // rowValues[9][0].value = totalKVCOC.ramosArispe;
          rowValues[9][0].value = totalKVCOC.total;

        }

        if(row.key[0] == '11 NOV'){

          rowValues[3][0].value = totalKVCNV.cuautitlan;
          rowValues[4][0].value = totalKVCNV.tultitlan;
          rowValues[5][0].value = totalKVCNV.guadalajara;
          rowValues[6][0].value = totalKVCNV.hermosillo;
          rowValues[7][0].value = totalKVCNV.mexicali;
          rowValues[8][0].value = totalKVCNV.orizaba;
          // rowValues[9][0].value = totalKVCNV.ramosArispe;
          rowValues[9][0].value = totalKVCNV.total;

        }
        if(row.key[0] == '12 NOV'){

          rowValues[3][0].value = totalKVCDC.cuautitlan;
          rowValues[4][0].value = totalKVCDC.tultitlan;
          rowValues[5][0].value = totalKVCDC.guadalajara;
          rowValues[6][0].value = totalKVCDC.hermosillo;
          rowValues[7][0].value = totalKVCDC.mexicali;
          rowValues[8][0].value = totalKVCDC.orizaba;
          // rowValues[9][0].value = totalKVCDC.ramosArispe;
          rowValues[9][0].value = totalKVCDC.total;

        }
      }

      if(row.rowType == "totalFooter"){
        

        row.values[3].value = totalOperacionKVC.cuautitlan;
        row.values[4].value = totalOperacionKVC.tultitlan;
        row.values[5].value = totalOperacionKVC.guadalajara;
        row.values[6].value = totalOperacionKVC.hermosillo;
        row.values[7].value = totalOperacionKVC.mexicali;
        row.values[8].value = totalOperacionKVC.orizaba;
        // row.values[9].value = totalOperacionKVC.ramosArispe;
        row.values[9].value = totalOperacionKVC.total;


      }

    });

  }
//==============================INGRESO VIAJES 2024=================================
  onRowPreparedIV2024(e){
    if (e.rowType == 'group'){

      if(e.isExpanded == true){
        this.collapseGroup == true
      }


      if (e.data.key == '01 ENE') {
        if(e.summaryCells[4].length !== 0){
          e.summaryCells[4][0].value = totalIVCE24.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
          e.summaryCells[5][0].value = totalIVCE24.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
          e.summaryCells[6][0].value = totalIVCE24.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
          e.summaryCells[7][0].value = totalIVCE24.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
          e.summaryCells[8][0].value = totalIVCE24.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
          e.summaryCells[9][0].value = totalIVCE24.orizaba;
        }
        // if(e.summaryCells[10].length !== 0){
        //   e.summaryCells[10][0].value = totalIVCE24.ramosArispe;
        // }
        if(e.summaryCells[10].length !== 0){
          e.summaryCells[10][0].value = totalIVCE24.total;
        }

      }
      if (e.data.key == '02 FEB') {
        if(e.summaryCells[4].length !== 0){
          e.summaryCells[4][0].value = totalIVCF24.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
          e.summaryCells[5][0].value = totalIVCF24.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
          e.summaryCells[6][0].value = totalIVCF24.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
          e.summaryCells[7][0].value = totalIVCF24.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
          e.summaryCells[8][0].value = totalIVCF24.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
          e.summaryCells[9][0].value = totalIVCF24.orizaba;
        }
        // if(e.summaryCells[10].length !== 0){
        //   e.summaryCells[10][0].value = totalIVCF24.ramosArispe;
        // }
        if(e.summaryCells[10].length !== 0){
          e.summaryCells[10][0].value = totalIVCF24.total;
        }
      }
      if (e.data.key == '03 MAR') {
        if(e.summaryCells[4].length !== 0){
          e.summaryCells[4][0].value = totalIVCM24.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
          e.summaryCells[5][0].value = totalIVCM24.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
          e.summaryCells[6][0].value = totalIVCM24.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
          e.summaryCells[7][0].value = totalIVCM24.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
          e.summaryCells[8][0].value = totalIVCM24.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
          e.summaryCells[9][0].value = totalIVCM24.orizaba;
        }
        // if(e.summaryCells[10].length !== 0){
        //   e.summaryCells[10][0].value = totalIVCM24.ramosArispe;
        // }
        if(e.summaryCells[10].length !== 0){
          e.summaryCells[10][0].value = totalIVCM24.total;
        }
      }
      if (e.data.key == '04 ABR') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalIVCA24.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalIVCA24.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalIVCA24.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalIVCA24.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalIVCA24.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalIVCA24.orizaba;
        }
        // if(e.summaryCells[10].length !== 0){
        // e.summaryCells[10][0].value = totalIVCA24.ramosArispe;
        // }
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalIVCA24.total;
        }
      }
      if (e.data.key == '05 MAY') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalIVCMY24.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalIVCMY24.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalIVCMY24.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalIVCMY24.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalIVCMY24.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalIVCMY24.orizaba;
        }
        // if(e.summaryCells[10].length !== 0){
        // e.summaryCells[10][0].value = totalIVCMY24.ramosArispe;
        // }
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalIVCMY24.total;
        }
      }
      if (e.data.key == '06 JUN') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalIVCJN24.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalIVCJN24.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalIVCJN24.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalIVCJN24.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalIVCJN24.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalIVCJN24.orizaba;
        }
        // if(e.summaryCells[10].length !== 0){
        // e.summaryCells[10][0].value = totalIVCJN24.ramosArispe;
        // }
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalIVCJN24.total;
        }
      }
      if (e.data.key == '07 JUL') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalIVCJL24.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalIVCJL24.tultitlan;
        }
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalIVCJL24.guadalajara;
        }
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalIVCJL24.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalIVCJL24.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalIVCJL24.orizaba;
        }
        // if(e.summaryCells[10].length !== 0){
        // e.summaryCells[10][0].value = totalIVCJL24.ramosArispe;
        // }
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalIVCJL24.total;
        }


      }
      if (e.data.key == '08 AGO') {
          if(e.summaryCells[4].length !== 0){
          e.summaryCells[4][0].value = totalIVCAG24.cuautitlan;
          }
          if(e.summaryCells[5].length !== 0){
          e.summaryCells[5][0].value = totalIVCAG24.tultitlan;
          }          
          if(e.summaryCells[6].length !== 0){
          e.summaryCells[6][0].value = totalIVCAG24.guadalajara;  
          }        
          if(e.summaryCells[7].length !== 0){
          e.summaryCells[7][0].value = totalIVCAG24.hermosillo;
          }
          if(e.summaryCells[8].length !== 0){
          e.summaryCells[8][0].value = totalIVCAG24.mexicali;
          }
          if(e.summaryCells[9].length !== 0){
          e.summaryCells[9][0].value = totalIVCAG24.orizaba;
          }          
          // if(e.summaryCells[10].length !== 0){
          // e.summaryCells[10][0].value = totalIVCAG24.ramosArispe;     
          // }     
          if(e.summaryCells[10].length !== 0){
          e.summaryCells[10][0].value = totalIVCAG24.total;   
          }       
        
      }
      if (e.data.key == '09 SEP') {
        if(e.summaryCells[4][0].length !== 0){
          if(Number.isNaN(totalIVCS24.cuautitlan)){
            e.summaryCells[4][0].value = 0;
          }else{
            e.summaryCells[4][0].value = totalIVCS24.cuautitlan;
          }
        }
        if(e.summaryCells[5][0].length !== 0){
          if(Number.isNaN(totalIVCS24.tultitlan)){
            e.summaryCells[5][0].value = 0;  
          }else{
            e.summaryCells[5][0].value = totalIVCS24.tultitlan;
          }
        }
        if(e.summaryCells[6][0].length !== 0){
          if(Number.isNaN(totalIVCS24.guadalajara)){
            e.summaryCells[6][0].value = 0;
          }else{
            e.summaryCells[6][0].value = totalIVCS24.guadalajara;
          }
        }
        if(e.summaryCells[7][0].length !== 0){
          if(Number.isNaN(totalIVCS24.hermosillo)){
            e.summaryCells[7][0].value = 0;
          }else{
            e.summaryCells[7][0].value = totalIVCS24.hermosillo;
          }
        }
        if(e.summaryCells[8][0].length !== 0){
          if(Number.isNaN(totalIVCS24.mexicali)){
            e.summaryCells[8][0].value = 0;  
          }else{
            e.summaryCells[8][0].value = totalIVCS24.mexicali;
          }
        }
        if(e.summaryCells[9][0].length !== 0){
          if(Number.isNaN(totalIVCS24.orizaba)){
            e.summaryCells[9][0].value = 0;
          }else{
            e.summaryCells[9][0].value = totalIVCS24.orizaba;
          }
        }
        // if(e.summaryCells[10][0].length !== 0){
        //   if(Number.isNaN(totalIVCS24.ramosArispe)){
        //     e.summaryCells[10][0].value = 0;
        //   }else{
        //     e.summaryCells[10][0].value = totalIVCS24.ramosArispe;
        //   }
        // }
        if(e.summaryCells[10][0].length !== 0){
          if(Number.isNaN(totalIVCS24.total)){
            e.summaryCells[10][0].value = 0;  
          }else{
            e.summaryCells[10][0].value = totalIVCS24.total;
          }
        }
      }
      if (e.data.key == '10 OCT') {
        if(e.summaryCells[4][0].length !== 0){
          if(Number.isNaN(totalIVCOC24.cuautitlan)){
            e.summaryCells[4][0].value = 0;
          }else{
            e.summaryCells[4][0].value = totalIVCOC24.cuautitlan;
          }
        }
        if(e.summaryCells[5][0].length !== 0){
          if(Number.isNaN(totalIVCOC24.tultitlan)){
            e.summaryCells[5][0].value = 0;
          }else{
            e.summaryCells[5][0].value = totalIVCOC24.tultitlan;
          }
        }
        if(e.summaryCells[6][0].length !== 0){
          if(Number.isNaN(totalIVCOC24.guadalajara)){
            e.summaryCells[6][0].value = 0;
          }else{
            e.summaryCells[6][0].value = totalIVCOC24.guadalajara;
          }
        }
        if(e.summaryCells[7][0].length !== 0){
          if(Number.isNaN(totalIVCOC24.hermosillo)){
            e.summaryCells[7][0].value = 0;
          } else{
            e.summaryCells[7][0].value = totalIVCOC24.hermosillo;
          }
        }
        if(e.summaryCells[8][0].length !== 0){
          if(Number.isNaN(totalIVCOC24.mexicali)){
            e.summaryCells[8][0].value = 0;
          }else{
            e.summaryCells[8][0].value = totalIVCOC24.mexicali;
          }
        }
        if(e.summaryCells[9][0].length !== 0){
          if(Number.isNaN(totalIVCOC24.orizaba)){
            e.summaryCells[9][0].value = 0;
          }else{
            e.summaryCells[9][0].value = totalIVCOC24.orizaba;
          }
        }
        // if(e.summaryCells[10][0].length !== 0){
        //   if(Number.isNaN(totalIVCOC24.ramosArispe)){
        //     e.summaryCells[10][0].value = 0;
        //   }else{
        //     e.summaryCells[10][0].value = totalIVCOC24.ramosArispe;
        //   }
        // }
        if(e.summaryCells[10][0].length !== 0){
          if(Number.isNaN(totalIVCOC24.total)){
            e.summaryCells[10][0].value = 0;
          }else{
            e.summaryCells[10][0].value = totalIVCOC24.total;
          }
        }
      }
      if (e.data.key == '11 NOV') {
        if(e.summaryCells[4][0].length !== 0){
          if(Number.isNaN(totalIVCNV24.cuautitlan)){
            e.summaryCells[4][0].value = 0;
          }else{
            e.summaryCells[4][0].value = totalIVCNV24.cuautitlan;
          }
        }
        if(e.summaryCells[5][0].length !== 0){
          if(Number.isNaN(totalIVCNV24.tultitlan)){
            e.summaryCells[5][0].value = 0;
          }else{
            e.summaryCells[5][0].value = totalIVCNV24.tultitlan;
          }
        }
        if(e.summaryCells[6][0].length !== 0){
          if(Number.isNaN(totalIVCNV24.guadalajara)){
            e.summaryCells[6][0].value = 0;
          }else{
            e.summaryCells[6][0].value = totalIVCNV24.guadalajara;
          }
        }
        if(e.summaryCells[7][0].length !== 0){
          if(Number.isNaN(totalIVCNV24.hermosillo)){
            e.summaryCells[7][0].value = 0;
          } else{
            e.summaryCells[7][0].value = totalIVCNV24.hermosillo;
          }
        }
        if(e.summaryCells[8][0].length !== 0){
          if(Number.isNaN(totalIVCNV24.mexicali)){
            e.summaryCells[8][0].value = 0;
          }else{
            e.summaryCells[8][0].value = totalIVCNV24.mexicali;
          }
        }
        if(e.summaryCells[9][0].length !== 0){
          if(Number.isNaN(totalIVCNV24.orizaba)){
            e.summaryCells[9][0].value = 0;
          }else{
            e.summaryCells[9][0].value = totalIVCNV24.orizaba;
          }
        }
        // if(e.summaryCells[10][0].length !== 0){
        //   if(Number.isNaN(totalIVCNV24.ramosArispe)){
        //     e.summaryCells[10][0].value = 0;
        //   }else{
        //     e.summaryCells[10][0].value = totalIVCNV24.ramosArispe;
        //   }
        // }
        if(e.summaryCells[10][0].length !== 0){
          if(Number.isNaN(totalIVCNV24.total)){
            e.summaryCells[10][0].value = 0;
          }else{
            e.summaryCells[10][0].value = totalIVCNV24.total;
          }
        }
      }
      if (e.data.key == '12 DIC') {
        if(e.summaryCells[4][0].length !== 0){
          if(Number.isNaN(totalIVCDC24.cuautitlan)){
            e.summaryCells[4][0].value = 0;
          }else{
            e.summaryCells[4][0].value = totalIVCDC24.cuautitlan;
          }
        }
      if(e.summaryCells[5][0].length !== 0){
        if(Number.isNaN(totalIVCDC24.tultitlan)){
          e.summaryCells[5][0].value = 0;
        }else{
          e.summaryCells[5][0].value = totalIVCDC24.tultitlan;
        }
      }
      if(e.summaryCells[6][0].length !== 0){
        if(Number.isNaN(totalIVCDC24.guadalajara)){
          e.summaryCells[6][0].value = 0;
        }else{
          e.summaryCells[6][0].value = totalIVCDC24.guadalajara;
        }
      }
      if(e.summaryCells[7][0].length !== 0){
        if(Number.isNaN(totalIVCDC24.hermosillo)){
          e.summaryCells[7][0].value = 0;
        }else{
          e.summaryCells[7][0].value = totalIVCDC24.hermosillo;
        }
      }
      if(e.summaryCells[8][0].length !== 0){
        if(Number.isNaN(totalIVCDC24.mexicali)){
          e.summaryCells[8][0].value = 0;
        }else{
          e.summaryCells[8][0].value = totalIVCDC24.mexicali;
        }
      }
      if(e.summaryCells[9][0].length !== 0){
        if(Number.isNaN(totalIVCDC24.orizaba)){
          e.summaryCells[9][0].value = 0;
        }else{
          e.summaryCells[9][0].value = totalIVCDC24.orizaba;
        }
      }
      // if(e.summaryCells[10][0].length !== 0){
      //   if(Number.isNaN(totalIVCDC24.ramosArispe)){
      //     e.summaryCells[10][0].value = 0;
      //   }else{
      //     e.summaryCells[10][0].value = totalIVCDC24.ramosArispe;
      //   }
      // }
      if(e.summaryCells[10][0].length !== 0){
        if(Number.isNaN(totalIVCDC24.total)){
          e.summaryCells[10][0].value = 0;
        }else{
          e.summaryCells[10][0].value = totalIVCDC24.total;
      }
    }



      }    
    
    }

    this.paginacion = 60;
    if(this.paginacion = 60){
      this.expandGroup = false
    }
  }

  onCellPreparedIV2024(e){
    if (e.rowType == 'group'){

      e.cellElement.style.fontSize = '12px';
      e.cellElement.style.background = "#DCDCDC";

    }

    if (e.rowType == 'totalFooter') {
  
      e.totalItem.cells.forEach((c: any) => {
        if(c.totalItem.summaryCells[4][0]?.value != undefined){
          c.totalItem.summaryCells[4][0].value = totalOperacionIVC24.cuautitlan;
        }

        if(c.totalItem.summaryCells[5][0]?.value != undefined){
          c.totalItem.summaryCells[5][0].value = totalOperacionIVC24.tultitlan;
        }

        if(c.totalItem.summaryCells[6][0]?.value != undefined){
          c.totalItem.summaryCells[6][0].value = totalOperacionIVC24.guadalajara;
        }

        if(c.totalItem.summaryCells[7][0]?.value != undefined){
          c.totalItem.summaryCells[7][0].value = totalOperacionIVC24.hermosillo;          
        }

        if(c.totalItem.summaryCells[8][0]?.value != undefined){
          c.totalItem.summaryCells[8][0].value = totalOperacionIVC24.mexicali;
        }

        if(c.totalItem.summaryCells[9][0]?.value != undefined){
          c.totalItem.summaryCells[9][0].value = totalOperacionIVC24.orizaba;
        }
        // if(c.totalItem.summaryCells[10][0]?.value != undefined){
        //   c.totalItem.summaryCells[10][0].value = totalOperacionIVC24.ramosArispe;
        // }

        if(c.totalItem.summaryCells[10][0]?.value != undefined){
          c.totalItem.summaryCells[10][0].value = totalOperacionIVC24.total;
        }

        if (c.cellElement) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "16px";
            c.cellElement.style.background = "#ff9460";
            c.cellElement.style.color = "black"; 
        }   
      });
    }

  }

  customizeIV2024(e){
    var gridCell = e.gridCell;
    if (gridCell.rowType === 'group') {
      
      e.backgroundColor = "#DCDCDC";
      e.fontWeight = "bolder"
      e.font = {bold: true}

    }

    if (gridCell.rowType === 'totalFooter') {

      e.backgroundColor = "#ff9460";
      e.fontWeight = "bolder"
      e.font = {bold: true}

    }
  }

  customizeExportDataIV2024(cols, rows){

    rows.forEach((row: any) =>{  
    var rowValues =  row.values;  

    if(row.rowType == "group"){
      if(row.key[0] == '01 ENE'){

        rowValues[3][0].value = totalIVCE24.cuautitlan;
        rowValues[4][0].value = totalIVCE24.tultitlan;
        rowValues[5][0].value = totalIVCE24.guadalajara;
        rowValues[6][0].value = totalIVCE24.hermosillo;
        rowValues[7][0].value = totalIVCE24.mexicali;
        rowValues[8][0].value = totalIVCE24.orizaba;
        // rowValues[9][0].value = totalIVCE.ramosArispe;
        rowValues[9][0].value = totalIVCE24.total;
      }
      if(row.key[0] == '02 FEB'){

        rowValues[3][0].value = totalIVCF24.cuautitlan;
        rowValues[4][0].value = totalIVCF24.tultitlan;
        rowValues[5][0].value = totalIVCF24.guadalajara;
        rowValues[6][0].value = totalIVCF24.hermosillo;
        rowValues[7][0].value = totalIVCF24.mexicali;
        rowValues[8][0].value = totalIVCF24.orizaba;
        // rowValues[9][0].value = totalIVCF.ramosArispe;
        rowValues[9][0].value = totalIVCF24.total;
      }
      if(row.key[0] == '03 MAR'){

        rowValues[3][0].value = totalIVCM24.cuautitlan;
        rowValues[4][0].value = totalIVCM24.tultitlan;
        rowValues[5][0].value = totalIVCM24.guadalajara;
        rowValues[6][0].value = totalIVCM24.hermosillo;
        rowValues[7][0].value = totalIVCM24.mexicali;
        rowValues[8][0].value = totalIVCM24.orizaba;
        // rowValues[9][0].value = totalIVCM.ramosArispe;
        rowValues[9][0].value = totalIVCM24.total;
      }
      if(row.key[0] == '04 ABR'){

        rowValues[3][0].value = totalIVCA24.cuautitlan;
        rowValues[4][0].value = totalIVCA24.tultitlan;
        rowValues[5][0].value = totalIVCA24.guadalajara;
        rowValues[6][0].value = totalIVCA24.hermosillo;
        rowValues[7][0].value = totalIVCA24.mexicali;
        rowValues[8][0].value = totalIVCA24.orizaba;
        // rowValues[9][0].value = totalIVCA.ramosArispe;
        rowValues[9][0].value = totalIVCA24.total;
      }
      if(row.key[0] == '05 MAY'){

        rowValues[3][0].value = totalIVCMY24.cuautitlan;
        rowValues[4][0].value = totalIVCMY24.tultitlan;
        rowValues[5][0].value = totalIVCMY24.guadalajara;
        rowValues[6][0].value = totalIVCMY24.hermosillo;
        rowValues[7][0].value = totalIVCMY24.mexicali;
        rowValues[8][0].value = totalIVCMY24.orizaba;
        // rowValues[9][0].value = totalIVCMY.ramosArispe;
        rowValues[9][0].value = totalIVCMY24.total;
      }
      if(row.key[0] == '06 JUN'){

        rowValues[3][0].value = totalIVCJN24.cuautitlan;
        rowValues[4][0].value = totalIVCJN24.tultitlan;
        rowValues[5][0].value = totalIVCJN24.guadalajara;
        rowValues[6][0].value = totalIVCJN24.hermosillo;
        rowValues[7][0].value = totalIVCJN24.mexicali;
        rowValues[8][0].value = totalIVCJN24.orizaba;
        // rowValues[9][0].value = totalIVCJN24.ramosArispe;
        rowValues[9][0].value = totalIVCJN24.total;
      }
      if(row.key[0] == '07 JUL'){

        rowValues[3][0].value = totalIVCJL.cuautitlan;
        rowValues[4][0].value = totalIVCJL.tultitlan;
        rowValues[5][0].value = totalIVCJL.guadalajara;
        rowValues[6][0].value = totalIVCJL.hermosillo;
        rowValues[7][0].value = totalIVCJL.mexicali;
        rowValues[8][0].value = totalIVCJL.orizaba;
        // rowValues[9][0].value = totalIVCJL.ramosArispe;
        rowValues[9][0].value = totalIVCJL.total;

      }
      if(row.key[0] == '08 AGO'){

        rowValues[3][0].value = totalIVCAG.cuautitlan;
        rowValues[4][0].value = totalIVCAG.tultitlan;
        rowValues[5][0].value = totalIVCAG.guadalajara;
        rowValues[6][0].value = totalIVCAG.hermosillo;
        rowValues[7][0].value = totalIVCAG.mexicali;
        rowValues[8][0].value = totalIVCAG.orizaba;
        // rowValues[9][0].value = totalIVCAG.ramosArispe;
        rowValues[9][0].value = totalIVCAG.total;
      }
      if(row.key[0] == '09 SEP'){

        rowValues[3][0].value = totalIVCS.cuautitlan;
        rowValues[4][0].value = totalIVCS.tultitlan;
        rowValues[5][0].value = totalIVCS.guadalajara;
        rowValues[6][0].value = totalIVCS.hermosillo;
        rowValues[7][0].value = totalIVCS.mexicali;
        rowValues[8][0].value = totalIVCS.orizaba;
        // rowValues[9][0].value = totalIVCS.ramosArispe;
        rowValues[9][0].value = totalIVCS.total;
      }
      if(row.key[0] == '10 OCT'){

        rowValues[3][0].value = totalIVCOC.cuautitlan;
        rowValues[4][0].value = totalIVCOC.tultitlan;
        rowValues[5][0].value = totalIVCOC.guadalajara;
        rowValues[6][0].value = totalIVCOC.hermosillo;
        rowValues[7][0].value = totalIVCOC.mexicali;
        rowValues[8][0].value = totalIVCOC.orizaba;
        // rowValues[9][0].value = totalIVCOC.ramosArispe;
        rowValues[9][0].value = totalIVCOC.total;
      }
      if(row.key[0] == '11 NOV'){

        rowValues[3][0].value = totalIVCNV.cuautitlan;
        rowValues[4][0].value = totalIVCNV.tultitlan;
        rowValues[5][0].value = totalIVCNV.guadalajara;
        rowValues[6][0].value = totalIVCNV.hermosillo;
        rowValues[7][0].value = totalIVCNV.mexicali;
        rowValues[8][0].value = totalIVCNV.orizaba;
        // rowValues[9][0].value = totalIVCNV.ramosArispe;
        rowValues[9][0].value = totalIVCNV.total;
      }

      if(row.key[0] == '12 DIC'){

        rowValues[3][0].value = totalIVCDC.cuautitlan;
        rowValues[4][0].value = totalIVCDC.tultitlan;
        rowValues[5][0].value = totalIVCDC.guadalajara;
        rowValues[6][0].value = totalIVCDC.hermosillo;
        rowValues[7][0].value = totalIVCDC.mexicali;
        rowValues[8][0].value = totalIVCDC.orizaba;
        // rowValues[9][0].value = totalIVCDC.ramosArispe;
        rowValues[9][0].value = totalIVCDC.total;
      }
    }

    if(row.rowType == "totalFooter"){
      row.values[3].value = totalOperacionIVC.cuautitlan;
      row.values[4].value = totalOperacionIVC.tultitlan;
      row.values[5].value = totalOperacionIVC.guadalajara;
      row.values[6].value = totalOperacionIVC.hermosillo;
      row.values[7].value = totalOperacionIVC.mexicali;
      row.values[8].value = totalOperacionIVC.orizaba;
      // row.values[9].value = totalOperacionIVC.ramosArispe;
      row.values[9].value = totalOperacionIVC.total;
    }

  });

  }

//==============================INGRESO OPERADOR 2024===================================
  onRowPreparedIO2024(e){
    if (e.rowType == 'data') {

      e.cells.forEach((c: any) => {
        if (c.cellElement) {
          if(c.columnIndex == 4){
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "15px";
            c.cellElement.style.background = "#cdcbcb";
          }
          }
      })
    
    }
  }

  onCellPreparedIO2024(e){
    if (e.rowType == 'groupFooter'){

      e.cellElement.style.fontSize = '12px';
      e.cellElement.style.background = "#DCDCDC";
    }
    

    if (e.rowType == 'totalFooter') {
    
      e.totalItem.cells.forEach((c: any) => {

        if (c.cellElement) {
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "16px";
          c.cellElement.style.background = "#ff9460";
          c.cellElement.style.color = "black"; 
      }  
      })
    }
  }


//==================================================================================//  
//==============================INGRESOS 2025=======================================//
//==================================================================================//
onRowPreparedITL2025(event){
    
  if (event.rowType == 'group'){
    if(event.data.key == '202501 ENE'){
      agrupamientoITLE25.cuatitlanIngr = event.summaryCells[4][0].value;
      agrupamientoITLE25.cuatitlanPres = event.summaryCells[5][0].value;
      agrupamientoITLE25.cuatitlanIngrAc = event.summaryCells[7][0].value;
      agrupamientoITLE25.cuatitlanPresAc = event.summaryCells[8][0].value;
      agrupamientoITLE25.cuatitlanIngrAnt = event.summaryCells[10][0].value;
      agrupamientoITLE25.tultitlanIngr = event.summaryCells[12][0].value;
      agrupamientoITLE25.tultitlanPres = event.summaryCells[13][0].value;
      agrupamientoITLE25.tultitlanIngrAc = event.summaryCells[15][0].value;
      agrupamientoITLE25.tultitlanPresAc = event.summaryCells[16][0].value;
      agrupamientoITLE25.tultitlanIngrAnt = event.summaryCells[18][0].value;
      agrupamientoITLE25.guadalajaraIngr = event.summaryCells[20][0].value;
      agrupamientoITLE25.guadalajaraPres = event.summaryCells[21][0].value;
      agrupamientoITLE25.guadalajaraIngrAc = event.summaryCells[23][0].value;
      agrupamientoITLE25.guadalajaraPresAc = event.summaryCells[24][0].value;
      agrupamientoITLE25.guadalajaraIngrAnt = event.summaryCells[26][0].value;
      agrupamientoITLE25.hermosilloIngr = event.summaryCells[28][0].value;
      agrupamientoITLE25.hermosilloPres = event.summaryCells[29][0].value;
      agrupamientoITLE25.hermosilloIngrAc = event.summaryCells[31][0].value;
      agrupamientoITLE25.hermosilloPresAc = event.summaryCells[32][0].value;
      agrupamientoITLE25.hermosilloIngrAnt = event.summaryCells[34][0].value;
      agrupamientoITLE25.mexicaliIngr = event.summaryCells[36][0].value;
      agrupamientoITLE25.mexicaliPres = event.summaryCells[37][0].value;
      agrupamientoITLE25.mexicaliIngrAc = event.summaryCells[39][0].value;
      agrupamientoITLE25.mexicaliPresAc = event.summaryCells[40][0].value;
      agrupamientoITLE25.mexicaliIngrAnt = event.summaryCells[42][0].value;
      agrupamientoITLE25.orizabaIngr = event.summaryCells[44][0].value;
      agrupamientoITLE25.orizabaPres = event.summaryCells[45][0].value;
      agrupamientoITLE25.orizabaIngrAc = event.summaryCells[47][0].value;
      agrupamientoITLE25.orizabaPresAc = event.summaryCells[48][0].value;
      agrupamientoITLE25.orizabaIngrAnt = event.summaryCells[50][0].value;

      totalAgrupamientoITLE25.cuatitlanPresPor = agrupamientoITLE25.cuatitlanIngr / agrupamientoITLE25.cuatitlanPres;
      totalAgrupamientoITLE25.cuatitlanPresAcPor = agrupamientoITLE25.cuatitlanIngrAc / agrupamientoITLE25.cuatitlanPresAc;
      totalAgrupamientoITLE25.cuatitlanIngrAntPor = agrupamientoITLE25.cuatitlanIngr / agrupamientoITLE25.cuatitlanIngrAnt;
      totalAgrupamientoITLE25.tultitlanPresPor = agrupamientoITLE25.tultitlanIngr / agrupamientoITLE25.tultitlanPres;
      totalAgrupamientoITLE25.tultitlanPresAcPor = agrupamientoITLE25.tultitlanIngrAc / agrupamientoITLE25.tultitlanPresAc;
      totalAgrupamientoITLE25.tultitlanIngrAntPor = agrupamientoITLE25.tultitlanIngr / agrupamientoITLE25.tultitlanIngrAnt;
      totalAgrupamientoITLE25.guadalajaraPresPor = agrupamientoITLE25.guadalajaraIngr / agrupamientoITLE25.guadalajaraPres;
      totalAgrupamientoITLE25.guadalajaraPresAcPor = agrupamientoITLE25.guadalajaraIngrAc / agrupamientoITLE25.guadalajaraPresAc;
      totalAgrupamientoITLE25.guadalajaraIngrAntPor = agrupamientoITLE25.guadalajaraIngr / agrupamientoITLE25.guadalajaraIngrAnt;
      totalAgrupamientoITLE25.hermosilloPresPor = agrupamientoITLE25.hermosilloIngr / agrupamientoITLE25.hermosilloPres;
      totalAgrupamientoITLE25.hermosilloPresAcPor = agrupamientoITLE25.hermosilloIngrAc / agrupamientoITLE25.hermosilloPresAc;
      totalAgrupamientoITLE25.hermosilloIngrAntPor = agrupamientoITLE25.hermosilloIngr / agrupamientoITLE25.hermosilloIngrAnt;
      totalAgrupamientoITLE25.mexicaliPresPor = agrupamientoITLE25.mexicaliIngr / agrupamientoITLE25.mexicaliPres;
      totalAgrupamientoITLE25.mexicaliPresAcPor = agrupamientoITLE25.mexicaliIngrAc / agrupamientoITLE25.mexicaliPresAc;
      totalAgrupamientoITLE25.mexicaliIngrAntPor = agrupamientoITLE25.mexicaliIngr / agrupamientoITLE25.mexicaliIngrAnt;
      totalAgrupamientoITLE25.orizabaPresPor = agrupamientoITLE25.orizabaIngr / agrupamientoITLE25.orizabaPres;
      totalAgrupamientoITLE25.orizabaPresAcPor = agrupamientoITLE25.orizabaIngrAc / agrupamientoITLE25.orizabaPresAc;
      totalAgrupamientoITLE25.orizabaIngrAntPor = agrupamientoITLE25.orizabaIngr / agrupamientoITLE25.orizabaIngrAnt;

      event.summaryCells[6][0].value = totalAgrupamientoITLE25.cuatitlanPresPor;
      event.summaryCells[9][0].value = totalAgrupamientoITLE25.cuatitlanPresAcPor;
      event.summaryCells[11][0].value = totalAgrupamientoITLE25.cuatitlanIngrAntPor;
      event.summaryCells[14][0].value = totalAgrupamientoITLE25.tultitlanPresPor;
      event.summaryCells[17][0].value = totalAgrupamientoITLE25.tultitlanPresAcPor;
      event.summaryCells[19][0].value = totalAgrupamientoITLE25.tultitlanIngrAntPor;
      event.summaryCells[22][0].value = totalAgrupamientoITLE25.guadalajaraPresPor;
      event.summaryCells[25][0].value = totalAgrupamientoITLE25.guadalajaraPresAcPor;
      event.summaryCells[27][0].value = totalAgrupamientoITLE25.guadalajaraIngrAntPor;
      event.summaryCells[30][0].value = totalAgrupamientoITLE25.hermosilloPresPor;
      event.summaryCells[33][0].value = totalAgrupamientoITLE25.hermosilloPresAcPor;
      event.summaryCells[35][0].value = totalAgrupamientoITLE25.hermosilloIngrAntPor;
      event.summaryCells[38][0].value = totalAgrupamientoITLE25.mexicaliPresPor;
      event.summaryCells[41][0].value = totalAgrupamientoITLE25.mexicaliPresAcPor;
      event.summaryCells[43][0].value = totalAgrupamientoITLE25.mexicaliIngrAntPor;
      event.summaryCells[46][0].value = totalAgrupamientoITLE25.orizabaPresPor;
      event.summaryCells[49][0].value = totalAgrupamientoITLE25.orizabaPresAcPor;
      event.summaryCells[51][0].value = totalAgrupamientoITLE25.orizabaIngrAntPor;
     }
    if(event.data.key == '202502 FEB'){
      agrupamientoITLF25.cuatitlanIngr = event.summaryCells[4][0].value;
      agrupamientoITLF25.cuatitlanPres = event.summaryCells[5][0].value;
      agrupamientoITLF25.cuatitlanIngrAc = event.summaryCells[7][0].value;
      agrupamientoITLF25.cuatitlanPresAc = event.summaryCells[8][0].value;
      agrupamientoITLF25.cuatitlanIngrAnt = event.summaryCells[10][0].value;
      agrupamientoITLF25.tultitlanIngr = event.summaryCells[12][0].value;
      agrupamientoITLF25.tultitlanPres = event.summaryCells[13][0].value;
      agrupamientoITLF25.tultitlanIngrAc = event.summaryCells[15][0].value;
      agrupamientoITLF25.tultitlanPresAc = event.summaryCells[16][0].value;
      agrupamientoITLF25.tultitlanIngrAnt = event.summaryCells[18][0].value;
      agrupamientoITLF25.guadalajaraIngr = event.summaryCells[20][0].value;
      agrupamientoITLF25.guadalajaraPres = event.summaryCells[21][0].value;
      agrupamientoITLF25.guadalajaraIngrAc = event.summaryCells[23][0].value;
      agrupamientoITLF25.guadalajaraPresAc = event.summaryCells[24][0].value;
      agrupamientoITLF25.guadalajaraIngrAnt = event.summaryCells[26][0].value;
      agrupamientoITLF25.hermosilloIngr = event.summaryCells[28][0].value;
      agrupamientoITLF25.hermosilloPres = event.summaryCells[29][0].value;
      agrupamientoITLF25.hermosilloIngrAc = event.summaryCells[31][0].value;
      agrupamientoITLF25.hermosilloPresAc = event.summaryCells[32][0].value;
      agrupamientoITLF25.hermosilloIngrAnt = event.summaryCells[34][0].value;
      agrupamientoITLF25.mexicaliIngr = event.summaryCells[36][0].value;
      agrupamientoITLF25.mexicaliPres = event.summaryCells[37][0].value;
      agrupamientoITLF25.mexicaliIngrAc = event.summaryCells[39][0].value;
      agrupamientoITLF25.mexicaliPresAc = event.summaryCells[40][0].value;
      agrupamientoITLF25.mexicaliIngrAnt = event.summaryCells[42][0].value;
      agrupamientoITLF25.orizabaIngr = event.summaryCells[44][0].value;
      agrupamientoITLF25.orizabaPres = event.summaryCells[45][0].value;
      agrupamientoITLF25.orizabaIngrAc = event.summaryCells[47][0].value;
      agrupamientoITLF25.orizabaPresAc = event.summaryCells[48][0].value;
      agrupamientoITLF25.orizabaIngrAnt = event.summaryCells[50][0].value;

      totalAgrupamientoITLF25.cuatitlanPresPor = agrupamientoITLF25.cuatitlanIngr / agrupamientoITLF25.cuatitlanPres;
      totalAgrupamientoITLF25.cuatitlanPresAcPor = agrupamientoITLF25.cuatitlanIngrAc / agrupamientoITLF25.cuatitlanPresAc;
      totalAgrupamientoITLF25.cuatitlanIngrAntPor = agrupamientoITLF25.cuatitlanIngr / agrupamientoITLF25.cuatitlanIngrAnt;
      totalAgrupamientoITLF25.tultitlanPresPor = agrupamientoITLF25.tultitlanIngr / agrupamientoITLF25.tultitlanPres;
      totalAgrupamientoITLF25.tultitlanPresAcPor = agrupamientoITLF25.tultitlanIngrAc / agrupamientoITLF25.tultitlanPresAc;
      totalAgrupamientoITLF25.tultitlanIngrAntPor = agrupamientoITLF25.tultitlanIngr / agrupamientoITLF25.tultitlanIngrAnt;
      totalAgrupamientoITLF25.guadalajaraPresPor = agrupamientoITLF25.guadalajaraIngr / agrupamientoITLF25.guadalajaraPres;
      totalAgrupamientoITLF25.guadalajaraPresAcPor = agrupamientoITLF25.guadalajaraIngrAc / agrupamientoITLF25.guadalajaraPresAc;
      totalAgrupamientoITLF25.guadalajaraIngrAntPor = agrupamientoITLF25.guadalajaraIngr / agrupamientoITLF25.guadalajaraIngrAnt;
      totalAgrupamientoITLF25.hermosilloPresPor = agrupamientoITLF25.hermosilloIngr / agrupamientoITLF25.hermosilloPres;
      totalAgrupamientoITLF25.hermosilloPresAcPor = agrupamientoITLF25.hermosilloIngrAc / agrupamientoITLF25.hermosilloPresAc;
      totalAgrupamientoITLF25.hermosilloIngrAntPor = agrupamientoITLF25.hermosilloIngr / agrupamientoITLF25.hermosilloIngrAnt;
      totalAgrupamientoITLF25.mexicaliPresPor = agrupamientoITLF25.mexicaliIngr / agrupamientoITLF25.mexicaliPres;
      totalAgrupamientoITLF25.mexicaliPresAcPor = agrupamientoITLF25.mexicaliIngrAc / agrupamientoITLF25.mexicaliPresAc;
      totalAgrupamientoITLF25.mexicaliIngrAntPor = agrupamientoITLF25.mexicaliIngr / agrupamientoITLF25.mexicaliIngrAnt;
      totalAgrupamientoITLF25.orizabaPresPor = agrupamientoITLF25.orizabaIngr / agrupamientoITLF25.orizabaPres;
      totalAgrupamientoITLF25.orizabaPresAcPor = agrupamientoITLF25.orizabaIngrAc / agrupamientoITLF25.orizabaPresAc;
      totalAgrupamientoITLF25.orizabaIngrAntPor = agrupamientoITLF25.orizabaIngr / agrupamientoITLF25.orizabaIngrAnt;
    
      event.summaryCells[6][0].value = totalAgrupamientoITLF25.cuatitlanPresPor;
      event.summaryCells[9][0].value = totalAgrupamientoITLF25.cuatitlanPresAcPor;
      event.summaryCells[11][0].value = totalAgrupamientoITLF25.cuatitlanIngrAntPor;
      event.summaryCells[14][0].value = totalAgrupamientoITLF25.tultitlanPresPor;
      event.summaryCells[17][0].value = totalAgrupamientoITLF25.tultitlanPresAcPor;
      event.summaryCells[19][0].value = totalAgrupamientoITLF25.tultitlanIngrAntPor;
      event.summaryCells[22][0].value = totalAgrupamientoITLF25.guadalajaraPresPor;
      event.summaryCells[25][0].value = totalAgrupamientoITLF25.guadalajaraPresAcPor;
      event.summaryCells[27][0].value = totalAgrupamientoITLF25.guadalajaraIngrAntPor;
      event.summaryCells[30][0].value = totalAgrupamientoITLF25.hermosilloPresPor;
      event.summaryCells[33][0].value = totalAgrupamientoITLF25.hermosilloPresAcPor;
      event.summaryCells[35][0].value = totalAgrupamientoITLF25.hermosilloIngrAntPor;
      event.summaryCells[38][0].value = totalAgrupamientoITLF25.mexicaliPresPor;
      event.summaryCells[41][0].value = totalAgrupamientoITLF25.mexicaliPresAcPor;
      event.summaryCells[43][0].value = totalAgrupamientoITLF25.mexicaliIngrAntPor;
      event.summaryCells[46][0].value = totalAgrupamientoITLF25.orizabaPresPor;
      event.summaryCells[49][0].value = totalAgrupamientoITLF25.orizabaPresAcPor;
      event.summaryCells[51][0].value = totalAgrupamientoITLF25.orizabaIngrAntPor;
    }
    if(event.data.key == '202503 MAR'){
      agrupamientoITLM25.cuatitlanIngr = event.summaryCells[4][0].value;
      agrupamientoITLM25.cuatitlanPres = event.summaryCells[5][0].value;
      agrupamientoITLM25.cuatitlanIngrAc = event.summaryCells[7][0].value;
      agrupamientoITLM25.cuatitlanPresAc = event.summaryCells[8][0].value;
      agrupamientoITLM25.cuatitlanIngrAnt = event.summaryCells[10][0].value;
      agrupamientoITLM25.tultitlanIngr = event.summaryCells[12][0].value;
      agrupamientoITLM25.tultitlanPres = event.summaryCells[13][0].value;
      agrupamientoITLM25.tultitlanIngrAc = event.summaryCells[15][0].value;
      agrupamientoITLM25.tultitlanPresAc = event.summaryCells[16][0].value;
      agrupamientoITLM25.tultitlanIngrAnt = event.summaryCells[18][0].value;
      agrupamientoITLM25.guadalajaraIngr = event.summaryCells[20][0].value;
      agrupamientoITLM25.guadalajaraPres = event.summaryCells[21][0].value;
      agrupamientoITLM25.guadalajaraIngrAc = event.summaryCells[23][0].value;
      agrupamientoITLM25.guadalajaraPresAc = event.summaryCells[24][0].value;
      agrupamientoITLM25.guadalajaraIngrAnt = event.summaryCells[26][0].value;
      agrupamientoITLM25.hermosilloIngr = event.summaryCells[28][0].value;
      agrupamientoITLM25.hermosilloPres = event.summaryCells[29][0].value;
      agrupamientoITLM25.hermosilloIngrAc = event.summaryCells[31][0].value;
      agrupamientoITLM25.hermosilloPresAc = event.summaryCells[32][0].value;
      agrupamientoITLM25.hermosilloIngrAnt = event.summaryCells[34][0].value;
      agrupamientoITLM25.mexicaliIngr = event.summaryCells[36][0].value;
      agrupamientoITLM25.mexicaliPres = event.summaryCells[37][0].value;
      agrupamientoITLM25.mexicaliIngrAc = event.summaryCells[39][0].value;
      agrupamientoITLM25.mexicaliPresAc = event.summaryCells[40][0].value;
      agrupamientoITLM25.mexicaliIngrAnt = event.summaryCells[42][0].value;
      agrupamientoITLM25.orizabaIngr = event.summaryCells[44][0].value;
      agrupamientoITLM25.orizabaPres = event.summaryCells[45][0].value;
      agrupamientoITLM25.orizabaIngrAc = event.summaryCells[47][0].value;
      agrupamientoITLM25.orizabaPresAc = event.summaryCells[48][0].value;
      agrupamientoITLM25.orizabaIngrAnt = event.summaryCells[50][0].value;

      totalAgrupamientoITLM25.cuatitlanPresPor = agrupamientoITLM25.cuatitlanIngr / agrupamientoITLM25.cuatitlanPres;
      totalAgrupamientoITLM25.cuatitlanPresAcPor = agrupamientoITLM25.cuatitlanIngrAc / agrupamientoITLM25.cuatitlanPresAc;
      totalAgrupamientoITLM25.cuatitlanIngrAntPor = agrupamientoITLM25.cuatitlanIngr / agrupamientoITLM25.cuatitlanIngrAnt;
      totalAgrupamientoITLM25.tultitlanPresPor = agrupamientoITLM25.tultitlanIngr / agrupamientoITLM25.tultitlanPres;
      totalAgrupamientoITLM25.tultitlanPresAcPor = agrupamientoITLM25.tultitlanIngrAc / agrupamientoITLM25.tultitlanPresAc;
      totalAgrupamientoITLM25.tultitlanIngrAntPor = agrupamientoITLM25.tultitlanIngr / agrupamientoITLM25.tultitlanIngrAnt;
      totalAgrupamientoITLM25.guadalajaraPresPor = agrupamientoITLM25.guadalajaraIngr / agrupamientoITLM25.guadalajaraPres;
      totalAgrupamientoITLM25.guadalajaraPresAcPor = agrupamientoITLM25.guadalajaraIngrAc / agrupamientoITLM25.guadalajaraPresAc;
      totalAgrupamientoITLM25.guadalajaraIngrAntPor = agrupamientoITLM25.guadalajaraIngr / agrupamientoITLM25.guadalajaraIngrAnt;
      totalAgrupamientoITLM25.hermosilloPresPor = agrupamientoITLM25.hermosilloIngr / agrupamientoITLM25.hermosilloPres;
      totalAgrupamientoITLM25.hermosilloPresAcPor = agrupamientoITLM25.hermosilloIngrAc / agrupamientoITLM25.hermosilloPresAc;
      totalAgrupamientoITLM25.hermosilloIngrAntPor = agrupamientoITLM25.hermosilloIngr / agrupamientoITLM25.hermosilloIngrAnt;
      totalAgrupamientoITLM25.mexicaliPresPor = agrupamientoITLM25.mexicaliIngr / agrupamientoITLM25.mexicaliPres;
      totalAgrupamientoITLM25.mexicaliPresAcPor = agrupamientoITLM25.mexicaliIngrAc / agrupamientoITLM25.mexicaliPresAc;
      totalAgrupamientoITLM25.mexicaliIngrAntPor = agrupamientoITLM25.mexicaliIngr / agrupamientoITLM25.mexicaliIngrAnt;
      totalAgrupamientoITLM25.orizabaPresPor = agrupamientoITLM25.orizabaIngr / agrupamientoITLM25.orizabaPres;
      totalAgrupamientoITLM25.orizabaPresAcPor = agrupamientoITLM25.orizabaIngrAc / agrupamientoITLM25.orizabaPresAc;
      totalAgrupamientoITLM25.orizabaIngrAntPor = agrupamientoITLM25.orizabaIngr / agrupamientoITLM25.orizabaIngrAnt;
    
      event.summaryCells[6][0].value = totalAgrupamientoITLM25.cuatitlanPresPor;
      event.summaryCells[9][0].value = totalAgrupamientoITLM25.cuatitlanPresAcPor;
      event.summaryCells[11][0].value = totalAgrupamientoITLM25.cuatitlanIngrAntPor;
      event.summaryCells[14][0].value = totalAgrupamientoITLM25.tultitlanPresPor;
      event.summaryCells[17][0].value = totalAgrupamientoITLM25.tultitlanPresAcPor;
      event.summaryCells[19][0].value = totalAgrupamientoITLM25.tultitlanIngrAntPor;
      event.summaryCells[22][0].value = totalAgrupamientoITLM25.guadalajaraPresPor;
      event.summaryCells[25][0].value = totalAgrupamientoITLM25.guadalajaraPresAcPor;
      event.summaryCells[27][0].value = totalAgrupamientoITLM25.guadalajaraIngrAntPor;
      event.summaryCells[30][0].value = totalAgrupamientoITLM25.hermosilloPresPor;
      event.summaryCells[33][0].value = totalAgrupamientoITLM25.hermosilloPresAcPor;
      event.summaryCells[35][0].value = totalAgrupamientoITLM25.hermosilloIngrAntPor;
      event.summaryCells[38][0].value = totalAgrupamientoITLM25.mexicaliPresPor;
      event.summaryCells[41][0].value = totalAgrupamientoITLM25.mexicaliPresAcPor;
      event.summaryCells[43][0].value = totalAgrupamientoITLM25.mexicaliIngrAntPor;
      event.summaryCells[46][0].value = totalAgrupamientoITLM25.orizabaPresPor;
      event.summaryCells[49][0].value = totalAgrupamientoITLM25.orizabaPresAcPor;
      event.summaryCells[51][0].value = totalAgrupamientoITLM25.orizabaIngrAntPor;
    }
    if(event.data.key == '202504 ABR'){
      agrupamientoITLA25.cuatitlanIngr = event.summaryCells[4][0].value;
      agrupamientoITLA25.cuatitlanPres = event.summaryCells[5][0].value;
      agrupamientoITLA25.cuatitlanIngrAc = event.summaryCells[7][0].value;
      agrupamientoITLA25.cuatitlanPresAc = event.summaryCells[8][0].value;
      agrupamientoITLA25.cuatitlanIngrAnt = event.summaryCells[10][0].value;
      agrupamientoITLA25.tultitlanIngr = event.summaryCells[12][0].value;
      agrupamientoITLA25.tultitlanPres = event.summaryCells[13][0].value;
      agrupamientoITLA25.tultitlanIngrAc = event.summaryCells[15][0].value;
      agrupamientoITLA25.tultitlanPresAc = event.summaryCells[16][0].value;
      agrupamientoITLA25.tultitlanIngrAnt = event.summaryCells[18][0].value;
      agrupamientoITLA25.guadalajaraIngr = event.summaryCells[20][0].value;
      agrupamientoITLA25.guadalajaraPres = event.summaryCells[21][0].value;
      agrupamientoITLA25.guadalajaraIngrAc = event.summaryCells[23][0].value;
      agrupamientoITLA25.guadalajaraPresAc = event.summaryCells[24][0].value;
      agrupamientoITLA25.guadalajaraIngrAnt = event.summaryCells[26][0].value;
      agrupamientoITLA25.hermosilloIngr = event.summaryCells[28][0].value;
      agrupamientoITLA25.hermosilloPres = event.summaryCells[29][0].value;
      agrupamientoITLA25.hermosilloIngrAc = event.summaryCells[31][0].value;
      agrupamientoITLA25.hermosilloPresAc = event.summaryCells[32][0].value;
      agrupamientoITLA25.hermosilloIngrAnt = event.summaryCells[34][0].value;
      agrupamientoITLA25.mexicaliIngr = event.summaryCells[36][0].value;
      agrupamientoITLA25.mexicaliPres = event.summaryCells[37][0].value;
      agrupamientoITLA25.mexicaliIngrAc = event.summaryCells[39][0].value;
      agrupamientoITLA25.mexicaliPresAc = event.summaryCells[40][0].value;
      agrupamientoITLA25.mexicaliIngrAnt = event.summaryCells[42][0].value;
      agrupamientoITLA25.orizabaIngr = event.summaryCells[44][0].value;
      agrupamientoITLA25.orizabaPres = event.summaryCells[45][0].value;
      agrupamientoITLA25.orizabaIngrAc = event.summaryCells[47][0].value;
      agrupamientoITLA25.orizabaPresAc = event.summaryCells[48][0].value;
      agrupamientoITLA25.orizabaIngrAnt = event.summaryCells[50][0].value;

      totalAgrupamientoITLA25.cuatitlanPresPor = agrupamientoITLA25.cuatitlanIngr / agrupamientoITLA25.cuatitlanPres;
      totalAgrupamientoITLA25.cuatitlanPresAcPor = agrupamientoITLA25.cuatitlanIngrAc / agrupamientoITLA25.cuatitlanPresAc;
      totalAgrupamientoITLA25.cuatitlanIngrAntPor = agrupamientoITLA25.cuatitlanIngr / agrupamientoITLA25.cuatitlanIngrAnt;
      totalAgrupamientoITLA25.tultitlanPresPor = agrupamientoITLA25.tultitlanIngr / agrupamientoITLA25.tultitlanPres;
      totalAgrupamientoITLA25.tultitlanPresAcPor = agrupamientoITLA25.tultitlanIngrAc / agrupamientoITLA25.tultitlanPresAc;
      totalAgrupamientoITLA25.tultitlanIngrAntPor = agrupamientoITLA25.tultitlanIngr / agrupamientoITLA25.tultitlanIngrAnt;
      totalAgrupamientoITLA25.guadalajaraPresPor = agrupamientoITLA25.guadalajaraIngr / agrupamientoITLA25.guadalajaraPres;
      totalAgrupamientoITLA25.guadalajaraPresAcPor = agrupamientoITLA25.guadalajaraIngrAc / agrupamientoITLA25.guadalajaraPresAc;
      totalAgrupamientoITLA25.guadalajaraIngrAntPor = agrupamientoITLA25.guadalajaraIngr / agrupamientoITLA25.guadalajaraIngrAnt;
      totalAgrupamientoITLA25.hermosilloPresPor = agrupamientoITLA25.hermosilloIngr / agrupamientoITLA25.hermosilloPres;
      totalAgrupamientoITLA25.hermosilloPresAcPor = agrupamientoITLA25.hermosilloIngrAc / agrupamientoITLA25.hermosilloPresAc;
      totalAgrupamientoITLA25.hermosilloIngrAntPor = agrupamientoITLA25.hermosilloIngr / agrupamientoITLA25.hermosilloIngrAnt;
      totalAgrupamientoITLA25.mexicaliPresPor = agrupamientoITLA25.mexicaliIngr / agrupamientoITLA25.mexicaliPres;
      totalAgrupamientoITLA25.mexicaliPresAcPor = agrupamientoITLA25.mexicaliIngrAc / agrupamientoITLA25.mexicaliPresAc;
      totalAgrupamientoITLA25.mexicaliIngrAntPor = agrupamientoITLA25.mexicaliIngr / agrupamientoITLA25.mexicaliIngrAnt;
      totalAgrupamientoITLA25.orizabaPresPor = agrupamientoITLA25.orizabaIngr / agrupamientoITLA25.orizabaPres;
      totalAgrupamientoITLA25.orizabaPresAcPor = agrupamientoITLA25.orizabaIngrAc / agrupamientoITLA25.orizabaPresAc;
      totalAgrupamientoITLA25.orizabaIngrAntPor = agrupamientoITLA25.orizabaIngr / agrupamientoITLA25.orizabaIngrAnt;
    
      event.summaryCells[6][0].value = totalAgrupamientoITLA25.cuatitlanPresPor;
      event.summaryCells[9][0].value = totalAgrupamientoITLA25.cuatitlanPresAcPor;
      event.summaryCells[11][0].value = totalAgrupamientoITLA25.cuatitlanIngrAntPor;
      event.summaryCells[14][0].value = totalAgrupamientoITLA25.tultitlanPresPor;
      event.summaryCells[17][0].value = totalAgrupamientoITLA25.tultitlanPresAcPor;
      event.summaryCells[19][0].value = totalAgrupamientoITLA25.tultitlanIngrAntPor;
      event.summaryCells[22][0].value = totalAgrupamientoITLA25.guadalajaraPresPor;
      event.summaryCells[25][0].value = totalAgrupamientoITLA25.guadalajaraPresAcPor;
      event.summaryCells[27][0].value = totalAgrupamientoITLA25.guadalajaraIngrAntPor;
      event.summaryCells[30][0].value = totalAgrupamientoITLA25.hermosilloPresPor;
      event.summaryCells[33][0].value = totalAgrupamientoITLA25.hermosilloPresAcPor;
      event.summaryCells[35][0].value = totalAgrupamientoITLA25.hermosilloIngrAntPor;
      event.summaryCells[38][0].value = totalAgrupamientoITLA25.mexicaliPresPor;
      event.summaryCells[41][0].value = totalAgrupamientoITLA25.mexicaliPresAcPor;
      event.summaryCells[43][0].value = totalAgrupamientoITLA25.mexicaliIngrAntPor;
      event.summaryCells[46][0].value = totalAgrupamientoITLA25.orizabaPresPor;
      event.summaryCells[49][0].value = totalAgrupamientoITLA25.orizabaPresAcPor;
      event.summaryCells[51][0].value = totalAgrupamientoITLA25.orizabaIngrAntPor;
    }
    if(event.data.key == '202505 MAY'){
      agrupamientoITLMY25.cuatitlanIngr = event.summaryCells[4][0].value;
      agrupamientoITLMY25.cuatitlanPres = event.summaryCells[5][0].value;
      agrupamientoITLMY25.cuatitlanIngrAc = event.summaryCells[7][0].value;
      agrupamientoITLMY25.cuatitlanPresAc = event.summaryCells[8][0].value;
      agrupamientoITLMY25.cuatitlanIngrAnt = event.summaryCells[10][0].value;
      agrupamientoITLMY25.tultitlanIngr = event.summaryCells[12][0].value;
      agrupamientoITLMY25.tultitlanPres = event.summaryCells[13][0].value;
      agrupamientoITLMY25.tultitlanIngrAc = event.summaryCells[15][0].value;
      agrupamientoITLMY25.tultitlanPresAc = event.summaryCells[16][0].value;
      agrupamientoITLMY25.tultitlanIngrAnt = event.summaryCells[18][0].value;
      agrupamientoITLMY25.guadalajaraIngr = event.summaryCells[20][0].value;
      agrupamientoITLMY25.guadalajaraPres = event.summaryCells[21][0].value;
      agrupamientoITLMY25.guadalajaraIngrAc = event.summaryCells[23][0].value;
      agrupamientoITLMY25.guadalajaraPresAc = event.summaryCells[24][0].value;
      agrupamientoITLMY25.guadalajaraIngrAnt = event.summaryCells[26][0].value;
      agrupamientoITLMY25.hermosilloIngr = event.summaryCells[28][0].value;
      agrupamientoITLMY25.hermosilloPres = event.summaryCells[29][0].value;
      agrupamientoITLMY25.hermosilloIngrAc = event.summaryCells[31][0].value;
      agrupamientoITLMY25.hermosilloPresAc = event.summaryCells[32][0].value;
      agrupamientoITLMY25.hermosilloIngrAnt = event.summaryCells[34][0].value;
      agrupamientoITLMY25.mexicaliIngr = event.summaryCells[36][0].value;
      agrupamientoITLMY25.mexicaliPres = event.summaryCells[37][0].value;
      agrupamientoITLMY25.mexicaliIngrAc = event.summaryCells[39][0].value;
      agrupamientoITLMY25.mexicaliPresAc = event.summaryCells[40][0].value;
      agrupamientoITLMY25.mexicaliIngrAnt = event.summaryCells[42][0].value;
      agrupamientoITLMY25.orizabaIngr = event.summaryCells[44][0].value;
      agrupamientoITLMY25.orizabaPres = event.summaryCells[45][0].value;
      agrupamientoITLMY25.orizabaIngrAc = event.summaryCells[47][0].value;
      agrupamientoITLMY25.orizabaPresAc = event.summaryCells[48][0].value;
      agrupamientoITLMY25.orizabaIngrAnt = event.summaryCells[50][0].value;

      totalAgrupamientoITLMY25.cuatitlanPresPor = agrupamientoITLMY25.cuatitlanIngr / agrupamientoITLMY25.cuatitlanPres;
      totalAgrupamientoITLMY25.cuatitlanPresAcPor = agrupamientoITLMY25.cuatitlanIngrAc / agrupamientoITLMY25.cuatitlanPresAc;
      totalAgrupamientoITLMY25.cuatitlanIngrAntPor = agrupamientoITLMY25.cuatitlanIngr / agrupamientoITLMY25.cuatitlanIngrAnt;
      totalAgrupamientoITLMY25.tultitlanPresPor = agrupamientoITLMY25.tultitlanIngr / agrupamientoITLMY25.tultitlanPres;
      totalAgrupamientoITLMY25.tultitlanPresAcPor = agrupamientoITLMY25.tultitlanIngrAc / agrupamientoITLMY25.tultitlanPresAc;
      totalAgrupamientoITLMY25.tultitlanIngrAntPor = agrupamientoITLMY25.tultitlanIngr / agrupamientoITLMY25.tultitlanIngrAnt;
      totalAgrupamientoITLMY25.guadalajaraPresPor = agrupamientoITLMY25.guadalajaraIngr / agrupamientoITLMY25.guadalajaraPres;
      totalAgrupamientoITLMY25.guadalajaraPresAcPor = agrupamientoITLMY25.guadalajaraIngrAc / agrupamientoITLMY25.guadalajaraPresAc;
      totalAgrupamientoITLMY25.guadalajaraIngrAntPor = agrupamientoITLMY25.guadalajaraIngr / agrupamientoITLMY25.guadalajaraIngrAnt;
      totalAgrupamientoITLMY25.hermosilloPresPor = agrupamientoITLMY25.hermosilloIngr / agrupamientoITLMY25.hermosilloPres;
      totalAgrupamientoITLMY25.hermosilloPresAcPor = agrupamientoITLMY25.hermosilloIngrAc / agrupamientoITLMY25.hermosilloPresAc;
      totalAgrupamientoITLMY25.hermosilloIngrAntPor = agrupamientoITLMY25.hermosilloIngr / agrupamientoITLMY25.hermosilloIngrAnt;
      totalAgrupamientoITLMY25.mexicaliPresPor = agrupamientoITLMY25.mexicaliIngr / agrupamientoITLMY25.mexicaliPres;
      totalAgrupamientoITLMY25.mexicaliPresAcPor = agrupamientoITLMY25.mexicaliIngrAc / agrupamientoITLMY25.mexicaliPresAc;
      totalAgrupamientoITLMY25.mexicaliIngrAntPor = agrupamientoITLMY25.mexicaliIngr / agrupamientoITLMY25.mexicaliIngrAnt;
      totalAgrupamientoITLMY25.orizabaPresPor = agrupamientoITLMY25.orizabaIngr / agrupamientoITLMY25.orizabaPres;
      totalAgrupamientoITLMY25.orizabaPresAcPor = agrupamientoITLMY25.orizabaIngrAc / agrupamientoITLMY25.orizabaPresAc;
      totalAgrupamientoITLMY25.orizabaIngrAntPor = agrupamientoITLMY25.orizabaIngr / agrupamientoITLMY25.orizabaIngrAnt;
    
      event.summaryCells[6][0].value = totalAgrupamientoITLMY25.cuatitlanPresPor;
      event.summaryCells[9][0].value = totalAgrupamientoITLMY25.cuatitlanPresAcPor;
      event.summaryCells[11][0].value = totalAgrupamientoITLMY25.cuatitlanIngrAntPor;
      event.summaryCells[14][0].value = totalAgrupamientoITLMY25.tultitlanPresPor;
      event.summaryCells[17][0].value = totalAgrupamientoITLMY25.tultitlanPresAcPor;
      event.summaryCells[19][0].value = totalAgrupamientoITLMY25.tultitlanIngrAntPor;
      event.summaryCells[22][0].value = totalAgrupamientoITLMY25.guadalajaraPresPor;
      event.summaryCells[25][0].value = totalAgrupamientoITLMY25.guadalajaraPresAcPor;
      event.summaryCells[27][0].value = totalAgrupamientoITLMY25.guadalajaraIngrAntPor;
      event.summaryCells[30][0].value = totalAgrupamientoITLMY25.hermosilloPresPor;
      event.summaryCells[33][0].value = totalAgrupamientoITLMY25.hermosilloPresAcPor;
      event.summaryCells[35][0].value = totalAgrupamientoITLMY25.hermosilloIngrAntPor;
      event.summaryCells[38][0].value = totalAgrupamientoITLMY25.mexicaliPresPor;
      event.summaryCells[41][0].value = totalAgrupamientoITLMY25.mexicaliPresAcPor;
      event.summaryCells[43][0].value = totalAgrupamientoITLMY25.mexicaliIngrAntPor;
      event.summaryCells[46][0].value = totalAgrupamientoITLMY25.orizabaPresPor;
      event.summaryCells[49][0].value = totalAgrupamientoITLMY25.orizabaPresAcPor;
      event.summaryCells[51][0].value = totalAgrupamientoITLMY25.orizabaIngrAntPor;
    }
    if(event.data.key == '202506 JUN'){
      agrupamientoITLJN25.cuatitlanIngr = event.summaryCells[4][0].value;
      agrupamientoITLJN25.cuatitlanPres = event.summaryCells[5][0].value;
      agrupamientoITLJN25.cuatitlanIngrAc = event.summaryCells[7][0].value;
      agrupamientoITLJN25.cuatitlanPresAc = event.summaryCells[8][0].value;
      agrupamientoITLJN25.cuatitlanIngrAnt = event.summaryCells[10][0].value;
      agrupamientoITLJN25.tultitlanIngr = event.summaryCells[12][0].value;
      agrupamientoITLJN25.tultitlanPres = event.summaryCells[13][0].value;
      agrupamientoITLJN25.tultitlanIngrAc = event.summaryCells[15][0].value;
      agrupamientoITLJN25.tultitlanPresAc = event.summaryCells[16][0].value;
      agrupamientoITLJN25.tultitlanIngrAnt = event.summaryCells[18][0].value;
      agrupamientoITLJN25.guadalajaraIngr = event.summaryCells[20][0].value;
      agrupamientoITLJN25.guadalajaraPres = event.summaryCells[21][0].value;
      agrupamientoITLJN25.guadalajaraIngrAc = event.summaryCells[23][0].value;
      agrupamientoITLJN25.guadalajaraPresAc = event.summaryCells[24][0].value;
      agrupamientoITLJN25.guadalajaraIngrAnt = event.summaryCells[26][0].value;
      agrupamientoITLJN25.hermosilloIngr = event.summaryCells[28][0].value;
      agrupamientoITLJN25.hermosilloPres = event.summaryCells[29][0].value;
      agrupamientoITLJN25.hermosilloIngrAc = event.summaryCells[31][0].value;
      agrupamientoITLJN25.hermosilloPresAc = event.summaryCells[32][0].value;
      agrupamientoITLJN25.hermosilloIngrAnt = event.summaryCells[34][0].value;
      agrupamientoITLJN25.mexicaliIngr = event.summaryCells[36][0].value;
      agrupamientoITLJN25.mexicaliPres = event.summaryCells[37][0].value;
      agrupamientoITLJN25.mexicaliIngrAc = event.summaryCells[39][0].value;
      agrupamientoITLJN25.mexicaliPresAc = event.summaryCells[40][0].value;
      agrupamientoITLJN25.mexicaliIngrAnt = event.summaryCells[42][0].value;
      agrupamientoITLJN25.orizabaIngr = event.summaryCells[44][0].value;
      agrupamientoITLJN25.orizabaPres = event.summaryCells[45][0].value;
      agrupamientoITLJN25.orizabaIngrAc = event.summaryCells[47][0].value;
      agrupamientoITLJN25.orizabaPresAc = event.summaryCells[48][0].value;
      agrupamientoITLJN25.orizabaIngrAnt = event.summaryCells[50][0].value;

      totalAgrupamientoITLJN25.cuatitlanPresPor = agrupamientoITLJN25.cuatitlanIngr / agrupamientoITLJN25.cuatitlanPres;
      totalAgrupamientoITLJN25.cuatitlanPresAcPor = agrupamientoITLJN25.cuatitlanIngrAc / agrupamientoITLJN25.cuatitlanPresAc;
      totalAgrupamientoITLJN25.cuatitlanIngrAntPor = agrupamientoITLJN25.cuatitlanIngr / agrupamientoITLJN25.cuatitlanIngrAnt;
      totalAgrupamientoITLJN25.tultitlanPresPor = agrupamientoITLJN25.tultitlanIngr / agrupamientoITLJN25.tultitlanPres;
      totalAgrupamientoITLJN25.tultitlanPresAcPor = agrupamientoITLJN25.tultitlanIngrAc / agrupamientoITLJN25.tultitlanPresAc;
      totalAgrupamientoITLJN25.tultitlanIngrAntPor = agrupamientoITLJN25.tultitlanIngr / agrupamientoITLJN25.tultitlanIngrAnt;
      totalAgrupamientoITLJN25.guadalajaraPresPor = agrupamientoITLJN25.guadalajaraIngr / agrupamientoITLJN25.guadalajaraPres;
      totalAgrupamientoITLJN25.guadalajaraPresAcPor = agrupamientoITLJN25.guadalajaraIngrAc / agrupamientoITLJN25.guadalajaraPresAc;
      totalAgrupamientoITLJN25.guadalajaraIngrAntPor = agrupamientoITLJN25.guadalajaraIngr / agrupamientoITLJN25.guadalajaraIngrAnt;
      totalAgrupamientoITLJN25.hermosilloPresPor = agrupamientoITLJN25.hermosilloIngr / agrupamientoITLJN25.hermosilloPres;
      totalAgrupamientoITLJN25.hermosilloPresAcPor = agrupamientoITLJN25.hermosilloIngrAc / agrupamientoITLJN25.hermosilloPresAc;
      totalAgrupamientoITLJN25.hermosilloIngrAntPor = agrupamientoITLJN25.hermosilloIngr / agrupamientoITLJN25.hermosilloIngrAnt;
      totalAgrupamientoITLJN25.mexicaliPresPor = agrupamientoITLJN25.mexicaliIngr / agrupamientoITLJN25.mexicaliPres;
      totalAgrupamientoITLJN25.mexicaliPresAcPor = agrupamientoITLJN25.mexicaliIngrAc / agrupamientoITLJN25.mexicaliPresAc;
      totalAgrupamientoITLJN25.mexicaliIngrAntPor = agrupamientoITLJN25.mexicaliIngr / agrupamientoITLJN25.mexicaliIngrAnt;
      totalAgrupamientoITLJN25.orizabaPresPor = agrupamientoITLJN25.orizabaIngr / agrupamientoITLJN25.orizabaPres;
      totalAgrupamientoITLJN25.orizabaPresAcPor = agrupamientoITLJN25.orizabaIngrAc / agrupamientoITLJN25.orizabaPresAc;
      totalAgrupamientoITLJN25.orizabaIngrAntPor = agrupamientoITLJN25.orizabaIngr / agrupamientoITLJN25.orizabaIngrAnt;
    
      event.summaryCells[6][0].value = totalAgrupamientoITLJN25.cuatitlanPresPor;
      event.summaryCells[9][0].value = totalAgrupamientoITLJN25.cuatitlanPresAcPor;
      event.summaryCells[11][0].value = totalAgrupamientoITLJN25.cuatitlanIngrAntPor;
      event.summaryCells[14][0].value = totalAgrupamientoITLJN25.tultitlanPresPor;
      event.summaryCells[17][0].value = totalAgrupamientoITLJN25.tultitlanPresAcPor;
      event.summaryCells[19][0].value = totalAgrupamientoITLJN25.tultitlanIngrAntPor;
      event.summaryCells[22][0].value = totalAgrupamientoITLJN25.guadalajaraPresPor;
      event.summaryCells[25][0].value = totalAgrupamientoITLJN25.guadalajaraPresAcPor;
      event.summaryCells[27][0].value = totalAgrupamientoITLJN25.guadalajaraIngrAntPor;
      event.summaryCells[30][0].value = totalAgrupamientoITLJN25.hermosilloPresPor;
      event.summaryCells[33][0].value = totalAgrupamientoITLJN25.hermosilloPresAcPor;
      event.summaryCells[35][0].value = totalAgrupamientoITLJN25.hermosilloIngrAntPor;
      event.summaryCells[38][0].value = totalAgrupamientoITLJN25.mexicaliPresPor;
      event.summaryCells[41][0].value = totalAgrupamientoITLJN25.mexicaliPresAcPor;
      event.summaryCells[43][0].value = totalAgrupamientoITLJN25.mexicaliIngrAntPor;
      event.summaryCells[46][0].value = totalAgrupamientoITLJN25.orizabaPresPor;
      event.summaryCells[49][0].value = totalAgrupamientoITLJN25.orizabaPresAcPor;
      event.summaryCells[51][0].value = totalAgrupamientoITLJN25.orizabaIngrAntPor;
    }
    if(event.data.key == '202507 JUL'){
      agrupamientoITLJL25.cuatitlanIngr = event.summaryCells[4][0].value;
      agrupamientoITLJL25.cuatitlanPres = event.summaryCells[5][0].value;
      agrupamientoITLJL25.cuatitlanIngrAc = event.summaryCells[7][0].value;
      agrupamientoITLJL25.cuatitlanPresAc = event.summaryCells[8][0].value;
      agrupamientoITLJL25.cuatitlanIngrAnt = event.summaryCells[10][0].value;
      agrupamientoITLJL25.tultitlanIngr = event.summaryCells[12][0].value;
      agrupamientoITLJL25.tultitlanPres = event.summaryCells[13][0].value;
      agrupamientoITLJL25.tultitlanIngrAc = event.summaryCells[15][0].value;
      agrupamientoITLJL25.tultitlanPresAc = event.summaryCells[16][0].value;
      agrupamientoITLJL25.tultitlanIngrAnt = event.summaryCells[18][0].value;
      agrupamientoITLJL25.guadalajaraIngr = event.summaryCells[20][0].value;
      agrupamientoITLJL25.guadalajaraPres = event.summaryCells[21][0].value;
      agrupamientoITLJL25.guadalajaraIngrAc = event.summaryCells[23][0].value;
      agrupamientoITLJL25.guadalajaraPresAc = event.summaryCells[24][0].value;
      agrupamientoITLJL25.guadalajaraIngrAnt = event.summaryCells[26][0].value;
      agrupamientoITLJL25.hermosilloIngr = event.summaryCells[28][0].value;
      agrupamientoITLJL25.hermosilloPres = event.summaryCells[29][0].value;
      agrupamientoITLJL25.hermosilloIngrAc = event.summaryCells[31][0].value;
      agrupamientoITLJL25.hermosilloPresAc = event.summaryCells[32][0].value;
      agrupamientoITLJL25.hermosilloIngrAnt = event.summaryCells[34][0].value;
      agrupamientoITLJL25.mexicaliIngr = event.summaryCells[36][0].value;
      agrupamientoITLJL25.mexicaliPres = event.summaryCells[37][0].value;
      agrupamientoITLJL25.mexicaliIngrAc = event.summaryCells[39][0].value;
      agrupamientoITLJL25.mexicaliPresAc = event.summaryCells[40][0].value;
      agrupamientoITLJL25.mexicaliIngrAnt = event.summaryCells[42][0].value;
      agrupamientoITLJL25.orizabaIngr = event.summaryCells[44][0].value;
      agrupamientoITLJL25.orizabaPres = event.summaryCells[45][0].value;
      agrupamientoITLJL25.orizabaIngrAc = event.summaryCells[47][0].value;
      agrupamientoITLJL25.orizabaPresAc = event.summaryCells[48][0].value;
      agrupamientoITLJL25.orizabaIngrAnt = event.summaryCells[50][0].value;

      totalAgrupamientoITLJL25.cuatitlanPresPor = agrupamientoITLJL25.cuatitlanIngr / agrupamientoITLJL25.cuatitlanPres;
      totalAgrupamientoITLJL25.cuatitlanPresAcPor = agrupamientoITLJL25.cuatitlanIngrAc / agrupamientoITLJL25.cuatitlanPresAc;
      totalAgrupamientoITLJL25.cuatitlanIngrAntPor = agrupamientoITLJL25.cuatitlanIngr / agrupamientoITLJL25.cuatitlanIngrAnt;
      totalAgrupamientoITLJL25.tultitlanPresPor = agrupamientoITLJL25.tultitlanIngr / agrupamientoITLJL25.tultitlanPres;
      totalAgrupamientoITLJL25.tultitlanPresAcPor = agrupamientoITLJL25.tultitlanIngrAc / agrupamientoITLJL25.tultitlanPresAc;
      totalAgrupamientoITLJL25.tultitlanIngrAntPor = agrupamientoITLJL25.tultitlanIngr / agrupamientoITLJL25.tultitlanIngrAnt;
      totalAgrupamientoITLJL25.guadalajaraPresPor = agrupamientoITLJL25.guadalajaraIngr / agrupamientoITLJL25.guadalajaraPres;
      totalAgrupamientoITLJL25.guadalajaraPresAcPor = agrupamientoITLJL25.guadalajaraIngrAc / agrupamientoITLJL25.guadalajaraPresAc;
      totalAgrupamientoITLJL25.guadalajaraIngrAntPor = agrupamientoITLJL25.guadalajaraIngr / agrupamientoITLJL25.guadalajaraIngrAnt;
      totalAgrupamientoITLJL25.hermosilloPresPor = agrupamientoITLJL25.hermosilloIngr / agrupamientoITLJL25.hermosilloPres;
      totalAgrupamientoITLJL25.hermosilloPresAcPor = agrupamientoITLJL25.hermosilloIngrAc / agrupamientoITLJL25.hermosilloPresAc;
      totalAgrupamientoITLJL25.hermosilloIngrAntPor = agrupamientoITLJL25.hermosilloIngr / agrupamientoITLJL25.hermosilloIngrAnt;
      totalAgrupamientoITLJL25.mexicaliPresPor = agrupamientoITLJL25.mexicaliIngr / agrupamientoITLJL25.mexicaliPres;
      totalAgrupamientoITLJL25.mexicaliPresAcPor = agrupamientoITLJL25.mexicaliIngrAc / agrupamientoITLJL25.mexicaliPresAc;
      totalAgrupamientoITLJL25.mexicaliIngrAntPor = agrupamientoITLJL25.mexicaliIngr / agrupamientoITLJL25.mexicaliIngrAnt;
      totalAgrupamientoITLJL25.orizabaPresPor = agrupamientoITLJL25.orizabaIngr / agrupamientoITLJL25.orizabaPres;
      totalAgrupamientoITLJL25.orizabaPresAcPor = agrupamientoITLJL25.orizabaIngrAc / agrupamientoITLJL25.orizabaPresAc;
      totalAgrupamientoITLJL25.orizabaIngrAntPor = agrupamientoITLJL25.orizabaIngr / agrupamientoITLJL25.orizabaIngrAnt;
    
      event.summaryCells[6][0].value = totalAgrupamientoITLJL25.cuatitlanPresPor;
      event.summaryCells[9][0].value = totalAgrupamientoITLJL25.cuatitlanPresAcPor;
      event.summaryCells[11][0].value = totalAgrupamientoITLJL25.cuatitlanIngrAntPor;
      event.summaryCells[14][0].value = totalAgrupamientoITLJL25.tultitlanPresPor;
      event.summaryCells[17][0].value = totalAgrupamientoITLJL25.tultitlanPresAcPor;
      event.summaryCells[19][0].value = totalAgrupamientoITLJL25.tultitlanIngrAntPor;
      event.summaryCells[22][0].value = totalAgrupamientoITLJL25.guadalajaraPresPor;
      event.summaryCells[25][0].value = totalAgrupamientoITLJL25.guadalajaraPresAcPor;
      event.summaryCells[27][0].value = totalAgrupamientoITLJL25.guadalajaraIngrAntPor;
      event.summaryCells[30][0].value = totalAgrupamientoITLJL25.hermosilloPresPor;
      event.summaryCells[33][0].value = totalAgrupamientoITLJL25.hermosilloPresAcPor;
      event.summaryCells[35][0].value = totalAgrupamientoITLJL25.hermosilloIngrAntPor;
      event.summaryCells[38][0].value = totalAgrupamientoITLJL25.mexicaliPresPor;
      event.summaryCells[41][0].value = totalAgrupamientoITLJL25.mexicaliPresAcPor;
      event.summaryCells[43][0].value = totalAgrupamientoITLJL25.mexicaliIngrAntPor;
      event.summaryCells[46][0].value = totalAgrupamientoITLJL25.orizabaPresPor;
      event.summaryCells[49][0].value = totalAgrupamientoITLJL25.orizabaPresAcPor;
      event.summaryCells[51][0].value = totalAgrupamientoITLJL25.orizabaIngrAntPor;
    }
    if(event.data.key == '202508 AGO'){
      agrupamientoITLAG25.cuatitlanIngr = event.summaryCells[4][0].value;
      agrupamientoITLAG25.cuatitlanPres = event.summaryCells[5][0].value;
      agrupamientoITLAG25.cuatitlanIngrAc = event.summaryCells[7][0].value;
      agrupamientoITLAG25.cuatitlanPresAc = event.summaryCells[8][0].value;
      agrupamientoITLAG25.cuatitlanIngrAnt = event.summaryCells[10][0].value;
      agrupamientoITLAG25.tultitlanIngr = event.summaryCells[12][0].value;
      agrupamientoITLAG25.tultitlanPres = event.summaryCells[13][0].value;
      agrupamientoITLAG25.tultitlanIngrAc = event.summaryCells[15][0].value;
      agrupamientoITLAG25.tultitlanPresAc = event.summaryCells[16][0].value;
      agrupamientoITLAG25.tultitlanIngrAnt = event.summaryCells[18][0].value;
      agrupamientoITLAG25.guadalajaraIngr = event.summaryCells[20][0].value;
      agrupamientoITLAG25.guadalajaraPres = event.summaryCells[21][0].value;
      agrupamientoITLAG25.guadalajaraIngrAc = event.summaryCells[23][0].value;
      agrupamientoITLAG25.guadalajaraPresAc = event.summaryCells[24][0].value;
      agrupamientoITLAG25.guadalajaraIngrAnt = event.summaryCells[26][0].value;
      agrupamientoITLAG25.hermosilloIngr = event.summaryCells[28][0].value;
      agrupamientoITLAG25.hermosilloPres = event.summaryCells[29][0].value;
      agrupamientoITLAG25.hermosilloIngrAc = event.summaryCells[31][0].value;
      agrupamientoITLAG25.hermosilloPresAc = event.summaryCells[32][0].value;
      agrupamientoITLAG25.hermosilloIngrAnt = event.summaryCells[34][0].value;
      agrupamientoITLAG25.mexicaliIngr = event.summaryCells[36][0].value;
      agrupamientoITLAG25.mexicaliPres = event.summaryCells[37][0].value;
      agrupamientoITLAG25.mexicaliIngrAc = event.summaryCells[39][0].value;
      agrupamientoITLAG25.mexicaliPresAc = event.summaryCells[40][0].value;
      agrupamientoITLAG25.mexicaliIngrAnt = event.summaryCells[42][0].value;
      agrupamientoITLAG25.orizabaIngr = event.summaryCells[44][0].value;
      agrupamientoITLAG25.orizabaPres = event.summaryCells[45][0].value;
      agrupamientoITLAG25.orizabaIngrAc = event.summaryCells[47][0].value;
      agrupamientoITLAG25.orizabaPresAc = event.summaryCells[48][0].value;
      agrupamientoITLAG25.orizabaIngrAnt = event.summaryCells[50][0].value;

      totalAgrupamientoITLAG25.cuatitlanPresPor = agrupamientoITLAG25.cuatitlanIngr / agrupamientoITLAG25.cuatitlanPres;
      totalAgrupamientoITLAG25.cuatitlanPresAcPor = agrupamientoITLAG25.cuatitlanIngrAc / agrupamientoITLAG25.cuatitlanPresAc;
      totalAgrupamientoITLAG25.cuatitlanIngrAntPor = agrupamientoITLAG25.cuatitlanIngr / agrupamientoITLAG25.cuatitlanIngrAnt;
      totalAgrupamientoITLAG25.tultitlanPresPor = agrupamientoITLAG25.tultitlanIngr / agrupamientoITLAG25.tultitlanPres;
      totalAgrupamientoITLAG25.tultitlanPresAcPor = agrupamientoITLAG25.tultitlanIngrAc / agrupamientoITLAG25.tultitlanPresAc;
      totalAgrupamientoITLAG25.tultitlanIngrAntPor = agrupamientoITLAG25.tultitlanIngr / agrupamientoITLAG25.tultitlanIngrAnt;
      totalAgrupamientoITLAG25.guadalajaraPresPor = agrupamientoITLAG25.guadalajaraIngr / agrupamientoITLAG25.guadalajaraPres;
      totalAgrupamientoITLAG25.guadalajaraPresAcPor = agrupamientoITLAG25.guadalajaraIngrAc / agrupamientoITLAG25.guadalajaraPresAc;
      totalAgrupamientoITLAG25.guadalajaraIngrAntPor = agrupamientoITLAG25.guadalajaraIngr / agrupamientoITLAG25.guadalajaraIngrAnt;
      totalAgrupamientoITLAG25.hermosilloPresPor = agrupamientoITLAG25.hermosilloIngr / agrupamientoITLAG25.hermosilloPres;
      totalAgrupamientoITLAG25.hermosilloPresAcPor = agrupamientoITLAG25.hermosilloIngrAc / agrupamientoITLAG25.hermosilloPresAc;
      totalAgrupamientoITLAG25.hermosilloIngrAntPor = agrupamientoITLAG25.hermosilloIngr / agrupamientoITLAG25.hermosilloIngrAnt;
      totalAgrupamientoITLAG25.mexicaliPresPor = agrupamientoITLAG25.mexicaliIngr / agrupamientoITLAG25.mexicaliPres;
      totalAgrupamientoITLAG25.mexicaliPresAcPor = agrupamientoITLAG25.mexicaliIngrAc / agrupamientoITLAG25.mexicaliPresAc;
      totalAgrupamientoITLAG25.mexicaliIngrAntPor = agrupamientoITLAG25.mexicaliIngr / agrupamientoITLAG25.mexicaliIngrAnt;
      totalAgrupamientoITLAG25.orizabaPresPor = agrupamientoITLAG25.orizabaIngr / agrupamientoITLAG25.orizabaPres;
      totalAgrupamientoITLAG25.orizabaPresAcPor = agrupamientoITLAG25.orizabaIngrAc / agrupamientoITLAG25.orizabaPresAc;
      totalAgrupamientoITLAG25.orizabaIngrAntPor = agrupamientoITLAG25.orizabaIngr / agrupamientoITLAG25.orizabaIngrAnt;
    
      event.summaryCells[6][0].value = totalAgrupamientoITLAG25.cuatitlanPresPor;
      event.summaryCells[9][0].value = totalAgrupamientoITLAG25.cuatitlanPresAcPor;
      event.summaryCells[11][0].value = totalAgrupamientoITLAG25.cuatitlanIngrAntPor;
      event.summaryCells[14][0].value = totalAgrupamientoITLAG25.tultitlanPresPor;
      event.summaryCells[17][0].value = totalAgrupamientoITLAG25.tultitlanPresAcPor;
      event.summaryCells[19][0].value = totalAgrupamientoITLAG25.tultitlanIngrAntPor;
      event.summaryCells[22][0].value = totalAgrupamientoITLAG25.guadalajaraPresPor;
      event.summaryCells[25][0].value = totalAgrupamientoITLAG25.guadalajaraPresAcPor;
      event.summaryCells[27][0].value = totalAgrupamientoITLAG25.guadalajaraIngrAntPor;
      event.summaryCells[30][0].value = totalAgrupamientoITLAG25.hermosilloPresPor;
      event.summaryCells[33][0].value = totalAgrupamientoITLAG25.hermosilloPresAcPor;
      event.summaryCells[35][0].value = totalAgrupamientoITLAG25.hermosilloIngrAntPor;
      event.summaryCells[38][0].value = totalAgrupamientoITLAG25.mexicaliPresPor;
      event.summaryCells[41][0].value = totalAgrupamientoITLAG25.mexicaliPresAcPor;
      event.summaryCells[43][0].value = totalAgrupamientoITLAG25.mexicaliIngrAntPor;
      event.summaryCells[46][0].value = totalAgrupamientoITLAG25.orizabaPresPor;
      event.summaryCells[49][0].value = totalAgrupamientoITLAG25.orizabaPresAcPor;
      event.summaryCells[51][0].value = totalAgrupamientoITLAG25.orizabaIngrAntPor;
    }
    if(event.data.key == '202509 SEP'){
      agrupamientoITLS25.cuatitlanIngr = event.summaryCells[4][0].value;
      agrupamientoITLS25.cuatitlanPres = event.summaryCells[5][0].value;
      agrupamientoITLS25.cuatitlanIngrAc = event.summaryCells[7][0].value;
      agrupamientoITLS25.cuatitlanPresAc = event.summaryCells[8][0].value;
      agrupamientoITLS25.cuatitlanIngrAnt = event.summaryCells[10][0].value;
      agrupamientoITLS25.tultitlanIngr = event.summaryCells[12][0].value;
      agrupamientoITLS25.tultitlanPres = event.summaryCells[13][0].value;
      agrupamientoITLS25.tultitlanIngrAc = event.summaryCells[15][0].value;
      agrupamientoITLS25.tultitlanPresAc = event.summaryCells[16][0].value;
      agrupamientoITLS25.tultitlanIngrAnt = event.summaryCells[18][0].value;
      agrupamientoITLS25.guadalajaraIngr = event.summaryCells[20][0].value;
      agrupamientoITLS25.guadalajaraPres = event.summaryCells[21][0].value;
      agrupamientoITLS25.guadalajaraIngrAc = event.summaryCells[23][0].value;
      agrupamientoITLS25.guadalajaraPresAc = event.summaryCells[24][0].value;
      agrupamientoITLS25.guadalajaraIngrAnt = event.summaryCells[26][0].value;
      agrupamientoITLS25.hermosilloIngr = event.summaryCells[28][0].value;
      agrupamientoITLS25.hermosilloPres = event.summaryCells[29][0].value;
      agrupamientoITLS25.hermosilloIngrAc = event.summaryCells[31][0].value;
      agrupamientoITLS25.hermosilloPresAc = event.summaryCells[32][0].value;
      agrupamientoITLS25.hermosilloIngrAnt = event.summaryCells[34][0].value;
      agrupamientoITLS25.mexicaliIngr = event.summaryCells[36][0].value;
      agrupamientoITLS25.mexicaliPres = event.summaryCells[37][0].value;
      agrupamientoITLS25.mexicaliIngrAc = event.summaryCells[39][0].value;
      agrupamientoITLS25.mexicaliPresAc = event.summaryCells[40][0].value;
      agrupamientoITLS25.mexicaliIngrAnt = event.summaryCells[42][0].value;
      agrupamientoITLS25.orizabaIngr = event.summaryCells[44][0].value;
      agrupamientoITLS25.orizabaPres = event.summaryCells[45][0].value;
      agrupamientoITLS25.orizabaIngrAc = event.summaryCells[47][0].value;
      agrupamientoITLS25.orizabaPresAc = event.summaryCells[48][0].value;
      agrupamientoITLS25.orizabaIngrAnt = event.summaryCells[50][0].value;

      totalAgrupamientoITLS25.cuatitlanPresPor = agrupamientoITLS25.cuatitlanIngr / agrupamientoITLS25.cuatitlanPres;
      totalAgrupamientoITLS25.cuatitlanPresAcPor = agrupamientoITLS25.cuatitlanIngrAc / agrupamientoITLS25.cuatitlanPresAc;
      totalAgrupamientoITLS25.cuatitlanIngrAntPor = agrupamientoITLS25.cuatitlanIngr / agrupamientoITLS25.cuatitlanIngrAnt;
      totalAgrupamientoITLS25.tultitlanPresPor = agrupamientoITLS25.tultitlanIngr / agrupamientoITLS25.tultitlanPres;
      totalAgrupamientoITLS25.tultitlanPresAcPor = agrupamientoITLS25.tultitlanIngrAc / agrupamientoITLS25.tultitlanPresAc;
      totalAgrupamientoITLS25.tultitlanIngrAntPor = agrupamientoITLS25.tultitlanIngr / agrupamientoITLS25.tultitlanIngrAnt;
      totalAgrupamientoITLS25.guadalajaraPresPor = agrupamientoITLS25.guadalajaraIngr / agrupamientoITLS25.guadalajaraPres;
      totalAgrupamientoITLS25.guadalajaraPresAcPor = agrupamientoITLS25.guadalajaraIngrAc / agrupamientoITLS25.guadalajaraPresAc;
      totalAgrupamientoITLS25.guadalajaraIngrAntPor = agrupamientoITLS25.guadalajaraIngr / agrupamientoITLS25.guadalajaraIngrAnt;
      totalAgrupamientoITLS25.hermosilloPresPor = agrupamientoITLS25.hermosilloIngr / agrupamientoITLS25.hermosilloPres;
      totalAgrupamientoITLS25.hermosilloPresAcPor = agrupamientoITLS25.hermosilloIngrAc / agrupamientoITLS25.hermosilloPresAc;
      totalAgrupamientoITLS25.hermosilloIngrAntPor = agrupamientoITLS25.hermosilloIngr / agrupamientoITLS25.hermosilloIngrAnt;
      totalAgrupamientoITLS25.mexicaliPresPor = agrupamientoITLS25.mexicaliIngr / agrupamientoITLS25.mexicaliPres;
      totalAgrupamientoITLS25.mexicaliPresAcPor = agrupamientoITLS25.mexicaliIngrAc / agrupamientoITLS25.mexicaliPresAc;
      totalAgrupamientoITLS25.mexicaliIngrAntPor = agrupamientoITLS25.mexicaliIngr / agrupamientoITLS25.mexicaliIngrAnt;
      totalAgrupamientoITLS25.orizabaPresPor = agrupamientoITLS25.orizabaIngr / agrupamientoITLS25.orizabaPres;
      totalAgrupamientoITLS25.orizabaPresAcPor = agrupamientoITLS25.orizabaIngrAc / agrupamientoITLS25.orizabaPresAc;
      totalAgrupamientoITLS25.orizabaIngrAntPor = agrupamientoITLS25.orizabaIngr / agrupamientoITLS25.orizabaIngrAnt;
    
      event.summaryCells[6][0].value = totalAgrupamientoITLS25.cuatitlanPresPor;
      event.summaryCells[9][0].value = totalAgrupamientoITLS25.cuatitlanPresAcPor;
      event.summaryCells[11][0].value = totalAgrupamientoITLS25.cuatitlanIngrAntPor;
      event.summaryCells[14][0].value = totalAgrupamientoITLS25.tultitlanPresPor;
      event.summaryCells[17][0].value = totalAgrupamientoITLS25.tultitlanPresAcPor;
      event.summaryCells[19][0].value = totalAgrupamientoITLS25.tultitlanIngrAntPor;
      event.summaryCells[22][0].value = totalAgrupamientoITLS25.guadalajaraPresPor;
      event.summaryCells[25][0].value = totalAgrupamientoITLS25.guadalajaraPresAcPor;
      event.summaryCells[27][0].value = totalAgrupamientoITLS25.guadalajaraIngrAntPor;
      event.summaryCells[30][0].value = totalAgrupamientoITLS25.hermosilloPresPor;
      event.summaryCells[33][0].value = totalAgrupamientoITLS25.hermosilloPresAcPor;
      event.summaryCells[35][0].value = totalAgrupamientoITLS25.hermosilloIngrAntPor;
      event.summaryCells[38][0].value = totalAgrupamientoITLS25.mexicaliPresPor;
      event.summaryCells[41][0].value = totalAgrupamientoITLS25.mexicaliPresAcPor;
      event.summaryCells[43][0].value = totalAgrupamientoITLS25.mexicaliIngrAntPor;
      event.summaryCells[46][0].value = totalAgrupamientoITLS25.orizabaPresPor;
      event.summaryCells[49][0].value = totalAgrupamientoITLS25.orizabaPresAcPor;
      event.summaryCells[51][0].value = totalAgrupamientoITLS25.orizabaIngrAntPor;
    }
    if(event.data.key == '202510 OCT'){
      agrupamientoITLOC25.cuatitlanIngr = event.summaryCells[4][0].value;
      agrupamientoITLOC25.cuatitlanPres = event.summaryCells[5][0].value;
      agrupamientoITLOC25.cuatitlanIngrAc = event.summaryCells[7][0].value;
      agrupamientoITLOC25.cuatitlanPresAc = event.summaryCells[8][0].value;
      agrupamientoITLOC25.cuatitlanIngrAnt = event.summaryCells[10][0].value;
      agrupamientoITLOC25.tultitlanIngr = event.summaryCells[12][0].value;
      agrupamientoITLOC25.tultitlanPres = event.summaryCells[13][0].value;
      agrupamientoITLOC25.tultitlanIngrAc = event.summaryCells[15][0].value;
      agrupamientoITLOC25.tultitlanPresAc = event.summaryCells[16][0].value;
      agrupamientoITLOC25.tultitlanIngrAnt = event.summaryCells[18][0].value;
      agrupamientoITLOC25.guadalajaraIngr = event.summaryCells[20][0].value;
      agrupamientoITLOC25.guadalajaraPres = event.summaryCells[21][0].value;
      agrupamientoITLOC25.guadalajaraIngrAc = event.summaryCells[23][0].value;
      agrupamientoITLOC25.guadalajaraPresAc = event.summaryCells[24][0].value;
      agrupamientoITLOC25.guadalajaraIngrAnt = event.summaryCells[26][0].value;
      agrupamientoITLOC25.hermosilloIngr = event.summaryCells[28][0].value;
      agrupamientoITLOC25.hermosilloPres = event.summaryCells[29][0].value;
      agrupamientoITLOC25.hermosilloIngrAc = event.summaryCells[31][0].value;
      agrupamientoITLOC25.hermosilloPresAc = event.summaryCells[32][0].value;
      agrupamientoITLOC25.hermosilloIngrAnt = event.summaryCells[34][0].value;
      agrupamientoITLOC25.mexicaliIngr = event.summaryCells[36][0].value;
      agrupamientoITLOC25.mexicaliPres = event.summaryCells[37][0].value;
      agrupamientoITLOC25.mexicaliIngrAc = event.summaryCells[39][0].value;
      agrupamientoITLOC25.mexicaliPresAc = event.summaryCells[40][0].value;
      agrupamientoITLOC25.mexicaliIngrAnt = event.summaryCells[42][0].value;
      agrupamientoITLOC25.orizabaIngr = event.summaryCells[44][0].value;
      agrupamientoITLOC25.orizabaPres = event.summaryCells[45][0].value;
      agrupamientoITLOC25.orizabaIngrAc = event.summaryCells[47][0].value;
      agrupamientoITLOC25.orizabaPresAc = event.summaryCells[48][0].value;
      agrupamientoITLOC25.orizabaIngrAnt = event.summaryCells[50][0].value;

      totalAgrupamientoITLOC25.cuatitlanPresPor = agrupamientoITLOC25.cuatitlanIngr / agrupamientoITLOC25.cuatitlanPres;
      totalAgrupamientoITLOC25.cuatitlanPresAcPor = agrupamientoITLOC25.cuatitlanIngrAc / agrupamientoITLOC25.cuatitlanPresAc;
      totalAgrupamientoITLOC25.cuatitlanIngrAntPor = agrupamientoITLOC25.cuatitlanIngr / agrupamientoITLOC25.cuatitlanIngrAnt;
      totalAgrupamientoITLOC25.tultitlanPresPor = agrupamientoITLOC25.tultitlanIngr / agrupamientoITLOC25.tultitlanPres;
      totalAgrupamientoITLOC25.tultitlanPresAcPor = agrupamientoITLOC25.tultitlanIngrAc / agrupamientoITLOC25.tultitlanPresAc;
      totalAgrupamientoITLOC25.tultitlanIngrAntPor = agrupamientoITLOC25.tultitlanIngr / agrupamientoITLOC25.tultitlanIngrAnt;
      totalAgrupamientoITLOC25.guadalajaraPresPor = agrupamientoITLOC25.guadalajaraIngr / agrupamientoITLOC25.guadalajaraPres;
      totalAgrupamientoITLOC25.guadalajaraPresAcPor = agrupamientoITLOC25.guadalajaraIngrAc / agrupamientoITLOC25.guadalajaraPresAc;
      totalAgrupamientoITLOC25.guadalajaraIngrAntPor = agrupamientoITLOC25.guadalajaraIngr / agrupamientoITLOC25.guadalajaraIngrAnt;
      totalAgrupamientoITLOC25.hermosilloPresPor = agrupamientoITLOC25.hermosilloIngr / agrupamientoITLOC25.hermosilloPres;
      totalAgrupamientoITLOC25.hermosilloPresAcPor = agrupamientoITLOC25.hermosilloIngrAc / agrupamientoITLOC25.hermosilloPresAc;
      totalAgrupamientoITLOC25.hermosilloIngrAntPor = agrupamientoITLOC25.hermosilloIngr / agrupamientoITLOC25.hermosilloIngrAnt;
      totalAgrupamientoITLOC25.mexicaliPresPor = agrupamientoITLOC25.mexicaliIngr / agrupamientoITLOC25.mexicaliPres;
      totalAgrupamientoITLOC25.mexicaliPresAcPor = agrupamientoITLOC25.mexicaliIngrAc / agrupamientoITLOC25.mexicaliPresAc;
      totalAgrupamientoITLOC25.mexicaliIngrAntPor = agrupamientoITLOC25.mexicaliIngr / agrupamientoITLOC25.mexicaliIngrAnt;
      totalAgrupamientoITLOC25.orizabaPresPor = agrupamientoITLOC25.orizabaIngr / agrupamientoITLOC25.orizabaPres;
      totalAgrupamientoITLOC25.orizabaPresAcPor = agrupamientoITLOC25.orizabaIngrAc / agrupamientoITLOC25.orizabaPresAc;
      totalAgrupamientoITLOC25.orizabaIngrAntPor = agrupamientoITLOC25.orizabaIngr / agrupamientoITLOC25.orizabaIngrAnt;
    
      event.summaryCells[6][0].value = totalAgrupamientoITLOC25.cuatitlanPresPor;
      event.summaryCells[9][0].value = totalAgrupamientoITLOC25.cuatitlanPresAcPor;
      event.summaryCells[11][0].value = totalAgrupamientoITLOC25.cuatitlanIngrAntPor;
      event.summaryCells[14][0].value = totalAgrupamientoITLOC25.tultitlanPresPor;
      event.summaryCells[17][0].value = totalAgrupamientoITLOC25.tultitlanPresAcPor;
      event.summaryCells[19][0].value = totalAgrupamientoITLOC25.tultitlanIngrAntPor;
      event.summaryCells[22][0].value = totalAgrupamientoITLOC25.guadalajaraPresPor;
      event.summaryCells[25][0].value = totalAgrupamientoITLOC25.guadalajaraPresAcPor;
      event.summaryCells[27][0].value = totalAgrupamientoITLOC25.guadalajaraIngrAntPor;
      event.summaryCells[30][0].value = totalAgrupamientoITLOC25.hermosilloPresPor;
      event.summaryCells[33][0].value = totalAgrupamientoITLOC25.hermosilloPresAcPor;
      event.summaryCells[35][0].value = totalAgrupamientoITLOC25.hermosilloIngrAntPor;
      event.summaryCells[38][0].value = totalAgrupamientoITLOC25.mexicaliPresPor;
      event.summaryCells[41][0].value = totalAgrupamientoITLOC25.mexicaliPresAcPor;
      event.summaryCells[43][0].value = totalAgrupamientoITLOC25.mexicaliIngrAntPor;
      event.summaryCells[46][0].value = totalAgrupamientoITLOC25.orizabaPresPor;
      event.summaryCells[49][0].value = totalAgrupamientoITLOC25.orizabaPresAcPor;
      event.summaryCells[51][0].value = totalAgrupamientoITLOC25.orizabaIngrAntPor;
    }
    if(event.data.key == '202511 NOV'){
      agrupamientoITLNV25.cuatitlanIngr = event.summaryCells[4][0].value;
      agrupamientoITLNV25.cuatitlanPres = event.summaryCells[5][0].value;
      agrupamientoITLNV25.cuatitlanIngrAc = event.summaryCells[7][0].value;
      agrupamientoITLNV25.cuatitlanPresAc = event.summaryCells[8][0].value;
      agrupamientoITLNV25.cuatitlanIngrAnt = event.summaryCells[10][0].value;
      agrupamientoITLNV25.tultitlanIngr = event.summaryCells[12][0].value;
      agrupamientoITLNV25.tultitlanPres = event.summaryCells[13][0].value;
      agrupamientoITLNV25.tultitlanIngrAc = event.summaryCells[15][0].value;
      agrupamientoITLNV25.tultitlanPresAc = event.summaryCells[16][0].value;
      agrupamientoITLNV25.tultitlanIngrAnt = event.summaryCells[18][0].value;
      agrupamientoITLNV25.guadalajaraIngr = event.summaryCells[20][0].value;
      agrupamientoITLNV25.guadalajaraPres = event.summaryCells[21][0].value;
      agrupamientoITLNV25.guadalajaraIngrAc = event.summaryCells[23][0].value;
      agrupamientoITLNV25.guadalajaraPresAc = event.summaryCells[24][0].value;
      agrupamientoITLNV25.guadalajaraIngrAnt = event.summaryCells[26][0].value;
      agrupamientoITLNV25.hermosilloIngr = event.summaryCells[28][0].value;
      agrupamientoITLNV25.hermosilloPres = event.summaryCells[29][0].value;
      agrupamientoITLNV25.hermosilloIngrAc = event.summaryCells[31][0].value;
      agrupamientoITLNV25.hermosilloPresAc = event.summaryCells[32][0].value;
      agrupamientoITLNV25.hermosilloIngrAnt = event.summaryCells[34][0].value;
      agrupamientoITLNV25.mexicaliIngr = event.summaryCells[36][0].value;
      agrupamientoITLNV25.mexicaliPres = event.summaryCells[37][0].value;
      agrupamientoITLNV25.mexicaliIngrAc = event.summaryCells[39][0].value;
      agrupamientoITLNV25.mexicaliPresAc = event.summaryCells[40][0].value;
      agrupamientoITLNV25.mexicaliIngrAnt = event.summaryCells[42][0].value;
      agrupamientoITLNV25.orizabaIngr = event.summaryCells[44][0].value;
      agrupamientoITLNV25.orizabaPres = event.summaryCells[45][0].value;
      agrupamientoITLNV25.orizabaIngrAc = event.summaryCells[47][0].value;
      agrupamientoITLNV25.orizabaPresAc = event.summaryCells[48][0].value;
      agrupamientoITLNV25.orizabaIngrAnt = event.summaryCells[50][0].value;

      totalAgrupamientoITLNV25.cuatitlanPresPor = agrupamientoITLNV25.cuatitlanIngr / agrupamientoITLNV25.cuatitlanPres;
      totalAgrupamientoITLNV25.cuatitlanPresAcPor = agrupamientoITLNV25.cuatitlanIngrAc / agrupamientoITLNV25.cuatitlanPresAc;
      totalAgrupamientoITLNV25.cuatitlanIngrAntPor = agrupamientoITLNV25.cuatitlanIngr / agrupamientoITLNV25.cuatitlanIngrAnt;
      totalAgrupamientoITLNV25.tultitlanPresPor = agrupamientoITLNV25.tultitlanIngr / agrupamientoITLNV25.tultitlanPres;
      totalAgrupamientoITLNV25.tultitlanPresAcPor = agrupamientoITLNV25.tultitlanIngrAc / agrupamientoITLNV25.tultitlanPresAc;
      totalAgrupamientoITLNV25.tultitlanIngrAntPor = agrupamientoITLNV25.tultitlanIngr / agrupamientoITLNV25.tultitlanIngrAnt;
      totalAgrupamientoITLNV25.guadalajaraPresPor = agrupamientoITLNV25.guadalajaraIngr / agrupamientoITLNV25.guadalajaraPres;
      totalAgrupamientoITLNV25.guadalajaraPresAcPor = agrupamientoITLNV25.guadalajaraIngrAc / agrupamientoITLNV25.guadalajaraPresAc;
      totalAgrupamientoITLNV25.guadalajaraIngrAntPor = agrupamientoITLNV25.guadalajaraIngr / agrupamientoITLNV25.guadalajaraIngrAnt;
      totalAgrupamientoITLNV25.hermosilloPresPor = agrupamientoITLNV25.hermosilloIngr / agrupamientoITLNV25.hermosilloPres;
      totalAgrupamientoITLNV25.hermosilloPresAcPor = agrupamientoITLNV25.hermosilloIngrAc / agrupamientoITLNV25.hermosilloPresAc;
      totalAgrupamientoITLNV25.hermosilloIngrAntPor = agrupamientoITLNV25.hermosilloIngr / agrupamientoITLNV25.hermosilloIngrAnt;
      totalAgrupamientoITLNV25.mexicaliPresPor = agrupamientoITLNV25.mexicaliIngr / agrupamientoITLNV25.mexicaliPres;
      totalAgrupamientoITLNV25.mexicaliPresAcPor = agrupamientoITLNV25.mexicaliIngrAc / agrupamientoITLNV25.mexicaliPresAc;
      totalAgrupamientoITLNV25.mexicaliIngrAntPor = agrupamientoITLNV25.mexicaliIngr / agrupamientoITLNV25.mexicaliIngrAnt;
      totalAgrupamientoITLNV25.orizabaPresPor = agrupamientoITLNV25.orizabaIngr / agrupamientoITLNV25.orizabaPres;
      totalAgrupamientoITLNV25.orizabaPresAcPor = agrupamientoITLNV25.orizabaIngrAc / agrupamientoITLNV25.orizabaPresAc;
      totalAgrupamientoITLNV25.orizabaIngrAntPor = agrupamientoITLNV25.orizabaIngr / agrupamientoITLNV25.orizabaIngrAnt;
    
      event.summaryCells[6][0].value = totalAgrupamientoITLNV25.cuatitlanPresPor;
      event.summaryCells[9][0].value = totalAgrupamientoITLNV25.cuatitlanPresAcPor;
      event.summaryCells[11][0].value = totalAgrupamientoITLNV25.cuatitlanIngrAntPor;
      event.summaryCells[14][0].value = totalAgrupamientoITLNV25.tultitlanPresPor;
      event.summaryCells[17][0].value = totalAgrupamientoITLNV25.tultitlanPresAcPor;
      event.summaryCells[19][0].value = totalAgrupamientoITLNV25.tultitlanIngrAntPor;
      event.summaryCells[22][0].value = totalAgrupamientoITLNV25.guadalajaraPresPor;
      event.summaryCells[25][0].value = totalAgrupamientoITLNV25.guadalajaraPresAcPor;
      event.summaryCells[27][0].value = totalAgrupamientoITLNV25.guadalajaraIngrAntPor;
      event.summaryCells[30][0].value = totalAgrupamientoITLNV25.hermosilloPresPor;
      event.summaryCells[33][0].value = totalAgrupamientoITLNV25.hermosilloPresAcPor;
      event.summaryCells[35][0].value = totalAgrupamientoITLNV25.hermosilloIngrAntPor;
      event.summaryCells[38][0].value = totalAgrupamientoITLNV25.mexicaliPresPor;
      event.summaryCells[41][0].value = totalAgrupamientoITLNV25.mexicaliPresAcPor;
      event.summaryCells[43][0].value = totalAgrupamientoITLNV25.mexicaliIngrAntPor;
      event.summaryCells[46][0].value = totalAgrupamientoITLNV25.orizabaPresPor;
      event.summaryCells[49][0].value = totalAgrupamientoITLNV25.orizabaPresAcPor;
      event.summaryCells[51][0].value = totalAgrupamientoITLNV25.orizabaIngrAntPor;
    }
    if(event.data.key == '202512 DIC'){
      agrupamientoITLDC25.cuatitlanIngr = event.summaryCells[4][0].value;
      agrupamientoITLDC25.cuatitlanPres = event.summaryCells[5][0].value;
      agrupamientoITLDC25.cuatitlanIngrAc = event.summaryCells[7][0].value;
      agrupamientoITLDC25.cuatitlanPresAc = event.summaryCells[8][0].value;
      agrupamientoITLDC25.cuatitlanIngrAnt = event.summaryCells[10][0].value;
      agrupamientoITLDC25.tultitlanIngr = event.summaryCells[12][0].value;
      agrupamientoITLDC25.tultitlanPres = event.summaryCells[13][0].value;
      agrupamientoITLDC25.tultitlanIngrAc = event.summaryCells[15][0].value;
      agrupamientoITLDC25.tultitlanPresAc = event.summaryCells[16][0].value;
      agrupamientoITLDC25.tultitlanIngrAnt = event.summaryCells[18][0].value;
      agrupamientoITLDC25.guadalajaraIngr = event.summaryCells[20][0].value;
      agrupamientoITLDC25.guadalajaraPres = event.summaryCells[21][0].value;
      agrupamientoITLDC25.guadalajaraIngrAc = event.summaryCells[23][0].value;
      agrupamientoITLDC25.guadalajaraPresAc = event.summaryCells[24][0].value;
      agrupamientoITLDC25.guadalajaraIngrAnt = event.summaryCells[26][0].value;
      agrupamientoITLDC25.hermosilloIngr = event.summaryCells[28][0].value;
      agrupamientoITLDC25.hermosilloPres = event.summaryCells[29][0].value;
      agrupamientoITLDC25.hermosilloIngrAc = event.summaryCells[31][0].value;
      agrupamientoITLDC25.hermosilloPresAc = event.summaryCells[32][0].value;
      agrupamientoITLDC25.hermosilloIngrAnt = event.summaryCells[34][0].value;
      agrupamientoITLDC25.mexicaliIngr = event.summaryCells[36][0].value;
      agrupamientoITLDC25.mexicaliPres = event.summaryCells[37][0].value;
      agrupamientoITLDC25.mexicaliIngrAc = event.summaryCells[39][0].value;
      agrupamientoITLDC25.mexicaliPresAc = event.summaryCells[40][0].value;
      agrupamientoITLDC25.mexicaliIngrAnt = event.summaryCells[42][0].value;
      agrupamientoITLDC25.orizabaIngr = event.summaryCells[44][0].value;
      agrupamientoITLDC25.orizabaPres = event.summaryCells[45][0].value;
      agrupamientoITLDC25.orizabaIngrAc = event.summaryCells[47][0].value;
      agrupamientoITLDC25.orizabaPresAc = event.summaryCells[48][0].value;
      agrupamientoITLDC25.orizabaIngrAnt = event.summaryCells[50][0].value;

      totalAgrupamientoITLDC25.cuatitlanPresPor = agrupamientoITLDC25.cuatitlanIngr / agrupamientoITLDC25.cuatitlanPres;
      totalAgrupamientoITLDC25.cuatitlanPresAcPor = agrupamientoITLDC25.cuatitlanIngrAc / agrupamientoITLDC25.cuatitlanPresAc;
      totalAgrupamientoITLDC25.cuatitlanIngrAntPor = agrupamientoITLDC25.cuatitlanIngr / agrupamientoITLDC25.cuatitlanIngrAnt;
      totalAgrupamientoITLDC25.tultitlanPresPor = agrupamientoITLDC25.tultitlanIngr / agrupamientoITLDC25.tultitlanPres;
      totalAgrupamientoITLDC25.tultitlanPresAcPor = agrupamientoITLDC25.tultitlanIngrAc / agrupamientoITLDC25.tultitlanPresAc;
      totalAgrupamientoITLDC25.tultitlanIngrAntPor = agrupamientoITLDC25.tultitlanIngr / agrupamientoITLDC25.tultitlanIngrAnt;
      totalAgrupamientoITLDC25.guadalajaraPresPor = agrupamientoITLDC25.guadalajaraIngr / agrupamientoITLDC25.guadalajaraPres;
      totalAgrupamientoITLDC25.guadalajaraPresAcPor = agrupamientoITLDC25.guadalajaraIngrAc / agrupamientoITLDC25.guadalajaraPresAc;
      totalAgrupamientoITLDC25.guadalajaraIngrAntPor = agrupamientoITLDC25.guadalajaraIngr / agrupamientoITLDC25.guadalajaraIngrAnt;
      totalAgrupamientoITLDC25.hermosilloPresPor = agrupamientoITLDC25.hermosilloIngr / agrupamientoITLDC25.hermosilloPres;
      totalAgrupamientoITLDC25.hermosilloPresAcPor = agrupamientoITLDC25.hermosilloIngrAc / agrupamientoITLDC25.hermosilloPresAc;
      totalAgrupamientoITLDC25.hermosilloIngrAntPor = agrupamientoITLDC25.hermosilloIngr / agrupamientoITLDC25.hermosilloIngrAnt;
      totalAgrupamientoITLDC25.mexicaliPresPor = agrupamientoITLDC25.mexicaliIngr / agrupamientoITLDC25.mexicaliPres;
      totalAgrupamientoITLDC25.mexicaliPresAcPor = agrupamientoITLDC25.mexicaliIngrAc / agrupamientoITLDC25.mexicaliPresAc;
      totalAgrupamientoITLDC25.mexicaliIngrAntPor = agrupamientoITLDC25.mexicaliIngr / agrupamientoITLDC25.mexicaliIngrAnt;
      totalAgrupamientoITLDC25.orizabaPresPor = agrupamientoITLDC25.orizabaIngr / agrupamientoITLDC25.orizabaPres;
      totalAgrupamientoITLDC25.orizabaPresAcPor = agrupamientoITLDC25.orizabaIngrAc / agrupamientoITLDC25.orizabaPresAc;
      totalAgrupamientoITLDC25.orizabaIngrAntPor = agrupamientoITLDC25.orizabaIngr / agrupamientoITLDC25.orizabaIngrAnt;
    
      event.summaryCells[6][0].value = totalAgrupamientoITLDC25.cuatitlanPresPor;
      event.summaryCells[9][0].value = totalAgrupamientoITLDC25.cuatitlanPresAcPor;
      event.summaryCells[11][0].value = totalAgrupamientoITLDC25.cuatitlanIngrAntPor;
      event.summaryCells[14][0].value = totalAgrupamientoITLDC25.tultitlanPresPor;
      event.summaryCells[17][0].value = totalAgrupamientoITLDC25.tultitlanPresAcPor;
      event.summaryCells[19][0].value = totalAgrupamientoITLDC25.tultitlanIngrAntPor;
      event.summaryCells[22][0].value = totalAgrupamientoITLDC25.guadalajaraPresPor;
      event.summaryCells[25][0].value = totalAgrupamientoITLDC25.guadalajaraPresAcPor;
      event.summaryCells[27][0].value = totalAgrupamientoITLDC25.guadalajaraIngrAntPor;
      event.summaryCells[30][0].value = totalAgrupamientoITLDC25.hermosilloPresPor;
      event.summaryCells[33][0].value = totalAgrupamientoITLDC25.hermosilloPresAcPor;
      event.summaryCells[35][0].value = totalAgrupamientoITLDC25.hermosilloIngrAntPor;
      event.summaryCells[38][0].value = totalAgrupamientoITLDC25.mexicaliPresPor;
      event.summaryCells[41][0].value = totalAgrupamientoITLDC25.mexicaliPresAcPor;
      event.summaryCells[43][0].value = totalAgrupamientoITLDC25.mexicaliIngrAntPor;
      event.summaryCells[46][0].value = totalAgrupamientoITLDC25.orizabaPresPor;
      event.summaryCells[49][0].value = totalAgrupamientoITLDC25.orizabaPresAcPor;
      event.summaryCells[51][0].value = totalAgrupamientoITLDC25.orizabaIngrAntPor;
    }
    
  }
}

onCellPreparedITL2025(e){
  if (e.rowType == 'group'){

    e.cellElement.style.fontSize = '12px';
    e.cellElement.style.background = "#DCDCDC";
  }

  if (e.rowType == 'totalFooter') {
  
    e.totalItem.cells.forEach((c: any) => {

      if (c.cellElement) {
        c.cellElement.style.fontWeight = "bolder";
        c.cellElement.style.fontSize = "16px";
        c.cellElement.style.background = "#ff9460";
        c.cellElement.style.color = "black"; 
    }   

    totalOperacionITL25.cuatitlanIngr = c.totalItem.summaryCells[4][0].value;
    totalOperacionITL25.cuatitlanPres = c.totalItem.summaryCells[5][0].value;
    totalOperacionITL25.cuatitlanIngrAc = c.totalItem.summaryCells[7][0].value;
    totalOperacionITL25.cuatitlanPresAc = c.totalItem.summaryCells[8][0].value;
    totalOperacionITL25.cuatitlanIngrAnt = c.totalItem.summaryCells[10][0].value;
    totalOperacionITL25.tultitlanIngr = c.totalItem.summaryCells[12][0].value;
    totalOperacionITL25.tultitlanPres = c.totalItem.summaryCells[13][0].value;
    totalOperacionITL25.tultitlanIngrAc = c.totalItem.summaryCells[15][0].value;
    totalOperacionITL25.tultitlanPresAc = c.totalItem.summaryCells[16][0].value;
    totalOperacionITL25.tultitlanIngrAnt = c.totalItem.summaryCells[18][0].value;
    totalOperacionITL25.guadalajaraIngr = c.totalItem.summaryCells[20][0].value;
    totalOperacionITL25.guadalajaraPres = c.totalItem.summaryCells[21][0].value;
    totalOperacionITL25.guadalajaraIngrAc = c.totalItem.summaryCells[23][0].value;
    totalOperacionITL25.guadalajaraPresAc = c.totalItem.summaryCells[24][0].value;
    totalOperacionITL25.guadalajaraIngrAnt = c.totalItem.summaryCells[26][0].value;
    totalOperacionITL25.hermosilloIngr = c.totalItem.summaryCells[28][0].value;
    totalOperacionITL25.hermosilloPres = c.totalItem.summaryCells[29][0].value;
    totalOperacionITL25.hermosilloIngrAc = c.totalItem.summaryCells[31][0].value;
    totalOperacionITL25.hermosilloPresAc = c.totalItem.summaryCells[32][0].value;
    totalOperacionITL25.hermosilloIngrAnt = c.totalItem.summaryCells[34][0].value;
    totalOperacionITL25.mexicaliIngr = c.totalItem.summaryCells[36][0].value;
    totalOperacionITL25.mexicaliPres = c.totalItem.summaryCells[37][0].value;
    totalOperacionITL25.mexicaliIngrAc = c.totalItem.summaryCells[39][0].value;
    totalOperacionITL25.mexicaliPresAc = c.totalItem.summaryCells[40][0].value;
    totalOperacionITL25.mexicaliIngrAnt = c.totalItem.summaryCells[42][0].value;
    totalOperacionITL25.orizabaIngr = c.totalItem.summaryCells[44][0].value;
    totalOperacionITL25.orizabaPres = c.totalItem.summaryCells[45][0].value;
    totalOperacionITL25.orizabaIngrAc = c.totalItem.summaryCells[47][0].value;
    totalOperacionITL25.orizabaPresAc = c.totalItem.summaryCells[48][0].value;
    totalOperacionITL25.orizabaIngrAnt = c.totalItem.summaryCells[50][0].value;
    
    totalOperacionITL25.cuatitlanIngr === 0 ? c.totalItem.summaryCells[6][0].value = 0 : c.totalItem.summaryCells[6][0].value = totalOperacionITL25.cuatitlanIngr / totalOperacionITL25.cuatitlanPres;
    totalOperacionITL25.cuatitlanIngrAc == 0 ? c.totalItem.summaryCells[9][0].value = 0 : c.totalItem.summaryCells[9][0].value =   totalOperacionITL25.cuatitlanIngrAc / totalOperacionITL25.cuatitlanPresAc;
    totalOperacionITL25.cuatitlanIngr == 0 ? c.totalItem.summaryCells[11][0].value = 0 : c.totalItem.summaryCells[11][0].value =   totalOperacionITL25.cuatitlanIngr / totalOperacionITL25.cuatitlanIngrAnt;
    totalOperacionITL25.tultitlanIngr == 0 ? c.totalItem.summaryCells[14][0].value = 0 : c.totalItem.summaryCells[14][0].value =   totalOperacionITL25.tultitlanIngr / totalOperacionITL25.tultitlanPres;
    totalOperacionITL25.tultitlanIngrAc == 0 ? c.totalItem.summaryCells[17][0].value = 0 : c.totalItem.summaryCells[17][0].value =   totalOperacionITL25.tultitlanIngrAc / totalOperacionITL25.tultitlanPresAc;
    totalOperacionITL25.tultitlanIngr == 0 ? c.totalItem.summaryCells[19][0].value = 0 : c.totalItem.summaryCells[19][0].value =   totalOperacionITL25.tultitlanIngr / totalOperacionITL25.tultitlanIngrAnt;
    totalOperacionITL25.guadalajaraIngr == 0 ? c.totalItem.summaryCells[22][0].value = 0 : c.totalItem.summaryCells[22][0].value =   totalOperacionITL25.guadalajaraIngr / totalOperacionITL25.guadalajaraPres;
    totalOperacionITL25.guadalajaraIngrAc == 0 ? c.totalItem.summaryCells[25][0].value = 0 : c.totalItem.summaryCells[25][0].value =   totalOperacionITL25.guadalajaraIngrAc / totalOperacionITL25.guadalajaraPresAc;
    totalOperacionITL25.guadalajaraIngr == 0 ? c.totalItem.summaryCells[27][0].value = 0 : c.totalItem.summaryCells[27][0].value =   totalOperacionITL25.guadalajaraIngr / totalOperacionITL25.guadalajaraIngrAnt;
    totalOperacionITL25.hermosilloIngr == 0 ? c.totalItem.summaryCells[30][0].value = 0 : c.totalItem.summaryCells[30][0].value =   totalOperacionITL25.hermosilloIngr / totalOperacionITL25.hermosilloPres;
    totalOperacionITL25.hermosilloIngrAc == 0 ? c.totalItem.summaryCells[33][0].value = 0 : c.totalItem.summaryCells[33][0].value =   totalOperacionITL25.hermosilloIngrAc / totalOperacionITL25.hermosilloPresAc;
    totalOperacionITL25.hermosilloIngr == 0 ? c.totalItem.summaryCells[35][0].value = 0 : c.totalItem.summaryCells[35][0].value =   totalOperacionITL25.hermosilloIngr / totalOperacionITL25.hermosilloIngrAnt;
    totalOperacionITL25.mexicaliIngr == 0 ? c.totalItem.summaryCells[38][0].value = 0 : c.totalItem.summaryCells[38][0].value =   totalOperacionITL25.mexicaliIngr / totalOperacionITL25.mexicaliPres;
    totalOperacionITL25.mexicaliIngrAc == 0 ? c.totalItem.summaryCells[41][0].value = 0 : c.totalItem.summaryCells[41][0].value =   totalOperacionITL25.mexicaliIngrAc / totalOperacionITL25.mexicaliPresAc;
    totalOperacionITL25.mexicaliIngr == 0 ? c.totalItem.summaryCells[43][0].value = 0 : c.totalItem.summaryCells[43][0].value =   totalOperacionITL25.mexicaliIngr / totalOperacionITL25.mexicaliIngrAnt;
    totalOperacionITL25.orizabaIngr == 0 ? c.totalItem.summaryCells[46][0].value = 0 : c.totalItem.summaryCells[46][0].value =   totalOperacionITL25.orizabaIngr / totalOperacionITL25.orizabaPres;
    totalOperacionITL25.orizabaIngrAc == 0 ? c.totalItem.summaryCells[49][0].value = 0 : c.totalItem.summaryCells[49][0].value =   totalOperacionITL25.orizabaIngrAc / totalOperacionITL25.orizabaPresAc;
    totalOperacionITL25.orizabaIngr == 0 ? c.totalItem.summaryCells[51][0].value = 0 : c.totalItem.summaryCells[51][0].value =   totalOperacionITL25.orizabaIngr / totalOperacionITL25.orizabaIngrAnt;
      

    totalIngresosTL25.cuatitlanPresPor = c.totalItem.summaryCells[6][0].value;
    totalIngresosTL25.cuatitlanPresAcPor = c.totalItem.summaryCells[9][0].value;
    totalIngresosTL25.cuatitlanIngrAntPor = c.totalItem.summaryCells[11][0].value;
    totalIngresosTL25.tultitlanPresPor = c.totalItem.summaryCells[14][0].value;
    totalIngresosTL25.tultitlanPresAcPor = c.totalItem.summaryCells[17][0].value;
    totalIngresosTL25.tultitlanIngrAntPor = c.totalItem.summaryCells[19][0].value;
    totalIngresosTL25.guadalajaraPresPor = c.totalItem.summaryCells[22][0].value;
    totalIngresosTL25.guadalajaraPresAcPor = c.totalItem.summaryCells[25][0].value;
    totalIngresosTL25.guadalajaraIngrAntPor = c.totalItem.summaryCells[27][0].value;
    totalIngresosTL25.hermosilloPresPor = c.totalItem.summaryCells[30][0].value;
    totalIngresosTL25.hermosilloPresAcPor = c.totalItem.summaryCells[33][0].value;
    totalIngresosTL25.hermosilloIngrAntPor = c.totalItem.summaryCells[35][0].value;
    totalIngresosTL25.mexicaliPresPor = c.totalItem.summaryCells[38][0].value;
    totalIngresosTL25.mexicaliPresAcPor = c.totalItem.summaryCells[41][0].value;
    totalIngresosTL25.mexicaliIngrAntPor = c.totalItem.summaryCells[43][0].value;
    totalIngresosTL25.orizabaPresPor = c.totalItem.summaryCells[46][0].value;
    totalIngresosTL25.orizabaPresAcPor = c.totalItem.summaryCells[49][0].value;
    totalIngresosTL25.orizabaIngrAntPor = c.totalItem.summaryCells[51][0].value;
    })
  }
}

onRowPreparedI2025(event){

  if (event.rowType == 'group'){
    if (event.data.key == '202501 ENE') {

      if(event.summaryCells[4].length !== 0){
      agrupamientoIE25.cuautitlan = event.summaryCells[4][0].value;
      }
      if(event.summaryCells[5].length !== 0){
        agrupamientoIE25.tultitlan = event.summaryCells[5][0].value;
      }
      if(event.summaryCells[6].length !== 0){
        agrupamientoIE25.guadalajara = event.summaryCells[6][0].value;
      }
      if(event.summaryCells[7].length !== 0){
        agrupamientoIE25.hermosillo = event.summaryCells[7][0].value;
      }
      if(event.summaryCells[8].length !== 0){
        agrupamientoIE25.mexicali = event.summaryCells[8][0].value;
      }
      if(event.summaryCells[9].length !== 0){
        agrupamientoIE25.orizaba = event.summaryCells[9][0].value;
      }
      // if(event.summaryCells[10].length !== 0){
      //   agrupamientoIE25.ramosArispe = event.summaryCells[10][0].value;
      // }
      if(event.summaryCells[10].length !== 0){
        agrupamientoIE25.total = event.summaryCells[10][0].value;
      }
    }
    if (event.data.key == '202502 FEB'){
      agrupamientoIF25.cuautitlan = event.summaryCells[4][0]?.value;
      agrupamientoIF25.tultitlan = event.summaryCells[5][0]?.value;
      agrupamientoIF25.guadalajara = event.summaryCells[6][0]?.value;
      agrupamientoIF25.hermosillo = event.summaryCells[7][0]?.value;
      agrupamientoIF25.mexicali = event.summaryCells[8][0]?.value;
      agrupamientoIF25.orizaba = event.summaryCells[9][0]?.value;
      // agrupamientoIF25.ramosArispe = event.summaryCells[10][0]?.value;
      agrupamientoIF25.total = event.summaryCells[10][0]?.value;
    }
    if (event.data.key == '202503 MAR'){
      agrupamientoIM25.cuautitlan = event.summaryCells[4][0]?.value;
      agrupamientoIM25.tultitlan = event.summaryCells[5][0]?.value;
      agrupamientoIM25.guadalajara = event.summaryCells[6][0]?.value;
      agrupamientoIM25.hermosillo = event.summaryCells[7][0]?.value;
      agrupamientoIM25.mexicali = event.summaryCells[8][0]?.value;
      agrupamientoIM25.orizaba = event.summaryCells[9][0]?.value;
      // agrupamientoIM25.ramosArispe = event.summaryCells[10][0]?.value;
      agrupamientoIM25.total = event.summaryCells[10][0]?.value;
    }
    if (event.data.key == '202504 ABR'){
      agrupamientoIA25.cuautitlan = event.summaryCells[4][0]?.value;
      agrupamientoIA25.tultitlan = event.summaryCells[5][0]?.value;
      agrupamientoIA25.guadalajara = event.summaryCells[6][0]?.value;
      agrupamientoIA25.hermosillo = event.summaryCells[7][0]?.value;
      agrupamientoIA25.mexicali = event.summaryCells[8][0]?.value;
      agrupamientoIA25.orizaba = event.summaryCells[9][0]?.value;
      // agrupamientoIA25.ramosArispe = event.summaryCells[10][0]?.value;
      agrupamientoIA25.total = event.summaryCells[10][0]?.value;
    }
    if (event.data.key == '202505 MAY'){
      agrupamientoIMY25.cuautitlan = event.summaryCells[4][0]?.value;
      agrupamientoIMY25.tultitlan = event.summaryCells[5][0]?.value;
      agrupamientoIMY25.guadalajara = event.summaryCells[6][0]?.value;
      agrupamientoIMY25.hermosillo = event.summaryCells[7][0]?.value;
      agrupamientoIMY25.mexicali = event.summaryCells[8][0]?.value;
      agrupamientoIMY25.orizaba = event.summaryCells[9][0]?.value;
      // agrupamientoIMY25.ramosArispe = event.summaryCells[10][0]?.value;
      agrupamientoIMY25.total = event.summaryCells[10][0]?.value;
    }
    if (event.data.key == '202506 JUN'){
      agrupamientoIJN25.cuautitlan = event.summaryCells[4][0]?.value;
      agrupamientoIJN25.tultitlan = event.summaryCells[5][0]?.value;
      agrupamientoIJN25.guadalajara = event.summaryCells[6][0]?.value;
      agrupamientoIJN25.hermosillo = event.summaryCells[7][0]?.value;
      agrupamientoIJN25.mexicali = event.summaryCells[8][0]?.value;
      agrupamientoIJN25.orizaba = event.summaryCells[9][0]?.value;
      // agrupamientoIJN25.ramosArispe = event.summaryCells[10][0]?.value;
      agrupamientoIJN25.total = event.summaryCells[10][0]?.value;
    }
    if (event.data.key == '202507 JUL'){
      agrupamientoIJL25.cuautitlan = event.summaryCells[4][0]?.value;
      agrupamientoIJL25.tultitlan = event.summaryCells[5][0]?.value;
      agrupamientoIJL25.guadalajara = event.summaryCells[6][0]?.value;
      agrupamientoIJL25.hermosillo = event.summaryCells[7][0]?.value;
      agrupamientoIJL25.mexicali = event.summaryCells[8][0]?.value;
      agrupamientoIJL25.orizaba = event.summaryCells[9][0]?.value;
      // agrupamientoIJL25.ramosArispe = event.summaryCells[10][0]?.value;
      agrupamientoIJL25.total = event.summaryCells[10][0]?.value;
    }
    if (event.data.key == '202508 AGO'){
      agrupamientoIAG25.cuautitlan = event.summaryCells[4][0]?.value;
      agrupamientoIAG25.tultitlan = event.summaryCells[5][0]?.value;
      agrupamientoIAG25.guadalajara = event.summaryCells[6][0]?.value;
      agrupamientoIAG25.hermosillo = event.summaryCells[7][0]?.value;
      agrupamientoIAG25.mexicali = event.summaryCells[8][0]?.value;
      agrupamientoIAG25.orizaba = event.summaryCells[9][0]?.value;
      // agrupamientoIAG25.ramosArispe = event.summaryCells[10][0]?.value;
      agrupamientoIAG25.total = event.summaryCells[10][0]?.value;
    }
    if (event.data.key == '202509 SEP'){
      agrupamientoIS25.cuautitlan = event.summaryCells[4][0].value;
      agrupamientoIS25.tultitlan = event.summaryCells[5][0].value;
      agrupamientoIS25.guadalajara = event.summaryCells[6][0].value;
      agrupamientoIS25.hermosillo = event.summaryCells[7][0].value;
      agrupamientoIS25.mexicali = event.summaryCells[8][0].value;
      agrupamientoIS25.orizaba = event.summaryCells[9][0].value;
      // agrupamientoIS25.ramosArispe = event.summaryCells[10][0].value;
      agrupamientoIS25.total = event.summaryCells[10][0].value;
    }
    if (event.data.key == '202510 OCT'){
      agrupamientoIOC25.cuautitlan = event.summaryCells[4][0].value;
      agrupamientoIOC25.tultitlan = event.summaryCells[5][0].value;
      agrupamientoIOC25.guadalajara = event.summaryCells[6][0].value;
      agrupamientoIOC25.hermosillo = event.summaryCells[7][0].value;
      agrupamientoIOC25.mexicali = event.summaryCells[8][0].value;
      agrupamientoIOC25.orizaba = event.summaryCells[9][0].value;
      // agrupamientoIOC25.ramosArispe = event.summaryCells[10][0].value;
      agrupamientoIOC25.total = event.summaryCells[10][0].value;
    }
    if (event.data.key == '202511 NOV'){
      agrupamientoINV25.cuautitlan = event.summaryCells[4][0].value;
      agrupamientoINV25.tultitlan = event.summaryCells[5][0].value;
      agrupamientoINV25.guadalajara = event.summaryCells[6][0].value;
      agrupamientoINV25.hermosillo = event.summaryCells[7][0].value;
      agrupamientoINV25.mexicali = event.summaryCells[8][0].value;
      agrupamientoINV25.orizaba = event.summaryCells[9][0].value;
      // agrupamientoINV25.ramosArispe = event.summaryCells[10][0].value;
      agrupamientoINV25.total = event.summaryCells[10][0].value;
    }
    if (event.data.key == '202512 DIC'){
      agrupamientoIDC25.cuautitlan = event.summaryCells[4][0].value;
      agrupamientoIDC25.tultitlan = event.summaryCells[5][0].value;
      agrupamientoIDC25.guadalajara = event.summaryCells[6][0].value;
      agrupamientoIDC25.hermosillo = event.summaryCells[7][0].value;
      agrupamientoIDC25.mexicali = event.summaryCells[8][0].value;
      agrupamientoIDC25.orizaba = event.summaryCells[9][0].value;
      // agrupamientoIDC25.ramosArispe = event.summaryCells[10][0].value;
      agrupamientoIDC25.total = event.summaryCells[10][0].value;
    }
  }

  if(event.rowType == "totalFooter"){
    totalIngresos25.cuautitlan = event.summaryCells[4][0]?.value;
    totalIngresos25.tultitlan = event.summaryCells[5][0]?.value;
    totalIngresos25.guadalajara = event.summaryCells[6][0]?.value;
    totalIngresos25.hermosillo = event.summaryCells[7][0]?.value;
    totalIngresos25.mexicali = event.summaryCells[8][0]?.value;
    totalIngresos25.orizaba = event.summaryCells[9][0]?.value;
    // totalIngresos25.ramosArispe = event.summaryCells[10][0].value;
    totalIngresos25.total = event.summaryCells[10][0].value;
  }
}
onCellPreparedI2025(e: any) {
  if (e.rowType == 'group'){

    e.cellElement.style.fontSize = '12px';
    e.cellElement.style.background = "#DCDCDC";
  }

  if (e.rowType == 'totalFooter') {
    e.totalItem.cells.forEach((c: any) => {
      if (c.cellElement) {
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "16px";
          c.cellElement.style.background = "#ff9460";
          c.cellElement.style.color = "black"; 
      }   
    });
  }
}
customizeI2025(e) {  

  var gridCell = e.gridCell;
  if (gridCell.rowType === 'group') {
    
    e.backgroundColor = "#DCDCDC";
    e.fontWeight = "bolder"
    e.font = {bold: true}

}

if (gridCell.rowType === 'totalFooter') {
    
  e.backgroundColor = "#ff9460";
  e.fontWeight = "bolder"
  e.font = {bold: true}

}
}
//==============================KILOMETROS 2025=======================================
onRowPreparedK2025(e){

  if (e.rowType == 'group'){
    
    if (e.data.key == '202501 ENE') {

      if(e.summaryCells[4].length !== 0){
      agrupamientoKE25.cuautitlan = e.summaryCells[4][0].value;
      }
      if(e.summaryCells[5].length !== 0){
        agrupamientoKE25.tultitlan = e.summaryCells[5][0].value;
      }
      if(e.summaryCells[6].length !== 0){
        agrupamientoKE25.guadalajara = e.summaryCells[6][0].value;
      }
      if(e.summaryCells[7].length !== 0){
        agrupamientoKE25.hermosillo = e.summaryCells[7][0].value;
      }
      if(e.summaryCells[8].length !== 0){
        agrupamientoKE25.mexicali = e.summaryCells[8][0].value;
      }
      if(e.summaryCells[9].length !== 0){
        agrupamientoKE25.orizaba = e.summaryCells[9][0].value;
      }
      // if(e.summaryCells[10].length !== 0){
      //   agrupamientoKE25.ramosArispe = e.summaryCells[10][0].value;
      // }
      if(e.summaryCells[10].length !== 0){
        agrupamientoKE25.total = e.summaryCells[10][0].value;
      }

      totalAgrupamientoIKE25.cuautitlan = agrupamientoIE25.cuautitlan / agrupamientoKE25.cuautitlan;
      totalAgrupamientoIKE25.tultitlan = agrupamientoIE25.tultitlan / agrupamientoKE25.tultitlan;
      totalAgrupamientoIKE25.guadalajara = agrupamientoIE25.guadalajara / agrupamientoKE25.guadalajara;
      totalAgrupamientoIKE25.hermosillo = agrupamientoIE25.hermosillo / agrupamientoKE25.hermosillo;
      totalAgrupamientoIKE25.mexicali = agrupamientoIE25.mexicali / agrupamientoKE25.mexicali;
      totalAgrupamientoIKE25.orizaba = agrupamientoIE25.orizaba / agrupamientoKE25.orizaba;
      // totalAgrupamientoIKE25.ramosArispe = agrupamientoIE25.ramosArispe / agrupamientoKE25.ramosArispe;
      totalAgrupamientoIKE25.total = agrupamientoIE25.total / agrupamientoKE25.total
    }
    if (e.data.key == '202502 FEB'){
      agrupamientoKF25.cuautitlan = e.summaryCells[4][0]?.value;
      agrupamientoKF25.tultitlan = e.summaryCells[5][0]?.value;
      agrupamientoKF25.guadalajara = e.summaryCells[6][0]?.value;
      agrupamientoKF25.hermosillo = e.summaryCells[7][0]?.value;
      agrupamientoKF25.mexicali = e.summaryCells[8][0]?.value;
      agrupamientoKF25.orizaba = e.summaryCells[9][0]?.value;
      // agrupamientoKF25.ramosArispe = e.summaryCells[10][0]?.value;
      agrupamientoKF25.total = e.summaryCells[10][0]?.value;

      totalAgrupamientoIKF25.cuautitlan = agrupamientoIF25.cuautitlan / agrupamientoKF25.cuautitlan;
      totalAgrupamientoIKF25.tultitlan = agrupamientoIF25.tultitlan / agrupamientoKF25.tultitlan;
      totalAgrupamientoIKF25.guadalajara = agrupamientoIF25.guadalajara / agrupamientoKF25.guadalajara;
      totalAgrupamientoIKF25.hermosillo = agrupamientoIF25.hermosillo / agrupamientoKF25.hermosillo;
      totalAgrupamientoIKF25.mexicali = agrupamientoIF25.mexicali / agrupamientoKF25.mexicali;
      totalAgrupamientoIKF25.orizaba = agrupamientoIF25.orizaba / agrupamientoKF25.orizaba;
      // totalAgrupamientoIKF25.ramosArispe = agrupamientoIF25.ramosArispe / agrupamientoKF25.ramosArispe;
      totalAgrupamientoIKF25.total = agrupamientoIF25.total / agrupamientoKF25.total;
    }
    if (e.data.key == '202503 MAR'){
      agrupamientoKM25.cuautitlan = e.summaryCells[4][0]?.value;
      agrupamientoKM25.tultitlan = e.summaryCells[5][0]?.value;
      agrupamientoKM25.guadalajara = e.summaryCells[6][0]?.value;
      agrupamientoKM25.hermosillo = e.summaryCells[7][0]?.value;
      agrupamientoKM25.mexicali = e.summaryCells[8][0]?.value;
      agrupamientoKM25.orizaba = e.summaryCells[9][0]?.value;
      // agrupamientoKM25.ramosArispe = e.summaryCells[10][0]?.value;
      agrupamientoKM25.total = e.summaryCells[10][0]?.value;

      totalAgrupamientoIKM25.cuautitlan = agrupamientoIM25.cuautitlan / agrupamientoKM25.cuautitlan;
      totalAgrupamientoIKM25.tultitlan = agrupamientoIM25.tultitlan / agrupamientoKM25.tultitlan;
      totalAgrupamientoIKM25.guadalajara = agrupamientoIM25.guadalajara / agrupamientoKM25.guadalajara;
      totalAgrupamientoIKM25.hermosillo = agrupamientoIM25.hermosillo / agrupamientoKM25.hermosillo;
      totalAgrupamientoIKM25.mexicali = agrupamientoIM25.mexicali / agrupamientoKM25.mexicali;
      totalAgrupamientoIKM25.orizaba = agrupamientoIM25.orizaba / agrupamientoKM25.orizaba;
      // totalAgrupamientoIKM25.ramosArispe = agrupamientoIM25.ramosArispe / agrupamientoKM25.ramosArispe;
      totalAgrupamientoIKM25.total = agrupamientoIM25.total / agrupamientoKM25.total;
    }
    if (e.data.key == '202504 ABR'){
      agrupamientoKA25.cuautitlan = e.summaryCells[4][0]?.value;
      agrupamientoKA25.tultitlan = e.summaryCells[5][0]?.value;
      agrupamientoKA25.guadalajara = e.summaryCells[6][0]?.value;
      agrupamientoKA25.hermosillo = e.summaryCells[7][0]?.value;
      agrupamientoKA25.mexicali = e.summaryCells[8][0]?.value;
      agrupamientoKA25.orizaba = e.summaryCells[9][0]?.value;
      // agrupamientoKA25.ramosArispe = e.summaryCells[10][0]?.value;
      agrupamientoKA25.total = e.summaryCells[10][0]?.value;

      totalAgrupamientoIKA25.cuautitlan = agrupamientoIA25.cuautitlan / agrupamientoKA25.cuautitlan;
      totalAgrupamientoIKA25.tultitlan = agrupamientoIA25.tultitlan / agrupamientoKA25.tultitlan;
      totalAgrupamientoIKA25.guadalajara = agrupamientoIA25.guadalajara / agrupamientoKA25.guadalajara;
      totalAgrupamientoIKA25.hermosillo = agrupamientoIA25.hermosillo / agrupamientoKA25.hermosillo;
      totalAgrupamientoIKA25.mexicali = agrupamientoIA25.mexicali / agrupamientoKA25.mexicali;
      totalAgrupamientoIKA25.orizaba = agrupamientoIA25.orizaba / agrupamientoKA25.orizaba;
      // totalAgrupamientoIKA25.ramosArispe = agrupamientoIA25.ramosArispe / agrupamientoKA25.ramosArispe;
      totalAgrupamientoIKA25.total = agrupamientoIA25.total / agrupamientoKA25.total;
    }
    if (e.data.key == '202505 MAY'){
      agrupamientoKMY25.cuautitlan = e.summaryCells[4][0]?.value;
      agrupamientoKMY25.tultitlan = e.summaryCells[5][0]?.value;
      agrupamientoKMY25.guadalajara = e.summaryCells[6][0]?.value;
      agrupamientoKMY25.hermosillo = e.summaryCells[7][0]?.value;
      agrupamientoKMY25.mexicali = e.summaryCells[8][0]?.value;
      agrupamientoKMY25.orizaba = e.summaryCells[9][0]?.value;
      // agrupamientoKMY25.ramosArispe = e.summaryCells[10][0]?.value;
      agrupamientoKMY25.total = e.summaryCells[10][0]?.value;

      totalAgrupamientoIKMY25.cuautitlan = agrupamientoIMY25.cuautitlan / agrupamientoKMY25.cuautitlan;
      totalAgrupamientoIKMY25.tultitlan = agrupamientoIMY25.tultitlan / agrupamientoKMY25.tultitlan;
      totalAgrupamientoIKMY25.guadalajara = agrupamientoIMY25.guadalajara / agrupamientoKMY25.guadalajara;
      totalAgrupamientoIKMY25.hermosillo = agrupamientoIMY25.hermosillo / agrupamientoKMY25.hermosillo;
      totalAgrupamientoIKMY25.mexicali = agrupamientoIMY25.mexicali / agrupamientoKMY25.mexicali;
      totalAgrupamientoIKMY25.orizaba = agrupamientoIMY25.orizaba / agrupamientoKMY25.orizaba;
      // totalAgrupamientoIKMY25.ramosArispe = agrupamientoIMY25.ramosArispe / agrupamientoKMY25.ramosArispe;
      totalAgrupamientoIKMY25.total = agrupamientoIMY25.total / agrupamientoKMY25.total;
    }
    if (e.data.key == '202506 JUN'){
      agrupamientoKJN25.cuautitlan = e.summaryCells[4][0]?.value;
      agrupamientoKJN25.tultitlan = e.summaryCells[5][0]?.value;
      agrupamientoKJN25.guadalajara = e.summaryCells[6][0]?.value;
      agrupamientoKJN25.hermosillo = e.summaryCells[7][0]?.value;
      agrupamientoKJN25.mexicali = e.summaryCells[8][0]?.value;
      agrupamientoKJN25.orizaba = e.summaryCells[9][0]?.value;
      // agrupamientoKJN25.ramosArispe = e.summaryCells[10][0]?.value;
      agrupamientoKJN25.total = e.summaryCells[10][0]?.value;

      totalAgrupamientoIKJN25.cuautitlan = agrupamientoIJN25.cuautitlan / agrupamientoKJN25.cuautitlan;
      totalAgrupamientoIKJN25.tultitlan = agrupamientoIJN25.tultitlan / agrupamientoKJN25.tultitlan;
      totalAgrupamientoIKJN25.guadalajara = agrupamientoIJN25.guadalajara / agrupamientoKJN25.guadalajara;
      totalAgrupamientoIKJN25.hermosillo = agrupamientoIJN25.hermosillo / agrupamientoKJN25.hermosillo;
      totalAgrupamientoIKJN25.mexicali = agrupamientoIJN25.mexicali / agrupamientoKJN25.mexicali;
      totalAgrupamientoIKJN25.orizaba = agrupamientoIJN25.orizaba / agrupamientoKJN25.orizaba;
      // totalAgrupamientoIKJN25.ramosArispe = agrupamientoIJN25.ramosArispe / agrupamientoKJN25.ramosArispe;
      totalAgrupamientoIKJN25.total = agrupamientoIJN25.total / agrupamientoKJN25.total;
    }
    if (e.data.key == '202507 JUL'){
      agrupamientoKJL25.cuautitlan = e.summaryCells[4][0]?.value;
      agrupamientoKJL25.tultitlan = e.summaryCells[5][0]?.value;
      agrupamientoKJL25.guadalajara = e.summaryCells[6][0]?.value;
      agrupamientoKJL25.hermosillo = e.summaryCells[7][0]?.value;
      agrupamientoKJL25.mexicali = e.summaryCells[8][0]?.value;
      agrupamientoKJL25.orizaba = e.summaryCells[9][0]?.value;
      // agrupamientoKJL25.ramosArispe = e.summaryCells[10][0]?.value;
      agrupamientoKJL25.total = e.summaryCells[10][0]?.value;

      totalAgrupamientoIKJL25.cuautitlan = agrupamientoIJL25.cuautitlan / agrupamientoKJL25.cuautitlan;
      totalAgrupamientoIKJL25.tultitlan = agrupamientoIJL25.tultitlan / agrupamientoKJL25.tultitlan;
      totalAgrupamientoIKJL25.guadalajara = agrupamientoIJL25.guadalajara / agrupamientoKJL25.guadalajara;
      totalAgrupamientoIKJL25.hermosillo = agrupamientoIJL25.hermosillo / agrupamientoKJL25.hermosillo;
      totalAgrupamientoIKJL25.mexicali = agrupamientoIJL25.mexicali / agrupamientoKJL25.mexicali;
      totalAgrupamientoIKJL25.orizaba = agrupamientoIJL25.orizaba / agrupamientoKJL25.orizaba;
      // totalAgrupamientoIKJL25.ramosArispe = agrupamientoIJL25.ramosArispe / agrupamientoKJL25.ramosArispe;
      totalAgrupamientoIKJL25.total = agrupamientoIJL25.total / agrupamientoKJL25.total;
    }
    if (e.data.key == '202508 AGO'){
      agrupamientoKAG25.cuautitlan = e.summaryCells[4][0]?.value;
      agrupamientoKAG25.tultitlan = e.summaryCells[5][0]?.value;
      agrupamientoKAG25.guadalajara = e.summaryCells[6][0]?.value;
      agrupamientoKAG25.hermosillo = e.summaryCells[7][0]?.value;
      agrupamientoKAG25.mexicali = e.summaryCells[8][0]?.value;
      agrupamientoKAG25.orizaba = e.summaryCells[9][0]?.value;
      // agrupamientoKAG25.ramosArispe = e.summaryCells[10][0]?.value;
      agrupamientoKAG25.total = e.summaryCells[10][0]?.value;

      totalAgrupamientoIKAG25.cuautitlan = agrupamientoIAG25.cuautitlan / agrupamientoKAG25.cuautitlan;
      totalAgrupamientoIKAG25.tultitlan = agrupamientoIAG25.tultitlan / agrupamientoKAG25.tultitlan;
      totalAgrupamientoIKAG25.guadalajara = agrupamientoIAG25.guadalajara / agrupamientoKAG25.guadalajara;
      totalAgrupamientoIKAG25.hermosillo = agrupamientoIAG25.hermosillo / agrupamientoKAG25.hermosillo;
      totalAgrupamientoIKAG25.mexicali = agrupamientoIAG25.mexicali / agrupamientoKAG25.mexicali;
      totalAgrupamientoIKAG25.orizaba = agrupamientoIAG25.orizaba / agrupamientoKAG25.orizaba;
      // totalAgrupamientoIKAG25.ramosArispe = agrupamientoIAG25.ramosArispe / agrupamientoKAG25.ramosArispe;
      totalAgrupamientoIKAG25.total = agrupamientoIAG25.total / agrupamientoKAG25.total;
    }
    if (e.data.key == '202509 SEP'){
      agrupamientoKS25.cuautitlan = e.summaryCells[4][0].value;
      agrupamientoKS25.tultitlan = e.summaryCells[5][0].value;
      agrupamientoKS25.guadalajara = e.summaryCells[6][0].value;
      agrupamientoKS25.hermosillo = e.summaryCells[7][0].value;
      agrupamientoKS25.mexicali = e.summaryCells[8][0].value;
      agrupamientoKS25.orizaba = e.summaryCells[9][0].value;
      // agrupamientoKS25.ramosArispe = e.summaryCells[10][0].value;
      agrupamientoKS25.total = e.summaryCells[10][0].value;

      totalAgrupamientoIKS25.cuautitlan = agrupamientoIS25.cuautitlan / agrupamientoKS25.cuautitlan;
      totalAgrupamientoIKS25.tultitlan = agrupamientoIS25.tultitlan / agrupamientoKS25.tultitlan;
      totalAgrupamientoIKS25.guadalajara = agrupamientoIS25.guadalajara / agrupamientoKS25.guadalajara;
      totalAgrupamientoIKS25.hermosillo = agrupamientoIS25.hermosillo / agrupamientoKS25.hermosillo;
      totalAgrupamientoIKS25.mexicali = agrupamientoIS25.mexicali / agrupamientoKS25.mexicali;
      totalAgrupamientoIKS25.orizaba = agrupamientoIS25.orizaba / agrupamientoKS25.orizaba;
      // totalAgrupamientoIKS25.ramosArispe = agrupamientoIS25.ramosArispe / agrupamientoKS25.ramosArispe;
      totalAgrupamientoIKS25.total = agrupamientoIS25.total / agrupamientoKS25.total;
    }
    if (e.data.key == '202510 OCT'){
      agrupamientoKOC25.cuautitlan = e.summaryCells[4][0].value;
      agrupamientoKOC25.tultitlan = e.summaryCells[5][0].value;
      agrupamientoKOC25.guadalajara = e.summaryCells[6][0].value;
      agrupamientoKOC25.hermosillo = e.summaryCells[7][0].value;
      agrupamientoKOC25.mexicali = e.summaryCells[8][0].value;
      agrupamientoKOC25.orizaba = e.summaryCells[9][0].value;
      // agrupamientoKOC25.ramosArispe = e.summaryCells[10][0].value;
      agrupamientoKOC25.total = e.summaryCells[10][0].value;

      totalAgrupamientoIKOC25.cuautitlan = agrupamientoIOC25.cuautitlan / agrupamientoKOC25.cuautitlan;
      totalAgrupamientoIKOC25.tultitlan = agrupamientoIOC25.tultitlan / agrupamientoKOC25.tultitlan;
      totalAgrupamientoIKOC25.guadalajara = agrupamientoIOC25.guadalajara / agrupamientoKOC25.guadalajara;
      totalAgrupamientoIKOC25.hermosillo = agrupamientoIOC25.hermosillo / agrupamientoKOC25.hermosillo;
      totalAgrupamientoIKOC25.mexicali = agrupamientoIOC25.mexicali / agrupamientoKOC25.mexicali;
      totalAgrupamientoIKOC25.orizaba = agrupamientoIOC25.orizaba / agrupamientoKOC25.orizaba;
      // totalAgrupamientoIKOC25.ramosArispe = agrupamientoIOC25.ramosArispe / agrupamientoKOC25.ramosArispe;
      totalAgrupamientoIKOC25.total = agrupamientoIOC25.total / agrupamientoKOC25.total;
    }
    if (e.data.key == '202511 NOV'){
      agrupamientoKNV25.cuautitlan = e.summaryCells[4][0].value;
      agrupamientoKNV25.tultitlan = e.summaryCells[5][0].value;
      agrupamientoKNV25.guadalajara = e.summaryCells[6][0].value;
      agrupamientoKNV25.hermosillo = e.summaryCells[7][0].value;
      agrupamientoKNV25.mexicali = e.summaryCells[8][0].value;
      agrupamientoKNV25.orizaba = e.summaryCells[9][0].value;
      // agrupamientoKNV25.ramosArispe = e.summaryCells[10][0].value;
      agrupamientoKNV25.total = e.summaryCells[10][0].value;

      totalAgrupamientoIKNV25.cuautitlan = agrupamientoINV25.cuautitlan / agrupamientoKNV25.cuautitlan;
      totalAgrupamientoIKNV25.tultitlan = agrupamientoINV25.tultitlan / agrupamientoKNV25.tultitlan;
      totalAgrupamientoIKNV25.guadalajara = agrupamientoINV25.guadalajara / agrupamientoKNV25.guadalajara;
      totalAgrupamientoIKNV25.hermosillo = agrupamientoINV25.hermosillo / agrupamientoKNV25.hermosillo;
      totalAgrupamientoIKNV25.mexicali = agrupamientoINV25.mexicali / agrupamientoKNV25.mexicali;
      totalAgrupamientoIKNV25.orizaba = agrupamientoINV25.orizaba / agrupamientoKNV25.orizaba;
      // totalAgrupamientoIKNV25.ramosArispe = agrupamientoINV25.ramosArispe / agrupamientoKNV25.ramosArispe;
      totalAgrupamientoIKNV25.total = agrupamientoINV25.total / agrupamientoKNV25.total;
    }
    if (e.data.key == '202512 DIC'){
      agrupamientoKDC25.cuautitlan = e.summaryCells[4][0].value;
      agrupamientoKDC25.tultitlan = e.summaryCells[5][0].value;
      agrupamientoKDC25.guadalajara = e.summaryCells[6][0].value;
      agrupamientoKDC25.hermosillo = e.summaryCells[7][0].value;
      agrupamientoKDC25.mexicali = e.summaryCells[8][0].value;
      agrupamientoKDC25.orizaba = e.summaryCells[9][0].value;
      // agrupamientoKDC25.ramosArispe = e.summaryCells[10][0].value;
      agrupamientoKDC25.total = e.summaryCells[10][0].value;

      totalAgrupamientoIKDC25.cuautitlan = agrupamientoIDC25.cuautitlan / agrupamientoKDC25.cuautitlan;
      totalAgrupamientoIKDC25.tultitlan = agrupamientoIDC25.tultitlan / agrupamientoKDC25.tultitlan;
      totalAgrupamientoIKDC25.guadalajara = agrupamientoIDC25.guadalajara / agrupamientoKDC25.guadalajara;
      totalAgrupamientoIKDC25.hermosillo = agrupamientoIDC25.hermosillo / agrupamientoKDC25.hermosillo;
      totalAgrupamientoIKDC25.mexicali = agrupamientoIDC25.mexicali / agrupamientoKDC25.mexicali;
      totalAgrupamientoIKDC25.orizaba = agrupamientoIDC25.orizaba / agrupamientoKDC25.orizaba;
      // totalAgrupamientoIKDC25.ramosArispe = agrupamientoIDC25.ramosArispe / agrupamientoKDC25.ramosArispe;
      totalAgrupamientoIKDC25.total = agrupamientoIDC25.total / agrupamientoKDC25.total;
    }


  }

  if(e.rowType == "totalFooter"){
    totalKilomentros25.cuautitlan = e.summaryCells[4][0]?.value;
    totalKilomentros25.tultitlan = e.summaryCells[5][0]?.value;
    totalKilomentros25.guadalajara = e.summaryCells[6][0]?.value;
    totalKilomentros25.hermosillo = e.summaryCells[7][0]?.value;
    totalKilomentros25.mexicali = e.summaryCells[8][0]?.value;
    totalKilomentros25.orizaba = e.summaryCells[9][0]?.value;
    // totalKilomentros25.ramosArispe = e.summaryCells[10][0].value;
    totalKilomentros25.total = e.summaryCells[10][0].value;

    totalOperacionIK25.cuautitlan = totalIngresos25.cuautitlan / totalKilomentros25.cuautitlan;
    totalOperacionIK25.tultitlan = totalIngresos25.tultitlan / totalKilomentros25.tultitlan;
    totalOperacionIK25.guadalajara = totalIngresos25.guadalajara / totalKilomentros25.guadalajara;
    totalOperacionIK25.hermosillo = totalIngresos25.hermosillo / totalKilomentros25.hermosillo;
    totalOperacionIK25.mexicali = totalIngresos25.mexicali / totalKilomentros25.mexicali;
    totalOperacionIK25.orizaba = totalIngresos25.orizaba / totalKilomentros25.orizaba;
    // totalOperacionIK25.ramosArispe = totalIngresos24.ramosArispe / totalKilomentros24.ramosArispe;
    totalOperacionIK25.total = totalIngresos25.total / totalKilomentros25.total;
  }
}
onCellPreparedK2025(e){
  if (e.rowType == 'group'){

    e.cellElement.style.fontSize = '12px';
    e.cellElement.style.background = "#DCDCDC";
  }

  if (e.rowType == 'totalFooter') {
    e.totalItem.cells.forEach((c: any) => {
      if (c.cellElement) {
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "16px";
          c.cellElement.style.background = "#ff9460";
          c.cellElement.style.color = "black"; 
      }   
    });
  }
}
customizeK2025(e) {  

  var gridCell = e.gridCell;
  if (gridCell.rowType === 'group') {
    
    e.backgroundColor = "#DCDCDC";
    e.fontWeight = "bolder"
    e.font = {bold: true}

}

if (gridCell.rowType === 'totalFooter') {
    
  e.backgroundColor = "#ff9460";
  e.fontWeight = "bolder"
  e.font = {bold: true}

}
}
//==============================VIAJES TOTALES 2025============================================
onRowPreparedV2025(e){}
onCellPreparedV2025(e){
  if (e.rowType == 'group'){

    e.cellElement.style.fontSize = '12px';
    e.cellElement.style.background = "#DCDCDC";
  }

  if (e.rowType == 'totalFooter') {
    e.totalItem.cells.forEach((c: any) => {
      if (c.cellElement) {
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "16px";
          c.cellElement.style.background = "#ff9460";
          c.cellElement.style.color = "black"; 
      }   
    });
  }
}
customizeV2025(e) {  

  var gridCell = e.gridCell;
  if (gridCell.rowType === 'group') {
    
    e.backgroundColor = "#DCDCDC";
    e.fontWeight = "bolder"
    e.font = {bold: true}

}

if (gridCell.rowType === 'totalFooter') {
    
  e.backgroundColor = "#ff9460";
  e.fontWeight = "bolder"
  e.font = {bold: true}

}
}
//==============================VIAJES CARGADOS 2025============================================
onRowPreparedVC2025(event){
  
  if (event.rowType == 'group'){
    
    if (event.data.key == '202501 ENE') {
       
      viajesCargadosE25.cuautitlan = event.summaryCells[4][0]?.value;
      viajesCargadosE25.tultitlan = event.summaryCells[5][0]?.value;
      viajesCargadosE25.guadalajara = event.summaryCells[6][0]?.value;
      viajesCargadosE25.hermosillo = event.summaryCells[7][0]?.value;
      viajesCargadosE25.mexicali = event.summaryCells[8][0]?.value;
      viajesCargadosE25.orizaba = event.summaryCells[9][0]?.value;
      // viajesCargadosE25.ramosArispe = event.summaryCells[10][0]?.value;
      viajesCargadosE25.total = event.summaryCells[10][0]?.value;

      totalIVCE25.cuautitlan = agrupamientoIE25.cuautitlan / viajesCargadosE25.cuautitlan;
      totalIVCE25.tultitlan = agrupamientoIE25.tultitlan / viajesCargadosE25.tultitlan;
      totalIVCE25.guadalajara = agrupamientoIE25.guadalajara / viajesCargadosE25.guadalajara;
      totalIVCE25.hermosillo = agrupamientoIE25.hermosillo / viajesCargadosE25.hermosillo;
      totalIVCE25.mexicali = agrupamientoIE25.mexicali / viajesCargadosE25.mexicali;
      totalIVCE25.orizaba = agrupamientoIE25.orizaba / viajesCargadosE25.orizaba;
      // totalIVCE25.ramosArispe = agrupamientoIE25.ramosArispe / viajesCargadosE25.ramosArispe;
      totalIVCE25.total = agrupamientoIE25.total / viajesCargadosE25.total;

      totalKVCE25.cuautitlan = agrupamientoKE25.cuautitlan / viajesCargadosE25.cuautitlan;
      totalKVCE25.tultitlan = agrupamientoKE25.tultitlan / viajesCargadosE25.tultitlan;
      totalKVCE25.guadalajara = agrupamientoKE25.guadalajara / viajesCargadosE25.guadalajara;
      totalKVCE25.hermosillo = agrupamientoKE25.hermosillo / viajesCargadosE25.hermosillo;
      totalKVCE25.mexicali = agrupamientoKE25.mexicali / viajesCargadosE25.mexicali;
      totalKVCE25.orizaba = agrupamientoKE25.orizaba / viajesCargadosE25.orizaba;
      // totalKVCE25.ramosArispe = agrupamientoKE25.ramosArispe / viajesCargadosE25.ramosArispe;
      totalKVCE25.total = agrupamientoKE25.total / viajesCargadosE25.total;


    }
    if (event.data.key == '202502 FEB'){
      viajesCargadosF25.cuautitlan = event.summaryCells[4][0]?.value;
      viajesCargadosF25.tultitlan = event.summaryCells[5][0]?.value;
      viajesCargadosF25.guadalajara = event.summaryCells[6][0]?.value;
      viajesCargadosF25.hermosillo = event.summaryCells[7][0]?.value;
      viajesCargadosF25.mexicali = event.summaryCells[8][0]?.value;
      viajesCargadosF25.orizaba = event.summaryCells[9][0]?.value;
      // viajesCargadosF25.ramosArispe = event.summaryCells[10][0]?.value;
      viajesCargadosF25.total = event.summaryCells[10][0]?.value;

      totalIVCF25.cuautitlan = agrupamientoIF25.cuautitlan / viajesCargadosF25.cuautitlan;
      totalIVCF25.tultitlan = agrupamientoIF25.tultitlan / viajesCargadosF25.tultitlan;
      totalIVCF25.guadalajara = agrupamientoIF25.guadalajara / viajesCargadosF25.guadalajara;
      totalIVCF25.hermosillo = agrupamientoIF25.hermosillo / viajesCargadosF25.hermosillo;
      totalIVCF25.mexicali = agrupamientoIF25.mexicali / viajesCargadosF25.mexicali;
      totalIVCF25.orizaba = agrupamientoIF25.orizaba / viajesCargadosF25.orizaba;
      // totalIVCF25.ramosArispe = agrupamientoIF25.ramosArispe / viajesCargadosF25.ramosArispe;
      totalIVCF25.total = agrupamientoIF25.total / viajesCargadosF25.total;

      totalKVCF25.cuautitlan = agrupamientoKF25.cuautitlan / viajesCargadosF25.cuautitlan;
      totalKVCF25.tultitlan = agrupamientoKF25.tultitlan / viajesCargadosF25.tultitlan;
      totalKVCF25.guadalajara = agrupamientoKF25.guadalajara / viajesCargadosF25.guadalajara;
      totalKVCF25.hermosillo = agrupamientoKF25.hermosillo / viajesCargadosF25.hermosillo;
      totalKVCF25.mexicali = agrupamientoKF25.mexicali / viajesCargadosF25.mexicali;
      totalKVCF25.orizaba = agrupamientoKF25.orizaba / viajesCargadosF25.orizaba;
      // totalKVCF25.ramosArispe = agrupamientoKF25.ramosArispe / viajesCargadosF25.ramosArispe;
      totalKVCF25.total = agrupamientoKF25.total / viajesCargadosF25.total;
    }
    if (event.data.key == '202503 MAR'){
      viajesCargadosM25.cuautitlan = event.summaryCells[4][0]?.value;
      viajesCargadosM25.tultitlan = event.summaryCells[5][0]?.value;
      viajesCargadosM25.guadalajara = event.summaryCells[6][0]?.value;
      viajesCargadosM25.hermosillo = event.summaryCells[7][0]?.value;
      viajesCargadosM25.mexicali = event.summaryCells[8][0]?.value;
      viajesCargadosM25.orizaba = event.summaryCells[9][0]?.value;
      // viajesCargadosM25.ramosArispe = event.summaryCells[10][0]?.value;
      viajesCargadosM25.total = event.summaryCells[10][0]?.value;

      totalIVCM25.cuautitlan = agrupamientoIM25.cuautitlan / viajesCargadosM25.cuautitlan;
      totalIVCM25.tultitlan = agrupamientoIM25.tultitlan / viajesCargadosM25.tultitlan;
      totalIVCM25.guadalajara = agrupamientoIM25.guadalajara / viajesCargadosM25.guadalajara;
      totalIVCM25.hermosillo = agrupamientoIM25.hermosillo / viajesCargadosM25.hermosillo;
      totalIVCM25.mexicali = agrupamientoIM25.mexicali / viajesCargadosM25.mexicali;
      totalIVCM25.orizaba = agrupamientoIM25.orizaba / viajesCargadosM25.orizaba;
      // totalIVCM25.ramosArispe = agrupamientoIM25.ramosArispe / viajesCargadosM25.ramosArispe;
      totalIVCM25.total = agrupamientoIM25.total / viajesCargadosM25.total;

      totalKVCM25.cuautitlan = agrupamientoKM25.cuautitlan / viajesCargadosM25.cuautitlan;
      totalKVCM25.tultitlan = agrupamientoKM25.tultitlan / viajesCargadosM25.tultitlan;
      totalKVCM25.guadalajara = agrupamientoKM25.guadalajara / viajesCargadosM25.guadalajara;
      totalKVCM25.hermosillo = agrupamientoKM25.hermosillo / viajesCargadosM25.hermosillo;
      totalKVCM25.mexicali = agrupamientoKM25.mexicali / viajesCargadosM25.mexicali;
      totalKVCM25.orizaba = agrupamientoKM25.orizaba / viajesCargadosM25.orizaba;
      // totalKVCM25.ramosArispe = agrupamientoKM25.ramosArispe / viajesCargadosM25.ramosArispe;
      totalKVCM25.total = agrupamientoKM25.total / viajesCargadosM25.total;
    }
    if (event.data.key == '202504 ABR'){
      viajesCargadosA25.cuautitlan = event.summaryCells[4][0]?.value;
      viajesCargadosA25.tultitlan = event.summaryCells[5][0]?.value;
      viajesCargadosA25.guadalajara = event.summaryCells[6][0]?.value;
      viajesCargadosA25.hermosillo = event.summaryCells[7][0]?.value;
      viajesCargadosA25.mexicali = event.summaryCells[8][0]?.value;
      viajesCargadosA25.orizaba = event.summaryCells[9][0]?.value;
      // viajesCargadosA25.ramosArispe = event.summaryCells[10][0]?.value;
      viajesCargadosA25.total = event.summaryCells[10][0]?.value;

      totalIVCA25.cuautitlan = agrupamientoIA25.cuautitlan / viajesCargadosA25.cuautitlan;
      totalIVCA25.tultitlan = agrupamientoIA25.tultitlan / viajesCargadosA25.tultitlan;
      totalIVCA25.guadalajara = agrupamientoIA25.guadalajara / viajesCargadosA25.guadalajara;
      totalIVCA25.hermosillo = agrupamientoIA25.hermosillo / viajesCargadosA25.hermosillo;
      totalIVCA25.mexicali = agrupamientoIA25.mexicali / viajesCargadosA25.mexicali;
      totalIVCA25.orizaba = agrupamientoIA25.orizaba / viajesCargadosA25.orizaba;
      // totalIVCA25.ramosArispe = agrupamientoIA25.ramosArispe / viajesCargadosA25.ramosArispe;
      totalIVCA25.total = agrupamientoIA25.total / viajesCargadosA25.total;

      totalKVCA25.cuautitlan = agrupamientoKA25.cuautitlan / viajesCargadosA25.cuautitlan;
      totalKVCA25.tultitlan = agrupamientoKA25.tultitlan / viajesCargadosA25.tultitlan;
      totalKVCA25.guadalajara = agrupamientoKA25.guadalajara / viajesCargadosA25.guadalajara;
      totalKVCA25.hermosillo = agrupamientoKA25.hermosillo / viajesCargadosA25.hermosillo;
      totalKVCA25.mexicali = agrupamientoKA25.mexicali / viajesCargadosA25.mexicali;
      totalKVCA25.orizaba = agrupamientoKA25.orizaba / viajesCargadosA25.orizaba;
      // totalKVCA25.ramosArispe = agrupamientoKA25.ramosArispe / viajesCargadosA25.ramosArispe;
      totalKVCA25.total = agrupamientoKA25.total / viajesCargadosA25.total;
    }
    if (event.data.key == '202505 MAY'){
      viajesCargadosMY25.cuautitlan = event.summaryCells[4][0]?.value;
      viajesCargadosMY25.tultitlan = event.summaryCells[5][0]?.value;
      viajesCargadosMY25.guadalajara = event.summaryCells[6][0]?.value;
      viajesCargadosMY25.hermosillo = event.summaryCells[7][0]?.value;
      viajesCargadosMY25.mexicali = event.summaryCells[8][0]?.value;
      viajesCargadosMY25.orizaba = event.summaryCells[9][0]?.value;
      // viajesCargadosMY25.ramosArispe = event.summaryCells[10][0]?.value;
      viajesCargadosMY25.total = event.summaryCells[10][0]?.value;

      totalIVCMY25.cuautitlan = agrupamientoIMY25.cuautitlan / viajesCargadosMY25.cuautitlan;
      totalIVCMY25.tultitlan = agrupamientoIMY25.tultitlan / viajesCargadosMY25.tultitlan;
      totalIVCMY25.guadalajara = agrupamientoIMY25.guadalajara / viajesCargadosMY25.guadalajara;
      totalIVCMY25.hermosillo = agrupamientoIMY25.hermosillo / viajesCargadosMY25.hermosillo;
      totalIVCMY25.mexicali = agrupamientoIMY25.mexicali / viajesCargadosMY25.mexicali;
      totalIVCMY25.orizaba = agrupamientoIMY25.orizaba / viajesCargadosMY25.orizaba;
      // totalIVCMY25.ramosArispe = agrupamientoIMY25.ramosArispe / viajesCargadosMY25.ramosArispe;
      totalIVCMY25.total = agrupamientoIMY25.total / viajesCargadosMY25.total;

      totalKVCMY25.cuautitlan = agrupamientoKMY25.cuautitlan / viajesCargadosMY25.cuautitlan;
      totalKVCMY25.tultitlan = agrupamientoKMY25.tultitlan / viajesCargadosMY25.tultitlan;
      totalKVCMY25.guadalajara = agrupamientoKMY25.guadalajara / viajesCargadosMY25.guadalajara;
      totalKVCMY25.hermosillo = agrupamientoKMY25.hermosillo / viajesCargadosMY25.hermosillo;
      totalKVCMY25.mexicali = agrupamientoKMY25.mexicali / viajesCargadosMY25.mexicali;
      totalKVCMY25.orizaba = agrupamientoKMY25.orizaba / viajesCargadosMY25.orizaba;
      // totalKVCMY25.ramosArispe = agrupamientoKMY25.ramosArispe / viajesCargadosMY25.ramosArispe;
      totalKVCMY25.total = agrupamientoKMY25.total / viajesCargadosMY25.total;
    }
    if (event.data.key == '202506 JUN'){
      viajesCargadosJN25.cuautitlan = event.summaryCells[4][0]?.value;
      viajesCargadosJN25.tultitlan = event.summaryCells[5][0]?.value;
      viajesCargadosJN25.guadalajara = event.summaryCells[6][0]?.value;
      viajesCargadosJN25.hermosillo = event.summaryCells[7][0]?.value;
      viajesCargadosJN25.mexicali = event.summaryCells[8][0]?.value;
      viajesCargadosJN25.orizaba = event.summaryCells[9][0]?.value;
      // viajesCargadosJN25.ramosArispe = event.summaryCells[10][0]?.value;
      viajesCargadosJN25.total = event.summaryCells[10][0]?.value;

      totalIVCJN25.cuautitlan = agrupamientoIJN25.cuautitlan / viajesCargadosJN25.cuautitlan;
      totalIVCJN25.tultitlan = agrupamientoIJN25.tultitlan / viajesCargadosJN25.tultitlan;
      totalIVCJN25.guadalajara = agrupamientoIJN25.guadalajara / viajesCargadosJN25.guadalajara;
      totalIVCJN25.hermosillo = agrupamientoIJN25.hermosillo / viajesCargadosJN25.hermosillo;
      totalIVCJN25.mexicali = agrupamientoIJN25.mexicali / viajesCargadosJN25.mexicali;
      totalIVCJN25.orizaba = agrupamientoIJN25.orizaba / viajesCargadosJN25.orizaba;
      // totalIVCJN25.ramosArispe = agrupamientoIJN25.ramosArispe / viajesCargadosJN25.ramosArispe;
      totalIVCJN25.total = agrupamientoIJN25.total / viajesCargadosJN25.total;

      totalKVCJN25.cuautitlan = agrupamientoKJN25.cuautitlan / viajesCargadosJN25.cuautitlan;
      totalKVCJN25.tultitlan = agrupamientoKJN25.tultitlan / viajesCargadosJN25.tultitlan;
      totalKVCJN25.guadalajara = agrupamientoKJN25.guadalajara / viajesCargadosJN25.guadalajara;
      totalKVCJN25.hermosillo = agrupamientoKJN25.hermosillo / viajesCargadosJN25.hermosillo;
      totalKVCJN25.mexicali = agrupamientoKJN25.mexicali / viajesCargadosJN25.mexicali;
      totalKVCJN25.orizaba = agrupamientoKJN25.orizaba / viajesCargadosJN25.orizaba;
      // totalKVCJN25.ramosArispe = agrupamientoKJN25.ramosArispe / viajesCargadosJN25.ramosArispe;
      totalKVCJN25.total = agrupamientoKJN25.total / viajesCargadosJN25.total;
    }
    if (event.data.key == '202507 JUL'){
      viajesCargadosJL25.cuautitlan = event.summaryCells[4][0]?.value;
      viajesCargadosJL25.tultitlan = event.summaryCells[5][0]?.value;
      viajesCargadosJL25.guadalajara = event.summaryCells[6][0]?.value;
      viajesCargadosJL25.hermosillo = event.summaryCells[7][0]?.value;
      viajesCargadosJL25.mexicali = event.summaryCells[8][0]?.value;
      viajesCargadosJL25.orizaba = event.summaryCells[9][0]?.value;
      // viajesCargadosJL25.ramosArispe = event.summaryCells[10][0]?.value;
      viajesCargadosJL25.total = event.summaryCells[10][0]?.value;

      totalIVCJL25.cuautitlan = agrupamientoIJL25.cuautitlan / viajesCargadosJL25.cuautitlan;
      totalIVCJL25.tultitlan = agrupamientoIJL25.tultitlan / viajesCargadosJL25.tultitlan;
      totalIVCJL25.guadalajara = agrupamientoIJL25.guadalajara / viajesCargadosJL25.guadalajara;
      totalIVCJL25.hermosillo = agrupamientoIJL25.hermosillo / viajesCargadosJL25.hermosillo;
      totalIVCJL25.mexicali = agrupamientoIJL25.mexicali / viajesCargadosJL25.mexicali;
      totalIVCJL25.orizaba = agrupamientoIJL25.orizaba / viajesCargadosJL25.orizaba;
      // totalIVCJL25.ramosArispe = agrupamientoIJL25.ramosArispe / viajesCargadosJL25.ramosArispe;
      totalIVCJL25.total = agrupamientoIJL25.total / viajesCargadosJL25.total;

      totalKVCJL25.cuautitlan = agrupamientoKJL25.cuautitlan / viajesCargadosJL25.cuautitlan;
      totalKVCJL25.tultitlan = agrupamientoKJL25.tultitlan / viajesCargadosJL25.tultitlan;
      totalKVCJL25.guadalajara = agrupamientoKJL25.guadalajara / viajesCargadosJL25.guadalajara;
      totalKVCJL25.hermosillo = agrupamientoKJL25.hermosillo / viajesCargadosJL25.hermosillo;
      totalKVCJL25.mexicali = agrupamientoKJL25.mexicali / viajesCargadosJL25.mexicali;
      totalKVCJL25.orizaba = agrupamientoKJL25.orizaba / viajesCargadosJL25.orizaba;
      // totalKVCJL25.ramosArispe = agrupamientoKJL25.ramosArispe / viajesCargadosJL25.ramosArispe;
      totalKVCJL25.total = agrupamientoKJL25.total / viajesCargadosJL25.total;
    }
    if (event.data.key == '202508 AGO'){
      viajesCargadosAG25.cuautitlan = event.summaryCells[4][0]?.value;
      viajesCargadosAG25.tultitlan = event.summaryCells[5][0]?.value;
      viajesCargadosAG25.guadalajara = event.summaryCells[6][0]?.value;
      viajesCargadosAG25.hermosillo = event.summaryCells[7][0]?.value;
      viajesCargadosAG25.mexicali = event.summaryCells[8][0]?.value;
      viajesCargadosAG25.orizaba = event.summaryCells[9][0]?.value;
      // viajesCargadosAG25.ramosArispe = event.summaryCells[10][0]?.value;
      viajesCargadosAG25.total = event.summaryCells[10][0]?.value;

      totalIVCAG25.cuautitlan = agrupamientoIAG25.cuautitlan / viajesCargadosAG25.cuautitlan;
      totalIVCAG25.tultitlan = agrupamientoIAG25.tultitlan / viajesCargadosAG25.tultitlan;
      totalIVCAG25.guadalajara = agrupamientoIAG25.guadalajara / viajesCargadosAG25.guadalajara;
      totalIVCAG25.hermosillo = agrupamientoIAG25.hermosillo / viajesCargadosAG25.hermosillo;
      totalIVCAG25.mexicali = agrupamientoIAG25.mexicali / viajesCargadosAG25.mexicali;
      totalIVCAG25.orizaba = agrupamientoIAG25.orizaba / viajesCargadosAG25.orizaba;
      // totalIVCAG25.ramosArispe = agrupamientoIAG25.ramosArispe / viajesCargadosAG25.ramosArispe;
      totalIVCAG25.total = agrupamientoIAG25.total / viajesCargadosAG25.total;

      totalKVCAG25.cuautitlan = agrupamientoKAG25.cuautitlan / viajesCargadosAG25.cuautitlan;
      totalKVCAG25.tultitlan = agrupamientoKAG25.tultitlan / viajesCargadosAG25.tultitlan;
      totalKVCAG25.guadalajara = agrupamientoKAG25.guadalajara / viajesCargadosAG25.guadalajara;
      totalKVCAG25.hermosillo = agrupamientoKAG25.hermosillo / viajesCargadosAG25.hermosillo;
      totalKVCAG25.mexicali = agrupamientoKAG25.mexicali / viajesCargadosAG25.mexicali;
      totalKVCAG25.orizaba = agrupamientoKAG25.orizaba / viajesCargadosAG25.orizaba;
      // totalKVCAG25.ramosArispe = agrupamientoKAG25.ramosArispe / viajesCargadosAG25.ramosArispe;
      totalKVCAG25.total = agrupamientoKAG25.total / viajesCargadosAG25.total;
    }
    if (event.data.key == '202509 SEP'){
      viajesCargadosS25.cuautitlan = event.summaryCells[4][0].value;
      viajesCargadosS25.tultitlan = event.summaryCells[5][0].value;
      viajesCargadosS25.guadalajara = event.summaryCells[6][0].value;
      viajesCargadosS25.hermosillo = event.summaryCells[7][0].value;
      viajesCargadosS25.mexicali = event.summaryCells[8][0].value;
      viajesCargadosS25.orizaba = event.summaryCells[9][0].value;
      // viajesCargadosS25.ramosArispe = event.summaryCells[10][0].value;
      viajesCargadosS25.total = event.summaryCells[10][0].value;

      totalIVCS25.cuautitlan = agrupamientoIS25.cuautitlan / viajesCargadosS25.cuautitlan;
      totalIVCS25.tultitlan = agrupamientoIS25.tultitlan / viajesCargadosS25.tultitlan;
      totalIVCS25.guadalajara = agrupamientoIS25.guadalajara / viajesCargadosS25.guadalajara;
      totalIVCS25.hermosillo = agrupamientoIS25.hermosillo / viajesCargadosS25.hermosillo;
      totalIVCS25.mexicali = agrupamientoIS25.mexicali / viajesCargadosS25.mexicali;
      totalIVCS25.orizaba = agrupamientoIS25.orizaba / viajesCargadosS25.orizaba;
      // totalIVCS25.ramosArispe = agrupamientoIS25.ramosArispe / viajesCargadosS25.ramosArispe;
      totalIVCS25.total = agrupamientoIS25.total / viajesCargadosS25.total;

      totalKVCS25.cuautitlan = agrupamientoKS25.cuautitlan / viajesCargadosS25.cuautitlan;
      totalKVCS25.tultitlan = agrupamientoKS25.tultitlan / viajesCargadosS25.tultitlan;
      totalKVCS25.guadalajara = agrupamientoKS25.guadalajara / viajesCargadosS25.guadalajara;
      totalKVCS25.hermosillo = agrupamientoKS25.hermosillo / viajesCargadosS25.hermosillo;
      totalKVCS25.mexicali = agrupamientoKS25.mexicali / viajesCargadosS25.mexicali;
      totalKVCS25.orizaba = agrupamientoKS25.orizaba / viajesCargadosS25.orizaba;
      // totalKVCS25.ramosArispe = agrupamientoKS25.ramosArispe / viajesCargadosS25.ramosArispe;
      totalKVCS25.total = agrupamientoKS25.total / viajesCargadosS25.total;
    }
    if (event.data.key == '202510 OCT'){
      viajesCargadosOC25.cuautitlan = event.summaryCells[4][0].value;
      viajesCargadosOC25.tultitlan = event.summaryCells[5][0].value;
      viajesCargadosOC25.guadalajara = event.summaryCells[6][0].value;
      viajesCargadosOC25.hermosillo = event.summaryCells[7][0].value;
      viajesCargadosOC25.mexicali = event.summaryCells[8][0].value;
      viajesCargadosOC25.orizaba = event.summaryCells[9][0].value;
      // viajesCargadosOC25.ramosArispe = event.summaryCells[10][0].value;
      viajesCargadosOC25.total = event.summaryCells[10][0].value;

      totalIVCOC25.cuautitlan = agrupamientoIOC25.cuautitlan / viajesCargadosOC25.cuautitlan;
      totalIVCOC25.tultitlan = agrupamientoIOC25.tultitlan / viajesCargadosOC25.tultitlan;
      totalIVCOC25.guadalajara = agrupamientoIOC25.guadalajara / viajesCargadosOC25.guadalajara;
      totalIVCOC25.hermosillo = agrupamientoIOC25.hermosillo / viajesCargadosOC25.hermosillo;
      totalIVCOC25.mexicali = agrupamientoIOC25.mexicali / viajesCargadosOC25.mexicali;
      totalIVCOC25.orizaba = agrupamientoIOC25.orizaba / viajesCargadosOC25.orizaba;
      // totalIVCOC25.ramosArispe = agrupamientoIOC25.ramosArispe / viajesCargadosOC25.ramosArispe;
      totalIVCOC25.total = agrupamientoIOC25.total / viajesCargadosOC25.total;

      totalKVCOC25.cuautitlan = agrupamientoKOC25.cuautitlan / viajesCargadosOC25.cuautitlan;
      totalKVCOC25.tultitlan = agrupamientoKOC25.tultitlan / viajesCargadosOC25.tultitlan;
      totalKVCOC25.guadalajara = agrupamientoKOC25.guadalajara / viajesCargadosOC25.guadalajara;
      totalKVCOC25.hermosillo = agrupamientoKOC25.hermosillo / viajesCargadosOC25.hermosillo;
      totalKVCOC25.mexicali = agrupamientoKOC25.mexicali / viajesCargadosOC25.mexicali;
      totalKVCOC25.orizaba = agrupamientoKOC25.orizaba / viajesCargadosOC25.orizaba;
      // totalKVCOC25.ramosArispe = agrupamientoKOC25.ramosArispe / viajesCargadosOC25.ramosArispe;
      totalKVCOC25.total = agrupamientoKOC25.total / viajesCargadosOC25.total;
    }
    if (event.data.key == '202511 NOV'){
      viajesCargadosNV25.cuautitlan = event.summaryCells[4][0].value;
      viajesCargadosNV25.tultitlan = event.summaryCells[5][0].value;
      viajesCargadosNV25.guadalajara = event.summaryCells[6][0].value;
      viajesCargadosNV25.hermosillo = event.summaryCells[7][0].value;
      viajesCargadosNV25.mexicali = event.summaryCells[8][0].value;
      viajesCargadosNV25.orizaba = event.summaryCells[9][0].value;
      // viajesCargadosNV25.ramosArispe = event.summaryCells[10][0].value;
      viajesCargadosNV25.total = event.summaryCells[10][0].value;

      totalIVCNV25.cuautitlan = agrupamientoINV25.cuautitlan / viajesCargadosNV25.cuautitlan;
      totalIVCNV25.tultitlan = agrupamientoINV25.tultitlan / viajesCargadosNV25.tultitlan;
      totalIVCNV25.guadalajara = agrupamientoINV25.guadalajara / viajesCargadosNV25.guadalajara;
      totalIVCNV25.hermosillo = agrupamientoINV25.hermosillo / viajesCargadosNV25.hermosillo;
      totalIVCNV25.mexicali = agrupamientoINV25.mexicali / viajesCargadosNV25.mexicali;
      totalIVCNV25.orizaba = agrupamientoINV25.orizaba / viajesCargadosNV25.orizaba;
      // totalIVCNV25.ramosArispe = agrupamientoINV25.ramosArispe / viajesCargadosNV25.ramosArispe;
      totalIVCNV25.total = agrupamientoINV25.total / viajesCargadosNV25.total;

      totalKVCNV25.cuautitlan = agrupamientoKNV25.cuautitlan / viajesCargadosNV25.cuautitlan;
      totalKVCNV25.tultitlan = agrupamientoKNV25.tultitlan / viajesCargadosNV25.tultitlan;
      totalKVCNV25.guadalajara = agrupamientoKNV25.guadalajara / viajesCargadosNV25.guadalajara;
      totalKVCNV25.hermosillo = agrupamientoKNV25.hermosillo / viajesCargadosNV25.hermosillo;
      totalKVCNV25.mexicali = agrupamientoKNV25.mexicali / viajesCargadosNV25.mexicali;
      totalKVCNV25.orizaba = agrupamientoKNV25.orizaba / viajesCargadosNV25.orizaba;
      // totalKVCNV25.ramosArispe = agrupamientoKNV25.ramosArispe / viajesCargadosNV25.ramosArispe;
      totalKVCNV25.total = agrupamientoKNV25.total / viajesCargadosNV25.total;
    }
    if (event.data.key == '202512 DIC'){
      viajesCargadosDC25.cuautitlan = event.summaryCells[4][0].value;
      viajesCargadosDC25.tultitlan = event.summaryCells[5][0].value;
      viajesCargadosDC25.guadalajara = event.summaryCells[6][0].value;
      viajesCargadosDC25.hermosillo = event.summaryCells[7][0].value;
      viajesCargadosDC25.mexicali = event.summaryCells[8][0].value;
      viajesCargadosDC25.orizaba = event.summaryCells[9][0].value;
      // viajesCargadosDC25.ramosArispe = event.summaryCells[10][0].value;
      viajesCargadosDC25.total = event.summaryCells[10][0].value;

      totalIVCDC25.cuautitlan = agrupamientoIDC25.cuautitlan / viajesCargadosDC25.cuautitlan;
      totalIVCDC25.tultitlan = agrupamientoIDC25.tultitlan / viajesCargadosDC25.tultitlan;
      totalIVCDC25.guadalajara = agrupamientoIDC25.guadalajara / viajesCargadosDC25.guadalajara;
      totalIVCDC25.hermosillo = agrupamientoIDC25.hermosillo / viajesCargadosDC25.hermosillo;
      totalIVCDC25.mexicali = agrupamientoIDC25.mexicali / viajesCargadosDC25.mexicali;
      totalIVCDC25.orizaba = agrupamientoIDC25.orizaba / viajesCargadosDC25.orizaba;
      // totalIVCDC25.ramosArispe = agrupamientoIDC25.ramosArispe / viajesCargadosDC25.ramosArispe;
      totalIVCDC25.total = agrupamientoIDC25.total / viajesCargadosDC25.total;

      totalKVCDC25.cuautitlan = agrupamientoKDC25.cuautitlan / viajesCargadosDC25.cuautitlan;
      totalKVCDC25.tultitlan = agrupamientoKDC25.tultitlan / viajesCargadosDC25.tultitlan;
      totalKVCDC25.guadalajara = agrupamientoKDC25.guadalajara / viajesCargadosDC25.guadalajara;
      totalKVCDC25.hermosillo = agrupamientoKDC25.hermosillo / viajesCargadosDC25.hermosillo;
      totalKVCDC25.mexicali = agrupamientoKDC25.mexicali / viajesCargadosDC25.mexicali;
      totalKVCDC25.orizaba = agrupamientoKDC25.orizaba / viajesCargadosDC25.orizaba;
      // totalKVCDC25.ramosArispe = agrupamientoKDC25.ramosArispe / viajesCargadosDC25.ramosArispe;
      totalKVCDC25.total = agrupamientoKDC25.total / viajesCargadosDC25.total;
    }
  }

  if(event.rowType == "totalFooter"){
    totalVC25.cuautitlan = event.summaryCells[4][0]?.value;
    totalVC25.tultitlan = event.summaryCells[5][0]?.value;
    totalVC25.guadalajara = event.summaryCells[6][0]?.value;
    totalVC25.hermosillo = event.summaryCells[7][0]?.value;
    totalVC25.mexicali = event.summaryCells[8][0]?.value;
    totalVC25.orizaba = event.summaryCells[9][0]?.value;
    // totalVC25.ramosArispe = event.summaryCells[10][0]?.value;
    totalVC25.total = event.summaryCells[10][0]?.value

    totalOperacionIVC25.cuautitlan = totalIngresos25.cuautitlan / totalVC25.cuautitlan;
    totalOperacionIVC25.tultitlan = totalIngresos25.tultitlan / totalVC25.tultitlan;
    totalOperacionIVC25.guadalajara = totalIngresos25.guadalajara / totalVC25.guadalajara;
    totalOperacionIVC25.hermosillo = totalIngresos25.hermosillo / totalVC25.hermosillo;
    totalOperacionIVC25.mexicali = totalIngresos25.mexicali / totalVC25.mexicali;
    totalOperacionIVC25.orizaba = totalIngresos25.orizaba / totalVC25.orizaba;
    // totalOperacionIVC25.ramosArispe = totalIngresos25.ramosArispe / totalVC25.ramosArispe;
    totalOperacionIVC25.total = totalIngresos25.total / totalVC25.total;

    totalOperacionKVC25.cuautitlan = totalKilomentros25.cuautitlan / totalVC25.cuautitlan;
    totalOperacionKVC25.tultitlan = totalKilomentros25.tultitlan / totalVC25.tultitlan;
    totalOperacionKVC25.guadalajara = totalKilomentros25.guadalajara / totalVC25.guadalajara;
    totalOperacionKVC25.hermosillo = totalKilomentros25.hermosillo / totalVC25.hermosillo;
    totalOperacionKVC25.mexicali = totalKilomentros25.mexicali / totalVC25.mexicali;
    totalOperacionKVC25.orizaba = totalKilomentros25.orizaba / totalVC25.orizaba;
    // totalOperacionKVC25.ramosArispe = totalKilomentros25.ramosArispe / totalVC25.ramosArispe;
    totalOperacionKVC25.total = totalKilomentros25.total / totalVC25.total;


  }

}
onCellPreparedVC2025(e){
  if (e.rowType == 'group'){

    e.cellElement.style.fontSize = '12px';
    e.cellElement.style.background = "#DCDCDC";
  }

  if (e.rowType == 'totalFooter') {
    e.totalItem.cells.forEach((c: any) => {
      if (c.cellElement) {
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "16px";
          c.cellElement.style.background = "#ff9460";
          c.cellElement.style.color = "black"; 
      }   
    });
  }
}
customizeVC2025(e) {  

  var gridCell = e.gridCell;
  if (gridCell.rowType === 'group') {
    
    e.backgroundColor = "#DCDCDC";
    e.fontWeight = "bolder"
    e.font = {bold: true}

}

if (gridCell.rowType === 'totalFooter') {
    
  e.backgroundColor = "#ff9460";
  e.fontWeight = "bolder"
  e.font = {bold: true}

}
}
//==============================INGRESOS KILOMETROS 2025===============================
onCellPreparedPM2025(e){

  if (e.rowType == 'data'){

    e.cellElement.style.fontSize = '12px';
    e.cellElement.style.background = "#DCDCDC";
  }
}  

onRowPreparedIK2025(e){
  if (e.rowType == 'group'){

    if(e.isExpanded == true){
      this.collapseGroup == true
    }


    if (e.data.key == '202501 ENE') {
      if(e.summaryCells[4].length !== 0){
      e.summaryCells[4][0].value =  totalAgrupamientoIKE25.cuautitlan;
      }
      if(e.summaryCells[5].length !== 0){
      e.summaryCells[5][0].value = totalAgrupamientoIKE25.tultitlan;
      }
      if(e.summaryCells[6].length !== 0){
      e.summaryCells[6][0].value = totalAgrupamientoIKE25.guadalajara;
      }
      if(e.summaryCells[7].length !== 0){
      e.summaryCells[7][0].value = totalAgrupamientoIKE25.hermosillo;
      }
      if(e.summaryCells[8].length !== 0){
      e.summaryCells[8][0].value = totalAgrupamientoIKE25.mexicali;
      }
      if(e.summaryCells[9].length !== 0){
      e.summaryCells[9][0].value = totalAgrupamientoIKE25.orizaba;
      }
      // if(e.summaryCells[10].length !== 0){
      // e.summaryCells[10][0].value = totalAgrupamientoIKE25.ramosArispe;
      // }
      if(e.summaryCells[10].length !== 0){
      e.summaryCells[10][0].value = totalAgrupamientoIKE25.total;
      }
    
    }
    if (e.data.key == '202502 FEB') {
      if(e.summaryCells[4].length !== 0){
      e.summaryCells[4][0].value = totalAgrupamientoIKF25.cuautitlan;
      }
      if(e.summaryCells[5].length !== 0){
      e.summaryCells[5][0].value = totalAgrupamientoIKF25.tultitlan;
      }
      if(e.summaryCells[6].length !== 0){
      e.summaryCells[6][0].value = totalAgrupamientoIKF25.guadalajara;
      }
      if(e.summaryCells[7].length !== 0){
      e.summaryCells[7][0].value = totalAgrupamientoIKF25.hermosillo;
      }
      if(e.summaryCells[8].length !== 0){
      e.summaryCells[8][0].value = totalAgrupamientoIKF25.mexicali;
      }
      if(e.summaryCells[9].length !== 0){
      e.summaryCells[9][0].value = totalAgrupamientoIKF25.orizaba;
      }
      // if(e.summaryCells[10].length !== 0){
      // e.summaryCells[10][0].value = totalAgrupamientoIKF25.ramosArispe;
      // }
      if(e.summaryCells[10].length !== 0){
      e.summaryCells[10][0].value = totalAgrupamientoIKF25.total;
      }
    }
    if (e.data.key == '202503 MAR') {
      if(e.summaryCells[4].length !== 0){
      e.summaryCells[4][0].value = totalAgrupamientoIKM25.cuautitlan;
      }
      if(e.summaryCells[5].length !== 0){
      e.summaryCells[5][0].value = totalAgrupamientoIKM25.tultitlan;
      }
      if(e.summaryCells[6].length !== 0){
      e.summaryCells[6][0].value = totalAgrupamientoIKM25.guadalajara;
      }
      if(e.summaryCells[7].length !== 0){
      e.summaryCells[7][0].value = totalAgrupamientoIKM25.hermosillo;
      }
      if(e.summaryCells[8].length !== 0){
      e.summaryCells[8][0].value = totalAgrupamientoIKM25.mexicali;
      }
      if(e.summaryCells[9].length !== 0){
      e.summaryCells[9][0].value = totalAgrupamientoIKM25.orizaba;
      }
      // if(e.summaryCells[10].length !== 0){
      // e.summaryCells[10][0].value = totalAgrupamientoIKM25.ramosArispe;
      // }
      if(e.summaryCells[10].length !== 0){
      e.summaryCells[10][0].value = totalAgrupamientoIKM25.total;
      }

    }
    if (e.data.key == '202504 ABR') {
      if(e.summaryCells[4].length !== 0){
      e.summaryCells[4][0].value = totalAgrupamientoIKA25.cuautitlan;
      }
      if(e.summaryCells[5].length !== 0){
      e.summaryCells[5][0].value = totalAgrupamientoIKA25.tultitlan;
      }
      if(e.summaryCells[6].length !== 0){
      e.summaryCells[6][0].value = totalAgrupamientoIKA25.guadalajara;
      }
      if(e.summaryCells[7].length !== 0){
      e.summaryCells[7][0].value = totalAgrupamientoIKA25.hermosillo;
      }
      if(e.summaryCells[8].length !== 0){
      e.summaryCells[8][0].value = totalAgrupamientoIKA25.mexicali;
      }
      if(e.summaryCells[9].length !== 0){
      e.summaryCells[9][0].value = totalAgrupamientoIKA25.orizaba;
      }
      // if(e.summaryCells[10].length !== 0){
      // e.summaryCells[10][0].value = totalAgrupamientoIKA25.ramosArispe;
      // }
      if(e.summaryCells[10].length !== 0){
      e.summaryCells[10][0].value = totalAgrupamientoIKA25.total;
      }
    }
    if (e.data.key == '202505 MAY') {
      if(e.summaryCells[4].length !== 0){
      e.summaryCells[4][0].value = totalAgrupamientoIKMY25.cuautitlan;
      }
      if(e.summaryCells[5].length !== 0){
      e.summaryCells[5][0].value = totalAgrupamientoIKMY25.tultitlan;
      }
      if(e.summaryCells[6].length !== 0){
      e.summaryCells[6][0].value = totalAgrupamientoIKMY25.guadalajara;
      }
      if(e.summaryCells[7].length !== 0){
      e.summaryCells[7][0].value = totalAgrupamientoIKMY25.hermosillo;
      }
      if(e.summaryCells[8].length !== 0){
      e.summaryCells[8][0].value = totalAgrupamientoIKMY25.mexicali;
      }
      if(e.summaryCells[9].length !== 0){
      e.summaryCells[9][0].value = totalAgrupamientoIKMY25.orizaba;
      }
      // if(e.summaryCells[10].length !== 0){
      // e.summaryCells[10][0].value = totalAgrupamientoIKMY25.ramosArispe;
      // }
      if(e.summaryCells[10].length !== 0){
      e.summaryCells[10][0].value = totalAgrupamientoIKMY25.total;
      }

    }
    if (e.data.key == '202506 JUN') {
      if(e.summaryCells[4].length !== 0){
      e.summaryCells[4][0].value = totalAgrupamientoIKJN25.cuautitlan;
      }
      if(e.summaryCells[5].length !== 0){
      e.summaryCells[5][0].value = totalAgrupamientoIKJN25.tultitlan;
      }
      if(e.summaryCells[6].length !== 0){
      e.summaryCells[6][0].value = totalAgrupamientoIKJN25.guadalajara;
      }
      if(e.summaryCells[7].length !== 0){
      e.summaryCells[7][0].value = totalAgrupamientoIKJN25.hermosillo;
      }
      if(e.summaryCells[8].length !== 0){
      e.summaryCells[8][0].value = totalAgrupamientoIKJN25.mexicali;
      }
      if(e.summaryCells[9].length !== 0){
      e.summaryCells[9][0].value = totalAgrupamientoIKJN25.orizaba;
      }
      // if(e.summaryCells[10].length !== 0){
      // e.summaryCells[10][0].value = totalAgrupamientoIKJN25.ramosArispe;
      // }
      if(e.summaryCells[10].length !== 0){
      e.summaryCells[10][0].value = totalAgrupamientoIKJN25.total;
      }
    }
    if (e.data.key == '202507 JUL') {
      if(e.summaryCells[4].length !== 0){
      e.summaryCells[4][0].value = totalAgrupamientoIKJL25.cuautitlan;
      }
      if(e.summaryCells[5].length !== 0){
      e.summaryCells[5][0].value = totalAgrupamientoIKJL25.tultitlan;
      }
      if(e.summaryCells[6].length !== 0){
      e.summaryCells[6][0].value = totalAgrupamientoIKJL25.guadalajara;
      }
      if(e.summaryCells[7].length !== 0){
      e.summaryCells[7][0].value = totalAgrupamientoIKJL25.hermosillo;
      }
      if(e.summaryCells[8].length !== 0){
      e.summaryCells[8][0].value = totalAgrupamientoIKJL25.mexicali;
      }
      if(e.summaryCells[9].length !== 0){
      e.summaryCells[9][0].value = totalAgrupamientoIKJL25.orizaba;
      }
      // if(e.summaryCells[10].length !== 0){
      // e.summaryCells[10][0].value = totalAgrupamientoIKJL25.ramosArispe;
      // }
      if(e.summaryCells[10].length !== 0){
      e.summaryCells[10][0].value = totalAgrupamientoIKJL25.total;
      }
    }
    if (e.data.key == '202508 AGO') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalAgrupamientoIKAG25.cuautitlan;
        }

        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalAgrupamientoIKAG25.tultitlan;
        }
      
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalAgrupamientoIKAG25.guadalajara;
        }
      
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalAgrupamientoIKAG25.hermosillo;
        }
      
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalAgrupamientoIKAG25.mexicali;
        }
      
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalAgrupamientoIKAG25.orizaba;
        }
      
        // if(e.summaryCells[10].length !== 0){
        // e.summaryCells[10][0].value = totalAgrupamientoIKAG25.ramosArispe;
        // }
      
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalAgrupamientoIKAG25.total;
        }
    }
    if (e.data.key == '202509 SEP') {
      if(e.summaryCells[4][0].length !== 0){
        if(Number.isNaN(totalAgrupamientoIKS25.cuautitlan)){
          e.summaryCells[4][0].value = 0;  
        }else{
          e.summaryCells[4][0].value = totalAgrupamientoIKS25.cuautitlan;
        }
      }
      if(e.summaryCells[5][0].length !== 0){
        if(Number.isNaN(totalAgrupamientoIKS25.tultitlan)){
          e.summaryCells[5][0].value = 0;  
        }else{
          e.summaryCells[5][0].value = totalAgrupamientoIKS25.tultitlan;
        }
      }
      if(e.summaryCells[6][0].length !== 0){
        if(Number.isNaN(totalAgrupamientoIKS25.guadalajara)){
          e.summaryCells[6][0].value = 0;
        }else{
          e.summaryCells[6][0].value = totalAgrupamientoIKS25.guadalajara;
        }
      }
      if(e.summaryCells[7][0].length !== 0){
        if(Number.isNaN(totalAgrupamientoIKS25.hermosillo)){
          e.summaryCells[7][0].value = 0;
        }else{
          e.summaryCells[7][0].value = totalAgrupamientoIKS25.hermosillo;
        }
      }
      if(e.summaryCells[8][0].length !== 0){
        if(Number.isNaN(totalAgrupamientoIKS25.mexicali)){
          e.summaryCells[8][0].value = 0;
        }else{
          e.summaryCells[8][0].value = totalAgrupamientoIKS25.mexicali;
        }
      }
      if(e.summaryCells[9][0].length !== 0){
        if(Number.isNaN(totalAgrupamientoIKS25.orizaba)){
          e.summaryCells[9][0].value = 0;
        }else{
          e.summaryCells[9][0].value = totalAgrupamientoIKS25.orizaba;
        }
      }
      // if(e.summaryCells[10][0].length !== 0){
      //   if(Number.isNaN(totalAgrupamientoIKS25.ramosArispe)){
      //     e.summaryCells[10][0].value = 0;
      //   }else{
      //     e.summaryCells[10][0].value = totalAgrupamientoIKS25.ramosArispe;
      //   }
      // }
      if(e.summaryCells[10][0].length !== 0){
        if(Number.isNaN(totalAgrupamientoIKS25.total)){
          e.summaryCells[10][0].value = 0;
        }else{
          e.summaryCells[10][0].value = totalAgrupamientoIKS25.total;
        }
      }
    }
    if (e.data.key == '202510 OCT') {
      if(e.summaryCells[4][0].length !== 0){
        if(Number.isNaN(totalAgrupamientoIKOC25.cuautitlan)){
          e.summaryCells[4][0].value = 0;
        }else{
          e.summaryCells[4][0].value = totalAgrupamientoIKOC25.cuautitlan;
        }
      }
      if(e.summaryCells[5][0].length !== 0){
        if(Number.isNaN(totalAgrupamientoIKOC25.tultitlan)){
          e.summaryCells[5][0].value = 0;
        }else{
          e.summaryCells[5][0].value = totalAgrupamientoIKOC25.tultitlan;
        }
      }
      if(e.summaryCells[6][0].length !== 0){
        if(Number.isNaN(totalAgrupamientoIKOC25.guadalajara)){
          e.summaryCells[6][0].value = 0;
        }else{
          e.summaryCells[6][0].value = totalAgrupamientoIKOC25.guadalajara;
        }
      }
      if(e.summaryCells[7][0].length !== 0){
        if(Number.isNaN(totalAgrupamientoIKOC25.hermosillo)){
          e.summaryCells[7][0].value = 0;
        }else{
          e.summaryCells[7][0].value = totalAgrupamientoIKOC25.hermosillo;
        }
      }
      if(e.summaryCells[8][0].length !== 0){
        if(Number.isNaN(totalAgrupamientoIKOC25.mexicali)){
          e.summaryCells[8][0].value = 0;
        }else{
          e.summaryCells[8][0].value = totalAgrupamientoIKOC25.mexicali;
        }
      }
      if(e.summaryCells[9][0].length !== 0){
        if(Number.isNaN(totalAgrupamientoIKOC25.orizaba)){
          e.summaryCells[9][0].value = 0;
        }{
          e.summaryCells[9][0].value = totalAgrupamientoIKOC25.orizaba;
        }
      }
      // if(e.summaryCells[10][0].length !== 0){
      //   if(Number.isNaN(totalAgrupamientoIKOC25.ramosArispe)){
      //     e.summaryCells[10][0].value = 0;
      //   }else{
      //     e.summaryCells[10][0].value = totalAgrupamientoIKOC25.ramosArispe;
      //   }
      // }
      if(e.summaryCells[10][0].length !== 0){
        if(Number.isNaN(totalAgrupamientoIKOC25.total)){
          e.summaryCells[10][0].value = 0;
        }else{
          e.summaryCells[10][0].value = totalAgrupamientoIKOC25.total;
        }
      }

    }
    if (e.data.key == '202511 NOV') {
      if(e.summaryCells[4][0].length !== 0){
        if(Number.isNaN(totalAgrupamientoIKNV25.cuautitlan)){
          e.summaryCells[4][0].value = 0;
        }else{
          e.summaryCells[4][0].value = totalAgrupamientoIKNV25.cuautitlan;
        }
      }
      if(e.summaryCells[5][0].length !== 0){
        if(Number.isNaN(totalAgrupamientoIKNV25.tultitlan)){
          e.summaryCells[5][0].value = 0;
        }else{
          e.summaryCells[5][0].value = totalAgrupamientoIKNV25.tultitlan;
        }
      }
      if(e.summaryCells[6][0].length !== 0){
        if(Number.isNaN(totalAgrupamientoIKNV25.guadalajara)){
          e.summaryCells[6][0].value = 0;
        }else{
          e.summaryCells[6][0].value = totalAgrupamientoIKNV25.guadalajara;
        }
      }
      if(e.summaryCells[7][0].length !== 0){
        if(Number.isNaN(totalAgrupamientoIKNV25.hermosillo)){
          e.summaryCells[7][0].value = 0;
        }else{
          e.summaryCells[7][0].value = totalAgrupamientoIKNV25.hermosillo;
        }
      }
      if(e.summaryCells[8][0].length !== 0){
        if(Number.isNaN(totalAgrupamientoIKNV25.mexicali)){
          e.summaryCells[8][0].value = 0;
        }else{
          e.summaryCells[8][0].value = totalAgrupamientoIKNV25.mexicali;
        }
      }
      if(e.summaryCells[9][0].length !== 0){
        if(Number.isNaN(totalAgrupamientoIKNV25.orizaba)){
          e.summaryCells[9][0].value = 0;
        }else{
          e.summaryCells[9][0].value = totalAgrupamientoIKNV25.orizaba;
        }
      }
      // if(e.summaryCells[10][0].length !== 0){
      //   if(Number.isNaN(totalAgrupamientoIKNV25.ramosArispe)){
      //     e.summaryCells[10][0].value = 0;
      //   }else{
      //     e.summaryCells[10][0].value = totalAgrupamientoIKNV25.ramosArispe;
      //   }
      // }
      if(e.summaryCells[10][0].length !== 0){
        if(Number.isNaN(totalAgrupamientoIKNV25.total)){
          e.summaryCells[10][0].value = 0;
        }else{
          e.summaryCells[10][0].value = totalAgrupamientoIKNV25.total;
        }
      }
    }
    if (e.data.key == '202512 DIC') {
      if(e.summaryCells[4][0].length !== 0){
        if(Number.isNaN(totalAgrupamientoIKDC25.cuautitlan)){
          e.summaryCells[4][0].value = 0;
        }else{
          e.summaryCells[4][0].value = totalAgrupamientoIKDC25.cuautitlan;
        }
      }
      if(e.summaryCells[5][0].length !== 0){
        if(Number.isNaN(totalAgrupamientoIKDC25.tultitlan)){
          e.summaryCells[5][0].value = 0;
        }else{
          e.summaryCells[5][0].value = totalAgrupamientoIKDC25.tultitlan;
        }
      }
      if(e.summaryCells[6][0].length !== 0){
        if(Number.isNaN(totalAgrupamientoIKDC25.guadalajara)){
          e.summaryCells[6][0].value = 0;
        }else{
          e.summaryCells[6][0].value = totalAgrupamientoIKDC25.guadalajara;
        }
      }
      if(e.summaryCells[7][0].length !== 0){
        if(Number.isNaN(totalAgrupamientoIKDC25.hermosillo)){
          e.summaryCells[7][0].value = 0;
        }else{
          e.summaryCells[7][0].value = totalAgrupamientoIKDC25.hermosillo;
        }
      }
      if(e.summaryCells[8][0].length !== 0){
        if(Number.isNaN(totalAgrupamientoIKDC25.mexicali)){
          e.summaryCells[8][0].value = 0;
        }else{
          e.summaryCells[8][0].value = totalAgrupamientoIKDC25.mexicali;
        }
      }
      if(e.summaryCells[9][0].length !== 0){
        if(Number.isNaN(totalAgrupamientoIKDC25.orizaba)){
          e.summaryCells[9][0].value = 0;
        }else{
          e.summaryCells[9][0].value = totalAgrupamientoIKDC25.orizaba;
        }
      }
      // if(e.summaryCells[10][0].length !== 0){
      //   if(Number.isNaN(totalAgrupamientoIKDC25.ramosArispe)){
      //     e.summaryCells[10][0].value = 0;
      //   }else{
      //     e.summaryCells[10][0].value = totalAgrupamientoIKDC25.ramosArispe;
      // }
      // }
      if(e.summaryCells[10][0].length !== 0){
        if(Number.isNaN(totalAgrupamientoIKDC25.total)){
          e.summaryCells[10][0].value = 0;
        }else{
          e.summaryCells[10][0].value = totalAgrupamientoIKDC25.total;
        }
      }

    }
   
  }

  this.paginacion = 60;
  if(this.paginacion = 60){
    this.expandGroup = false
  }
}
onCellPreparedIK2025(e){
  if (e.rowType == 'group'){

    e.cellElement.style.fontSize = '12px';
    e.cellElement.style.background = "#DCDCDC";

  }

  if (e.rowType == 'totalFooter') {
 
    e.totalItem.cells.forEach((c: any) => {
      if(c.totalItem.summaryCells[4][0]?.value != undefined){
        c.totalItem.summaryCells[4][0].value = totalOperacionIK25.cuautitlan;
      }
      if(c.totalItem.summaryCells[5][0]?.value != undefined){
        c.totalItem.summaryCells[5][0].value = totalOperacionIK25.tultitlan;
      }
      if(c.totalItem.summaryCells[6][0]?.value != undefined){
        c.totalItem.summaryCells[6][0].value = totalOperacionIK25.guadalajara;
      }
      if(c.totalItem.summaryCells[7][0]?.value != undefined){
        c.totalItem.summaryCells[7][0].value = totalOperacionIK25.hermosillo;          
      }
      if(c.totalItem.summaryCells[8][0]?.value != undefined){
        c.totalItem.summaryCells[8][0].value = totalOperacionIK25.mexicali;
      }
      if(c.totalItem.summaryCells[9][0]?.value != undefined){
        c.totalItem.summaryCells[9][0].value = totalOperacionIK25.orizaba;
      }
      // if(c.totalItem.summaryCells[10][0]?.value != undefined){
      //   c.totalItem.summaryCells[10][0].value = totalOperacionIK25.ramosArispe;
      // }
      if(c.totalItem.summaryCells[10][0]?.value != undefined){
        c.totalItem.summaryCells[10][0].value = totalOperacionIK25.total;
      }

      if (c.cellElement) {
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "16px";
          c.cellElement.style.background = "#ff9460";
          c.cellElement.style.color = "black"; 
      }   
    });
  }
}

customizeIK2025(e) {  

    var gridCell = e.gridCell;

    if (gridCell.rowType === 'group') {
      
      console.log(e)
      // if(gridCell.column.dataField == "cuatitlan"){
      //   const totalC = totalAgrupamientoIKE26.cuautitlan.toFixed(1);
      //   e.value = totalC
      // }
      // if(gridCell.column.dataField == "tultitlan"){
      //   const totalT = totalAgrupamientoIKE26.tultitlan.toFixed(1);
      //   e.value = totalT;
      // }
      // if(gridCell.column.dataField == "guadalajara"){
      //   const totalG = totalAgrupamientoIKE26.guadalajara.toFixed(1);
      //   e.value = totalG;
      // }
      // if(gridCell.column.dataField == "hermosillo"){
      //   const totalH = totalAgrupamientoIKE26.hermosillo.toFixed(1);
      //   e.value = totalH;
      // }
      // if(gridCell.column.dataField == "mexicali"){
      //   const totalM = totalAgrupamientoIKE26.mexicali.toFixed(1);
      //   e.value = totalM;
      // }
      // if(gridCell.column.dataField == "orizaba"){
      //   const totalO = totalAgrupamientoIKE26.orizaba.toFixed(1);
      //   e.value = totalO;
      // }
      // if(gridCell.column.dataField == "total"){
      //   const totalTO = totalAgrupamientoIKE26.total.toFixed(1);
      //   e.value = totalTO;
      // }

      e.backgroundColor = "#DCDCDC";
      e.fontWeight = "bolder"
      e.font = {bold: true}

    }

    if (gridCell.rowType === 'totalFooter') {
      var gridCell = e.gridCell;
      // if(gridCell.column.dataField == "cuatitlan"){
      //   const totalC = totalOperacionIK25.cuautitlan.toFixed(1);
      //   e.value = totalC
      // }
      // if(gridCell.column.dataField == "tultitlan"){
      //   const totalT = totalOperacionIK25.tultitlan.toFixed(1);
      //   e.value = totalT;
      // }
      // if(gridCell.column.dataField == "guadalajara"){
      //   const totalG = totalOperacionIK25.guadalajara.toFixed(1);
      //   e.value = totalG;
      // }
      // if(gridCell.column.dataField == "hermosillo"){
      //   const totalH = totalOperacionIK25.hermosillo.toFixed(1);
      //   e.value = totalH;
      // }
      // if(gridCell.column.dataField == "mexicali"){
      //   const totalM = totalOperacionIK25.mexicali.toFixed(1);
      //   e.value = totalM;
      // }
      // if(gridCell.column.dataField == "orizaba"){
      //   const totalO = totalOperacionIK25.orizaba.toFixed(1);
      //   e.value = totalO;
      // }
      // if(gridCell.column.dataField == "total"){
      //   const totalTO = totalOperacionIK25.total.toFixed(1);
      //   e.value = totalTO;
      // }
      //console.log(e)
      e.backgroundColor = "#ff9460";
      e.fontWeight = "bolder"
      e.font = {bold: true}

    }

  }

customizeExportDataIK25(cols, rows){

  rows.forEach((row: any) =>{  
    
    var rowValues =  row.values;  
    

    if(row.rowType == "group"){
      if(row.key[0] == '202501 ENE'){

        rowValues[3][0].value = totalAgrupamientoIKE25.cuautitlan;
        rowValues[4][0].value = totalAgrupamientoIKE25.tultitlan;
        rowValues[5][0].value = totalAgrupamientoIKE25.guadalajara;
        rowValues[6][0].value = totalAgrupamientoIKE25.hermosillo;
        rowValues[7][0].value = totalAgrupamientoIKE25.mexicali;
        rowValues[8][0].value = totalAgrupamientoIKE25.orizaba;
        // rowValues[9][0].value = totalKVCE.ramosArispe;
        rowValues[9][0].value = totalAgrupamientoIKE25.total;
      }
      if(row.key[0] == '202502 FEB'){

        rowValues[3][0].value = totalAgrupamientoIKF25.cuautitlan;
        rowValues[4][0].value = totalAgrupamientoIKF25.tultitlan;
        rowValues[5][0].value = totalAgrupamientoIKF25.guadalajara;
        rowValues[6][0].value = totalAgrupamientoIKF25.hermosillo;
        rowValues[7][0].value = totalAgrupamientoIKF25.mexicali;
        rowValues[8][0].value = totalAgrupamientoIKF25.orizaba;
        // rowValues[9][0].value = totalKVCF.ramosArispe;
        rowValues[9][0].value = totalAgrupamientoIKF25.total;
      }
      if(row.key[0] == '202503 MAR'){

        rowValues[3][0].value = totalAgrupamientoIKM25.cuautitlan;
        rowValues[4][0].value = totalAgrupamientoIKM25.tultitlan;
        rowValues[5][0].value = totalAgrupamientoIKM25.guadalajara;
        rowValues[6][0].value = totalAgrupamientoIKM25.hermosillo;
        rowValues[7][0].value = totalAgrupamientoIKM25.mexicali;
        rowValues[8][0].value = totalAgrupamientoIKM25.orizaba;
        // rowValues[9][0].value = totalKVCM.ramosArispe;
        rowValues[9][0].value = totalAgrupamientoIKM25.total;
      }
      if(row.key[0] == '202504 ABR'){

        rowValues[3][0].value = totalAgrupamientoIKA25.cuautitlan;
        rowValues[4][0].value = totalAgrupamientoIKA25.tultitlan;
        rowValues[5][0].value = totalAgrupamientoIKA25.guadalajara;
        rowValues[6][0].value = totalAgrupamientoIKA25.hermosillo;
        rowValues[7][0].value = totalAgrupamientoIKA25.mexicali;
        rowValues[8][0].value = totalAgrupamientoIKA25.orizaba;
        // rowValues[9][0].value = totalKVCA.ramosArispe;
        rowValues[9][0].value = totalAgrupamientoIKA25.total;
      }
      if(row.key[0] == '202505 MAY'){

        rowValues[3][0].value = totalAgrupamientoIKMY25.cuautitlan;
        rowValues[4][0].value = totalAgrupamientoIKMY25.tultitlan;
        rowValues[5][0].value = totalAgrupamientoIKMY25.guadalajara;
        rowValues[6][0].value = totalAgrupamientoIKMY25.hermosillo;
        rowValues[7][0].value = totalAgrupamientoIKMY25.mexicali;
        rowValues[8][0].value = totalAgrupamientoIKMY25.orizaba;
        // rowValues[9][0].value = totalKVCMY.ramosArispe;
        rowValues[9][0].value = totalAgrupamientoIKMY25.total;
      }
      if(row.key[0] == '202506 JUN'){

        rowValues[3][0].value = totalAgrupamientoIKJN25.cuautitlan;
        rowValues[4][0].value = totalAgrupamientoIKJN25.tultitlan;
        rowValues[5][0].value = totalAgrupamientoIKJN25.guadalajara;
        rowValues[6][0].value = totalAgrupamientoIKJN25.hermosillo;
        rowValues[7][0].value = totalAgrupamientoIKJN25.mexicali;
        rowValues[8][0].value = totalAgrupamientoIKJN25.orizaba;
        // rowValues[9][0].value = totalKVCJN25.ramosArispe;
        rowValues[9][0].value = totalAgrupamientoIKJN25.total;
      }
      if(row.key[0] == '202507 JUL'){

        rowValues[3][0].value = totalAgrupamientoIKJL25.cuautitlan;
        rowValues[4][0].value = totalAgrupamientoIKJL25.tultitlan;
        rowValues[5][0].value = totalAgrupamientoIKJL25.guadalajara;
        rowValues[6][0].value = totalAgrupamientoIKJL25.hermosillo;
        rowValues[7][0].value = totalAgrupamientoIKJL25.mexicali;
        rowValues[8][0].value = totalAgrupamientoIKJL25.orizaba;
        // rowValues[9][0].value = totalKVCJL25.ramosArispe;
        rowValues[9][0].value = totalAgrupamientoIKJL25.total;

      }
      if(row.key[0] == '202508 AGO'){

        rowValues[3][0].value = totalAgrupamientoIKAG25.cuautitlan;
        rowValues[4][0].value = totalAgrupamientoIKAG25.tultitlan;
        rowValues[5][0].value = totalAgrupamientoIKAG25.guadalajara;
        rowValues[6][0].value = totalAgrupamientoIKAG25.hermosillo;
        rowValues[7][0].value = totalAgrupamientoIKAG25.mexicali;
        rowValues[8][0].value = totalAgrupamientoIKAG25.orizaba;
        // rowValues[9][0].value = totalKVCAG25.ramosArispe;
        rowValues[9][0].value = totalAgrupamientoIKAG25.total;

      }
      if(row.key[0] == '202509 SEP'){

        rowValues[3][0].value = totalAgrupamientoIKS25.cuautitlan;
        rowValues[4][0].value = totalAgrupamientoIKS25.tultitlan;
        rowValues[5][0].value = totalAgrupamientoIKS25.guadalajara;
        rowValues[6][0].value = totalAgrupamientoIKS25.hermosillo;
        rowValues[7][0].value = totalAgrupamientoIKS25.mexicali;
        rowValues[8][0].value = totalAgrupamientoIKS25.orizaba;
        // rowValues[9][0].value = totalKVCS25.ramosArispe;
        rowValues[9][0].value = totalAgrupamientoIKS25.total;

      }
      if(row.key[0] == '202510 OCT'){

        rowValues[3][0].value = totalAgrupamientoIKOC25.cuautitlan;
        rowValues[4][0].value = totalAgrupamientoIKOC25.tultitlan;
        rowValues[5][0].value = totalAgrupamientoIKOC25.guadalajara;
        rowValues[6][0].value = totalAgrupamientoIKOC25.hermosillo;
        rowValues[7][0].value = totalAgrupamientoIKOC25.mexicali;
        rowValues[8][0].value = totalAgrupamientoIKOC25.orizaba;
        // rowValues[9][0].value = totalKVCOC25.ramosArispe;
        rowValues[9][0].value = totalAgrupamientoIKOC25.total;

      }

      if(row.key[0] == '202511 NOV'){

        rowValues[3][0].value = totalAgrupamientoIKNV25.cuautitlan;
        rowValues[4][0].value = totalAgrupamientoIKNV25.tultitlan;
        rowValues[5][0].value = totalAgrupamientoIKNV25.guadalajara;
        rowValues[6][0].value = totalAgrupamientoIKNV25.hermosillo;
        rowValues[7][0].value = totalAgrupamientoIKNV25.mexicali;
        rowValues[8][0].value = totalAgrupamientoIKNV25.orizaba;
        // rowValues[9][0].value = totalKVCNV25.ramosArispe;
        rowValues[9][0].value = totalAgrupamientoIKNV25.total;

      }
      if(row.key[0] == '202512 DIC'){

        rowValues[3][0].value = totalAgrupamientoIKDC25.cuautitlan;
        rowValues[4][0].value = totalAgrupamientoIKDC25.tultitlan;
        rowValues[5][0].value = totalAgrupamientoIKDC25.guadalajara;
        rowValues[6][0].value = totalAgrupamientoIKDC25.hermosillo;
        rowValues[7][0].value = totalAgrupamientoIKDC25.mexicali;
        rowValues[8][0].value = totalAgrupamientoIKDC25.orizaba;
        // rowValues[9][0].value = totalKVCDC25.ramosArispe;
        rowValues[9][0].value = totalAgrupamientoIKDC25.total;

      }
    }

    if(row.rowType == "totalFooter"){
      

      row.values[3].value = totalOperacionIK25.cuautitlan;
      row.values[4].value = totalOperacionIK25.tultitlan;
      row.values[5].value = totalOperacionIK25.guadalajara;
      row.values[6].value = totalOperacionIK25.hermosillo;
      row.values[7].value = totalOperacionIK25.mexicali;
      row.values[8].value = totalOperacionIK25.orizaba;
      // row.values[9].value = totalOperacionKVC25.ramosArispe;
      row.values[9].value = totalOperacionIK25.total;


    }

  });

}
//==============================VIAJES KILOMETROS 2025=================================
onRowPreparedKV2025(e){

  if (e.rowType == 'group'){

    if(e.isExpanded == true){
      this.collapseGroup == true
    }


    if (e.data.key == '202501 ENE') {
      if(e.summaryCells[4].length !== 0){
      e.summaryCells[4][0].value = totalKVCE25.cuautitlan;
      }
      if(e.summaryCells[5].length !== 0){
      e.summaryCells[5][0].value = totalKVCE25.tultitlan;
      }
      if(e.summaryCells[6].length !== 0){
      e.summaryCells[6][0].value = totalKVCE25.guadalajara;
      }
      if(e.summaryCells[7].length !== 0){
      e.summaryCells[7][0].value = totalKVCE25.hermosillo;
      }
      if(e.summaryCells[8].length !== 0){
      e.summaryCells[8][0].value = totalKVCE25.mexicali;
      }
      if(e.summaryCells[9].length !== 0){
      e.summaryCells[9][0].value = totalKVCE25.orizaba;
      }
      // if(e.summaryCells[10].length !== 0){
      // e.summaryCells[10][0].value = totalKVCE25.ramosArispe;
      // }
      if(e.summaryCells[10].length !== 0){
      e.summaryCells[10][0].value = totalKVCE25.total;
      }
      
    }
    if (e.data.key == '202502 FEB') {
      if(e.summaryCells[4].length !== 0){
      e.summaryCells[4][0].value = totalKVCF25.cuautitlan;
      }
      if(e.summaryCells[5].length !== 0){
      e.summaryCells[5][0].value = totalKVCF25.tultitlan;
      }
      if(e.summaryCells[6].length !== 0){
      e.summaryCells[6][0].value = totalKVCF25.guadalajara;
      }
      if(e.summaryCells[7].length !== 0){
      e.summaryCells[7][0].value = totalKVCF25.hermosillo;
      }
      if(e.summaryCells[8].length !== 0){
      e.summaryCells[8][0].value = totalKVCF25.mexicali;
      }
      if(e.summaryCells[9].length !== 0){
      e.summaryCells[9][0].value = totalKVCF25.orizaba;
      }
      // if(e.summaryCells[10].length !== 0){
      // e.summaryCells[10][0].value = totalKVCF25.ramosArispe;
      // }
      if(e.summaryCells[10].length !== 0){
      e.summaryCells[10][0].value = totalKVCF25.total;
      }
    }
    if (e.data.key == '202503 MAR') {
      if(e.summaryCells[4].length !== 0){
      e.summaryCells[4][0].value = totalKVCM25.cuautitlan;
      }
      if(e.summaryCells[5].length !== 0){
      e.summaryCells[5][0].value = totalKVCM25.tultitlan;
      }
      if(e.summaryCells[6].length !== 0){
      e.summaryCells[6][0].value = totalKVCM25.guadalajara;
      }
      if(e.summaryCells[7].length !== 0){
      e.summaryCells[7][0].value = totalKVCM25.hermosillo;
      }
      if(e.summaryCells[8].length !== 0){
      e.summaryCells[8][0].value = totalKVCM25.mexicali;
      }
      if(e.summaryCells[9].length !== 0){
      e.summaryCells[9][0].value = totalKVCM25.orizaba;
      }
      // if(e.summaryCells[10].length !== 0){
      // e.summaryCells[10][0].value = totalKVCM25.ramosArispe;
      // }
      if(e.summaryCells[10].length !== 0){
      e.summaryCells[10][0].value = totalKVCM25.total;
      }
    }
    if (e.data.key == '202504 ABR') {
      if(e.summaryCells[4].length !== 0){
      e.summaryCells[4][0].value = totalKVCA25.cuautitlan;
      }
      if(e.summaryCells[5].length !== 0){
      e.summaryCells[5][0].value = totalKVCA25.tultitlan;
      }
      if(e.summaryCells[6].length !== 0){
      e.summaryCells[6][0].value = totalKVCA25.guadalajara;
      }
      if(e.summaryCells[7].length !== 0){
      e.summaryCells[7][0].value = totalKVCA25.hermosillo;
      }
      if(e.summaryCells[8].length !== 0){
      e.summaryCells[8][0].value = totalKVCA25.mexicali;
      }
      if(e.summaryCells[9].length !== 0){
      e.summaryCells[9][0].value = totalKVCA25.orizaba;
      }
      // if(e.summaryCells[10].length !== 0){
      // e.summaryCells[10][0].value = totalKVCA25.ramosArispe;
      // }
      if(e.summaryCells[10].length !== 0){
      e.summaryCells[10][0].value = totalKVCA25.total;
      }
    }
    if (e.data.key == '202505 MAY') {
      if(e.summaryCells[4].length !== 0){
      e.summaryCells[4][0].value = totalKVCMY25.cuautitlan;
      }
      if(e.summaryCells[5].length !== 0){
      e.summaryCells[5][0].value = totalKVCMY25.tultitlan;
      }
      if(e.summaryCells[6].length !== 0){
      e.summaryCells[6][0].value = totalKVCMY25.guadalajara;
      }
      if(e.summaryCells[7].length !== 0){
      e.summaryCells[7][0].value = totalKVCMY25.hermosillo;
      }
      if(e.summaryCells[8].length !== 0){
      e.summaryCells[8][0].value = totalKVCMY25.mexicali;
      }
      if(e.summaryCells[9].length !== 0){
      e.summaryCells[9][0].value = totalKVCMY25.orizaba;
      }
      // if(e.summaryCells[10].length !== 0){
      // e.summaryCells[10][0].value = totalKVCMY25.ramosArispe;
      // }
      if(e.summaryCells[10].length !== 0){
      e.summaryCells[10][0].value = totalKVCMY25.total;
      }
    }
    if (e.data.key == '202506 JUN') {
      if(e.summaryCells[4].length !== 0){
      e.summaryCells[4][0].value = totalKVCJN25.cuautitlan;
      }
      if(e.summaryCells[5].length !== 0){
      e.summaryCells[5][0].value = totalKVCJN25.tultitlan;
      }
      if(e.summaryCells[6].length !== 0){
      e.summaryCells[6][0].value = totalKVCJN25.guadalajara;
      }
      if(e.summaryCells[7].length !== 0){
      e.summaryCells[7][0].value = totalKVCJN25.hermosillo;
      }
      if(e.summaryCells[8].length !== 0){
      e.summaryCells[8][0].value = totalKVCJN25.mexicali;
      }
      if(e.summaryCells[9].length !== 0){
      e.summaryCells[9][0].value = totalKVCJN25.orizaba;
      }
      // if(e.summaryCells[10].length !== 0){
      // e.summaryCells[10][0].value = totalKVCJN25.ramosArispe;
      // }
      if(e.summaryCells[10].length !== 0){
      e.summaryCells[10][0].value = totalKVCJN25.total;
      }
    }
    if (e.data.key == '202507 JUL') {
      if(e.summaryCells[4].length !== 0){
      e.summaryCells[4][0].value = totalKVCJL25.cuautitlan;
      }
      if(e.summaryCells[5].length !== 0){
      e.summaryCells[5][0].value = totalKVCJL25.tultitlan;
      }
      if(e.summaryCells[6].length !== 0){
      e.summaryCells[6][0].value = totalKVCJL25.guadalajara;
      }
      if(e.summaryCells[7].length !== 0){
      e.summaryCells[7][0].value = totalKVCJL25.hermosillo;
      }
      if(e.summaryCells[8].length !== 0){
      e.summaryCells[8][0].value = totalKVCJL25.mexicali;
      }
      if(e.summaryCells[9].length !== 0){
      e.summaryCells[9][0].value = totalKVCJL25.orizaba;
      }
      // if(e.summaryCells[10].length !== 0){
      // e.summaryCells[10][0].value = totalKVCJL25.ramosArispe;
      // }
      if(e.summaryCells[10].length !== 0){
      e.summaryCells[10][0].value = totalKVCJL25.total;
      }
    }
    if (e.data.key == '202508 AGO') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalKVCAG25.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalKVCAG25.tultitlan; 
        }         
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalKVCAG25.guadalajara;    
        }      
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalKVCAG25.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalKVCAG25.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalKVCAG25.orizaba;   
        }       
        // if(e.summaryCells[10].length !== 0){
        // e.summaryCells[10][0].value = totalKVCAG25.ramosArispe; 
        // }         
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalKVCAG25.total;   
        }       
    }
    if (e.data.key == '202509 SEP') {
      if(e.summaryCells[4][0].length !== 0){
        if(Number.isNaN(totalKVCS25.cuautitlan)){
          e.summaryCells[4][0].value = 0;
        }else{
          e.summaryCells[4][0].value = totalKVCS25.cuautitlan;
        }
      }
      if(e.summaryCells[5][0].length !== 0){
        if(Number.isNaN(totalKVCS25.tultitlan)){
          e.summaryCells[5][0].value = 0;
        }else{
          e.summaryCells[5][0].value = totalKVCS25.tultitlan;
        }
      }
      if(e.summaryCells[6][0].length !== 0){
        if(Number.isNaN(totalKVCS25.guadalajara)){
          e.summaryCells[6][0].value = 0;
        }else{
          e.summaryCells[6][0].value = totalKVCS25.guadalajara;
        }
      }
      if(e.summaryCells[7][0].length !== 0){
        if(Number.isNaN(totalKVCS25.hermosillo)){
          e.summaryCells[7][0].value = 0;  
        }else{
          e.summaryCells[7][0].value = totalKVCS25.hermosillo;
        }
      }
      if(e.summaryCells[8][0].length !== 0){
        if(Number.isNaN(totalKVCS25.mexicali)){
          e.summaryCells[8][0].value = 0;
        }else{
          e.summaryCells[8][0].value = totalKVCS25.mexicali;
        }
      }
      if(e.summaryCells[9][0].value.length !== 0){
        if(Number.isNaN(totalKVCS25.orizaba)){
          e.summaryCells[9][0].value = 0;
        }else{
          e.summaryCells[9][0].value = totalKVCS25.orizaba;
        }
      }
      // if(e.summaryCells[10][0].length !== 0){
      //   if(Number.isNaN(totalKVCS25.ramosArispe)){
      //     e.summaryCells[10][0].value = 0;  
      //   }else{
      //     e.summaryCells[10][0].value = totalKVCS25.ramosArispe;
      //   }
      // }
      if(e.summaryCells[10][0].length !== 0){
        if(Number.isNaN(totalKVCS25.total)){
          e.summaryCells[10][0].value = 0;
        }else{
          e.summaryCells[10][0].value = totalKVCS25.total;
        }
      }
    }
    if (e.data.key == '202510 OCT') {
      if(e.summaryCells[4][0].length !== 0){
        if(Number.isNaN(totalKVCOC25.cuautitlan)){
          e.summaryCells[4][0].value = 0;
        }else{
          e.summaryCells[4][0].value = totalKVCOC25.cuautitlan;
        }
      }
      if(e.summaryCells[5][0].length !== 0){
        if(Number.isNaN(totalKVCOC25.tultitlan)){
          e.summaryCells[5][0].value = 0;
        }else{
          e.summaryCells[5][0].value = totalKVCOC25.tultitlan;
        }
      }
      if(e.summaryCells[6][0].length !== 0){
        if(Number.isNaN(totalKVCOC25.guadalajara)){
          e.summaryCells[6][0].value = 0;
        }else{
          e.summaryCells[6][0].value = totalKVCOC25.guadalajara;
        }
      }
      if(e.summaryCells[7][0].length !== 0){
        if(Number.isNaN(totalKVCOC25.hermosillo)){
          e.summaryCells[7][0].value = 0;
        }else{
          e.summaryCells[7][0].value = totalKVCOC25.hermosillo;
        }
      }
      if(e.summaryCells[8][0].length !== 0){
        if(Number.isNaN(totalKVCOC25.mexicali)){
          e.summaryCells[8][0].value = 0;
        }else{
          e.summaryCells[8][0].value = totalKVCOC25.mexicali;
        }
      }
      if(e.summaryCells[9][0].length !== 0){
        if(Number.isNaN(totalKVCOC25.orizaba)){
          e.summaryCells[9][0].value = 0;
        }else{
          e.summaryCells[9][0].value = totalKVCOC25.orizaba;
        }
      }
      // if(e.summaryCells[10][0].length !== 0){
      //   if(Number.isNaN(totalKVCOC25.ramosArispe)){
      //     e.summaryCells[10][0].value = 0;
      //   }else{
      //     e.summaryCells[10][0].value = totalKVCOC25.ramosArispe;
      //   }
      // }
      if(e.summaryCells[10][0].length !== 0){
        if(Number.isNaN(totalKVCOC25.total)){
          e.summaryCells[10][0].value = 0;
        }else{
          e.summaryCells[10][0].value = totalKVCOC25.total;
        }
      }

    }
    if (e.data.key == '202511 NOV') {
      if(e.summaryCells[4][0].length !== 0){
        if(Number.isNaN(totalKVCNV25.cuautitlan)){
          e.summaryCells[4][0].value = 0;
        }else{
          e.summaryCells[4][0].value = totalKVCNV25.cuautitlan;
        }
      }
      if(e.summaryCells[5][0].length !== 0){
        if(Number.isNaN(totalKVCNV25.tultitlan)){
          e.summaryCells[5][0].value = 0;
        }else{
          e.summaryCells[5][0].value = totalKVCNV25.tultitlan;
        }
      }
      if(e.summaryCells[6][0].length !== 0){
        if(Number.isNaN(totalKVCNV25.guadalajara)){
          e.summaryCells[6][0].value = 0;
        }else{
          e.summaryCells[6][0].value = totalKVCNV25.guadalajara;
        }
      }
      if(e.summaryCells[7][0].length !== 0){
        if(Number.isNaN(totalKVCNV25.hermosillo)){
          e.summaryCells[7][0].value = 0;
        }else{
          e.summaryCells[7][0].value = totalKVCNV25.hermosillo;
        }
      }
      if(e.summaryCells[8][0].length !== 0){
        if(Number.isNaN(totalKVCNV25.mexicali)){
          e.summaryCells[8][0].value = 0;
        }else{
          e.summaryCells[8][0].value = totalKVCNV25.mexicali;
        }
      }
      if(e.summaryCells[9][0].length !== 0){
        if(Number.isNaN(totalKVCNV25.orizaba)){
          e.summaryCells[9][0].value = 0;
        }else{
          e.summaryCells[9][0].value = totalKVCNV25.orizaba;
        }
      }
      // if(e.summaryCells[10][0].length !== 0){
      //   if(Number.isNaN(totalKVCNV25.ramosArispe)){
      //     e.summaryCells[10][0].value = 0;
      //   }else{
      //     e.summaryCells[10][0].value = totalKVCNV25.ramosArispe;
      //   }
      // }
      if(e.summaryCells[10][0].length !== 0){
        if(Number.isNaN(totalKVCNV25.total)){
          e.summaryCells[10][0].value = 0;
        }else{
          e.summaryCells[10][0].value = totalKVCNV25.total;
        }
      }

    }
    if (e.data.key == '202512 DIC') {
      if(e.summaryCells[4][0].length !== 0){
        if(Number.isNaN(totalKVCDC25.cuautitlan)){
          e.summaryCells[4][0].value = 0;
        }else{
          e.summaryCells[4][0].value = totalKVCDC25.cuautitlan;
        }
      }
      if(e.summaryCells[5][0].length !== 0){
        if(Number.isNaN(totalKVCDC25.tultitlan)){
          e.summaryCells[5][0].value = 0;
        }else{
          e.summaryCells[5][0].value = totalKVCDC25.tultitlan;
        }
      }
      if(e.summaryCells[6][0].length !== 0){
        if(Number.isNaN(totalKVCDC25.guadalajara)){
          e.summaryCells[6][0].value = 0;
        }else{
          e.summaryCells[6][0].value = totalKVCDC25.guadalajara;
        }
      }
      if(e.summaryCells[7][0].length !== 0){
        if(Number.isNaN(totalKVCDC25.hermosillo)){
          e.summaryCells[7][0].value = 0;
        }else{
          e.summaryCells[7][0].value = totalKVCDC25.hermosillo;
        }
      }
      if(e.summaryCells[8][0].length !== 0){
        if(Number.isNaN(totalKVCDC25.mexicali)){
          e.summaryCells[8][0].value = 0;
        }else{
          e.summaryCells[8][0].value = totalKVCDC25.mexicali;
        }
        }
      if(e.summaryCells[9][0].length !== 0){
        if(Number.isNaN(totalKVCDC25.orizaba)){
          e.summaryCells[9][0].value = 0;
        }else{
          e.summaryCells[9][0].value = totalKVCDC25.orizaba;
        }
      }
      // if(e.summaryCells[10][0].length !== 0){
      //   if(Number.isNaN(totalKVCDC25.ramosArispe)){
      //     e.summaryCells[10][0].value = 0;
      //   }else{
      //     e.summaryCells[10][0].value = totalKVCDC25.ramosArispe;
      //   }
      // }
      if(e.summaryCells[10][0].length !== 0){
        if(Number.isNaN(totalKVCDC25.total)){
          e.summaryCells[10][0].value = 0;
        }else{
          e.summaryCells[10][0].value = totalKVCDC25.total;
        }
      }

    }

  }

  this.paginacionKV = 60;
  if(this.paginacionKV = 60){
    this.expandGroupKV = false
  }
}

onCellPreparedKV2025(e){
  if (e.rowType == 'group'){

    e.cellElement.style.fontSize = '12px';
    e.cellElement.style.background = "#DCDCDC";

  }

  if (e.rowType == 'totalFooter') {

    e.totalItem.cells.forEach((c: any) => {

      if(c.totalItem.summaryCells[4][0]?.value != undefined){
        c.totalItem.summaryCells[4][0].value = totalOperacionKVC25.cuautitlan;
      }

      if(c.totalItem.summaryCells[5][0]?.value != undefined){
        c.totalItem.summaryCells[5][0].value = totalOperacionKVC25.tultitlan;
      }

      if(c.totalItem.summaryCells[6][0]?.value != undefined){
        c.totalItem.summaryCells[6][0].value = totalOperacionKVC25.guadalajara;
      }

      if(c.totalItem.summaryCells[7][0]?.value != undefined){
        c.totalItem.summaryCells[7][0].value = totalOperacionKVC25.hermosillo;          
      }

      if(c.totalItem.summaryCells[8][0]?.value != undefined){
        c.totalItem.summaryCells[8][0].value = totalOperacionKVC25.mexicali;
      }

      if(c.totalItem.summaryCells[9][0]?.value != undefined){
        c.totalItem.summaryCells[9][0].value = totalOperacionKVC25.orizaba;
      }
      // if(c.totalItem.summaryCells[10][0]?.value != undefined){
      //   c.totalItem.summaryCells[10][0].value = totalOperacionKVC25.ramosArispe;
      // }

      if(c.totalItem.summaryCells[10][0]?.value != undefined){
        c.totalItem.summaryCells[10][0].value = totalOperacionKVC25.total;
      }

      if (c.cellElement) {
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "16px";
          c.cellElement.style.background = "#ff9460";
          c.cellElement.style.color = "black"; 
      }   
    });
  }
}
customizeKV2025(e) {  

  var gridCell = e.gridCell;
  if (gridCell.rowType === 'group') {
    
    e.backgroundColor = "#DCDCDC";
    e.fontWeight = "bolder"
    e.font = {bold: true}

}

if (gridCell.rowType === 'totalFooter') {
    
  e.backgroundColor = "#ff9460";
  e.fontWeight = "bolder"
  e.font = {bold: true}

}
}

customizeExportDataKV2025(cols, rows){

  rows.forEach((row: any) =>{  
    
    var rowValues =  row.values;  
    

    if(row.rowType == "group"){
      if(row.key[0] == '202501 ENE'){

        rowValues[3][0].value = totalKVCE25.cuautitlan;
        rowValues[4][0].value = totalKVCE25.tultitlan;
        rowValues[5][0].value = totalKVCE25.guadalajara;
        rowValues[6][0].value = totalKVCE25.hermosillo;
        rowValues[7][0].value = totalKVCE25.mexicali;
        rowValues[8][0].value = totalKVCE25.orizaba;
        // rowValues[9][0].value = totalKVCE.ramosArispe;
        rowValues[9][0].value = totalKVCE25.total;
      }
      if(row.key[0] == '202502 FEB'){

        rowValues[3][0].value = totalKVCF25.cuautitlan;
        rowValues[4][0].value = totalKVCF25.tultitlan;
        rowValues[5][0].value = totalKVCF25.guadalajara;
        rowValues[6][0].value = totalKVCF25.hermosillo;
        rowValues[7][0].value = totalKVCF25.mexicali;
        rowValues[8][0].value = totalKVCF25.orizaba;
        // rowValues[9][0].value = totalKVCF.ramosArispe;
        rowValues[9][0].value = totalKVCF25.total;
      }
      if(row.key[0] == '202503 MAR'){

        rowValues[3][0].value = totalKVCM25.cuautitlan;
        rowValues[4][0].value = totalKVCM25.tultitlan;
        rowValues[5][0].value = totalKVCM25.guadalajara;
        rowValues[6][0].value = totalKVCM25.hermosillo;
        rowValues[7][0].value = totalKVCM25.mexicali;
        rowValues[8][0].value = totalKVCM25.orizaba;
        // rowValues[9][0].value = totalKVCM.ramosArispe;
        rowValues[9][0].value = totalKVCM25.total;
      }
      if(row.key[0] == '202504 ABR'){

        rowValues[3][0].value = totalKVCA25.cuautitlan;
        rowValues[4][0].value = totalKVCA25.tultitlan;
        rowValues[5][0].value = totalKVCA25.guadalajara;
        rowValues[6][0].value = totalKVCA25.hermosillo;
        rowValues[7][0].value = totalKVCA25.mexicali;
        rowValues[8][0].value = totalKVCA25.orizaba;
        // rowValues[9][0].value = totalKVCA.ramosArispe;
        rowValues[9][0].value = totalKVCA25.total;
      }
      if(row.key[0] == '202505 MAY'){

        rowValues[3][0].value = totalKVCMY25.cuautitlan;
        rowValues[4][0].value = totalKVCMY25.tultitlan;
        rowValues[5][0].value = totalKVCMY25.guadalajara;
        rowValues[6][0].value = totalKVCMY25.hermosillo;
        rowValues[7][0].value = totalKVCMY25.mexicali;
        rowValues[8][0].value = totalKVCMY25.orizaba;
        // rowValues[9][0].value = totalKVCMY.ramosArispe;
        rowValues[9][0].value = totalKVCMY25.total;
      }
      if(row.key[0] == '202506 JUN'){

        rowValues[3][0].value = totalKVCJN25.cuautitlan;
        rowValues[4][0].value = totalKVCJN25.tultitlan;
        rowValues[5][0].value = totalKVCJN25.guadalajara;
        rowValues[6][0].value = totalKVCJN25.hermosillo;
        rowValues[7][0].value = totalKVCJN25.mexicali;
        rowValues[8][0].value = totalKVCJN25.orizaba;
        // rowValues[9][0].value = totalKVCJN25.ramosArispe;
        rowValues[9][0].value = totalKVCJN25.total;
      }
      if(row.key[0] == '202507 JUL'){

        rowValues[3][0].value = totalKVCJL25.cuautitlan;
        rowValues[4][0].value = totalKVCJL25.tultitlan;
        rowValues[5][0].value = totalKVCJL25.guadalajara;
        rowValues[6][0].value = totalKVCJL25.hermosillo;
        rowValues[7][0].value = totalKVCJL25.mexicali;
        rowValues[8][0].value = totalKVCJL25.orizaba;
        // rowValues[9][0].value = totalKVCJL25.ramosArispe;
        rowValues[9][0].value = totalKVCJL25.total;

      }
      if(row.key[0] == '202508 AGO'){

        rowValues[3][0].value = totalKVCAG25.cuautitlan;
        rowValues[4][0].value = totalKVCAG25.tultitlan;
        rowValues[5][0].value = totalKVCAG25.guadalajara;
        rowValues[6][0].value = totalKVCAG25.hermosillo;
        rowValues[7][0].value = totalKVCAG25.mexicali;
        rowValues[8][0].value = totalKVCAG25.orizaba;
        // rowValues[9][0].value = totalKVCAG25.ramosArispe;
        rowValues[9][0].value = totalKVCAG25.total;

      }
      if(row.key[0] == '202509 SEP'){

        rowValues[3][0].value = totalKVCS25.cuautitlan;
        rowValues[4][0].value = totalKVCS25.tultitlan;
        rowValues[5][0].value = totalKVCS25.guadalajara;
        rowValues[6][0].value = totalKVCS25.hermosillo;
        rowValues[7][0].value = totalKVCS25.mexicali;
        rowValues[8][0].value = totalKVCS25.orizaba;
        // rowValues[9][0].value = totalKVCS25.ramosArispe;
        rowValues[9][0].value = totalKVCS25.total;

      }
      if(row.key[0] == '202510 OCT'){

        rowValues[3][0].value = totalKVCOC25.cuautitlan;
        rowValues[4][0].value = totalKVCOC25.tultitlan;
        rowValues[5][0].value = totalKVCOC25.guadalajara;
        rowValues[6][0].value = totalKVCOC25.hermosillo;
        rowValues[7][0].value = totalKVCOC25.mexicali;
        rowValues[8][0].value = totalKVCOC25.orizaba;
        // rowValues[9][0].value = totalKVCOC25.ramosArispe;
        rowValues[9][0].value = totalKVCOC25.total;

      }

      if(row.key[0] == '202511 NOV'){

        rowValues[3][0].value = totalKVCNV25.cuautitlan;
        rowValues[4][0].value = totalKVCNV25.tultitlan;
        rowValues[5][0].value = totalKVCNV25.guadalajara;
        rowValues[6][0].value = totalKVCNV25.hermosillo;
        rowValues[7][0].value = totalKVCNV25.mexicali;
        rowValues[8][0].value = totalKVCNV25.orizaba;
        // rowValues[9][0].value = totalKVCNV25.ramosArispe;
        rowValues[9][0].value = totalKVCNV25.total;

      }
      if(row.key[0] == '202512 DIC'){

        rowValues[3][0].value = totalKVCDC25.cuautitlan;
        rowValues[4][0].value = totalKVCDC25.tultitlan;
        rowValues[5][0].value = totalKVCDC25.guadalajara;
        rowValues[6][0].value = totalKVCDC25.hermosillo;
        rowValues[7][0].value = totalKVCDC25.mexicali;
        rowValues[8][0].value = totalKVCDC25.orizaba;
        // rowValues[9][0].value = totalKVCDC25.ramosArispe;
        rowValues[9][0].value = totalKVCDC25.total;

      }
    }

    if(row.rowType == "totalFooter"){
      

      row.values[3].value = totalOperacionKVC25.cuautitlan;
      row.values[4].value = totalOperacionKVC25.tultitlan;
      row.values[5].value = totalOperacionKVC25.guadalajara;
      row.values[6].value = totalOperacionKVC25.hermosillo;
      row.values[7].value = totalOperacionKVC25.mexicali;
      row.values[8].value = totalOperacionKVC25.orizaba;
      // row.values[9].value = totalOperacionKVC25.ramosArispe;
      row.values[9].value = totalOperacionKVC25.total;


    }

  });

}
//==============================INGRESO VIAJES 2025=================================
onRowPreparedIV2025(e){
  if (e.rowType == 'group'){

    if(e.isExpanded == true){
      this.collapseGroup == true
    }


    if (e.data.key == '202501 ENE') {
      if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalIVCE25.cuautitlan;
      }
      if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalIVCE25.tultitlan;
      }
      if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalIVCE25.guadalajara;
      }
      if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalIVCE25.hermosillo;
      }
      if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalIVCE25.mexicali;
      }
      if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalIVCE25.orizaba;
      }
      // if(e.summaryCells[10].length !== 0){
      //   e.summaryCells[10][0].value = totalIVCE25.ramosArispe;
      // }
      if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalIVCE25.total;
      }

    }
    if (e.data.key == '202502 FEB') {
      if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalIVCF25.cuautitlan;
      }
      if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalIVCF25.tultitlan;
      }
      if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalIVCF25.guadalajara;
      }
      if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalIVCF25.hermosillo;
      }
      if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalIVCF25.mexicali;
      }
      if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalIVCF25.orizaba;
      }
      // if(e.summaryCells[10].length !== 0){
      //   e.summaryCells[10][0].value = totalIVCF25.ramosArispe;
      // }
      if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalIVCF25.total;
      }
    }
    if (e.data.key == '202503 MAR') {
      if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalIVCM25.cuautitlan;
      }
      if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalIVCM25.tultitlan;
      }
      if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalIVCM25.guadalajara;
      }
      if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalIVCM25.hermosillo;
      }
      if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalIVCM25.mexicali;
      }
      if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalIVCM25.orizaba;
      }
      // if(e.summaryCells[10].length !== 0){
      //   e.summaryCells[10][0].value = totalIVCM25.ramosArispe;
      // }
      if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalIVCM25.total;
      }
    }
    if (e.data.key == '202504 ABR') {
      if(e.summaryCells[4].length !== 0){
      e.summaryCells[4][0].value = totalIVCA25.cuautitlan;
      }
      if(e.summaryCells[5].length !== 0){
      e.summaryCells[5][0].value = totalIVCA25.tultitlan;
      }
      if(e.summaryCells[6].length !== 0){
      e.summaryCells[6][0].value = totalIVCA25.guadalajara;
      }
      if(e.summaryCells[7].length !== 0){
      e.summaryCells[7][0].value = totalIVCA25.hermosillo;
      }
      if(e.summaryCells[8].length !== 0){
      e.summaryCells[8][0].value = totalIVCA25.mexicali;
      }
      if(e.summaryCells[9].length !== 0){
      e.summaryCells[9][0].value = totalIVCA25.orizaba;
      }
      // if(e.summaryCells[10].length !== 0){
      // e.summaryCells[10][0].value = totalIVCA25.ramosArispe;
      // }
      if(e.summaryCells[10].length !== 0){
      e.summaryCells[10][0].value = totalIVCA25.total;
      }
    }
    if (e.data.key == '202505 MAY') {
      if(e.summaryCells[4].length !== 0){
      e.summaryCells[4][0].value = totalIVCMY25.cuautitlan;
      }
      if(e.summaryCells[5].length !== 0){
      e.summaryCells[5][0].value = totalIVCMY25.tultitlan;
      }
      if(e.summaryCells[6].length !== 0){
      e.summaryCells[6][0].value = totalIVCMY25.guadalajara;
      }
      if(e.summaryCells[7].length !== 0){
      e.summaryCells[7][0].value = totalIVCMY25.hermosillo;
      }
      if(e.summaryCells[8].length !== 0){
      e.summaryCells[8][0].value = totalIVCMY25.mexicali;
      }
      if(e.summaryCells[9].length !== 0){
      e.summaryCells[9][0].value = totalIVCMY25.orizaba;
      }
      // if(e.summaryCells[10].length !== 0){
      // e.summaryCells[10][0].value = totalIVCMY25.ramosArispe;
      // }
      if(e.summaryCells[10].length !== 0){
      e.summaryCells[10][0].value = totalIVCMY25.total;
      }
    }
    if (e.data.key == '202506 JUN') {
      if(e.summaryCells[4].length !== 0){
      e.summaryCells[4][0].value = totalIVCJN25.cuautitlan;
      }
      if(e.summaryCells[5].length !== 0){
      e.summaryCells[5][0].value = totalIVCJN25.tultitlan;
      }
      if(e.summaryCells[6].length !== 0){
      e.summaryCells[6][0].value = totalIVCJN25.guadalajara;
      }
      if(e.summaryCells[7].length !== 0){
      e.summaryCells[7][0].value = totalIVCJN25.hermosillo;
      }
      if(e.summaryCells[8].length !== 0){
      e.summaryCells[8][0].value = totalIVCJN25.mexicali;
      }
      if(e.summaryCells[9].length !== 0){
      e.summaryCells[9][0].value = totalIVCJN25.orizaba;
      }
      // if(e.summaryCells[10].length !== 0){
      // e.summaryCells[10][0].value = totalIVCJN25.ramosArispe;
      // }
      if(e.summaryCells[10].length !== 0){
      e.summaryCells[10][0].value = totalIVCJN25.total;
      }
    }
    if (e.data.key == '202507 JUL') {
      if(e.summaryCells[4].length !== 0){
      e.summaryCells[4][0].value = totalIVCJL25.cuautitlan;
      }
      if(e.summaryCells[5].length !== 0){
      e.summaryCells[5][0].value = totalIVCJL25.tultitlan;
      }
      if(e.summaryCells[6].length !== 0){
      e.summaryCells[6][0].value = totalIVCJL25.guadalajara;
      }
      if(e.summaryCells[7].length !== 0){
      e.summaryCells[7][0].value = totalIVCJL25.hermosillo;
      }
      if(e.summaryCells[8].length !== 0){
      e.summaryCells[8][0].value = totalIVCJL25.mexicali;
      }
      if(e.summaryCells[9].length !== 0){
      e.summaryCells[9][0].value = totalIVCJL25.orizaba;
      }
      // if(e.summaryCells[10].length !== 0){
      // e.summaryCells[10][0].value = totalIVCJL25.ramosArispe;
      // }
      if(e.summaryCells[10].length !== 0){
      e.summaryCells[10][0].value = totalIVCJL25.total;
      }
    }
    if (e.data.key == '202508 AGO') {
        if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalIVCAG25.cuautitlan;
        }
        if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalIVCAG25.tultitlan;
        }          
        if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalIVCAG25.guadalajara;  
        }        
        if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalIVCAG25.hermosillo;
        }
        if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalIVCAG25.mexicali;
        }
        if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalIVCAG25.orizaba;
        }          
        // if(e.summaryCells[10].length !== 0){
        // e.summaryCells[10][0].value = totalIVCAG25.ramosArispe;     
        // }     
        if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalIVCAG25.total;   
        }       
      
    }
    if (e.data.key == '202509 SEP') {
      if(e.summaryCells[4][0].length !== 0){
        if(Number.isNaN(totalIVCS25.cuautitlan)){
          e.summaryCells[4][0].value = 0;
        }else{
          e.summaryCells[4][0].value = totalIVCS25.cuautitlan;
        }
      }
      if(e.summaryCells[5][0].length !== 0){
        if(Number.isNaN(totalIVCS25.tultitlan)){
          e.summaryCells[5][0].value = 0;  
        }else{
          e.summaryCells[5][0].value = totalIVCS25.tultitlan;
        }
      }
      if(e.summaryCells[6][0].length !== 0){
        if(Number.isNaN(totalIVCS25.guadalajara)){
          e.summaryCells[6][0].value = 0;
        }else{
          e.summaryCells[6][0].value = totalIVCS25.guadalajara;
        }
      }
      if(e.summaryCells[7][0].length !== 0){
        if(Number.isNaN(totalIVCS25.hermosillo)){
          e.summaryCells[7][0].value = 0;
        }else{
          e.summaryCells[7][0].value = totalIVCS25.hermosillo;
        }
      }
      if(e.summaryCells[8][0].length !== 0){
        if(Number.isNaN(totalIVCS25.mexicali)){
          e.summaryCells[8][0].value = 0;  
        }else{
          e.summaryCells[8][0].value = totalIVCS25.mexicali;
        }
      }
      if(e.summaryCells[9][0].length !== 0){
        if(Number.isNaN(totalIVCS25.orizaba)){
          e.summaryCells[9][0].value = 0;
        }else{
          e.summaryCells[9][0].value = totalIVCS25.orizaba;
        }
      }
      // if(e.summaryCells[10][0].length !== 0){
      //   if(Number.isNaN(totalIVCS25.ramosArispe)){
      //     e.summaryCells[10][0].value = 0;
      //   }else{
      //     e.summaryCells[10][0].value = totalIVCS25.ramosArispe;
      //   }
      // }
      if(e.summaryCells[10][0].length !== 0){
        if(Number.isNaN(totalIVCS25.total)){
          e.summaryCells[10][0].value = 0;  
        }else{
          e.summaryCells[10][0].value = totalIVCS25.total;
        }
      }
    }
    if (e.data.key == '202510 OCT') {
      if(e.summaryCells[4][0].length !== 0){
        if(Number.isNaN(totalIVCOC25.cuautitlan)){
          e.summaryCells[4][0].value = 0;
        }else{
          e.summaryCells[4][0].value = totalIVCOC25.cuautitlan;
        }
      }
      if(e.summaryCells[5][0].length !== 0){
        if(Number.isNaN(totalIVCOC25.tultitlan)){
          e.summaryCells[5][0].value = 0;
        }else{
          e.summaryCells[5][0].value = totalIVCOC25.tultitlan;
        }
      }
      if(e.summaryCells[6][0].length !== 0){
        if(Number.isNaN(totalIVCOC25.guadalajara)){
          e.summaryCells[6][0].value = 0;
        }else{
          e.summaryCells[6][0].value = totalIVCOC25.guadalajara;
        }
      }
      if(e.summaryCells[7][0].length !== 0){
        if(Number.isNaN(totalIVCOC25.hermosillo)){
          e.summaryCells[7][0].value = 0;
        } else{
          e.summaryCells[7][0].value = totalIVCOC25.hermosillo;
        }
      }
      if(e.summaryCells[8][0].length !== 0){
        if(Number.isNaN(totalIVCOC25.mexicali)){
          e.summaryCells[8][0].value = 0;
        }else{
          e.summaryCells[8][0].value = totalIVCOC25.mexicali;
        }
      }
      if(e.summaryCells[9][0].length !== 0){
        if(Number.isNaN(totalIVCOC25.orizaba)){
          e.summaryCells[9][0].value = 0;
        }else{
          e.summaryCells[9][0].value = totalIVCOC25.orizaba;
        }
      }
      // if(e.summaryCells[10][0].length !== 0){
      //   if(Number.isNaN(totalIVCOC25.ramosArispe)){
      //     e.summaryCells[10][0].value = 0;
      //   }else{
      //     e.summaryCells[10][0].value = totalIVCOC25.ramosArispe;
      //   }
      // }
      if(e.summaryCells[10][0].length !== 0){
        if(Number.isNaN(totalIVCOC25.total)){
          e.summaryCells[10][0].value = 0;
        }else{
          e.summaryCells[10][0].value = totalIVCOC25.total;
        }
      }
    }
    if (e.data.key == '202511 NOV') {
      if(e.summaryCells[4][0].length !== 0){
        if(Number.isNaN(totalIVCNV25.cuautitlan)){
          e.summaryCells[4][0].value = 0;
        }else{
          e.summaryCells[4][0].value = totalIVCNV25.cuautitlan;
        }
      }
      if(e.summaryCells[5][0].length !== 0){
        if(Number.isNaN(totalIVCNV25.tultitlan)){
          e.summaryCells[5][0].value = 0;
        }else{
          e.summaryCells[5][0].value = totalIVCNV25.tultitlan;
        }
      }
      if(e.summaryCells[6][0].length !== 0){
        if(Number.isNaN(totalIVCNV25.guadalajara)){
          e.summaryCells[6][0].value = 0;
        }else{
          e.summaryCells[6][0].value = totalIVCNV25.guadalajara;
        }
      }
      if(e.summaryCells[7][0].length !== 0){
        if(Number.isNaN(totalIVCNV25.hermosillo)){
          e.summaryCells[7][0].value = 0;
        } else{
          e.summaryCells[7][0].value = totalIVCNV25.hermosillo;
        }
      }
      if(e.summaryCells[8][0].length !== 0){
        if(Number.isNaN(totalIVCNV25.mexicali)){
          e.summaryCells[8][0].value = 0;
        }else{
          e.summaryCells[8][0].value = totalIVCNV25.mexicali;
        }
      }
      if(e.summaryCells[9][0].length !== 0){
        if(Number.isNaN(totalIVCNV25.orizaba)){
          e.summaryCells[9][0].value = 0;
        }else{
          e.summaryCells[9][0].value = totalIVCNV25.orizaba;
        }
      }
      // if(e.summaryCells[10][0].length !== 0){
      //   if(Number.isNaN(totalIVCNV25.ramosArispe)){
      //     e.summaryCells[10][0].value = 0;
      //   }else{
      //     e.summaryCells[10][0].value = totalIVCNV25.ramosArispe;
      //   }
      // }
      if(e.summaryCells[10][0].length !== 0){
        if(Number.isNaN(totalIVCNV25.total)){
          e.summaryCells[10][0].value = 0;
        }else{
          e.summaryCells[10][0].value = totalIVCNV25.total;
        }
      }
    }
    if (e.data.key == '202512 DIC') {
      if(e.summaryCells[4][0].length !== 0){
        if(Number.isNaN(totalIVCDC25.cuautitlan)){
          e.summaryCells[4][0].value = 0;
        }else{
          e.summaryCells[4][0].value = totalIVCDC25.cuautitlan;
        }
      }
    if(e.summaryCells[5][0].length !== 0){
      if(Number.isNaN(totalIVCDC25.tultitlan)){
        e.summaryCells[5][0].value = 0;
      }else{
        e.summaryCells[5][0].value = totalIVCDC25.tultitlan;
      }
    }
    if(e.summaryCells[6][0].length !== 0){
      if(Number.isNaN(totalIVCDC25.guadalajara)){
        e.summaryCells[6][0].value = 0;
      }else{
        e.summaryCells[6][0].value = totalIVCDC25.guadalajara;
      }
    }
    if(e.summaryCells[7][0].length !== 0){
      if(Number.isNaN(totalIVCDC25.hermosillo)){
        e.summaryCells[7][0].value = 0;
      }else{
        e.summaryCells[7][0].value = totalIVCDC25.hermosillo;
      }
    }
    if(e.summaryCells[8][0].length !== 0){
      if(Number.isNaN(totalIVCDC25.mexicali)){
        e.summaryCells[8][0].value = 0;
      }else{
        e.summaryCells[8][0].value = totalIVCDC25.mexicali;
      }
    }
    if(e.summaryCells[9][0].length !== 0){
      if(Number.isNaN(totalIVCDC25.orizaba)){
        e.summaryCells[9][0].value = 0;
      }else{
        e.summaryCells[9][0].value = totalIVCDC25.orizaba;
      }
    }
    // if(e.summaryCells[10][0].length !== 0){
    //   if(Number.isNaN(totalIVCDC25.ramosArispe)){
    //     e.summaryCells[10][0].value = 0;
    //   }else{
    //     e.summaryCells[10][0].value = totalIVCDC25.ramosArispe;
    //   }
    // }
    if(e.summaryCells[10][0].length !== 0){
      if(Number.isNaN(totalIVCDC25.total)){
        e.summaryCells[10][0].value = 0;
      }else{
        e.summaryCells[10][0].value = totalIVCDC25.total;
    }
  }



    }    
  
  }

  this.paginacion = 60;
  if(this.paginacion = 60){
    this.expandGroup = false
  }
}

onCellPreparedIV2025(e){
  if (e.rowType == 'group'){

    e.cellElement.style.fontSize = '12px';
    e.cellElement.style.background = "#DCDCDC";

  }

  if (e.rowType == 'totalFooter') {

    e.totalItem.cells.forEach((c: any) => {
      if(c.totalItem.summaryCells[4][0]?.value != undefined){
        c.totalItem.summaryCells[4][0].value = totalOperacionIVC25.cuautitlan;
      }

      if(c.totalItem.summaryCells[5][0]?.value != undefined){
        c.totalItem.summaryCells[5][0].value = totalOperacionIVC25.tultitlan;
      }

      if(c.totalItem.summaryCells[6][0]?.value != undefined){
        c.totalItem.summaryCells[6][0].value = totalOperacionIVC25.guadalajara;
      }

      if(c.totalItem.summaryCells[7][0]?.value != undefined){
        c.totalItem.summaryCells[7][0].value = totalOperacionIVC25.hermosillo;          
      }

      if(c.totalItem.summaryCells[8][0]?.value != undefined){
        c.totalItem.summaryCells[8][0].value = totalOperacionIVC25.mexicali;
      }

      if(c.totalItem.summaryCells[9][0]?.value != undefined){
        c.totalItem.summaryCells[9][0].value = totalOperacionIVC25.orizaba;
      }
      // if(c.totalItem.summaryCells[10][0]?.value != undefined){
      //   c.totalItem.summaryCells[10][0].value = totalOperacionIVC25.ramosArispe;
      // }

      if(c.totalItem.summaryCells[10][0]?.value != undefined){
        c.totalItem.summaryCells[10][0].value = totalOperacionIVC25.total;
      }

      if (c.cellElement) {
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "16px";
          c.cellElement.style.background = "#ff9460";
          c.cellElement.style.color = "black"; 
      }   
    });
  }

}

customizeIV2025(e){
  var gridCell = e.gridCell;
  if (gridCell.rowType === 'group') {
    
    e.backgroundColor = "#DCDCDC";
    e.fontWeight = "bolder"
    e.font = {bold: true}

  }

  if (gridCell.rowType === 'totalFooter') {

    e.backgroundColor = "#ff9460";
    e.fontWeight = "bolder"
    e.font = {bold: true}

  }
}

customizeExportDataIV2025(cols, rows){

  rows.forEach((row: any) =>{  
  var rowValues =  row.values;  

  if(row.rowType == "group"){
    if(row.key[0] == '202501 ENE'){

      rowValues[3][0].value = totalIVCE25.cuautitlan;
      rowValues[4][0].value = totalIVCE25.tultitlan;
      rowValues[5][0].value = totalIVCE25.guadalajara;
      rowValues[6][0].value = totalIVCE25.hermosillo;
      rowValues[7][0].value = totalIVCE25.mexicali;
      rowValues[8][0].value = totalIVCE25.orizaba;
      // rowValues[9][0].value = totalIVCE.ramosArispe;
      rowValues[9][0].value = totalIVCE25.total;
    }
    if(row.key[0] == '202502 FEB'){

      rowValues[3][0].value = totalIVCF25.cuautitlan;
      rowValues[4][0].value = totalIVCF25.tultitlan;
      rowValues[5][0].value = totalIVCF25.guadalajara;
      rowValues[6][0].value = totalIVCF25.hermosillo;
      rowValues[7][0].value = totalIVCF25.mexicali;
      rowValues[8][0].value = totalIVCF25.orizaba;
      // rowValues[9][0].value = totalIVCF.ramosArispe;
      rowValues[9][0].value = totalIVCF25.total;
    }
    if(row.key[0] == '202503 MAR'){

      rowValues[3][0].value = totalIVCM25.cuautitlan;
      rowValues[4][0].value = totalIVCM25.tultitlan;
      rowValues[5][0].value = totalIVCM25.guadalajara;
      rowValues[6][0].value = totalIVCM25.hermosillo;
      rowValues[7][0].value = totalIVCM25.mexicali;
      rowValues[8][0].value = totalIVCM25.orizaba;
      // rowValues[9][0].value = totalIVCM.ramosArispe;
      rowValues[9][0].value = totalIVCM25.total;
    }
    if(row.key[0] == '202504 ABR'){

      rowValues[3][0].value = totalIVCA25.cuautitlan;
      rowValues[4][0].value = totalIVCA25.tultitlan;
      rowValues[5][0].value = totalIVCA25.guadalajara;
      rowValues[6][0].value = totalIVCA25.hermosillo;
      rowValues[7][0].value = totalIVCA25.mexicali;
      rowValues[8][0].value = totalIVCA25.orizaba;
      // rowValues[9][0].value = totalIVCA.ramosArispe;
      rowValues[9][0].value = totalIVCA25.total;
    }
    if(row.key[0] == '202505 MAY'){

      rowValues[3][0].value = totalIVCMY25.cuautitlan;
      rowValues[4][0].value = totalIVCMY25.tultitlan;
      rowValues[5][0].value = totalIVCMY25.guadalajara;
      rowValues[6][0].value = totalIVCMY25.hermosillo;
      rowValues[7][0].value = totalIVCMY25.mexicali;
      rowValues[8][0].value = totalIVCMY25.orizaba;
      // rowValues[9][0].value = totalIVCMY.ramosArispe;
      rowValues[9][0].value = totalIVCMY25.total;
    }
    if(row.key[0] == '202506 JUN'){

      rowValues[3][0].value = totalIVCJN25.cuautitlan;
      rowValues[4][0].value = totalIVCJN25.tultitlan;
      rowValues[5][0].value = totalIVCJN25.guadalajara;
      rowValues[6][0].value = totalIVCJN25.hermosillo;
      rowValues[7][0].value = totalIVCJN25.mexicali;
      rowValues[8][0].value = totalIVCJN25.orizaba;
      // rowValues[9][0].value = totalIVCJN25.ramosArispe;
      rowValues[9][0].value = totalIVCJN25.total;
    }
    if(row.key[0] == '202507 JUL'){

      rowValues[3][0].value = totalIVCJL25.cuautitlan;
      rowValues[4][0].value = totalIVCJL25.tultitlan;
      rowValues[5][0].value = totalIVCJL25.guadalajara;
      rowValues[6][0].value = totalIVCJL25.hermosillo;
      rowValues[7][0].value = totalIVCJL25.mexicali;
      rowValues[8][0].value = totalIVCJL25.orizaba;
      // rowValues[9][0].value = totalIVCJL25.ramosArispe;
      rowValues[9][0].value = totalIVCJL25.total;

    }
    if(row.key[0] == '202508 AGO'){

      rowValues[3][0].value = totalIVCAG25.cuautitlan;
      rowValues[4][0].value = totalIVCAG25.tultitlan;
      rowValues[5][0].value = totalIVCAG25.guadalajara;
      rowValues[6][0].value = totalIVCAG25.hermosillo;
      rowValues[7][0].value = totalIVCAG25.mexicali;
      rowValues[8][0].value = totalIVCAG25.orizaba;
      // rowValues[9][0].value = totalIVCAG25.ramosArispe;
      rowValues[9][0].value = totalIVCAG25.total;
    }
    if(row.key[0] == '202509 SEP'){

      rowValues[3][0].value = totalIVCS25.cuautitlan;
      rowValues[4][0].value = totalIVCS25.tultitlan;
      rowValues[5][0].value = totalIVCS25.guadalajara;
      rowValues[6][0].value = totalIVCS25.hermosillo;
      rowValues[7][0].value = totalIVCS25.mexicali;
      rowValues[8][0].value = totalIVCS25.orizaba;
      // rowValues[9][0].value = totalIVCS25.ramosArispe;
      rowValues[9][0].value = totalIVCS25.total;
    }
    if(row.key[0] == '202510 OCT'){

      rowValues[3][0].value = totalIVCOC25.cuautitlan;
      rowValues[4][0].value = totalIVCOC25.tultitlan;
      rowValues[5][0].value = totalIVCOC25.guadalajara;
      rowValues[6][0].value = totalIVCOC25.hermosillo;
      rowValues[7][0].value = totalIVCOC25.mexicali;
      rowValues[8][0].value = totalIVCOC25.orizaba;
      // rowValues[9][0].value = totalIVCOC25.ramosArispe;
      rowValues[9][0].value = totalIVCOC25.total;
    }
    if(row.key[0] == '202511 NOV'){

      rowValues[3][0].value = totalIVCNV25.cuautitlan;
      rowValues[4][0].value = totalIVCNV25.tultitlan;
      rowValues[5][0].value = totalIVCNV25.guadalajara;
      rowValues[6][0].value = totalIVCNV25.hermosillo;
      rowValues[7][0].value = totalIVCNV25.mexicali;
      rowValues[8][0].value = totalIVCNV25.orizaba;
      // rowValues[9][0].value = totalIVCNV25.ramosArispe;
      rowValues[9][0].value = totalIVCNV25.total;
    }

    if(row.key[0] == '202512 DIC'){

      rowValues[3][0].value = totalIVCDC25.cuautitlan;
      rowValues[4][0].value = totalIVCDC25.tultitlan;
      rowValues[5][0].value = totalIVCDC25.guadalajara;
      rowValues[6][0].value = totalIVCDC25.hermosillo;
      rowValues[7][0].value = totalIVCDC25.mexicali;
      rowValues[8][0].value = totalIVCDC25.orizaba;
      // rowValues[9][0].value = totalIVCDC25.ramosArispe;
      rowValues[9][0].value = totalIVCDC25.total;
    }
  }

  if(row.rowType == "totalFooter"){
    row.values[3].value = totalOperacionIVC.cuautitlan;
    row.values[4].value = totalOperacionIVC.tultitlan;
    row.values[5].value = totalOperacionIVC.guadalajara;
    row.values[6].value = totalOperacionIVC.hermosillo;
    row.values[7].value = totalOperacionIVC.mexicali;
    row.values[8].value = totalOperacionIVC.orizaba;
    // row.values[9].value = totalOperacionIVC.ramosArispe;
    row.values[9].value = totalOperacionIVC.total;
  }

});

}

//==============================INGRESO OPERADOR 2025===================================
onRowPreparedIO2025(e){
  if (e.rowType == 'data') {

    e.cells.forEach((c: any) => {
      if (c.cellElement) {
        if(c.columnIndex == 4){
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "15px";
          c.cellElement.style.background = "#cdcbcb";
        }
        }
    })
  
  }
}

onCellPreparedIO2025(e){
  if (e.rowType == 'groupFooter'){

    e.cellElement.style.fontSize = '12px';
    e.cellElement.style.background = "#DCDCDC";
  }
  

  if (e.rowType == 'totalFooter') {
  
    e.totalItem.cells.forEach((c: any) => {

      if (c.cellElement) {
        c.cellElement.style.fontWeight = "bolder";
        c.cellElement.style.fontSize = "16px";
        c.cellElement.style.background = "#ff9460";
        c.cellElement.style.color = "black"; 
    }  
    })
  }
}  


//==================================================================================//  
//==============================INGRESOS 2026=======================================//
//==================================================================================//
onRowPreparedITL2026(event){
    
  if (event.rowType == 'group'){
    if(event.data.key == '202601 ENE'){
      agrupamientoITLE26.cuatitlanIngr = event.summaryCells[4][0].value;
      agrupamientoITLE26.cuatitlanPres = event.summaryCells[5][0].value;
      agrupamientoITLE26.cuatitlanIngrAc = event.summaryCells[7][0].value;
      agrupamientoITLE26.cuatitlanPresAc = event.summaryCells[8][0].value;
      agrupamientoITLE26.cuatitlanIngrAnt = event.summaryCells[10][0].value;
      agrupamientoITLE26.tultitlanIngr = event.summaryCells[12][0].value;
      agrupamientoITLE26.tultitlanPres = event.summaryCells[13][0].value;
      agrupamientoITLE26.tultitlanIngrAc = event.summaryCells[15][0].value;
      agrupamientoITLE26.tultitlanPresAc = event.summaryCells[16][0].value;
      agrupamientoITLE26.tultitlanIngrAnt = event.summaryCells[18][0].value;
      agrupamientoITLE26.guadalajaraIngr = event.summaryCells[20][0].value;
      agrupamientoITLE26.guadalajaraPres = event.summaryCells[21][0].value;
      agrupamientoITLE26.guadalajaraIngrAc = event.summaryCells[23][0].value;
      agrupamientoITLE26.guadalajaraPresAc = event.summaryCells[24][0].value;
      agrupamientoITLE26.guadalajaraIngrAnt = event.summaryCells[26][0].value;
      agrupamientoITLE26.hermosilloIngr = event.summaryCells[28][0].value;
      agrupamientoITLE26.hermosilloPres = event.summaryCells[29][0].value;
      agrupamientoITLE26.hermosilloIngrAc = event.summaryCells[31][0].value;
      agrupamientoITLE26.hermosilloPresAc = event.summaryCells[32][0].value;
      agrupamientoITLE26.hermosilloIngrAnt = event.summaryCells[34][0].value;
      agrupamientoITLE26.mexicaliIngr = event.summaryCells[36][0].value;
      agrupamientoITLE26.mexicaliPres = event.summaryCells[37][0].value;
      agrupamientoITLE26.mexicaliIngrAc = event.summaryCells[39][0].value;
      agrupamientoITLE26.mexicaliPresAc = event.summaryCells[40][0].value;
      agrupamientoITLE26.mexicaliIngrAnt = event.summaryCells[42][0].value;
      agrupamientoITLE26.orizabaIngr = event.summaryCells[44][0].value;
      agrupamientoITLE26.orizabaPres = event.summaryCells[45][0].value;
      agrupamientoITLE26.orizabaIngrAc = event.summaryCells[47][0].value;
      agrupamientoITLE26.orizabaPresAc = event.summaryCells[48][0].value;
      agrupamientoITLE26.orizabaIngrAnt = event.summaryCells[50][0].value;

      totalAgrupamientoITLE26.cuatitlanPresPor = agrupamientoITLE26.cuatitlanIngr / agrupamientoITLE26.cuatitlanPres;
      totalAgrupamientoITLE26.cuatitlanPresAcPor = agrupamientoITLE26.cuatitlanIngrAc / agrupamientoITLE26.cuatitlanPresAc;
      totalAgrupamientoITLE26.cuatitlanIngrAntPor = agrupamientoITLE26.cuatitlanIngr / agrupamientoITLE26.cuatitlanIngrAnt;
      totalAgrupamientoITLE26.tultitlanPresPor = agrupamientoITLE26.tultitlanIngr / agrupamientoITLE26.tultitlanPres;
      totalAgrupamientoITLE26.tultitlanPresAcPor = agrupamientoITLE26.tultitlanIngrAc / agrupamientoITLE26.tultitlanPresAc;
      totalAgrupamientoITLE26.tultitlanIngrAntPor = agrupamientoITLE26.tultitlanIngr / agrupamientoITLE26.tultitlanIngrAnt;
      totalAgrupamientoITLE26.guadalajaraPresPor = agrupamientoITLE26.guadalajaraIngr / agrupamientoITLE26.guadalajaraPres;
      totalAgrupamientoITLE26.guadalajaraPresAcPor = agrupamientoITLE26.guadalajaraIngrAc / agrupamientoITLE26.guadalajaraPresAc;
      totalAgrupamientoITLE26.guadalajaraIngrAntPor = agrupamientoITLE26.guadalajaraIngr / agrupamientoITLE26.guadalajaraIngrAnt;
      totalAgrupamientoITLE26.hermosilloPresPor = agrupamientoITLE26.hermosilloIngr / agrupamientoITLE26.hermosilloPres;
      totalAgrupamientoITLE26.hermosilloPresAcPor = agrupamientoITLE26.hermosilloIngrAc / agrupamientoITLE26.hermosilloPresAc;
      totalAgrupamientoITLE26.hermosilloIngrAntPor = agrupamientoITLE26.hermosilloIngr / agrupamientoITLE26.hermosilloIngrAnt;
      totalAgrupamientoITLE26.mexicaliPresPor = agrupamientoITLE26.mexicaliIngr / agrupamientoITLE26.mexicaliPres;
      totalAgrupamientoITLE26.mexicaliPresAcPor = agrupamientoITLE26.mexicaliIngrAc / agrupamientoITLE26.mexicaliPresAc;
      totalAgrupamientoITLE26.mexicaliIngrAntPor = agrupamientoITLE26.mexicaliIngr / agrupamientoITLE26.mexicaliIngrAnt;
      totalAgrupamientoITLE26.orizabaPresPor = agrupamientoITLE26.orizabaIngr / agrupamientoITLE26.orizabaPres;
      totalAgrupamientoITLE26.orizabaPresAcPor = agrupamientoITLE26.orizabaIngrAc / agrupamientoITLE26.orizabaPresAc;
      totalAgrupamientoITLE26.orizabaIngrAntPor = agrupamientoITLE26.orizabaIngr / agrupamientoITLE26.orizabaIngrAnt;

      event.summaryCells[6][0].value = totalAgrupamientoITLE26.cuatitlanPresPor;
      event.summaryCells[9][0].value = totalAgrupamientoITLE26.cuatitlanPresAcPor;
      event.summaryCells[11][0].value = totalAgrupamientoITLE26.cuatitlanIngrAntPor;
      event.summaryCells[14][0].value = totalAgrupamientoITLE26.tultitlanPresPor;
      event.summaryCells[17][0].value = totalAgrupamientoITLE26.tultitlanPresAcPor;
      event.summaryCells[19][0].value = totalAgrupamientoITLE26.tultitlanIngrAntPor;
      event.summaryCells[22][0].value = totalAgrupamientoITLE26.guadalajaraPresPor;
      event.summaryCells[25][0].value = totalAgrupamientoITLE26.guadalajaraPresAcPor;
      event.summaryCells[27][0].value = totalAgrupamientoITLE26.guadalajaraIngrAntPor;
      event.summaryCells[30][0].value = totalAgrupamientoITLE26.hermosilloPresPor;
      event.summaryCells[33][0].value = totalAgrupamientoITLE26.hermosilloPresAcPor;
      event.summaryCells[35][0].value = totalAgrupamientoITLE26.hermosilloIngrAntPor;
      event.summaryCells[38][0].value = totalAgrupamientoITLE26.mexicaliPresPor;
      event.summaryCells[41][0].value = totalAgrupamientoITLE26.mexicaliPresAcPor;
      event.summaryCells[43][0].value = totalAgrupamientoITLE26.mexicaliIngrAntPor;
      event.summaryCells[46][0].value = totalAgrupamientoITLE26.orizabaPresPor;
      event.summaryCells[49][0].value = totalAgrupamientoITLE26.orizabaPresAcPor;
      event.summaryCells[51][0].value = totalAgrupamientoITLE26.orizabaIngrAntPor;
     }
    if(event.data.key == '202602 FEB'){
      agrupamientoITLF26.cuatitlanIngr = event.summaryCells[4][0].value;
      agrupamientoITLF26.cuatitlanPres = event.summaryCells[5][0].value;
      agrupamientoITLF26.cuatitlanIngrAc = event.summaryCells[7][0].value;
      agrupamientoITLF26.cuatitlanPresAc = event.summaryCells[8][0].value;
      agrupamientoITLF26.cuatitlanIngrAnt = event.summaryCells[10][0].value;
      agrupamientoITLF26.tultitlanIngr = event.summaryCells[12][0].value;
      agrupamientoITLF26.tultitlanPres = event.summaryCells[13][0].value;
      agrupamientoITLF26.tultitlanIngrAc = event.summaryCells[15][0].value;
      agrupamientoITLF26.tultitlanPresAc = event.summaryCells[16][0].value;
      agrupamientoITLF26.tultitlanIngrAnt = event.summaryCells[18][0].value;
      agrupamientoITLF26.guadalajaraIngr = event.summaryCells[20][0].value;
      agrupamientoITLF26.guadalajaraPres = event.summaryCells[21][0].value;
      agrupamientoITLF26.guadalajaraIngrAc = event.summaryCells[23][0].value;
      agrupamientoITLF26.guadalajaraPresAc = event.summaryCells[24][0].value;
      agrupamientoITLF26.guadalajaraIngrAnt = event.summaryCells[26][0].value;
      agrupamientoITLF26.hermosilloIngr = event.summaryCells[28][0].value;
      agrupamientoITLF26.hermosilloPres = event.summaryCells[29][0].value;
      agrupamientoITLF26.hermosilloIngrAc = event.summaryCells[31][0].value;
      agrupamientoITLF26.hermosilloPresAc = event.summaryCells[32][0].value;
      agrupamientoITLF26.hermosilloIngrAnt = event.summaryCells[34][0].value;
      agrupamientoITLF26.mexicaliIngr = event.summaryCells[36][0].value;
      agrupamientoITLF26.mexicaliPres = event.summaryCells[37][0].value;
      agrupamientoITLF26.mexicaliIngrAc = event.summaryCells[39][0].value;
      agrupamientoITLF26.mexicaliPresAc = event.summaryCells[40][0].value;
      agrupamientoITLF26.mexicaliIngrAnt = event.summaryCells[42][0].value;
      agrupamientoITLF26.orizabaIngr = event.summaryCells[44][0].value;
      agrupamientoITLF26.orizabaPres = event.summaryCells[45][0].value;
      agrupamientoITLF26.orizabaIngrAc = event.summaryCells[47][0].value;
      agrupamientoITLF26.orizabaPresAc = event.summaryCells[48][0].value;
      agrupamientoITLF26.orizabaIngrAnt = event.summaryCells[50][0].value;

      totalAgrupamientoITLF26.cuatitlanPresPor = agrupamientoITLF26.cuatitlanIngr / agrupamientoITLF26.cuatitlanPres;
      totalAgrupamientoITLF26.cuatitlanPresAcPor = agrupamientoITLF26.cuatitlanIngrAc / agrupamientoITLF26.cuatitlanPresAc;
      totalAgrupamientoITLF26.cuatitlanIngrAntPor = agrupamientoITLF26.cuatitlanIngr / agrupamientoITLF26.cuatitlanIngrAnt;
      totalAgrupamientoITLF26.tultitlanPresPor = agrupamientoITLF26.tultitlanIngr / agrupamientoITLF26.tultitlanPres;
      totalAgrupamientoITLF26.tultitlanPresAcPor = agrupamientoITLF26.tultitlanIngrAc / agrupamientoITLF26.tultitlanPresAc;
      totalAgrupamientoITLF26.tultitlanIngrAntPor = agrupamientoITLF26.tultitlanIngr / agrupamientoITLF26.tultitlanIngrAnt;
      totalAgrupamientoITLF26.guadalajaraPresPor = agrupamientoITLF26.guadalajaraIngr / agrupamientoITLF26.guadalajaraPres;
      totalAgrupamientoITLF26.guadalajaraPresAcPor = agrupamientoITLF26.guadalajaraIngrAc / agrupamientoITLF26.guadalajaraPresAc;
      totalAgrupamientoITLF26.guadalajaraIngrAntPor = agrupamientoITLF26.guadalajaraIngr / agrupamientoITLF26.guadalajaraIngrAnt;
      totalAgrupamientoITLF26.hermosilloPresPor = agrupamientoITLF26.hermosilloIngr / agrupamientoITLF26.hermosilloPres;
      totalAgrupamientoITLF26.hermosilloPresAcPor = agrupamientoITLF26.hermosilloIngrAc / agrupamientoITLF26.hermosilloPresAc;
      totalAgrupamientoITLF26.hermosilloIngrAntPor = agrupamientoITLF26.hermosilloIngr / agrupamientoITLF26.hermosilloIngrAnt;
      totalAgrupamientoITLF26.mexicaliPresPor = agrupamientoITLF26.mexicaliIngr / agrupamientoITLF26.mexicaliPres;
      totalAgrupamientoITLF26.mexicaliPresAcPor = agrupamientoITLF26.mexicaliIngrAc / agrupamientoITLF26.mexicaliPresAc;
      totalAgrupamientoITLF26.mexicaliIngrAntPor = agrupamientoITLF26.mexicaliIngr / agrupamientoITLF26.mexicaliIngrAnt;
      totalAgrupamientoITLF26.orizabaPresPor = agrupamientoITLF26.orizabaIngr / agrupamientoITLF26.orizabaPres;
      totalAgrupamientoITLF26.orizabaPresAcPor = agrupamientoITLF26.orizabaIngrAc / agrupamientoITLF26.orizabaPresAc;
      totalAgrupamientoITLF26.orizabaIngrAntPor = agrupamientoITLF26.orizabaIngr / agrupamientoITLF26.orizabaIngrAnt;
    
      event.summaryCells[6][0].value = totalAgrupamientoITLF26.cuatitlanPresPor;
      event.summaryCells[9][0].value = totalAgrupamientoITLF26.cuatitlanPresAcPor;
      event.summaryCells[11][0].value = totalAgrupamientoITLF26.cuatitlanIngrAntPor;
      event.summaryCells[14][0].value = totalAgrupamientoITLF26.tultitlanPresPor;
      event.summaryCells[17][0].value = totalAgrupamientoITLF26.tultitlanPresAcPor;
      event.summaryCells[19][0].value = totalAgrupamientoITLF26.tultitlanIngrAntPor;
      event.summaryCells[22][0].value = totalAgrupamientoITLF26.guadalajaraPresPor;
      event.summaryCells[25][0].value = totalAgrupamientoITLF26.guadalajaraPresAcPor;
      event.summaryCells[27][0].value = totalAgrupamientoITLF26.guadalajaraIngrAntPor;
      event.summaryCells[30][0].value = totalAgrupamientoITLF26.hermosilloPresPor;
      event.summaryCells[33][0].value = totalAgrupamientoITLF26.hermosilloPresAcPor;
      event.summaryCells[35][0].value = totalAgrupamientoITLF26.hermosilloIngrAntPor;
      event.summaryCells[38][0].value = totalAgrupamientoITLF26.mexicaliPresPor;
      event.summaryCells[41][0].value = totalAgrupamientoITLF26.mexicaliPresAcPor;
      event.summaryCells[43][0].value = totalAgrupamientoITLF26.mexicaliIngrAntPor;
      event.summaryCells[46][0].value = totalAgrupamientoITLF26.orizabaPresPor;
      event.summaryCells[49][0].value = totalAgrupamientoITLF26.orizabaPresAcPor;
      event.summaryCells[51][0].value = totalAgrupamientoITLF26.orizabaIngrAntPor;
    }
    if(event.data.key == '202603 MAR'){
      agrupamientoITLM26.cuatitlanIngr = event.summaryCells[4][0].value;
      agrupamientoITLM26.cuatitlanPres = event.summaryCells[5][0].value;
      agrupamientoITLM26.cuatitlanIngrAc = event.summaryCells[7][0].value;
      agrupamientoITLM26.cuatitlanPresAc = event.summaryCells[8][0].value;
      agrupamientoITLM26.cuatitlanIngrAnt = event.summaryCells[10][0].value;
      agrupamientoITLM26.tultitlanIngr = event.summaryCells[12][0].value;
      agrupamientoITLM26.tultitlanPres = event.summaryCells[13][0].value;
      agrupamientoITLM26.tultitlanIngrAc = event.summaryCells[15][0].value;
      agrupamientoITLM26.tultitlanPresAc = event.summaryCells[16][0].value;
      agrupamientoITLM26.tultitlanIngrAnt = event.summaryCells[18][0].value;
      agrupamientoITLM26.guadalajaraIngr = event.summaryCells[20][0].value;
      agrupamientoITLM26.guadalajaraPres = event.summaryCells[21][0].value;
      agrupamientoITLM26.guadalajaraIngrAc = event.summaryCells[23][0].value;
      agrupamientoITLM26.guadalajaraPresAc = event.summaryCells[24][0].value;
      agrupamientoITLM26.guadalajaraIngrAnt = event.summaryCells[26][0].value;
      agrupamientoITLM26.hermosilloIngr = event.summaryCells[28][0].value;
      agrupamientoITLM26.hermosilloPres = event.summaryCells[29][0].value;
      agrupamientoITLM26.hermosilloIngrAc = event.summaryCells[31][0].value;
      agrupamientoITLM26.hermosilloPresAc = event.summaryCells[32][0].value;
      agrupamientoITLM26.hermosilloIngrAnt = event.summaryCells[34][0].value;
      agrupamientoITLM26.mexicaliIngr = event.summaryCells[36][0].value;
      agrupamientoITLM26.mexicaliPres = event.summaryCells[37][0].value;
      agrupamientoITLM26.mexicaliIngrAc = event.summaryCells[39][0].value;
      agrupamientoITLM26.mexicaliPresAc = event.summaryCells[40][0].value;
      agrupamientoITLM26.mexicaliIngrAnt = event.summaryCells[42][0].value;
      agrupamientoITLM26.orizabaIngr = event.summaryCells[44][0].value;
      agrupamientoITLM26.orizabaPres = event.summaryCells[45][0].value;
      agrupamientoITLM26.orizabaIngrAc = event.summaryCells[47][0].value;
      agrupamientoITLM26.orizabaPresAc = event.summaryCells[48][0].value;
      agrupamientoITLM26.orizabaIngrAnt = event.summaryCells[50][0].value;

      totalAgrupamientoITLM26.cuatitlanPresPor = agrupamientoITLM26.cuatitlanIngr / agrupamientoITLM26.cuatitlanPres;
      totalAgrupamientoITLM26.cuatitlanPresAcPor = agrupamientoITLM26.cuatitlanIngrAc / agrupamientoITLM26.cuatitlanPresAc;
      totalAgrupamientoITLM26.cuatitlanIngrAntPor = agrupamientoITLM26.cuatitlanIngr / agrupamientoITLM26.cuatitlanIngrAnt;
      totalAgrupamientoITLM26.tultitlanPresPor = agrupamientoITLM26.tultitlanIngr / agrupamientoITLM26.tultitlanPres;
      totalAgrupamientoITLM26.tultitlanPresAcPor = agrupamientoITLM26.tultitlanIngrAc / agrupamientoITLM26.tultitlanPresAc;
      totalAgrupamientoITLM26.tultitlanIngrAntPor = agrupamientoITLM26.tultitlanIngr / agrupamientoITLM26.tultitlanIngrAnt;
      totalAgrupamientoITLM26.guadalajaraPresPor = agrupamientoITLM26.guadalajaraIngr / agrupamientoITLM26.guadalajaraPres;
      totalAgrupamientoITLM26.guadalajaraPresAcPor = agrupamientoITLM26.guadalajaraIngrAc / agrupamientoITLM26.guadalajaraPresAc;
      totalAgrupamientoITLM26.guadalajaraIngrAntPor = agrupamientoITLM26.guadalajaraIngr / agrupamientoITLM26.guadalajaraIngrAnt;
      totalAgrupamientoITLM26.hermosilloPresPor = agrupamientoITLM26.hermosilloIngr / agrupamientoITLM26.hermosilloPres;
      totalAgrupamientoITLM26.hermosilloPresAcPor = agrupamientoITLM26.hermosilloIngrAc / agrupamientoITLM26.hermosilloPresAc;
      totalAgrupamientoITLM26.hermosilloIngrAntPor = agrupamientoITLM26.hermosilloIngr / agrupamientoITLM26.hermosilloIngrAnt;
      totalAgrupamientoITLM26.mexicaliPresPor = agrupamientoITLM26.mexicaliIngr / agrupamientoITLM26.mexicaliPres;
      totalAgrupamientoITLM26.mexicaliPresAcPor = agrupamientoITLM26.mexicaliIngrAc / agrupamientoITLM26.mexicaliPresAc;
      totalAgrupamientoITLM26.mexicaliIngrAntPor = agrupamientoITLM26.mexicaliIngr / agrupamientoITLM26.mexicaliIngrAnt;
      totalAgrupamientoITLM26.orizabaPresPor = agrupamientoITLM26.orizabaIngr / agrupamientoITLM26.orizabaPres;
      totalAgrupamientoITLM26.orizabaPresAcPor = agrupamientoITLM26.orizabaIngrAc / agrupamientoITLM26.orizabaPresAc;
      totalAgrupamientoITLM26.orizabaIngrAntPor = agrupamientoITLM26.orizabaIngr / agrupamientoITLM26.orizabaIngrAnt;
    
      event.summaryCells[6][0].value = totalAgrupamientoITLM26.cuatitlanPresPor;
      event.summaryCells[9][0].value = totalAgrupamientoITLM26.cuatitlanPresAcPor;
      event.summaryCells[11][0].value = totalAgrupamientoITLM26.cuatitlanIngrAntPor;
      event.summaryCells[14][0].value = totalAgrupamientoITLM26.tultitlanPresPor;
      event.summaryCells[17][0].value = totalAgrupamientoITLM26.tultitlanPresAcPor;
      event.summaryCells[19][0].value = totalAgrupamientoITLM26.tultitlanIngrAntPor;
      event.summaryCells[22][0].value = totalAgrupamientoITLM26.guadalajaraPresPor;
      event.summaryCells[25][0].value = totalAgrupamientoITLM26.guadalajaraPresAcPor;
      event.summaryCells[27][0].value = totalAgrupamientoITLM26.guadalajaraIngrAntPor;
      event.summaryCells[30][0].value = totalAgrupamientoITLM26.hermosilloPresPor;
      event.summaryCells[33][0].value = totalAgrupamientoITLM26.hermosilloPresAcPor;
      event.summaryCells[35][0].value = totalAgrupamientoITLM26.hermosilloIngrAntPor;
      event.summaryCells[38][0].value = totalAgrupamientoITLM26.mexicaliPresPor;
      event.summaryCells[41][0].value = totalAgrupamientoITLM26.mexicaliPresAcPor;
      event.summaryCells[43][0].value = totalAgrupamientoITLM26.mexicaliIngrAntPor;
      event.summaryCells[46][0].value = totalAgrupamientoITLM26.orizabaPresPor;
      event.summaryCells[49][0].value = totalAgrupamientoITLM26.orizabaPresAcPor;
      event.summaryCells[51][0].value = totalAgrupamientoITLM26.orizabaIngrAntPor;
    }
     if(event.data.key == '202604 ABR'){
       agrupamientoITLA26.cuatitlanIngr = event.summaryCells[4][0].value;
       agrupamientoITLA26.cuatitlanPres = event.summaryCells[5][0].value;
       agrupamientoITLA26.cuatitlanIngrAc = event.summaryCells[7][0].value;
       agrupamientoITLA26.cuatitlanPresAc = event.summaryCells[8][0].value;
       agrupamientoITLA26.cuatitlanIngrAnt = event.summaryCells[10][0].value;
       agrupamientoITLA26.tultitlanIngr = event.summaryCells[12][0].value;
       agrupamientoITLA26.tultitlanPres = event.summaryCells[13][0].value;
       agrupamientoITLA26.tultitlanIngrAc = event.summaryCells[15][0].value;
       agrupamientoITLA26.tultitlanPresAc = event.summaryCells[16][0].value;
       agrupamientoITLA26.tultitlanIngrAnt = event.summaryCells[18][0].value;
       agrupamientoITLA26.guadalajaraIngr = event.summaryCells[20][0].value;
       agrupamientoITLA26.guadalajaraPres = event.summaryCells[21][0].value;
       agrupamientoITLA26.guadalajaraIngrAc = event.summaryCells[23][0].value;
       agrupamientoITLA26.guadalajaraPresAc = event.summaryCells[24][0].value;
       agrupamientoITLA26.guadalajaraIngrAnt = event.summaryCells[26][0].value;
       agrupamientoITLA26.hermosilloIngr = event.summaryCells[28][0].value;
       agrupamientoITLA26.hermosilloPres = event.summaryCells[29][0].value;
       agrupamientoITLA26.hermosilloIngrAc = event.summaryCells[31][0].value;
       agrupamientoITLA26.hermosilloPresAc = event.summaryCells[32][0].value;
       agrupamientoITLA26.hermosilloIngrAnt = event.summaryCells[34][0].value;
       agrupamientoITLA26.mexicaliIngr = event.summaryCells[36][0].value;
       agrupamientoITLA26.mexicaliPres = event.summaryCells[37][0].value;
       agrupamientoITLA26.mexicaliIngrAc = event.summaryCells[39][0].value;
       agrupamientoITLA26.mexicaliPresAc = event.summaryCells[40][0].value;
       agrupamientoITLA26.mexicaliIngrAnt = event.summaryCells[42][0].value;
       agrupamientoITLA26.orizabaIngr = event.summaryCells[44][0].value;
       agrupamientoITLA26.orizabaPres = event.summaryCells[45][0].value;
       agrupamientoITLA26.orizabaIngrAc = event.summaryCells[47][0].value;
       agrupamientoITLA26.orizabaPresAc = event.summaryCells[48][0].value;
       agrupamientoITLA26.orizabaIngrAnt = event.summaryCells[50][0].value;

       totalAgrupamientoITLA26.cuatitlanPresPor = agrupamientoITLA26.cuatitlanIngr / agrupamientoITLA26.cuatitlanPres;
       totalAgrupamientoITLA26.cuatitlanPresAcPor = agrupamientoITLA26.cuatitlanIngrAc / agrupamientoITLA26.cuatitlanPresAc;
       totalAgrupamientoITLA26.cuatitlanIngrAntPor = agrupamientoITLA26.cuatitlanIngr / agrupamientoITLA26.cuatitlanIngrAnt;
       totalAgrupamientoITLA26.tultitlanPresPor = agrupamientoITLA26.tultitlanIngr / agrupamientoITLA26.tultitlanPres;
       totalAgrupamientoITLA26.tultitlanPresAcPor = agrupamientoITLA26.tultitlanIngrAc / agrupamientoITLA26.tultitlanPresAc;
       totalAgrupamientoITLA26.tultitlanIngrAntPor = agrupamientoITLA26.tultitlanIngr / agrupamientoITLA26.tultitlanIngrAnt;
       totalAgrupamientoITLA26.guadalajaraPresPor = agrupamientoITLA26.guadalajaraIngr / agrupamientoITLA26.guadalajaraPres;
       totalAgrupamientoITLA26.guadalajaraPresAcPor = agrupamientoITLA26.guadalajaraIngrAc / agrupamientoITLA26.guadalajaraPresAc;
       totalAgrupamientoITLA26.guadalajaraIngrAntPor = agrupamientoITLA26.guadalajaraIngr / agrupamientoITLA26.guadalajaraIngrAnt;
       totalAgrupamientoITLA26.hermosilloPresPor = agrupamientoITLA26.hermosilloIngr / agrupamientoITLA26.hermosilloPres;
       totalAgrupamientoITLA26.hermosilloPresAcPor = agrupamientoITLA26.hermosilloIngrAc / agrupamientoITLA26.hermosilloPresAc;
       totalAgrupamientoITLA26.hermosilloIngrAntPor = agrupamientoITLA26.hermosilloIngr / agrupamientoITLA26.hermosilloIngrAnt;
       totalAgrupamientoITLA26.mexicaliPresPor = agrupamientoITLA26.mexicaliIngr / agrupamientoITLA26.mexicaliPres;
       totalAgrupamientoITLA26.mexicaliPresAcPor = agrupamientoITLA26.mexicaliIngrAc / agrupamientoITLA26.mexicaliPresAc;
       totalAgrupamientoITLA26.mexicaliIngrAntPor = agrupamientoITLA26.mexicaliIngr / agrupamientoITLA26.mexicaliIngrAnt;
       totalAgrupamientoITLA26.orizabaPresPor = agrupamientoITLA26.orizabaIngr / agrupamientoITLA26.orizabaPres;
       totalAgrupamientoITLA26.orizabaPresAcPor = agrupamientoITLA26.orizabaIngrAc / agrupamientoITLA26.orizabaPresAc;
       totalAgrupamientoITLA26.orizabaIngrAntPor = agrupamientoITLA26.orizabaIngr / agrupamientoITLA26.orizabaIngrAnt;
    
       event.summaryCells[6][0].value = totalAgrupamientoITLA26.cuatitlanPresPor;
       event.summaryCells[9][0].value = totalAgrupamientoITLA26.cuatitlanPresAcPor;
       event.summaryCells[11][0].value = totalAgrupamientoITLA26.cuatitlanIngrAntPor;
       event.summaryCells[14][0].value = totalAgrupamientoITLA26.tultitlanPresPor;
       event.summaryCells[17][0].value = totalAgrupamientoITLA26.tultitlanPresAcPor;
       event.summaryCells[19][0].value = totalAgrupamientoITLA26.tultitlanIngrAntPor;
       event.summaryCells[22][0].value = totalAgrupamientoITLA26.guadalajaraPresPor;
       event.summaryCells[25][0].value = totalAgrupamientoITLA26.guadalajaraPresAcPor;
       event.summaryCells[27][0].value = totalAgrupamientoITLA26.guadalajaraIngrAntPor;
       event.summaryCells[30][0].value = totalAgrupamientoITLA26.hermosilloPresPor;
       event.summaryCells[33][0].value = totalAgrupamientoITLA26.hermosilloPresAcPor;
       event.summaryCells[35][0].value = totalAgrupamientoITLA26.hermosilloIngrAntPor;
       event.summaryCells[38][0].value = totalAgrupamientoITLA26.mexicaliPresPor;
       event.summaryCells[41][0].value = totalAgrupamientoITLA26.mexicaliPresAcPor;
       event.summaryCells[43][0].value = totalAgrupamientoITLA26.mexicaliIngrAntPor;
       event.summaryCells[46][0].value = totalAgrupamientoITLA26.orizabaPresPor;
       event.summaryCells[49][0].value = totalAgrupamientoITLA26.orizabaPresAcPor;
       event.summaryCells[51][0].value = totalAgrupamientoITLA26.orizabaIngrAntPor;
     }
    // if(event.data.key == '202605 MAY'){
    //   agrupamientoITLMY26.cuatitlanIngr = event.summaryCells[4][0].value;
    //   agrupamientoITLMY26.cuatitlanPres = event.summaryCells[5][0].value;
    //   agrupamientoITLMY26.cuatitlanIngrAc = event.summaryCells[7][0].value;
    //   agrupamientoITLMY26.cuatitlanPresAc = event.summaryCells[8][0].value;
    //   agrupamientoITLMY26.cuatitlanIngrAnt = event.summaryCells[10][0].value;
    //   agrupamientoITLMY26.tultitlanIngr = event.summaryCells[12][0].value;
    //   agrupamientoITLMY26.tultitlanPres = event.summaryCells[13][0].value;
    //   agrupamientoITLMY26.tultitlanIngrAc = event.summaryCells[15][0].value;
    //   agrupamientoITLMY26.tultitlanPresAc = event.summaryCells[16][0].value;
    //   agrupamientoITLMY26.tultitlanIngrAnt = event.summaryCells[18][0].value;
    //   agrupamientoITLMY26.guadalajaraIngr = event.summaryCells[20][0].value;
    //   agrupamientoITLMY26.guadalajaraPres = event.summaryCells[21][0].value;
    //   agrupamientoITLMY26.guadalajaraIngrAc = event.summaryCells[23][0].value;
    //   agrupamientoITLMY26.guadalajaraPresAc = event.summaryCells[24][0].value;
    //   agrupamientoITLMY26.guadalajaraIngrAnt = event.summaryCells[26][0].value;
    //   agrupamientoITLMY26.hermosilloIngr = event.summaryCells[28][0].value;
    //   agrupamientoITLMY26.hermosilloPres = event.summaryCells[29][0].value;
    //   agrupamientoITLMY26.hermosilloIngrAc = event.summaryCells[31][0].value;
    //   agrupamientoITLMY26.hermosilloPresAc = event.summaryCells[32][0].value;
    //   agrupamientoITLMY26.hermosilloIngrAnt = event.summaryCells[34][0].value;
    //   agrupamientoITLMY26.mexicaliIngr = event.summaryCells[36][0].value;
    //   agrupamientoITLMY26.mexicaliPres = event.summaryCells[37][0].value;
    //   agrupamientoITLMY26.mexicaliIngrAc = event.summaryCells[39][0].value;
    //   agrupamientoITLMY26.mexicaliPresAc = event.summaryCells[40][0].value;
    //   agrupamientoITLMY26.mexicaliIngrAnt = event.summaryCells[42][0].value;
    //   agrupamientoITLMY26.orizabaIngr = event.summaryCells[44][0].value;
    //   agrupamientoITLMY26.orizabaPres = event.summaryCells[45][0].value;
    //   agrupamientoITLMY26.orizabaIngrAc = event.summaryCells[47][0].value;
    //   agrupamientoITLMY26.orizabaPresAc = event.summaryCells[48][0].value;
    //   agrupamientoITLMY26.orizabaIngrAnt = event.summaryCells[50][0].value;

    //   totalAgrupamientoITLMY26.cuatitlanPresPor = agrupamientoITLMY26.cuatitlanIngr / agrupamientoITLMY26.cuatitlanPres;
    //   totalAgrupamientoITLMY26.cuatitlanPresAcPor = agrupamientoITLMY26.cuatitlanIngrAc / agrupamientoITLMY26.cuatitlanPresAc;
    //   totalAgrupamientoITLMY26.cuatitlanIngrAntPor = agrupamientoITLMY26.cuatitlanIngr / agrupamientoITLMY26.cuatitlanIngrAnt;
    //   totalAgrupamientoITLMY26.tultitlanPresPor = agrupamientoITLMY26.tultitlanIngr / agrupamientoITLMY26.tultitlanPres;
    //   totalAgrupamientoITLMY26.tultitlanPresAcPor = agrupamientoITLMY26.tultitlanIngrAc / agrupamientoITLMY26.tultitlanPresAc;
    //   totalAgrupamientoITLMY26.tultitlanIngrAntPor = agrupamientoITLMY26.tultitlanIngr / agrupamientoITLMY26.tultitlanIngrAnt;
    //   totalAgrupamientoITLMY26.guadalajaraPresPor = agrupamientoITLMY26.guadalajaraIngr / agrupamientoITLMY26.guadalajaraPres;
    //   totalAgrupamientoITLMY26.guadalajaraPresAcPor = agrupamientoITLMY26.guadalajaraIngrAc / agrupamientoITLMY26.guadalajaraPresAc;
    //   totalAgrupamientoITLMY26.guadalajaraIngrAntPor = agrupamientoITLMY26.guadalajaraIngr / agrupamientoITLMY26.guadalajaraIngrAnt;
    //   totalAgrupamientoITLMY26.hermosilloPresPor = agrupamientoITLMY26.hermosilloIngr / agrupamientoITLMY26.hermosilloPres;
    //   totalAgrupamientoITLMY26.hermosilloPresAcPor = agrupamientoITLMY26.hermosilloIngrAc / agrupamientoITLMY26.hermosilloPresAc;
    //   totalAgrupamientoITLMY26.hermosilloIngrAntPor = agrupamientoITLMY26.hermosilloIngr / agrupamientoITLMY26.hermosilloIngrAnt;
    //   totalAgrupamientoITLMY26.mexicaliPresPor = agrupamientoITLMY26.mexicaliIngr / agrupamientoITLMY26.mexicaliPres;
    //   totalAgrupamientoITLMY26.mexicaliPresAcPor = agrupamientoITLMY26.mexicaliIngrAc / agrupamientoITLMY26.mexicaliPresAc;
    //   totalAgrupamientoITLMY26.mexicaliIngrAntPor = agrupamientoITLMY26.mexicaliIngr / agrupamientoITLMY26.mexicaliIngrAnt;
    //   totalAgrupamientoITLMY26.orizabaPresPor = agrupamientoITLMY26.orizabaIngr / agrupamientoITLMY26.orizabaPres;
    //   totalAgrupamientoITLMY26.orizabaPresAcPor = agrupamientoITLMY26.orizabaIngrAc / agrupamientoITLMY26.orizabaPresAc;
    //   totalAgrupamientoITLMY26.orizabaIngrAntPor = agrupamientoITLMY26.orizabaIngr / agrupamientoITLMY26.orizabaIngrAnt;
    
    //   event.summaryCells[6][0].value = totalAgrupamientoITLMY26.cuatitlanPresPor;
    //   event.summaryCells[9][0].value = totalAgrupamientoITLMY26.cuatitlanPresAcPor;
    //   event.summaryCells[11][0].value = totalAgrupamientoITLMY26.cuatitlanIngrAntPor;
    //   event.summaryCells[14][0].value = totalAgrupamientoITLMY26.tultitlanPresPor;
    //   event.summaryCells[17][0].value = totalAgrupamientoITLMY26.tultitlanPresAcPor;
    //   event.summaryCells[19][0].value = totalAgrupamientoITLMY26.tultitlanIngrAntPor;
    //   event.summaryCells[22][0].value = totalAgrupamientoITLMY26.guadalajaraPresPor;
    //   event.summaryCells[25][0].value = totalAgrupamientoITLMY26.guadalajaraPresAcPor;
    //   event.summaryCells[27][0].value = totalAgrupamientoITLMY26.guadalajaraIngrAntPor;
    //   event.summaryCells[30][0].value = totalAgrupamientoITLMY26.hermosilloPresPor;
    //   event.summaryCells[33][0].value = totalAgrupamientoITLMY26.hermosilloPresAcPor;
    //   event.summaryCells[35][0].value = totalAgrupamientoITLMY26.hermosilloIngrAntPor;
    //   event.summaryCells[38][0].value = totalAgrupamientoITLMY26.mexicaliPresPor;
    //   event.summaryCells[41][0].value = totalAgrupamientoITLMY26.mexicaliPresAcPor;
    //   event.summaryCells[43][0].value = totalAgrupamientoITLMY26.mexicaliIngrAntPor;
    //   event.summaryCells[46][0].value = totalAgrupamientoITLMY26.orizabaPresPor;
    //   event.summaryCells[49][0].value = totalAgrupamientoITLMY26.orizabaPresAcPor;
    //   event.summaryCells[51][0].value = totalAgrupamientoITLMY26.orizabaIngrAntPor;
    // }
    // if(event.data.key == '202606 JUN'){
    //   agrupamientoITLJN26.cuatitlanIngr = event.summaryCells[4][0].value;
    //   agrupamientoITLJN26.cuatitlanPres = event.summaryCells[5][0].value;
    //   agrupamientoITLJN26.cuatitlanIngrAc = event.summaryCells[7][0].value;
    //   agrupamientoITLJN26.cuatitlanPresAc = event.summaryCells[8][0].value;
    //   agrupamientoITLJN26.cuatitlanIngrAnt = event.summaryCells[10][0].value;
    //   agrupamientoITLJN26.tultitlanIngr = event.summaryCells[12][0].value;
    //   agrupamientoITLJN26.tultitlanPres = event.summaryCells[13][0].value;
    //   agrupamientoITLJN26.tultitlanIngrAc = event.summaryCells[15][0].value;
    //   agrupamientoITLJN26.tultitlanPresAc = event.summaryCells[16][0].value;
    //   agrupamientoITLJN26.tultitlanIngrAnt = event.summaryCells[18][0].value;
    //   agrupamientoITLJN26.guadalajaraIngr = event.summaryCells[20][0].value;
    //   agrupamientoITLJN26.guadalajaraPres = event.summaryCells[21][0].value;
    //   agrupamientoITLJN26.guadalajaraIngrAc = event.summaryCells[23][0].value;
    //   agrupamientoITLJN26.guadalajaraPresAc = event.summaryCells[24][0].value;
    //   agrupamientoITLJN26.guadalajaraIngrAnt = event.summaryCells[26][0].value;
    //   agrupamientoITLJN26.hermosilloIngr = event.summaryCells[28][0].value;
    //   agrupamientoITLJN26.hermosilloPres = event.summaryCells[29][0].value;
    //   agrupamientoITLJN26.hermosilloIngrAc = event.summaryCells[31][0].value;
    //   agrupamientoITLJN26.hermosilloPresAc = event.summaryCells[32][0].value;
    //   agrupamientoITLJN26.hermosilloIngrAnt = event.summaryCells[34][0].value;
    //   agrupamientoITLJN26.mexicaliIngr = event.summaryCells[36][0].value;
    //   agrupamientoITLJN26.mexicaliPres = event.summaryCells[37][0].value;
    //   agrupamientoITLJN26.mexicaliIngrAc = event.summaryCells[39][0].value;
    //   agrupamientoITLJN26.mexicaliPresAc = event.summaryCells[40][0].value;
    //   agrupamientoITLJN26.mexicaliIngrAnt = event.summaryCells[42][0].value;
    //   agrupamientoITLJN26.orizabaIngr = event.summaryCells[44][0].value;
    //   agrupamientoITLJN26.orizabaPres = event.summaryCells[45][0].value;
    //   agrupamientoITLJN26.orizabaIngrAc = event.summaryCells[47][0].value;
    //   agrupamientoITLJN26.orizabaPresAc = event.summaryCells[48][0].value;
    //   agrupamientoITLJN26.orizabaIngrAnt = event.summaryCells[50][0].value;

    //   totalAgrupamientoITLJN26.cuatitlanPresPor = agrupamientoITLJN26.cuatitlanIngr / agrupamientoITLJN26.cuatitlanPres;
    //   totalAgrupamientoITLJN26.cuatitlanPresAcPor = agrupamientoITLJN26.cuatitlanIngrAc / agrupamientoITLJN26.cuatitlanPresAc;
    //   totalAgrupamientoITLJN26.cuatitlanIngrAntPor = agrupamientoITLJN26.cuatitlanIngr / agrupamientoITLJN26.cuatitlanIngrAnt;
    //   totalAgrupamientoITLJN26.tultitlanPresPor = agrupamientoITLJN26.tultitlanIngr / agrupamientoITLJN26.tultitlanPres;
    //   totalAgrupamientoITLJN26.tultitlanPresAcPor = agrupamientoITLJN26.tultitlanIngrAc / agrupamientoITLJN26.tultitlanPresAc;
    //   totalAgrupamientoITLJN26.tultitlanIngrAntPor = agrupamientoITLJN26.tultitlanIngr / agrupamientoITLJN26.tultitlanIngrAnt;
    //   totalAgrupamientoITLJN26.guadalajaraPresPor = agrupamientoITLJN26.guadalajaraIngr / agrupamientoITLJN26.guadalajaraPres;
    //   totalAgrupamientoITLJN26.guadalajaraPresAcPor = agrupamientoITLJN26.guadalajaraIngrAc / agrupamientoITLJN26.guadalajaraPresAc;
    //   totalAgrupamientoITLJN26.guadalajaraIngrAntPor = agrupamientoITLJN26.guadalajaraIngr / agrupamientoITLJN26.guadalajaraIngrAnt;
    //   totalAgrupamientoITLJN26.hermosilloPresPor = agrupamientoITLJN26.hermosilloIngr / agrupamientoITLJN26.hermosilloPres;
    //   totalAgrupamientoITLJN26.hermosilloPresAcPor = agrupamientoITLJN26.hermosilloIngrAc / agrupamientoITLJN26.hermosilloPresAc;
    //   totalAgrupamientoITLJN26.hermosilloIngrAntPor = agrupamientoITLJN26.hermosilloIngr / agrupamientoITLJN26.hermosilloIngrAnt;
    //   totalAgrupamientoITLJN26.mexicaliPresPor = agrupamientoITLJN26.mexicaliIngr / agrupamientoITLJN26.mexicaliPres;
    //   totalAgrupamientoITLJN26.mexicaliPresAcPor = agrupamientoITLJN26.mexicaliIngrAc / agrupamientoITLJN26.mexicaliPresAc;
    //   totalAgrupamientoITLJN26.mexicaliIngrAntPor = agrupamientoITLJN26.mexicaliIngr / agrupamientoITLJN26.mexicaliIngrAnt;
    //   totalAgrupamientoITLJN26.orizabaPresPor = agrupamientoITLJN26.orizabaIngr / agrupamientoITLJN26.orizabaPres;
    //   totalAgrupamientoITLJN26.orizabaPresAcPor = agrupamientoITLJN26.orizabaIngrAc / agrupamientoITLJN26.orizabaPresAc;
    //   totalAgrupamientoITLJN26.orizabaIngrAntPor = agrupamientoITLJN26.orizabaIngr / agrupamientoITLJN26.orizabaIngrAnt;
    
    //   event.summaryCells[6][0].value = totalAgrupamientoITLJN26.cuatitlanPresPor;
    //   event.summaryCells[9][0].value = totalAgrupamientoITLJN26.cuatitlanPresAcPor;
    //   event.summaryCells[11][0].value = totalAgrupamientoITLJN26.cuatitlanIngrAntPor;
    //   event.summaryCells[14][0].value = totalAgrupamientoITLJN26.tultitlanPresPor;
    //   event.summaryCells[17][0].value = totalAgrupamientoITLJN26.tultitlanPresAcPor;
    //   event.summaryCells[19][0].value = totalAgrupamientoITLJN26.tultitlanIngrAntPor;
    //   event.summaryCells[22][0].value = totalAgrupamientoITLJN26.guadalajaraPresPor;
    //   event.summaryCells[25][0].value = totalAgrupamientoITLJN26.guadalajaraPresAcPor;
    //   event.summaryCells[27][0].value = totalAgrupamientoITLJN26.guadalajaraIngrAntPor;
    //   event.summaryCells[30][0].value = totalAgrupamientoITLJN26.hermosilloPresPor;
    //   event.summaryCells[33][0].value = totalAgrupamientoITLJN26.hermosilloPresAcPor;
    //   event.summaryCells[35][0].value = totalAgrupamientoITLJN26.hermosilloIngrAntPor;
    //   event.summaryCells[38][0].value = totalAgrupamientoITLJN26.mexicaliPresPor;
    //   event.summaryCells[41][0].value = totalAgrupamientoITLJN26.mexicaliPresAcPor;
    //   event.summaryCells[43][0].value = totalAgrupamientoITLJN26.mexicaliIngrAntPor;
    //   event.summaryCells[46][0].value = totalAgrupamientoITLJN26.orizabaPresPor;
    //   event.summaryCells[49][0].value = totalAgrupamientoITLJN26.orizabaPresAcPor;
    //   event.summaryCells[51][0].value = totalAgrupamientoITLJN26.orizabaIngrAntPor;
    // }
    // if(event.data.key == '202607 JUL'){
    //   agrupamientoITLJL26.cuatitlanIngr = event.summaryCells[4][0].value;
    //   agrupamientoITLJL26.cuatitlanPres = event.summaryCells[5][0].value;
    //   agrupamientoITLJL26.cuatitlanIngrAc = event.summaryCells[7][0].value;
    //   agrupamientoITLJL26.cuatitlanPresAc = event.summaryCells[8][0].value;
    //   agrupamientoITLJL26.cuatitlanIngrAnt = event.summaryCells[10][0].value;
    //   agrupamientoITLJL26.tultitlanIngr = event.summaryCells[12][0].value;
    //   agrupamientoITLJL26.tultitlanPres = event.summaryCells[13][0].value;
    //   agrupamientoITLJL26.tultitlanIngrAc = event.summaryCells[15][0].value;
    //   agrupamientoITLJL26.tultitlanPresAc = event.summaryCells[16][0].value;
    //   agrupamientoITLJL26.tultitlanIngrAnt = event.summaryCells[18][0].value;
    //   agrupamientoITLJL26.guadalajaraIngr = event.summaryCells[20][0].value;
    //   agrupamientoITLJL26.guadalajaraPres = event.summaryCells[21][0].value;
    //   agrupamientoITLJL26.guadalajaraIngrAc = event.summaryCells[23][0].value;
    //   agrupamientoITLJL26.guadalajaraPresAc = event.summaryCells[24][0].value;
    //   agrupamientoITLJL26.guadalajaraIngrAnt = event.summaryCells[26][0].value;
    //   agrupamientoITLJL26.hermosilloIngr = event.summaryCells[28][0].value;
    //   agrupamientoITLJL26.hermosilloPres = event.summaryCells[29][0].value;
    //   agrupamientoITLJL26.hermosilloIngrAc = event.summaryCells[31][0].value;
    //   agrupamientoITLJL26.hermosilloPresAc = event.summaryCells[32][0].value;
    //   agrupamientoITLJL26.hermosilloIngrAnt = event.summaryCells[34][0].value;
    //   agrupamientoITLJL26.mexicaliIngr = event.summaryCells[36][0].value;
    //   agrupamientoITLJL26.mexicaliPres = event.summaryCells[37][0].value;
    //   agrupamientoITLJL26.mexicaliIngrAc = event.summaryCells[39][0].value;
    //   agrupamientoITLJL26.mexicaliPresAc = event.summaryCells[40][0].value;
    //   agrupamientoITLJL26.mexicaliIngrAnt = event.summaryCells[42][0].value;
    //   agrupamientoITLJL26.orizabaIngr = event.summaryCells[44][0].value;
    //   agrupamientoITLJL26.orizabaPres = event.summaryCells[45][0].value;
    //   agrupamientoITLJL26.orizabaIngrAc = event.summaryCells[47][0].value;
    //   agrupamientoITLJL26.orizabaPresAc = event.summaryCells[48][0].value;
    //   agrupamientoITLJL26.orizabaIngrAnt = event.summaryCells[50][0].value;

    //   totalAgrupamientoITLJL26.cuatitlanPresPor = agrupamientoITLJL26.cuatitlanIngr / agrupamientoITLJL26.cuatitlanPres;
    //   totalAgrupamientoITLJL26.cuatitlanPresAcPor = agrupamientoITLJL26.cuatitlanIngrAc / agrupamientoITLJL26.cuatitlanPresAc;
    //   totalAgrupamientoITLJL26.cuatitlanIngrAntPor = agrupamientoITLJL26.cuatitlanIngr / agrupamientoITLJL26.cuatitlanIngrAnt;
    //   totalAgrupamientoITLJL26.tultitlanPresPor = agrupamientoITLJL26.tultitlanIngr / agrupamientoITLJL26.tultitlanPres;
    //   totalAgrupamientoITLJL26.tultitlanPresAcPor = agrupamientoITLJL26.tultitlanIngrAc / agrupamientoITLJL26.tultitlanPresAc;
    //   totalAgrupamientoITLJL26.tultitlanIngrAntPor = agrupamientoITLJL26.tultitlanIngr / agrupamientoITLJL26.tultitlanIngrAnt;
    //   totalAgrupamientoITLJL26.guadalajaraPresPor = agrupamientoITLJL26.guadalajaraIngr / agrupamientoITLJL26.guadalajaraPres;
    //   totalAgrupamientoITLJL26.guadalajaraPresAcPor = agrupamientoITLJL26.guadalajaraIngrAc / agrupamientoITLJL26.guadalajaraPresAc;
    //   totalAgrupamientoITLJL26.guadalajaraIngrAntPor = agrupamientoITLJL26.guadalajaraIngr / agrupamientoITLJL26.guadalajaraIngrAnt;
    //   totalAgrupamientoITLJL26.hermosilloPresPor = agrupamientoITLJL26.hermosilloIngr / agrupamientoITLJL26.hermosilloPres;
    //   totalAgrupamientoITLJL26.hermosilloPresAcPor = agrupamientoITLJL26.hermosilloIngrAc / agrupamientoITLJL26.hermosilloPresAc;
    //   totalAgrupamientoITLJL26.hermosilloIngrAntPor = agrupamientoITLJL26.hermosilloIngr / agrupamientoITLJL26.hermosilloIngrAnt;
    //   totalAgrupamientoITLJL26.mexicaliPresPor = agrupamientoITLJL26.mexicaliIngr / agrupamientoITLJL26.mexicaliPres;
    //   totalAgrupamientoITLJL26.mexicaliPresAcPor = agrupamientoITLJL26.mexicaliIngrAc / agrupamientoITLJL26.mexicaliPresAc;
    //   totalAgrupamientoITLJL26.mexicaliIngrAntPor = agrupamientoITLJL26.mexicaliIngr / agrupamientoITLJL26.mexicaliIngrAnt;
    //   totalAgrupamientoITLJL26.orizabaPresPor = agrupamientoITLJL26.orizabaIngr / agrupamientoITLJL26.orizabaPres;
    //   totalAgrupamientoITLJL26.orizabaPresAcPor = agrupamientoITLJL26.orizabaIngrAc / agrupamientoITLJL26.orizabaPresAc;
    //   totalAgrupamientoITLJL26.orizabaIngrAntPor = agrupamientoITLJL26.orizabaIngr / agrupamientoITLJL26.orizabaIngrAnt;
    
    //   event.summaryCells[6][0].value = totalAgrupamientoITLJL26.cuatitlanPresPor;
    //   event.summaryCells[9][0].value = totalAgrupamientoITLJL26.cuatitlanPresAcPor;
    //   event.summaryCells[11][0].value = totalAgrupamientoITLJL26.cuatitlanIngrAntPor;
    //   event.summaryCells[14][0].value = totalAgrupamientoITLJL26.tultitlanPresPor;
    //   event.summaryCells[17][0].value = totalAgrupamientoITLJL26.tultitlanPresAcPor;
    //   event.summaryCells[19][0].value = totalAgrupamientoITLJL26.tultitlanIngrAntPor;
    //   event.summaryCells[22][0].value = totalAgrupamientoITLJL26.guadalajaraPresPor;
    //   event.summaryCells[25][0].value = totalAgrupamientoITLJL26.guadalajaraPresAcPor;
    //   event.summaryCells[27][0].value = totalAgrupamientoITLJL26.guadalajaraIngrAntPor;
    //   event.summaryCells[30][0].value = totalAgrupamientoITLJL26.hermosilloPresPor;
    //   event.summaryCells[33][0].value = totalAgrupamientoITLJL26.hermosilloPresAcPor;
    //   event.summaryCells[35][0].value = totalAgrupamientoITLJL26.hermosilloIngrAntPor;
    //   event.summaryCells[38][0].value = totalAgrupamientoITLJL26.mexicaliPresPor;
    //   event.summaryCells[41][0].value = totalAgrupamientoITLJL26.mexicaliPresAcPor;
    //   event.summaryCells[43][0].value = totalAgrupamientoITLJL26.mexicaliIngrAntPor;
    //   event.summaryCells[46][0].value = totalAgrupamientoITLJL26.orizabaPresPor;
    //   event.summaryCells[49][0].value = totalAgrupamientoITLJL26.orizabaPresAcPor;
    //   event.summaryCells[51][0].value = totalAgrupamientoITLJL26.orizabaIngrAntPor;
    // }
    // if(event.data.key == '202608 AGO'){
    //   agrupamientoITLAG26.cuatitlanIngr = event.summaryCells[4][0].value;
    //   agrupamientoITLAG26.cuatitlanPres = event.summaryCells[5][0].value;
    //   agrupamientoITLAG26.cuatitlanIngrAc = event.summaryCells[7][0].value;
    //   agrupamientoITLAG26.cuatitlanPresAc = event.summaryCells[8][0].value;
    //   agrupamientoITLAG26.cuatitlanIngrAnt = event.summaryCells[10][0].value;
    //   agrupamientoITLAG26.tultitlanIngr = event.summaryCells[12][0].value;
    //   agrupamientoITLAG26.tultitlanPres = event.summaryCells[13][0].value;
    //   agrupamientoITLAG26.tultitlanIngrAc = event.summaryCells[15][0].value;
    //   agrupamientoITLAG26.tultitlanPresAc = event.summaryCells[16][0].value;
    //   agrupamientoITLAG26.tultitlanIngrAnt = event.summaryCells[18][0].value;
    //   agrupamientoITLAG26.guadalajaraIngr = event.summaryCells[20][0].value;
    //   agrupamientoITLAG26.guadalajaraPres = event.summaryCells[21][0].value;
    //   agrupamientoITLAG26.guadalajaraIngrAc = event.summaryCells[23][0].value;
    //   agrupamientoITLAG26.guadalajaraPresAc = event.summaryCells[24][0].value;
    //   agrupamientoITLAG26.guadalajaraIngrAnt = event.summaryCells[26][0].value;
    //   agrupamientoITLAG26.hermosilloIngr = event.summaryCells[28][0].value;
    //   agrupamientoITLAG26.hermosilloPres = event.summaryCells[29][0].value;
    //   agrupamientoITLAG26.hermosilloIngrAc = event.summaryCells[31][0].value;
    //   agrupamientoITLAG26.hermosilloPresAc = event.summaryCells[32][0].value;
    //   agrupamientoITLAG26.hermosilloIngrAnt = event.summaryCells[34][0].value;
    //   agrupamientoITLAG26.mexicaliIngr = event.summaryCells[36][0].value;
    //   agrupamientoITLAG26.mexicaliPres = event.summaryCells[37][0].value;
    //   agrupamientoITLAG26.mexicaliIngrAc = event.summaryCells[39][0].value;
    //   agrupamientoITLAG26.mexicaliPresAc = event.summaryCells[40][0].value;
    //   agrupamientoITLAG26.mexicaliIngrAnt = event.summaryCells[42][0].value;
    //   agrupamientoITLAG26.orizabaIngr = event.summaryCells[44][0].value;
    //   agrupamientoITLAG26.orizabaPres = event.summaryCells[45][0].value;
    //   agrupamientoITLAG26.orizabaIngrAc = event.summaryCells[47][0].value;
    //   agrupamientoITLAG26.orizabaPresAc = event.summaryCells[48][0].value;
    //   agrupamientoITLAG26.orizabaIngrAnt = event.summaryCells[50][0].value;

    //   totalAgrupamientoITLAG26.cuatitlanPresPor = agrupamientoITLAG26.cuatitlanIngr / agrupamientoITLAG26.cuatitlanPres;
    //   totalAgrupamientoITLAG26.cuatitlanPresAcPor = agrupamientoITLAG26.cuatitlanIngrAc / agrupamientoITLAG26.cuatitlanPresAc;
    //   totalAgrupamientoITLAG26.cuatitlanIngrAntPor = agrupamientoITLAG26.cuatitlanIngr / agrupamientoITLAG26.cuatitlanIngrAnt;
    //   totalAgrupamientoITLAG26.tultitlanPresPor = agrupamientoITLAG26.tultitlanIngr / agrupamientoITLAG26.tultitlanPres;
    //   totalAgrupamientoITLAG26.tultitlanPresAcPor = agrupamientoITLAG26.tultitlanIngrAc / agrupamientoITLAG26.tultitlanPresAc;
    //   totalAgrupamientoITLAG26.tultitlanIngrAntPor = agrupamientoITLAG26.tultitlanIngr / agrupamientoITLAG26.tultitlanIngrAnt;
    //   totalAgrupamientoITLAG26.guadalajaraPresPor = agrupamientoITLAG26.guadalajaraIngr / agrupamientoITLAG26.guadalajaraPres;
    //   totalAgrupamientoITLAG26.guadalajaraPresAcPor = agrupamientoITLAG26.guadalajaraIngrAc / agrupamientoITLAG26.guadalajaraPresAc;
    //   totalAgrupamientoITLAG26.guadalajaraIngrAntPor = agrupamientoITLAG26.guadalajaraIngr / agrupamientoITLAG26.guadalajaraIngrAnt;
    //   totalAgrupamientoITLAG26.hermosilloPresPor = agrupamientoITLAG26.hermosilloIngr / agrupamientoITLAG26.hermosilloPres;
    //   totalAgrupamientoITLAG26.hermosilloPresAcPor = agrupamientoITLAG26.hermosilloIngrAc / agrupamientoITLAG26.hermosilloPresAc;
    //   totalAgrupamientoITLAG26.hermosilloIngrAntPor = agrupamientoITLAG26.hermosilloIngr / agrupamientoITLAG26.hermosilloIngrAnt;
    //   totalAgrupamientoITLAG26.mexicaliPresPor = agrupamientoITLAG26.mexicaliIngr / agrupamientoITLAG26.mexicaliPres;
    //   totalAgrupamientoITLAG26.mexicaliPresAcPor = agrupamientoITLAG26.mexicaliIngrAc / agrupamientoITLAG26.mexicaliPresAc;
    //   totalAgrupamientoITLAG26.mexicaliIngrAntPor = agrupamientoITLAG26.mexicaliIngr / agrupamientoITLAG26.mexicaliIngrAnt;
    //   totalAgrupamientoITLAG26.orizabaPresPor = agrupamientoITLAG26.orizabaIngr / agrupamientoITLAG26.orizabaPres;
    //   totalAgrupamientoITLAG26.orizabaPresAcPor = agrupamientoITLAG26.orizabaIngrAc / agrupamientoITLAG26.orizabaPresAc;
    //   totalAgrupamientoITLAG26.orizabaIngrAntPor = agrupamientoITLAG26.orizabaIngr / agrupamientoITLAG26.orizabaIngrAnt;
    
    //   event.summaryCells[6][0].value = totalAgrupamientoITLAG26.cuatitlanPresPor;
    //   event.summaryCells[9][0].value = totalAgrupamientoITLAG26.cuatitlanPresAcPor;
    //   event.summaryCells[11][0].value = totalAgrupamientoITLAG26.cuatitlanIngrAntPor;
    //   event.summaryCells[14][0].value = totalAgrupamientoITLAG26.tultitlanPresPor;
    //   event.summaryCells[17][0].value = totalAgrupamientoITLAG26.tultitlanPresAcPor;
    //   event.summaryCells[19][0].value = totalAgrupamientoITLAG26.tultitlanIngrAntPor;
    //   event.summaryCells[22][0].value = totalAgrupamientoITLAG26.guadalajaraPresPor;
    //   event.summaryCells[25][0].value = totalAgrupamientoITLAG26.guadalajaraPresAcPor;
    //   event.summaryCells[27][0].value = totalAgrupamientoITLAG26.guadalajaraIngrAntPor;
    //   event.summaryCells[30][0].value = totalAgrupamientoITLAG26.hermosilloPresPor;
    //   event.summaryCells[33][0].value = totalAgrupamientoITLAG26.hermosilloPresAcPor;
    //   event.summaryCells[35][0].value = totalAgrupamientoITLAG26.hermosilloIngrAntPor;
    //   event.summaryCells[38][0].value = totalAgrupamientoITLAG26.mexicaliPresPor;
    //   event.summaryCells[41][0].value = totalAgrupamientoITLAG26.mexicaliPresAcPor;
    //   event.summaryCells[43][0].value = totalAgrupamientoITLAG26.mexicaliIngrAntPor;
    //   event.summaryCells[46][0].value = totalAgrupamientoITLAG26.orizabaPresPor;
    //   event.summaryCells[49][0].value = totalAgrupamientoITLAG26.orizabaPresAcPor;
    //   event.summaryCells[51][0].value = totalAgrupamientoITLAG26.orizabaIngrAntPor;
    // }
    // if(event.data.key == '202609 SEP'){
    //   agrupamientoITLS26.cuatitlanIngr = event.summaryCells[4][0].value;
    //   agrupamientoITLS26.cuatitlanPres = event.summaryCells[5][0].value;
    //   agrupamientoITLS26.cuatitlanIngrAc = event.summaryCells[7][0].value;
    //   agrupamientoITLS26.cuatitlanPresAc = event.summaryCells[8][0].value;
    //   agrupamientoITLS26.cuatitlanIngrAnt = event.summaryCells[10][0].value;
    //   agrupamientoITLS26.tultitlanIngr = event.summaryCells[12][0].value;
    //   agrupamientoITLS26.tultitlanPres = event.summaryCells[13][0].value;
    //   agrupamientoITLS26.tultitlanIngrAc = event.summaryCells[15][0].value;
    //   agrupamientoITLS26.tultitlanPresAc = event.summaryCells[16][0].value;
    //   agrupamientoITLS26.tultitlanIngrAnt = event.summaryCells[18][0].value;
    //   agrupamientoITLS26.guadalajaraIngr = event.summaryCells[20][0].value;
    //   agrupamientoITLS26.guadalajaraPres = event.summaryCells[21][0].value;
    //   agrupamientoITLS26.guadalajaraIngrAc = event.summaryCells[23][0].value;
    //   agrupamientoITLS26.guadalajaraPresAc = event.summaryCells[24][0].value;
    //   agrupamientoITLS26.guadalajaraIngrAnt = event.summaryCells[26][0].value;
    //   agrupamientoITLS26.hermosilloIngr = event.summaryCells[28][0].value;
    //   agrupamientoITLS26.hermosilloPres = event.summaryCells[29][0].value;
    //   agrupamientoITLS26.hermosilloIngrAc = event.summaryCells[31][0].value;
    //   agrupamientoITLS26.hermosilloPresAc = event.summaryCells[32][0].value;
    //   agrupamientoITLS26.hermosilloIngrAnt = event.summaryCells[34][0].value;
    //   agrupamientoITLS26.mexicaliIngr = event.summaryCells[36][0].value;
    //   agrupamientoITLS26.mexicaliPres = event.summaryCells[37][0].value;
    //   agrupamientoITLS26.mexicaliIngrAc = event.summaryCells[39][0].value;
    //   agrupamientoITLS26.mexicaliPresAc = event.summaryCells[40][0].value;
    //   agrupamientoITLS26.mexicaliIngrAnt = event.summaryCells[42][0].value;
    //   agrupamientoITLS26.orizabaIngr = event.summaryCells[44][0].value;
    //   agrupamientoITLS26.orizabaPres = event.summaryCells[45][0].value;
    //   agrupamientoITLS26.orizabaIngrAc = event.summaryCells[47][0].value;
    //   agrupamientoITLS26.orizabaPresAc = event.summaryCells[48][0].value;
    //   agrupamientoITLS26.orizabaIngrAnt = event.summaryCells[50][0].value;

    //   totalAgrupamientoITLS26.cuatitlanPresPor = agrupamientoITLS26.cuatitlanIngr / agrupamientoITLS26.cuatitlanPres;
    //   totalAgrupamientoITLS26.cuatitlanPresAcPor = agrupamientoITLS26.cuatitlanIngrAc / agrupamientoITLS26.cuatitlanPresAc;
    //   totalAgrupamientoITLS26.cuatitlanIngrAntPor = agrupamientoITLS26.cuatitlanIngr / agrupamientoITLS26.cuatitlanIngrAnt;
    //   totalAgrupamientoITLS26.tultitlanPresPor = agrupamientoITLS26.tultitlanIngr / agrupamientoITLS26.tultitlanPres;
    //   totalAgrupamientoITLS26.tultitlanPresAcPor = agrupamientoITLS26.tultitlanIngrAc / agrupamientoITLS26.tultitlanPresAc;
    //   totalAgrupamientoITLS26.tultitlanIngrAntPor = agrupamientoITLS26.tultitlanIngr / agrupamientoITLS26.tultitlanIngrAnt;
    //   totalAgrupamientoITLS26.guadalajaraPresPor = agrupamientoITLS26.guadalajaraIngr / agrupamientoITLS26.guadalajaraPres;
    //   totalAgrupamientoITLS26.guadalajaraPresAcPor = agrupamientoITLS26.guadalajaraIngrAc / agrupamientoITLS26.guadalajaraPresAc;
    //   totalAgrupamientoITLS26.guadalajaraIngrAntPor = agrupamientoITLS26.guadalajaraIngr / agrupamientoITLS26.guadalajaraIngrAnt;
    //   totalAgrupamientoITLS26.hermosilloPresPor = agrupamientoITLS26.hermosilloIngr / agrupamientoITLS26.hermosilloPres;
    //   totalAgrupamientoITLS26.hermosilloPresAcPor = agrupamientoITLS26.hermosilloIngrAc / agrupamientoITLS26.hermosilloPresAc;
    //   totalAgrupamientoITLS26.hermosilloIngrAntPor = agrupamientoITLS26.hermosilloIngr / agrupamientoITLS26.hermosilloIngrAnt;
    //   totalAgrupamientoITLS26.mexicaliPresPor = agrupamientoITLS26.mexicaliIngr / agrupamientoITLS26.mexicaliPres;
    //   totalAgrupamientoITLS26.mexicaliPresAcPor = agrupamientoITLS26.mexicaliIngrAc / agrupamientoITLS26.mexicaliPresAc;
    //   totalAgrupamientoITLS26.mexicaliIngrAntPor = agrupamientoITLS26.mexicaliIngr / agrupamientoITLS26.mexicaliIngrAnt;
    //   totalAgrupamientoITLS26.orizabaPresPor = agrupamientoITLS26.orizabaIngr / agrupamientoITLS26.orizabaPres;
    //   totalAgrupamientoITLS26.orizabaPresAcPor = agrupamientoITLS26.orizabaIngrAc / agrupamientoITLS26.orizabaPresAc;
    //   totalAgrupamientoITLS26.orizabaIngrAntPor = agrupamientoITLS26.orizabaIngr / agrupamientoITLS26.orizabaIngrAnt;
    
    //   event.summaryCells[6][0].value = totalAgrupamientoITLS26.cuatitlanPresPor;
    //   event.summaryCells[9][0].value = totalAgrupamientoITLS26.cuatitlanPresAcPor;
    //   event.summaryCells[11][0].value = totalAgrupamientoITLS26.cuatitlanIngrAntPor;
    //   event.summaryCells[14][0].value = totalAgrupamientoITLS26.tultitlanPresPor;
    //   event.summaryCells[17][0].value = totalAgrupamientoITLS26.tultitlanPresAcPor;
    //   event.summaryCells[19][0].value = totalAgrupamientoITLS26.tultitlanIngrAntPor;
    //   event.summaryCells[22][0].value = totalAgrupamientoITLS26.guadalajaraPresPor;
    //   event.summaryCells[25][0].value = totalAgrupamientoITLS26.guadalajaraPresAcPor;
    //   event.summaryCells[27][0].value = totalAgrupamientoITLS26.guadalajaraIngrAntPor;
    //   event.summaryCells[30][0].value = totalAgrupamientoITLS26.hermosilloPresPor;
    //   event.summaryCells[33][0].value = totalAgrupamientoITLS26.hermosilloPresAcPor;
    //   event.summaryCells[35][0].value = totalAgrupamientoITLS26.hermosilloIngrAntPor;
    //   event.summaryCells[38][0].value = totalAgrupamientoITLS26.mexicaliPresPor;
    //   event.summaryCells[41][0].value = totalAgrupamientoITLS26.mexicaliPresAcPor;
    //   event.summaryCells[43][0].value = totalAgrupamientoITLS26.mexicaliIngrAntPor;
    //   event.summaryCells[46][0].value = totalAgrupamientoITLS26.orizabaPresPor;
    //   event.summaryCells[49][0].value = totalAgrupamientoITLS26.orizabaPresAcPor;
    //   event.summaryCells[51][0].value = totalAgrupamientoITLS26.orizabaIngrAntPor;
    // }
    // if(event.data.key == '202610 OCT'){
    //   agrupamientoITLOC26.cuatitlanIngr = event.summaryCells[4][0].value;
    //   agrupamientoITLOC26.cuatitlanPres = event.summaryCells[5][0].value;
    //   agrupamientoITLOC26.cuatitlanIngrAc = event.summaryCells[7][0].value;
    //   agrupamientoITLOC26.cuatitlanPresAc = event.summaryCells[8][0].value;
    //   agrupamientoITLOC26.cuatitlanIngrAnt = event.summaryCells[10][0].value;
    //   agrupamientoITLOC26.tultitlanIngr = event.summaryCells[12][0].value;
    //   agrupamientoITLOC26.tultitlanPres = event.summaryCells[13][0].value;
    //   agrupamientoITLOC26.tultitlanIngrAc = event.summaryCells[15][0].value;
    //   agrupamientoITLOC26.tultitlanPresAc = event.summaryCells[16][0].value;
    //   agrupamientoITLOC26.tultitlanIngrAnt = event.summaryCells[18][0].value;
    //   agrupamientoITLOC26.guadalajaraIngr = event.summaryCells[20][0].value;
    //   agrupamientoITLOC26.guadalajaraPres = event.summaryCells[21][0].value;
    //   agrupamientoITLOC26.guadalajaraIngrAc = event.summaryCells[23][0].value;
    //   agrupamientoITLOC26.guadalajaraPresAc = event.summaryCells[24][0].value;
    //   agrupamientoITLOC26.guadalajaraIngrAnt = event.summaryCells[26][0].value;
    //   agrupamientoITLOC26.hermosilloIngr = event.summaryCells[28][0].value;
    //   agrupamientoITLOC26.hermosilloPres = event.summaryCells[29][0].value;
    //   agrupamientoITLOC26.hermosilloIngrAc = event.summaryCells[31][0].value;
    //   agrupamientoITLOC26.hermosilloPresAc = event.summaryCells[32][0].value;
    //   agrupamientoITLOC26.hermosilloIngrAnt = event.summaryCells[34][0].value;
    //   agrupamientoITLOC26.mexicaliIngr = event.summaryCells[36][0].value;
    //   agrupamientoITLOC26.mexicaliPres = event.summaryCells[37][0].value;
    //   agrupamientoITLOC26.mexicaliIngrAc = event.summaryCells[39][0].value;
    //   agrupamientoITLOC26.mexicaliPresAc = event.summaryCells[40][0].value;
    //   agrupamientoITLOC26.mexicaliIngrAnt = event.summaryCells[42][0].value;
    //   agrupamientoITLOC26.orizabaIngr = event.summaryCells[44][0].value;
    //   agrupamientoITLOC26.orizabaPres = event.summaryCells[45][0].value;
    //   agrupamientoITLOC26.orizabaIngrAc = event.summaryCells[47][0].value;
    //   agrupamientoITLOC26.orizabaPresAc = event.summaryCells[48][0].value;
    //   agrupamientoITLOC26.orizabaIngrAnt = event.summaryCells[50][0].value;

    //   totalAgrupamientoITLOC26.cuatitlanPresPor = agrupamientoITLOC26.cuatitlanIngr / agrupamientoITLOC26.cuatitlanPres;
    //   totalAgrupamientoITLOC26.cuatitlanPresAcPor = agrupamientoITLOC26.cuatitlanIngrAc / agrupamientoITLOC26.cuatitlanPresAc;
    //   totalAgrupamientoITLOC26.cuatitlanIngrAntPor = agrupamientoITLOC26.cuatitlanIngr / agrupamientoITLOC26.cuatitlanIngrAnt;
    //   totalAgrupamientoITLOC26.tultitlanPresPor = agrupamientoITLOC26.tultitlanIngr / agrupamientoITLOC26.tultitlanPres;
    //   totalAgrupamientoITLOC26.tultitlanPresAcPor = agrupamientoITLOC26.tultitlanIngrAc / agrupamientoITLOC26.tultitlanPresAc;
    //   totalAgrupamientoITLOC26.tultitlanIngrAntPor = agrupamientoITLOC26.tultitlanIngr / agrupamientoITLOC26.tultitlanIngrAnt;
    //   totalAgrupamientoITLOC26.guadalajaraPresPor = agrupamientoITLOC26.guadalajaraIngr / agrupamientoITLOC26.guadalajaraPres;
    //   totalAgrupamientoITLOC26.guadalajaraPresAcPor = agrupamientoITLOC26.guadalajaraIngrAc / agrupamientoITLOC26.guadalajaraPresAc;
    //   totalAgrupamientoITLOC26.guadalajaraIngrAntPor = agrupamientoITLOC26.guadalajaraIngr / agrupamientoITLOC26.guadalajaraIngrAnt;
    //   totalAgrupamientoITLOC26.hermosilloPresPor = agrupamientoITLOC26.hermosilloIngr / agrupamientoITLOC26.hermosilloPres;
    //   totalAgrupamientoITLOC26.hermosilloPresAcPor = agrupamientoITLOC26.hermosilloIngrAc / agrupamientoITLOC26.hermosilloPresAc;
    //   totalAgrupamientoITLOC26.hermosilloIngrAntPor = agrupamientoITLOC26.hermosilloIngr / agrupamientoITLOC26.hermosilloIngrAnt;
    //   totalAgrupamientoITLOC26.mexicaliPresPor = agrupamientoITLOC26.mexicaliIngr / agrupamientoITLOC26.mexicaliPres;
    //   totalAgrupamientoITLOC26.mexicaliPresAcPor = agrupamientoITLOC26.mexicaliIngrAc / agrupamientoITLOC26.mexicaliPresAc;
    //   totalAgrupamientoITLOC26.mexicaliIngrAntPor = agrupamientoITLOC26.mexicaliIngr / agrupamientoITLOC26.mexicaliIngrAnt;
    //   totalAgrupamientoITLOC26.orizabaPresPor = agrupamientoITLOC26.orizabaIngr / agrupamientoITLOC26.orizabaPres;
    //   totalAgrupamientoITLOC26.orizabaPresAcPor = agrupamientoITLOC26.orizabaIngrAc / agrupamientoITLOC26.orizabaPresAc;
    //   totalAgrupamientoITLOC26.orizabaIngrAntPor = agrupamientoITLOC26.orizabaIngr / agrupamientoITLOC26.orizabaIngrAnt;
    
    //   event.summaryCells[6][0].value = totalAgrupamientoITLOC26.cuatitlanPresPor;
    //   event.summaryCells[9][0].value = totalAgrupamientoITLOC26.cuatitlanPresAcPor;
    //   event.summaryCells[11][0].value = totalAgrupamientoITLOC26.cuatitlanIngrAntPor;
    //   event.summaryCells[14][0].value = totalAgrupamientoITLOC26.tultitlanPresPor;
    //   event.summaryCells[17][0].value = totalAgrupamientoITLOC26.tultitlanPresAcPor;
    //   event.summaryCells[19][0].value = totalAgrupamientoITLOC26.tultitlanIngrAntPor;
    //   event.summaryCells[22][0].value = totalAgrupamientoITLOC26.guadalajaraPresPor;
    //   event.summaryCells[25][0].value = totalAgrupamientoITLOC26.guadalajaraPresAcPor;
    //   event.summaryCells[27][0].value = totalAgrupamientoITLOC26.guadalajaraIngrAntPor;
    //   event.summaryCells[30][0].value = totalAgrupamientoITLOC26.hermosilloPresPor;
    //   event.summaryCells[33][0].value = totalAgrupamientoITLOC26.hermosilloPresAcPor;
    //   event.summaryCells[35][0].value = totalAgrupamientoITLOC26.hermosilloIngrAntPor;
    //   event.summaryCells[38][0].value = totalAgrupamientoITLOC26.mexicaliPresPor;
    //   event.summaryCells[41][0].value = totalAgrupamientoITLOC26.mexicaliPresAcPor;
    //   event.summaryCells[43][0].value = totalAgrupamientoITLOC26.mexicaliIngrAntPor;
    //   event.summaryCells[46][0].value = totalAgrupamientoITLOC26.orizabaPresPor;
    //   event.summaryCells[49][0].value = totalAgrupamientoITLOC26.orizabaPresAcPor;
    //   event.summaryCells[51][0].value = totalAgrupamientoITLOC26.orizabaIngrAntPor;
    // }
    // if(event.data.key == '202611 NOV'){
    //   agrupamientoITLNV26.cuatitlanIngr = event.summaryCells[4][0].value;
    //   agrupamientoITLNV26.cuatitlanPres = event.summaryCells[5][0].value;
    //   agrupamientoITLNV26.cuatitlanIngrAc = event.summaryCells[7][0].value;
    //   agrupamientoITLNV26.cuatitlanPresAc = event.summaryCells[8][0].value;
    //   agrupamientoITLNV26.cuatitlanIngrAnt = event.summaryCells[10][0].value;
    //   agrupamientoITLNV26.tultitlanIngr = event.summaryCells[12][0].value;
    //   agrupamientoITLNV26.tultitlanPres = event.summaryCells[13][0].value;
    //   agrupamientoITLNV26.tultitlanIngrAc = event.summaryCells[15][0].value;
    //   agrupamientoITLNV26.tultitlanPresAc = event.summaryCells[16][0].value;
    //   agrupamientoITLNV26.tultitlanIngrAnt = event.summaryCells[18][0].value;
    //   agrupamientoITLNV26.guadalajaraIngr = event.summaryCells[20][0].value;
    //   agrupamientoITLNV26.guadalajaraPres = event.summaryCells[21][0].value;
    //   agrupamientoITLNV26.guadalajaraIngrAc = event.summaryCells[23][0].value;
    //   agrupamientoITLNV26.guadalajaraPresAc = event.summaryCells[24][0].value;
    //   agrupamientoITLNV26.guadalajaraIngrAnt = event.summaryCells[26][0].value;
    //   agrupamientoITLNV26.hermosilloIngr = event.summaryCells[28][0].value;
    //   agrupamientoITLNV26.hermosilloPres = event.summaryCells[29][0].value;
    //   agrupamientoITLNV26.hermosilloIngrAc = event.summaryCells[31][0].value;
    //   agrupamientoITLNV26.hermosilloPresAc = event.summaryCells[32][0].value;
    //   agrupamientoITLNV26.hermosilloIngrAnt = event.summaryCells[34][0].value;
    //   agrupamientoITLNV26.mexicaliIngr = event.summaryCells[36][0].value;
    //   agrupamientoITLNV26.mexicaliPres = event.summaryCells[37][0].value;
    //   agrupamientoITLNV26.mexicaliIngrAc = event.summaryCells[39][0].value;
    //   agrupamientoITLNV26.mexicaliPresAc = event.summaryCells[40][0].value;
    //   agrupamientoITLNV26.mexicaliIngrAnt = event.summaryCells[42][0].value;
    //   agrupamientoITLNV26.orizabaIngr = event.summaryCells[44][0].value;
    //   agrupamientoITLNV26.orizabaPres = event.summaryCells[45][0].value;
    //   agrupamientoITLNV26.orizabaIngrAc = event.summaryCells[47][0].value;
    //   agrupamientoITLNV26.orizabaPresAc = event.summaryCells[48][0].value;
    //   agrupamientoITLNV26.orizabaIngrAnt = event.summaryCells[50][0].value;

    //   totalAgrupamientoITLNV26.cuatitlanPresPor = agrupamientoITLNV26.cuatitlanIngr / agrupamientoITLNV26.cuatitlanPres;
    //   totalAgrupamientoITLNV26.cuatitlanPresAcPor = agrupamientoITLNV26.cuatitlanIngrAc / agrupamientoITLNV26.cuatitlanPresAc;
    //   totalAgrupamientoITLNV26.cuatitlanIngrAntPor = agrupamientoITLNV26.cuatitlanIngr / agrupamientoITLNV26.cuatitlanIngrAnt;
    //   totalAgrupamientoITLNV26.tultitlanPresPor = agrupamientoITLNV26.tultitlanIngr / agrupamientoITLNV26.tultitlanPres;
    //   totalAgrupamientoITLNV26.tultitlanPresAcPor = agrupamientoITLNV26.tultitlanIngrAc / agrupamientoITLNV26.tultitlanPresAc;
    //   totalAgrupamientoITLNV26.tultitlanIngrAntPor = agrupamientoITLNV26.tultitlanIngr / agrupamientoITLNV26.tultitlanIngrAnt;
    //   totalAgrupamientoITLNV26.guadalajaraPresPor = agrupamientoITLNV26.guadalajaraIngr / agrupamientoITLNV26.guadalajaraPres;
    //   totalAgrupamientoITLNV26.guadalajaraPresAcPor = agrupamientoITLNV26.guadalajaraIngrAc / agrupamientoITLNV26.guadalajaraPresAc;
    //   totalAgrupamientoITLNV26.guadalajaraIngrAntPor = agrupamientoITLNV26.guadalajaraIngr / agrupamientoITLNV26.guadalajaraIngrAnt;
    //   totalAgrupamientoITLNV26.hermosilloPresPor = agrupamientoITLNV26.hermosilloIngr / agrupamientoITLNV26.hermosilloPres;
    //   totalAgrupamientoITLNV26.hermosilloPresAcPor = agrupamientoITLNV26.hermosilloIngrAc / agrupamientoITLNV26.hermosilloPresAc;
    //   totalAgrupamientoITLNV26.hermosilloIngrAntPor = agrupamientoITLNV26.hermosilloIngr / agrupamientoITLNV26.hermosilloIngrAnt;
    //   totalAgrupamientoITLNV26.mexicaliPresPor = agrupamientoITLNV26.mexicaliIngr / agrupamientoITLNV26.mexicaliPres;
    //   totalAgrupamientoITLNV26.mexicaliPresAcPor = agrupamientoITLNV26.mexicaliIngrAc / agrupamientoITLNV26.mexicaliPresAc;
    //   totalAgrupamientoITLNV26.mexicaliIngrAntPor = agrupamientoITLNV26.mexicaliIngr / agrupamientoITLNV26.mexicaliIngrAnt;
    //   totalAgrupamientoITLNV26.orizabaPresPor = agrupamientoITLNV26.orizabaIngr / agrupamientoITLNV26.orizabaPres;
    //   totalAgrupamientoITLNV26.orizabaPresAcPor = agrupamientoITLNV26.orizabaIngrAc / agrupamientoITLNV26.orizabaPresAc;
    //   totalAgrupamientoITLNV26.orizabaIngrAntPor = agrupamientoITLNV26.orizabaIngr / agrupamientoITLNV26.orizabaIngrAnt;
    
    //   event.summaryCells[6][0].value = totalAgrupamientoITLNV26.cuatitlanPresPor;
    //   event.summaryCells[9][0].value = totalAgrupamientoITLNV26.cuatitlanPresAcPor;
    //   event.summaryCells[11][0].value = totalAgrupamientoITLNV26.cuatitlanIngrAntPor;
    //   event.summaryCells[14][0].value = totalAgrupamientoITLNV26.tultitlanPresPor;
    //   event.summaryCells[17][0].value = totalAgrupamientoITLNV26.tultitlanPresAcPor;
    //   event.summaryCells[19][0].value = totalAgrupamientoITLNV26.tultitlanIngrAntPor;
    //   event.summaryCells[22][0].value = totalAgrupamientoITLNV26.guadalajaraPresPor;
    //   event.summaryCells[25][0].value = totalAgrupamientoITLNV26.guadalajaraPresAcPor;
    //   event.summaryCells[27][0].value = totalAgrupamientoITLNV26.guadalajaraIngrAntPor;
    //   event.summaryCells[30][0].value = totalAgrupamientoITLNV26.hermosilloPresPor;
    //   event.summaryCells[33][0].value = totalAgrupamientoITLNV26.hermosilloPresAcPor;
    //   event.summaryCells[35][0].value = totalAgrupamientoITLNV26.hermosilloIngrAntPor;
    //   event.summaryCells[38][0].value = totalAgrupamientoITLNV26.mexicaliPresPor;
    //   event.summaryCells[41][0].value = totalAgrupamientoITLNV26.mexicaliPresAcPor;
    //   event.summaryCells[43][0].value = totalAgrupamientoITLNV26.mexicaliIngrAntPor;
    //   event.summaryCells[46][0].value = totalAgrupamientoITLNV26.orizabaPresPor;
    //   event.summaryCells[49][0].value = totalAgrupamientoITLNV26.orizabaPresAcPor;
    //   event.summaryCells[51][0].value = totalAgrupamientoITLNV26.orizabaIngrAntPor;
    // }

    // if(event.data.key == '202612 DIC'){
    //   agrupamientoITLDC26.cuatitlanIngr = event.summaryCells[4][0].value;
    //   agrupamientoITLDC26.cuatitlanPres = event.summaryCells[5][0].value;
    //   agrupamientoITLDC26.cuatitlanIngrAc = event.summaryCells[7][0].value;
    //   agrupamientoITLDC26.cuatitlanPresAc = event.summaryCells[8][0].value;
    //   agrupamientoITLDC26.cuatitlanIngrAnt = event.summaryCells[10][0].value;
    //   agrupamientoITLDC26.tultitlanIngr = event.summaryCells[12][0].value;
    //   agrupamientoITLDC26.tultitlanPres = event.summaryCells[13][0].value;
    //   agrupamientoITLDC26.tultitlanIngrAc = event.summaryCells[15][0].value;
    //   agrupamientoITLDC26.tultitlanPresAc = event.summaryCells[16][0].value;
    //   agrupamientoITLDC26.tultitlanIngrAnt = event.summaryCells[18][0].value;
    //   agrupamientoITLDC26.guadalajaraIngr = event.summaryCells[20][0].value;
    //   agrupamientoITLDC26.guadalajaraPres = event.summaryCells[21][0].value;
    //   agrupamientoITLDC26.guadalajaraIngrAc = event.summaryCells[23][0].value;
    //   agrupamientoITLDC26.guadalajaraPresAc = event.summaryCells[24][0].value;
    //   agrupamientoITLDC26.guadalajaraIngrAnt = event.summaryCells[26][0].value;
    //   agrupamientoITLDC26.hermosilloIngr = event.summaryCells[28][0].value;
    //   agrupamientoITLDC26.hermosilloPres = event.summaryCells[29][0].value;
    //   agrupamientoITLDC26.hermosilloIngrAc = event.summaryCells[31][0].value;
    //   agrupamientoITLDC26.hermosilloPresAc = event.summaryCells[32][0].value;
    //   agrupamientoITLDC26.hermosilloIngrAnt = event.summaryCells[34][0].value;
    //   agrupamientoITLDC26.mexicaliIngr = event.summaryCells[36][0].value;
    //   agrupamientoITLDC26.mexicaliPres = event.summaryCells[37][0].value;
    //   agrupamientoITLDC26.mexicaliIngrAc = event.summaryCells[39][0].value;
    //   agrupamientoITLDC26.mexicaliPresAc = event.summaryCells[40][0].value;
    //   agrupamientoITLDC26.mexicaliIngrAnt = event.summaryCells[42][0].value;
    //   agrupamientoITLDC26.orizabaIngr = event.summaryCells[44][0].value;
    //   agrupamientoITLDC26.orizabaPres = event.summaryCells[45][0].value;
    //   agrupamientoITLDC26.orizabaIngrAc = event.summaryCells[47][0].value;
    //   agrupamientoITLDC26.orizabaPresAc = event.summaryCells[48][0].value;
    //   agrupamientoITLDC26.orizabaIngrAnt = event.summaryCells[50][0].value;

    //   totalAgrupamientoITLDC26.cuatitlanPresPor = agrupamientoITLDC26.cuatitlanIngr / agrupamientoITLDC26.cuatitlanPres;
    //   totalAgrupamientoITLDC26.cuatitlanPresAcPor = agrupamientoITLDC26.cuatitlanIngrAc / agrupamientoITLDC26.cuatitlanPresAc;
    //   totalAgrupamientoITLDC26.cuatitlanIngrAntPor = agrupamientoITLDC26.cuatitlanIngr / agrupamientoITLDC26.cuatitlanIngrAnt;
    //   totalAgrupamientoITLDC26.tultitlanPresPor = agrupamientoITLDC26.tultitlanIngr / agrupamientoITLDC26.tultitlanPres;
    //   totalAgrupamientoITLDC26.tultitlanPresAcPor = agrupamientoITLDC26.tultitlanIngrAc / agrupamientoITLDC26.tultitlanPresAc;
    //   totalAgrupamientoITLDC26.tultitlanIngrAntPor = agrupamientoITLDC26.tultitlanIngr / agrupamientoITLDC26.tultitlanIngrAnt;
    //   totalAgrupamientoITLDC26.guadalajaraPresPor = agrupamientoITLDC26.guadalajaraIngr / agrupamientoITLDC26.guadalajaraPres;
    //   totalAgrupamientoITLDC26.guadalajaraPresAcPor = agrupamientoITLDC26.guadalajaraIngrAc / agrupamientoITLDC26.guadalajaraPresAc;
    //   totalAgrupamientoITLDC26.guadalajaraIngrAntPor = agrupamientoITLDC26.guadalajaraIngr / agrupamientoITLDC26.guadalajaraIngrAnt;
    //   totalAgrupamientoITLDC26.hermosilloPresPor = agrupamientoITLDC26.hermosilloIngr / agrupamientoITLDC26.hermosilloPres;
    //   totalAgrupamientoITLDC26.hermosilloPresAcPor = agrupamientoITLDC26.hermosilloIngrAc / agrupamientoITLDC26.hermosilloPresAc;
    //   totalAgrupamientoITLDC26.hermosilloIngrAntPor = agrupamientoITLDC26.hermosilloIngr / agrupamientoITLDC26.hermosilloIngrAnt;
    //   totalAgrupamientoITLDC26.mexicaliPresPor = agrupamientoITLDC26.mexicaliIngr / agrupamientoITLDC26.mexicaliPres;
    //   totalAgrupamientoITLDC26.mexicaliPresAcPor = agrupamientoITLDC26.mexicaliIngrAc / agrupamientoITLDC26.mexicaliPresAc;
    //   totalAgrupamientoITLDC26.mexicaliIngrAntPor = agrupamientoITLDC26.mexicaliIngr / agrupamientoITLDC26.mexicaliIngrAnt;
    //   totalAgrupamientoITLDC26.orizabaPresPor = agrupamientoITLDC26.orizabaIngr / agrupamientoITLDC26.orizabaPres;
    //   totalAgrupamientoITLDC26.orizabaPresAcPor = agrupamientoITLDC26.orizabaIngrAc / agrupamientoITLDC26.orizabaPresAc;
    //   totalAgrupamientoITLDC26.orizabaIngrAntPor = agrupamientoITLDC26.orizabaIngr / agrupamientoITLDC26.orizabaIngrAnt;
    
    //   event.summaryCells[6][0].value = totalAgrupamientoITLDC26.cuatitlanPresPor;
    //   event.summaryCells[9][0].value = totalAgrupamientoITLDC26.cuatitlanPresAcPor;
    //   event.summaryCells[11][0].value = totalAgrupamientoITLDC26.cuatitlanIngrAntPor;
    //   event.summaryCells[14][0].value = totalAgrupamientoITLDC26.tultitlanPresPor;
    //   event.summaryCells[17][0].value = totalAgrupamientoITLDC26.tultitlanPresAcPor;
    //   event.summaryCells[19][0].value = totalAgrupamientoITLDC26.tultitlanIngrAntPor;
    //   event.summaryCells[22][0].value = totalAgrupamientoITLDC26.guadalajaraPresPor;
    //   event.summaryCells[25][0].value = totalAgrupamientoITLDC26.guadalajaraPresAcPor;
    //   event.summaryCells[27][0].value = totalAgrupamientoITLDC26.guadalajaraIngrAntPor;
    //   event.summaryCells[30][0].value = totalAgrupamientoITLDC26.hermosilloPresPor;
    //   event.summaryCells[33][0].value = totalAgrupamientoITLDC26.hermosilloPresAcPor;
    //   event.summaryCells[35][0].value = totalAgrupamientoITLDC26.hermosilloIngrAntPor;
    //   event.summaryCells[38][0].value = totalAgrupamientoITLDC26.mexicaliPresPor;
    //   event.summaryCells[41][0].value = totalAgrupamientoITLDC26.mexicaliPresAcPor;
    //   event.summaryCells[43][0].value = totalAgrupamientoITLDC26.mexicaliIngrAntPor;
    //   event.summaryCells[46][0].value = totalAgrupamientoITLDC26.orizabaPresPor;
    //   event.summaryCells[49][0].value = totalAgrupamientoITLDC26.orizabaPresAcPor;
    //   event.summaryCells[51][0].value = totalAgrupamientoITLDC26.orizabaIngrAntPor;
    // }
    
  }
}

onCellPreparedITL2026(e){
  if (e.rowType == 'group'){

    e.cellElement.style.fontSize = '12px';
    e.cellElement.style.background = "#DCDCDC";
  }

  if (e.rowType == 'totalFooter') {
  
    e.totalItem.cells.forEach((c: any) => {

      if (c.cellElement) {
        c.cellElement.style.fontWeight = "bolder";
        c.cellElement.style.fontSize = "16px";
        c.cellElement.style.background = "#ff9460";
        c.cellElement.style.color = "black"; 
    }   

    totalOperacionITL26.cuatitlanIngr = c.totalItem.summaryCells[4][0].value;
    totalOperacionITL26.cuatitlanPres = c.totalItem.summaryCells[5][0].value;
    totalOperacionITL26.cuatitlanIngrAc = c.totalItem.summaryCells[7][0].value;
    totalOperacionITL26.cuatitlanPresAc = c.totalItem.summaryCells[8][0].value;
    totalOperacionITL26.cuatitlanIngrAnt = c.totalItem.summaryCells[10][0].value;
    totalOperacionITL26.tultitlanIngr = c.totalItem.summaryCells[12][0].value;
    totalOperacionITL26.tultitlanPres = c.totalItem.summaryCells[13][0].value;
    totalOperacionITL26.tultitlanIngrAc = c.totalItem.summaryCells[15][0].value;
    totalOperacionITL26.tultitlanPresAc = c.totalItem.summaryCells[16][0].value;
    totalOperacionITL26.tultitlanIngrAnt = c.totalItem.summaryCells[18][0].value;
    totalOperacionITL26.guadalajaraIngr = c.totalItem.summaryCells[20][0].value;
    totalOperacionITL26.guadalajaraPres = c.totalItem.summaryCells[21][0].value;
    totalOperacionITL26.guadalajaraIngrAc = c.totalItem.summaryCells[23][0].value;
    totalOperacionITL26.guadalajaraPresAc = c.totalItem.summaryCells[24][0].value;
    totalOperacionITL26.guadalajaraIngrAnt = c.totalItem.summaryCells[26][0].value;
    totalOperacionITL26.hermosilloIngr = c.totalItem.summaryCells[28][0].value;
    totalOperacionITL26.hermosilloPres = c.totalItem.summaryCells[29][0].value;
    totalOperacionITL26.hermosilloIngrAc = c.totalItem.summaryCells[31][0].value;
    totalOperacionITL26.hermosilloPresAc = c.totalItem.summaryCells[32][0].value;
    totalOperacionITL26.hermosilloIngrAnt = c.totalItem.summaryCells[34][0].value;
    totalOperacionITL26.mexicaliIngr = c.totalItem.summaryCells[36][0].value;
    totalOperacionITL26.mexicaliPres = c.totalItem.summaryCells[37][0].value;
    totalOperacionITL26.mexicaliIngrAc = c.totalItem.summaryCells[39][0].value;
    totalOperacionITL26.mexicaliPresAc = c.totalItem.summaryCells[40][0].value;
    totalOperacionITL26.mexicaliIngrAnt = c.totalItem.summaryCells[42][0].value;
    totalOperacionITL26.orizabaIngr = c.totalItem.summaryCells[44][0].value;
    totalOperacionITL26.orizabaPres = c.totalItem.summaryCells[45][0].value;
    totalOperacionITL26.orizabaIngrAc = c.totalItem.summaryCells[47][0].value;
    totalOperacionITL26.orizabaPresAc = c.totalItem.summaryCells[48][0].value;
    totalOperacionITL26.orizabaIngrAnt = c.totalItem.summaryCells[50][0].value;
    
    totalOperacionITL26.cuatitlanIngr === 0 ? c.totalItem.summaryCells[6][0].value = 0 : c.totalItem.summaryCells[6][0].value = totalOperacionITL26.cuatitlanIngr / totalOperacionITL26.cuatitlanPres;
    totalOperacionITL26.cuatitlanIngrAc == 0 ? c.totalItem.summaryCells[9][0].value = 0 : c.totalItem.summaryCells[9][0].value =   totalOperacionITL26.cuatitlanIngrAc / totalOperacionITL26.cuatitlanPresAc;
    totalOperacionITL26.cuatitlanIngr == 0 ? c.totalItem.summaryCells[11][0].value = 0 : c.totalItem.summaryCells[11][0].value =   totalOperacionITL26.cuatitlanIngr / totalOperacionITL26.cuatitlanIngrAnt;
    totalOperacionITL26.tultitlanIngr == 0 ? c.totalItem.summaryCells[14][0].value = 0 : c.totalItem.summaryCells[14][0].value =   totalOperacionITL26.tultitlanIngr / totalOperacionITL26.tultitlanPres;
    totalOperacionITL26.tultitlanIngrAc == 0 ? c.totalItem.summaryCells[17][0].value = 0 : c.totalItem.summaryCells[17][0].value =   totalOperacionITL26.tultitlanIngrAc / totalOperacionITL26.tultitlanPresAc;
    totalOperacionITL26.tultitlanIngr == 0 ? c.totalItem.summaryCells[19][0].value = 0 : c.totalItem.summaryCells[19][0].value =   totalOperacionITL26.tultitlanIngr / totalOperacionITL26.tultitlanIngrAnt;
    totalOperacionITL26.guadalajaraIngr == 0 ? c.totalItem.summaryCells[22][0].value = 0 : c.totalItem.summaryCells[22][0].value =   totalOperacionITL26.guadalajaraIngr / totalOperacionITL26.guadalajaraPres;
    totalOperacionITL26.guadalajaraIngrAc == 0 ? c.totalItem.summaryCells[25][0].value = 0 : c.totalItem.summaryCells[25][0].value =   totalOperacionITL26.guadalajaraIngrAc / totalOperacionITL26.guadalajaraPresAc;
    totalOperacionITL26.guadalajaraIngr == 0 ? c.totalItem.summaryCells[27][0].value = 0 : c.totalItem.summaryCells[27][0].value =   totalOperacionITL26.guadalajaraIngr / totalOperacionITL26.guadalajaraIngrAnt;
    totalOperacionITL26.hermosilloIngr == 0 ? c.totalItem.summaryCells[30][0].value = 0 : c.totalItem.summaryCells[30][0].value =   totalOperacionITL26.hermosilloIngr / totalOperacionITL26.hermosilloPres;
    totalOperacionITL26.hermosilloIngrAc == 0 ? c.totalItem.summaryCells[33][0].value = 0 : c.totalItem.summaryCells[33][0].value =   totalOperacionITL26.hermosilloIngrAc / totalOperacionITL26.hermosilloPresAc;
    totalOperacionITL26.hermosilloIngr == 0 ? c.totalItem.summaryCells[35][0].value = 0 : c.totalItem.summaryCells[35][0].value =   totalOperacionITL26.hermosilloIngr / totalOperacionITL26.hermosilloIngrAnt;
    totalOperacionITL26.mexicaliIngr == 0 ? c.totalItem.summaryCells[38][0].value = 0 : c.totalItem.summaryCells[38][0].value =   totalOperacionITL26.mexicaliIngr / totalOperacionITL26.mexicaliPres;
    totalOperacionITL26.mexicaliIngrAc == 0 ? c.totalItem.summaryCells[41][0].value = 0 : c.totalItem.summaryCells[41][0].value =   totalOperacionITL26.mexicaliIngrAc / totalOperacionITL26.mexicaliPresAc;
    totalOperacionITL26.mexicaliIngr == 0 ? c.totalItem.summaryCells[43][0].value = 0 : c.totalItem.summaryCells[43][0].value =   totalOperacionITL26.mexicaliIngr / totalOperacionITL26.mexicaliIngrAnt;
    totalOperacionITL26.orizabaIngr == 0 ? c.totalItem.summaryCells[46][0].value = 0 : c.totalItem.summaryCells[46][0].value =   totalOperacionITL26.orizabaIngr / totalOperacionITL26.orizabaPres;
    totalOperacionITL26.orizabaIngrAc == 0 ? c.totalItem.summaryCells[49][0].value = 0 : c.totalItem.summaryCells[49][0].value =   totalOperacionITL26.orizabaIngrAc / totalOperacionITL26.orizabaPresAc;
    totalOperacionITL26.orizabaIngr == 0 ? c.totalItem.summaryCells[51][0].value = 0 : c.totalItem.summaryCells[51][0].value =   totalOperacionITL26.orizabaIngr / totalOperacionITL26.orizabaIngrAnt;
      

    totalIngresosTL26.cuatitlanPresPor = c.totalItem.summaryCells[6][0].value;
    totalIngresosTL26.cuatitlanPresAcPor = c.totalItem.summaryCells[9][0].value;
    totalIngresosTL26.cuatitlanIngrAntPor = c.totalItem.summaryCells[11][0].value;
    totalIngresosTL26.tultitlanPresPor = c.totalItem.summaryCells[14][0].value;
    totalIngresosTL26.tultitlanPresAcPor = c.totalItem.summaryCells[17][0].value;
    totalIngresosTL26.tultitlanIngrAntPor = c.totalItem.summaryCells[19][0].value;
    totalIngresosTL26.guadalajaraPresPor = c.totalItem.summaryCells[22][0].value;
    totalIngresosTL26.guadalajaraPresAcPor = c.totalItem.summaryCells[25][0].value;
    totalIngresosTL26.guadalajaraIngrAntPor = c.totalItem.summaryCells[27][0].value;
    totalIngresosTL26.hermosilloPresPor = c.totalItem.summaryCells[30][0].value;
    totalIngresosTL26.hermosilloPresAcPor = c.totalItem.summaryCells[33][0].value;
    totalIngresosTL26.hermosilloIngrAntPor = c.totalItem.summaryCells[35][0].value;
    totalIngresosTL26.mexicaliPresPor = c.totalItem.summaryCells[38][0].value;
    totalIngresosTL26.mexicaliPresAcPor = c.totalItem.summaryCells[41][0].value;
    totalIngresosTL26.mexicaliIngrAntPor = c.totalItem.summaryCells[43][0].value;
    totalIngresosTL26.orizabaPresPor = c.totalItem.summaryCells[46][0].value;
    totalIngresosTL26.orizabaPresAcPor = c.totalItem.summaryCells[49][0].value;
    totalIngresosTL26.orizabaIngrAntPor = c.totalItem.summaryCells[51][0].value;
    })
  }
}

onRowPreparedI2026(event){

  if (event.rowType == 'group'){
    if (event.data.key == '202601 ENE') {

      if(event.summaryCells[4].length !== 0){
      agrupamientoIE26.cuautitlan = event.summaryCells[4][0].value;
      }
      if(event.summaryCells[5].length !== 0){
        agrupamientoIE26.tultitlan = event.summaryCells[5][0].value;
      }
      if(event.summaryCells[6].length !== 0){
        agrupamientoIE26.guadalajara = event.summaryCells[6][0].value;
      }
      if(event.summaryCells[7].length !== 0){
        agrupamientoIE26.hermosillo = event.summaryCells[7][0].value;
      }
      if(event.summaryCells[8].length !== 0){
        agrupamientoIE26.mexicali = event.summaryCells[8][0].value;
      }
      if(event.summaryCells[9].length !== 0){
        agrupamientoIE26.orizaba = event.summaryCells[9][0].value;
      }
      // if(event.summaryCells[10].length !== 0){
      //   agrupamientoIE26.ramosArispe = event.summaryCells[10][0].value;
      // }
      if(event.summaryCells[10].length !== 0){
        agrupamientoIE26.total = event.summaryCells[10][0].value;
      }
    }
    if (event.data.key == '202602 FEB'){
      agrupamientoIF26.cuautitlan = event.summaryCells[4][0]?.value;
      agrupamientoIF26.tultitlan = event.summaryCells[5][0]?.value;
      agrupamientoIF26.guadalajara = event.summaryCells[6][0]?.value;
      agrupamientoIF26.hermosillo = event.summaryCells[7][0]?.value;
      agrupamientoIF26.mexicali = event.summaryCells[8][0]?.value;
      agrupamientoIF26.orizaba = event.summaryCells[9][0]?.value;
      // agrupamientoIF26.ramosArispe = event.summaryCells[10][0]?.value;
      agrupamientoIF26.total = event.summaryCells[10][0]?.value;
    }
    if (event.data.key == '202603 MAR'){
      agrupamientoIM26.cuautitlan = event.summaryCells[4][0]?.value;
      agrupamientoIM26.tultitlan = event.summaryCells[5][0]?.value;
      agrupamientoIM26.guadalajara = event.summaryCells[6][0]?.value;
      agrupamientoIM26.hermosillo = event.summaryCells[7][0]?.value;
      agrupamientoIM26.mexicali = event.summaryCells[8][0]?.value;
      agrupamientoIM26.orizaba = event.summaryCells[9][0]?.value;
      // agrupamientoIM26.ramosArispe = event.summaryCells[10][0]?.value;
      agrupamientoIM26.total = event.summaryCells[10][0]?.value;
    }
     if (event.data.key == '202604 ABR'){
       agrupamientoIA26.cuautitlan = event.summaryCells[4][0]?.value;
       agrupamientoIA26.tultitlan = event.summaryCells[5][0]?.value;
       agrupamientoIA26.guadalajara = event.summaryCells[6][0]?.value;
       agrupamientoIA26.hermosillo = event.summaryCells[7][0]?.value;
       agrupamientoIA26.mexicali = event.summaryCells[8][0]?.value;
       agrupamientoIA26.orizaba = event.summaryCells[9][0]?.value;
       // agrupamientoIA26.ramosArispe = event.summaryCells[10][0]?.value;
       agrupamientoIA26.total = event.summaryCells[10][0]?.value;
     }
    // if (event.data.key == '202605 MAY'){
    //   agrupamientoIMY26.cuautitlan = event.summaryCells[4][0]?.value;
    //   agrupamientoIMY26.tultitlan = event.summaryCells[5][0]?.value;
    //   agrupamientoIMY26.guadalajara = event.summaryCells[6][0]?.value;
    //   agrupamientoIMY26.hermosillo = event.summaryCells[7][0]?.value;
    //   agrupamientoIMY26.mexicali = event.summaryCells[8][0]?.value;
    //   agrupamientoIMY26.orizaba = event.summaryCells[9][0]?.value;
    //   // agrupamientoIMY26.ramosArispe = event.summaryCells[10][0]?.value;
    //   agrupamientoIMY26.total = event.summaryCells[10][0]?.value;
    // }
    // if (event.data.key == '202606 JUN'){
    //   agrupamientoIJN26.cuautitlan = event.summaryCells[4][0]?.value;
    //   agrupamientoIJN26.tultitlan = event.summaryCells[5][0]?.value;
    //   agrupamientoIJN26.guadalajara = event.summaryCells[6][0]?.value;
    //   agrupamientoIJN26.hermosillo = event.summaryCells[7][0]?.value;
    //   agrupamientoIJN26.mexicali = event.summaryCells[8][0]?.value;
    //   agrupamientoIJN26.orizaba = event.summaryCells[9][0]?.value;
    //   // agrupamientoIJN26.ramosArispe = event.summaryCells[10][0]?.value;
    //   agrupamientoIJN26.total = event.summaryCells[10][0]?.value;
    // }
    // if (event.data.key == '202607 JUL'){
    //   agrupamientoIJL26.cuautitlan = event.summaryCells[4][0]?.value;
    //   agrupamientoIJL26.tultitlan = event.summaryCells[5][0]?.value;
    //   agrupamientoIJL26.guadalajara = event.summaryCells[6][0]?.value;
    //   agrupamientoIJL26.hermosillo = event.summaryCells[7][0]?.value;
    //   agrupamientoIJL26.mexicali = event.summaryCells[8][0]?.value;
    //   agrupamientoIJL26.orizaba = event.summaryCells[9][0]?.value;
    //   // agrupamientoIJL26.ramosArispe = event.summaryCells[10][0]?.value;
    //   agrupamientoIJL26.total = event.summaryCells[10][0]?.value;
    // }
    // if (event.data.key == '202608 AGO'){
    //   agrupamientoIAG26.cuautitlan = event.summaryCells[4][0]?.value;
    //   agrupamientoIAG26.tultitlan = event.summaryCells[5][0]?.value;
    //   agrupamientoIAG26.guadalajara = event.summaryCells[6][0]?.value;
    //   agrupamientoIAG26.hermosillo = event.summaryCells[7][0]?.value;
    //   agrupamientoIAG26.mexicali = event.summaryCells[8][0]?.value;
    //   agrupamientoIAG26.orizaba = event.summaryCells[9][0]?.value;
    //   // agrupamientoIAG26.ramosArispe = event.summaryCells[10][0]?.value;
    //   agrupamientoIAG26.total = event.summaryCells[10][0]?.value;
    // }
    // if (event.data.key == '202609 SEP'){
    //   agrupamientoIS26.cuautitlan = event.summaryCells[4][0].value;
    //   agrupamientoIS26.tultitlan = event.summaryCells[5][0].value;
    //   agrupamientoIS26.guadalajara = event.summaryCells[6][0].value;
    //   agrupamientoIS26.hermosillo = event.summaryCells[7][0].value;
    //   agrupamientoIS26.mexicali = event.summaryCells[8][0].value;
    //   agrupamientoIS26.orizaba = event.summaryCells[9][0].value;
    //   // agrupamientoIS26.ramosArispe = event.summaryCells[10][0].value;
    //   agrupamientoIS26.total = event.summaryCells[10][0].value;
    // }
    // if (event.data.key == '202610 OCT'){
    //   agrupamientoIOC26.cuautitlan = event.summaryCells[4][0].value;
    //   agrupamientoIOC26.tultitlan = event.summaryCells[5][0].value;
    //   agrupamientoIOC26.guadalajara = event.summaryCells[6][0].value;
    //   agrupamientoIOC26.hermosillo = event.summaryCells[7][0].value;
    //   agrupamientoIOC26.mexicali = event.summaryCells[8][0].value;
    //   agrupamientoIOC26.orizaba = event.summaryCells[9][0].value;
    //   // agrupamientoIOC26.ramosArispe = event.summaryCells[10][0].value;
    //   agrupamientoIOC26.total = event.summaryCells[10][0].value;
    // }
    // if (event.data.key == '202611 NOV'){
    //   agrupamientoINV26.cuautitlan = event.summaryCells[4][0].value;
    //   agrupamientoINV26.tultitlan = event.summaryCells[5][0].value;
    //   agrupamientoINV26.guadalajara = event.summaryCells[6][0].value;
    //   agrupamientoINV26.hermosillo = event.summaryCells[7][0].value;
    //   agrupamientoINV26.mexicali = event.summaryCells[8][0].value;
    //   agrupamientoINV26.orizaba = event.summaryCells[9][0].value;
    //   // agrupamientoINV26.ramosArispe = event.summaryCells[10][0].value;
    //   agrupamientoINV26.total = event.summaryCells[10][0].value;
    // }
    // if (event.data.key == '202612 DIC'){
    //   agrupamientoIDC26.cuautitlan = event.summaryCells[4][0].value;
    //   agrupamientoIDC26.tultitlan = event.summaryCells[5][0].value;
    //   agrupamientoIDC26.guadalajara = event.summaryCells[6][0].value;
    //   agrupamientoIDC26.hermosillo = event.summaryCells[7][0].value;
    //   agrupamientoIDC26.mexicali = event.summaryCells[8][0].value;
    //   agrupamientoIDC26.orizaba = event.summaryCells[9][0].value;
    //   // agrupamientoIDC26.ramosArispe = event.summaryCells[10][0].value;
    //   agrupamientoIDC26.total = event.summaryCells[10][0].value;
    // }
  }

  if(event.rowType == "totalFooter"){
    totalIngresos26.cuautitlan = event.summaryCells[4][0]?.value;
    totalIngresos26.tultitlan = event.summaryCells[5][0]?.value;
    totalIngresos26.guadalajara = event.summaryCells[6][0]?.value;
    totalIngresos26.hermosillo = event.summaryCells[7][0]?.value;
    totalIngresos26.mexicali = event.summaryCells[8][0]?.value;
    totalIngresos26.orizaba = event.summaryCells[9][0]?.value;
    // totalIngresos26.ramosArispe = event.summaryCells[10][0].value;
    totalIngresos26.total = event.summaryCells[10][0].value;
  }
}
onCellPreparedI2026(e: any) {
  if (e.rowType == 'group'){

    e.cellElement.style.fontSize = '12px';
    e.cellElement.style.background = "#DCDCDC";
  }

  if (e.rowType == 'totalFooter') {
    e.totalItem.cells.forEach((c: any) => {
      if (c.cellElement) {
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "16px";
          c.cellElement.style.background = "#ff9460";
          c.cellElement.style.color = "black"; 
      }   
    });
  }
}
customizeI2026(e) {  

  var gridCell = e.gridCell;
  if (gridCell.rowType === 'group') {
    
    e.backgroundColor = "#DCDCDC";
    e.fontWeight = "bolder"
    e.font = {bold: true}

}

if (gridCell.rowType === 'totalFooter') {
    
  e.backgroundColor = "#ff9460";
  e.fontWeight = "bolder"
  e.font = {bold: true}

}
}
//==============================KILOMETROS 2026=======================================
onRowPreparedK2026(e){

  if (e.rowType == 'group'){
    console.log()
    if (e.data.key == '202601 ENE') {

      if(e.summaryCells[4].length !== 0){
      agrupamientoKE26.cuautitlan = e.summaryCells[4][0].value;
      }
      if(e.summaryCells[5].length !== 0){
        agrupamientoKE26.tultitlan = e.summaryCells[5][0].value;
      }
      if(e.summaryCells[6].length !== 0){
        agrupamientoKE26.guadalajara = e.summaryCells[6][0].value;
      }
      if(e.summaryCells[7].length !== 0){
        agrupamientoKE26.hermosillo = e.summaryCells[7][0].value;
      }
      if(e.summaryCells[8].length !== 0){
        agrupamientoKE26.mexicali = e.summaryCells[8][0].value;
      }
      if(e.summaryCells[9].length !== 0){
        agrupamientoKE26.orizaba = e.summaryCells[9][0].value;
      }
      // if(e.summaryCells[10].length !== 0){
      //   agrupamientoKE26.ramosArispe = e.summaryCells[10][0].value;
      // }
      if(e.summaryCells[10].length !== 0){
        agrupamientoKE26.total = e.summaryCells[10][0].value;
      }

      totalAgrupamientoIKE26.cuautitlan = agrupamientoIE26.cuautitlan / agrupamientoKE26.cuautitlan;
      totalAgrupamientoIKE26.tultitlan = agrupamientoIE26.tultitlan / agrupamientoKE26.tultitlan;
      totalAgrupamientoIKE26.guadalajara = agrupamientoIE26.guadalajara / agrupamientoKE26.guadalajara;
      totalAgrupamientoIKE26.hermosillo = agrupamientoIE26.hermosillo / agrupamientoKE26.hermosillo;
      totalAgrupamientoIKE26.mexicali = agrupamientoIE26.mexicali / agrupamientoKE26.mexicali;
      totalAgrupamientoIKE26.orizaba = agrupamientoIE26.orizaba / agrupamientoKE26.orizaba;
      // totalAgrupamientoIKE26.ramosArispe = agrupamientoIE26.ramosArispe / agrupamientoKE26.ramosArispe;
      totalAgrupamientoIKE26.total = agrupamientoIE26.total / agrupamientoKE26.total
    }
    if (e.data.key == '202602 FEB'){
      agrupamientoKF26.cuautitlan = e.summaryCells[4][0]?.value;
      agrupamientoKF26.tultitlan = e.summaryCells[5][0]?.value;
      agrupamientoKF26.guadalajara = e.summaryCells[6][0]?.value;
      agrupamientoKF26.hermosillo = e.summaryCells[7][0]?.value;
      agrupamientoKF26.mexicali = e.summaryCells[8][0]?.value;
      agrupamientoKF26.orizaba = e.summaryCells[9][0]?.value;
      // agrupamientoKF26.ramosArispe = e.summaryCells[10][0]?.value;
      agrupamientoKF26.total = e.summaryCells[10][0]?.value;

      totalAgrupamientoIKF26.cuautitlan = agrupamientoIF26.cuautitlan / agrupamientoKF26.cuautitlan;
      totalAgrupamientoIKF26.tultitlan = agrupamientoIF26.tultitlan / agrupamientoKF26.tultitlan;
      totalAgrupamientoIKF26.guadalajara = agrupamientoIF26.guadalajara / agrupamientoKF26.guadalajara;
      totalAgrupamientoIKF26.hermosillo = agrupamientoIF26.hermosillo / agrupamientoKF26.hermosillo;
      totalAgrupamientoIKF26.mexicali = agrupamientoIF26.mexicali / agrupamientoKF26.mexicali;
      totalAgrupamientoIKF26.orizaba = agrupamientoIF26.orizaba / agrupamientoKF26.orizaba;
      // totalAgrupamientoIKF26.ramosArispe = agrupamientoIF26.ramosArispe / agrupamientoKF26.ramosArispe;
      totalAgrupamientoIKF26.total = agrupamientoIF26.total / agrupamientoKF26.total;
    }
    if (e.data.key == '202603 MAR'){
      agrupamientoKM26.cuautitlan = e.summaryCells[4][0]?.value;
      agrupamientoKM26.tultitlan = e.summaryCells[5][0]?.value;
      agrupamientoKM26.guadalajara = e.summaryCells[6][0]?.value;
      agrupamientoKM26.hermosillo = e.summaryCells[7][0]?.value;
      agrupamientoKM26.mexicali = e.summaryCells[8][0]?.value;
      agrupamientoKM26.orizaba = e.summaryCells[9][0]?.value;
      // agrupamientoKM26.ramosArispe = e.summaryCells[10][0]?.value;
      agrupamientoKM26.total = e.summaryCells[10][0]?.value;

      totalAgrupamientoIKM26.cuautitlan = agrupamientoIM26.cuautitlan / agrupamientoKM26.cuautitlan;
      totalAgrupamientoIKM26.tultitlan = agrupamientoIM26.tultitlan / agrupamientoKM26.tultitlan;
      totalAgrupamientoIKM26.guadalajara = agrupamientoIM26.guadalajara / agrupamientoKM26.guadalajara;
      totalAgrupamientoIKM26.hermosillo = agrupamientoIM26.hermosillo / agrupamientoKM26.hermosillo;
      totalAgrupamientoIKM26.mexicali = agrupamientoIM26.mexicali / agrupamientoKM26.mexicali;
      totalAgrupamientoIKM26.orizaba = agrupamientoIM26.orizaba / agrupamientoKM26.orizaba;
      // totalAgrupamientoIKM26.ramosArispe = agrupamientoIM26.ramosArispe / agrupamientoKM26.ramosArispe;
      totalAgrupamientoIKM26.total = agrupamientoIM26.total / agrupamientoKM26.total;
    }
     if (e.data.key == '202604 ABR'){
       agrupamientoKA26.cuautitlan = e.summaryCells[4][0]?.value;
       agrupamientoKA26.tultitlan = e.summaryCells[5][0]?.value;
       agrupamientoKA26.guadalajara = e.summaryCells[6][0]?.value;
       agrupamientoKA26.hermosillo = e.summaryCells[7][0]?.value;
       agrupamientoKA26.mexicali = e.summaryCells[8][0]?.value;
       agrupamientoKA26.orizaba = e.summaryCells[9][0]?.value;
       // agrupamientoKA26.ramosArispe = e.summaryCells[10][0]?.value;
       agrupamientoKA26.total = e.summaryCells[10][0]?.value;

       totalAgrupamientoIKA26.cuautitlan = agrupamientoIA26.cuautitlan / agrupamientoKA26.cuautitlan;
       totalAgrupamientoIKA26.tultitlan = agrupamientoIA26.tultitlan / agrupamientoKA26.tultitlan;
       totalAgrupamientoIKA26.guadalajara = agrupamientoIA26.guadalajara / agrupamientoKA26.guadalajara;
       totalAgrupamientoIKA26.hermosillo = agrupamientoIA26.hermosillo / agrupamientoKA26.hermosillo;
       totalAgrupamientoIKA26.mexicali = agrupamientoIA26.mexicali / agrupamientoKA26.mexicali;
       totalAgrupamientoIKA26.orizaba = agrupamientoIA26.orizaba / agrupamientoKA26.orizaba;
       // totalAgrupamientoIKA26.ramosArispe = agrupamientoIA26.ramosArispe / agrupamientoKA26.ramosArispe;
       totalAgrupamientoIKA26.total = agrupamientoIA26.total / agrupamientoKA26.total;
     }
    // if (e.data.key == '202605 MAY'){
    //   agrupamientoKMY26.cuautitlan = e.summaryCells[4][0]?.value;
    //   agrupamientoKMY26.tultitlan = e.summaryCells[5][0]?.value;
    //   agrupamientoKMY26.guadalajara = e.summaryCells[6][0]?.value;
    //   agrupamientoKMY26.hermosillo = e.summaryCells[7][0]?.value;
    //   agrupamientoKMY26.mexicali = e.summaryCells[8][0]?.value;
    //   agrupamientoKMY26.orizaba = e.summaryCells[9][0]?.value;
    //   // agrupamientoKMY26.ramosArispe = e.summaryCells[10][0]?.value;
    //   agrupamientoKMY26.total = e.summaryCells[10][0]?.value;

    //   totalAgrupamientoIKMY26.cuautitlan = agrupamientoIMY26.cuautitlan / agrupamientoKMY26.cuautitlan;
    //   totalAgrupamientoIKMY26.tultitlan = agrupamientoIMY26.tultitlan / agrupamientoKMY26.tultitlan;
    //   totalAgrupamientoIKMY26.guadalajara = agrupamientoIMY26.guadalajara / agrupamientoKMY26.guadalajara;
    //   totalAgrupamientoIKMY26.hermosillo = agrupamientoIMY26.hermosillo / agrupamientoKMY26.hermosillo;
    //   totalAgrupamientoIKMY26.mexicali = agrupamientoIMY26.mexicali / agrupamientoKMY26.mexicali;
    //   totalAgrupamientoIKMY26.orizaba = agrupamientoIMY26.orizaba / agrupamientoKMY26.orizaba;
    //   // totalAgrupamientoIKMY26.ramosArispe = agrupamientoIMY26.ramosArispe / agrupamientoKMY26.ramosArispe;
    //   totalAgrupamientoIKMY26.total = agrupamientoIMY26.total / agrupamientoKMY26.total;
    // }
    // if (e.data.key == '202606 JUN'){
    //   agrupamientoKJN26.cuautitlan = e.summaryCells[4][0]?.value;
    //   agrupamientoKJN26.tultitlan = e.summaryCells[5][0]?.value;
    //   agrupamientoKJN26.guadalajara = e.summaryCells[6][0]?.value;
    //   agrupamientoKJN26.hermosillo = e.summaryCells[7][0]?.value;
    //   agrupamientoKJN26.mexicali = e.summaryCells[8][0]?.value;
    //   agrupamientoKJN26.orizaba = e.summaryCells[9][0]?.value;
    //   // agrupamientoKJN26.ramosArispe = e.summaryCells[10][0]?.value;
    //   agrupamientoKJN26.total = e.summaryCells[10][0]?.value;

    //   totalAgrupamientoIKJN26.cuautitlan = agrupamientoIJN26.cuautitlan / agrupamientoKJN26.cuautitlan;
    //   totalAgrupamientoIKJN26.tultitlan = agrupamientoIJN26.tultitlan / agrupamientoKJN26.tultitlan;
    //   totalAgrupamientoIKJN26.guadalajara = agrupamientoIJN26.guadalajara / agrupamientoKJN26.guadalajara;
    //   totalAgrupamientoIKJN26.hermosillo = agrupamientoIJN26.hermosillo / agrupamientoKJN26.hermosillo;
    //   totalAgrupamientoIKJN26.mexicali = agrupamientoIJN26.mexicali / agrupamientoKJN26.mexicali;
    //   totalAgrupamientoIKJN26.orizaba = agrupamientoIJN26.orizaba / agrupamientoKJN26.orizaba;
    //   // totalAgrupamientoIKJN26.ramosArispe = agrupamientoIJN26.ramosArispe / agrupamientoKJN26.ramosArispe;
    //   totalAgrupamientoIKJN26.total = agrupamientoIJN26.total / agrupamientoKJN26.total;
    // }
    // if (e.data.key == '202607 JUL'){
    //   agrupamientoKJL26.cuautitlan = e.summaryCells[4][0]?.value;
    //   agrupamientoKJL26.tultitlan = e.summaryCells[5][0]?.value;
    //   agrupamientoKJL26.guadalajara = e.summaryCells[6][0]?.value;
    //   agrupamientoKJL26.hermosillo = e.summaryCells[7][0]?.value;
    //   agrupamientoKJL26.mexicali = e.summaryCells[8][0]?.value;
    //   agrupamientoKJL26.orizaba = e.summaryCells[9][0]?.value;
    //   // agrupamientoKJL26.ramosArispe = e.summaryCells[10][0]?.value;
    //   agrupamientoKJL26.total = e.summaryCells[10][0]?.value;

    //   totalAgrupamientoIKJL26.cuautitlan = agrupamientoIJL26.cuautitlan / agrupamientoKJL26.cuautitlan;
    //   totalAgrupamientoIKJL26.tultitlan = agrupamientoIJL26.tultitlan / agrupamientoKJL26.tultitlan;
    //   totalAgrupamientoIKJL26.guadalajara = agrupamientoIJL26.guadalajara / agrupamientoKJL26.guadalajara;
    //   totalAgrupamientoIKJL26.hermosillo = agrupamientoIJL26.hermosillo / agrupamientoKJL26.hermosillo;
    //   totalAgrupamientoIKJL26.mexicali = agrupamientoIJL26.mexicali / agrupamientoKJL26.mexicali;
    //   totalAgrupamientoIKJL26.orizaba = agrupamientoIJL26.orizaba / agrupamientoKJL26.orizaba;
    //   // totalAgrupamientoIKJL26.ramosArispe = agrupamientoIJL26.ramosArispe / agrupamientoKJL26.ramosArispe;
    //   totalAgrupamientoIKJL26.total = agrupamientoIJL26.total / agrupamientoKJL26.total;
    // }
    // if (e.data.key == '202608 AGO'){
    //   agrupamientoKAG26.cuautitlan = e.summaryCells[4][0]?.value;
    //   agrupamientoKAG26.tultitlan = e.summaryCells[5][0]?.value;
    //   agrupamientoKAG26.guadalajara = e.summaryCells[6][0]?.value;
    //   agrupamientoKAG26.hermosillo = e.summaryCells[7][0]?.value;
    //   agrupamientoKAG26.mexicali = e.summaryCells[8][0]?.value;
    //   agrupamientoKAG26.orizaba = e.summaryCells[9][0]?.value;
    //   // agrupamientoKAG26.ramosArispe = e.summaryCells[10][0]?.value;
    //   agrupamientoKAG26.total = e.summaryCells[10][0]?.value;

    //   totalAgrupamientoIKAG26.cuautitlan = agrupamientoIAG26.cuautitlan / agrupamientoKAG26.cuautitlan;
    //   totalAgrupamientoIKAG26.tultitlan = agrupamientoIAG26.tultitlan / agrupamientoKAG26.tultitlan;
    //   totalAgrupamientoIKAG26.guadalajara = agrupamientoIAG26.guadalajara / agrupamientoKAG26.guadalajara;
    //   totalAgrupamientoIKAG26.hermosillo = agrupamientoIAG26.hermosillo / agrupamientoKAG26.hermosillo;
    //   totalAgrupamientoIKAG26.mexicali = agrupamientoIAG26.mexicali / agrupamientoKAG26.mexicali;
    //   totalAgrupamientoIKAG26.orizaba = agrupamientoIAG26.orizaba / agrupamientoKAG26.orizaba;
    //   // totalAgrupamientoIKAG26.ramosArispe = agrupamientoIAG26.ramosArispe / agrupamientoKAG26.ramosArispe;
    //   totalAgrupamientoIKAG26.total = agrupamientoIAG26.total / agrupamientoKAG26.total;
    // }
    // if (e.data.key == '202609 SEP'){
    //   agrupamientoKS26.cuautitlan = e.summaryCells[4][0].value;
    //   agrupamientoKS26.tultitlan = e.summaryCells[5][0].value;
    //   agrupamientoKS26.guadalajara = e.summaryCells[6][0].value;
    //   agrupamientoKS26.hermosillo = e.summaryCells[7][0].value;
    //   agrupamientoKS26.mexicali = e.summaryCells[8][0].value;
    //   agrupamientoKS26.orizaba = e.summaryCells[9][0].value;
    //   // agrupamientoKS26.ramosArispe = e.summaryCells[10][0].value;
    //   agrupamientoKS26.total = e.summaryCells[10][0].value;

    //   totalAgrupamientoIKS26.cuautitlan = agrupamientoIS26.cuautitlan / agrupamientoKS26.cuautitlan;
    //   totalAgrupamientoIKS26.tultitlan = agrupamientoIS26.tultitlan / agrupamientoKS26.tultitlan;
    //   totalAgrupamientoIKS26.guadalajara = agrupamientoIS26.guadalajara / agrupamientoKS26.guadalajara;
    //   totalAgrupamientoIKS26.hermosillo = agrupamientoIS26.hermosillo / agrupamientoKS26.hermosillo;
    //   totalAgrupamientoIKS26.mexicali = agrupamientoIS26.mexicali / agrupamientoKS26.mexicali;
    //   totalAgrupamientoIKS26.orizaba = agrupamientoIS26.orizaba / agrupamientoKS26.orizaba;
    //   // totalAgrupamientoIKS26.ramosArispe = agrupamientoIS26.ramosArispe / agrupamientoKS26.ramosArispe;
    //   totalAgrupamientoIKS26.total = agrupamientoIS26.total / agrupamientoKS26.total;
    // }
    // if (e.data.key == '202610 OCT'){
    //   agrupamientoKOC26.cuautitlan = e.summaryCells[4][0].value;
    //   agrupamientoKOC26.tultitlan = e.summaryCells[5][0].value;
    //   agrupamientoKOC26.guadalajara = e.summaryCells[6][0].value;
    //   agrupamientoKOC26.hermosillo = e.summaryCells[7][0].value;
    //   agrupamientoKOC26.mexicali = e.summaryCells[8][0].value;
    //   agrupamientoKOC26.orizaba = e.summaryCells[9][0].value;
    //   // agrupamientoKOC26.ramosArispe = e.summaryCells[10][0].value;
    //   agrupamientoKOC26.total = e.summaryCells[10][0].value;

    //   totalAgrupamientoIKOC26.cuautitlan = agrupamientoIOC26.cuautitlan / agrupamientoKOC26.cuautitlan;
    //   totalAgrupamientoIKOC26.tultitlan = agrupamientoIOC26.tultitlan / agrupamientoKOC26.tultitlan;
    //   totalAgrupamientoIKOC26.guadalajara = agrupamientoIOC26.guadalajara / agrupamientoKOC26.guadalajara;
    //   totalAgrupamientoIKOC26.hermosillo = agrupamientoIOC26.hermosillo / agrupamientoKOC26.hermosillo;
    //   totalAgrupamientoIKOC26.mexicali = agrupamientoIOC26.mexicali / agrupamientoKOC26.mexicali;
    //   totalAgrupamientoIKOC26.orizaba = agrupamientoIOC26.orizaba / agrupamientoKOC26.orizaba;
    //   // totalAgrupamientoIKOC26.ramosArispe = agrupamientoIOC26.ramosArispe / agrupamientoKOC26.ramosArispe;
    //   totalAgrupamientoIKOC26.total = agrupamientoIOC26.total / agrupamientoKOC26.total;
    // }
    // if (e.data.key == '202611 NOV'){
    //   agrupamientoKNV26.cuautitlan = e.summaryCells[4][0].value;
    //   agrupamientoKNV26.tultitlan = e.summaryCells[5][0].value;
    //   agrupamientoKNV26.guadalajara = e.summaryCells[6][0].value;
    //   agrupamientoKNV26.hermosillo = e.summaryCells[7][0].value;
    //   agrupamientoKNV26.mexicali = e.summaryCells[8][0].value;
    //   agrupamientoKNV26.orizaba = e.summaryCells[9][0].value;
    //   // agrupamientoKNV26.ramosArispe = e.summaryCells[10][0].value;
    //   agrupamientoKNV26.total = e.summaryCells[10][0].value;

    //   totalAgrupamientoIKNV26.cuautitlan = agrupamientoINV26.cuautitlan / agrupamientoKNV26.cuautitlan;
    //   totalAgrupamientoIKNV26.tultitlan = agrupamientoINV26.tultitlan / agrupamientoKNV26.tultitlan;
    //   totalAgrupamientoIKNV26.guadalajara = agrupamientoINV26.guadalajara / agrupamientoKNV26.guadalajara;
    //   totalAgrupamientoIKNV26.hermosillo = agrupamientoINV26.hermosillo / agrupamientoKNV26.hermosillo;
    //   totalAgrupamientoIKNV26.mexicali = agrupamientoINV26.mexicali / agrupamientoKNV26.mexicali;
    //   totalAgrupamientoIKNV26.orizaba = agrupamientoINV26.orizaba / agrupamientoKNV26.orizaba;
    //   // totalAgrupamientoIKNV26.ramosArispe = agrupamientoINV26.ramosArispe / agrupamientoKNV26.ramosArispe;
    //   totalAgrupamientoIKNV26.total = agrupamientoINV26.total / agrupamientoKNV26.total;
    // }
    // if (e.data.key == '202612 DIC'){
    //   agrupamientoKDC26.cuautitlan = e.summaryCells[4][0].value;
    //   agrupamientoKDC26.tultitlan = e.summaryCells[5][0].value;
    //   agrupamientoKDC26.guadalajara = e.summaryCells[6][0].value;
    //   agrupamientoKDC26.hermosillo = e.summaryCells[7][0].value;
    //   agrupamientoKDC26.mexicali = e.summaryCells[8][0].value;
    //   agrupamientoKDC26.orizaba = e.summaryCells[9][0].value;
    //   // agrupamientoKDC26.ramosArispe = e.summaryCells[10][0].value;
    //   agrupamientoKDC26.total = e.summaryCells[10][0].value;

    //   totalAgrupamientoIKDC26.cuautitlan = agrupamientoIDC26.cuautitlan / agrupamientoKDC26.cuautitlan;
    //   totalAgrupamientoIKDC26.tultitlan = agrupamientoIDC26.tultitlan / agrupamientoKDC26.tultitlan;
    //   totalAgrupamientoIKDC26.guadalajara = agrupamientoIDC26.guadalajara / agrupamientoKDC26.guadalajara;
    //   totalAgrupamientoIKDC26.hermosillo = agrupamientoIDC26.hermosillo / agrupamientoKDC26.hermosillo;
    //   totalAgrupamientoIKDC26.mexicali = agrupamientoIDC26.mexicali / agrupamientoKDC26.mexicali;
    //   totalAgrupamientoIKDC26.orizaba = agrupamientoIDC26.orizaba / agrupamientoKDC26.orizaba;
    //   // totalAgrupamientoIKDC26.ramosArispe = agrupamientoIDC26.ramosArispe / agrupamientoKDC26.ramosArispe;
    //   totalAgrupamientoIKDC26.total = agrupamientoIDC26.total / agrupamientoKDC26.total;
    // }


  }

  if(e.rowType == "totalFooter"){
    totalKilomentros26.cuautitlan = e.summaryCells[4][0]?.value;
    totalKilomentros26.tultitlan = e.summaryCells[5][0]?.value;
    totalKilomentros26.guadalajara = e.summaryCells[6][0]?.value;
    totalKilomentros26.hermosillo = e.summaryCells[7][0]?.value;
    totalKilomentros26.mexicali = e.summaryCells[8][0]?.value;
    totalKilomentros26.orizaba = e.summaryCells[9][0]?.value;
    // totalKilomentros26.ramosArispe = e.summaryCells[10][0].value;
    totalKilomentros26.total = e.summaryCells[10][0].value;

    totalOperacionIK26.cuautitlan = totalIngresos26.cuautitlan / totalKilomentros26.cuautitlan;
    totalOperacionIK26.tultitlan = totalIngresos26.tultitlan / totalKilomentros26.tultitlan;
    totalOperacionIK26.guadalajara = totalIngresos26.guadalajara / totalKilomentros26.guadalajara;
    totalOperacionIK26.hermosillo = totalIngresos26.hermosillo / totalKilomentros26.hermosillo;
    totalOperacionIK26.mexicali = totalIngresos26.mexicali / totalKilomentros26.mexicali;
    totalOperacionIK26.orizaba = totalIngresos26.orizaba / totalKilomentros26.orizaba;
    // totalOperacionIK26.ramosArispe = totalIngresos24.ramosArispe / totalKilomentros24.ramosArispe;
    totalOperacionIK26.total = totalIngresos26.total / totalKilomentros26.total;
  }
}
onCellPreparedK2026(e){
  if (e.rowType == 'group'){

    e.cellElement.style.fontSize = '12px';
    e.cellElement.style.background = "#DCDCDC";
  }

  if (e.rowType == 'totalFooter') {
    e.totalItem.cells.forEach((c: any) => {
      if (c.cellElement) {
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "16px";
          c.cellElement.style.background = "#ff9460";
          c.cellElement.style.color = "black"; 
      }   
    });
  }
}
customizeK2026(e) {  

  var gridCell = e.gridCell;
  if (gridCell.rowType === 'group') {
    
    e.backgroundColor = "#DCDCDC";
    e.fontWeight = "bolder"
    e.font = {bold: true}

}

if (gridCell.rowType === 'totalFooter') {
    
  e.backgroundColor = "#ff9460";
  e.fontWeight = "bolder"
  e.font = {bold: true}

}
}
//==============================VIAJES TOTALES 2026============================================
onRowPreparedV2026(e){}
onCellPreparedV2026(e){
  if (e.rowType == 'group'){

    e.cellElement.style.fontSize = '12px';
    e.cellElement.style.background = "#DCDCDC";
  }

  if (e.rowType == 'totalFooter') {
    e.totalItem.cells.forEach((c: any) => {
      if (c.cellElement) {
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "16px";
          c.cellElement.style.background = "#ff9460";
          c.cellElement.style.color = "black"; 
      }   
    });
  }
}
customizeV2026(e) {  

  var gridCell = e.gridCell;
  if (gridCell.rowType === 'group') {
    
    e.backgroundColor = "#DCDCDC";
    e.fontWeight = "bolder"
    e.font = {bold: true}

}

if (gridCell.rowType === 'totalFooter') {
    
  e.backgroundColor = "#ff9460";
  e.fontWeight = "bolder"
  e.font = {bold: true}

}
}
//==============================VIAJES CARGADOS 2026============================================
onRowPreparedVC2026(event){
  
  if (event.rowType == 'group'){
    
    if (event.data.key == '202601 ENE') {
       
      viajesCargadosE26.cuautitlan = event.summaryCells[4][0]?.value;
      viajesCargadosE26.tultitlan = event.summaryCells[5][0]?.value;
      viajesCargadosE26.guadalajara = event.summaryCells[6][0]?.value;
      viajesCargadosE26.hermosillo = event.summaryCells[7][0]?.value;
      viajesCargadosE26.mexicali = event.summaryCells[8][0]?.value;
      viajesCargadosE26.orizaba = event.summaryCells[9][0]?.value;
      // viajesCargadosE26.ramosArispe = event.summaryCells[10][0]?.value;
      viajesCargadosE26.total = event.summaryCells[10][0]?.value;

      totalIVCE26.cuautitlan = agrupamientoIE26.cuautitlan / viajesCargadosE26.cuautitlan;
      totalIVCE26.tultitlan = agrupamientoIE26.tultitlan / viajesCargadosE26.tultitlan;
      totalIVCE26.guadalajara = agrupamientoIE26.guadalajara / viajesCargadosE26.guadalajara;
      totalIVCE26.hermosillo = agrupamientoIE26.hermosillo / viajesCargadosE26.hermosillo;
      totalIVCE26.mexicali = agrupamientoIE26.mexicali / viajesCargadosE26.mexicali;
      totalIVCE26.orizaba = agrupamientoIE26.orizaba / viajesCargadosE26.orizaba;
      // totalIVCE26.ramosArispe = agrupamientoIE26.ramosArispe / viajesCargadosE26.ramosArispe;
      totalIVCE26.total = agrupamientoIE26.total / viajesCargadosE26.total;

      totalKVCE26.cuautitlan = agrupamientoKE26.cuautitlan / viajesCargadosE26.cuautitlan;
      totalKVCE26.tultitlan = agrupamientoKE26.tultitlan / viajesCargadosE26.tultitlan;
      totalKVCE26.guadalajara = agrupamientoKE26.guadalajara / viajesCargadosE26.guadalajara;
      totalKVCE26.hermosillo = agrupamientoKE26.hermosillo / viajesCargadosE26.hermosillo;
      totalKVCE26.mexicali = agrupamientoKE26.mexicali / viajesCargadosE26.mexicali;
      totalKVCE26.orizaba = agrupamientoKE26.orizaba / viajesCargadosE26.orizaba;
      // totalKVCE26.ramosArispe = agrupamientoKE26.ramosArispe / viajesCargadosE26.ramosArispe;
      totalKVCE26.total = agrupamientoKE26.total / viajesCargadosE26.total;


    }
    if (event.data.key == '202602 FEB'){
      viajesCargadosF26.cuautitlan = event.summaryCells[4][0]?.value;
      viajesCargadosF26.tultitlan = event.summaryCells[5][0]?.value;
      viajesCargadosF26.guadalajara = event.summaryCells[6][0]?.value;
      viajesCargadosF26.hermosillo = event.summaryCells[7][0]?.value;
      viajesCargadosF26.mexicali = event.summaryCells[8][0]?.value;
      viajesCargadosF26.orizaba = event.summaryCells[9][0]?.value;
      // viajesCargadosF26.ramosArispe = event.summaryCells[10][0]?.value;
      viajesCargadosF26.total = event.summaryCells[10][0]?.value;

      totalIVCF26.cuautitlan = agrupamientoIF26.cuautitlan / viajesCargadosF26.cuautitlan;
      totalIVCF26.tultitlan = agrupamientoIF26.tultitlan / viajesCargadosF26.tultitlan;
      totalIVCF26.guadalajara = agrupamientoIF26.guadalajara / viajesCargadosF26.guadalajara;
      totalIVCF26.hermosillo = agrupamientoIF26.hermosillo / viajesCargadosF26.hermosillo;
      totalIVCF26.mexicali = agrupamientoIF26.mexicali / viajesCargadosF26.mexicali;
      totalIVCF26.orizaba = agrupamientoIF26.orizaba / viajesCargadosF26.orizaba;
      // totalIVCF26.ramosArispe = agrupamientoIF26.ramosArispe / viajesCargadosF26.ramosArispe;
      totalIVCF26.total = agrupamientoIF26.total / viajesCargadosF26.total;

      totalKVCF26.cuautitlan = agrupamientoKF26.cuautitlan / viajesCargadosF26.cuautitlan;
      totalKVCF26.tultitlan = agrupamientoKF26.tultitlan / viajesCargadosF26.tultitlan;
      totalKVCF26.guadalajara = agrupamientoKF26.guadalajara / viajesCargadosF26.guadalajara;
      totalKVCF26.hermosillo = agrupamientoKF26.hermosillo / viajesCargadosF26.hermosillo;
      totalKVCF26.mexicali = agrupamientoKF26.mexicali / viajesCargadosF26.mexicali;
      totalKVCF26.orizaba = agrupamientoKF26.orizaba / viajesCargadosF26.orizaba;
      // totalKVCF26.ramosArispe = agrupamientoKF26.ramosArispe / viajesCargadosF26.ramosArispe;
      totalKVCF26.total = agrupamientoKF26.total / viajesCargadosF26.total;
    }
    if (event.data.key == '202603 MAR'){
      viajesCargadosM26.cuautitlan = event.summaryCells[4][0]?.value;
      viajesCargadosM26.tultitlan = event.summaryCells[5][0]?.value;
      viajesCargadosM26.guadalajara = event.summaryCells[6][0]?.value;
      viajesCargadosM26.hermosillo = event.summaryCells[7][0]?.value;
      viajesCargadosM26.mexicali = event.summaryCells[8][0]?.value;
      viajesCargadosM26.orizaba = event.summaryCells[9][0]?.value;
      // viajesCargadosM26.ramosArispe = event.summaryCells[10][0]?.value;
      viajesCargadosM26.total = event.summaryCells[10][0]?.value;

      totalIVCM26.cuautitlan = agrupamientoIM26.cuautitlan / viajesCargadosM26.cuautitlan;
      totalIVCM26.tultitlan = agrupamientoIM26.tultitlan / viajesCargadosM26.tultitlan;
      totalIVCM26.guadalajara = agrupamientoIM26.guadalajara / viajesCargadosM26.guadalajara;
      totalIVCM26.hermosillo = agrupamientoIM26.hermosillo / viajesCargadosM26.hermosillo;
      totalIVCM26.mexicali = agrupamientoIM26.mexicali / viajesCargadosM26.mexicali;
      totalIVCM26.orizaba = agrupamientoIM26.orizaba / viajesCargadosM26.orizaba;
      // totalIVCM26.ramosArispe = agrupamientoIM26.ramosArispe / viajesCargadosM26.ramosArispe;
      totalIVCM26.total = agrupamientoIM26.total / viajesCargadosM26.total;

      totalKVCM26.cuautitlan = agrupamientoKM26.cuautitlan / viajesCargadosM26.cuautitlan;
      totalKVCM26.tultitlan = agrupamientoKM26.tultitlan / viajesCargadosM26.tultitlan;
      totalKVCM26.guadalajara = agrupamientoKM26.guadalajara / viajesCargadosM26.guadalajara;
      totalKVCM26.hermosillo = agrupamientoKM26.hermosillo / viajesCargadosM26.hermosillo;
      totalKVCM26.mexicali = agrupamientoKM26.mexicali / viajesCargadosM26.mexicali;
      totalKVCM26.orizaba = agrupamientoKM26.orizaba / viajesCargadosM26.orizaba;
      // totalKVCM26.ramosArispe = agrupamientoKM26.ramosArispe / viajesCargadosM26.ramosArispe;
      totalKVCM26.total = agrupamientoKM26.total / viajesCargadosM26.total;
    }
     if (event.data.key == '202604 ABR'){
       viajesCargadosA26.cuautitlan = event.summaryCells[4][0]?.value;
       viajesCargadosA26.tultitlan = event.summaryCells[5][0]?.value;
       viajesCargadosA26.guadalajara = event.summaryCells[6][0]?.value;
       viajesCargadosA26.hermosillo = event.summaryCells[7][0]?.value;
       viajesCargadosA26.mexicali = event.summaryCells[8][0]?.value;
       viajesCargadosA26.orizaba = event.summaryCells[9][0]?.value;
       // viajesCargadosA26.ramosArispe = event.summaryCells[10][0]?.value;
       viajesCargadosA26.total = event.summaryCells[10][0]?.value;

       totalIVCA26.cuautitlan = agrupamientoIA26.cuautitlan / viajesCargadosA26.cuautitlan;
       totalIVCA26.tultitlan = agrupamientoIA26.tultitlan / viajesCargadosA26.tultitlan;
       totalIVCA26.guadalajara = agrupamientoIA26.guadalajara / viajesCargadosA26.guadalajara;
       totalIVCA26.hermosillo = agrupamientoIA26.hermosillo / viajesCargadosA26.hermosillo;
       totalIVCA26.mexicali = agrupamientoIA26.mexicali / viajesCargadosA26.mexicali;
       totalIVCA26.orizaba = agrupamientoIA26.orizaba / viajesCargadosA26.orizaba;
       // totalIVCA26.ramosArispe = agrupamientoIA26.ramosArispe / viajesCargadosA26.ramosArispe;
       totalIVCA26.total = agrupamientoIA26.total / viajesCargadosA26.total;

       totalKVCA26.cuautitlan = agrupamientoKA26.cuautitlan / viajesCargadosA26.cuautitlan;
       totalKVCA26.tultitlan = agrupamientoKA26.tultitlan / viajesCargadosA26.tultitlan;
       totalKVCA26.guadalajara = agrupamientoKA26.guadalajara / viajesCargadosA26.guadalajara;
       totalKVCA26.hermosillo = agrupamientoKA26.hermosillo / viajesCargadosA26.hermosillo;
       totalKVCA26.mexicali = agrupamientoKA26.mexicali / viajesCargadosA26.mexicali;
       totalKVCA26.orizaba = agrupamientoKA26.orizaba / viajesCargadosA26.orizaba;
       // totalKVCA26.ramosArispe = agrupamientoKA26.ramosArispe / viajesCargadosA26.ramosArispe;
       totalKVCA26.total = agrupamientoKA26.total / viajesCargadosA26.total;
     }
    // if (event.data.key == '202605 MAY'){
    //   viajesCargadosMY26.cuautitlan = event.summaryCells[4][0]?.value;
    //   viajesCargadosMY26.tultitlan = event.summaryCells[5][0]?.value;
    //   viajesCargadosMY26.guadalajara = event.summaryCells[6][0]?.value;
    //   viajesCargadosMY26.hermosillo = event.summaryCells[7][0]?.value;
    //   viajesCargadosMY26.mexicali = event.summaryCells[8][0]?.value;
    //   viajesCargadosMY26.orizaba = event.summaryCells[9][0]?.value;
    //   // viajesCargadosMY26.ramosArispe = event.summaryCells[10][0]?.value;
    //   viajesCargadosMY26.total = event.summaryCells[10][0]?.value;

    //   totalIVCMY26.cuautitlan = agrupamientoIMY26.cuautitlan / viajesCargadosMY26.cuautitlan;
    //   totalIVCMY26.tultitlan = agrupamientoIMY26.tultitlan / viajesCargadosMY26.tultitlan;
    //   totalIVCMY26.guadalajara = agrupamientoIMY26.guadalajara / viajesCargadosMY26.guadalajara;
    //   totalIVCMY26.hermosillo = agrupamientoIMY26.hermosillo / viajesCargadosMY26.hermosillo;
    //   totalIVCMY26.mexicali = agrupamientoIMY26.mexicali / viajesCargadosMY26.mexicali;
    //   totalIVCMY26.orizaba = agrupamientoIMY26.orizaba / viajesCargadosMY26.orizaba;
    //   // totalIVCMY26.ramosArispe = agrupamientoIMY26.ramosArispe / viajesCargadosMY26.ramosArispe;
    //   totalIVCMY26.total = agrupamientoIMY26.total / viajesCargadosMY26.total;

    //   totalKVCMY26.cuautitlan = agrupamientoKMY26.cuautitlan / viajesCargadosMY26.cuautitlan;
    //   totalKVCMY26.tultitlan = agrupamientoKMY26.tultitlan / viajesCargadosMY26.tultitlan;
    //   totalKVCMY26.guadalajara = agrupamientoKMY26.guadalajara / viajesCargadosMY26.guadalajara;
    //   totalKVCMY26.hermosillo = agrupamientoKMY26.hermosillo / viajesCargadosMY26.hermosillo;
    //   totalKVCMY26.mexicali = agrupamientoKMY26.mexicali / viajesCargadosMY26.mexicali;
    //   totalKVCMY26.orizaba = agrupamientoKMY26.orizaba / viajesCargadosMY26.orizaba;
    //   // totalKVCMY26.ramosArispe = agrupamientoKMY26.ramosArispe / viajesCargadosMY26.ramosArispe;
    //   totalKVCMY26.total = agrupamientoKMY26.total / viajesCargadosMY26.total;
    // }
    // if (event.data.key == '202606 JUN'){
    //   viajesCargadosJN26.cuautitlan = event.summaryCells[4][0]?.value;
    //   viajesCargadosJN26.tultitlan = event.summaryCells[5][0]?.value;
    //   viajesCargadosJN26.guadalajara = event.summaryCells[6][0]?.value;
    //   viajesCargadosJN26.hermosillo = event.summaryCells[7][0]?.value;
    //   viajesCargadosJN26.mexicali = event.summaryCells[8][0]?.value;
    //   viajesCargadosJN26.orizaba = event.summaryCells[9][0]?.value;
    //   // viajesCargadosJN26.ramosArispe = event.summaryCells[10][0]?.value;
    //   viajesCargadosJN26.total = event.summaryCells[10][0]?.value;

    //   totalIVCJN26.cuautitlan = agrupamientoIJN26.cuautitlan / viajesCargadosJN26.cuautitlan;
    //   totalIVCJN26.tultitlan = agrupamientoIJN26.tultitlan / viajesCargadosJN26.tultitlan;
    //   totalIVCJN26.guadalajara = agrupamientoIJN26.guadalajara / viajesCargadosJN26.guadalajara;
    //   totalIVCJN26.hermosillo = agrupamientoIJN26.hermosillo / viajesCargadosJN26.hermosillo;
    //   totalIVCJN26.mexicali = agrupamientoIJN26.mexicali / viajesCargadosJN26.mexicali;
    //   totalIVCJN26.orizaba = agrupamientoIJN26.orizaba / viajesCargadosJN26.orizaba;
    //   // totalIVCJN26.ramosArispe = agrupamientoIJN26.ramosArispe / viajesCargadosJN26.ramosArispe;
    //   totalIVCJN26.total = agrupamientoIJN26.total / viajesCargadosJN26.total;

    //   totalKVCJN26.cuautitlan = agrupamientoKJN26.cuautitlan / viajesCargadosJN26.cuautitlan;
    //   totalKVCJN26.tultitlan = agrupamientoKJN26.tultitlan / viajesCargadosJN26.tultitlan;
    //   totalKVCJN26.guadalajara = agrupamientoKJN26.guadalajara / viajesCargadosJN26.guadalajara;
    //   totalKVCJN26.hermosillo = agrupamientoKJN26.hermosillo / viajesCargadosJN26.hermosillo;
    //   totalKVCJN26.mexicali = agrupamientoKJN26.mexicali / viajesCargadosJN26.mexicali;
    //   totalKVCJN26.orizaba = agrupamientoKJN26.orizaba / viajesCargadosJN26.orizaba;
    //   // totalKVCJN26.ramosArispe = agrupamientoKJN26.ramosArispe / viajesCargadosJN26.ramosArispe;
    //   totalKVCJN26.total = agrupamientoKJN26.total / viajesCargadosJN26.total;
    // }
    // if (event.data.key == '202607 JUL'){
    //   viajesCargadosJL26.cuautitlan = event.summaryCells[4][0]?.value;
    //   viajesCargadosJL26.tultitlan = event.summaryCells[5][0]?.value;
    //   viajesCargadosJL26.guadalajara = event.summaryCells[6][0]?.value;
    //   viajesCargadosJL26.hermosillo = event.summaryCells[7][0]?.value;
    //   viajesCargadosJL26.mexicali = event.summaryCells[8][0]?.value;
    //   viajesCargadosJL26.orizaba = event.summaryCells[9][0]?.value;
    //   // viajesCargadosJL26.ramosArispe = event.summaryCells[10][0]?.value;
    //   viajesCargadosJL26.total = event.summaryCells[10][0]?.value;

    //   totalIVCJL26.cuautitlan = agrupamientoIJL26.cuautitlan / viajesCargadosJL26.cuautitlan;
    //   totalIVCJL26.tultitlan = agrupamientoIJL26.tultitlan / viajesCargadosJL26.tultitlan;
    //   totalIVCJL26.guadalajara = agrupamientoIJL26.guadalajara / viajesCargadosJL26.guadalajara;
    //   totalIVCJL26.hermosillo = agrupamientoIJL26.hermosillo / viajesCargadosJL26.hermosillo;
    //   totalIVCJL26.mexicali = agrupamientoIJL26.mexicali / viajesCargadosJL26.mexicali;
    //   totalIVCJL26.orizaba = agrupamientoIJL26.orizaba / viajesCargadosJL26.orizaba;
    //   // totalIVCJL26.ramosArispe = agrupamientoIJL26.ramosArispe / viajesCargadosJL26.ramosArispe;
    //   totalIVCJL26.total = agrupamientoIJL26.total / viajesCargadosJL26.total;

    //   totalKVCJL26.cuautitlan = agrupamientoKJL26.cuautitlan / viajesCargadosJL26.cuautitlan;
    //   totalKVCJL26.tultitlan = agrupamientoKJL26.tultitlan / viajesCargadosJL26.tultitlan;
    //   totalKVCJL26.guadalajara = agrupamientoKJL26.guadalajara / viajesCargadosJL26.guadalajara;
    //   totalKVCJL26.hermosillo = agrupamientoKJL26.hermosillo / viajesCargadosJL26.hermosillo;
    //   totalKVCJL26.mexicali = agrupamientoKJL26.mexicali / viajesCargadosJL26.mexicali;
    //   totalKVCJL26.orizaba = agrupamientoKJL26.orizaba / viajesCargadosJL26.orizaba;
    //   // totalKVCJL26.ramosArispe = agrupamientoKJL26.ramosArispe / viajesCargadosJL26.ramosArispe;
    //   totalKVCJL26.total = agrupamientoKJL26.total / viajesCargadosJL26.total;
    // }
    // if (event.data.key == '202608 AGO'){
    //   viajesCargadosAG26.cuautitlan = event.summaryCells[4][0]?.value;
    //   viajesCargadosAG26.tultitlan = event.summaryCells[5][0]?.value;
    //   viajesCargadosAG26.guadalajara = event.summaryCells[6][0]?.value;
    //   viajesCargadosAG26.hermosillo = event.summaryCells[7][0]?.value;
    //   viajesCargadosAG26.mexicali = event.summaryCells[8][0]?.value;
    //   viajesCargadosAG26.orizaba = event.summaryCells[9][0]?.value;
    //   // viajesCargadosAG26.ramosArispe = event.summaryCells[10][0]?.value;
    //   viajesCargadosAG26.total = event.summaryCells[10][0]?.value;

    //   totalIVCAG26.cuautitlan = agrupamientoIAG26.cuautitlan / viajesCargadosAG26.cuautitlan;
    //   totalIVCAG26.tultitlan = agrupamientoIAG26.tultitlan / viajesCargadosAG26.tultitlan;
    //   totalIVCAG26.guadalajara = agrupamientoIAG26.guadalajara / viajesCargadosAG26.guadalajara;
    //   totalIVCAG26.hermosillo = agrupamientoIAG26.hermosillo / viajesCargadosAG26.hermosillo;
    //   totalIVCAG26.mexicali = agrupamientoIAG26.mexicali / viajesCargadosAG26.mexicali;
    //   totalIVCAG26.orizaba = agrupamientoIAG26.orizaba / viajesCargadosAG26.orizaba;
    //   // totalIVCAG26.ramosArispe = agrupamientoIAG26.ramosArispe / viajesCargadosAG26.ramosArispe;
    //   totalIVCAG26.total = agrupamientoIAG26.total / viajesCargadosAG26.total;

    //   totalKVCAG26.cuautitlan = agrupamientoKAG26.cuautitlan / viajesCargadosAG26.cuautitlan;
    //   totalKVCAG26.tultitlan = agrupamientoKAG26.tultitlan / viajesCargadosAG26.tultitlan;
    //   totalKVCAG26.guadalajara = agrupamientoKAG26.guadalajara / viajesCargadosAG26.guadalajara;
    //   totalKVCAG26.hermosillo = agrupamientoKAG26.hermosillo / viajesCargadosAG26.hermosillo;
    //   totalKVCAG26.mexicali = agrupamientoKAG26.mexicali / viajesCargadosAG26.mexicali;
    //   totalKVCAG26.orizaba = agrupamientoKAG26.orizaba / viajesCargadosAG26.orizaba;
    //   // totalKVCAG26.ramosArispe = agrupamientoKAG26.ramosArispe / viajesCargadosAG26.ramosArispe;
    //   totalKVCAG26.total = agrupamientoKAG26.total / viajesCargadosAG26.total;
    // }
    // if (event.data.key == '202609 SEP'){
    //   viajesCargadosS26.cuautitlan = event.summaryCells[4][0].value;
    //   viajesCargadosS26.tultitlan = event.summaryCells[5][0].value;
    //   viajesCargadosS26.guadalajara = event.summaryCells[6][0].value;
    //   viajesCargadosS26.hermosillo = event.summaryCells[7][0].value;
    //   viajesCargadosS26.mexicali = event.summaryCells[8][0].value;
    //   viajesCargadosS26.orizaba = event.summaryCells[9][0].value;
    //   // viajesCargadosS26.ramosArispe = event.summaryCells[10][0].value;
    //   viajesCargadosS26.total = event.summaryCells[10][0].value;

    //   totalIVCS26.cuautitlan = agrupamientoIS26.cuautitlan / viajesCargadosS26.cuautitlan;
    //   totalIVCS26.tultitlan = agrupamientoIS26.tultitlan / viajesCargadosS26.tultitlan;
    //   totalIVCS26.guadalajara = agrupamientoIS26.guadalajara / viajesCargadosS26.guadalajara;
    //   totalIVCS26.hermosillo = agrupamientoIS26.hermosillo / viajesCargadosS26.hermosillo;
    //   totalIVCS26.mexicali = agrupamientoIS26.mexicali / viajesCargadosS26.mexicali;
    //   totalIVCS26.orizaba = agrupamientoIS26.orizaba / viajesCargadosS26.orizaba;
    //   // totalIVCS26.ramosArispe = agrupamientoIS26.ramosArispe / viajesCargadosS26.ramosArispe;
    //   totalIVCS26.total = agrupamientoIS26.total / viajesCargadosS26.total;

    //   totalKVCS26.cuautitlan = agrupamientoKS26.cuautitlan / viajesCargadosS26.cuautitlan;
    //   totalKVCS26.tultitlan = agrupamientoKS26.tultitlan / viajesCargadosS26.tultitlan;
    //   totalKVCS26.guadalajara = agrupamientoKS26.guadalajara / viajesCargadosS26.guadalajara;
    //   totalKVCS26.hermosillo = agrupamientoKS26.hermosillo / viajesCargadosS26.hermosillo;
    //   totalKVCS26.mexicali = agrupamientoKS26.mexicali / viajesCargadosS26.mexicali;
    //   totalKVCS26.orizaba = agrupamientoKS26.orizaba / viajesCargadosS26.orizaba;
    //   // totalKVCS26.ramosArispe = agrupamientoKS26.ramosArispe / viajesCargadosS26.ramosArispe;
    //   totalKVCS26.total = agrupamientoKS26.total / viajesCargadosS26.total;
    // }
    // if (event.data.key == '202610 OCT'){
    //   viajesCargadosOC26.cuautitlan = event.summaryCells[4][0].value;
    //   viajesCargadosOC26.tultitlan = event.summaryCells[5][0].value;
    //   viajesCargadosOC26.guadalajara = event.summaryCells[6][0].value;
    //   viajesCargadosOC26.hermosillo = event.summaryCells[7][0].value;
    //   viajesCargadosOC26.mexicali = event.summaryCells[8][0].value;
    //   viajesCargadosOC26.orizaba = event.summaryCells[9][0].value;
    //   // viajesCargadosOC26.ramosArispe = event.summaryCells[10][0].value;
    //   viajesCargadosOC26.total = event.summaryCells[10][0].value;

    //   totalIVCOC26.cuautitlan = agrupamientoIOC26.cuautitlan / viajesCargadosOC26.cuautitlan;
    //   totalIVCOC26.tultitlan = agrupamientoIOC26.tultitlan / viajesCargadosOC26.tultitlan;
    //   totalIVCOC26.guadalajara = agrupamientoIOC26.guadalajara / viajesCargadosOC26.guadalajara;
    //   totalIVCOC26.hermosillo = agrupamientoIOC26.hermosillo / viajesCargadosOC26.hermosillo;
    //   totalIVCOC26.mexicali = agrupamientoIOC26.mexicali / viajesCargadosOC26.mexicali;
    //   totalIVCOC26.orizaba = agrupamientoIOC26.orizaba / viajesCargadosOC26.orizaba;
    //   // totalIVCOC26.ramosArispe = agrupamientoIOC26.ramosArispe / viajesCargadosOC26.ramosArispe;
    //   totalIVCOC26.total = agrupamientoIOC26.total / viajesCargadosOC26.total;

    //   totalKVCOC26.cuautitlan = agrupamientoKOC26.cuautitlan / viajesCargadosOC26.cuautitlan;
    //   totalKVCOC26.tultitlan = agrupamientoKOC26.tultitlan / viajesCargadosOC26.tultitlan;
    //   totalKVCOC26.guadalajara = agrupamientoKOC26.guadalajara / viajesCargadosOC26.guadalajara;
    //   totalKVCOC26.hermosillo = agrupamientoKOC26.hermosillo / viajesCargadosOC26.hermosillo;
    //   totalKVCOC26.mexicali = agrupamientoKOC26.mexicali / viajesCargadosOC26.mexicali;
    //   totalKVCOC26.orizaba = agrupamientoKOC26.orizaba / viajesCargadosOC26.orizaba;
    //   // totalKVCOC26.ramosArispe = agrupamientoKOC26.ramosArispe / viajesCargadosOC26.ramosArispe;
    //   totalKVCOC26.total = agrupamientoKOC26.total / viajesCargadosOC26.total;
    // }
    // if (event.data.key == '202611 NOV'){
    //   viajesCargadosNV26.cuautitlan = event.summaryCells[4][0].value;
    //   viajesCargadosNV26.tultitlan = event.summaryCells[5][0].value;
    //   viajesCargadosNV26.guadalajara = event.summaryCells[6][0].value;
    //   viajesCargadosNV26.hermosillo = event.summaryCells[7][0].value;
    //   viajesCargadosNV26.mexicali = event.summaryCells[8][0].value;
    //   viajesCargadosNV26.orizaba = event.summaryCells[9][0].value;
    //   // viajesCargadosNV26.ramosArispe = event.summaryCells[10][0].value;
    //   viajesCargadosNV26.total = event.summaryCells[10][0].value;

    //   totalIVCNV26.cuautitlan = agrupamientoINV26.cuautitlan / viajesCargadosNV26.cuautitlan;
    //   totalIVCNV26.tultitlan = agrupamientoINV26.tultitlan / viajesCargadosNV26.tultitlan;
    //   totalIVCNV26.guadalajara = agrupamientoINV26.guadalajara / viajesCargadosNV26.guadalajara;
    //   totalIVCNV26.hermosillo = agrupamientoINV26.hermosillo / viajesCargadosNV26.hermosillo;
    //   totalIVCNV26.mexicali = agrupamientoINV26.mexicali / viajesCargadosNV26.mexicali;
    //   totalIVCNV26.orizaba = agrupamientoINV26.orizaba / viajesCargadosNV26.orizaba;
    //   // totalIVCNV26.ramosArispe = agrupamientoINV26.ramosArispe / viajesCargadosNV26.ramosArispe;
    //   totalIVCNV26.total = agrupamientoINV26.total / viajesCargadosNV26.total;

    //   totalKVCNV26.cuautitlan = agrupamientoKNV26.cuautitlan / viajesCargadosNV26.cuautitlan;
    //   totalKVCNV26.tultitlan = agrupamientoKNV26.tultitlan / viajesCargadosNV26.tultitlan;
    //   totalKVCNV26.guadalajara = agrupamientoKNV26.guadalajara / viajesCargadosNV26.guadalajara;
    //   totalKVCNV26.hermosillo = agrupamientoKNV26.hermosillo / viajesCargadosNV26.hermosillo;
    //   totalKVCNV26.mexicali = agrupamientoKNV26.mexicali / viajesCargadosNV26.mexicali;
    //   totalKVCNV26.orizaba = agrupamientoKNV26.orizaba / viajesCargadosNV26.orizaba;
    //   // totalKVCNV26.ramosArispe = agrupamientoKNV26.ramosArispe / viajesCargadosNV26.ramosArispe;
    //   totalKVCNV26.total = agrupamientoKNV26.total / viajesCargadosNV26.total;
    // }
    // if (event.data.key == '202612 DIC'){
    //   viajesCargadosDC26.cuautitlan = event.summaryCells[4][0].value;
    //   viajesCargadosDC26.tultitlan = event.summaryCells[5][0].value;
    //   viajesCargadosDC26.guadalajara = event.summaryCells[6][0].value;
    //   viajesCargadosDC26.hermosillo = event.summaryCells[7][0].value;
    //   viajesCargadosDC26.mexicali = event.summaryCells[8][0].value;
    //   viajesCargadosDC26.orizaba = event.summaryCells[9][0].value;
    //   // viajesCargadosDC26.ramosArispe = event.summaryCells[10][0].value;
    //   viajesCargadosDC26.total = event.summaryCells[10][0].value;

    //   totalIVCDC26.cuautitlan = agrupamientoIDC26.cuautitlan / viajesCargadosDC26.cuautitlan;
    //   totalIVCDC26.tultitlan = agrupamientoIDC26.tultitlan / viajesCargadosDC26.tultitlan;
    //   totalIVCDC26.guadalajara = agrupamientoIDC26.guadalajara / viajesCargadosDC26.guadalajara;
    //   totalIVCDC26.hermosillo = agrupamientoIDC26.hermosillo / viajesCargadosDC26.hermosillo;
    //   totalIVCDC26.mexicali = agrupamientoIDC26.mexicali / viajesCargadosDC26.mexicali;
    //   totalIVCDC26.orizaba = agrupamientoIDC26.orizaba / viajesCargadosDC26.orizaba;
    //   // totalIVCDC26.ramosArispe = agrupamientoIDC26.ramosArispe / viajesCargadosDC26.ramosArispe;
    //   totalIVCDC26.total = agrupamientoIDC26.total / viajesCargadosDC26.total;

    //   totalKVCDC26.cuautitlan = agrupamientoKDC26.cuautitlan / viajesCargadosDC26.cuautitlan;
    //   totalKVCDC26.tultitlan = agrupamientoKDC26.tultitlan / viajesCargadosDC26.tultitlan;
    //   totalKVCDC26.guadalajara = agrupamientoKDC26.guadalajara / viajesCargadosDC26.guadalajara;
    //   totalKVCDC26.hermosillo = agrupamientoKDC26.hermosillo / viajesCargadosDC26.hermosillo;
    //   totalKVCDC26.mexicali = agrupamientoKDC26.mexicali / viajesCargadosDC26.mexicali;
    //   totalKVCDC26.orizaba = agrupamientoKDC26.orizaba / viajesCargadosDC26.orizaba;
    //   // totalKVCDC26.ramosArispe = agrupamientoKDC26.ramosArispe / viajesCargadosDC26.ramosArispe;
    //   totalKVCDC26.total = agrupamientoKDC26.total / viajesCargadosDC26.total;
    // }
  }

  if(event.rowType == "totalFooter"){
    totalVC26.cuautitlan = event.summaryCells[4][0]?.value;
    totalVC26.tultitlan = event.summaryCells[5][0]?.value;
    totalVC26.guadalajara = event.summaryCells[6][0]?.value;
    totalVC26.hermosillo = event.summaryCells[7][0]?.value;
    totalVC26.mexicali = event.summaryCells[8][0]?.value;
    totalVC26.orizaba = event.summaryCells[9][0]?.value;
    // totalVC26.ramosArispe = event.summaryCells[10][0]?.value;
    totalVC26.total = event.summaryCells[10][0]?.value

    totalOperacionIVC26.cuautitlan = totalIngresos26.cuautitlan / totalVC26.cuautitlan;
    totalOperacionIVC26.tultitlan = totalIngresos26.tultitlan / totalVC26.tultitlan;
    totalOperacionIVC26.guadalajara = totalIngresos26.guadalajara / totalVC26.guadalajara;
    totalOperacionIVC26.hermosillo = totalIngresos26.hermosillo / totalVC26.hermosillo;
    totalOperacionIVC26.mexicali = totalIngresos26.mexicali / totalVC26.mexicali;
    totalOperacionIVC26.orizaba = totalIngresos26.orizaba / totalVC26.orizaba;
    // totalOperacionIVC26.ramosArispe = totalIngresos26.ramosArispe / totalVC26.ramosArispe;
    totalOperacionIVC26.total = totalIngresos26.total / totalVC26.total;

    totalOperacionKVC26.cuautitlan = totalKilomentros26.cuautitlan / totalVC26.cuautitlan;
    totalOperacionKVC26.tultitlan = totalKilomentros26.tultitlan / totalVC26.tultitlan;
    totalOperacionKVC26.guadalajara = totalKilomentros26.guadalajara / totalVC26.guadalajara;
    totalOperacionKVC26.hermosillo = totalKilomentros26.hermosillo / totalVC26.hermosillo;
    totalOperacionKVC26.mexicali = totalKilomentros26.mexicali / totalVC26.mexicali;
    totalOperacionKVC26.orizaba = totalKilomentros26.orizaba / totalVC26.orizaba;
    // totalOperacionKVC26.ramosArispe = totalKilomentros26.ramosArispe / totalVC26.ramosArispe;
    totalOperacionKVC26.total = totalKilomentros26.total / totalVC26.total;


  }

}
onCellPreparedVC2026(e){
  if (e.rowType == 'group'){

    e.cellElement.style.fontSize = '12px';
    e.cellElement.style.background = "#DCDCDC";
  }

  if (e.rowType == 'totalFooter') {
    e.totalItem.cells.forEach((c: any) => {
      if (c.cellElement) {
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "16px";
          c.cellElement.style.background = "#ff9460";
          c.cellElement.style.color = "black"; 
      }   
    });
  }
}
customizeVC2026(e) {  

  var gridCell = e.gridCell;
  if (gridCell.rowType === 'group') {
    
    e.backgroundColor = "#DCDCDC";
    e.fontWeight = "bolder"
    e.font = {bold: true}

}

if (gridCell.rowType === 'totalFooter') {
    
  e.backgroundColor = "#ff9460";
  e.fontWeight = "bolder"
  e.font = {bold: true}

}
}
//==============================INGRESOS KILOMETROS 2026===============================
onCellPreparedPM2026(e){

  if (e.rowType == 'data'){

    e.cellElement.style.fontSize = '12px';
    e.cellElement.style.background = "#DCDCDC";
  }
}  

onRowPreparedIK2026(e){
  if (e.rowType == 'group'){

    if(e.isExpanded == true){
      this.collapseGroup == true
    }


    if (e.data.key == '202601 ENE') {
      if(e.summaryCells[4].length !== 0){
      e.summaryCells[4][0].value =  totalAgrupamientoIKE26.cuautitlan;
      }
      if(e.summaryCells[5].length !== 0){
      e.summaryCells[5][0].value = totalAgrupamientoIKE26.tultitlan;
      }
      if(e.summaryCells[6].length !== 0){
      e.summaryCells[6][0].value = totalAgrupamientoIKE26.guadalajara;
      }
      if(e.summaryCells[7].length !== 0){
      e.summaryCells[7][0].value = totalAgrupamientoIKE26.hermosillo;
      }
      if(e.summaryCells[8].length !== 0){
      e.summaryCells[8][0].value = totalAgrupamientoIKE26.mexicali;
      }
      if(e.summaryCells[9].length !== 0){
      e.summaryCells[9][0].value = totalAgrupamientoIKE26.orizaba;
      }
      // if(e.summaryCells[10].length !== 0){
      // e.summaryCells[10][0].value = totalAgrupamientoIKE26.ramosArispe;
      // }
      if(e.summaryCells[10].length !== 0){
      e.summaryCells[10][0].value = totalAgrupamientoIKE26.total;
      }
    
    }
    if (e.data.key == '202602 FEB') {
      if(e.summaryCells[4].length !== 0){
      e.summaryCells[4][0].value = totalAgrupamientoIKF26.cuautitlan;
      }
      if(e.summaryCells[5].length !== 0){
      e.summaryCells[5][0].value = totalAgrupamientoIKF26.tultitlan;
      }
      if(e.summaryCells[6].length !== 0){
      e.summaryCells[6][0].value = totalAgrupamientoIKF26.guadalajara;
      }
      if(e.summaryCells[7].length !== 0){
      e.summaryCells[7][0].value = totalAgrupamientoIKF26.hermosillo;
      }
      if(e.summaryCells[8].length !== 0){
      e.summaryCells[8][0].value = totalAgrupamientoIKF26.mexicali;
      }
      if(e.summaryCells[9].length !== 0){
      e.summaryCells[9][0].value = totalAgrupamientoIKF26.orizaba;
      }
      // if(e.summaryCells[10].length !== 0){
      // e.summaryCells[10][0].value = totalAgrupamientoIKF26.ramosArispe;
      // }
      if(e.summaryCells[10].length !== 0){
      e.summaryCells[10][0].value = totalAgrupamientoIKF26.total;
      }
    }
    if (e.data.key == '202603 MAR') {
      if(e.summaryCells[4].length !== 0){
      e.summaryCells[4][0].value = totalAgrupamientoIKM26.cuautitlan;
      }
      if(e.summaryCells[5].length !== 0){
      e.summaryCells[5][0].value = totalAgrupamientoIKM26.tultitlan;
      }
      if(e.summaryCells[6].length !== 0){
      e.summaryCells[6][0].value = totalAgrupamientoIKM26.guadalajara;
      }
      if(e.summaryCells[7].length !== 0){
      e.summaryCells[7][0].value = totalAgrupamientoIKM26.hermosillo;
      }
      if(e.summaryCells[8].length !== 0){
      e.summaryCells[8][0].value = totalAgrupamientoIKM26.mexicali;
      }
      if(e.summaryCells[9].length !== 0){
      e.summaryCells[9][0].value = totalAgrupamientoIKM26.orizaba;
      }
      // if(e.summaryCells[10].length !== 0){
      // e.summaryCells[10][0].value = totalAgrupamientoIKM26.ramosArispe;
      // }
      if(e.summaryCells[10].length !== 0){
      e.summaryCells[10][0].value = totalAgrupamientoIKM26.total;
      }

    }
     if (e.data.key == '202604 ABR') {
       if(e.summaryCells[4].length !== 0){
       e.summaryCells[4][0].value = totalAgrupamientoIKA26.cuautitlan;
       }
       if(e.summaryCells[5].length !== 0){
       e.summaryCells[5][0].value = totalAgrupamientoIKA26.tultitlan;
       }
       if(e.summaryCells[6].length !== 0){
       e.summaryCells[6][0].value = totalAgrupamientoIKA26.guadalajara;
       }
       if(e.summaryCells[7].length !== 0){
       e.summaryCells[7][0].value = totalAgrupamientoIKA26.hermosillo;
       }
       if(e.summaryCells[8].length !== 0){
       e.summaryCells[8][0].value = totalAgrupamientoIKA26.mexicali;
       }
       if(e.summaryCells[9].length !== 0){
       e.summaryCells[9][0].value = totalAgrupamientoIKA26.orizaba;
       }
       // if(e.summaryCells[10].length !== 0){
       // e.summaryCells[10][0].value = totalAgrupamientoIKA26.ramosArispe;
       // }
       if(e.summaryCells[10].length !== 0){
       e.summaryCells[10][0].value = totalAgrupamientoIKA26.total;
       }
     }
    // if (e.data.key == '202605 MAY') {
    //   if(e.summaryCells[4].length !== 0){
    //   e.summaryCells[4][0].value = totalAgrupamientoIKMY26.cuautitlan;
    //   }
    //   if(e.summaryCells[5].length !== 0){
    //   e.summaryCells[5][0].value = totalAgrupamientoIKMY26.tultitlan;
    //   }
    //   if(e.summaryCells[6].length !== 0){
    //   e.summaryCells[6][0].value = totalAgrupamientoIKMY26.guadalajara;
    //   }
    //   if(e.summaryCells[7].length !== 0){
    //   e.summaryCells[7][0].value = totalAgrupamientoIKMY26.hermosillo;
    //   }
    //   if(e.summaryCells[8].length !== 0){
    //   e.summaryCells[8][0].value = totalAgrupamientoIKMY26.mexicali;
    //   }
    //   if(e.summaryCells[9].length !== 0){
    //   e.summaryCells[9][0].value = totalAgrupamientoIKMY26.orizaba;
    //   }
    //   // if(e.summaryCells[10].length !== 0){
    //   // e.summaryCells[10][0].value = totalAgrupamientoIKMY26.ramosArispe;
    //   // }
    //   if(e.summaryCells[10].length !== 0){
    //   e.summaryCells[10][0].value = totalAgrupamientoIKMY26.total;
    //   }

    // }
    // if (e.data.key == '202606 JUN') {
    //   if(e.summaryCells[4].length !== 0){
    //   e.summaryCells[4][0].value = totalAgrupamientoIKJN26.cuautitlan;
    //   }
    //   if(e.summaryCells[5].length !== 0){
    //   e.summaryCells[5][0].value = totalAgrupamientoIKJN26.tultitlan;
    //   }
    //   if(e.summaryCells[6].length !== 0){
    //   e.summaryCells[6][0].value = totalAgrupamientoIKJN26.guadalajara;
    //   }
    //   if(e.summaryCells[7].length !== 0){
    //   e.summaryCells[7][0].value = totalAgrupamientoIKJN26.hermosillo;
    //   }
    //   if(e.summaryCells[8].length !== 0){
    //   e.summaryCells[8][0].value = totalAgrupamientoIKJN26.mexicali;
    //   }
    //   if(e.summaryCells[9].length !== 0){
    //   e.summaryCells[9][0].value = totalAgrupamientoIKJN26.orizaba;
    //   }
    //   // if(e.summaryCells[10].length !== 0){
    //   // e.summaryCells[10][0].value = totalAgrupamientoIKJN26.ramosArispe;
    //   // }
    //   if(e.summaryCells[10].length !== 0){
    //   e.summaryCells[10][0].value = totalAgrupamientoIKJN26.total;
    //   }
    // }
    // if (e.data.key == '202607 JUL') {
    //   if(e.summaryCells[4].length !== 0){
    //   e.summaryCells[4][0].value = totalAgrupamientoIKJL26.cuautitlan;
    //   }
    //   if(e.summaryCells[5].length !== 0){
    //   e.summaryCells[5][0].value = totalAgrupamientoIKJL26.tultitlan;
    //   }
    //   if(e.summaryCells[6].length !== 0){
    //   e.summaryCells[6][0].value = totalAgrupamientoIKJL26.guadalajara;
    //   }
    //   if(e.summaryCells[7].length !== 0){
    //   e.summaryCells[7][0].value = totalAgrupamientoIKJL26.hermosillo;
    //   }
    //   if(e.summaryCells[8].length !== 0){
    //   e.summaryCells[8][0].value = totalAgrupamientoIKJL26.mexicali;
    //   }
    //   if(e.summaryCells[9].length !== 0){
    //   e.summaryCells[9][0].value = totalAgrupamientoIKJL26.orizaba;
    //   }
    //   // if(e.summaryCells[10].length !== 0){
    //   // e.summaryCells[10][0].value = totalAgrupamientoIKJL26.ramosArispe;
    //   // }
    //   if(e.summaryCells[10].length !== 0){
    //   e.summaryCells[10][0].value = totalAgrupamientoIKJL26.total;
    //   }
    // }
    // if (e.data.key == '202608 AGO') {
    //     if(e.summaryCells[4].length !== 0){
    //     e.summaryCells[4][0].value = totalAgrupamientoIKAG26.cuautitlan;
    //     }

    //     if(e.summaryCells[5].length !== 0){
    //     e.summaryCells[5][0].value = totalAgrupamientoIKAG26.tultitlan;
    //     }
      
    //     if(e.summaryCells[6].length !== 0){
    //     e.summaryCells[6][0].value = totalAgrupamientoIKAG26.guadalajara;
    //     }
      
    //     if(e.summaryCells[7].length !== 0){
    //     e.summaryCells[7][0].value = totalAgrupamientoIKAG26.hermosillo;
    //     }
      
    //     if(e.summaryCells[8].length !== 0){
    //     e.summaryCells[8][0].value = totalAgrupamientoIKAG26.mexicali;
    //     }
      
    //     if(e.summaryCells[9].length !== 0){
    //     e.summaryCells[9][0].value = totalAgrupamientoIKAG26.orizaba;
    //     }
      
    //     // if(e.summaryCells[10].length !== 0){
    //     // e.summaryCells[10][0].value = totalAgrupamientoIKAG26.ramosArispe;
    //     // }
      
    //     if(e.summaryCells[10].length !== 0){
    //     e.summaryCells[10][0].value = totalAgrupamientoIKAG26.total;
    //     }
    // }
    // if (e.data.key == '202609 SEP') {
    //   if(e.summaryCells[4][0].length !== 0){
    //     if(Number.isNaN(totalAgrupamientoIKS26.cuautitlan)){
    //       e.summaryCells[4][0].value = 0;  
    //     }else{
    //       e.summaryCells[4][0].value = totalAgrupamientoIKS26.cuautitlan;
    //     }
    //   }
    //   if(e.summaryCells[5][0].length !== 0){
    //     if(Number.isNaN(totalAgrupamientoIKS26.tultitlan)){
    //       e.summaryCells[5][0].value = 0;  
    //     }else{
    //       e.summaryCells[5][0].value = totalAgrupamientoIKS26.tultitlan;
    //     }
    //   }
    //   if(e.summaryCells[6][0].length !== 0){
    //     if(Number.isNaN(totalAgrupamientoIKS26.guadalajara)){
    //       e.summaryCells[6][0].value = 0;
    //     }else{
    //       e.summaryCells[6][0].value = totalAgrupamientoIKS26.guadalajara;
    //     }
    //   }
    //   if(e.summaryCells[7][0].length !== 0){
    //     if(Number.isNaN(totalAgrupamientoIKS26.hermosillo)){
    //       e.summaryCells[7][0].value = 0;
    //     }else{
    //       e.summaryCells[7][0].value = totalAgrupamientoIKS26.hermosillo;
    //     }
    //   }
    //   if(e.summaryCells[8][0].length !== 0){
    //     if(Number.isNaN(totalAgrupamientoIKS26.mexicali)){
    //       e.summaryCells[8][0].value = 0;
    //     }else{
    //       e.summaryCells[8][0].value = totalAgrupamientoIKS26.mexicali;
    //     }
    //   }
    //   if(e.summaryCells[9][0].length !== 0){
    //     if(Number.isNaN(totalAgrupamientoIKS26.orizaba)){
    //       e.summaryCells[9][0].value = 0;
    //     }else{
    //       e.summaryCells[9][0].value = totalAgrupamientoIKS26.orizaba;
    //     }
    //   }
    //   // if(e.summaryCells[10][0].length !== 0){
    //   //   if(Number.isNaN(totalAgrupamientoIKS26.ramosArispe)){
    //   //     e.summaryCells[10][0].value = 0;
    //   //   }else{
    //   //     e.summaryCells[10][0].value = totalAgrupamientoIKS26.ramosArispe;
    //   //   }
    //   // }
    //   if(e.summaryCells[10][0].length !== 0){
    //     if(Number.isNaN(totalAgrupamientoIKS26.total)){
    //       e.summaryCells[10][0].value = 0;
    //     }else{
    //       e.summaryCells[10][0].value = totalAgrupamientoIKS26.total;
    //     }
    //   }
    // }
    // if (e.data.key == '202610 OCT') {
    //   if(e.summaryCells[4][0].length !== 0){
    //     if(Number.isNaN(totalAgrupamientoIKOC26.cuautitlan)){
    //       e.summaryCells[4][0].value = 0;
    //     }else{
    //       e.summaryCells[4][0].value = totalAgrupamientoIKOC26.cuautitlan;
    //     }
    //   }
    //   if(e.summaryCells[5][0].length !== 0){
    //     if(Number.isNaN(totalAgrupamientoIKOC26.tultitlan)){
    //       e.summaryCells[5][0].value = 0;
    //     }else{
    //       e.summaryCells[5][0].value = totalAgrupamientoIKOC26.tultitlan;
    //     }
    //   }
    //   if(e.summaryCells[6][0].length !== 0){
    //     if(Number.isNaN(totalAgrupamientoIKOC26.guadalajara)){
    //       e.summaryCells[6][0].value = 0;
    //     }else{
    //       e.summaryCells[6][0].value = totalAgrupamientoIKOC26.guadalajara;
    //     }
    //   }
    //   if(e.summaryCells[7][0].length !== 0){
    //     if(Number.isNaN(totalAgrupamientoIKOC26.hermosillo)){
    //       e.summaryCells[7][0].value = 0;
    //     }else{
    //       e.summaryCells[7][0].value = totalAgrupamientoIKOC26.hermosillo;
    //     }
    //   }
    //   if(e.summaryCells[8][0].length !== 0){
    //     if(Number.isNaN(totalAgrupamientoIKOC26.mexicali)){
    //       e.summaryCells[8][0].value = 0;
    //     }else{
    //       e.summaryCells[8][0].value = totalAgrupamientoIKOC26.mexicali;
    //     }
    //   }
    //   if(e.summaryCells[9][0].length !== 0){
    //     if(Number.isNaN(totalAgrupamientoIKOC26.orizaba)){
    //       e.summaryCells[9][0].value = 0;
    //     }{
    //       e.summaryCells[9][0].value = totalAgrupamientoIKOC26.orizaba;
    //     }
    //   }
    //   // if(e.summaryCells[10][0].length !== 0){
    //   //   if(Number.isNaN(totalAgrupamientoIKOC26.ramosArispe)){
    //   //     e.summaryCells[10][0].value = 0;
    //   //   }else{
    //   //     e.summaryCells[10][0].value = totalAgrupamientoIKOC26.ramosArispe;
    //   //   }
    //   // }
    //   if(e.summaryCells[10][0].length !== 0){
    //     if(Number.isNaN(totalAgrupamientoIKOC26.total)){
    //       e.summaryCells[10][0].value = 0;
    //     }else{
    //       e.summaryCells[10][0].value = totalAgrupamientoIKOC26.total;
    //     }
    //   }

    // }
    // if (e.data.key == '202611 NOV') {
    //   if(e.summaryCells[4][0].length !== 0){
    //     if(Number.isNaN(totalAgrupamientoIKNV26.cuautitlan)){
    //       e.summaryCells[4][0].value = 0;
    //     }else{
    //       e.summaryCells[4][0].value = totalAgrupamientoIKNV26.cuautitlan;
    //     }
    //   }
    //   if(e.summaryCells[5][0].length !== 0){
    //     if(Number.isNaN(totalAgrupamientoIKNV26.tultitlan)){
    //       e.summaryCells[5][0].value = 0;
    //     }else{
    //       e.summaryCells[5][0].value = totalAgrupamientoIKNV26.tultitlan;
    //     }
    //   }
    //   if(e.summaryCells[6][0].length !== 0){
    //     if(Number.isNaN(totalAgrupamientoIKNV26.guadalajara)){
    //       e.summaryCells[6][0].value = 0;
    //     }else{
    //       e.summaryCells[6][0].value = totalAgrupamientoIKNV26.guadalajara;
    //     }
    //   }
    //   if(e.summaryCells[7][0].length !== 0){
    //     if(Number.isNaN(totalAgrupamientoIKNV26.hermosillo)){
    //       e.summaryCells[7][0].value = 0;
    //     }else{
    //       e.summaryCells[7][0].value = totalAgrupamientoIKNV26.hermosillo;
    //     }
    //   }
    //   if(e.summaryCells[8][0].length !== 0){
    //     if(Number.isNaN(totalAgrupamientoIKNV26.mexicali)){
    //       e.summaryCells[8][0].value = 0;
    //     }else{
    //       e.summaryCells[8][0].value = totalAgrupamientoIKNV26.mexicali;
    //     }
    //   }
    //   if(e.summaryCells[9][0].length !== 0){
    //     if(Number.isNaN(totalAgrupamientoIKNV26.orizaba)){
    //       e.summaryCells[9][0].value = 0;
    //     }else{
    //       e.summaryCells[9][0].value = totalAgrupamientoIKNV26.orizaba;
    //     }
    //   }
    //   // if(e.summaryCells[10][0].length !== 0){
    //   //   if(Number.isNaN(totalAgrupamientoIKNV26.ramosArispe)){
    //   //     e.summaryCells[10][0].value = 0;
    //   //   }else{
    //   //     e.summaryCells[10][0].value = totalAgrupamientoIKNV26.ramosArispe;
    //   //   }
    //   // }
    //   if(e.summaryCells[10][0].length !== 0){
    //     if(Number.isNaN(totalAgrupamientoIKNV26.total)){
    //       e.summaryCells[10][0].value = 0;
    //     }else{
    //       e.summaryCells[10][0].value = totalAgrupamientoIKNV26.total;
    //     }
    //   }
    // }
    // if (e.data.key == '202612 DIC') {
    //   if(e.summaryCells[4][0].length !== 0){
    //     if(Number.isNaN(totalAgrupamientoIKDC26.cuautitlan)){
    //       e.summaryCells[4][0].value = 0;
    //     }else{
    //       e.summaryCells[4][0].value = totalAgrupamientoIKDC26.cuautitlan;
    //     }
    //   }
    //   if(e.summaryCells[5][0].length !== 0){
    //     if(Number.isNaN(totalAgrupamientoIKDC26.tultitlan)){
    //       e.summaryCells[5][0].value = 0;
    //     }else{
    //       e.summaryCells[5][0].value = totalAgrupamientoIKDC26.tultitlan;
    //     }
    //   }
    //   if(e.summaryCells[6][0].length !== 0){
    //     if(Number.isNaN(totalAgrupamientoIKDC26.guadalajara)){
    //       e.summaryCells[6][0].value = 0;
    //     }else{
    //       e.summaryCells[6][0].value = totalAgrupamientoIKDC26.guadalajara;
    //     }
    //   }
    //   if(e.summaryCells[7][0].length !== 0){
    //     if(Number.isNaN(totalAgrupamientoIKDC26.hermosillo)){
    //       e.summaryCells[7][0].value = 0;
    //     }else{
    //       e.summaryCells[7][0].value = totalAgrupamientoIKDC26.hermosillo;
    //     }
    //   }
    //   if(e.summaryCells[8][0].length !== 0){
    //     if(Number.isNaN(totalAgrupamientoIKDC26.mexicali)){
    //       e.summaryCells[8][0].value = 0;
    //     }else{
    //       e.summaryCells[8][0].value = totalAgrupamientoIKDC26.mexicali;
    //     }
    //   }
    //   if(e.summaryCells[9][0].length !== 0){
    //     if(Number.isNaN(totalAgrupamientoIKDC26.orizaba)){
    //       e.summaryCells[9][0].value = 0;
    //     }else{
    //       e.summaryCells[9][0].value = totalAgrupamientoIKDC26.orizaba;
    //     }
    //   }
    //   // if(e.summaryCells[10][0].length !== 0){
    //   //   if(Number.isNaN(totalAgrupamientoIKDC26.ramosArispe)){
    //   //     e.summaryCells[10][0].value = 0;
    //   //   }else{
    //   //     e.summaryCells[10][0].value = totalAgrupamientoIKDC26.ramosArispe;
    //   // }
    //   // }
    //   if(e.summaryCells[10][0].length !== 0){
    //     if(Number.isNaN(totalAgrupamientoIKDC26.total)){
    //       e.summaryCells[10][0].value = 0;
    //     }else{
    //       e.summaryCells[10][0].value = totalAgrupamientoIKDC26.total;
    //     }
    //   }

    // }
   
  }

  this.paginacion = 60;
  if(this.paginacion = 60){
    this.expandGroup = false
  }
}
onCellPreparedIK2026(e){
  if (e.rowType == 'group'){

    e.cellElement.style.fontSize = '12px';
    e.cellElement.style.background = "#DCDCDC";

  }

  if (e.rowType == 'totalFooter') {
 
    e.totalItem.cells.forEach((c: any) => {
      if(c.totalItem.summaryCells[4][0]?.value != undefined){
        c.totalItem.summaryCells[4][0].value = totalOperacionIK26.cuautitlan;
      }
      if(c.totalItem.summaryCells[5][0]?.value != undefined){
        c.totalItem.summaryCells[5][0].value = totalOperacionIK26.tultitlan;
      }
      if(c.totalItem.summaryCells[6][0]?.value != undefined){
        c.totalItem.summaryCells[6][0].value = totalOperacionIK26.guadalajara;
      }
      if(c.totalItem.summaryCells[7][0]?.value != undefined){
        c.totalItem.summaryCells[7][0].value = totalOperacionIK26.hermosillo;          
      }
      if(c.totalItem.summaryCells[8][0]?.value != undefined){
        c.totalItem.summaryCells[8][0].value = totalOperacionIK26.mexicali;
      }
      if(c.totalItem.summaryCells[9][0]?.value != undefined){
        c.totalItem.summaryCells[9][0].value = totalOperacionIK26.orizaba;
      }
      // if(c.totalItem.summaryCells[10][0]?.value != undefined){
      //   c.totalItem.summaryCells[10][0].value = totalOperacionIK26.ramosArispe;
      // }
      if(c.totalItem.summaryCells[10][0]?.value != undefined){
        c.totalItem.summaryCells[10][0].value = totalOperacionIK26.total;
      }

      if (c.cellElement) {
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "16px";
          c.cellElement.style.background = "#ff9460";
          c.cellElement.style.color = "black"; 
      }   
    });
  }
}
customizeIK2026(e) {  

//    e.forEach((row: any) =>{  
//   var rowValues =  row.values;  

//   if(row.rowType == "group"){
//     if(row.key[0] == '202601 ENE'){

//       rowValues[3][0].value = totalAgrupamientoIKE26.cuautitlan;
//       rowValues[4][0].value = totalAgrupamientoIKE26.tultitlan;
//       rowValues[5][0].value = totalAgrupamientoIKE26.guadalajara;
//       rowValues[6][0].value = totalAgrupamientoIKE26.hermosillo;
//       rowValues[7][0].value = totalAgrupamientoIKE26.mexicali;
//       rowValues[8][0].value = totalAgrupamientoIKE26.orizaba;
//       // rowValues[9][0].value = totalIVCE.ramosArispe;
//       rowValues[9][0].value = totalAgrupamientoIKE26.total;
//     }
//     // if(row.key[0] == '202602 FEB'){

//     //   rowValues[3][0].value = totalIVCF26.cuautitlan;
//     //   rowValues[4][0].value = totalIVCF26.tultitlan;
//     //   rowValues[5][0].value = totalIVCF26.guadalajara;
//     //   rowValues[6][0].value = totalIVCF26.hermosillo;
//     //   rowValues[7][0].value = totalIVCF26.mexicali;
//     //   rowValues[8][0].value = totalIVCF26.orizaba;
//     //   // rowValues[9][0].value = totalIVCF.ramosArispe;
//     //   rowValues[9][0].value = totalIVCF26.total;
//     // }
//     // if(row.key[0] == '202603 MAR'){

//     //   rowValues[3][0].value = totalIVCM26.cuautitlan;
//     //   rowValues[4][0].value = totalIVCM26.tultitlan;
//     //   rowValues[5][0].value = totalIVCM26.guadalajara;
//     //   rowValues[6][0].value = totalIVCM26.hermosillo;
//     //   rowValues[7][0].value = totalIVCM26.mexicali;
//     //   rowValues[8][0].value = totalIVCM26.orizaba;
//     //   // rowValues[9][0].value = totalIVCM.ramosArispe;
//     //   rowValues[9][0].value = totalIVCM26.total;
//     // }
//     // if(row.key[0] == '202604 ABR'){

//     //   rowValues[3][0].value = totalIVCA26.cuautitlan;
//     //   rowValues[4][0].value = totalIVCA26.tultitlan;
//     //   rowValues[5][0].value = totalIVCA26.guadalajara;
//     //   rowValues[6][0].value = totalIVCA26.hermosillo;
//     //   rowValues[7][0].value = totalIVCA26.mexicali;
//     //   rowValues[8][0].value = totalIVCA26.orizaba;
//     //   // rowValues[9][0].value = totalIVCA.ramosArispe;
//     //   rowValues[9][0].value = totalIVCA26.total;
//     // }
//     // if(row.key[0] == '202605 MAY'){

//     //   rowValues[3][0].value = totalIVCMY26.cuautitlan;
//     //   rowValues[4][0].value = totalIVCMY26.tultitlan;
//     //   rowValues[5][0].value = totalIVCMY26.guadalajara;
//     //   rowValues[6][0].value = totalIVCMY26.hermosillo;
//     //   rowValues[7][0].value = totalIVCMY26.mexicali;
//     //   rowValues[8][0].value = totalIVCMY26.orizaba;
//     //   // rowValues[9][0].value = totalIVCMY.ramosArispe;
//     //   rowValues[9][0].value = totalIVCMY26.total;
//     // }
//     // if(row.key[0] == '202606 JUN'){

//     //   rowValues[3][0].value = totalIVCJN26.cuautitlan;
//     //   rowValues[4][0].value = totalIVCJN26.tultitlan;
//     //   rowValues[5][0].value = totalIVCJN26.guadalajara;
//     //   rowValues[6][0].value = totalIVCJN26.hermosillo;
//     //   rowValues[7][0].value = totalIVCJN26.mexicali;
//     //   rowValues[8][0].value = totalIVCJN26.orizaba;
//     //   // rowValues[9][0].value = totalIVCJN26.ramosArispe;
//     //   rowValues[9][0].value = totalIVCJN26.total;
//     // }
//     // if(row.key[0] == '202607 JUL'){

//     //   rowValues[3][0].value = totalIVCJL26.cuautitlan;
//     //   rowValues[4][0].value = totalIVCJL26.tultitlan;
//     //   rowValues[5][0].value = totalIVCJL26.guadalajara;
//     //   rowValues[6][0].value = totalIVCJL26.hermosillo;
//     //   rowValues[7][0].value = totalIVCJL26.mexicali;
//     //   rowValues[8][0].value = totalIVCJL26.orizaba;
//     //   // rowValues[9][0].value = totalIVCJL26.ramosArispe;
//     //   rowValues[9][0].value = totalIVCJL26.total;

//     // }
//     // if(row.key[0] == '202608 AGO'){

//     //   rowValues[3][0].value = totalIVCAG26.cuautitlan;
//     //   rowValues[4][0].value = totalIVCAG26.tultitlan;
//     //   rowValues[5][0].value = totalIVCAG26.guadalajara;
//     //   rowValues[6][0].value = totalIVCAG26.hermosillo;
//     //   rowValues[7][0].value = totalIVCAG26.mexicali;
//     //   rowValues[8][0].value = totalIVCAG26.orizaba;
//     //   // rowValues[9][0].value = totalIVCAG26.ramosArispe;
//     //   rowValues[9][0].value = totalIVCAG26.total;
//     // }
//     // if(row.key[0] == '202609 SEP'){

//     //   rowValues[3][0].value = totalIVCS26.cuautitlan;
//     //   rowValues[4][0].value = totalIVCS26.tultitlan;
//     //   rowValues[5][0].value = totalIVCS26.guadalajara;
//     //   rowValues[6][0].value = totalIVCS26.hermosillo;
//     //   rowValues[7][0].value = totalIVCS26.mexicali;
//     //   rowValues[8][0].value = totalIVCS26.orizaba;
//     //   // rowValues[9][0].value = totalIVCS26.ramosArispe;
//     //   rowValues[9][0].value = totalIVCS26.total;
//     // }
//     // if(row.key[0] == '202610 OCT'){

//     //   rowValues[3][0].value = totalIVCOC26.cuautitlan;
//     //   rowValues[4][0].value = totalIVCOC26.tultitlan;
//     //   rowValues[5][0].value = totalIVCOC26.guadalajara;
//     //   rowValues[6][0].value = totalIVCOC26.hermosillo;
//     //   rowValues[7][0].value = totalIVCOC26.mexicali;
//     //   rowValues[8][0].value = totalIVCOC26.orizaba;
//     //   // rowValues[9][0].value = totalIVCOC26.ramosArispe;
//     //   rowValues[9][0].value = totalIVCOC26.total;
//     // }
//     // if(row.key[0] == '202611 NOV'){

//     //   rowValues[3][0].value = totalIVCNV26.cuautitlan;
//     //   rowValues[4][0].value = totalIVCNV26.tultitlan;
//     //   rowValues[5][0].value = totalIVCNV26.guadalajara;
//     //   rowValues[6][0].value = totalIVCNV26.hermosillo;
//     //   rowValues[7][0].value = totalIVCNV26.mexicali;
//     //   rowValues[8][0].value = totalIVCNV26.orizaba;
//     //   // rowValues[9][0].value = totalIVCNV26.ramosArispe;
//     //   rowValues[9][0].value = totalIVCNV26.total;
//     // }

//     // if(row.key[0] == '202612 DIC'){

//     //   rowValues[3][0].value = totalIVCDC26.cuautitlan;
//     //   rowValues[4][0].value = totalIVCDC26.tultitlan;
//     //   rowValues[5][0].value = totalIVCDC26.guadalajara;
//     //   rowValues[6][0].value = totalIVCDC26.hermosillo;
//     //   rowValues[7][0].value = totalIVCDC26.mexicali;
//     //   rowValues[8][0].value = totalIVCDC26.orizaba;
//     //   // rowValues[9][0].value = totalIVCDC26.ramosArispe;
//     //   rowValues[9][0].value = totalIVCDC26.total;
//     // }
//   }

//   if(row.rowType == "totalFooter"){
//     row.values[3].value = totalOperacionIK26.cuautitlan;
//     row.values[4].value = totalOperacionIK26.tultitlan;
//     row.values[5].value = totalOperacionIK26.guadalajara;
//     row.values[6].value = totalOperacionIK26.hermosillo;
//     row.values[7].value = totalOperacionIK26.mexicali;
//     row.values[8].value = totalOperacionIK26.orizaba;
//     // row.values[9].value = totalOperacionIVC.ramosArispe;
//     row.values[9].value = totalOperacionIK26.total;
//   }

// });

    var gridCell = e.gridCell;

    if (gridCell.rowType === 'group') {

      if(gridCell.column.dataField == "cuatitlan"){
        const totalC = totalAgrupamientoIKE26.cuautitlan.toFixed(1);
        e.value = totalC
      }
      if(gridCell.column.dataField == "tultitlan"){
        const totalT = totalAgrupamientoIKE26.tultitlan.toFixed(1);
        e.value = totalT;
      }
      if(gridCell.column.dataField == "guadalajara"){
        const totalG = totalAgrupamientoIKE26.guadalajara.toFixed(1);
        e.value = totalG;
      }
      if(gridCell.column.dataField == "hermosillo"){
        const totalH = totalAgrupamientoIKE26.hermosillo.toFixed(1);
        e.value = totalH;
      }
      if(gridCell.column.dataField == "mexicali"){
        const totalM = totalAgrupamientoIKE26.mexicali.toFixed(1);
        e.value = totalM;
      }
      if(gridCell.column.dataField == "orizaba"){
        const totalO = totalAgrupamientoIKE26.orizaba.toFixed(1);
        e.value = totalO;
      }
      if(gridCell.column.dataField == "total"){
        const totalTO = totalAgrupamientoIKE26.total.toFixed(1);
        e.value = totalTO;
      }

      e.backgroundColor = "#DCDCDC";
      e.fontWeight = "bolder"
      e.font = {bold: true}

    }

    if (gridCell.rowType === 'totalFooter') {
      var gridCell = e.gridCell;
      if(gridCell.column.dataField == "cuatitlan"){
        const totalC = totalOperacionIK26.cuautitlan.toFixed(1);
        e.value = totalC
      }
      if(gridCell.column.dataField == "tultitlan"){
        const totalT = totalOperacionIK26.tultitlan.toFixed(1);
        e.value = totalT;
      }
      if(gridCell.column.dataField == "guadalajara"){
        const totalG = totalOperacionIK26.guadalajara.toFixed(1);
        e.value = totalG;
      }
      if(gridCell.column.dataField == "hermosillo"){
        const totalH = totalOperacionIK26.hermosillo.toFixed(1);
        e.value = totalH;
      }
      if(gridCell.column.dataField == "mexicali"){
        const totalM = totalOperacionIK26.mexicali.toFixed(1);
        e.value = totalM;
      }
      if(gridCell.column.dataField == "orizaba"){
        const totalO = totalOperacionIK26.orizaba.toFixed(1);
        e.value = totalO;
      }
      if(gridCell.column.dataField == "total"){
        const totalTO = totalOperacionIK26.total.toFixed(1);
        e.value = totalTO;
      }
      console.log(e)
      e.backgroundColor = "#ff9460";
      e.fontWeight = "bolder"
      e.font = {bold: true}

    }

  }
//==============================VIAJES KILOMETROS 2026=================================
onRowPreparedKV2026(e){

  if (e.rowType == 'group'){

    if(e.isExpanded == true){
      this.collapseGroup == true
    }


    if (e.data.key == '202601 ENE') {
      if(e.summaryCells[4].length !== 0){
      e.summaryCells[4][0].value = totalKVCE26.cuautitlan;
      }
      if(e.summaryCells[5].length !== 0){
      e.summaryCells[5][0].value = totalKVCE26.tultitlan;
      }
      if(e.summaryCells[6].length !== 0){
      e.summaryCells[6][0].value = totalKVCE26.guadalajara;
      }
      if(e.summaryCells[7].length !== 0){
      e.summaryCells[7][0].value = totalKVCE26.hermosillo;
      }
      if(e.summaryCells[8].length !== 0){
      e.summaryCells[8][0].value = totalKVCE26.mexicali;
      }
      if(e.summaryCells[9].length !== 0){
      e.summaryCells[9][0].value = totalKVCE26.orizaba;
      }
      // if(e.summaryCells[10].length !== 0){
      // e.summaryCells[10][0].value = totalKVCE26.ramosArispe;
      // }
      if(e.summaryCells[10].length !== 0){
      e.summaryCells[10][0].value = totalKVCE26.total;
      }
      
    }
    if (e.data.key == '202602 FEB') {
      if(e.summaryCells[4].length !== 0){
      e.summaryCells[4][0].value = totalKVCF26.cuautitlan;
      }
      if(e.summaryCells[5].length !== 0){
      e.summaryCells[5][0].value = totalKVCF26.tultitlan;
      }
      if(e.summaryCells[6].length !== 0){
      e.summaryCells[6][0].value = totalKVCF26.guadalajara;
      }
      if(e.summaryCells[7].length !== 0){
      e.summaryCells[7][0].value = totalKVCF26.hermosillo;
      }
      if(e.summaryCells[8].length !== 0){
      e.summaryCells[8][0].value = totalKVCF26.mexicali;
      }
      if(e.summaryCells[9].length !== 0){
      e.summaryCells[9][0].value = totalKVCF26.orizaba;
      }
      // if(e.summaryCells[10].length !== 0){
      // e.summaryCells[10][0].value = totalKVCF26.ramosArispe;
      // }
      if(e.summaryCells[10].length !== 0){
      e.summaryCells[10][0].value = totalKVCF26.total;
      }
    }
    if (e.data.key == '202603 MAR') {
      if(e.summaryCells[4].length !== 0){
      e.summaryCells[4][0].value = totalKVCM26.cuautitlan;
      }
      if(e.summaryCells[5].length !== 0){
      e.summaryCells[5][0].value = totalKVCM26.tultitlan;
      }
      if(e.summaryCells[6].length !== 0){
      e.summaryCells[6][0].value = totalKVCM26.guadalajara;
      }
      if(e.summaryCells[7].length !== 0){
      e.summaryCells[7][0].value = totalKVCM26.hermosillo;
      }
      if(e.summaryCells[8].length !== 0){
      e.summaryCells[8][0].value = totalKVCM26.mexicali;
      }
      if(e.summaryCells[9].length !== 0){
      e.summaryCells[9][0].value = totalKVCM26.orizaba;
      }
      // if(e.summaryCells[10].length !== 0){
      // e.summaryCells[10][0].value = totalKVCM26.ramosArispe;
      // }
      if(e.summaryCells[10].length !== 0){
      e.summaryCells[10][0].value = totalKVCM26.total;
      }
    }
     if (e.data.key == '202604 ABR') {
       if(e.summaryCells[4].length !== 0){
       e.summaryCells[4][0].value = totalKVCA26.cuautitlan;
       }
       if(e.summaryCells[5].length !== 0){
       e.summaryCells[5][0].value = totalKVCA26.tultitlan;
       }
       if(e.summaryCells[6].length !== 0){
       e.summaryCells[6][0].value = totalKVCA26.guadalajara;
       }
       if(e.summaryCells[7].length !== 0){
       e.summaryCells[7][0].value = totalKVCA26.hermosillo;
       }
       if(e.summaryCells[8].length !== 0){
       e.summaryCells[8][0].value = totalKVCA26.mexicali;
       }
       if(e.summaryCells[9].length !== 0){
       e.summaryCells[9][0].value = totalKVCA26.orizaba;
       }
       // if(e.summaryCells[10].length !== 0){
       // e.summaryCells[10][0].value = totalKVCA26.ramosArispe;
       // }
       if(e.summaryCells[10].length !== 0){
       e.summaryCells[10][0].value = totalKVCA26.total;
       }
     }
    // if (e.data.key == '202605 MAY') {
    //   if(e.summaryCells[4].length !== 0){
    //   e.summaryCells[4][0].value = totalKVCMY26.cuautitlan;
    //   }
    //   if(e.summaryCells[5].length !== 0){
    //   e.summaryCells[5][0].value = totalKVCMY26.tultitlan;
    //   }
    //   if(e.summaryCells[6].length !== 0){
    //   e.summaryCells[6][0].value = totalKVCMY26.guadalajara;
    //   }
    //   if(e.summaryCells[7].length !== 0){
    //   e.summaryCells[7][0].value = totalKVCMY26.hermosillo;
    //   }
    //   if(e.summaryCells[8].length !== 0){
    //   e.summaryCells[8][0].value = totalKVCMY26.mexicali;
    //   }
    //   if(e.summaryCells[9].length !== 0){
    //   e.summaryCells[9][0].value = totalKVCMY26.orizaba;
    //   }
    //   // if(e.summaryCells[10].length !== 0){
    //   // e.summaryCells[10][0].value = totalKVCMY26.ramosArispe;
    //   // }
    //   if(e.summaryCells[10].length !== 0){
    //   e.summaryCells[10][0].value = totalKVCMY26.total;
    //   }
    // }
    // if (e.data.key == '202606 JUN') {
    //   if(e.summaryCells[4].length !== 0){
    //   e.summaryCells[4][0].value = totalKVCJN26.cuautitlan;
    //   }
    //   if(e.summaryCells[5].length !== 0){
    //   e.summaryCells[5][0].value = totalKVCJN26.tultitlan;
    //   }
    //   if(e.summaryCells[6].length !== 0){
    //   e.summaryCells[6][0].value = totalKVCJN26.guadalajara;
    //   }
    //   if(e.summaryCells[7].length !== 0){
    //   e.summaryCells[7][0].value = totalKVCJN26.hermosillo;
    //   }
    //   if(e.summaryCells[8].length !== 0){
    //   e.summaryCells[8][0].value = totalKVCJN26.mexicali;
    //   }
    //   if(e.summaryCells[9].length !== 0){
    //   e.summaryCells[9][0].value = totalKVCJN26.orizaba;
    //   }
    //   // if(e.summaryCells[10].length !== 0){
    //   // e.summaryCells[10][0].value = totalKVCJN26.ramosArispe;
    //   // }
    //   if(e.summaryCells[10].length !== 0){
    //   e.summaryCells[10][0].value = totalKVCJN26.total;
    //   }
    // }
    // if (e.data.key == '202607 JUL') {
    //   if(e.summaryCells[4].length !== 0){
    //   e.summaryCells[4][0].value = totalKVCJL26.cuautitlan;
    //   }
    //   if(e.summaryCells[5].length !== 0){
    //   e.summaryCells[5][0].value = totalKVCJL26.tultitlan;
    //   }
    //   if(e.summaryCells[6].length !== 0){
    //   e.summaryCells[6][0].value = totalKVCJL26.guadalajara;
    //   }
    //   if(e.summaryCells[7].length !== 0){
    //   e.summaryCells[7][0].value = totalKVCJL26.hermosillo;
    //   }
    //   if(e.summaryCells[8].length !== 0){
    //   e.summaryCells[8][0].value = totalKVCJL26.mexicali;
    //   }
    //   if(e.summaryCells[9].length !== 0){
    //   e.summaryCells[9][0].value = totalKVCJL26.orizaba;
    //   }
    //   // if(e.summaryCells[10].length !== 0){
    //   // e.summaryCells[10][0].value = totalKVCJL26.ramosArispe;
    //   // }
    //   if(e.summaryCells[10].length !== 0){
    //   e.summaryCells[10][0].value = totalKVCJL26.total;
    //   }
    // }
    // if (e.data.key == '202608 AGO') {
    //     if(e.summaryCells[4].length !== 0){
    //     e.summaryCells[4][0].value = totalKVCAG26.cuautitlan;
    //     }
    //     if(e.summaryCells[5].length !== 0){
    //     e.summaryCells[5][0].value = totalKVCAG26.tultitlan; 
    //     }         
    //     if(e.summaryCells[6].length !== 0){
    //     e.summaryCells[6][0].value = totalKVCAG26.guadalajara;    
    //     }      
    //     if(e.summaryCells[7].length !== 0){
    //     e.summaryCells[7][0].value = totalKVCAG26.hermosillo;
    //     }
    //     if(e.summaryCells[8].length !== 0){
    //     e.summaryCells[8][0].value = totalKVCAG26.mexicali;
    //     }
    //     if(e.summaryCells[9].length !== 0){
    //     e.summaryCells[9][0].value = totalKVCAG26.orizaba;   
    //     }       
    //     // if(e.summaryCells[10].length !== 0){
    //     // e.summaryCells[10][0].value = totalKVCAG26.ramosArispe; 
    //     // }         
    //     if(e.summaryCells[10].length !== 0){
    //     e.summaryCells[10][0].value = totalKVCAG26.total;   
    //     }       
    // }
    // if (e.data.key == '202609 SEP') {
    //   if(e.summaryCells[4][0].length !== 0){
    //     if(Number.isNaN(totalKVCS26.cuautitlan)){
    //       e.summaryCells[4][0].value = 0;
    //     }else{
    //       e.summaryCells[4][0].value = totalKVCS26.cuautitlan;
    //     }
    //   }
    //   if(e.summaryCells[5][0].length !== 0){
    //     if(Number.isNaN(totalKVCS26.tultitlan)){
    //       e.summaryCells[5][0].value = 0;
    //     }else{
    //       e.summaryCells[5][0].value = totalKVCS26.tultitlan;
    //     }
    //   }
    //   if(e.summaryCells[6][0].length !== 0){
    //     if(Number.isNaN(totalKVCS26.guadalajara)){
    //       e.summaryCells[6][0].value = 0;
    //     }else{
    //       e.summaryCells[6][0].value = totalKVCS26.guadalajara;
    //     }
    //   }
    //   if(e.summaryCells[7][0].length !== 0){
    //     if(Number.isNaN(totalKVCS26.hermosillo)){
    //       e.summaryCells[7][0].value = 0;  
    //     }else{
    //       e.summaryCells[7][0].value = totalKVCS26.hermosillo;
    //     }
    //   }
    //   if(e.summaryCells[8][0].length !== 0){
    //     if(Number.isNaN(totalKVCS26.mexicali)){
    //       e.summaryCells[8][0].value = 0;
    //     }else{
    //       e.summaryCells[8][0].value = totalKVCS26.mexicali;
    //     }
    //   }
    //   if(e.summaryCells[9][0].value.length !== 0){
    //     if(Number.isNaN(totalKVCS26.orizaba)){
    //       e.summaryCells[9][0].value = 0;
    //     }else{
    //       e.summaryCells[9][0].value = totalKVCS26.orizaba;
    //     }
    //   }
    //   // if(e.summaryCells[10][0].length !== 0){
    //   //   if(Number.isNaN(totalKVCS26.ramosArispe)){
    //   //     e.summaryCells[10][0].value = 0;  
    //   //   }else{
    //   //     e.summaryCells[10][0].value = totalKVCS26.ramosArispe;
    //   //   }
    //   // }
    //   if(e.summaryCells[10][0].length !== 0){
    //     if(Number.isNaN(totalKVCS26.total)){
    //       e.summaryCells[10][0].value = 0;
    //     }else{
    //       e.summaryCells[10][0].value = totalKVCS26.total;
    //     }
    //   }
    // }
    // if (e.data.key == '202610 OCT') {
    //   if(e.summaryCells[4][0].length !== 0){
    //     if(Number.isNaN(totalKVCOC26.cuautitlan)){
    //       e.summaryCells[4][0].value = 0;
    //     }else{
    //       e.summaryCells[4][0].value = totalKVCOC26.cuautitlan;
    //     }
    //   }
    //   if(e.summaryCells[5][0].length !== 0){
    //     if(Number.isNaN(totalKVCOC26.tultitlan)){
    //       e.summaryCells[5][0].value = 0;
    //     }else{
    //       e.summaryCells[5][0].value = totalKVCOC26.tultitlan;
    //     }
    //   }
    //   if(e.summaryCells[6][0].length !== 0){
    //     if(Number.isNaN(totalKVCOC26.guadalajara)){
    //       e.summaryCells[6][0].value = 0;
    //     }else{
    //       e.summaryCells[6][0].value = totalKVCOC26.guadalajara;
    //     }
    //   }
    //   if(e.summaryCells[7][0].length !== 0){
    //     if(Number.isNaN(totalKVCOC26.hermosillo)){
    //       e.summaryCells[7][0].value = 0;
    //     }else{
    //       e.summaryCells[7][0].value = totalKVCOC26.hermosillo;
    //     }
    //   }
    //   if(e.summaryCells[8][0].length !== 0){
    //     if(Number.isNaN(totalKVCOC26.mexicali)){
    //       e.summaryCells[8][0].value = 0;
    //     }else{
    //       e.summaryCells[8][0].value = totalKVCOC26.mexicali;
    //     }
    //   }
    //   if(e.summaryCells[9][0].length !== 0){
    //     if(Number.isNaN(totalKVCOC26.orizaba)){
    //       e.summaryCells[9][0].value = 0;
    //     }else{
    //       e.summaryCells[9][0].value = totalKVCOC26.orizaba;
    //     }
    //   }
    //   // if(e.summaryCells[10][0].length !== 0){
    //   //   if(Number.isNaN(totalKVCOC26.ramosArispe)){
    //   //     e.summaryCells[10][0].value = 0;
    //   //   }else{
    //   //     e.summaryCells[10][0].value = totalKVCOC26.ramosArispe;
    //   //   }
    //   // }
    //   if(e.summaryCells[10][0].length !== 0){
    //     if(Number.isNaN(totalKVCOC26.total)){
    //       e.summaryCells[10][0].value = 0;
    //     }else{
    //       e.summaryCells[10][0].value = totalKVCOC26.total;
    //     }
    //   }

    // }
    // if (e.data.key == '202611 NOV') {
    //   if(e.summaryCells[4][0].length !== 0){
    //     if(Number.isNaN(totalKVCNV26.cuautitlan)){
    //       e.summaryCells[4][0].value = 0;
    //     }else{
    //       e.summaryCells[4][0].value = totalKVCNV26.cuautitlan;
    //     }
    //   }
    //   if(e.summaryCells[5][0].length !== 0){
    //     if(Number.isNaN(totalKVCNV26.tultitlan)){
    //       e.summaryCells[5][0].value = 0;
    //     }else{
    //       e.summaryCells[5][0].value = totalKVCNV26.tultitlan;
    //     }
    //   }
    //   if(e.summaryCells[6][0].length !== 0){
    //     if(Number.isNaN(totalKVCNV26.guadalajara)){
    //       e.summaryCells[6][0].value = 0;
    //     }else{
    //       e.summaryCells[6][0].value = totalKVCNV26.guadalajara;
    //     }
    //   }
    //   if(e.summaryCells[7][0].length !== 0){
    //     if(Number.isNaN(totalKVCNV26.hermosillo)){
    //       e.summaryCells[7][0].value = 0;
    //     }else{
    //       e.summaryCells[7][0].value = totalKVCNV26.hermosillo;
    //     }
    //   }
    //   if(e.summaryCells[8][0].length !== 0){
    //     if(Number.isNaN(totalKVCNV26.mexicali)){
    //       e.summaryCells[8][0].value = 0;
    //     }else{
    //       e.summaryCells[8][0].value = totalKVCNV26.mexicali;
    //     }
    //   }
    //   if(e.summaryCells[9][0].length !== 0){
    //     if(Number.isNaN(totalKVCNV26.orizaba)){
    //       e.summaryCells[9][0].value = 0;
    //     }else{
    //       e.summaryCells[9][0].value = totalKVCNV26.orizaba;
    //     }
    //   }
    //   // if(e.summaryCells[10][0].length !== 0){
    //   //   if(Number.isNaN(totalKVCNV26.ramosArispe)){
    //   //     e.summaryCells[10][0].value = 0;
    //   //   }else{
    //   //     e.summaryCells[10][0].value = totalKVCNV26.ramosArispe;
    //   //   }
    //   // }
    //   if(e.summaryCells[10][0].length !== 0){
    //     if(Number.isNaN(totalKVCNV26.total)){
    //       e.summaryCells[10][0].value = 0;
    //     }else{
    //       e.summaryCells[10][0].value = totalKVCNV26.total;
    //     }
    //   }

    // }
    // if (e.data.key == '202612 DIC') {
    //   if(e.summaryCells[4][0].length !== 0){
    //     if(Number.isNaN(totalKVCDC26.cuautitlan)){
    //       e.summaryCells[4][0].value = 0;
    //     }else{
    //       e.summaryCells[4][0].value = totalKVCDC26.cuautitlan;
    //     }
    //   }
    //   if(e.summaryCells[5][0].length !== 0){
    //     if(Number.isNaN(totalKVCDC26.tultitlan)){
    //       e.summaryCells[5][0].value = 0;
    //     }else{
    //       e.summaryCells[5][0].value = totalKVCDC26.tultitlan;
    //     }
    //   }
    //   if(e.summaryCells[6][0].length !== 0){
    //     if(Number.isNaN(totalKVCDC26.guadalajara)){
    //       e.summaryCells[6][0].value = 0;
    //     }else{
    //       e.summaryCells[6][0].value = totalKVCDC26.guadalajara;
    //     }
    //   }
    //   if(e.summaryCells[7][0].length !== 0){
    //     if(Number.isNaN(totalKVCDC26.hermosillo)){
    //       e.summaryCells[7][0].value = 0;
    //     }else{
    //       e.summaryCells[7][0].value = totalKVCDC26.hermosillo;
    //     }
    //   }
    //   if(e.summaryCells[8][0].length !== 0){
    //     if(Number.isNaN(totalKVCDC26.mexicali)){
    //       e.summaryCells[8][0].value = 0;
    //     }else{
    //       e.summaryCells[8][0].value = totalKVCDC26.mexicali;
    //     }
    //     }
    //   if(e.summaryCells[9][0].length !== 0){
    //     if(Number.isNaN(totalKVCDC26.orizaba)){
    //       e.summaryCells[9][0].value = 0;
    //     }else{
    //       e.summaryCells[9][0].value = totalKVCDC26.orizaba;
    //     }
    //   }
    //   // if(e.summaryCells[10][0].length !== 0){
    //   //   if(Number.isNaN(totalKVCDC26.ramosArispe)){
    //   //     e.summaryCells[10][0].value = 0;
    //   //   }else{
    //   //     e.summaryCells[10][0].value = totalKVCDC26.ramosArispe;
    //   //   }
    //   // }
    //   if(e.summaryCells[10][0].length !== 0){
    //     if(Number.isNaN(totalKVCDC26.total)){
    //       e.summaryCells[10][0].value = 0;
    //     }else{
    //       e.summaryCells[10][0].value = totalKVCDC26.total;
    //     }
    //   }

    // }

  }

  this.paginacionKV = 60;
  if(this.paginacionKV = 60){
    this.expandGroupKV = false
  }
}

onCellPreparedKV2026(e){
  if (e.rowType == 'group'){

    e.cellElement.style.fontSize = '12px';
    e.cellElement.style.background = "#DCDCDC";

  }

  if (e.rowType == 'totalFooter') {

    e.totalItem.cells.forEach((c: any) => {

      if(c.totalItem.summaryCells[4][0]?.value != undefined){
        c.totalItem.summaryCells[4][0].value = totalOperacionKVC26.cuautitlan;
      }

      if(c.totalItem.summaryCells[5][0]?.value != undefined){
        c.totalItem.summaryCells[5][0].value = totalOperacionKVC26.tultitlan;
      }

      if(c.totalItem.summaryCells[6][0]?.value != undefined){
        c.totalItem.summaryCells[6][0].value = totalOperacionKVC26.guadalajara;
      }

      if(c.totalItem.summaryCells[7][0]?.value != undefined){
        c.totalItem.summaryCells[7][0].value = totalOperacionKVC26.hermosillo;          
      }

      if(c.totalItem.summaryCells[8][0]?.value != undefined){
        c.totalItem.summaryCells[8][0].value = totalOperacionKVC26.mexicali;
      }

      if(c.totalItem.summaryCells[9][0]?.value != undefined){
        c.totalItem.summaryCells[9][0].value = totalOperacionKVC26.orizaba;
      }
      // if(c.totalItem.summaryCells[10][0]?.value != undefined){
      //   c.totalItem.summaryCells[10][0].value = totalOperacionKVC26.ramosArispe;
      // }

      if(c.totalItem.summaryCells[10][0]?.value != undefined){
        c.totalItem.summaryCells[10][0].value = totalOperacionKVC26.total;
      }

      if (c.cellElement) {
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "16px";
          c.cellElement.style.background = "#ff9460";
          c.cellElement.style.color = "black"; 
      }   
    });
  }
}
customizeKV2026(e) {  

  var gridCell = e.gridCell;
  if (gridCell.rowType === 'group') {
    
    e.backgroundColor = "#DCDCDC";
    e.fontWeight = "bolder"
    e.font = {bold: true}

}

if (gridCell.rowType === 'totalFooter') {
    
  e.backgroundColor = "#ff9460";
  e.fontWeight = "bolder"
  e.font = {bold: true}

}
}

customizeExportDataKV2026(cols, rows){

  rows.forEach((row: any) =>{  
    
    var rowValues =  row.values;  
    

    if(row.rowType == "group"){
      if(row.key[0] == '202601 ENE'){

        rowValues[3][0].value = totalKVCE26.cuautitlan;
        rowValues[4][0].value = totalKVCE26.tultitlan;
        rowValues[5][0].value = totalKVCE26.guadalajara;
        rowValues[6][0].value = totalKVCE26.hermosillo;
        rowValues[7][0].value = totalKVCE26.mexicali;
        rowValues[8][0].value = totalKVCE26.orizaba;
        // rowValues[9][0].value = totalKVCE.ramosArispe;
        rowValues[9][0].value = totalKVCE26.total;
      }
      if(row.key[0] == '202602 FEB'){

        rowValues[3][0].value = totalKVCF26.cuautitlan;
        rowValues[4][0].value = totalKVCF26.tultitlan;
        rowValues[5][0].value = totalKVCF26.guadalajara;
        rowValues[6][0].value = totalKVCF26.hermosillo;
        rowValues[7][0].value = totalKVCF26.mexicali;
        rowValues[8][0].value = totalKVCF26.orizaba;
        // rowValues[9][0].value = totalKVCF.ramosArispe;
        rowValues[9][0].value = totalKVCF26.total;
      }
      if(row.key[0] == '202603 MAR'){

        rowValues[3][0].value = totalKVCM26.cuautitlan;
        rowValues[4][0].value = totalKVCM26.tultitlan;
        rowValues[5][0].value = totalKVCM26.guadalajara;
        rowValues[6][0].value = totalKVCM26.hermosillo;
        rowValues[7][0].value = totalKVCM26.mexicali;
        rowValues[8][0].value = totalKVCM26.orizaba;
        // rowValues[9][0].value = totalKVCM.ramosArispe;
        rowValues[9][0].value = totalKVCM26.total;
      }
       if(row.key[0] == '202604 ABR'){

         rowValues[3][0].value = totalKVCA26.cuautitlan;
         rowValues[4][0].value = totalKVCA26.tultitlan;
         rowValues[5][0].value = totalKVCA26.guadalajara;
         rowValues[6][0].value = totalKVCA26.hermosillo;
         rowValues[7][0].value = totalKVCA26.mexicali;
         rowValues[8][0].value = totalKVCA26.orizaba;
         // rowValues[9][0].value = totalKVCA.ramosArispe;
         rowValues[9][0].value = totalKVCA26.total;
       }
      // if(row.key[0] == '202605 MAY'){

      //   rowValues[3][0].value = totalKVCMY26.cuautitlan;
      //   rowValues[4][0].value = totalKVCMY26.tultitlan;
      //   rowValues[5][0].value = totalKVCMY26.guadalajara;
      //   rowValues[6][0].value = totalKVCMY26.hermosillo;
      //   rowValues[7][0].value = totalKVCMY26.mexicali;
      //   rowValues[8][0].value = totalKVCMY26.orizaba;
      //   // rowValues[9][0].value = totalKVCMY.ramosArispe;
      //   rowValues[9][0].value = totalKVCMY26.total;
      // }
      // if(row.key[0] == '202606 JUN'){

      //   rowValues[3][0].value = totalKVCJN26.cuautitlan;
      //   rowValues[4][0].value = totalKVCJN26.tultitlan;
      //   rowValues[5][0].value = totalKVCJN26.guadalajara;
      //   rowValues[6][0].value = totalKVCJN26.hermosillo;
      //   rowValues[7][0].value = totalKVCJN26.mexicali;
      //   rowValues[8][0].value = totalKVCJN26.orizaba;
      //   // rowValues[9][0].value = totalKVCJN26.ramosArispe;
      //   rowValues[9][0].value = totalKVCJN26.total;
      // }
      // if(row.key[0] == '202607 JUL'){

      //   rowValues[3][0].value = totalKVCJL26.cuautitlan;
      //   rowValues[4][0].value = totalKVCJL26.tultitlan;
      //   rowValues[5][0].value = totalKVCJL26.guadalajara;
      //   rowValues[6][0].value = totalKVCJL26.hermosillo;
      //   rowValues[7][0].value = totalKVCJL26.mexicali;
      //   rowValues[8][0].value = totalKVCJL26.orizaba;
      //   // rowValues[9][0].value = totalKVCJL26.ramosArispe;
      //   rowValues[9][0].value = totalKVCJL26.total;

      // }
      // if(row.key[0] == '202608 AGO'){

      //   rowValues[3][0].value = totalKVCAG26.cuautitlan;
      //   rowValues[4][0].value = totalKVCAG26.tultitlan;
      //   rowValues[5][0].value = totalKVCAG26.guadalajara;
      //   rowValues[6][0].value = totalKVCAG26.hermosillo;
      //   rowValues[7][0].value = totalKVCAG26.mexicali;
      //   rowValues[8][0].value = totalKVCAG26.orizaba;
      //   // rowValues[9][0].value = totalKVCAG26.ramosArispe;
      //   rowValues[9][0].value = totalKVCAG26.total;

      // }
      // if(row.key[0] == '202609 SEP'){

      //   rowValues[3][0].value = totalKVCS26.cuautitlan;
      //   rowValues[4][0].value = totalKVCS26.tultitlan;
      //   rowValues[5][0].value = totalKVCS26.guadalajara;
      //   rowValues[6][0].value = totalKVCS26.hermosillo;
      //   rowValues[7][0].value = totalKVCS26.mexicali;
      //   rowValues[8][0].value = totalKVCS26.orizaba;
      //   // rowValues[9][0].value = totalKVCS26.ramosArispe;
      //   rowValues[9][0].value = totalKVCS26.total;

      // }
      // if(row.key[0] == '202610 OCT'){

      //   rowValues[3][0].value = totalKVCOC26.cuautitlan;
      //   rowValues[4][0].value = totalKVCOC26.tultitlan;
      //   rowValues[5][0].value = totalKVCOC26.guadalajara;
      //   rowValues[6][0].value = totalKVCOC26.hermosillo;
      //   rowValues[7][0].value = totalKVCOC26.mexicali;
      //   rowValues[8][0].value = totalKVCOC26.orizaba;
      //   // rowValues[9][0].value = totalKVCOC26.ramosArispe;
      //   rowValues[9][0].value = totalKVCOC26.total;

      // }

      // if(row.key[0] == '202611 NOV'){

      //   rowValues[3][0].value = totalKVCNV26.cuautitlan;
      //   rowValues[4][0].value = totalKVCNV26.tultitlan;
      //   rowValues[5][0].value = totalKVCNV26.guadalajara;
      //   rowValues[6][0].value = totalKVCNV26.hermosillo;
      //   rowValues[7][0].value = totalKVCNV26.mexicali;
      //   rowValues[8][0].value = totalKVCNV26.orizaba;
      //   // rowValues[9][0].value = totalKVCNV26.ramosArispe;
      //   rowValues[9][0].value = totalKVCNV26.total;

      // }
      // if(row.key[0] == '202612 DIC'){

      //   rowValues[3][0].value = totalKVCDC26.cuautitlan;
      //   rowValues[4][0].value = totalKVCDC26.tultitlan;
      //   rowValues[5][0].value = totalKVCDC26.guadalajara;
      //   rowValues[6][0].value = totalKVCDC26.hermosillo;
      //   rowValues[7][0].value = totalKVCDC26.mexicali;
      //   rowValues[8][0].value = totalKVCDC26.orizaba;
      //   // rowValues[9][0].value = totalKVCDC26.ramosArispe;
      //   rowValues[9][0].value = totalKVCDC26.total;

      // }
    }

    if(row.rowType == "totalFooter"){
      

      row.values[3].value = totalOperacionKVC26.cuautitlan;
      row.values[4].value = totalOperacionKVC26.tultitlan;
      row.values[5].value = totalOperacionKVC26.guadalajara;
      row.values[6].value = totalOperacionKVC26.hermosillo;
      row.values[7].value = totalOperacionKVC26.mexicali;
      row.values[8].value = totalOperacionKVC26.orizaba;
      // row.values[9].value = totalOperacionKVC26.ramosArispe;
      row.values[9].value = totalOperacionKVC26.total;


    }

  });

}
//==============================INGRESO VIAJES 2026=================================
onRowPreparedIV2026(e){
  if (e.rowType == 'group'){

    if(e.isExpanded == true){
      this.collapseGroup == true
    }


    if (e.data.key == '202601 ENE') {
      if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalIVCE26.cuautitlan;
      }
      if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalIVCE26.tultitlan;
      }
      if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalIVCE26.guadalajara;
      }
      if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalIVCE26.hermosillo;
      }
      if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalIVCE26.mexicali;
      }
      if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalIVCE26.orizaba;
      }
      // if(e.summaryCells[10].length !== 0){
      //   e.summaryCells[10][0].value = totalIVCE26.ramosArispe;
      // }
      if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalIVCE26.total;
      }

    }
    if (e.data.key == '202602 FEB') {
      if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalIVCF26.cuautitlan;
      }
      if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalIVCF26.tultitlan;
      }
      if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalIVCF26.guadalajara;
      }
      if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalIVCF26.hermosillo;
      }
      if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalIVCF26.mexicali;
      }
      if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalIVCF26.orizaba;
      }
      // if(e.summaryCells[10].length !== 0){
      //   e.summaryCells[10][0].value = totalIVCF26.ramosArispe;
      // }
      if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalIVCF26.total;
      }
    }
    if (e.data.key == '202603 MAR') {
      if(e.summaryCells[4].length !== 0){
        e.summaryCells[4][0].value = totalIVCM26.cuautitlan;
      }
      if(e.summaryCells[5].length !== 0){
        e.summaryCells[5][0].value = totalIVCM26.tultitlan;
      }
      if(e.summaryCells[6].length !== 0){
        e.summaryCells[6][0].value = totalIVCM26.guadalajara;
      }
      if(e.summaryCells[7].length !== 0){
        e.summaryCells[7][0].value = totalIVCM26.hermosillo;
      }
      if(e.summaryCells[8].length !== 0){
        e.summaryCells[8][0].value = totalIVCM26.mexicali;
      }
      if(e.summaryCells[9].length !== 0){
        e.summaryCells[9][0].value = totalIVCM26.orizaba;
      }
      // if(e.summaryCells[10].length !== 0){
      //   e.summaryCells[10][0].value = totalIVCM26.ramosArispe;
      // }
      if(e.summaryCells[10].length !== 0){
        e.summaryCells[10][0].value = totalIVCM26.total;
      }
    }
     if (e.data.key == '202604 ABR') {
       if(e.summaryCells[4].length !== 0){
       e.summaryCells[4][0].value = totalIVCA26.cuautitlan;
       }
       if(e.summaryCells[5].length !== 0){
       e.summaryCells[5][0].value = totalIVCA26.tultitlan;
       }
       if(e.summaryCells[6].length !== 0){
       e.summaryCells[6][0].value = totalIVCA26.guadalajara;
       }
       if(e.summaryCells[7].length !== 0){
       e.summaryCells[7][0].value = totalIVCA26.hermosillo;
       }
       if(e.summaryCells[8].length !== 0){
       e.summaryCells[8][0].value = totalIVCA26.mexicali;
       }
       if(e.summaryCells[9].length !== 0){
       e.summaryCells[9][0].value = totalIVCA26.orizaba;
       }
       // if(e.summaryCells[10].length !== 0){
       // e.summaryCells[10][0].value = totalIVCA26.ramosArispe;
       // }
       if(e.summaryCells[10].length !== 0){
       e.summaryCells[10][0].value = totalIVCA26.total;
       }
     }
  //   if (e.data.key == '202605 MAY') {
  //     if(e.summaryCells[4].length !== 0){
  //     e.summaryCells[4][0].value = totalIVCMY26.cuautitlan;
  //     }
  //     if(e.summaryCells[5].length !== 0){
  //     e.summaryCells[5][0].value = totalIVCMY26.tultitlan;
  //     }
  //     if(e.summaryCells[6].length !== 0){
  //     e.summaryCells[6][0].value = totalIVCMY26.guadalajara;
  //     }
  //     if(e.summaryCells[7].length !== 0){
  //     e.summaryCells[7][0].value = totalIVCMY26.hermosillo;
  //     }
  //     if(e.summaryCells[8].length !== 0){
  //     e.summaryCells[8][0].value = totalIVCMY26.mexicali;
  //     }
  //     if(e.summaryCells[9].length !== 0){
  //     e.summaryCells[9][0].value = totalIVCMY26.orizaba;
  //     }
  //     // if(e.summaryCells[10].length !== 0){
  //     // e.summaryCells[10][0].value = totalIVCMY26.ramosArispe;
  //     // }
  //     if(e.summaryCells[10].length !== 0){
  //     e.summaryCells[10][0].value = totalIVCMY26.total;
  //     }
  //   }
  //   if (e.data.key == '202606 JUN') {
  //     if(e.summaryCells[4].length !== 0){
  //     e.summaryCells[4][0].value = totalIVCJN26.cuautitlan;
  //     }
  //     if(e.summaryCells[5].length !== 0){
  //     e.summaryCells[5][0].value = totalIVCJN26.tultitlan;
  //     }
  //     if(e.summaryCells[6].length !== 0){
  //     e.summaryCells[6][0].value = totalIVCJN26.guadalajara;
  //     }
  //     if(e.summaryCells[7].length !== 0){
  //     e.summaryCells[7][0].value = totalIVCJN26.hermosillo;
  //     }
  //     if(e.summaryCells[8].length !== 0){
  //     e.summaryCells[8][0].value = totalIVCJN26.mexicali;
  //     }
  //     if(e.summaryCells[9].length !== 0){
  //     e.summaryCells[9][0].value = totalIVCJN26.orizaba;
  //     }
  //     // if(e.summaryCells[10].length !== 0){
  //     // e.summaryCells[10][0].value = totalIVCJN26.ramosArispe;
  //     // }
  //     if(e.summaryCells[10].length !== 0){
  //     e.summaryCells[10][0].value = totalIVCJN26.total;
  //     }
  //   }
  //   if (e.data.key == '202607 JUL') {
  //     if(e.summaryCells[4].length !== 0){
  //     e.summaryCells[4][0].value = totalIVCJL26.cuautitlan;
  //     }
  //     if(e.summaryCells[5].length !== 0){
  //     e.summaryCells[5][0].value = totalIVCJL26.tultitlan;
  //     }
  //     if(e.summaryCells[6].length !== 0){
  //     e.summaryCells[6][0].value = totalIVCJL26.guadalajara;
  //     }
  //     if(e.summaryCells[7].length !== 0){
  //     e.summaryCells[7][0].value = totalIVCJL26.hermosillo;
  //     }
  //     if(e.summaryCells[8].length !== 0){
  //     e.summaryCells[8][0].value = totalIVCJL26.mexicali;
  //     }
  //     if(e.summaryCells[9].length !== 0){
  //     e.summaryCells[9][0].value = totalIVCJL26.orizaba;
  //     }
  //     // if(e.summaryCells[10].length !== 0){
  //     // e.summaryCells[10][0].value = totalIVCJL26.ramosArispe;
  //     // }
  //     if(e.summaryCells[10].length !== 0){
  //     e.summaryCells[10][0].value = totalIVCJL26.total;
  //     }
  //   }
  //   if (e.data.key == '202608 AGO') {
  //       if(e.summaryCells[4].length !== 0){
  //       e.summaryCells[4][0].value = totalIVCAG26.cuautitlan;
  //       }
  //       if(e.summaryCells[5].length !== 0){
  //       e.summaryCells[5][0].value = totalIVCAG26.tultitlan;
  //       }          
  //       if(e.summaryCells[6].length !== 0){
  //       e.summaryCells[6][0].value = totalIVCAG26.guadalajara;  
  //       }        
  //       if(e.summaryCells[7].length !== 0){
  //       e.summaryCells[7][0].value = totalIVCAG26.hermosillo;
  //       }
  //       if(e.summaryCells[8].length !== 0){
  //       e.summaryCells[8][0].value = totalIVCAG26.mexicali;
  //       }
  //       if(e.summaryCells[9].length !== 0){
  //       e.summaryCells[9][0].value = totalIVCAG26.orizaba;
  //       }          
  //       // if(e.summaryCells[10].length !== 0){
  //       // e.summaryCells[10][0].value = totalIVCAG26.ramosArispe;     
  //       // }     
  //       if(e.summaryCells[10].length !== 0){
  //       e.summaryCells[10][0].value = totalIVCAG26.total;   
  //       }       
      
  //   }
  //   if (e.data.key == '202609 SEP') {
  //     if(e.summaryCells[4][0].length !== 0){
  //       if(Number.isNaN(totalIVCS26.cuautitlan)){
  //         e.summaryCells[4][0].value = 0;
  //       }else{
  //         e.summaryCells[4][0].value = totalIVCS26.cuautitlan;
  //       }
  //     }
  //     if(e.summaryCells[5][0].length !== 0){
  //       if(Number.isNaN(totalIVCS26.tultitlan)){
  //         e.summaryCells[5][0].value = 0;  
  //       }else{
  //         e.summaryCells[5][0].value = totalIVCS26.tultitlan;
  //       }
  //     }
  //     if(e.summaryCells[6][0].length !== 0){
  //       if(Number.isNaN(totalIVCS26.guadalajara)){
  //         e.summaryCells[6][0].value = 0;
  //       }else{
  //         e.summaryCells[6][0].value = totalIVCS26.guadalajara;
  //       }
  //     }
  //     if(e.summaryCells[7][0].length !== 0){
  //       if(Number.isNaN(totalIVCS26.hermosillo)){
  //         e.summaryCells[7][0].value = 0;
  //       }else{
  //         e.summaryCells[7][0].value = totalIVCS26.hermosillo;
  //       }
  //     }
  //     if(e.summaryCells[8][0].length !== 0){
  //       if(Number.isNaN(totalIVCS26.mexicali)){
  //         e.summaryCells[8][0].value = 0;  
  //       }else{
  //         e.summaryCells[8][0].value = totalIVCS26.mexicali;
  //       }
  //     }
  //     if(e.summaryCells[9][0].length !== 0){
  //       if(Number.isNaN(totalIVCS26.orizaba)){
  //         e.summaryCells[9][0].value = 0;
  //       }else{
  //         e.summaryCells[9][0].value = totalIVCS26.orizaba;
  //       }
  //     }
  //     // if(e.summaryCells[10][0].length !== 0){
  //     //   if(Number.isNaN(totalIVCS26.ramosArispe)){
  //     //     e.summaryCells[10][0].value = 0;
  //     //   }else{
  //     //     e.summaryCells[10][0].value = totalIVCS26.ramosArispe;
  //     //   }
  //     // }
  //     if(e.summaryCells[10][0].length !== 0){
  //       if(Number.isNaN(totalIVCS26.total)){
  //         e.summaryCells[10][0].value = 0;  
  //       }else{
  //         e.summaryCells[10][0].value = totalIVCS26.total;
  //       }
  //     }
  //   }
  //   if (e.data.key == '202610 OCT') {
  //     if(e.summaryCells[4][0].length !== 0){
  //       if(Number.isNaN(totalIVCOC26.cuautitlan)){
  //         e.summaryCells[4][0].value = 0;
  //       }else{
  //         e.summaryCells[4][0].value = totalIVCOC26.cuautitlan;
  //       }
  //     }
  //     if(e.summaryCells[5][0].length !== 0){
  //       if(Number.isNaN(totalIVCOC26.tultitlan)){
  //         e.summaryCells[5][0].value = 0;
  //       }else{
  //         e.summaryCells[5][0].value = totalIVCOC26.tultitlan;
  //       }
  //     }
  //     if(e.summaryCells[6][0].length !== 0){
  //       if(Number.isNaN(totalIVCOC26.guadalajara)){
  //         e.summaryCells[6][0].value = 0;
  //       }else{
  //         e.summaryCells[6][0].value = totalIVCOC26.guadalajara;
  //       }
  //     }
  //     if(e.summaryCells[7][0].length !== 0){
  //       if(Number.isNaN(totalIVCOC26.hermosillo)){
  //         e.summaryCells[7][0].value = 0;
  //       } else{
  //         e.summaryCells[7][0].value = totalIVCOC26.hermosillo;
  //       }
  //     }
  //     if(e.summaryCells[8][0].length !== 0){
  //       if(Number.isNaN(totalIVCOC26.mexicali)){
  //         e.summaryCells[8][0].value = 0;
  //       }else{
  //         e.summaryCells[8][0].value = totalIVCOC26.mexicali;
  //       }
  //     }
  //     if(e.summaryCells[9][0].length !== 0){
  //       if(Number.isNaN(totalIVCOC26.orizaba)){
  //         e.summaryCells[9][0].value = 0;
  //       }else{
  //         e.summaryCells[9][0].value = totalIVCOC26.orizaba;
  //       }
  //     }
  //     // if(e.summaryCells[10][0].length !== 0){
  //     //   if(Number.isNaN(totalIVCOC26.ramosArispe)){
  //     //     e.summaryCells[10][0].value = 0;
  //     //   }else{
  //     //     e.summaryCells[10][0].value = totalIVCOC26.ramosArispe;
  //     //   }
  //     // }
  //     if(e.summaryCells[10][0].length !== 0){
  //       if(Number.isNaN(totalIVCOC26.total)){
  //         e.summaryCells[10][0].value = 0;
  //       }else{
  //         e.summaryCells[10][0].value = totalIVCOC26.total;
  //       }
  //     }
  //   }
  //   if (e.data.key == '202611 NOV') {
  //     if(e.summaryCells[4][0].length !== 0){
  //       if(Number.isNaN(totalIVCNV26.cuautitlan)){
  //         e.summaryCells[4][0].value = 0;
  //       }else{
  //         e.summaryCells[4][0].value = totalIVCNV26.cuautitlan;
  //       }
  //     }
  //     if(e.summaryCells[5][0].length !== 0){
  //       if(Number.isNaN(totalIVCNV26.tultitlan)){
  //         e.summaryCells[5][0].value = 0;
  //       }else{
  //         e.summaryCells[5][0].value = totalIVCNV26.tultitlan;
  //       }
  //     }
  //     if(e.summaryCells[6][0].length !== 0){
  //       if(Number.isNaN(totalIVCNV26.guadalajara)){
  //         e.summaryCells[6][0].value = 0;
  //       }else{
  //         e.summaryCells[6][0].value = totalIVCNV26.guadalajara;
  //       }
  //     }
  //     if(e.summaryCells[7][0].length !== 0){
  //       if(Number.isNaN(totalIVCNV26.hermosillo)){
  //         e.summaryCells[7][0].value = 0;
  //       } else{
  //         e.summaryCells[7][0].value = totalIVCNV26.hermosillo;
  //       }
  //     }
  //     if(e.summaryCells[8][0].length !== 0){
  //       if(Number.isNaN(totalIVCNV26.mexicali)){
  //         e.summaryCells[8][0].value = 0;
  //       }else{
  //         e.summaryCells[8][0].value = totalIVCNV26.mexicali;
  //       }
  //     }
  //     if(e.summaryCells[9][0].length !== 0){
  //       if(Number.isNaN(totalIVCNV26.orizaba)){
  //         e.summaryCells[9][0].value = 0;
  //       }else{
  //         e.summaryCells[9][0].value = totalIVCNV26.orizaba;
  //       }
  //     }
  //     // if(e.summaryCells[10][0].length !== 0){
  //     //   if(Number.isNaN(totalIVCNV26.ramosArispe)){
  //     //     e.summaryCells[10][0].value = 0;
  //     //   }else{
  //     //     e.summaryCells[10][0].value = totalIVCNV26.ramosArispe;
  //     //   }
  //     // }
  //     if(e.summaryCells[10][0].length !== 0){
  //       if(Number.isNaN(totalIVCNV26.total)){
  //         e.summaryCells[10][0].value = 0;
  //       }else{
  //         e.summaryCells[10][0].value = totalIVCNV26.total;
  //       }
  //     }
  //   }
  //   if (e.data.key == '202612 DIC') {
  //     if(e.summaryCells[4][0].length !== 0){
  //       if(Number.isNaN(totalIVCDC26.cuautitlan)){
  //         e.summaryCells[4][0].value = 0;
  //       }else{
  //         e.summaryCells[4][0].value = totalIVCDC26.cuautitlan;
  //       }
  //     }
  //   if(e.summaryCells[5][0].length !== 0){
  //     if(Number.isNaN(totalIVCDC26.tultitlan)){
  //       e.summaryCells[5][0].value = 0;
  //     }else{
  //       e.summaryCells[5][0].value = totalIVCDC26.tultitlan;
  //     }
  //   }
  //   if(e.summaryCells[6][0].length !== 0){
  //     if(Number.isNaN(totalIVCDC26.guadalajara)){
  //       e.summaryCells[6][0].value = 0;
  //     }else{
  //       e.summaryCells[6][0].value = totalIVCDC26.guadalajara;
  //     }
  //   }
  //   if(e.summaryCells[7][0].length !== 0){
  //     if(Number.isNaN(totalIVCDC26.hermosillo)){
  //       e.summaryCells[7][0].value = 0;
  //     }else{
  //       e.summaryCells[7][0].value = totalIVCDC26.hermosillo;
  //     }
  //   }
  //   if(e.summaryCells[8][0].length !== 0){
  //     if(Number.isNaN(totalIVCDC26.mexicali)){
  //       e.summaryCells[8][0].value = 0;
  //     }else{
  //       e.summaryCells[8][0].value = totalIVCDC26.mexicali;
  //     }
  //   }
  //   if(e.summaryCells[9][0].length !== 0){
  //     if(Number.isNaN(totalIVCDC26.orizaba)){
  //       e.summaryCells[9][0].value = 0;
  //     }else{
  //       e.summaryCells[9][0].value = totalIVCDC26.orizaba;
  //     }
  //   }
  //   // if(e.summaryCells[10][0].length !== 0){
  //   //   if(Number.isNaN(totalIVCDC26.ramosArispe)){
  //   //     e.summaryCells[10][0].value = 0;
  //   //   }else{
  //   //     e.summaryCells[10][0].value = totalIVCDC26.ramosArispe;
  //   //   }
  //   // }
  //   if(e.summaryCells[10][0].length !== 0){
  //     if(Number.isNaN(totalIVCDC26.total)){
  //       e.summaryCells[10][0].value = 0;
  //     }else{
  //       e.summaryCells[10][0].value = totalIVCDC26.total;
  //   }
  // }



  //   }    
  
  }

  this.paginacion = 60;
  if(this.paginacion = 60){
    this.expandGroup = false
  }
}

onCellPreparedIV2026(e){
  if (e.rowType == 'group'){

    e.cellElement.style.fontSize = '12px';
    e.cellElement.style.background = "#DCDCDC";

  }

  if (e.rowType == 'totalFooter') {

    e.totalItem.cells.forEach((c: any) => {
      if(c.totalItem.summaryCells[4][0]?.value != undefined){
        c.totalItem.summaryCells[4][0].value = totalOperacionIVC26.cuautitlan;
      }

      if(c.totalItem.summaryCells[5][0]?.value != undefined){
        c.totalItem.summaryCells[5][0].value = totalOperacionIVC26.tultitlan;
      }

      if(c.totalItem.summaryCells[6][0]?.value != undefined){
        c.totalItem.summaryCells[6][0].value = totalOperacionIVC26.guadalajara;
      }

      if(c.totalItem.summaryCells[7][0]?.value != undefined){
        c.totalItem.summaryCells[7][0].value = totalOperacionIVC26.hermosillo;          
      }

      if(c.totalItem.summaryCells[8][0]?.value != undefined){
        c.totalItem.summaryCells[8][0].value = totalOperacionIVC26.mexicali;
      }

      if(c.totalItem.summaryCells[9][0]?.value != undefined){
        c.totalItem.summaryCells[9][0].value = totalOperacionIVC26.orizaba;
      }
      // if(c.totalItem.summaryCells[10][0]?.value != undefined){
      //   c.totalItem.summaryCells[10][0].value = totalOperacionIVC26.ramosArispe;
      // }

      if(c.totalItem.summaryCells[10][0]?.value != undefined){
        c.totalItem.summaryCells[10][0].value = totalOperacionIVC26.total;
      }

      if (c.cellElement) {
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "16px";
          c.cellElement.style.background = "#ff9460";
          c.cellElement.style.color = "black"; 
      }   
    });
  }

}

customizeIV2026(e){
  var gridCell = e.gridCell;
  if (gridCell.rowType === 'group') {
    
    e.backgroundColor = "#DCDCDC";
    e.fontWeight = "bolder"
    e.font = {bold: true}

  }

  if (gridCell.rowType === 'totalFooter') {

    e.backgroundColor = "#ff9460";
    e.fontWeight = "bolder"
    e.font = {bold: true}

  }
}

customizeExportDataIV2026(cols, rows){

  rows.forEach((row: any) =>{  
  var rowValues =  row.values;  

  if(row.rowType == "group"){
    if(row.key[0] == '202601 ENE'){

      rowValues[3][0].value = totalIVCE26.cuautitlan;
      rowValues[4][0].value = totalIVCE26.tultitlan;
      rowValues[5][0].value = totalIVCE26.guadalajara;
      rowValues[6][0].value = totalIVCE26.hermosillo;
      rowValues[7][0].value = totalIVCE26.mexicali;
      rowValues[8][0].value = totalIVCE26.orizaba;
      // rowValues[9][0].value = totalIVCE.ramosArispe;
      rowValues[9][0].value = totalIVCE26.total;
    }
    if(row.key[0] == '202602 FEB'){

      rowValues[3][0].value = totalIVCF26.cuautitlan;
      rowValues[4][0].value = totalIVCF26.tultitlan;
      rowValues[5][0].value = totalIVCF26.guadalajara;
      rowValues[6][0].value = totalIVCF26.hermosillo;
      rowValues[7][0].value = totalIVCF26.mexicali;
      rowValues[8][0].value = totalIVCF26.orizaba;
      // rowValues[9][0].value = totalIVCF.ramosArispe;
      rowValues[9][0].value = totalIVCF26.total;
    }
    if(row.key[0] == '202603 MAR'){

      rowValues[3][0].value = totalIVCM26.cuautitlan;
      rowValues[4][0].value = totalIVCM26.tultitlan;
      rowValues[5][0].value = totalIVCM26.guadalajara;
      rowValues[6][0].value = totalIVCM26.hermosillo;
      rowValues[7][0].value = totalIVCM26.mexicali;
      rowValues[8][0].value = totalIVCM26.orizaba;
      // rowValues[9][0].value = totalIVCM.ramosArispe;
      rowValues[9][0].value = totalIVCM26.total;
    }
     if(row.key[0] == '202604 ABR'){

       rowValues[3][0].value = totalIVCA26.cuautitlan;
       rowValues[4][0].value = totalIVCA26.tultitlan;
       rowValues[5][0].value = totalIVCA26.guadalajara;
       rowValues[6][0].value = totalIVCA26.hermosillo;
       rowValues[7][0].value = totalIVCA26.mexicali;
       rowValues[8][0].value = totalIVCA26.orizaba;
       // rowValues[9][0].value = totalIVCA.ramosArispe;
       rowValues[9][0].value = totalIVCA26.total;
     }
    // if(row.key[0] == '202605 MAY'){

    //   rowValues[3][0].value = totalIVCMY26.cuautitlan;
    //   rowValues[4][0].value = totalIVCMY26.tultitlan;
    //   rowValues[5][0].value = totalIVCMY26.guadalajara;
    //   rowValues[6][0].value = totalIVCMY26.hermosillo;
    //   rowValues[7][0].value = totalIVCMY26.mexicali;
    //   rowValues[8][0].value = totalIVCMY26.orizaba;
    //   // rowValues[9][0].value = totalIVCMY.ramosArispe;
    //   rowValues[9][0].value = totalIVCMY26.total;
    // }
    // if(row.key[0] == '202606 JUN'){

    //   rowValues[3][0].value = totalIVCJN26.cuautitlan;
    //   rowValues[4][0].value = totalIVCJN26.tultitlan;
    //   rowValues[5][0].value = totalIVCJN26.guadalajara;
    //   rowValues[6][0].value = totalIVCJN26.hermosillo;
    //   rowValues[7][0].value = totalIVCJN26.mexicali;
    //   rowValues[8][0].value = totalIVCJN26.orizaba;
    //   // rowValues[9][0].value = totalIVCJN26.ramosArispe;
    //   rowValues[9][0].value = totalIVCJN26.total;
    // }
    // if(row.key[0] == '202607 JUL'){

    //   rowValues[3][0].value = totalIVCJL26.cuautitlan;
    //   rowValues[4][0].value = totalIVCJL26.tultitlan;
    //   rowValues[5][0].value = totalIVCJL26.guadalajara;
    //   rowValues[6][0].value = totalIVCJL26.hermosillo;
    //   rowValues[7][0].value = totalIVCJL26.mexicali;
    //   rowValues[8][0].value = totalIVCJL26.orizaba;
    //   // rowValues[9][0].value = totalIVCJL26.ramosArispe;
    //   rowValues[9][0].value = totalIVCJL26.total;

    // }
    // if(row.key[0] == '202608 AGO'){

    //   rowValues[3][0].value = totalIVCAG26.cuautitlan;
    //   rowValues[4][0].value = totalIVCAG26.tultitlan;
    //   rowValues[5][0].value = totalIVCAG26.guadalajara;
    //   rowValues[6][0].value = totalIVCAG26.hermosillo;
    //   rowValues[7][0].value = totalIVCAG26.mexicali;
    //   rowValues[8][0].value = totalIVCAG26.orizaba;
    //   // rowValues[9][0].value = totalIVCAG26.ramosArispe;
    //   rowValues[9][0].value = totalIVCAG26.total;
    // }
    // if(row.key[0] == '202609 SEP'){

    //   rowValues[3][0].value = totalIVCS26.cuautitlan;
    //   rowValues[4][0].value = totalIVCS26.tultitlan;
    //   rowValues[5][0].value = totalIVCS26.guadalajara;
    //   rowValues[6][0].value = totalIVCS26.hermosillo;
    //   rowValues[7][0].value = totalIVCS26.mexicali;
    //   rowValues[8][0].value = totalIVCS26.orizaba;
    //   // rowValues[9][0].value = totalIVCS26.ramosArispe;
    //   rowValues[9][0].value = totalIVCS26.total;
    // }
    // if(row.key[0] == '202610 OCT'){

    //   rowValues[3][0].value = totalIVCOC26.cuautitlan;
    //   rowValues[4][0].value = totalIVCOC26.tultitlan;
    //   rowValues[5][0].value = totalIVCOC26.guadalajara;
    //   rowValues[6][0].value = totalIVCOC26.hermosillo;
    //   rowValues[7][0].value = totalIVCOC26.mexicali;
    //   rowValues[8][0].value = totalIVCOC26.orizaba;
    //   // rowValues[9][0].value = totalIVCOC26.ramosArispe;
    //   rowValues[9][0].value = totalIVCOC26.total;
    // }
    // if(row.key[0] == '202611 NOV'){

    //   rowValues[3][0].value = totalIVCNV26.cuautitlan;
    //   rowValues[4][0].value = totalIVCNV26.tultitlan;
    //   rowValues[5][0].value = totalIVCNV26.guadalajara;
    //   rowValues[6][0].value = totalIVCNV26.hermosillo;
    //   rowValues[7][0].value = totalIVCNV26.mexicali;
    //   rowValues[8][0].value = totalIVCNV26.orizaba;
    //   // rowValues[9][0].value = totalIVCNV26.ramosArispe;
    //   rowValues[9][0].value = totalIVCNV26.total;
    // }

    // if(row.key[0] == '202612 DIC'){

    //   rowValues[3][0].value = totalIVCDC26.cuautitlan;
    //   rowValues[4][0].value = totalIVCDC26.tultitlan;
    //   rowValues[5][0].value = totalIVCDC26.guadalajara;
    //   rowValues[6][0].value = totalIVCDC26.hermosillo;
    //   rowValues[7][0].value = totalIVCDC26.mexicali;
    //   rowValues[8][0].value = totalIVCDC26.orizaba;
    //   // rowValues[9][0].value = totalIVCDC26.ramosArispe;
    //   rowValues[9][0].value = totalIVCDC26.total;
    // }
  }

  if(row.rowType == "totalFooter"){
    row.values[3].value = totalOperacionIVC.cuautitlan;
    row.values[4].value = totalOperacionIVC.tultitlan;
    row.values[5].value = totalOperacionIVC.guadalajara;
    row.values[6].value = totalOperacionIVC.hermosillo;
    row.values[7].value = totalOperacionIVC.mexicali;
    row.values[8].value = totalOperacionIVC.orizaba;
    // row.values[9].value = totalOperacionIVC.ramosArispe;
    row.values[9].value = totalOperacionIVC.total;
  }

});

}

//==============================INGRESO OPERADOR 2026===================================
onRowPreparedIO2026(e){
  if (e.rowType == 'data') {

    e.cells.forEach((c: any) => {
      if (c.cellElement) {
        if(c.columnIndex == 4){
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "15px";
          c.cellElement.style.background = "#cdcbcb";
        }
        }
    })
  
  }
}

onCellPreparedIO2026(e){
  if (e.rowType == 'groupFooter'){

    e.cellElement.style.fontSize = '12px';
    e.cellElement.style.background = "#DCDCDC";
  }
  

  if (e.rowType == 'totalFooter') {
  
    e.totalItem.cells.forEach((c: any) => {

      if (c.cellElement) {
        c.cellElement.style.fontWeight = "bolder";
        c.cellElement.style.fontSize = "16px";
        c.cellElement.style.background = "#ff9460";
        c.cellElement.style.color = "black"; 
    }  
    })
  }
}  


// ======================================KMS MENSUALEs==============================
  onRowPreparedKMS(e){

  }

  onCellPreparedIKMS(e){

  }


  onRowPreparedSO(e){
    
    if(e.rowType == 'groupFooter'){
      if(e.data.key ==  "01: ENE"){
        this.soEne = e.summaryCells[3][0].value;
        this.sdEne = e.summaryCells[5][0].value;
      }

      if(e.data.key ==  "02: FEB"){
        this.soFeb = e.summaryCells[3][0].value;
        this.sdFeb = e.summaryCells[5][0].value;
      }

      if(e.data.key ==  "03: MAR"){
        this.soMar = e.summaryCells[3][0].value;
        this.sdMar = e.summaryCells[5][0].value;
      }

      if(e.data.key ==  "04: ABR"){
        this.soAbr = e.summaryCells[3][0].value;
        this.sdAbr = e.summaryCells[5][0].value;
      }

      if(e.data.key ==  "05: MAY"){
        this.soMay = e.summaryCells[3][0].value;
        this.sdMay = e.summaryCells[5][0].value;
      }

      // if(e.data.key ==  "06: JUN"){
      //   this.soJun = e.summaryCells[3][0].value;
      //   this.sdJun = e.summaryCells[5][0].value;
      // }
      // if(e.data.key ==  "06: JUL"){
      //   this.soJun = e.summaryCells[3][0].value;
      //   this.sdJun = e.summaryCells[5][0].value;
      // }


      var myOperation = this.soEne + this.soFeb + this.soMar + this.soAbr + this.soMay;
      this.totalOperaSO = myOperation / 5;

      var myOpSD = this.sdEne + this.sdFeb + this.sdMar + this.sdAbr + this.sdMay;
      this.totalSueldoDSO  = myOpSD / 5;
  
    }
    
      this.autogrouping = true;
  }

  onCellPreparedSO(e){
    if (e.rowType == 'group'){

      e.cellElement.style.fontSize = '12px';
      e.cellElement.style.background = "#DCDCDC";
    }

    

    if (e.rowType == 'totalFooter') {
      e.totalItem.cells.forEach((c: any) => {

        c.totalItem.summaryCells[3][0].value = this.totalOperaSO
        c.totalItem.summaryCells[5][0].value = this.totalSueldoDSO
        
        if (c.cellElement) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "16px";
            c.cellElement.style.background = "#ff9460";
            c.cellElement.style.color = "black"; 
        }   
      });
    }
  }

  onRowPreparedSOAC(e){
    
    if(e.rowType == 'groupFooter'){
      ////(e.data)
      if(e.data.key ==  "01 ENE"){
        this.soEneAC = e.summaryCells[3][0].value;
        this.sdEneAC = e.summaryCells[5][0].value;
      }

      if(e.data.key ==  "02 FEB"){
        this.soFebAC = e.summaryCells[3][0].value;
        this.sdFebAC = e.summaryCells[5][0].value;
      }

      if(e.data.key ==  "03 MAR"){
        this.soMarAC = e.summaryCells[3][0].value;
        this.sdMarAC = e.summaryCells[5][0].value;
      }

      if(e.data.key ==  "04 ABR"){
        this.soAbrAC = e.summaryCells[3][0].value;
        this.sdAbrAC = e.summaryCells[5][0].value;
      }

      // if(e.data.key ==  "05 MAY"){
      //   this.soMayAC = e.summaryCells[3][0].value;
      //   this.sdMayAC = e.summaryCells[5][0].value;
      // }

      // if(e.data.key ==  "06 JUN"){
      //   this.soJunAC = e.summaryCells[3][0].value;
      //   this.sdJunAC = e.summaryCells[5][0].value;
      // }

      // if(e.data.key ==  "07 JUL"){
      //   this.soJunAC = e.summaryCells[3][0].value;
      //   this.sdJunAC = e.summaryCells[5][0].value;
      // }



      var myOperationAC = this.soEneAC + this.soFebAC + this.soMarAC + this.soAbrAC //+ this.soMay;
      this.totalOperaSOAC = myOperationAC / 4;

      var myOpSDAC = this.sdEneAC + this.sdFebAC + this.sdMarAC + this.sdAbrAC// + this.sdMay;
      this.totalSueldoDSOAC  = myOpSDAC / 4;
  
    }
    
      this.autogroupingAC = true;
  }

  onCellPreparedSOAC(e){
    if (e.rowType == 'group'){

      e.cellElement.style.fontSize = '12px';
      e.cellElement.style.background = "#DCDCDC";
    }

    

    if (e.rowType == 'totalFooter') {
      e.totalItem.cells.forEach((c: any) => {

        c.totalItem.summaryCells[3][0].value = this.totalOperaSOAC
        c.totalItem.summaryCells[5][0].value = this.totalSueldoDSOAC
        
        if (c.cellElement) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "16px";
            c.cellElement.style.background = "#ff9460";
            c.cellElement.style.color = "black"; 
        }   
      });
    }
  }


  onRowPreparedSD(e){

  }

  onCellPreparedSD(e){
    if (e.rowType == 'group'){

      e.cellElement.style.fontSize = '12px';
      e.cellElement.style.background = "#DCDCDC";
    }

    

    if (e.rowType == 'totalFooter') {
      e.totalItem.cells.forEach((c: any) => {
        
        if (c.cellElement) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "16px";
            c.cellElement.style.background = "#ff9460";
            c.cellElement.style.color = "black"; 
        }   
      });
    }
  }

  onCellPreparedIpCV(e){
    if (e.rowType == 'group'){
  
      e.cellElement.style.fontSize = '12px';
      e.cellElement.style.background = "#DCDCDC";
    }
  
    if (e.rowType == 'totalFooter') {
    
      e.totalItem.cells.forEach((c: any) => {
  
        if (c.cellElement) {
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "16px";
          c.cellElement.style.background = "#ff9460";
          c.cellElement.style.color = "black"; 
      }   

      })
    }
  }
//===================================FORMATOS PARA LA DATA DE GRIDS=================
  newText: string = "";
  test(e){
    this.newText = e;
    //(this.newText)
  }

  separator(value) {
    var str = value.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
  }

  redondearIK(value){
    const total = value.toFixed(1);

    return "$ "+total;
  }

  separatorKV(value) {

    // var str = value.toString().split(".");
    // str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // let t=value.toString();
    // let regex=/(\d*.\d{0,2})/;
    // t.match(regex)[0];

    // return str.join("."), t.match(regex)[0];;

    var myvalue = Math.trunc(value);

    var myFormat = myvalue.toString().split(".");
    myFormat[0] = myFormat[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    

    return myFormat.join("");
  }

  separatorIV(value){
    var myvalue = Math.trunc(value);

    var myFormat = myvalue.toString().split(".");
    myFormat[0] = myFormat[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    

    return "$ "+myFormat.join("");
  }

  separatorOUDN(value){
    var myvalue = Math.trunc(value);

    var myFormat = myvalue.toString().split(".");
    myFormat[0] = myFormat[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    

    return myFormat.join("");
  }

  formatPesosMX(value){
  
      var myvalue = Math.trunc(value);
  
      var myFormat = myvalue.toString().split(".");
      myFormat[0] = myFormat[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      
  
      return '$ '+myFormat.join("");
  }
  /*================================EXPORTAR TODOS LOS KAPIS==========================*/
  export() {
    const chartInstance1 = this.chart1.instance;
    const chartInstance2 = this.chart2.instance;
    const chartInstance3 = this.chart3.instance;
    const chartInstance4 = this.chart4.instance;
    const chartInstance5 = this.chart5.instance;
    const chartInstance6 = this.chart6.instance;

    exportWidgets([[chartInstance1], [chartInstance2], [chartInstance3], [chartInstance4], [chartInstance5], [chartInstance6]], {
      fileName: 'KPI´s',
      format: 'PDF',
    });

    // const chartTest = this.chartTest.instance;
    // exportWidgets([[chartTest]], {
    //   fileName: 'KPI´s',
    //   format: 'PDF',
    // });

    // exportFromMarkup(this.prepareMarkup(), {
    //   width: 2000,
    //   height: 420,
    //   margin: 0,
    //   format: 'pdf',
    //   svgToCanvas(svg, canvas) {
    //     return new Promise((resolve) => {
    //       canvg(canvas, new XMLSerializer().serializeToString(svg), {
    //         ignoreDimensions: true,
    //         ignoreClear: true,
    //         renderCallback: resolve,
    //       });
    //     });
    //   },
    // });

    
  }

  export24() {
    const chartInstance124 = this.chart124.instance;
    const chartInstance224 = this.chart224.instance;
    const chartInstance324 = this.chart324.instance;
    const chartInstance424 = this.chart424.instance;
    const chartInstance524 = this.chart524.instance;
    const chartInstance624 = this.chart624.instance;

    exportWidgets([[chartInstance124], [chartInstance224], [chartInstance324], [chartInstance424], [chartInstance524], [chartInstance624]], {
      fileName: 'KPI´s',
      format: 'PDF',
    });

    // const chartTest = this.chartTest.instance;
    // exportWidgets([[chartTest]], {
    //   fileName: 'KPI´s',
    //   format: 'PDF',
    // });

    // exportFromMarkup(this.prepareMarkup(), {
    //   width: 2000,
    //   height: 420,
    //   margin: 0,
    //   format: 'pdf',
    //   svgToCanvas(svg, canvas) {
    //     return new Promise((resolve) => {
    //       canvg(canvas, new XMLSerializer().serializeToString(svg), {
    //         ignoreDimensions: true,
    //         ignoreClear: true,
    //         renderCallback: resolve,
    //       });
    //     });
    //   },
    // });

    
  }

  prepareMarkup() {
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="820px" height="420px">${
      document.getElementById('custom_markup_container').innerHTML
    }<g transform="translate(305,12)">${
      this.chart1.instance.svg()
    }</g>`
            + '</svg>';
  }

   //==================Formato a la data de la grafica==================================
   formatSliderTooltip (value) {
    
    return ((value.valueText) * 100).toFixed(2).toString() + '%';
    
  }

  formatPercetn(value){
    const total = value.toFixed(2);

    return total+" %";
    //return`${parseFloat(value.porcentaje).toFixed(2)}%`;
    //   ixc[i].porcentaje = myValue;
  }


  redondearD(value){
    const total = value.toFixed(2);

    return total;
  }

  calcularPorcentajes(options: any) {
    // //
    // if (options.summaryProcess === 'calculate') {
    //   if (options.name === 'grupMargenUtilidaPor') {
    //     options.totalValue = .17;
    //   }
    // }
  }

  // customizeLabel = (point) =>{
  //   //(point)
  //   return `$${parseFloat(point.valueText).toFixed(2)}`;
  // }

  customizeLabel = (pointInfo) => {
    const value = parseFloat(pointInfo.valueText);
    const formattedValue = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 2
    }).format(value);
    return formattedValue;
};

}


