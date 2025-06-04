import { ChangeDetectorRef, Component, computed, signal } from '@angular/core';
import { MovieTile } from '../movie-tile/movie-tile';

@Component({
  selector: 'cf-movie-page',
  imports: [MovieTile],
  templateUrl: './movie-page.html',
  styles: ``,
})
export class MoviePage {
  constructor(private cdr: ChangeDetectorRef) {}
}
