import { ChangeDetectorRef, Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { AdminRouterService } from '../admin-router.service';
import { BotDialogComponent } from '../bot-dialog/bot-dialog.component';
import { Bot } from 'src/app/bot/bot';
import { BotService } from 'src/app/bot/bot.service';

@Component({
  selector: 'app-admin-bots',
  templateUrl: './admin-bots.component.html',
  styleUrls: ['./admin-bots.component.css']
})
export class AdminBotsComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  bots: Bot[];

  private mobileQueryListener: () => void;

  constructor(public routerService: AdminRouterService,
              public dialog: MatDialog,
              private changeDetectorRef: ChangeDetectorRef,
              private media: MediaMatcher,
              private botService: BotService) {
    this.mobileQuery = media.matchMedia('(max-width: 840px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit(): void {
    this.botService.getBots().subscribe(bots => {
      this.bots = bots;
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  createBot(): void {
    const dialogRef = this.dialog.open(BotDialogComponent, {
      width: '320px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(bot => {
      if (!bot || !bot.name) {
        return;
      }

      this.botService.createBot(bot).subscribe(savedBot => {
        this.ngOnInit();
      });
    });
  }
}
