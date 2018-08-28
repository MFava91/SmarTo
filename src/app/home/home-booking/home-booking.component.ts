import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';

import { NotificationService } from 'turbo-notify-popup';

import { HomeService } from '../../core/services/home.service';

import * as webNotification from 'simple-web-notification';

@Component({
  selector: 'app-home-booking',
  animations: [
    trigger(
      'bookingButton', [
        transition(
          ':enter', [
            style({ transform: 'translate3d(0, 2em, 0) rotate(90deg)', opacity: 0 }),
            animate('300ms', style({ transform: 'translate3d(0, 0em, 0)', opacity: 1 }))
          ]
        ),
        transition(
          ':leave', [
            style({ transform: 'translate3d(0, 0em, 0)', opacity: 1 }),
            animate('300ms', style({ transform: 'translate3d(0, 2em, 0)', opacity: 0 }))
          ]
        )
      ]
    )
  ],
  templateUrl: './home-booking.component.html',
  styleUrls: ['./home-booking.component.scss'],
  providers: [NotificationService]
})

export class HomeBookingComponent implements OnInit {

  public  nameOfTheBooking: String;
  public nameChosenForBooking: String;
  
  private availabilityNotificationEnabled: Boolean = false;
  private availabilityNotificationInterval: any;
  private availabilityNotificationMessage: String;

  constructor(
    private notify: NotificationService,
    private homeService: HomeService
  ) {

    this.homeService.enableNotification$.subscribe(
      messages => {
        this.enablesAvailabilityNotification(messages.message, messages.notifyMessage);
      });

    this.homeService.statusChange$.subscribe(
      status => {
        if (status === 1 && this.availabilityNotificationEnabled) {
          this.notifyAvailability();
          this.availabilityNotificationEnabled = false;
        }
      });
  }

  getBooking(): void {
    this.homeService.getBooking().subscribe(bookingStatus => {
      if (bookingStatus !== this.nameOfTheBooking) {
        this.nameOfTheBooking = bookingStatus;
      }
    });
  }

  setBooking(): void {
    if (this.nameOfTheBooking === '' && this.nameChosenForBooking !== '') {
      this.homeService.setBooking(this.nameChosenForBooking).subscribe(
        data => {
          this.nameOfTheBooking = this.nameChosenForBooking;
          this.nameChosenForBooking = '';
          this.enablesAvailabilityNotification(
            this.nameOfTheBooking + ', it\'s your turn! The toilet is available!',
            'Your reservation has been successful. You will be notified when the toilet is available.');
        });
    }
  }

  enablesAvailabilityNotification(message: String, notifyMessage: String) {
    if (notifyMessage) {
      this.notify.show(notifyMessage.toString(), { position: 'bottom', duration: '5000', type: 'default' });
    }

    if (!this.availabilityNotificationEnabled) {
      this.availabilityNotificationEnabled = true;
      this.availabilityNotificationMessage = message;
    }
  }

  notifyAvailability(): void {
    webNotification.showNotification('SmarTo', {
      body: this.availabilityNotificationMessage,
      icon: 'assets/images/favicon/favicon.ico',
      autoClose: 4000 // auto close the notification after 4 seconds (you can manually close it via hide function)
    }, function onShow(error, hide) {
      if (error) {
        window.alert('Unable to show notification: ' + error.message);
      } else {
        setTimeout(function hideNotification() {
          hide(); // manually close the notification (you can skip this if you use the autoClose option)
        }, 5000);
      }
    });
  }

  ngOnInit(): void {
    this.getBooking();
    setInterval(() => {
      this.getBooking();
    }, 3000);
  }
}
