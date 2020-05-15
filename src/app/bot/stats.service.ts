import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { Observable, of } from 'rxjs';
import { Stats } from './stats';
import { AdminRouterService } from '../admin/admin-router.service';
import { ServerErrorComponent } from './bot.service';

@Injectable()
export class StatsService {

  constructor(private http: HttpClient,
              private authService: AuthService,
              private routerService: AdminRouterService,
              private snackBar: MatSnackBar) { }

  getStats(): Observable<Stats> {
    this.routerService.loading = true;
    const url = environment.apiURL + `/stats`;

    return this.http.get<Stats>(url)
    .pipe(
      map(data => {
        this.routerService.loading = false;
        return new Stats(data['item']);
      }),
      catchError(this.handleError<Stats>(`getStats`))
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
