
import { Component, Input, AfterViewInit } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { Employee, Service } from '../app.services';

@Component({
  selector: 'detail-grid',
  templateUrl: './detail-grid.component.html',
  
  providers: [Service],
})
export class DetailGridComponent implements AfterViewInit {
  @Input() key: number | undefined;

  tasksDataSource: any;

  tasks: any;

  constructor(private service: Service) {
   
    this.tasks = service.getTasks();
    
  }

  ngAfterViewInit() {
    this.tasksDataSource = new DataSource({
      store: new ArrayStore({
        data: this.tasks,
        key: 'ID',
      }),
      filter: ['EmployeeID', '=', this.key],
    });
  }

  
}
