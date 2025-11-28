import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home';
import { ProblemsComponent } from './pages/problems';
import { ProblemDetailComponent } from './pages/problem-detail';
import { PlaceholderComponent } from './pages/placeholder';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'problems', component: ProblemsComponent },
  { path: 'problem/:id', component: ProblemDetailComponent },
  { path: 'leaderboard', component: PlaceholderComponent, data: { title: 'Leaderboard' } },
  { path: 'submissions', component: PlaceholderComponent, data: { title: 'My Submissions' } },
  { path: '**', redirectTo: '' },
];
