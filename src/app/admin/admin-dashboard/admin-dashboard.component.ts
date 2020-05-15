import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Stats } from 'src/app/bot/stats';
import { StatsService } from 'src/app/bot/stats.service';
import { AdminRouterService } from '../admin-router.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  stats: Stats;

  private mobileQueryListener: () => void;

  constructor(private media: MediaMatcher,
              private changeDetectorRef: ChangeDetectorRef,
              private statsService: StatsService,
              public routerService: AdminRouterService) {
    this.mobileQuery = media.matchMedia('(max-width: 840px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
    this.stats = new Stats(null);
   }

  ngOnInit(): void {
    this.statsService.getStats().subscribe(stats => {
      this.stats = stats ? stats : this.stats;
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }
}
