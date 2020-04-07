import { FormControl, Validators } from '@angular/forms';
import { PostService } from './../post.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PostI } from 'src/app/shared/models/post.interface';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  private image:any;

  public newPostForm = new FormGroup({
    titlePost: new FormControl('', Validators.required),
    contentPost: new FormControl('',Validators.required),
    tagsPost: new FormControl('',Validators.required),
    imagePost: new FormControl('',Validators.required),
  });

  constructor(
    private _postService:PostService
  ) { }

  ngOnInit(): void {
  }

  addNewPost(){
    //console.log('data: ', this.newPostForm.value);
    this._postService.preAddAndUpdatePost(this.newPostForm.value, this.image);
  }

  handleImage(event:any):void{
    this.image = event.target.files[0];
    //console.log('image:',this.image);
  }

}
