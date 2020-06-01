import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() opened: boolean;
  @Output() sidenav = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  changeSideNav(open: boolean) {
    this.opened = open ? false : true;
    this.sidenav.emit(this.opened);
  }
}
