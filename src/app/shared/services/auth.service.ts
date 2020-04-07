import  Swal  from 'sweetalert2';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileI } from './../models/file.interface';
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { UserI } from "../models/user.interface";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  public userData: Observable<firebase.User>;
  private filePath: string;

  constructor(
    private _afAuth: AngularFireAuth,
    private _storage: AngularFireStorage
    ) {
    this.userData = _afAuth.authState;
  }

  loginByEmail(user: UserI) {
    const { email, password } = user; // interesante como se declaro la constante

    return this._afAuth.signInWithEmailAndPassword(email, password);
  }

  logOut() {
    this._afAuth.signOut().then(()=>{
      Swal.fire({
        icon:'success',
        title: 'Good bye',
        text:'Come back soon.'
      });
    });
    
  }

  private saveUserNameProfile(user1: UserI) {
    var user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: user1.displayName,
        photoURL: user1.photoURL
      })
      .then(() => {
        console.log('User updated!');
        Swal.fire({
          icon:'success',
          title: 'Success',
          text:'Saved correctly'
        });
      })
      .catch((error) => {
       console.log(error);
       Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: 'Error'
      })
      
      });
  }

  preSaveUserProfile(user:UserI, image?:FileI):void{
    if(image){
      this.uploadImage(user, image);
    }else{
      this.saveUserNameProfile(user);
    }
    
  }

  private uploadImage(user:UserI, image:FileI):void{
      this.filePath = `images/${image.name}`;
      const fileRef = this._storage.ref(this.filePath);
      const task = this._storage.upload(this.filePath, image);
      task.snapshotChanges()
      .pipe(
        finalize(()=>{
          fileRef.getDownloadURL().subscribe(
            urlImage => {
              user.photoURL = urlImage;
              this.saveUserNameProfile(user);
            }
          );
        })
      ).subscribe();
  }
}
