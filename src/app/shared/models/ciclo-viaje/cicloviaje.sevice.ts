import { Injectable } from '@angular/core';

export class CicloViajeService {
    salidaViaje: string;
    noViaje: number;
    llegadaPCarga: string;
    TiempoRVCargado: string;
    llegadaCarga: string;
    ingresoCarga: string;
    esperaIniCarga: string;
    carga: string;
    esperaIniViaje: string;
    transitoDestino: string;
    esperaIngDescarga: string;
    esperaIniDescarga: string;
    Descarga: string;
    esperaCViaje: string;
    finViaje: string;
    totalVC: string;
    ruta: string;
    noViajeSC: string;
    puntoCargaSC: string;
    llegadaCargaSC: string;
    ingresoCargaSC: string;
    EsperaSC: string;
    CargaSC: string;
    esperaSalidaSC: string;
    CargaDiselSC: string;
    TransitoDescargaSC: string;
    esperaDescarga: string;
    descargaSC: string;
    totalSC: string;
    rutaSC: string;
    EsperaDespacho: string;
    retornoBase: string;
    totalVR: string;
    Salida: string;
    Llegada: string;
    retorno: string;
    totalVG: string;
    total: string;
}

export class EnergyDescription {
  value: string;

  name: string;
}

const energySources: EnergyDescription[] = [
  { value: 'hydro', name: 'Hydro-electric' },
  { value: 'oil', name: 'Oil' },
  { value: 'gas', name: 'Natural gas' },
  { value: 'coal', name: 'Coal' },
  { value: 'nuclear', name: 'Nuclear' },
];

const countriesInfo: CicloViajeService[] = [{
    salidaViaje: '03:01:00',
    noViaje: 35,
    llegadaPCarga: '01:59:00',
    TiempoRVCargado: '01:00:00',
    llegadaCarga: '01:00:00',
    ingresoCarga: '01:00:00',
    esperaIniCarga: '',
    carga: '01:00:00',
    esperaIniViaje: '01:00:00',
    transitoDestino: '01:06:00',
    esperaIngDescarga: '01:00:00',
    esperaIniDescarga: '',
    Descarga: '01:02:00', 
    esperaCViaje: '',
    finViaje: '',
    totalVC: '10:10:00',
    ruta: 'MADIZA COATZA-VIDRIERIA SL POTOSI',
    noViajeSC: '36',
    puntoCargaSC: '05:00:00',
    llegadaCargaSC: '01:01:00',
    ingresoCargaSC: '01:03:00',
    EsperaSC: '01:11:00',
    CargaSC: '01:13:00',
    esperaSalidaSC: '01:00:00',
    CargaDiselSC: '01:00:00',
    TransitoDescargaSC: '01:01:00',
    esperaDescarga: '01:00:00',
    descargaSC: '01:00:00',
    totalSC: '14:29:00',
    rutaSC: 'SAG SAN LUIS POTOSI-SODISA APODACA',
    EsperaDespacho: '02:01:00',
    retornoBase: '01:00:00',
    totalVR: '03:01:00',
    Salida: '',
    Llegada: '',
    retorno: '',
    totalVG: '',
    total: '1 día 6:41',
}, {
    salidaViaje: '01:01:00',
    noViaje: 39,
    llegadaPCarga: '01:02:00',
    TiempoRVCargado: '00:14:00',
    llegadaCarga: '00:10:00',
    ingresoCarga: '00:10:00',
    esperaIniCarga: '',
    carga: '00:20:00',
    esperaIniViaje: '00:05:00',
    transitoDestino: '00:30:00',
    esperaIngDescarga: '00:30:00',
    esperaIniDescarga: '',
    Descarga: '00:10:00', 
    esperaCViaje: '',
    finViaje: '',
    totalVC: '04:11:00',
    ruta: 'HOLCIM ORIZABA - CONKRETAR CORONANGO',
    noViajeSC: '',
    puntoCargaSC: '',
    llegadaCargaSC: '',
    ingresoCargaSC: '',
    EsperaSC: '',
    CargaSC: '',
    esperaSalidaSC: '',
    CargaDiselSC: '',
    TransitoDescargaSC: '',
    esperaDescarga: '',
    descargaSC: '',
    totalSC: '',
    rutaSC: '',
    EsperaDespacho: '00:26:00',
    retornoBase: '00:04:00',
    totalVR: '00:30:00',
    Salida: '00:15:00',
    Llegada: '00:15:00',
    retorno: '00:10:00',
    totalVG: '00:40:00',
    total: '6:22',
}
];

@Injectable()
export class Service {
  getEnergySources(): EnergyDescription[] {
    return energySources;
  }

  getCountriesInfo(): CicloViajeService[] {
    return countriesInfo;
  }
}
