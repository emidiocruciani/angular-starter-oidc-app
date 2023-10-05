import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ConfigService } from '@app/core/config/service/config.service';

@Component({
  selector: 'app-public-navbar',
  templateUrl: './public-navbar.component.html',
  styleUrls: ['./public-navbar.component.css']
})
export class PublicNavbarComponent {
  
  constructor(
    private router: Router,
    private config: ConfigService
  ) { }

  public login(): void {
    this.router.navigateByUrl(this.config.loginUri);
  }
}
