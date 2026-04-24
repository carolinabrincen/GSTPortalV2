import { Injectable } from '@angular/core';

export class Avance {
  totalIni: string;
  corriente: number;
  unoA30: number;
  tres1A60: number;
  seis1A90: number;
  mas90: number;
  totalFin: number;
}

const countriesInfo: Avance[] = [
{
  totalIni: 'Clientes Terceros',
  corriente:81175767,
  unoA30: 19071229,
  tres1A60: 2201003,
  seis1A90: 429880,
  mas90: 563849,
  totalFin: 103441726
},
{
  totalIni: '%',
  corriente: 78.5,
  unoA30: 18.4,
  tres1A60: 2.1,
  seis1A90: 0.4,
  mas90: 0.5,
  totalFin: 100.0
},
{
  totalIni: '',
  corriente: 96.9,
  unoA30: undefined,
  tres1A60: undefined,
  seis1A90: undefined,
  mas90: undefined,
  totalFin: undefined
},
{
  totalIni: 'Intercompañia',
  corriente: 28884352,
  unoA30: 3536999,
  tres1A60: 1353905,
  seis1A90: 192531,
  mas90: 7,
  totalFin: 33967793
},
{
  totalIni: '%',
  corriente: 85.0,
  unoA30: 10.4,
  tres1A60: 4.0,
  seis1A90: 0.6,
  mas90: 0.0,
  totalFin: 100.0
},
{
  totalIni: '',
  corriente: 95.4,
  unoA30: undefined,
  tres1A60: undefined,
  seis1A90: undefined,
  mas90: undefined,
  totalFin: undefined
},
];

@Injectable()
export class Service {
  getAvance(): Avance[] {
    return countriesInfo;
  }
}
