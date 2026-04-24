import { Component } from '@angular/core';
import { HomeService } from 'src/app/services/home/home.service';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent {

  seconds = 0;
  minutes = 0;
  hours = 0;
  timer: boolean = true;
  recordingTimer: any = '00:00:00';

  counter: { min: number, sec: number }

  constructor(
    private homeService: HomeService
  ) {  }

  ngOnInit(): void {
    this.ActualizacionMacrociclo();
  }

  ActualizacionMacrociclo(){
    // const date = new Date();
    // // const formattedDateTime = date.toLocaleString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
    // const formattedDateTime = date.toLocaleString('es-MX', {  hour: 'numeric', minute: 'numeric', hour12: true });
    // //console.log(formattedDateTime);  

    // var now = new Date();

    // const currentDate = new Date();
    // let hours = currentDate.getHours();
    // let minutes = currentDate.getMinutes();
    // let meridiem = hours >= 12 ? 'PM' : 'AM';

    // hours = hours % 12;
    // hours = hours ? hours : 12;

    // // between 7 PM and 7 AM respectively
    // if(now.getHours() >= 9 || now.getHours() <= 8) {
    //   if(now.getHours() !== 8 || now.getMinutes() >= 30) {
    //     this.homeService.actualizarMacrociclo().subscribe(data =>{
    //       console.log(data)
    //       console.log("ACTUALIZACON EN EL RANGO DE HORARIO")
    //     })
    //   }else{
    //     console.log("ACTALIZACION FUERA DE RANGO DE HORARIO")
    //   }
    // }

    var today = new Date().getHours();
    var minutes = new Date().getMinutes();

    if (today >= 8 && today <= 9) {
        if (today !== 8 || minutes >= 30){
          this.homeService.actualizarMacrociclo().subscribe(data =>{
              console.log(data)
              console.log("ACTUALIZACON EN EL RANGO DE HORARIO")
        
        })
        

      }else {
        console.log("ACTALIZACION FUERA DE RANGO DE HORARIO")
      }
    
    }else{
      console.log("FUERA DE HORARIO")
    }
  }
}
