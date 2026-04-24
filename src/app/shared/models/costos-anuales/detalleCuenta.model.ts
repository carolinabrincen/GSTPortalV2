import { DataDetalle } from './dataDetalle.model'

export interface DetalleCuenta{
    responseCode: number,
    responseText: string,
    data: Array<DataDetalle>
}