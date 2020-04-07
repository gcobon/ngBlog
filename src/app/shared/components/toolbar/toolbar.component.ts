import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  public appName  = 'ngBlog'; 

  constructor(
    public _authService:AuthService,
    private _router:Router
  ) { }

  ngOnInit(): void {
  }

  logOut():void{
    this._authService.logOut();
    this._router.navigate(['/login']);
  }

}
