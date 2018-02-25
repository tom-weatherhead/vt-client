import { Injectable }                       from '@angular/core';

import { University }                       from '../../models/university';

import { Observable }                       from 'rxjs';
import { fromPromise }						from 'rxjs/observable/fromPromise';
//import 'rxjs/observable/fromPromise';	// No.

import * as httpJsonRequest					from 'thaw-http-json-request';

@Injectable()
export class UniversityService {
  /*
  private universities: University[] = [
    {
      id: 1,
      name: 'North Carolina State University at Raleigh',
      shortName: 'NCSU Raleigh',
      numUndergraduateStudents: 22925,
      percentWhite: 74.67,
      percentBlack: 6.5,
      percentHispanic: 4.47,
      percentAsian: 5.37,
      percentAmericanNative: 0.42,
      percentPacificIslander: 0.06,
      percentMultipleRaces: 3.51,
      percentNonResidentAlien: 3.27,
      percentUnknown: 1.72,
      funk: 1
    },
    {
      id: 2,
      name: 'Texas A & M University-College Station',
      shortName: 'Tx A&M Clg Stn',
      numUndergraduateStudents: 46941,
      percentWhite: 66.1,
      percentBlack: 2.78,
      percentHispanic: 20.68,
      percentAsian: 5.46,
      percentAmericanNative: 0.28,
      percentPacificIslander: 0.1,
      percentMultipleRaces: 3.08,
      percentNonResidentAlien: 1.31,
      percentUnknown: 0.22,
      funk: 2
    },
    {
      id: 3,
      name: 'The University of Texas at Austin',
      shortName: 'U T Austin',
      numUndergraduateStudents: 38914,
      percentWhite: 46.03,
      percentBlack: 4.13,
      percentHispanic: 21.92,
      percentAsian: 18.95,
      percentAmericanNative: 0.2,
      percentPacificIslander: 0.14,
      percentMultipleRaces: 3.46,
      percentNonResidentAlien: 4.68,
      percentUnknown: 0.49,
      funk: 3
    },
    {
      id: 4,
      name: 'Virginia Polytechnic Institute and State University',
      shortName: 'Virginia Tech',
      numUndergraduateStudents: 24191,
      percentWhite: 69.67,
      percentBlack: 3.6,
      percentHispanic: 5.3,
      percentAsian: 9.19,
      percentAmericanNative: 0.15,
      percentPacificIslander: 0.13,
      percentMultipleRaces: 4.29,
      percentNonResidentAlien: 4.51,
      percentUnknown: 3.15,
      funk: 5
    },
    {
      id: 5,
      name: 'University of Virginia-Main Campus',
      shortName: 'U Va Main',
      numUndergraduateStudents: 15515,
      percentWhite: 61.17,
      percentBlack: 6.19,
      percentHispanic: 6.09,
      percentAsian: 12.27,
      percentAmericanNative: 0.1,
      percentPacificIslander: 0.03,
      percentMultipleRaces: 4.55,
      percentNonResidentAlien: 5.0,
      percentUnknown: 4.6,
      funk: 8
    }
  ];
  */

  // private toastUniversity: University = { id: 0, name: 'Toast', funk: 4 };

  /*
  private toastUniversity: University = {
    id: 0,
    name: 'Toast',
    shortName: 'Toast',
    numUndergraduateStudents: 22925,
    percentWhite: 74.67,
    percentBlack: 6.5,
    percentHispanic: 4.47,
    percentAsian: 5.37,
    percentAmericanNative: 0.42,
    percentPacificIslander: 0.06,
    percentMultipleRaces: 3.51,
    percentNonResidentAlien: 3.27,
    percentUnknown: 1.72,
    funk: 4
  };
  */

	constructor() { }

	getUniversities(): Observable<University[]> {
		console.log('UniversityService.getUniversities()');

		const descriptor = {
			noHttps: true,
			host: 'localhost',
			port: 3000,
			path: '/u/'
		};

		return fromPromise(httpJsonRequest.get(descriptor));
	}

	getUniversity(id: number): Observable<University> {
		console.log('UniversityService.getUniversity(' + id.toString() + ')');

		const descriptor = {
			noHttps: true,
			host: 'localhost',
			port: 3000,
			path: '/u/' + id.toString()
		};

		return fromPromise(httpJsonRequest.get(descriptor))
			.catch(error => {
				console.log('getUniversity(' + id.toString() + ') error:', error.message || error);
				//return Observable.of(this.toastUniversity);
				return Observable.of(null);
			});
	}

  /*
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
   */
}
