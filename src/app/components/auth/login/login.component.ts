import { UserI } from "./../../../shared/models/user.interface";
import { AuthService } from "./../../../shared/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private _authService: AuthService,
    private _router:Router
    ) { }

  ngOnInit(): void {}

  onSubmit(){
   this._authService.loginByEmail(this.loginForm.value)
   .then(res => {
    this._router.navigate(['/']);
  })
  .catch(err => {
    Swal.fire({
      icon:'error',
      title: 'Failed',
      text:'Incorrect user or password'
    });
  })  
  }
}
