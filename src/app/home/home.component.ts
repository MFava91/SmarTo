import { Component, OnInit } from '@angular/core';

import { HomeService } from '../core/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private homeService: HomeService
  ) { }

  enableNotification() {
    this.homeService.enableNotification({
      message: 'Toilet available!',
      notifyMessage: 'You will be notified when the toilet comes back available.'
    });
  }

  ngOnInit() {
  }

}
