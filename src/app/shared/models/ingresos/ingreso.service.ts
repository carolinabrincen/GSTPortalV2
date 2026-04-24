import { Injectable } from '@angular/core';

export class Sale {
    id: number;
    mes: string;
    unidadNegocio: string;
    tipoOperacion: string;
    eneroTotal: number;
}

export class Layout {
  key: number;

  name: string;
}

const sales: Sale[] = [
    {
        id: 1,
        mes: 'Enero',
        unidadNegocio: 'Orizaba',
        tipoOperacion: 'Caja Seca',
        eneroTotal: 25307,
        
      },{
        id: 2,
        mes: 'Enero',
        unidadNegocio: 'Orizaba',
        tipoOperacion: 'Gondola',
        eneroTotal: 25307,
      },{
        id: 3,
        mes: 'Enero',
        unidadNegocio: 'Orizaba',
        tipoOperacion: 'Grado alimento',
        eneroTotal: 25307,
      },{
        id: 4,
        mes: 'Enero',
        unidadNegocio: 'Orizaba',
        tipoOperacion: 'Tolva',
        eneroTotal: 25307,
      },{
        id: 5,
        mes: 'Enero',
        unidadNegocio: 'Ramoz Arizpe',
        tipoOperacion: 'Caja Seca',
        eneroTotal: 25307,
      },{
        id: 6,
        mes: 'Enero',
        unidadNegocio: 'Ramoz Arizpe',
        tipoOperacion: 'Grado Alimento',
        eneroTotal: 25307,
      },{
        id: 7,
        mes: 'Febrero',
        unidadNegocio: 'Ramoz Arizpe',
        tipoOperacion: 'Grado Alimento',
        eneroTotal: 25307,
      },{
        id: 8,
        mes: 'Febrero',
        unidadNegocio: 'Ramoz Arizpe',
        tipoOperacion: 'Grado Alimento',
        eneroTotal: 25307,
      },
]


const layouts:Layout[] = [{
    key: 0,
    name: 'Layout0',
  }, {
    key: 1,
    name: 'Layout1',
  }, {
    key: 2,
    name: 'Layout2',
  }];

@Injectable()
export class Service {
  getSales() {
    return sales;
  }

  getLayouts() {
    return layouts;
  }
}
