import { Component, OnInit, ChangeDetectorRef }		from '@angular/core';

import { Observable }                       		from 'rxjs';

import { University }         						from '../../models/university';
// import { UniversitySearchComponent }				from '../university-search/university-search.component';
import { UniversityService }  						from '../../services/university/university.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  universities: University[] = [];
  
  constructor(private changeDetectorRef: ChangeDetectorRef,
    private universityService: UniversityService) { }

  ngOnInit(): void {
	this.universityService.getUniversities()
		.subscribe(universities => {
			this.universities = universities.slice(0, 4);
			this.changeDetectorRef.detectChanges();			// !!! This is necessary.
			console.log('DashboardComponent ngOnInit() : universities is', universities);
		});
  }
}
