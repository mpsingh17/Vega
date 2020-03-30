import { Component, OnInit } from '@angular/core';
import { Register } from '../../models/register';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userRegistration: Register = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {}

  onSubmit() {
    this.auth.register(this.userRegistration)
    .subscribe(res => {
      console.log(res);
      this.completeRegister();
    });
  }

  completeRegister() {
    this.router.navigate(['/login']);
  }

}
