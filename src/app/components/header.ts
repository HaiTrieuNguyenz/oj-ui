import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header
      class="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50"
    >
      <nav class="container-max flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center gap-2 flex-shrink-0">
          <div
            class="w-8 h-8 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg flex items-center justify-center"
          >
            <span class="text-white font-bold text-lg">&lt;/&gt;</span>
          </div>
          <span class="text-xl font-bold text-slate-900">CodeJudge</span>
        </div>

        <!-- Navigation -->
        <div class="hidden md:flex items-center gap-8">
          <a
            routerLink="/problems"
            routerLinkActive="text-primary-600 font-semibold"
            [routerLinkActiveOptions]="{ exact: false }"
            class="text-slate-700 hover:text-primary-600 transition-colors font-medium"
          >
            Problems
          </a>
          <a
            routerLink="/leaderboard"
            routerLinkActive="text-primary-600 font-semibold"
            [routerLinkActiveOptions]="{ exact: false }"
            class="text-slate-700 hover:text-primary-600 transition-colors font-medium"
          >
            Leaderboard
          </a>
          <a
            routerLink="/submissions"
            routerLinkActive="text-primary-600 font-semibold"
            [routerLinkActiveOptions]="{ exact: false }"
            class="text-slate-700 hover:text-primary-600 transition-colors font-medium"
          >
            Submissions
          </a>
          <a
            href="https://github.com"
            target="_blank"
            class="text-slate-700 hover:text-primary-600 transition-colors font-medium"
          >
            Docs
          </a>
        </div>

        <!-- User Menu -->
        <div class="flex items-center gap-4">
          <button class="btn-ghost text-sm">Sign In</button>
          <button class="btn-primary text-sm">Sign Up</button>
        </div>
      </nav>
    </header>
  `,
})
export class HeaderComponent {}
