import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import notify from 'devextreme/ui/notify';
import { UdnSueldoOperador } from './udn';
import { SueldoOperadorService } from 'src/app/services/sueldoOperador/sueldoOperador.service';
import {
  DetalleLiquidacionResponse,
  InformacionBaseResponse,
  LiquidacionNOM,
  RegistroBase,
  ResumenDetalleLiquidacion,
  ResumenOperador,
  SemanaColumna,
  SemanaValores,
  ViajeDetalle
} from './informacionBase.model';

const MESES = [
  'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
  'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
];

const UMBRAL_MONTO = 7800;
const UMBRAL_TOTAL = 31200;
const FMT_MONEDA = '$ #,##0';

@Component({
  selector: 'app-sueldo-operador',
  templateUrl: './sueldoOperador.component.html',
  styleUrls: ['./sueldoOperador.component.scss']
})
export class SueldoOperadorComponent {

  udns = UdnSueldoOperador.LISTA;
  selectedUdn: number[] = [];
  fechaSeleccionada: any = null;
  calendarOptions = { maxZoomLevel: 'year' as const, minZoomLevel: 'decade' as const, zoomLevel: 'year' as const };

  semanasColumnas: SemanaColumna[] = [];
  resumen: ResumenOperador[] = [];
  liquidacionesNOMDetalle: LiquidacionNOM[] = [];

  loading = false;
  cargado = false;
  allowedPageSizes = [10, 20, 50];

  columnDefs: any[] = [];
  summaryConfig: any = { groupItems: [], totalItems: [] };

  noLiquidadosDetalle: RegistroBase[] = [];
  sinProcesarDetalle: RegistroBase[] = [];

  detalleVisible = false;
  detalleTitulo = '';
  detalleRegistros: LiquidacionNOM[] = [];

  sinLiquidarVisible = false;
  sinLiquidarTitulo = '';
  sinLiquidarRegistros: RegistroBase[] = [];

  anioConsulta = 0;
  mesConsulta = '';

  detalleCompleto: DetalleLiquidacionResponse = { resumen: [], viajes: [] };

  detalleViajesVisible = false;
  detalleViajesTitulo = '';
  detalleViajesResumen: ResumenDetalleLiquidacion[] = [];
  detalleViajesData: ViajeDetalle[] = [];

  get puedesBuscar(): boolean {
    return !!this.fechaSeleccionada;
  }

  constructor(private service: SueldoOperadorService) {}

  buscar() {
    if (!this.puedesBuscar) {
      notify('Selecciona mes y año', 'warning', 3000);
      return;
    }

    this.anioConsulta = this.fechaSeleccionada.getFullYear();
    this.mesConsulta = MESES[this.fechaSeleccionada.getMonth()];

    this.loading = true;
    this.cargado = false;
    this.semanasColumnas = [];
    this.resumen = [];
    this.columnDefs = [];

    forkJoin({
      base: this.service.getInformacionBase(this.anioConsulta, this.mesConsulta),
      detalle: this.service.getDetalleLiquidacion(this.anioConsulta, this.mesConsulta)
    }).subscribe({
      next: ({ base, detalle }) => {
        this.loading = false;
        this.cargado = true;
        this.detalleCompleto = detalle || { resumen: [], viajes: [] };
        this.construirResumen(base);
      },
      error: () => {
        this.loading = false;
        this.cargado = true;
        notify('Error al conectar con el servidor', 'error', 4000);
      }
    });
  }

