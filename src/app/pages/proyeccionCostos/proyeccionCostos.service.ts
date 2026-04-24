import { Injectable } from '@angular/core';

export class Production {
  mes: string;

  tipoOperacion: string;

  kmsRecorrido: number;
}

const productionData: Production[] = [
    {
    mes: 'Enero',
    tipoOperacion: 'CAJA SECA',
    kmsRecorrido: 0.1867,
    },
    {
    mes: 'Febrero',
    tipoOperacion: 'CAJA SECA',
    kmsRecorrido: 0.223,
    },
    {
        mes: 'Marzo',
        tipoOperacion: 'CAJA SECA',
        kmsRecorrido: 0.5021,
    },
    {
        mes: 'Abril',
        tipoOperacion: 'CAJA SECA',
        kmsRecorrido: 0.8484,
    },
    {
        mes: 'Mayo',
        tipoOperacion: 'CAJA SECA',
        kmsRecorrido: 0.4005,
    },
    {
        mes: 'Junio',
        tipoOperacion: 'CAJA SECA',
        kmsRecorrido: 0.8751,
    },
    {
        mes: 'Julio',
        tipoOperacion: 'CAJA SECA',
        kmsRecorrido: 0.944,
    },
    {
        mes: 'Agosto',
        tipoOperacion: 'CAJA SECA',
        kmsRecorrido: 0.2485,
    },
    {
        mes: 'Septoembre',
        tipoOperacion: 'CAJA SECA',
        kmsRecorrido: 0.1123,
    },
    {
        mes: 'Octubre',
        tipoOperacion: 'CAJA SECA',
        kmsRecorrido: 0.3321,
    },
    {
        mes: 'Noviembre',
        tipoOperacion: 'CAJA SECA',
        kmsRecorrido: 0.2156,
    },
    {
        mes: 'Diciembre',
        tipoOperacion: 'CAJA SECA',
        kmsRecorrido: 0.561,
    },
    {
        mes: 'Enero',
        tipoOperacion: 'ENCORTINADOS',
        kmsRecorrido: 0.1867,
    },
    {
      mes: 'Febrero',
      tipoOperacion: 'ENCORTINADOS',
      kmsRecorrido: 0.223,
    },
    {
      mes: 'Marzo',
      tipoOperacion: 'ENCORTINADOS',
      kmsRecorrido: 0.5021,
    },
    {
      mes: 'Abril',
      tipoOperacion: 'ENCORTINADOS',
      kmsRecorrido: 0.8484,
    },
    {
      mes: 'Mayo',
      tipoOperacion: 'ENCORTINADOS',
      kmsRecorrido: 0.4005,
    },
    {
      mes: 'Junio',
      tipoOperacion: 'ENCORTINADOS',
      kmsRecorrido: 0.8751,
    },
    {
      mes: 'Julio',
      tipoOperacion: 'ENCORTINADOS',
      kmsRecorrido: 0.944,
    },
    {
      mes: 'Agosto',
      tipoOperacion: 'ENCORTINADOS',
      kmsRecorrido: 0.2485,
    },
    {
      mes: 'Septoembre',
      tipoOperacion: 'ENCORTINADOS',
      kmsRecorrido: 0.1123,
    },
    {
      mes: 'Octubre',
      tipoOperacion: 'ENCORTINADOS',
      kmsRecorrido: 0.3321,
    },
    {
      mes: 'Noviembre',
      tipoOperacion: 'ENCORTINADOS',
      kmsRecorrido: 0.2156,
    },
    {
      mes: 'Diciembre',
      tipoOperacion: 'ENCORTINADOS',
      kmsRecorrido: 0.561,
    },
    {
      mes: 'Enero',
      tipoOperacion: 'GRADO ALIMENTICIO',
      kmsRecorrido: 0.1867,
    },
    {
      mes: 'Febrero',
      tipoOperacion: 'GRADO ALIMENTICIO',
      kmsRecorrido: 0.223,
    },
    {
      mes: 'Marzo',
      tipoOperacion: 'GRADO ALIMENTICIO',
      kmsRecorrido: 0.5021,
    },
    {
      mes: 'Abril',
      tipoOperacion: 'GRADO ALIMENTICIO',
      kmsRecorrido: 0.8484,
    },
    {
      mes: 'Mayo',
      tipoOperacion: 'GRADO ALIMENTICIO',
      kmsRecorrido: 0.4005,
    },
    {
      mes: 'Junio',
      tipoOperacion: 'GRADO ALIMENTICIO',
      kmsRecorrido: 0.8751,
    },
    {
      mes: 'Julio',
      tipoOperacion: 'GRADO ALIMENTICIO',
      kmsRecorrido: 0.944,
    },
    {
      mes: 'Agosto',
      tipoOperacion: 'GRADO ALIMENTICIO',
      kmsRecorrido: 0.2485,
    },
    {
      mes: 'Septoembre',
      tipoOperacion: 'GRADO ALIMENTICIO',
      kmsRecorrido: 0.1123,
    },
    {
      mes: 'Octubre',
      tipoOperacion: 'GRADO ALIMENTICIO',
      kmsRecorrido: 0.3321,
    },
    {
      mes: 'Noviembre',
      tipoOperacion: 'GRADO ALIMENTICIO',
      kmsRecorrido: 0.2156,
    },
    {
      mes: 'Diciembre',
      tipoOperacion: 'GRADO ALIMENTICIO',
      kmsRecorrido: 0.561,
    },
    {
      mes: 'Enero',
      tipoOperacion: 'TOLVA ACERO',
      kmsRecorrido: 0.1867,
    },
    {
      mes: 'Febrero',
      tipoOperacion: 'TOLVA ACERO',
      kmsRecorrido: 0.223,
    },
    {
      mes: 'Marzo',
      tipoOperacion: 'TOLVA ACERO',
      kmsRecorrido: 0.5021,
    },
    {
      mes: 'Abril',
      tipoOperacion: 'TOLVA ACERO',
      kmsRecorrido: 0.8484,
    },
    {
      mes: 'Mayo',
      tipoOperacion: 'TOLVA ACERO',
      kmsRecorrido: 0.4005,
    },
    {
      mes: 'Junio',
      tipoOperacion: 'TOLVA ACERO',
      kmsRecorrido: 0.8751,
    },
    {
      mes: 'Julio',
      tipoOperacion: 'TOLVA ACERO',
      kmsRecorrido: 0.944,
    },
    {
      mes: 'Agosto',
      tipoOperacion: 'TOLVA ACERO',
      kmsRecorrido: 0.2485,
    },
    {
      mes: 'Septoembre',
      tipoOperacion: 'TOLVA ACERO',
      kmsRecorrido: 0.1123,
    },
    {
      mes: 'Octubre',
      tipoOperacion: 'TOLVA ACERO',
      kmsRecorrido: 0.3321,
    },
    {
      mes: 'Noviembre',
      tipoOperacion: 'TOLVA ACERO',
      kmsRecorrido: 0.2156,
    },
    {
      mes: 'Diciembre',
      tipoOperacion: 'TOLVA ACERO',
      kmsRecorrido: 0.561,
    },
    {
      mes: 'Enero',
      tipoOperacion: 'GONDOLA',
      kmsRecorrido: 0.1867,
    },
    {
      mes: 'Febrero',
      tipoOperacion: 'GONDOLA',
      kmsRecorrido: 0.223,
    },
    {
      mes: 'Marzo',
      tipoOperacion: 'GONDOLA',
      kmsRecorrido: 0.5021,
    },
    {
      mes: 'Abril',
      tipoOperacion: 'GONDOLA',
      kmsRecorrido: 0.8484,
    },
    {
      mes: 'Mayo',
      tipoOperacion: 'GONDOLA',
      kmsRecorrido: 0.4005,
    },
    {
      mes: 'Junio',
      tipoOperacion: 'GONDOLA',
      kmsRecorrido: 0.8751,
    },
    {
      mes: 'Julio',
      tipoOperacion: 'GONDOLA',
      kmsRecorrido: 0.944,
    },
    {
      mes: 'Agosto',
      tipoOperacion: 'GONDOLA',
      kmsRecorrido: 0.2485,
    },
    {
      mes: 'Septoembre',
      tipoOperacion: 'GONDOLA',
      kmsRecorrido: 0.1123,
    },
    {
      mes: 'Octubre',
      tipoOperacion: 'GONDOLA',
      kmsRecorrido: 0.3321,
    },
    {
      mes: 'Noviembre',
      tipoOperacion: 'GONDOLA',
      kmsRecorrido: 0.2156,
    },
    {
      mes: 'Diciembre',
      tipoOperacion: 'GONDOLA',
      kmsRecorrido: 0.561,
                },
    {
      mes: 'Enero',
      tipoOperacion: 'TOTAL GST',
      kmsRecorrido: 0.1867,
    },
    {
      mes: 'Febrero',
      tipoOperacion: 'TOTAL GST',
      kmsRecorrido: 0.223,
    },
    {
      mes: 'Marzo',
      tipoOperacion: 'TOTAL GST',
      kmsRecorrido: 0.5021,
    },
    {
      mes: 'Abril',
      tipoOperacion: 'TOTAL GST',
      kmsRecorrido: 0.8484,
    },
    {
      mes: 'Mayo',
      tipoOperacion: 'TOTAL GST',
      kmsRecorrido: 0.4005,
    },
    {
      mes: 'Junio',
      tipoOperacion: 'TOTAL GST',
      kmsRecorrido: 0.8751,
    },
    {
      mes: 'Julio',
      tipoOperacion: 'TOTAL GST',
      kmsRecorrido: 0.944,
    },
    {
      mes: 'Agosto',
      tipoOperacion: 'TOTAL GST',
      kmsRecorrido: 0.2485,
    },
    {
      mes: 'Septoembre',
      tipoOperacion: 'TOTAL GST',
      kmsRecorrido: 0.1123,
    },
    {
      mes: 'Octubre',
      tipoOperacion: 'TOTAL GST',
      kmsRecorrido: 0.3321,
    },
    {
      mes: 'Noviembre',
      tipoOperacion: 'TOTAL GST',
      kmsRecorrido: 0.2156,
    },
    {
      mes: 'Diciembre',
      tipoOperacion: 'TOTAL GST',
      kmsRecorrido: 0.561,
    },
                  
              
  
];

@Injectable()
export class Service {
  getProductionData(): Production[] {
    return productionData;
  }
}
