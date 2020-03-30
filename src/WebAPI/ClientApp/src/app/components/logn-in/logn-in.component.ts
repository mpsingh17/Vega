import { Component, OnInit } from '@angular/core';
import { UserManager, UserManagerSettings, User} from 'oidc-client';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logn-in',
  templateUrl: './logn-in.component.html',
  styleUrls: ['./logn-in.component.css']
})

export class LognInComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  
  login() {
    this.authService.login();
  }
}
