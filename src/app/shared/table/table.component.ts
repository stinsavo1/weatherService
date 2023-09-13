import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {
  @Input() public data: { [key: string]: string }[];
  @Input() public columnName: string[];
  public displayedColumns: string[] = ['cityName'];

  ngOnInit() {
    if (this.columnName) {
      this.displayedColumns = [...new Set([...this.displayedColumns, ...this.columnName])];
    }
  }
}
