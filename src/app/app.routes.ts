import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home";
import { ProblemsComponent } from "./pages/problems";
import { ProblemDetailComponent } from "./pages/problem-detail";
import { SubmissionsComponent } from "./pages/submissions";
import { PlaceholderComponent } from "./pages/placeholder";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "problems", component: ProblemsComponent },
  { path: "problem/:id", component: ProblemDetailComponent },
  { path: "submissions", component: SubmissionsComponent },
  {
    path: "leaderboard",
    component: PlaceholderComponent,
    data: { title: "Leaderboard" },
  },
  { path: "**", redirectTo: "" },
];
