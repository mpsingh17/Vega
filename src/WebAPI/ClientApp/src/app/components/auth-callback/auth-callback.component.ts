import { Component, OnInit } from '@angular/core';
import { User, UserManager, UserManagerSettings } from 'oidc-client';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {
  error: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {

    if (this.route.snapshot.fragment.indexOf('error') >= 0) {
      this.error=true;   
      return;
    }
    await this.authService.completeLogin();
    this.router.navigate(['/fetch-data']);
  }

}
