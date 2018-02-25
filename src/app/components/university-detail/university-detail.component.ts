import { Component, ChangeDetectorRef }		from '@angular/core';
import { ActivatedRoute, ParamMap }       			from '@angular/router';
import { Location }                       			from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { University }                       		from '../../models/university';
import { UniversityService }                		from '../../services/university/university.service';

@Component({
  selector: 'university-detail',
  templateUrl: './university-detail.component.html',
  styleUrls: [ './university-detail.component.css' ]
})
export class UniversityDetailComponent /* implements OnInit, AfterViewInit */ {
  university: University;

  constructor(private changeDetectorRef: ChangeDetectorRef,
    private universityService: UniversityService,
    private route: ActivatedRoute,
    private location: Location
  ) {
	//console.log('UniversityDetailComponent constructor');
	this.loadDataAndDisplayIt();
  }

  ngOnInit(): void {
  }

  // ngOnChanges

  // ngAfterViewInit(): void {
	// this.loadDataAndDisplayIt();
  // }

  loadDataAndDisplayIt(): void {
    this.route.paramMap
	  // Note: the + in front of params.get('id') converts the ID from a string to an int.
      .switchMap((params: ParamMap) => this.universityService.getUniversity(+params.get('id')))
      .subscribe(university => {
		  //console.log('UniversityDetailComponent: university is', university);
		  this.university = university;
		  this.changeDetectorRef.detectChanges();			// !!! This is necessary.
	  });
  }

  /* save(): void {
    this.heroService.update(this.hero)
      .then(() => this.goBack());
  } */

  goBack(): void {
    this.location.back();
  }
}
