export interface RentGerModel {
  ranking: number,
  idUnidaNegocio: number,
  unidaNegocio: string,
  idRuta: number,
  ruta: string,
  idCliente: number,
  cliente: string,
  idTipoOperacion: number,
  tipoOperacion: string,
  kms: number,
  viajes: number,
  rentabilidad: number,
  rentabilidadMesAnt: number,
  tendencia: number,
  liquidaciones?: LiquidacionesModel[]
}

export interface TiposOperacionModel {
  idTipoOperacion: number,
  operacion: string
}


export interface RutasModel {
  idRuta: number,
  ruta: string
}

export interface ClientesModel {
  idCliente: number,
  cliente: string
}
export interface LiquidacionesModel {
  clave: string,
  idUnidadNegocio: number,
  unidadNegocio: string,
  idOperacion: number,
  operacion: string,
  idRuta: number,
  ruta: string,
  idCliente: number,
  cliente: string,
  noLiquidacion: number,
  inicio: Date,
  fin: Date,
  diasViaje: number,
  viajes: number,
  kms: number,
  lstDiesel: number,
  ingresoTotal: number,
  sueldosLiquidacion: number,
  otros: number,
  costosDirectosViaje: number,
  sueldoBase: number,
  cargaSocialNomina: number,
  fijoMtto: number,
  varMtto: number,
  fijoTrans: number,
  varTrans: number,
  costosAdicionales: number,
  margenUtilida:number,
  margenUtilidaPor: number
}
