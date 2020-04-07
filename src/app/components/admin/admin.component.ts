import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public opened:boolean;

  constructor() { }

  ngOnInit(): void {
  }

  cambiarValor(){
    if(this.opened){
      this.opened = false
    }else{
      this.opened = true;
    }
  }

}
