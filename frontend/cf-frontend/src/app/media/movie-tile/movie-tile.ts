import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'cf-movie-tile',
  imports: [RouterLink],
  templateUrl: './movie-tile.html',
  styles: ``,
})
export class MovieTile {
  @Input() uuid: string = '';
  @Input() title: string = '';
}
