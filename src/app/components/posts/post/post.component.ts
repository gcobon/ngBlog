import { PostI } from 'src/app/shared/models/post.interface';
import { PostService } from './../post.service';
import { Component, OnInit, Input } from '@angular/core';
import { stringify } from 'querystring';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: PostI;

  constructor(){  }

  ngOnInit(): void {
   
  }

}
