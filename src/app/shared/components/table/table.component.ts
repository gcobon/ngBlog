import { PostI } from './../../models/post.interface';
import { PostService } from './../../../components/posts/post.service';
import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import Swal  from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './../modal/modal.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['titlePost', 'tagsPost', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(
    private _postService: PostService,
    public _dialog:MatDialog  //propiedad de angular material
  ) { }

  ngOnInit(): void {
     this._postService.getAllPosts().subscribe(
       posts => {
         this.dataSource.data = posts;
       }
     )
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEditPost(post:PostI){
    this.openDialog(post);
  }

  onDeletePost(post:PostI){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        //llamar al metodo de borrar
        this._postService.deletePostById(post).then(() =>{
          //-------------------
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }).catch(err => {
          console.log('error al eliminar post: ',err);
          Swal.fire(
            'Error!',
            'There was an error deleting this post.',
            'error'
          )
        });
        
      }
    })
  }

  newPos(){
    this.openDialog();
  }

  openDialog(post?:PostI):void{
    const config = {
      data:{
        message: post ? 'Edit Post': 'New Post', // se utiliza un ternario... 
        content: post // se pasa el post cuando es Edit post.
      }
    };

    const dialogRef = this._dialog.open(ModalComponent, config);

    dialogRef.afterClosed().subscribe(
      result => {
        console.log(`Dialog result ${result}`);
      }
    );
  }
}
