import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { Bot } from './bot';
import { Observable, of } from 'rxjs';
import { AdminRouterService } from '../admin/admin-router.service';
import { Menu } from './menu';

@Injectable()
export class BotService {

  constructor(private http: HttpClient,
              private authService: AuthService,
              private routerService: AdminRouterService,
              private snackBar: MatSnackBar) { }

  getBots(): Observable<Bot[]> {
    this.routerService.loading = true;
    const customerID = this.authService.uid;

    return this.http.get<Bot[]>(environment.apiURL + `/bots`)
      .pipe(
        map(data => {
          this.routerService.loading = false;
          return data['items'].map(item => new Bot(item));
        }),
        catchError(this.handleError('getBots', []))
      );
  }

  getBot(botId: string): Observable<Bot> {
    this.routerService.loading = true;
    const url = environment.apiURL + `/bots/${botId}`;

    return this.http.get<Bot>(url)
      .pipe(
        map(data => {
          this.routerService.loading = false;
          return new Bot(data['item']);
        }),
        catchError(this.handleError<Bot>(`getBot id=${botId}`))
      );
  }

  getMenu(botId: string): Observable<Menu> {
    this.routerService.loading = true;
    const url = environment.apiURL + `/menus/${botId}`;

    return this.http.get<Menu>(url)
      .pipe(
        map(data => {
          this.routerService.loading = false;
          return new Menu(data['item']);
        }),
        catchError(this.handleError<Menu>(`getMenu id=${botId}`))
      );
  }

  zipBot(botId: string): Observable<Bot> {
    this.routerService.loading = true;
    const url = environment.apiURL + `/bots/${botId}/zip`;

    return this.http.post(url, null)
    .pipe(
      map(data => {
        this.routerService.loading = false;
        return new Bot(data['item']);
      }),
      catchError(this.handleError<Bot>(`zipBot`))
    );
  }

  createBot(bot: Bot): Observable<Bot> {
    this.routerService.loading = true;
    const url = environment.apiURL + `/bots`;

    return this.http.post(url, bot)
    .pipe(
      map(data => {
        this.routerService.loading = false;
        return new Bot(data['item']);
      }),
      catchError(this.handleError<Bot>(`createBot`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.routerService.loading = false;
      this.snackBar.openFromComponent(ServerErrorComponent, {
        duration: 3000,
      });

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

@Component({
  selector: 'app-snack-bar-error',
  template: `
    <span class="error">
    Server is down, please try later.
    </span>
  `,
  styles: [`
    .error {
      color: #ff7043;
    }
  `],
})
export class ServerErrorComponent {

}
