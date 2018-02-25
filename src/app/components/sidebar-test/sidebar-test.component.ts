import { Component } from '@angular/core';

@Component({
  selector: 'sidebar-test',
  templateUrl: './sidebar-test.component.html' /* ,
  styleUrls: ['./sidebar-test.component.css'] */
})
export class SidebarTestComponent {
  name = 'Angular 4';
  private _opened: boolean = false;

  private _toggleSidebar() {
    this._opened = !this._opened;
  }
}
