import { Component, ViewChild, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AppService } from './app.service';
import { MdPaginator, MdSort } from '@angular/material';
import 'rxjs/add/observable/merge';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  controlador: Controller;
  data: DataTable;
  _columns = [
    'col1', 'col2', 'col3', 'col4',
    'col5', 'col6', 'col7', 'col8',
    'col9', 'col10', 'col11', 'col12'
  ];
  @ViewChild(MdPaginator) paginator: MdPaginator; // necesario para la paginacion
  @ViewChild(MdSort) sort: MdSort; // necesario para la paginacion

  constructor(private service: AppService) {
    this.controlador = new Controller(this.service);
  }

  ngOnInit() {
    this.data = new DataTable(this.controlador, this.paginator, this.sort);
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
    const displayDataChanges = [
      this._origin.dataChange,
      this._sort.mdSortChange,
      this._paginator.page,
  ];

  return Observable.merge(...displayDataChanges).map(() => {
      const data = this._origin.data.slice();

      // ordenamiento
      const sortedData = this.sortData(data);

      // paginacion
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return sortedData.splice(startIndex, this._paginator.pageSize);
  });
  }

  disconnect() { }

  constructor(private _origin: Controller, private _paginator?: MdPaginator, private _sort?: MdSort) {
    super();
  }

  // Retorna una copia de los datos ordenada.
  private sortData(data: any[]): any[] {
    if (!this._sort.active || this._sort.direction === '') { return data; }
    const order = data.sort((a, b) => {
      let propertyA: Date | number | String = '';
      let propertyB: Date | number | String = '';

      switch (this._sort.active) {
        case 'col1': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'col2': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'col3': [propertyA, propertyB] = [a.username, b.username]; break;
        case 'col4': [propertyA, propertyB] = [a.email, b.email]; break;
        case 'col5': [propertyA, propertyB] = [a.phone, b.phone]; break;
        case 'col7': [propertyA, propertyB] = [a.address.geo.lng, b.address.geo.lng]; break;
        case 'col9': [propertyA, propertyB] = [a.id, b.id]; break;
        // case 'col11': [propertyA, propertyB] = [a.monto, b.monto]; break;
        // case 'col12': [propertyA, propertyB] = [a.estado, b.estado]; break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
    return order;
  }

}