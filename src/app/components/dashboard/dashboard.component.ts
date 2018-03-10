import { Component, OnInit, ChangeDetectorRef }		from '@angular/core';

import { Observable }                       		from 'rxjs';

// import { Hero }               						from '../../models/hero';
// import { HeroService }        						from '../../services/hero/hero.service';

import { University }         						from '../../models/university';
import { UniversityService }  						from '../../services/university/university.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  //heroes: Hero[] = [];
  universities: University[] = [];
  
  constructor(private changeDetectorRef: ChangeDetectorRef,
    //private heroService: HeroService,
    private universityService: UniversityService) { }

  ngOnInit(): void {
    // this.heroService
      // .getHeroes()
      // .subscribe(heroes => this.heroes = heroes.slice(1, 5));

	this.universityService.getUniversities()
		.subscribe(universities => {
			this.universities = universities.slice(0, 4);
			this.changeDetectorRef.detectChanges();			// !!! This is necessary.
			console.log('DashboardComponent ngOnInit() : universities is', universities);
		});
  }
}
