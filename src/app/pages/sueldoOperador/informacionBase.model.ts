export interface RegistroBase {
  clasificacion: string;
  idArea: number;
  udN: string;
  viaje: number;
  despacho: string;
  finViaje?: string | null;
  kms?: number;
  clave: number;
  operador: string;
  operacion: string;
  tipo: string;
  sueldoNoLiquidado: number;
  numLiquidacion: number | null;
  fechaLiquidacion: string | null;
  proceso: number | null;
  claveSemanaNOM?: string | null;
}

export interface RegistroLiquidado {
  clasificacion: string;
  idArea: number;
  udN: string;
  viajes: number;
  inicioViajes: string;
  finViajes: string;
  diasViajes: number;
  clave: number;
  operador: string;
  operacion: string;
  sueldo: number;
  numLiquidacion: number;
  fechaLiquidacion: string;
  proceso: number;
  claveSemanaNOM: string;
}

export interface LiquidacionNOM {
  cveper: string;
  cvetra: number;
  idArea: number;
  udN: string;
  operacion: string;
  status: string;
  fecAlt: string;
  fecBaj: string | null;
  nombre: string;
  sueldoXViaje: number;
  salarioOperador: number;
  sueldoGarantia: number;
  totalSemana: number;
  claveSemanaNOM: string;
}

export interface InformacionBaseResponse {
  noLiquidados: RegistroBase[];
  sinProcesar: RegistroBase[];
  liquidados: RegistroLiquidado[];
  liquidacionesNOM: LiquidacionNOM[];
}

export interface SemanaColumna {
  key: string;
  label: string;
  valorReal: string;
}

export interface SemanaValores {
  sueldoXViaje: number;
  salarioOperador: number;
  sueldoGarantia: number;
  totalSemana: number;
  liquidados: number;
  sinLiquidar: number;
}

export interface ResumenDetalleLiquidacion {
  cveTra: number;
  idUdN: number;
  liquidacion: string;
  fechaLiquidacion: string;
  semana: string;
  sueldo: number;
  viajes: number;
  inicio: string;
  fin: string;
  dias: number;
}

export interface ViajeDetalle {
  idArea: number;
  idPersonal: number;
  nombre: string;
  noViaje: number;
  fechaRealViaje: string;
  fechaRealFinViaje: string;
  descRuta: string;
  tipoOperacion: string;
  noLiquidacion: number;
  fechaLiq: string;
  semana: string;
  operacion: string;
  proceso: string;
  monLiq: number;
}

export interface DetalleLiquidacionResponse {
  resumen: ResumenDetalleLiquidacion[];
  viajes: ViajeDetalle[];
}

export interface ResumenOperador {
  cvetra: number;
  nombre: string;
  udN: string;
  operacion: string;
  status: string;
  semanas: { [key: string]: SemanaValores };
  total: number;
  sinProcesar: number;
  noLiquidado: number;
  pendiente: number;
  totalGarantia: number;
  diferencia: number;
}
