import { Injectable }    from '@angular/core';

// import { Mongoose }      from 'mongoose';  // See also systemjs.config.js

import { Observable }                       from 'rxjs';

@Injectable()
export class UniversityMongoDBService {

  // constructor(private mongoose: Mongoose) { }
  constructor() { }

  getTestData(): Observable<any> {
  	return Observable.of('MongoDB is Dandy!');
  }
}
