import { NgModule } from '@angular/core';
import { SearchComponent } from './search/search.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [
    SearchComponent,
    TableComponent
  ],
  imports: [
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    CommonModule,
    MatTabsModule,
  ],
  exports: [
    SearchComponent,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    CommonModule,
    MatTabsModule,
    TableComponent,
  ]
})
export class SharedModule { }