  private construirResumen(data: InformacionBaseResponse) {
    const nomRegistros = this.filtrarPorUdn(data?.liquidacionesNOM || []);
    const sinProcesar = this.filtrarPorUdn(data?.sinProcesar || []);
    const noLiquidados = this.filtrarPorUdn(data?.noLiquidados || []);

    this.liquidacionesNOMDetalle = nomRegistros;
    this.noLiquidadosDetalle = noLiquidados;
    this.sinProcesarDetalle = sinProcesar;

    const semanasUnicas = Array.from(
      new Set([
        ...nomRegistros.map(r => r.claveSemanaNOM),
        ...sinProcesar.map(r => r.claveSemanaNOM).filter((s): s is string => !!s),
        ...noLiquidados.map(r => r.claveSemanaNOM).filter((s): s is string => !!s),
      ].filter((s): s is string => !!s))
    ).sort((a, b) => Number(a) - Number(b));

    this.semanasColumnas = semanasUnicas.map((s, i) => ({
      key: `semana${i + 1}`,
      label: `Semana ${i + 1}`,
      valorReal: s
    }));

    const mapa = new Map<number, ResumenOperador>();

    const obtenerResumen = (cvetra: number, nombre: string, udN: string, operacion: string, status: string): ResumenOperador => {
      if (!mapa.has(cvetra)) {
        const semanas: { [key: string]: SemanaValores } = {};
        this.semanasColumnas.forEach(c => {
          semanas[c.key] = { sueldoXViaje: 0, salarioOperador: 0, sueldoGarantia: 0, totalSemana: 0, liquidados: 0, sinLiquidar: 0 };
        });
        mapa.set(cvetra, { cvetra, nombre, udN, operacion, status, semanas, total: 0, sinProcesar: 0, noLiquidado: 0, pendiente: 0, totalGarantia: 0, diferencia: 0 });
      }
      return mapa.get(cvetra)!;
    };

    nomRegistros.forEach((r: LiquidacionNOM) => {
      const fila = obtenerResumen(r.cvetra, r.nombre, r.udN, r.operacion, r.status);
      const idx = semanasUnicas.indexOf(r.claveSemanaNOM);
      if (idx >= 0) {
        const key = this.semanasColumnas[idx].key;
        fila.semanas[key].sueldoXViaje += r.sueldoXViaje || 0;
        fila.semanas[key].salarioOperador += r.salarioOperador || 0;
        fila.semanas[key].sueldoGarantia += r.sueldoGarantia || 0;
        fila.semanas[key].totalSemana += r.totalSemana || 0;
      }
    });

    sinProcesar.forEach((r: RegistroBase) => {
      if (mapa.has(r.clave)) {
        mapa.get(r.clave)!.sinProcesar += r.sueldoNoLiquidado || 0;
      }
    });

    noLiquidados.forEach((r: RegistroBase) => {
      if (mapa.has(r.clave)) {
        mapa.get(r.clave)!.noLiquidado += r.sueldoNoLiquidado || 0;
      }
    });

    // Columna Liquidados: suma de resumen.sueldo del endpoint detalle por cveTra y semana
    mapa.forEach((fila, cvetra) => {
      this.semanasColumnas.forEach(col => {
        const suma = (this.detalleCompleto?.resumen || [])
          .filter(r => r.cveTra === cvetra && r.semana === col.valorReal)
          .reduce((acc, r) => acc + (r.sueldo || 0), 0);
        fila.semanas[col.key].liquidados = suma;
      });
    });

    // Agregar sinLiquidar por semana desde noLiquidados + sinProcesar
    const agregarSinLiquidar = (lista: RegistroBase[]) => {
      lista.forEach(r => {
        if (!mapa.has(r.clave) || !r.claveSemanaNOM) return;
        const idx = semanasUnicas.indexOf(r.claveSemanaNOM);
        if (idx < 0) return;
        const key = this.semanasColumnas[idx].key;
        mapa.get(r.clave)!.semanas[key].sinLiquidar += r.sueldoNoLiquidado || 0;
      });
    };
    agregarSinLiquidar(sinProcesar);
    agregarSinLiquidar(noLiquidados);

    this.resumen = Array.from(mapa.values())
      .map(r => {
        r.total = this.semanasColumnas.reduce((acc, c) => acc + (r.semanas[c.key]?.totalSemana || 0), 0);
        r.totalGarantia = this.semanasColumnas.reduce((acc, c) => acc + (r.semanas[c.key]?.sueldoGarantia || 0), 0);
        r.pendiente = r.sinProcesar + r.noLiquidado;
        r.diferencia = r.total + r.pendiente - r.totalGarantia;
        return r;
      })
      .sort((a, b) => a.udN.localeCompare(b.udN) || a.nombre.localeCompare(b.nombre));

    this.buildColumnDefs();
    this.buildSummaryConfig();
  }

