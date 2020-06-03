import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() opened: boolean;
  @Output() sidenav = new EventEmitter<boolean>();
  user: any;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.auth.getUser();
  }

  changeSideNav(open: boolean) {
    this.opened = open ? false : true;
    this.sidenav.emit(this.opened);
  }

  logOut() {
    if (this.auth.logOut()) {
      this.router.navigateByUrl('/login');
    }
  }
}
