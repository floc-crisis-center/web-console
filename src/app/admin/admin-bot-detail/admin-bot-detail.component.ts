import { Component, OnInit, ViewChild, ComponentFactoryResolver, ChangeDetectorRef, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

import { Bot } from 'src/app/bot/bot';
import { ChatHostDirective } from './chat-host.directive';
import { ChatComponent } from '../chat/chat.component';
import { BotService } from 'src/app/bot/bot.service';
import { AdminRouterService } from '../admin-router.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { Menu } from 'src/app/bot/menu';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-admin-bot-detail',
  templateUrl: './admin-bot-detail.component.html',
  styleUrls: ['./admin-bot-detail.component.css']
})
export class AdminBotDetailComponent implements OnInit, OnDestroy {
  @ViewChild(ChatHostDirective, {static: true}) chatHost: ChatHostDirective;
  bot: Bot;
  menu: Menu;
  mobileQuery: MediaQueryList;

  private mobileQueryListener: () => void;

  constructor(private route: ActivatedRoute,
              private componentFactoryResolver: ComponentFactoryResolver,
              private changeDetectorRef: ChangeDetectorRef,
              private media: MediaMatcher,
              private botService: BotService,
              private snackBar: MatSnackBar,
              public routerService: AdminRouterService) {
    this.bot = new Bot(null);
    this.menu = new Menu(null);
    this.mobileQuery = media.matchMedia('(max-width: 840px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.botService.getBot(id).subscribe(bot => {
        this.bot = bot;

        if (this.bot.generated) {
          this.botService.getMenu(id).subscribe(menu => {
            this.menu = menu;
          });
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  clearChat(): void {
    this.chatHost.viewContainerRef.clear();
  }

  loadChat(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ChatComponent);
    const viewContainerRef = this.chatHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as ChatComponent).parent = this;
  }

  testChat(): void {
    this.snackBar.open('Testing feature will be implemented in the next release', null, {
      duration: 3000,
    });
  }

  downloadBot(): void {
    this.botService.zipBot(this.bot.id).subscribe(bot => {
      // TODO: Open dialog with zip link
      this.snackBar.openFromComponent(DownloadBotComponent, {
        data: this.bot.id,
        duration: 15000,
      });
    });
  }

  generateBot(): void {
    setTimeout(() => {
      this.clearChat();
      this.ngOnInit();

    }, 2000);
  }
}

@Component({
  selector: 'app-download-bot',
  template: `
    <div>
      <a class="link" href="{{link}}" target="_blank">Download</a> starter kit
    </div>
  `,
  styles: [`
    .link {
      color: #fff;
    }
  `],
})
export class DownloadBotComponent {
  link: string;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.link = `${environment.downloadURL}/${data}.zip`;
  }
}