  private buildColumnDefs() {
    const cols: any[] = [
      { dataField: 'udN', caption: 'UdN', groupIndex: 0, allowFiltering: false },
      { caption: 'Operador', calculateCellValue: (r: any) => `${r.cvetra} - ${r.nombre}`, fixed: true, minWidth: 220, cssClass: 'operador-cell', allowFiltering: true },
      { dataField: 'operacion', caption: 'Operación', width: 130, fixed: true, allowFiltering: true },
      { dataField: 'status', caption: 'Status', width: 65, fixed: true, allowFiltering: true },
    ];

    for (const col of this.semanasColumnas) {
      cols.push({
        caption: col.label,
        allowFiltering: false,
        columns: [
          { dataField: `semanas.${col.key}.sueldoXViaje`, caption: 'Viajes', format: FMT_MONEDA, width: 110, allowFiltering: false },
          { dataField: `semanas.${col.key}.salarioOperador`, caption: 'Salario', format: FMT_MONEDA, width: 90, allowFiltering: false },
          { dataField: `semanas.${col.key}.sueldoGarantia`, caption: 'Garantía', format: FMT_MONEDA, width: 90, allowFiltering: false },
          { dataField: `semanas.${col.key}.totalSemana`, caption: 'Total', format: FMT_MONEDA, width: 110, allowFiltering: false },
          { dataField: `semanas.${col.key}.liquidados`, caption: 'Liquidados', format: FMT_MONEDA, width: 110, allowFiltering: false },
          {
            name: `${col.key}.alerta`, caption: '!', width: 36, allowFiltering: false,
            calculateCellValue: (r: ResumenOperador) => {
              const s = r.semanas?.[col.key];
              return s && (s.sueldoXViaje !== 0 || s.liquidados !== 0) && s.sueldoXViaje !== s.liquidados ? '!' : '';
            }
          },
          { dataField: `semanas.${col.key}.sinLiquidar`, caption: 'Sin Liquidar', format: FMT_MONEDA, width: 100, allowFiltering: false },
        ]
      });
    }

    cols.push(
      { dataField: 'total', caption: 'Total', format: FMT_MONEDA, width: 120, cssClass: 'total-cell', allowFiltering: false, fixed: true, fixedPosition: 'right' },
      {
        caption: 'Resumen', fixed: true, fixedPosition: 'right', allowFiltering: false,
        columns: [
          { dataField: 'pendiente', caption: '+ Pendiente', format: FMT_MONEDA, width: 120, allowFiltering: false },
          { dataField: 'totalGarantia', caption: '- Garantía', format: FMT_MONEDA, width: 120, allowFiltering: false },
          { dataField: 'diferencia', caption: 'Diferencia', format: FMT_MONEDA, width: 120, allowFiltering: false },
        ]
      },
    );

    this.columnDefs = cols;
  }

  private buildSummaryConfig() {
    const groupItems: any[] = [];
    const totalItems: any[] = [];

    for (const col of this.semanasColumnas) {
      ['sueldoXViaje', 'salarioOperador', 'sueldoGarantia', 'totalSemana', 'liquidados', 'sinLiquidar'].forEach(sub => {
        const field = `semanas.${col.key}.${sub}`;
        groupItems.push({ column: field, summaryType: 'sum', displayFormat: '{0}', valueFormat: FMT_MONEDA, showInGroupFooter: true });
        totalItems.push({ column: field, summaryType: 'sum', displayFormat: '{0}', valueFormat: FMT_MONEDA });
      });
    }

    ['total', 'pendiente', 'totalGarantia', 'diferencia'].forEach(field => {
      groupItems.push({ column: field, summaryType: 'sum', displayFormat: '{0}', valueFormat: FMT_MONEDA, showInGroupFooter: true });
      totalItems.push({ column: field, summaryType: 'sum', displayFormat: '{0}', valueFormat: FMT_MONEDA });
    });

    this.summaryConfig = { groupItems, totalItems };
  }

  private filtrarPorUdn<T extends { idArea: number }>(lista: T[]): T[] {
    if (!this.selectedUdn.length || this.selectedUdn.includes(0)) {
      return lista;
    }
    return lista.filter(r => this.selectedUdn.includes(r.idArea));
  }

