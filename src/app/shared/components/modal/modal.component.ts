import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog' 

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(
    public _dialog:MatDialogRef<ModalComponent>, //esta inyeccion se hace para el uso del modal
    @Inject(MAT_DIALOG_DATA) public data

  ) { }

  ngOnInit(): void {
  }

}
