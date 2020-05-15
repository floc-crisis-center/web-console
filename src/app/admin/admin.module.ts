import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { MaterialModule } from '../material/material.module';
import { AdminBotsComponent } from './admin-bots/admin-bots.component';
import { BotDialogComponent } from './bot-dialog/bot-dialog.component';
import { AdminBotDetailComponent } from './admin-bot-detail/admin-bot-detail.component';
import { ChatComponent } from './chat/chat.component';
import { ChatHostDirective } from './admin-bot-detail/chat-host.directive';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { BotModule } from '../bot/bot.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminComponent,
    AdminBotsComponent,
    BotDialogComponent,
    AdminBotDetailComponent,
    ChatHostDirective,
    ChatComponent,
    ChatMessageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MaterialModule,
    AdminRoutingModule,
    BotModule,
    HttpClientModule
  ],
  providers: []
})
export class AdminModule { }
