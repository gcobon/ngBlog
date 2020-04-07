import { Observable } from 'rxjs';
import { PostService } from './../../posts/post.service';
import { Component, OnInit } from "@angular/core";
import { PostI } from 'src/app/shared/models/post.interface';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {

  public posts$:PostI[];

  constructor(
    private _postService:PostService
  ){}

  ngOnInit(): void {
  
    this._postService.getAllPosts().subscribe(
      data => {
        this.posts$ = data;
      }
    );
  }
}
