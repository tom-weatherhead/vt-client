import { Injectable } 			from '@angular/core';
import { Http }       			from '@angular/http';

import { Observable }     		from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { University }           from '../../models/university';

@Injectable()
export class UniversitySearchService {

  constructor(private http: Http) {}

  search(term: string): Observable<University[]> {
    return this.http
               .get(`api/universities/?name=${term}`)
               .map(response => response.json() as University[]);
  }
}
