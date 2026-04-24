import { Injectable } from '@angular/core';

export class RentabilidadService {
    
    tipoOperacion: string;
    cliente: string;
    tracto: string;
    idUnidadNegocio: string;
    unidadNegocio: string;
    idOperador: string;
    operador: string;
    noLiquidacion: string;
    inicio: string;
    fin: string;
    diasViaje: string;
    viajes: string;
    kmsCargados: string;
    kmsVacios: string;
    lstDiesel: string;
    rendimiento:string;
    ingresoTotal: string;
    combustible: string;
    combustiblePor: string;
    casetas: string;
    casetasPor: string;
    sueldosLiquidacion: string;
    sueldosLiquidacionPor: string;
    otros: string;
    otrosPor: string;
    costosDirectosViaje: string;
    costosDirectosViajePor: string;
    sueldoBase: string;
    sueldoBasePor: string;
    cargaSocialNomina: string;
    cargaSocialNominaPor: string;
    fijoMtto: string;
    fijoMttoPor: string;
    varMtto: string;
    varMttoPor: string;
    fijoTrans: string;
    fijoTransPor: string;
    varTrans: string;
    varTransPor: string;
    costosAdicionales: string;
    costosAdicionalesPor: string;
    margenUtilida: string;
    margenUtilidaPor: string;

}

