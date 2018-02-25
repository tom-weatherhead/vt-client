import { Component, OnInit, ChangeDetectorRef }		from '@angular/core';

import { University }        						from '../../models/university';
import { UniversityService } 						from '../../services/university/university.service';

@Component({
  selector: 'my-universities',
  templateUrl: './universities.component.html',
  styleUrls: [ './universities.component.css' ]
})
export class UniversitiesComponent implements OnInit {
  universities: University[] = [];

  constructor(private changeDetectorRef: ChangeDetectorRef,
  	private universityService: UniversityService) { }

  ngOnInit(): void {
    this.getUniversities();
  }

  getUniversities(): void {
    this.universityService
        .getUniversities()
        .subscribe(universities => {
          this.universities = universities;
		  this.changeDetectorRef.detectChanges();			// !!! This is necessary.
        });
  }
}
