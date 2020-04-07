import { PostService } from "./../post.service";
import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PostI } from "src/app/shared/models/post.interface";

@Component({
  selector: "app-edit-post",
  templateUrl: "./edit-post.component.html",
  styleUrls: ["./edit-post.component.css"]
})
export class EditPostComponent implements OnInit {
  private image: any;
  private imageOriginal: any;

  @Input() post: PostI;

  public editPostForm = new FormGroup({
    id: new FormControl("", Validators.required),
    titlePost: new FormControl("", Validators.required),
    contentPost: new FormControl("", Validators.required),
    tagsPost: new FormControl("", Validators.required),
    imagePost: new FormControl("", Validators.required)
  });

  constructor(private _postService: PostService) {}

  ngOnInit(): void {
    this.image = this.post.imagePost;
    this.imageOriginal = this.post.imagePost;
    this.initValuesForm();
  }

  editPost(post: PostI) {
    console.log("img", this.image);
    console.log("img original", this.imageOriginal);
    if (this.image === this.imageOriginal) {
      post.imagePost = this.imageOriginal;

      //call method(post)
      this._postService.editPostByid(post);
    } else {
      //call method(post, this.image)
      this._postService.editPostByid(post, this.image);
    }
  }

  handleImage(event: any): void {
    this.image = event.target.files[0];
  }

  private initValuesForm(): void {
    this.editPostForm.patchValue({
      id: this.post.id,
      titlePost: this.post.titlePost,
      contentPost: this.post.contentPost,
      tagsPost: this.post.tagsPost
    });
  }
}
