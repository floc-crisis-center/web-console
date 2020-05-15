import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminRouterService {
  loading: boolean;
  adminRoutes: AdminRoutes;

  constructor(private router: Router) {
    this.loading = false;
    this.adminRoutes = new AdminRoutes(router);
  }
}

export class AdminRoute {
  public color: string;
  public css ; string;

  constructor(public path: string, public icon: string, public text: string, private router: Router) {}

  go(): boolean {
    this.router.navigate([this.path]);
    return true;
  }
}

export class AdminRoutes {
  items: AdminRoute[];

  constructor(private router: Router) {
    this.items = [
      new AdminRoute('/admin', 'table_chart', 'Dashboard', router),
      new AdminRoute('/admin/bots', 'chat', 'Info Bots', router)
    ];

    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((event) => {
      this.onChange(event['urlAfterRedirects']);
    });
  }

  onChange(path): void {
    this.items.forEach(adminRoute => {
      if (adminRoute.path === path) {
        adminRoute.color = 'accent';
        adminRoute.css = 'nav-menu-selected-item';
      } else {
        adminRoute.color = '';
        adminRoute.css = '';
      }
    });
  }
}
