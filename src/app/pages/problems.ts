import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Problem {
  id: number;
  status: 'solved' | 'attempted' | 'unsolved';
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  acceptance: number;
  likes: number;
  submissions: number;
}

@Component({
  selector: 'app-problems',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="bg-slate-50 min-h-screen py-8">
      <div class="container-max">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-slate-900 mb-2">Problems</h1>
          <p class="text-lg text-slate-600">Solve problems, master algorithms, prepare for interviews</p>
        </div>

        <!-- Filters & Search -->
        <div class="bg-white rounded-lg border border-slate-200 p-6 mb-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <!-- Search -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-slate-700 mb-2">Search</label>
              <input
                [(ngModel)]="searchQuery"
                type="text"
                placeholder="Search problems..."
                class="input-field"
              />
            </div>

            <!-- Difficulty Filter -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Difficulty</label>
              <select [(ngModel)]="selectedDifficulty" class="input-field">
                <option value="">All Levels</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <!-- Status Filter -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Status</label>
              <select [(ngModel)]="selectedStatus" class="input-field">
                <option value="">All Status</option>
                <option value="solved">Solved</option>
                <option value="attempted">Attempted</option>
                <option value="unsolved">Unsolved</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Problems Table -->
        <div class="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-slate-100 border-b border-slate-200">
                <tr>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-slate-900">Title</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-slate-900">Difficulty</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-slate-900">Category</th>
                  <th class="px-6 py-4 text-right text-sm font-semibold text-slate-900">Acceptance</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  *ngFor="let problem of filteredProblems"
                  class="border-b border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                  [routerLink]="['/problem', problem.id]"
                >
                  <!-- Status -->
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div
                        *ngIf="problem.status === 'solved'"
                        class="w-5 h-5 rounded-full bg-success-500 flex items-center justify-center"
                      >
                        <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div
                        *ngIf="problem.status === 'attempted'"
                        class="w-5 h-5 rounded-full bg-warning-500 flex items-center justify-center"
                      >
                        <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div
                        *ngIf="problem.status === 'unsolved'"
                        class="w-5 h-5 rounded-full border-2 border-slate-300"
                      ></div>
                    </div>
                  </td>

                  <!-- Title -->
                  <td class="px-6 py-4">
                    <p class="font-medium text-slate-900">{{ problem.title }}</p>
                  </td>

                  <!-- Difficulty -->
                  <td class="px-6 py-4">
                    <span [ngClass]="getDifficultyClass(problem.difficulty)" class="badge text-xs font-bold px-3">
                      {{ problem.difficulty }}
                    </span>
                  </td>

                  <!-- Category -->
                  <td class="px-6 py-4 text-slate-600">{{ problem.category }}</td>

                  <!-- Acceptance -->
                  <td class="px-6 py-4 text-right">
                    <div class="flex items-center justify-end gap-2">
                      <div class="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          class="h-full bg-gradient-to-r from-primary-500 to-accent-500"
                          [style.width.%]="problem.acceptance"
                        ></div>
                      </div>
                      <span class="text-sm font-medium text-slate-900 w-12 text-right">{{ problem.acceptance }}%</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Empty State -->
          <div *ngIf="filteredProblems.length === 0" class="px-6 py-16 text-center">
            <p class="text-slate-600 text-lg">No problems found matching your filters.</p>
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-between mt-8">
          <p class="text-slate-600">Showing {{ filteredProblems.length }} of {{ problems.length }} problems</p>
          <div class="flex gap-2">
            <button class="btn-secondary">Previous</button>
            <button class="btn-primary">Next</button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ProblemsComponent {
  searchQuery = '';
  selectedDifficulty = '';
  selectedStatus = '';

  problems: Problem[] = [
    {
      id: 1,
      status: 'solved',
      title: 'Two Sum',
      difficulty: 'Easy',
      category: 'Array & Hashing',
      acceptance: 47.8,
      likes: 2345,
      submissions: 25403,
    },
    {
      id: 2,
      status: 'solved',
      title: 'Add Two Numbers',
      difficulty: 'Medium',
      category: 'Linked List',
      acceptance: 31.5,
      likes: 1820,
      submissions: 14203,
    },
    {
      id: 3,
      status: 'attempted',
      title: 'Longest Substring Without Repeating Characters',
      difficulty: 'Medium',
      category: 'Sliding Window',
      acceptance: 33.4,
      likes: 1604,
      submissions: 18204,
    },
    {
      id: 4,
      status: 'unsolved',
      title: 'Median of Two Sorted Arrays',
      difficulty: 'Hard',
      category: 'Array & Binary Search',
      acceptance: 27.3,
      likes: 987,
      submissions: 9821,
    },
    {
      id: 5,
      status: 'solved',
      title: 'Longest Palindromic Substring',
      difficulty: 'Medium',
      category: 'String & DP',
      acceptance: 32.1,
      likes: 1423,
      submissions: 12043,
    },
    {
      id: 6,
      status: 'solved',
      title: 'Zigzag Conversion',
      difficulty: 'Medium',
      category: 'String',
      acceptance: 35.2,
      likes: 734,
      submissions: 8934,
    },
    {
      id: 7,
      status: 'unsolved',
      title: 'Reverse Integer',
      difficulty: 'Easy',
      category: 'Math',
      acceptance: 26.3,
      likes: 456,
      submissions: 5234,
    },
    {
      id: 8,
      status: 'unsolved',
      title: 'String to Integer (atoi)',
      difficulty: 'Medium',
      category: 'String',
      acceptance: 14.5,
      likes: 234,
      submissions: 3456,
    },
    {
      id: 9,
      status: 'solved',
      title: 'Palindrome Number',
      difficulty: 'Easy',
      category: 'Math',
      acceptance: 50.2,
      likes: 892,
      submissions: 12234,
    },
    {
      id: 10,
      status: 'attempted',
      title: 'Container With Most Water',
      difficulty: 'Medium',
      category: 'Two Pointers',
      acceptance: 51.8,
      likes: 1203,
      submissions: 14523,
    },
    {
      id: 11,
      status: 'unsolved',
      title: 'Regular Expression Matching',
      difficulty: 'Hard',
      category: 'DP & Regex',
      acceptance: 26.7,
      likes: 567,
      submissions: 4523,
    },
    {
      id: 12,
      status: 'solved',
      title: 'Integer to Roman',
      difficulty: 'Medium',
      category: 'String & Math',
      acceptance: 59.3,
      likes: 645,
      submissions: 8234,
    },
  ];

  get filteredProblems(): Problem[] {
    return this.problems.filter((problem) => {
      const matchesSearch =
        problem.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        problem.category.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesDifficulty = !this.selectedDifficulty || problem.difficulty === this.selectedDifficulty;
      const matchesStatus = !this.selectedStatus || problem.status === this.selectedStatus;

      return matchesSearch && matchesDifficulty && matchesStatus;
    });
  }

  getDifficultyClass(difficulty: string): string {
    const classes: Record<string, string> = {
      Easy: 'badge-success',
      Medium: 'badge-warning',
      Hard: 'badge-danger',
    };
    return classes[difficulty] || 'badge-primary';
  }
}
