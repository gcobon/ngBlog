import { FileI } from './../../../shared/models/file.interface';
import { UserI } from "./../../../shared/models/user.interface";
import { AuthService } from "./../../../shared/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {

  public image: FileI;
  public currentImage = 'https://picsum.photos/200/300';

  public profileForm = new FormGroup({
    displayName: new FormControl("", Validators.required),
    email: new FormControl({ value: "", disabled: true }, Validators.required),
    photoURL: new FormControl("", Validators.required)
  });

  constructor(
    private _authService: AuthService
    ) {}

  ngOnInit(): void {
    this._authService.userData.subscribe(
      dataUser => {
        this.initValuesForm(dataUser);
    });
  }

  private initValuesForm(user:UserI): void {

    if(user.photoURL){
      this.currentImage = user.photoURL;
    }
    this.profileForm.patchValue({
      displayName: user.displayName,
      email: user.email
    });
  }

  saveProfile(){
      this._authService.preSaveUserProfile(this.profileForm.value, this.image)
  }

  handleImage(image:FileI):void{
      this.image = image;
  }
}
