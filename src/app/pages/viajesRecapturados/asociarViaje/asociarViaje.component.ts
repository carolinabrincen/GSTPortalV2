import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import notify from 'devextreme/ui/notify';
import { confirm } from 'devextreme/ui/dialog';
import { UDNS } from '../udns';
import { ViajesRecapturadosService } from 'src/app/services/viajesRecapturados/viajesRecapturados.service';

@Component({
  selector: 'app-asociar-viaje',
  templateUrl: './asociarViaje.component.html',
  styleUrls: ['./asociarViaje.component.scss']
})
export class AsociarViajeComponent {

  udns = UDNS;

  clasificaciones = [
    { id: 1, descripcion: '1.- Factura viaje anterior se cancela, Factura viaje nuevo ingreso. Cada UDN se queda con su ingreso.' },
    { id: 2, descripcion: '2.- Factura viaje anterior se cancela, Factura viaje nuevo ingreso, INGRESO factura viaje nuevo para UDN del viaje anterior.' },
    { id: 3, descripcion: '3.- Factura del viaje anterior INTERCOMPAÑIA no se cancela, Factura viaje nuevo NO cuenta para el ingreso.' }
  ];
  clasificacionSeleccionada: number | null = null;

  antArea: number | null = null;
  antViaje: string = '';
  nuevoArea: number | null = null;
  nuevoViaje: string = '';
  antData: any = null;
  nuevoData: any = null;
  loading = false;

  get puedeAsociar(): boolean {
    return this.antData !== null && this.nuevoData !== null
      && !this.nuevoData.noLiquidacion
      && !this.antData.yaAsociado
      && !this.nuevoData.yaAsociado;
  }

  constructor(private service: ViajesRecapturadosService) {}

  soloNumeros(e: any) {
    const key = e.event.key;
    if (!/^[0-9]$/.test(key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(key)) {
      e.event.preventDefault();
    }
  }

  buscar() {
    if (!this.antArea || !this.antViaje || !this.nuevoArea || !this.nuevoViaje ) {
      notify('Completa todos los campos para buscar', 'warning', 3000);
      return;
    }

    if (this.antArea === this.nuevoArea && this.antViaje === this.nuevoViaje) {
      notify('El viaje anterior y el viaje nuevo no pueden ser el mismo viaje en la misma UdN', 'warning', 4000);
      return;
    }

    this.loading = true;
    this.antData = null;
    this.nuevoData = null;

    forkJoin([
      this.service.buscarViaje(this.antArea, this.antViaje),
      this.service.buscarViaje(this.nuevoArea, this.nuevoViaje)
    ]).subscribe({
      next: ([resAnt, resNuevo]) => {
        this.loading = false;
        if (resAnt.responseCode !== 200) {
          notify(`Viaje anterior: ${resAnt.responseText}`, 'error', 4000);
          return;
        }
        if (resNuevo.responseCode !== 200) {
          notify(`Viaje nuevo: ${resNuevo.responseText}`, 'error', 4000);
          return;
        }
        this.antData = { ...resAnt.data.viaje, cartasPorte: resAnt.data.cartasPorte, yaAsociado: resAnt.data.yaAsociado };
        this.nuevoData = { ...resNuevo.data.viaje, cartasPorte: resNuevo.data.cartasPorte, yaAsociado: resNuevo.data.yaAsociado };
      },
      error: () => {
        this.loading = false;
        notify('Error al conectar con el servidor', 'error', 4000);
      }
    });
  }

  async confirmarAsociacion() {
    if (this.clasificacionSeleccionada === null) {
      notify('Debes seleccionar una clasificación antes de asociar', 'warning', 3000);
      return;
    }

    const clsDesc = this.clasificaciones.find(c => c.id === this.clasificacionSeleccionada)?.descripcion || '';
    const result = await confirm(
      `¿Confirmas asociar el viaje <b>${this.antViaje}</b> con el viaje <b>${this.nuevoViaje}</b>?<br><br><b>Clasificación:</b> ${clsDesc}`,
      'Confirmar asociación'
    );
    if (!result) return;

    const usuario = sessionStorage.getItem('idUsuario') || '';
    this.service.asociarViajes({
      id_area_ant: this.antArea!,
      no_viaje_ant: Number(this.antViaje),
      id_area: this.nuevoArea!,
      no_viaje: Number(this.nuevoViaje),
      usuario,
      clasificacion: String(this.clasificacionSeleccionada)
    }).subscribe({
      next: (res) => {
        console.log(res);
        if (res.mensaje === "Viajes asociados correctamente") {
          notify('Viajes asociados correctamente', 'success', 3000);
          this.limpiar();
        } else {
          notify(res.responseText || 'Error al asociar', 'error', 4000);
        }
      },
      error: (err) => {
        const msg = err?.error?.message || err?.error?.mensaje || err?.error || 'Error al asociar los viajes';
        notify(typeof msg === 'string' ? msg : JSON.stringify(msg), 'error', 6000);
      }
    });
  }

  limpiar() {
    this.antArea = null;
    this.antViaje = '';
    this.nuevoArea = null;
    this.nuevoViaje = '';
    this.antData = null;
    this.nuevoData = null;
    this.clasificacionSeleccionada = null;
  }

  getTotalFlete(cartasPorte: any[]): number {
    return (cartasPorte || []).reduce((sum: number, cp: any) => sum + (cp.flete || 0), 0);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value || 0);
  }

  formatFecha(fecha: string): string {
    if (!fecha) return '';
    const d = new Date(fecha);
    return `${d.getDate().toString().padStart(2,'0')}/${(d.getMonth()+1).toString().padStart(2,'0')}/${d.getFullYear()}`;
  }
}
