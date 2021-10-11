import { Component, OnInit } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay(),
    );

  name: string | undefined;

  routes = [
    { path: '/admin/projects', name: 'projects', icon: "task" },
    { path: '/admin/tasks', name: 'tasks', icon: "task" },
  ];
  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router,
  ) { }

  logOut(): void {
    this.authService.logOut().subscribe(result => {
      this.router.navigate(['/auth/login']);
    });
  }

  ngOnInit(): void {
    this.authService.refreshToken().subscribe(() => {
      this.authService.getMe().subscribe(result => {
        this.name = result?.name;
      });
    });
  }

}
