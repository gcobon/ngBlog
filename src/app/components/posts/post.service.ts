import { FileI } from "./../../shared/models/file.interface";
import { PostI } from "./../../shared/models/post.interface";
import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map, finalize } from "rxjs/operators";
import { AngularFireStorage } from "@angular/fire/storage";
import Swal from 'sweetalert2';

@Injectable({
  providedIn: "root"
})
export class PostService {
  private postCollection: AngularFirestoreCollection; //collecion en firebase
  private filePath: any; //path donde se encuentra la imagen a subir
  private dowloadURL: Observable<string>; //url de descarga de la imagen

  constructor(
    private _afs: AngularFirestore,
    private _storage: AngularFireStorage
  ) {
    this.postCollection = _afs.collection<PostI>("posts");
  }

  public getAllPosts(): Observable<PostI[]> {
    return this.postCollection //variable declarada en el constructor
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as PostI;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  public getOnePost(id: PostI): Observable<PostI> {
    return this._afs.doc<PostI>(`posts/${id}`).valueChanges();
  }

  public editPostByid(post: PostI, newImage?:FileI) {

    if(newImage){
      this.uploadImage(post, newImage);
    }else{
      Swal.fire({
        icon:'success',
        title: 'Success',
        text:'Updated correctly'
      });
      return this.postCollection.doc(post.id).update(post);
    }
  }

  public deletePostById(post: PostI) {
    return this.postCollection.doc(post.id).delete();
  }

  public preAddAndUpdatePost(post:PostI, image: FileI):void{
    this.uploadImage(post, image);
  }

  private savePost(post:PostI){
    const postObj = {
      titlePost: post.titlePost,
      contentPost: post.contentPost,
      imagePost: this.dowloadURL,
      fileRef: this.filePath,
      tagsPost: post.tagsPost
    }
    
    if(post.id){
      //edit Post
      Swal.fire({
        icon:'success',
        title: 'Success',
        text:'Updated correctly'
      });
      return this.postCollection.doc(post.id).update(postObj);
      
    }else{
      //save new post
      Swal.fire({
        icon:'success',
        title: 'Success',
        text:'Saved correctly'
      });
      this.postCollection.add(postObj);
    }
  }

  private uploadImage(post: PostI, image: FileI) {
    this.filePath = `images/${image.name}`;
    const fileRef = this._storage.ref(this.filePath);
    const task = this._storage.upload(this.filePath, image); //sube la imagen

    task.snapshotChanges()
    .pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe(
          urlImage => {
            this.dowloadURL = urlImage;
            //aca se llama al metodo guardar post
            this.savePost(post);
          }
        );
      })).subscribe();
  }
}
