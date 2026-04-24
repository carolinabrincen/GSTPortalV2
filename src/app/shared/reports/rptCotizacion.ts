export class RptCotizacion {
  constructor() {

  }

  // estructura principal del reporte
  private mainBodyReport = [];

  // cuerpo del reporte
  private detailBodyReport = [];

  getReport() {
      const docDefinition: any = {
          info: {
              title: 'this.tituloNavegador',
              author: 'Plataforma Estatal de Mejora Regulatoria',
              subject: 'this.tituloReporte',
              keywords: 'PEMR',
          },
          pageSize: 'LETTER',
          pageMargins: [0, 0, 0, 50],

          defaultStyle: {
              fontSize: 12,
              columnGap: 19
          },

          // Layout del reporte
          content: {

              // Esta tabla es todo el contenido del reporte
              table: {
                  // Se definen 3 rows de la tabla como estaticos para el encabezado del reporte
                  headerRows: 3,
                  widths: ['*'],
                  body: [
                      // Fila uno de encabezado: cinta color morado
                      [
                          {
                              border: [false, false, false, false],
                              fillColor: '#562033',
                              text: '.',
                              columns: [
                                  {
                                      text: 'hola', fontSize: 28, bold: true, color: '#562033'
                                  }
                              ]
                          }
                      ],
                      // Fila 2 del encabezado: logotipos
                      [
                          {
                              columns: [
                                  {
                                      width: 'auto',
                                      margin: [20, 5, 0, 0],
                                      image: 'reportResource.imgVERACRUZ',
                                      fit: [100, 100],
                                      alignment: 'left'
                                  },
                                  {
                                      width: '*',
                                      margin: [20, 5, 0, 0],
                                      image: 'reportResource.imgORGULLO',
                                      fit: [70, 70],
                                      alignment: 'left'
                                  },
                                  {
                                      margin: [0, 5, 0, 0],
                                      width: '*',
                                      image: '',
                                      fit: [110, 110],
                                      alignment: 'center'
                                  },
                              ]
                          }
                      ],

                      // Fila tres del encabezado: nombre del documento y folio
                      [
                          {
                              border: [false, false, false, false],
                              columns: [
                                  {
                                      margins: [0, 0, 0, 0],
                                      table: {
                                          headerRows: 1,
                                          widths: ['auto', '*', 5, '*'],
                                          heights: [0, 0],
                                          body: [
                                              // Row 1: Titulo del reporte y encabezado 'Folio'
                                              [
                                                  {
                                                      border: [false, false, false, false],
                                                      margin: [15, 0, 0, 0],
                                                      fillColor: '#efefef',
                                                      text: 'this.tituloReporte',
                                                      bold: true, color: '#784004', fontSize: 9
                                                  },
                                                  {
                                                      border: [false, false, false, false],
                                                      fillColor: '#efefef',
                                                      text: '',
                                                  },
                                                  {
                                                      border: [false, false, false, false],
                                                      fillColor: '#ffffff',
                                                      text: '',
                                                  },
                                                  {
                                                      border: [false, false, false, false],
                                                      fillColor: '#efefef',
                                                      text: 'FOLIO',
                                                      fontSize: 8,
                                                      bold: true, color: '#666666'
                                                  },
                                              ],
                                              // Row 2: Datos: FT-001 y Folio
                                              [
                                                  {
                                                      border: [false, false, false, false],
                                                      margin: [15, 0, 0, 0],
                                                      fillColor: '#efefef',
                                                      text: 'this.claveReporte',
                                                      fontSize: 7
                                                  },
                                                  {
                                                      border: [false, false, false, false],
                                                      fillColor: '#efefef',
                                                      text: '',
                                                  },
                                                  {
                                                      border: [false, false, false, false],
                                                      fillColor: '#ffffff',
                                                      text: '',
                                                  },
                                                  {
                                                      border: [false, false, false, false],
                                                      fillColor: '#efefef',
                                                      text: '',
                                                      fontSize: 10,
                                                      bold: true,
                                                  },
                                              ]
                                          ]
                                      }
                                  }
                              ]
                          }
                      ],
                      // ROWS DE CONTENIDO --->> TABLA DE CONTENIDO DEL REPORTE <<---
                      [{
                          margin: [8, 0, 8, 0],
                          style: 'tablaContenido',
                          table: {
                              headerRows: 1,
                              heights: [0, 0, 10, 0, 10, 0, 0, 10, 0, 10, 0, 10, 0, 0, 10, 0, 0, 10, 0, 10],
                              widths: ['*', 'auto', '*', 'auto', 'auto', 'auto', '*', 'auto', '*', 'auto', '*'],
                              body: this.getDetailBodyReport()
                          },
                          layout: {
                              hLineColor: '#b7b7b7',
                              vLineColor: '#b7b7b7'
                          }
                      }],
                      // AVISO DE PRIVACIDAD
                      [
                          {
                              text: 'Aviso de Privacidad simplificado de Directorio de contacto con datos públicos y/o personales.',
                              bold: true, fontSize: 8, alignment: 'center'
                          }
                      ],
                      [
                          {
                              style: 'textAvisoP',
                              text: 'La Secretaría de Desarrollo Económico y Portuario del Estado de Veracruz es la responsable del tratamiento de los datos personales que nos proporcione. Los datos personales que recabamos de usted, los utilizaremos para la siguiente finalidad:' +
                                  '\n a) Para la difusión de información y cumplimiento de objetivos' +
                                  '\n b) Seguimiento a los trabajos de desarrollo de software o aplicaciones tecnológicas de gestión exclusiva del Gobierno del Estado.' +
                                  '\n\n De manera adicional, utilizaremos su información personal para las siguientes finalidades que no son necesarias, pero que nos permiten y facilitan brindar una mejor atención:' +
                                  '\n a) Para la difusión de la actividad a través de los medios de comunicación y/o redes sociales institucionales.' +
                                  '\n\nEn caso de que no desee que sus datos personales sean tratados para las finalidades adicionales, usted  puede manifestarlo al correo electrónico  mejoraregulatoriasedecop@gmail.com',
                          },
                      ],
                      [
                          {
                              margin: [25, 0, 0, 0],
                              text: '[  ]	No otorgo mi consentimiento para las finalidades adicionales descritas en este aviso.',
                              fontSize: 8,
                              alignment: 'justify'
                          },
                      ],
                      [
                          {
                              style: 'textAvisoP',
                              text: 'Le informamos que sus datos personales son compartidos con las personas, empresas, organizaciones y autoridades distintas al sujeto obligado, para los fines que se describen a continuación:'
                          },
                      ],
                      [
                          {
                              margin: [120, 0, 25, 0],
                              style: 'tablaAvisoP',
                              table: {
                                  headerRows: 1,
                                  widths: ['auto', 'auto', 200],
                                  body: [
                                      [
                                          {
                                              text: 'Destinatario de los datos personales',
                                              bold: true
                                          },
                                          { text: 'País', bold: true },
                                          { text: 'Finalidad', bold: true }
                                      ],
                                      ['Dependencias de la Administración Pública Estatal', 'México', 'Para difusión de información y cumplimiento de objetivos.'],
                                      ['Terceros desarrolladores', 'México', 'Seguimiento en el desarrollo de software o aplicaciones tecnológicas para la seguridad en accesos de usuario y contraseñas']
                                  ]
                              }
                          }
                      ],
                      [
                          {
                              style: 'textAvisoP',
                              text: 'Si usted desea manifestar su negativa para dicha transferencia, marque la siguiente casilla:'
                          },
                      ],
                      [
                          {
                              margin: [25, 0, 0, 0],
                              text: '[  ]	No otorgo mi consentimiento para la transferencia que se indica previamente.',
                              fontSize: 8,
                              alignment: 'justify'
                          },
                      ],
                      [
                          {
                              style: 'textAvisoP',
                              text: 'Si usted no manifiesta su negativa para dichas transferencias, se entenderá que ha otorgado su consentimiento.' +
                                  '\nSe informa que no se realizarán transferencias adicionales que requieran su consentimiento, salvo aquellas que sean necesarias para atender requerimientos de información de una autoridad competente, debidamente fundados y motivados.'
                          },
                      ],
                      [
                          {
                              style: 'textAvisoP',
                              text: 'Para mayor información acerca del tratamiento y de los derechos que puede hacer valer, se pone a su disposición el aviso de privacidad integral en el sitio http://www.veracruz.gob.mx/desarrolloeconomico/seccion/transparencia-2/ en la sección avisos de privacidad.'
                          },
                      ],
                  ]
              },

              // Estilos dinamicos de la tabla principal del reporte
              layout: {
                  hLineWidth(i, node) { return (i === 1 || i === 2) ? 1 : 0; },
                  vLineWidth(i, node) { return 0; },
                  hLineColor(i, node) { return (i === 1 || i === 2) ? 'white' : 'white'; },
                  vLineColor(i, node) { return 'white'; },
                  paddingTop(i, node) {
                      switch (i) {
                          case 0:
                              return 0;
                          case 1:
                              return 2;
                          default:
                              return 10;
                      }
                  }
              }
          },


          // Footer del reporte
          footer(currentPage, pageCount) {
              return {
                  columns: [
                      {
                          width: 30,
                          text: '.', color: 'white'
                      },
                      {
                          width: '*',
                          text: [
                              { text: 'Gobierno del Estado de Veracruz\n', fontSize: 12, bold: true, color: '#562033' },
                              { text: 'www.veracruz.gob.mx', fontSize: 10 }
                          ],
                          alignment: 'left'
                      },
                      {
                          width: 10,
                          text: '.', color: 'white'
                      },
                      {
                          width: '*',
                          image: '',
                          fit: [35, 35],
                          alignment: 'center'
                      }
                  ]
              };
          },
          styles: {
              textoCentrado: {
                  margin: [0, 3, 0, 0],
              },
              tablaContenido: {
                  bold: true,
                  fontSize: 7,
                  color: 'black'
              },
              tablaAvisoP: {
                  fontSize: 7,
                  color: 'black'
              },
              textAvisoP: {
                  margin: [8, 0, 8, 0],
                  fontSize: 7,
                  alignment: 'justify'
              }
          }
      };
      return docDefinition;
  }

  // Genera el cuerpo del reporte de forma dinamica
  private getDetailBodyReport() {
      this.detailBodyReport = [];
      this.detailBodyReport.push(
          // Row 1 - Entidad, Region

          [
              // Entidad
              {
                  colSpan: 2,
                  text: 'Entidad:',
                  fillColor: '#d9d9d9'
              }, {},
              // Datos: Entidad
              {
                  colSpan: 4,
                  text: '',
              }, {}, {}, {},
              // Region
              {
                  colSpan: 2,
                  text: 'Region:',
                  fillColor: '#d9d9d9'
              }, {},
              // Datos: Region
              {
                  colSpan: 3,
                  text: 'this.reportData.region.nombre',
              }, {}, {}
          ],
          // Row 2 - Titulo, nombre, primer y segundo apellido
          [
              {
                  fillColor: '#d9d9d9',
                  text: 'Título:'
              },
              {
                  colSpan: 3,
                  fillColor: '#d9d9d9',
                  text: 'Nombre(s):'
              }, {}, {},
              {
                  colSpan: 3,
                  fillColor: '#d9d9d9',
                  text: 'Primer apellido:'
              }, {}, {},
              {
                  colSpan: 4,
                  fillColor: '#d9d9d9',
                  text: 'Segundo apellido:'
              }, {}, {}, {}
          ],
          // Row 3 - Datos: Row 2
          [
              {
                  text: 'this.reportData.titulo'
              },
              {
                  colSpan: 3,
                  text: 'this.reportData.nombre'
              }, {}, {},
              {
                  colSpan: 3,
                  text: 'this.reportData.primerApellido'
              }, {}, {},
              {
                  colSpan: 4,
                  text: 'this.reportData.segundoApellido'
              }, {}, {}, {}
          ],
          // Row 4 - Cargo, sujeto obligado, oficio designacion, fecha designacion
          [
              {
                  colSpan: 4,
                  fillColor: '#d9d9d9',
                  text: 'Cargo:'
              }, {}, {}, {},
              {
                  colSpan: 3,
                  fillColor: '#d9d9d9',
                  text: 'Sujeto Obligado:'
              }, {}, {},
              {
                  colSpan: 2,
                  fillColor: '#d9d9d9',
                  text: 'Oficio de designación:'
              }, {},
              {
                  colSpan: 2,
                  fillColor: '#d9d9d9',
                  text: 'Fecha de designación:'
              }, {},
          ],
          // Row 5 - Datos: Row 4
          [
              {
                  colSpan: 4,
                  text: 'this.reportData.cargo'
              }, {}, {}, {},
              {
                  colSpan: 3,
                  text: 'this.reportData.dependencia.nombre'
              }, {}, {},
              {
                  colSpan: 2,
                  text: 'this.reportData.ofDesignacion'
              }, {},
              {
                  colSpan: 2,
                  text: 'this.numeroAFecha(this.reportData.fechaDesignacion)',
              }, {},
          ],
          // Row 6 - Domicilio de la Oficina
          [
              {
                  colSpan: 11,
                  fillColor: '#d9d9d9',
                  text: 'Domicilio de la oficina:'
              }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
          ],
          // Row 7 - Vialidad, Nombre vialidad, No. Col. Ciudad y CP
          [
              {
                  fillColor: '#d9d9d9',
                  text: 'Vialidad:'
              },
              {
                  colSpan: 3,
                  fillColor: '#d9d9d9',
                  text: 'Nombre de la Vialidad:'
              }, {}, {},
              {
                  fillColor: '#d9d9d9',
                  text: 'Número:'
              },
              {
                  colSpan: 2,
                  fillColor: '#d9d9d9',
                  text: 'Colonia:'
              }, {},
              {
                  colSpan: 3,
                  fillColor: '#d9d9d9',
                  text: 'Ciudad:'
              }, {}, {},
              {
                  fillColor: '#d9d9d9',
                  text: 'C.P:'
              }
          ],
          // Row 8 - Datos: Row 7
          [
              {
                  text: 'this.reportData.ofVialidad.nombre'
              },
              {
                  colSpan: 3,
                  text: 'this.reportData.ofNombreVialidad'
              }, {}, {},
              {
                  text: 'this.reportData.ofNumero'
              },
              {
                  colSpan: 2,
                  text: 'this.reportData.ofColonia'
              }, {},
              {
                  colSpan: 3,
                  text: 'this.reportData.ofCiudad'
              }, {}, {},
              {
                  text: 'this.reportData.ofCp'
              }
          ],
          // Row 9 - Contacto en oficina, Exts, Correo oficina, tel personal, correo personal
          [
              {
                  colSpan: 2,
                  fillColor: '#d9d9d9',
                  text: 'Contacto en oficina:'
              }, {},
              {
                  fillColor: '#d9d9d9',
                  text: 'Exts:'
              },
              {
                  colSpan: 3,
                  fillColor: '#d9d9d9',
                  text: 'Correo electrónico (oficina):'
              }, {}, {},
              {
                  colSpan: 2,
                  fillColor: '#d9d9d9',
                  text: 'Teléfono personal:'
              }, {},
              {
                  colSpan: 3,
                  fillColor: '#d9d9d9',
                  text: 'Correo electrónico personal:'
              }, {}, {}
          ],
          // Row 10 - Datos: Row 9
          [
              {
                  colSpan: 2,
                  text: 'this.reportData.ofContacto'
              }, {},
              {
                  text: 'this.reportData.ofExt'
              },
              {
                  colSpan: 3,
                  text: 'this.reportData.ofEmail'
              }, {}, {},
              {
                  colSpan: 2,
                  text: 'this.reportData.ofTelPersonal'
              }, {},
              {
                  colSpan: 3,
                  text: 'this.reportData.ofEmailPersonal'
              }, {}, {}
          ],
          // Row 11 - Nombre de su asistente, tel personal, correo personal
          [
              {
                  colSpan: 6,
                  fillColor: '#d9d9d9',
                  text: 'Nombre de su asistente:'
              }, {}, {}, {}, {}, {},
              {
                  colSpan: 2,
                  fillColor: '#d9d9d9',
                  text: 'Teléfono personal:'
              }, {},
              {
                  colSpan: 3,
                  fillColor: '#d9d9d9',
                  text: 'Correo electrónico personal:'
              }, {}, {}
          ],
          // Row 12 - Datos: Row 11
          [
              {
                  colSpan: 6,
                  text: 'this.reportData.ofAsistNombre'
              }, {}, {}, {}, {}, {},
              {
                  colSpan: 2,
                  text: 'this.reportData.ofAsistTelPersonal'
              }, {},
              {
                  colSpan: 3,
                  text: 'this.reportData.ofasistEmailPersonal'
              }, {}, {}
          ]
      );

      this.detailBodyReport.push(
          // Row 16 - Ofcina responsable de recepción y atención a quejas
          [
              {
                  colSpan: 11,
                  fillColor: '#d9d9d9',
                  text: 'Oficina responsable de la recepción y la atención a quejas:'
              }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
          ],
          // Row 17 - Responsable, Cargo, Direccion, Contacto, Horario
          [
              {
                  colSpan: 2,
                  fillColor: '#d9d9d9',
                  text: 'Nombre completo:'
              }, {},
              {
                  colSpan: 2,
                  fillColor: '#d9d9d9',
                  text: 'Cargo:'
              }, {},
              {
                  colSpan: 3,
                  fillColor: '#d9d9d9',
                  text: 'Dirección de la oficina:'
              }, {}, {},
              {
                  colSpan: 2,
                  fillColor: '#d9d9d9',
                  text: 'Contacto en oficina:'
              }, {},
              {
                  colSpan: 2,
                  fillColor: '#d9d9d9',
                  text: 'Horario:'
              }, {}
          ],
          // Row 18 - Datos : Row 17
          [
              {
                  colSpan: 2,
                  text: 'this.reportData.ofqNombre'
              }, {},
              {
                  colSpan: 2,
                  text: 'this.reportData.ofqCargo'
              }, {},
              {
                  colSpan: 3,
                  text: 'this.reportData.ofqDireccion'
              }, {}, {},
              {
                  colSpan: 2,
                  text: 'this.reportData.ofqContacto'
              }, {},
              {
                  colSpan: 2,
                  text: '',
              }, {}
          ],
          // Row 19 - Mas oficinas responsables, Cadena o sello digital
          [
              {
                  colSpan: 4,
                  fillColor: '#d9d9d9',
                  text: '¿El Sujeto Obligado tiene más oficinas responsables?, ¿cuántas?'
              }, {}, {}, {},
              {
                  colSpan: 7,
                  fillColor: '#d9d9d9',
                  text: 'Firma Electrónica Avanzada (e-firma)'
              }, {}, {}, {}, {}, {}, {},
          ],
          // Row 20 - Datos: Row 19
          [
              {
                  colSpan: 4,
                  text: 'hola'
              }, {}, {}, {},
              {
                  colSpan: 7,
                  text: 'this.reportData.firmaElectronica',
              }, {}, {}, {}, {}, {}, {}
          ]
      );
      return this.detailBodyReport;
  }

  private getLogo(){
      return 'logo';
  }



}
