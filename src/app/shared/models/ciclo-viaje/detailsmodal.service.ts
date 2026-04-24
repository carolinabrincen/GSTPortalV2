import { Injectable } from '@angular/core';

export class DetailsModalService {
    
    area: string;
    noViaje: string;
    unidad: string;
    estatusViaje: string;
    iniViaje: string;
    usuario: string;
    tipoSeg: string;
    descripcion: string;
    nombreStatusViaje: string;
    ruta: string;
    Tiempos: string;
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

const countriesInfo: DetailsModalService[] = [
{
    area: '1',
    noViaje: '34',
    unidad: 'TT1319',
    estatusViaje: '1',
    iniViaje: '7/12/2022 12:58:00',
    usuario: 'sa',
    tipoSeg: '1',
    descripcion: 'VIAJE VACIO SALIDA',
    nombreStatusViaje: 'Salida de base',
    ruta: '',
    Tiempos: '0',
},{
    area: '1',
    noViaje: '34',
    unidad: 'TT1319',
    estatusViaje: '2',
    iniViaje: '7/12/2022 12:58:00',
    usuario: 'sa',
    tipoSeg: '1',
    descripcion: 'VIAJE VACIO SALIDA',
    nombreStatusViaje: 'Llegada a carga',
    ruta: '',
    Tiempos: '01:00:00',
},{
    area: '1',
    noViaje: '34',
    unidad: 'TT1319',
    estatusViaje: '3',
    iniViaje: '7/12/2022 14:59:00',
    usuario: 'sa',
    tipoSeg: '1',
    descripcion: 'VIAJE VACIO SALIDA',
    nombreStatusViaje: 'Cierre viaje vacio',
    ruta: '',
    Tiempos: '02:01:00',
},{
    area: '1',
    noViaje: '35',
    unidad: 'TT1319',
    estatusViaje: '4',
    iniViaje: '7/12/2022 13:00:00',
    usuario: 'sa',
    tipoSeg: '2',
    descripcion: 'VIAJE CARGADO',
    nombreStatusViaje: 'Despacho viaje carg',
    ruta: 'MADISA COATZA - VIDRIERA SL POTOSI',
    Tiempos: '01:59:00',
},{
    area: '1',
    noViaje: '35',
    unidad: 'TT1319',
    estatusViaje: '2',
    iniViaje: '7/12/2022 14:00:00',
    usuario: 'sa',
    tipoSeg: '2',
    descripcion: 'VIAJE CARGADO',
    nombreStatusViaje: 'Llegada a carga',
    ruta: 'MADISA COATZA - VIDRIERA SL POTOSI',
    Tiempos: '01:00:00',
},{
    area: '1',
    noViaje: '35',
    unidad: 'TT1319',
    estatusViaje: '5',
    iniViaje: '7/12/2022 15:00:00',
    usuario: 'sa',
    tipoSeg: '2',
    descripcion: 'VIAJE CARGADO',
    nombreStatusViaje: 'Ingreso a carga',
    ruta: 'MADISA COATZA - VIDRIERA SL POTOSI',
    Tiempos: '01:00:00',
},{
    area: '1',
    noViaje: '35',
    unidad: 'TT1319',
    estatusViaje: '6',
    iniViaje: '7/12/2022 16:01:00',
    usuario: 'sa',
    tipoSeg: '2',
    descripcion: 'VIAJE CARGADO',
    nombreStatusViaje: 'Inicio de carga',
    ruta: 'MADISA COATZA - VIDRIERA SL POTOSI',
    Tiempos: '01:01:00',
},{
    area: '1',
    noViaje: '35',
    unidad: 'TT1319',
    estatusViaje: '7',
    iniViaje: '7/12/2022 17:02:00',
    usuario: 'sa',
    tipoSeg: '2',
    descripcion: 'VIAJE CARGADO',
    nombreStatusViaje: 'Fin de carga',
    ruta: 'MADISA COATZA - VIDRIERA SL POTOSI',
    Tiempos: '01:01:00',
},{
    area: '1',
    noViaje: '35',
    unidad: 'TT1319',
    estatusViaje: '8',
    iniViaje: '7/12/2022 18:02:00',
    usuario: 'sa',
    tipoSeg: '2',
    descripcion: 'VIAJE CARGADO',
    nombreStatusViaje: 'Inicio viaje cargado',
    ruta: 'MADISA COATZA - VIDRIERA SL POTOSI',
    Tiempos: '01:00:00',
},{
    area: '1',
    noViaje: '35',
    unidad: 'TT1319',
    estatusViaje: '9',
    iniViaje: '7/12/2022 19:08:00',
    usuario: 'sa',
    tipoSeg: '2',
    descripcion: 'VIAJE CARGADO',
    nombreStatusViaje: 'Arribo a descarga',
    ruta: 'MADISA COATZA - VIDRIERA SL POTOSI',
    Tiempos: '01:06:00',
},{
    area: '1',
    noViaje: '35',
    unidad: 'TT1319',
    estatusViaje: '10',
    iniViaje: '7/12/2022 20:09:00',
    usuario: 'sa',
    tipoSeg: '2',
    descripcion: 'VIAJE CARGADO',
    nombreStatusViaje: 'Inicio de descarga',
    ruta: 'MADISA COATZA - VIDRIERA SL POTOSI',
    Tiempos: '01:01:00',
},{
    area: '1',
    noViaje: '35',
    unidad: 'TT1319',
    estatusViaje: '11',
    iniViaje: '7/12/2022 21:11:00',
    usuario: 'sa',
    tipoSeg: '2',
    descripcion: 'VIAJE CARGADO',
    nombreStatusViaje: 'Fin de descarga',
    ruta: 'MADISA COATZA - VIDRIERA SL POTOSI',
    Tiempos: '01:02:00',
}
// /
];

@Injectable()
export class DetailsService {
  getEnergySources(): EnergyDescription[] {
    return energySources;
  }

  getCountriesInfo(): DetailsModalService[] {
    return countriesInfo;
  }
}
