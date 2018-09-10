import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Status } from '../classes/status';
import { Observable } from 'rxjs/internal/Observable';
import { Subject, from  } from 'rxjs';

import { environment } from '../../../environments/environment';

import * as socketio from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private enableNotificationSource = new Subject<any>();
  private statusSource = new Subject<Number>();
  private socket: any;
  enableNotification$ = this.enableNotificationSource.asObservable();
  statusChange$ = this.statusSource.asObservable();

  constructor(
    private http: HttpClient,
  ) {
    this.socket = socketio(environment.socketUrl);
  }

  enableNotification(messages: any): void {
    this.enableNotificationSource.next(messages);
  }

  statusChange(status: Number): void {
    this.statusSource.next(status);
  }

  getStatus() {
    const statusSub = new Subject<any>();
    const statusgSubObservable = from(statusSub);

    this.socket.on('status', (data: any) => {
      console.log(data);
      statusSub.next(data);
    });
    return statusgSubObservable;
  }

  getBooking() {
    console.log('getBooking');
    const bookingSub = new Subject<any>();
    const bookingSubObservable = from(bookingSub);

    this.socket.on('booking', (data: any) => {
      console.log(data);
      bookingSub.next(data);
    });

    return bookingSubObservable;
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
