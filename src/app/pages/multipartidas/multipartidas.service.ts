import { Injectable } from '@angular/core';

export class Multipartidas {
  componentePieza: string;
  parte: string;
}

const countriesInfo: Multipartidas[] = [
{
  componentePieza: '001001001007-CABEZA DE MOTOR.- Cambiar',
  parte:'https://static.wixstatic.com/media/00dc81_50529aaef79940d391ba6402646f67d1~mv2_d_2160_1440_s_2.jpg/v1/fill/w_980,h_413,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/00dc81_50529aaef79940d391ba6402646f67d1~mv2_d_2160_1440_s_2.jpg',
}
];

@Injectable()
export class Service {
  getAvance(): Multipartidas[] {
    return countriesInfo;
  }
}
