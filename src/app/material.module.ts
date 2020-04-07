import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule }  from '@angular/material/icon';
import { MatButtonModule }  from '@angular/material/button';
import { MatToolbarModule }  from '@angular/material/toolbar';
import { MatSidenavModule }  from '@angular/material/sidenav';
import { MatMenuModule }  from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatSelectModule } from '@angular/material/select';


const myModule = [
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatChipsModule,
  MatDividerModule,
  MatInputModule,
  MatFormFieldModule,
  MatSortModule,
  MatTableModule,
  MatPaginatorModule,
  MatDialogModule,
  MatSelectModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    myModule,
  ],
  exports: [
    myModule
  ]
})
export class MaterialModule { }
