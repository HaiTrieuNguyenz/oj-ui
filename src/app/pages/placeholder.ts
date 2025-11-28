import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-placeholder',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="bg-slate-50 min-h-screen flex items-center justify-center py-20">
      <div class="max-w-md mx-auto text-center">
        <div class="mb-8">
          <div class="w-20 h-20 mx-auto bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mb-6">
            <span class="text-4xl">📋</span>
          </div>
          <h1 class="text-3xl font-bold text-slate-900 mb-3">{{ pageTitle }}</h1>
          <p class="text-lg text-slate-600 leading-relaxed">
            This page is coming soon! Continue building your coding skills with our problems and challenges.
          </p>
        </div>

        <div class="flex flex-col gap-3">
          <a routerLink="/" class="btn-primary px-6 py-3">
            Back to Home
          </a>
          <a routerLink="/problems" class="btn-secondary px-6 py-3">
            Browse Problems
          </a>
        </div>
      </div>
    </div>
  `,
})
export class PlaceholderComponent {
  @Input() pageTitle = 'Page Coming Soon';
}
