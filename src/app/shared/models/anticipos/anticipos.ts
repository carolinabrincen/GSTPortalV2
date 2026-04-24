export class Anticipos {
    suma_Total: number = 0;
    suma_PorLiquidar : number = 0;
    suma_AntSinLquidar: number = 0
}

export class AllAnticipos {
    antBanPagado: number = 0;
    antBanContabilizado: number = 0;
    antBanLiq: number = 0;
    antBanLiqCont: number = 0;
    banLiqSinContabilizar: number = 0;
    total_renglon1: number = 0;
    antBanTotal: number = 0;
    antCajaPagado: number = 0;
    antCajaContabilizado: number = 0;
    antCajaLiq: number = 0;
    antCajaLiqCont: number = 0;
    cajLiqSinContabilizar: number = 0;
    total_renglon2: number = 0;
    antCajaTotal: number = 0;
    liqRembolso: number = 0;
    reemCargos: number = 0;
    reemAbonos: number = 0;
    diferencia: number = 0;
    clasificacionB: string = "Bancos";
    clasificacionC: string = "Caja"
}