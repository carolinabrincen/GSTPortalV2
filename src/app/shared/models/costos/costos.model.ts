export interface costos{
   mes: string,
   anio: number,
    diaMes: number,
    diasTranscurridos: number,
    avance: number,
    costos: detalleCostosModel[]
  }
  export interface detalleCostosModel{
    idUdn: number,
    udn: string,
    concepto: string,
    tipo: string,
    real: number,
    porReal: number,
    presupuesto: number,
    porPresupuesto: number,
    desviacionDiaria: number,
    porDesviacion: number,
    promDiario: number,
    proyDiaria: number,
    porAvanceDiario: number,
    acumulado: number,
    proyeccion: number,
    porProyecccio: number,
    desviacionMensual: number,
    porDesviacionMensual: number
  }