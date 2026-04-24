import { Injectable } from '@angular/core';

  const unidadesNegocio  = [
    
    {
      "ID": "0",
      "name": "NACIONAL",
      "expanded": true
    },
    {
      "ID": "1",
      "categoryId": "0",
      "name": "ORIZABA"
    },
    {
      "ID": "2",
      "categoryId": "0",
      "name": "GUADALAJARA",
      "expanded": true
    },
    {
      "ID": "3",
      "categoryId": "0",
      "name": "RAMOS ARIZPE",
      "price": 220
    },
    {
      "ID": "4",
      "categoryId": "0",
      "name": "MEXICALI",
      "price": 270
    },
    {
      "ID": "5",
      "categoryId": "0",
      "name": "HERMOSILLO",
      
    },
    {
      "ID": "8",
      "categoryId": "0",
      "name": "CUAUTITLAN",
      "price": 1600
    },
    {
      "ID": "9",
      "categoryId": "0",
      "name": "TULTITLAN",
      "price": 1750
    }
    
  ];

  @Injectable()
export class UnidadesService {
  getUnidades() {
    return unidadesNegocio;
  }
}