import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { AdminBotsComponent } from './admin-bots/admin-bots.component';
import { AdminBotDetailComponent } from './admin-bot-detail/admin-bot-detail.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const toLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: '',
            component: AdminDashboardComponent,
            canActivate: [AngularFireAuthGuard],
            data: { authGuardPipe: toLogin }
          },
          {
            path: 'bots',
            component: AdminBotsComponent,
            canActivate: [AngularFireAuthGuard],
            data: { authGuardPipe: toLogin }
          },
          {
            path: 'bots/:id',
            component: AdminBotDetailComponent,
            canActivate: [AngularFireAuthGuard],
            data: { authGuardPipe: toLogin }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
