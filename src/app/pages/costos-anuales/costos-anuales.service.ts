import { Injectable } from '@angular/core';

export class CountryInfo {
  month: string;

  transportacionCF: number;

  transportacionCV: number;

  mantenimientoCF: number;

  mantenimientoCV: number;

  otrosGatos: number;
}

export class EnergyDescription {
  value: string;

  name: string;
}

const energySources: EnergyDescription[] = [
  { value: 'transportacionCF', name: 'Transportación Costo Fijo' },
  { value: 'transportacionCV', name: 'Transportación Costo Variable' },
  { value: 'mantenimientoCF', name: 'Mantenimiento Costo Fijo' },
  { value: 'mantenimientoCV', name: 'Mantenimiento Costo Variable' },
  { value: 'otrosGatos', name: 'Otros Gastos' },
];

const countriesInfo: CountryInfo[] = [{
  month: 'Enero',
  transportacionCF: 59.8,
  transportacionCV: 97.6,
  mantenimientoCF: 52,
  mantenimientoCV: 54.3,
  otrosGatos: 187.9,
}, {
  month: 'Febrero',
  transportacionCF: 74.2,
  transportacionCV: 38.6,
  mantenimientoCF: 35.1,
  mantenimientoCV: 96.9,
  otrosGatos: 11.3,
}, {
  month: 'Marzo',
  transportacionCF: 40,
  transportacionCV: 128.5,
  mantenimientoCF: 36.8,
  mantenimientoCV: 105,
  otrosGatos: 32.4,
}, {
  month: 'Abril',
  transportacionCF: 22.6,
  transportacionCV: 241.5,
  mantenimientoCF: 64.9,
  mantenimientoCV: 120.8,
  otrosGatos: 64.8,
}, {
  month: 'Mayo',
  transportacionCF: 19,
  transportacionCV: 119.3,
  mantenimientoCF: 28.9,
  mantenimientoCV: 204.8,
  otrosGatos: 3.8,
}, {
  month: 'Junio',
  transportacionCF: 6.1,
  transportacionCV: 123.6,
  mantenimientoCF: 77.3,
  mantenimientoCV: 85.7,
  otrosGatos: 37.8,
}, {
  month: 'Julio',
  transportacionCF: 50,
  transportacionCV: 62.1,
  mantenimientoCF: 98.20,
  mantenimientoCV: 10.5,
  otrosGatos: 85.6,
}, {
  month: 'Agosto',
  transportacionCF: 60,
  transportacionCV: 52.52,
  mantenimientoCF: 68.9,
  mantenimientoCV: 63.62,
  otrosGatos: 202.0,
}, {
  month: 'Septiembre',
  transportacionCF: 66.20,
  transportacionCV: 52.7,
  mantenimientoCF: 25,
  mantenimientoCV: 62,
  otrosGatos: 52,
}, {
  month: 'Octubre',
  transportacionCF: 84,
  transportacionCV: 52,
  mantenimientoCF: 96,
  mantenimientoCV: 25,
  otrosGatos: 56,
}, {
  month: 'Noviembre',
  transportacionCF: 95,
  transportacionCV: 62,
  mantenimientoCF: 36,
  mantenimientoCV: 96,
  otrosGatos: 65,
}, {
  month: 'Diciembre',
  transportacionCF: 52,
  transportacionCV: 52,
  mantenimientoCF: 66,
  mantenimientoCV: 52,
  otrosGatos: 86,
}
];

@Injectable()
export class Service {
  getEnergySources(): EnergyDescription[] {
    return energySources;
  }

  getCountriesInfo(): CountryInfo[] {
    return countriesInfo;
  }
}
