import { Component } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { UDNS } from '../udns';
import { ViajesRecapturadosService } from 'src/app/services/viajesRecapturados/viajesRecapturados.service';

@Component({
  selector: 'app-buscar-viajes',
  templateUrl: './buscarViajes.component.html',
  styleUrls: ['./buscarViajes.component.scss']
})
export class BuscarViajesComponent {

  udns = UDNS;

  clasificaciones = [
    { id: '1', descripcion: '1.- Factura viaje anterior se cancela, Factura viaje nuevo ingreso. Cada UDN se queda con su ingreso..' },
    { id: '2', descripcion: '2.- Factura viaje anterior se cancela, Factura viaje nuevo ingreso, INGRESO factura viaje nuevo para UDN del viaje anterior.' },
    { id: '3', descripcion: '3.- Factura del viaje anterior INTERCOMPAÑIA no se cancela, Factura viaje nuevo NO cuenta para el ingreso.' }
  ];

  getClasificacion = (rowData: any): string => {
    const cls = this.clasificaciones.find(c => c.id === String(rowData?.clasificacion));
    return cls?.descripcion || String(rowData?.clasificacion || '');
  };

  fechaSeleccionada: any = null;
  resultados: any[] = [];
  loading = false;

  calendarOptions = { maxZoomLevel: 'year' as const, minZoomLevel: 'decade' as const, zoomLevel: 'year' as const };
  allowedPageSizes = [10, 20, 50];

  get puedesBuscar(): boolean {
    return !!this.fechaSeleccionada;
  }

  constructor(private service: ViajesRecapturadosService) {}

  buscar() {
    if (!this.fechaSeleccionada) {
      notify('Selecciona un mes y año para buscar', 'warning', 3000);
      return;
    }

    const mes = this.fechaSeleccionada.getMonth() + 1;
    const anio = this.fechaSeleccionada.getFullYear();



    this.loading = true;
    this.resultados = [];

    this.service.getAsociados(mes, anio).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.responseCode === 200) {
          this.resultados = res.data || [];
          
        } else {
          notify(res.responseText || 'Error al obtener los viajes', 'error', 4000);
        }
      },
      error: () => {
        this.loading = false;
        notify('Error al conectar con el servidor', 'error', 4000);
      }
    });
  }

  getCiudad(idArea: number): string {
    return UDNS.find(u => u.id_area === idArea)?.ciudad || String(idArea);
  }

  formatAplicacion = (rowData: any): string => {
    if (!rowData?.aplicacion) return '';
    const d = new Date(rowData.aplicacion);
    const dd  = d.getDate().toString().padStart(2, '0');
    const mm  = (d.getMonth() + 1).toString().padStart(2, '0');
    const hh  = d.getHours().toString().padStart(2, '0');
    const min = d.getMinutes().toString().padStart(2, '0');
    return `${dd}/${mm}/${d.getFullYear()} ${hh}:${min}`;
  };

  getCiudadAnt = (rowData: any): string =>
    this.getCiudad(rowData?.viajeAnterior?.idArea);

  getCiudadNuevo = (rowData: any): string =>
    this.getCiudad(rowData?.viajeNuevo?.idArea);

  getLiqAnt = (rowData: any): string =>
    rowData?.viajeAnterior?.noLiquidacion != null
      ? String(rowData.viajeAnterior.noLiquidacion)
      : 'SIN LIQ';

  getLiqNuevo = (rowData: any): string =>
    rowData?.viajeNuevo?.noLiquidacion != null
      ? String(rowData.viajeNuevo.noLiquidacion)
      : 'SIN LIQ';

  onCellPrepared(e: any) {
    if (e.rowType !== 'data') return;
    if (e.column.name === 'liqAnt' || e.column.name === 'liqNuevo') {
      const cell: HTMLElement = e.cellElement;
      cell.style.textAlign = 'center';
      if (e.value === 'SIN LIQ') {
        cell.style.color = '#2e7d32';
        cell.style.fontWeight = '700';
        cell.style.background = '#e8f5e9';
      } else {
        cell.style.color = '#f57f17';
        cell.style.fontWeight = '700';
        cell.style.background = '#fff8e1';
      }
    }
  }
}
