import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk';
//import { MatPaginatorModule } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  controlador: Controller;
  data: DataTable;
  _columns = [
    'col1', 'col2', 'col3', 'col4',
    'col5', 'col6', 'col7', 'col8',
    'col9', 'col10', 'col11', 'col12'
  ];

  constructor(private service: AppService) {
    this.controlador = new Controller(this.service);
    this.data = new DataTable(this.controlador);
  }
}


export class Controller {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  get data(): any[] { return this.dataChange.value; }

  constructor(private service: AppService) {
    // Fill up the database with 100 users.
    this.service.getData().subscribe(stream => {
      console.log(stream);
      this.dataChange.next(stream);
    });
  }
}

export class DataTable extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any[]> {
    return this._origin.dataChange;
  }

  disconnect() {}

  constructor(private _origin: Controller) {
    super();
  }
}