import { Injectable }                       from '@angular/core';
import { HttpClient, HttpHeaders }			from '@angular/common/http';

//import { Observable }                       from 'rxjs';
import { Observable }						from 'rxjs/Observable';
import { of }								from 'rxjs/observable/of';
import { catchError, map, tap }				from 'rxjs/operators';

//import * as restClient						from 'observable-json-rest-api-client';

import { MessageService }					from '../message/message.service';

import { University }                       from '../../models/university';

// TomW 2018-03-06 : Deleted angular-in-memory-web-api from package.json
//    "angular-in-memory-web-api": "~0.5.0",

/*
https://angular.io/api/common/http/HttpClient

import { HttpClient } from '@angular/common/http';

class HttpClient {
  constructor(handler: HttpHandler)
  request(first: string | HttpRequest<any>, url?: string, options: {...}): Observable<any>
  delete(url: string, options: {...}): Observable<any>
  get(url: string, options: {...}): Observable<any>
  head(url: string, options: {...}): Observable<any>
  jsonp<T>(url: string, callbackParam: string): Observable<T>
  options(url: string, options: {...}): Observable<any>
  patch(url: string, body: any | null, options: {...}): Observable<any>
  post(url: string, body: any | null, options: {...}): Observable<any>
  put(url: string, body: any | null, options: {...}): Observable<any>
}
*/

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UniversityService {
	//restApiBaseUrl = 'http://localhost:3000/u/';
	private universitiesUrl = 'http://localhost:3000/u/';

	constructor(
		private http: HttpClient,
		private messageService: MessageService)
	{
	}

	// postUniversity(university: University): Observable<any> {
		// return restClient.post(this.restApiBaseUrl, university)
			// .catch(error => {
			// 	console.log('postUniversity(' + id.toString() + ') error:', error.message || error);
			// 	return Observable.of(null);
			// })
			// ;
	// }

	/** GET universities from the vt-server */
	getUniversities (): Observable<University[]> {
		return this.http.get<University[]>(this.universitiesUrl)
			.pipe(
				tap(universities => this.log(`Fetched universities`)),
				catchError(this.handleError('getUniversities', []))
			);
	}

	/** GET university by id. Return `undefined` when id not found */
	getUniversityNo404<Data>(id: number): Observable<University> {
		const url = `${this.universitiesUrl}/?id=${id}`;
		return this.http.get<University[]>(url)
			.pipe(
				map(universities => universities[0]), // returns a {0|1} element array
				tap(h => {
					const outcome = h ? `fetched` : `did not find`;
					this.log(`${outcome} university id=${id}`);
				}),
				catchError(this.handleError<University>(`getUniversity id=${id}`))
			);
	}

	/** GET university by id. Will 404 if id not found */
	getUniversity(id: number): Observable<University> {
		const url = `${this.universitiesUrl}/${id}`;
		return this.http.get<University>(url).pipe(
			tap(_ => this.log(`Fetched university id=${id}`)),
			catchError(this.handleError<University>(`getUniversity id=${id}`))
		);
	}

	/* GET universities whose name contains search term */
	searchUniversities(term: string): Observable<University[]> {

		if (!term.trim()) {
			// if not search term, return empty university array.
			return of([]);
		}

		const url = `${this.universitiesUrl}/?name=${term}`;

		return this.http.get<University[]>(url).pipe(	// TODO: Change this URL, or write a handler for it in vt-server.
			tap(_ => this.log(`found universities matching "${term}"`)),
			catchError(this.handleError<University[]>('searchUniversities', []))
		);
	}

	//////// Save methods //////////

	/** POST: add a new university to the server */
	addUniversity (university: University): Observable<University> {
		return this.http.post<University>(this.universitiesUrl, university, httpOptions).pipe(
			tap((university: University) => this.log(`added university with id=${university.id}`)),
			catchError(this.handleError<University>('addUniversity'))
		);
	}

	/** DELETE: delete the university from the server */
	deleteUniversity (university: University | number): Observable<University> {
		const id = typeof university === 'number' ? university : university.id;
		const url = `${this.universitiesUrl}/${id}`;

		return this.http.delete<University>(url, httpOptions).pipe(
			tap(_ => this.log(`Deleted university id=${id}`)),
			catchError(this.handleError<University>('deleteUniversity'))
		);
	}

	/** PUT: update the university on the server */
	updateUniversity (university: University): Observable<any> {
		return this.http.put(this.universitiesUrl, university, httpOptions).pipe(
			tap(_ => this.log(`updated university id=${university.id}`)),
			catchError(this.handleError<any>('updateUniversity'))
		);
	}

	// putUniversity(id: number, changes: any): Observable<any> {
		// return restClient.put(this.restApiBaseUrl + id.toString(), changes)
	// putUniversity(id: number, university: University): Observable<any> {
		// return restClient.put(this.restApiBaseUrl + id.toString(), university)
			// .catch(error => {
				// console.log('putUniversity(' + id.toString() + ') error:', error.message || error);
				// return Observable.of(null);
			// });
	// }

	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T> (operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// TODO: better job of transforming error for user consumption
			this.log(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}

	/** Log a UniversityService message with the MessageService */
	private log(message: string) {
		this.messageService.add('UniversityService: ' + message);
	}
}

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
