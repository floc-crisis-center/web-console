import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotService } from './bot.service';
import { StatsService } from './stats.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    BotService,
    StatsService
  ]
})
export class BotModule { }
