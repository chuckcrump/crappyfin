import { Routes } from '@angular/router';
import { MoviePage } from './media/movie-page/movie-page';
import { HomePage } from './home-page/home-page';
import { Notfound } from './notfound/notfound';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'media/movies', component: MoviePage },
  { path: '**', component: Notfound },
];
