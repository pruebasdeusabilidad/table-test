import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AppService {

  constructor(private http: Http) { }

  getData(): Observable<any> {
    return this.http
      .get('https://jsonplaceholder.typicode.com/users')
      .map(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
      return Observable.throw(error || 'Server error');
  }

}
