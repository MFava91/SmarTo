import { Component } from '@angular/core';
import { HomeService } from '../../core/services/home.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(
    private homeService: HomeService
  ) { }

  enableNotification() {
    this.homeService.enableNotification({
      message: 'Toilet available!',
      notifyMessage: 'You will be notified when the toilet comes back available.'
    });
  }
}
