import { Component, OnInit, ChangeDetectorRef }		from '@angular/core';
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
export class UniversityDetailComponent implements OnInit {
  university: University;

  constructor(private changeDetectorRef: ChangeDetectorRef,
    private universityService: UniversityService,
    private route: ActivatedRoute,
    private location: Location
  ) {
	console.log('UniversityDetailComponent constructor');
    this.route.paramMap
      .switchMap((params: ParamMap) => {
		  console.log('UniversityDetailComponent: id is', params.get('id'));
		  return this.universityService.getUniversity(+params.get('id'));
	  })
      //.switchMap((params: ParamMap) => this.universityService.getUniversity(params.get('id')))
      .subscribe(university => {
		  console.log('UniversityDetailComponent: university is', university);
		  this.university = university;
		  this.changeDetectorRef.detectChanges();			// !!! This is necessary.
	  });
  }

  ngOnInit(): void {
	/*
    this.route.paramMap
      .switchMap((params: ParamMap) => {
		  console.log('UniversityDetailComponent: id is', params.get('id'));
		  return this.universityService.getUniversity(+params.get('id'));
	  })
      //.switchMap((params: ParamMap) => this.universityService.getUniversity(params.get('id')))
      .subscribe(university => {
		  console.log('UniversityDetailComponent: university is', university);
		  this.university = university;
		  this.changeDetectorRef.detectChanges();			// !!! This is necessary.
	  });
	*/
  }

  /* save(): void {
    this.heroService.update(this.hero)
      .then(() => this.goBack());
  } */

  goBack(): void {
    this.location.back();
  }
}
