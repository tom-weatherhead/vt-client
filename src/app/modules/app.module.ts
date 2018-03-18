import { NgModule }                       from '@angular/core';
import { BrowserModule }                  from '@angular/platform-browser';
import { FormsModule }                    from '@angular/forms';
import { HttpClientModule }               from '@angular/common/http';

// import { APP_INITIALIZER }                from '@angular/core';
// import { AppConfig }                      from '../providers/app.config/app.config';

//import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService }            from '../services/in-memory-data/in-memory-data.service';

import { AppRoutingModule }               from './app-routing.module';

import { AppComponent }                   from '../components/app/app.component';
import { DashboardComponent }             from '../components/dashboard/dashboard.component';
// import { HeroDetailComponent }            from '../components/hero-detail/hero-detail.component';
// import { HeroesComponent }                from '../components/heroes/heroes.component';
// import { HeroSearchComponent }            from '../components/hero-search/hero-search.component';
import { UniversitiesComponent }          from '../components/universities/universities.component';
import { UniversityChartComponent }       from '../components/university-chart/university-chart.component';
import { UniversityDetailComponent }      from '../components/university-detail/university-detail.component';
import { UniversitySearchComponent }      from '../components/university-search/university-search.component';
import { SidebarTestComponent }           from '../components/sidebar-test/sidebar-test.component';

// import { HeroService }                    from '../services/hero/hero.service';
import { UniversityService }              from '../services/university/university.service';

import { MessageService }                 from '../services/message/message.service';
import { MessagesComponent }              from '../components/messages/messages.component';

// import { ObservableDemoComponent }        from '../components/observable-demo/observable-demo.component';

import { ChartsModule }                   from 'ng2-charts';

import { SidebarModule }                  from 'ng-sidebar';

import { ConfigService }                  from '../services/config/config.service';
import { ConfigComponent }                from '../components/config/config.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    SidebarModule.forRoot()

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // HttpClientInMemoryWebApiModule.forRoot(
      // InMemoryDataService, { dataEncapsulation: false }
    // )
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    // HeroesComponent,
    // HeroDetailComponent,
    MessagesComponent,
    // HeroSearchComponent,
    UniversitiesComponent,
    UniversityChartComponent,
    UniversityDetailComponent,
    UniversitySearchComponent,
    SidebarTestComponent
    // , ObservableDemoComponent
    , ConfigComponent
  ],
  providers: [
    // HeroService,
    UniversityService,
    MessageService,
    // AppConfig,
    // { provide: APP_INITIALIZER, useFactory: (config: AppConfig) => () => config.load(), deps: [AppConfig], multi: true }
    ConfigService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
