import { PostService } from './../post.service';
import { ActivatedRoute } from '@angular/router';
import { PostI } from './../../../shared/models/post.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-post',
  templateUrl: './details-post.component.html',
  styleUrls: ['./details-post.component.css']
})
export class DetailsPostComponent implements OnInit {

  public post:PostI;

  constructor(
    private _route:ActivatedRoute,
    private _postService: PostService
  ) { }

  ngOnInit(): void {
    this.getPost();
  }

  getPost(){
    let id = this._route.snapshot.params.id;
    console.log(id);

    this._postService.getOnePost(id).subscribe(
      res => {
        this.post = res;
        console.log('one post: ',this.post);
      }
    )
  }

}
