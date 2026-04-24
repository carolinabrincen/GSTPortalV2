import { Injectable } from '@angular/core';

export class Customer {
  clave: number;
  apellidoP: string;
  apellidoM: string;
  nombre: string;
  status: string;
  fechaAlta: string;
  fechaNacimiento: string;
  udn: string;
  unidad: string;
  asigOperacion: string;
  asigModifico: string;
  statLogistico: string;
  statModifico: string;
  statRetorno: string;
  observaciones: string;
}

const customers: Customer[] = [
{
    clave: 1001029,
    apellidoP: 'CORTEZ',
    apellidoM: 'HERNANDEZ',
    nombre: 'JOSE DIONISIO',
    status: 'Alta',
    fechaAlta: '08/04/1968',
    fechaNacimiento: '21/08/2017',
    udn: 'Orizaba',
    unidad: 'TT3235',
    asigOperacion: 'GONDOLA',
    asigModifico: '04/12/2023',
    statLogistico: 'Descanso/Vacaciones',
    statModifico: '04/12/2023',
    statRetorno: '04/12/2023',
    observaciones: 'permiso por licencia',
},
{
    clave: 1003336,
    apellidoP: 'ROMERO',
    apellidoM: 'GALLARDO',
    nombre: 'JOSE SALVADOR',
    status: 'Alta',
    fechaAlta: '06/07/1981',
    fechaNacimiento: '11/05/2021',
    udn: 'Guadalajara',
    unidad: 'TT1469',
    asigOperacion: 'CAJA SECA',
    asigModifico: '04/12/2023',
    statLogistico: 'Descanso/Vacaciones',
    statModifico: '04/12/2023',
    statRetorno: '06/12/2023',
    observaciones: '',
},
{
    clave: 1003601,
    apellidoP: 'MELCHOR',
    apellidoM: 'LOPEZ',
    nombre: 'JUAN ALFONSO',
    status: 'Alta',
    fechaAlta: '17/10/1975',
    fechaNacimiento: '03/06/2022',
    udn: 'Orizaba',
    unidad: 'TT1480',
    asigOperacion: 'GRADO ALIMENT',
    asigModifico: '04/12/2023',
    statLogistico: 'Ausentismo/Suspendido',
    statModifico: '04/12/2023',
    statRetorno: '',
    observaciones: '',
},
{
    clave: 1003871,
    apellidoP: 'SANDOVAL',
    apellidoM: 'ROSAS',
    nombre: 'JOSE SALVADOR',
    status: 'Alta',
    fechaAlta: '12/08/1978',
    fechaNacimiento: '16/10/2023',
    udn: 'Gudalajara',
    unidad: 'TT1486',
    asigOperacion: 'TOLVA GRANEL',
    asigModifico: '04/12/2023',
    statLogistico: 'Capacitación',
    statModifico: '04/12/2023',
    statRetorno: '',
    observaciones: '',
},
{
    clave: 1003872,
    apellidoP: 'GUZMAN',
    apellidoM: 'RAMOS',
    nombre: 'RAUL ERNESTO',
    status: 'Alta',
    fechaAlta: '14/09/1993',
    fechaNacimiento: '18/10/2023',
    udn: 'Orizaba',
    unidad: 'TT1466',
    asigOperacion: 'CAJA SECA',
    asigModifico: '04/12/2023',
    statLogistico: 'Incapacidad',
    statModifico: '04/12/2023',
    statRetorno: '04/12/2023',
    observaciones: 'Tema medico',
},
{
    clave: 100390,
    apellidoP: 'HERNANDEZ',
    apellidoM: 'LOYA',
    nombre: 'MARTIN',
    status: 'Alta',
    fechaAlta: '31/08/1974',
    fechaNacimiento: '29/11/2023',
    udn: 'Mexicali',
    unidad: 'TT1316',
    asigOperacion: 'TOLVA GRANEL',
    asigModifico: '04/12/2023',
    statLogistico: 'Capacitación',
    statModifico: '04/12/2023',
    statRetorno: '',
    observaciones: '',
},
{
    clave: 3000911,
    apellidoP: 'PEREZ',
    apellidoM: 'PONCE',
    nombre: 'SERGIO',
    status: 'Alta',
    fechaAlta: '23/08/1968',
    fechaNacimiento: '02/05/2012',
    udn: 'TEISA',
    unidad: 'TT1341',
    asigOperacion: 'ENCORTINADO',
    asigModifico: '04/12/2023',
    statLogistico: 'Descanso/Vacaciones',
    statModifico: '04/12/2023',
    statRetorno: '04/12/2023',
    observaciones: '',
},

];

@Injectable()
export class Service {
  getCustomers() {
    return customers;
  }
}
