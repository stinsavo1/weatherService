import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  public searchQuery = '';
  @Output() public query: EventEmitter<string> = new EventEmitter<string>();
  @Output() public clearQuery = new EventEmitter();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const query = this.activatedRoute.snapshot.queryParams['query'];
    if (query) {
      this.searchQuery = query;
      this.query.emit(query);
    }
  }

  public clear(): void {
    this.searchQuery = '';
    this.setQuery();
    this.clearQuery.emit();
  }

  public search(): void {
    this.setQuery();
    this.query.emit(this.searchQuery)
  }

  public setQuery(): void {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: { query: this.searchQuery },
        queryParamsHandling: 'merge'
      });
  }
}