const countriesInfo: RentabilidadService[] = [
{
    tipoOperacion: 'Caja seca',
    cliente: 'LA MADRILEÑA',
    tracto: 'Tracto: TT1223',
    idUnidadNegocio: '',
    unidadNegocio: '',
    idOperador: '',
    operador: '',
    noLiquidacion: '32640',
    inicio: '23-11-21 05:46',
    fin: '25-11-21 18:25',
    ingresoTotal: '$ 0',
    margenUtilida: '-$ 17,213.55',
    margenUtilidaPor: '0%',
    diasViaje: '3',
    viajes: '2',
    kmsCargados: '0',
    kmsVacios: '1.243',
    lstDiesel: '402',
    rendimiento:'3.09',
    combustible: '$ 6,960',
    combustiblePor: '0%',
    casetas: '$ 4,104.31',
    casetasPor: '0%',
    sueldosLiquidacion: '$0',
    sueldosLiquidacionPor: '0%',
    otros: '$ 300',
    otrosPor: '0%',
    costosDirectosViaje: '$ 11,364.31',
    costosDirectosViajePor: '0%',
    sueldoBase: '$ 225.24',
    sueldoBasePor: '0%',
    cargaSocialNomina: '$ 101.36',
    cargaSocialNominaPor: '0%',
    fijoMtto: '$ 1,117.46',
    fijoMttoPor: '0%',
    varMtto: '$ 1,187.06',
    varMttoPor: '0%',
    fijoTrans: '$ 2,425.09',
    fijoTransPor: '0%',
    varTrans: '$ 793.03',
    varTransPor: '0%',
    costosAdicionales: '$ 5,849.24',
    costosAdicionalesPor: '0%',   
},{
    tipoOperacion: 'Góndola',
    cliente: 'Productos uva',
    tracto: 'Tracto: TT1224',
    idUnidadNegocio: '',
    unidadNegocio: '',
    idOperador: '',
    operador: '',
    noLiquidacion: '32740',
    inicio: '22-01-21 12:46',
    fin: '11-03-21 19:40',
    ingresoTotal: '$ 0',
    margenUtilida: '-$ 24,351.41',
    margenUtilidaPor: '0%',
    diasViaje: '49',
    viajes: '4',
    kmsCargados: '0',
    kmsVacios: '2,201',
    lstDiesel: '0',
    rendimiento:'0',
    combustible: '$ 0',
    combustiblePor: '0%',
    casetas: '$ 9,237.93',
    casetasPor: '0%',
    sueldosLiquidacion: '$0',
    sueldosLiquidacionPor: '0%',
    otros: '$ 0',
    otrosPor: '0%',
    costosDirectosViaje: '$ 9,237.93',
    costosDirectosViajePor: '0%',
    sueldoBase: '$ 3,678.92',
    sueldoBasePor: '0%',
    cargaSocialNomina: '$ 1,655.51',
    cargaSocialNominaPor: '0%',
    fijoMtto: '$ 1,978.7',
    fijoMttoPor: '0%',
    varMtto: '$ 2,101.96',
    varMttoPor: '0%',
    fijoTrans: '$ 4,294.15',
    fijoTransPor: '0%',
    varTrans: '$ 1,404.24',
    varTransPor: '0%',
    costosAdicionales: '$ 15,113.48',
    costosAdicionalesPor: '0%',   
},{
    tipoOperacion: 'Góndola',
    cliente: 'Braskem',
    tracto: 'Tracto: TT1254',
    idUnidadNegocio: '',
    unidadNegocio: '',
    idOperador: '',
    operador: '',
    noLiquidacion: '32741',
    inicio: '26-02-21 19:47',
    fin: '12-03-21 10:20',
    ingresoTotal: '$ 0',
    margenUtilida: '-$ 30,574.21',
    margenUtilidaPor: '0%',
    diasViaje: '14',
    viajes: '3',
    kmsCargados: '0',
    kmsVacios: '1,172',
    lstDiesel: '935',
    rendimiento:'1.25',
    combustible: '$ 16,431.68',
    combustiblePor: '0%',
    casetas: '$ 7,411.21',
    casetasPor: '0%',
    sueldosLiquidacion: '$0',
    sueldosLiquidacionPor: '0%',
    otros: '$ 0',
    otrosPor: '0%',
    costosDirectosViaje: '$ 23,842.89',
    costosDirectosViajePor: '0%',
    sueldoBase: '$ 1,051.12',
    sueldoBasePor: '0%',
    cargaSocialNomina: '$ 473',
    cargaSocialNominaPor: '0%',
    fijoMtto: '$ 1,053.63',
    fijoMttoPor: '0%',
    varMtto: '$ 1,119.26',
    varMttoPor: '0%',
    fijoTrans: '$ 2,286.57',
    fijoTransPor: '0%',
    varTrans: '$ 747.74',
    varTransPor: '0%',
    costosAdicionales: '$ 6,731.32',
    costosAdicionalesPor: '0%',   
},{
    tipoOperacion: 'Caja seca',
    cliente: 'LA MADRILEÑA',
    tracto: 'Tracto: TT1255',
    idUnidadNegocio: '',
    unidadNegocio: '',
    idOperador: '',
    operador: '',
    noLiquidacion: '32649',
    inicio: '22-12-21 13:39',
    fin: '31-12-21 14:40',
    ingresoTotal: '$ 53,438',
    margenUtilida: '$ 5,396.19',
    margenUtilidaPor: '10%',
    diasViaje: '10',
    viajes: '4',
    kmsCargados: '1,068',
    kmsVacios: '1,278',
    lstDiesel: '1,162',
    rendimiento:'2.02',
    combustible: '$ 21,340.38',
    combustiblePor: '40%',
    casetas: '$ 9,970.69',
    casetasPor: '19%',
    sueldosLiquidacion: '$ 2,956.47',
    sueldosLiquidacionPor: '6%',
    otros: '$ 931.92',
    otrosPor: '2%',
    costosDirectosViaje: '$ 35,199.46',
    costosDirectosViajePor: '24%',
    sueldoBase: '$ 750.8',
    sueldoBasePor: '1%',
    cargaSocialNomina: '$ 1,668.27',
    cargaSocialNominaPor: '3%',
    fijoMtto: '$ 2,109.05',
    fijoMttoPor: '4%',
    varMtto: '$ 2,240.43',
    varMttoPor: '4%',
    fijoTrans: '$ 4,577.05',
    fijoTransPor: '9%',
    varTrans: '$ 1,496.75',
    varTransPor: '3%',
    costosAdicionales: '$ 12,842.35',
    costosAdicionalesPor: '66%',   
},{
    tipoOperacion: 'Góndola',
    cliente: 'Braskem',
    tracto: 'Tracto: TT1285',
    idUnidadNegocio: '',
    unidadNegocio: '',
    idOperador: '',
    operador: '',
    noLiquidacion: '32739',
    inicio: '23-07-21 13:46',
    fin: '03-08-21 12:00',
    ingresoTotal: '$ 0',
    margenUtilida: '-$ 11,288.77',
    margenUtilidaPor: '0%',
    diasViaje: '11',
    viajes: '3',
    kmsCargados: '0',
    kmsVacios: '0',
    lstDiesel: '527',
    rendimiento:'0',
    combustible: '$ 9,396.41',
    combustiblePor: '0%',
    casetas: '$ 694.83',
    casetasPor: '0%',
    sueldosLiquidacion: '$0',
    sueldosLiquidacionPor: '0%',
    otros: '$ 0',
    otrosPor: '0%',
    costosDirectosViaje: '$ 10,091.24',
    costosDirectosViajePor: '0%',
    sueldoBase: '$ 825.88',
    sueldoBasePor: '0%',
    cargaSocialNomina: '$ 371.65',
    cargaSocialNominaPor: '0%',
    fijoMtto: '$ 0',
    fijoMttoPor: '0%',
    varMtto: '$ 0',
    varMttoPor: '0%',
    fijoTrans: '$ 0',
    fijoTransPor: '0%',
    varTrans: '$ 0',
    varTransPor: '0%',
    costosAdicionales: '$ 1,197.53',
    costosAdicionalesPor: '0%',   
}
// /
];

@Injectable()
export class Service {

  getCountriesInfo(): RentabilidadService[] {
    return countriesInfo;
  }
}
