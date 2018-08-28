import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Status } from '../classes/status';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private enableNotificationSource = new Subject<any>();
  private statusSource = new Subject<Number>();
  enableNotification$ = this.enableNotificationSource.asObservable();
  statusChange$ = this.statusSource.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  enableNotification(messages: any): void {
    this.enableNotificationSource.next(messages);
  }

  statusChange(status: Number): void {
    this.statusSource.next(status);
  }

  getStatus() {
    return this.http.get<any>('/status').pipe(
      tap((response: Status) => { }),
      catchError(this.handleError('getStatus', null))
    );
  }

  getBooking() {
    return this.http.get<any>('/booking').pipe(
      tap((response: Status) => { }),
      catchError(this.handleError('getBooking', null))
    );
  }

  setBooking(name: String) {
    return this.http.put<any>('/booking', {name: name}).pipe(
      tap((response: Status) => { }),
      catchError(this.handleError('setBooking', null))
    );
  }

  public handleError<T>(operation: string, result?: any) {
    return (error: any): Observable<any> => {
      throw error;
    };
  }
}