  onCellPrepared(e: any) {
    const dataField: string = e.column.dataField || '';
    const BORDER_GRUPO = '2px solid #6b6b68';

    // Marco de agrupación: borde izquierdo en primera sub-columna, derecho en última (todos los tipos de fila)
    if (dataField.endsWith('.sueldoXViaje')) {
      e.cellElement.style.borderLeft = BORDER_GRUPO;
    }
    if (dataField.endsWith('.sinLiquidar')) {
      e.cellElement.style.borderRight = BORDER_GRUPO;
    }
    if (e.column.name?.endsWith('.alerta')) {
      e.cellElement.style.textAlign = 'center';
      e.cellElement.style.padding = '0';
      if (e.rowType === 'data' && e.value === '!') {
        e.cellElement.style.color = '#c62828';
        e.cellElement.style.fontWeight = '700';
        e.cellElement.style.fontSize = '17px';
      }
    }


    if (e.rowType === 'header') {
      if (e.column.dataField === 'total') {
        e.cellElement.style.fontWeight = '700';
        e.cellElement.style.backgroundColor = '#d6d6d6';
      }
      // Encabezado agrupador de semana: detección por colspan DOM
      if (e.cellElement.colSpan > 1) {
        e.cellElement.style.setProperty('background-color', '#f0ede4', 'important');
        e.cellElement.style.setProperty('color', '#3d3d3a', 'important');
        e.cellElement.style.fontWeight = '700';
        e.cellElement.style.fontSize = '12px';
        e.cellElement.style.textAlign = 'center';
        e.cellElement.style.borderLeft = BORDER_GRUPO;
        e.cellElement.style.borderRight = BORDER_GRUPO;
      }
      return;
    }

    if (e.rowType !== 'data') return;

    if (dataField.startsWith('semanas.')) {
      e.cellElement.style.cursor = 'pointer';
      if (dataField.endsWith('.totalSemana')) {
        const valor = e.value || 0;
        if (valor !== 0) {
          e.cellElement.style.color = valor < UMBRAL_MONTO ? '#c62828' : '#2e7d32';
          e.cellElement.style.fontWeight = '700';
        }
      }
      return;
    }

    const camposDirectos = ['total', 'pendiente'];
    if (!camposDirectos.includes(dataField)) return;

    const valor = e.value || 0;
    if (valor === 0) return;
    const umbral = dataField === 'total' ? UMBRAL_TOTAL : UMBRAL_MONTO;
    e.cellElement.style.color = valor < umbral ? '#c62828' : '#2e7d32';
    e.cellElement.style.fontWeight = '700';
  }

  onCellClick(e: any) {
    if (e.rowType !== 'data' || !e.column.dataField?.startsWith('semanas.')) return;

    const key = e.column.dataField.split('.')[1];
    const columna = this.semanasColumnas.find(c => c.key === key);
    if (!columna) return;

    const fila: ResumenOperador = e.data;

    if (e.column.dataField.endsWith('.sinLiquidar')) {
      const todos = [...this.noLiquidadosDetalle, ...this.sinProcesarDetalle];
      this.sinLiquidarRegistros = todos.filter(
        r => r.clave === fila.cvetra && r.claveSemanaNOM === columna.valorReal
      );
      this.sinLiquidarTitulo = `${fila.nombre} - ${columna.label} - Sin Liquidar`;
      this.sinLiquidarVisible = true;
      return;
    }

    if (e.column.dataField.endsWith('.liquidados')) {
      this.abrirDetalleLiquidados(fila, columna);
      return;
    }

    this.detalleRegistros = this.liquidacionesNOMDetalle.filter(
      r => r.cvetra === fila.cvetra && r.claveSemanaNOM === columna.valorReal
    );
    this.detalleTitulo = `${fila.nombre} - ${columna.label}`;
    this.detalleVisible = true;
  }

  private abrirDetalleLiquidados(fila: ResumenOperador, columna: SemanaColumna) {
    this.detalleViajesResumen = (this.detalleCompleto?.resumen || [])
      .filter(r => r.cveTra === fila.cvetra && r.semana === columna.valorReal);
    this.detalleViajesData = (this.detalleCompleto?.viajes || [])
      .filter(v => v.idPersonal === fila.cvetra && v.semana === columna.valorReal);
    this.detalleViajesTitulo = `${fila.nombre} - ${columna.label} - Liquidados (${this.mesConsulta} ${this.anioConsulta})`;
    this.detalleViajesVisible = true;
  }
}
