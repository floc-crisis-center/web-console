import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService} from '../../auth/auth.service';
import { AdminRouterService } from '../admin-router.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;

  constructor(public authService: AuthService,
              private changeDetectorRef: ChangeDetectorRef,
              private media: MediaMatcher,
              public routerService: AdminRouterService) {
    this.mobileQuery = media.matchMedia('(max-width: 840px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  logout(): boolean {
      this.authService.signOut();
      return true;
  }
}
